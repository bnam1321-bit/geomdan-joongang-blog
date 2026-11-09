"""
검단중앙내과의원 AI 원고 생성기 (Gemini 2.5 Flash)

사용법:
  python scripts/generate_ai_posts.py                 # 큐가 4주치 미만이면 새 글 생성
  python scripts/generate_ai_posts.py --rewrite 1,2,3 # 기존 글 본문을 사실 기준으로 재작성

원칙:
  - 확인된 사실(content_rules.VERIFIED_FACTS)만 사용
  - 검증(content_rules.validate_post) 통과한 글만 큐에 추가 (최대 3회 재시도)
  - 실패 시 저품질 템플릿을 넣지 않고 건너뜀 -> 큐가 부족하면 종료코드 1 (GitHub 실패 알림)
"""

import os
import sys
import json
import time
import random
import argparse
import urllib.request
from datetime import datetime, timezone, timedelta

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from content_rules import VERIFIED_FACTS, validate_post, is_duplicate_title, sanitize_medical_text  # noqa: E402

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

KST = timezone(timedelta(hours=9))
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUEUE_FILE = os.path.join(BASE_DIR, "_private", "posts_queue.json")
MODEL = "gemini-2.5-flash"


def load_env():
    env_file = os.path.join(BASE_DIR, ".env")
    if os.path.exists(env_file):
        with open(env_file, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ.setdefault(k.strip(), v.strip().strip("'\""))


load_env()

CATEGORY_META = {
    "endoscopy": ("위·대장 내시경 클리닉", "노인영 대표원장", "내과 전문의 / 소화기내시경 세부전문의",
                  "https://joongangmedicine.com/img/main/doctor/thum_doc_01.png"),
    "checkup": ("5대암·국가건강검진", "노인영 대표원장", "내과 전문의 / 소화기내시경 세부전문의",
                "https://joongangmedicine.com/img/main/doctor/thum_doc_01.png"),
    "sunday": ("일요일진료·병원소식", "김인선 원장", "가정의학과 전문의",
               "https://joongangmedicine.com/img/main/doctor/thum_doc_02.png"),
    "vaccine": ("예방접종·수액", "김인선 원장", "가정의학과 전문의",
                "https://joongangmedicine.com/img/main/doctor/thum_doc_02.png"),
}

# 계절별 주제 힌트 (AI가 이 중 아직 안 다룬 주제를 골라 씀)
SEASONAL_HINTS = {
    "spring": {
        "endoscopy": ["헬리코박터균 감염과 제균 치료", "역류성 식도염 증상과 내시경 확인", "기능성 소화불량과 위내시경", "과민성 장증후군과 대장 질환 감별"],
        "checkup": ["상반기 건강검진을 미리 받는 이점", "간초음파로 보는 지방간", "갑상선 초음파 검사가 필요한 경우", "이상지질혈증 수치 읽는 법"],
        "sunday": ["봄철 일교차와 혈압 관리", "주말에 챙기는 만성질환 정기 진료", "꽃가루 시즌 기침이 오래갈 때", "당뇨 환자의 봄철 운동 수칙"],
        "vaccine": ["봄철 피로와 영양수액 상담", "성인 예방접종 점검표", "대상포진 예방접종 대상", "A형 간염 항체 검사와 접종"],
    },
    "summer": {
        "endoscopy": ["여름철 장염과 대장 질환 감별", "휴가 전 위·대장 내시경 일정 잡기", "혈변이 보일 때 확인할 것", "대장내시경 장정결 준비"],
        "checkup": ["여름 비수기 건강검진", "공복혈당과 당화혈색소", "복부초음파로 보는 담석", "경동맥 초음파가 필요한 경우"],
        "sunday": ["냉방병과 여름 감기", "주말 급성 위장염 대처", "열탈진·열사병 증상 구분", "여름철 고혈압약 복용 주의"],
        "vaccine": ["여름철 탈수와 수액 치료 상담", "해외여행 전 예방접종", "파상풍 예방접종 주기", "비만클리닉 상담 전 알아둘 것"],
    },
    "autumn": {
        "endoscopy": ["대장내시경 전날 식사와 커피", "수면내시경 진정의 원리와 주의사항", "대장 용종의 종류와 추적검사 주기", "위축성 위염과 장상피화생"],
        "checkup": ["연말 전에 건강검진을 서둘러야 하는 이유", "분변잠혈검사 양성일 때", "간수치 AST·ALT 해석", "국가 위암검진 2년 주기의 의미"],
        "sunday": ["혈압약에 대한 오해", "환절기 만성질환 관리", "일요일 오전 진료 활용법", "가을철 기관지염과 기침"],
        "vaccine": ["독감 예방접종 적기", "폐렴구균 예방접종 대상", "만성피로와 영양수액 상담", "가을철 체중 관리와 비만클리닉"],
    },
    "winter": {
        "endoscopy": ["흑색변이 나올 때 의심할 위장관 출혈", "연말 음주 후 속쓰림과 위염", "겨울철 수면내시경 받기 전 준비", "대장암 검진 대상과 대장내시경"],
        "checkup": ["12월 국가건강검진 마감 전 체크리스트", "연말 회식 후 간수치와 지방간", "골밀도 검사 대상과 의미", "내년 검진 대상자 확인 방법"],
        "sunday": ["한파와 심뇌혈관 질환 주의", "겨울 감기몸살 주말 진료", "겨울철 혈당 관리", "실내 생활과 호흡기 질환"],
        "vaccine": ["겨울철 독감 늦게라도 접종해야 하는 경우", "연말 피로와 영양수액 상담", "겨울철 체중 증가 관리", "대상포진 예방접종 상담"],
    },
}


def season_of(month):
    return {3: "spring", 4: "spring", 5: "spring", 6: "summer", 7: "summer", 8: "summer",
            9: "autumn", 10: "autumn", 11: "autumn"}.get(month, "winter")


def build_prompt(category, target_date, day_str, existing_titles, topic_hint=None, fixed_title=None):
    cat_name, author, role, _ = CATEGORY_META[category]
    title_rule = (f'- 제목은 반드시 다음을 그대로 사용: "{fixed_title}"' +
                  (f"\n- 핵심 주제: {topic_hint}" if topic_hint else "")
                  if fixed_title else
                  f"- 주제 힌트: {topic_hint}\n- 아래 기존 제목들과 주제·표현이 겹치지 않게 할 것:\n  " +
                  "\n  ".join(existing_titles[-40:]))
    return f"""
당신은 인천 서구 불로동 '검단중앙내과의원'의 {author}({role})입니다.
환자분들이 검색해서 읽었을 때 'AI가 찍어낸 홍보글'이라는 느낌이 전혀 들지 않고, 실제 동네 내과 원장이 진료 후 직접 차분하게 적어 내려간 현실적인 의학 칼럼을 작성하십시오.

[원내 정보 (반드시 아래 확인된 사실 범위 안에서만 언급할 것)]
{VERIFIED_FACTS}

[AI 티를 완전히 없애기 위한 핵심 문체 규칙 (가장 중요)]
1. **천편일률적인 서두 인사 금지**:
   - 모든 글을 똑같이 "안녕하십니까. 올바른 의학 정보로 지역 주민의 건강을 따뜻하게 살피는..."으로 시작하지 마십시오.
   - 첫 문단은 곧바로 진료실에서 실제로 겪는 계절적·임상적 상황이나 검사 결과지를 들고 오신 환자분의 구체적인 사례로 자연스럽게 시작하고, 문단 중간이나 끝에 "{author}({role})입니다."라고 담백하게 밝히십시오.
   - (예시: "날씨가 쌀쌀해지면서 아침에 재본 혈압이 평소보다 높게 나와 내원하시는 분들이 부쩍 늘었습니다. 검단중앙내과의원 {author}입니다.", "국가건강검진 결과지에서 '분변잠혈검사 양성'이나 '간수치 상승'이라는 문구를 보시고 놀란 표정으로 진료실에 들어오시는 분들이 많습니다.")
2. **인위적인 대화 인용구 나열 금지**:
   - 억지스러운 환자 대사 3개를 연달아 줄줄이 나열하지 마십시오.
   - 실제 환자가 진료실에서 흔히 묻는 현실적인 짧은 질문 1개만 `<p class='reader-quote-dialog'>\"...\"</p>`로 인용하거나, 문장 속에 자연스럽게 녹여 쓰십시오.
3. **이모지 및 억지 비유·번역투 절대 금지**:
   - 소제목과 본문 어디에도 이모지(💡, 🔬, 🩺, ✨, 📌 등)를 절대 넣지 마십시오.
   - AI 특유의 억지 비유("마치 ~와 같습니다", "수도관의 찌꺼기", "조기 화재경보기", "씨앗이 자라듯", "침묵의 살인자", "침묵의 장기", "우리 몸의 방패", "모의 훈련")를 절대 쓰지 마십시오. 비유 대신 실제 의학적 기전(위산 역류, 점막하층 침윤, 간세포 효소 유출, 장정결 불량 시 시야 가림 등)을 쉬운 우리말로 담백하게 설명하십시오.
   - 영어 섞인 AI 상투어("Myth", "Fact", "솔루션", "골든타임")나 과장된 감성 문구("막연한 두려움", "지극히 자연스러운 감정입니다", "사랑하는 가족과 함께", "든든한 동반자")를 절대 쓰지 마십시오.
4. **제목 작성 규칙**:
   - 제목에 큰따옴표("")로 질문을 감싸는 패턴을 쓰지 마십시오.
   - 담백하고 신뢰감 있는 의학 칼럼 제목으로 작성하십시오. (예: `대장내시경 전날 식사 관리와 커피 섭취를 제한하는 이유`, `국가건강검진 간수치(AST·ALT) 상승의 원인과 복부초음파 검사`)

[글의 HTML 구성]
- 전체 본문은 `<div class='reader-body reader-center'> ... </div>` 안에 작성합니다.
- 일반 문단은 `<p class='reader-p'>...</p>`를 사용합니다.
- 본문은 3개의 명확한 소제목(`<h2 class='reader-subheading'>소제목 텍스트 (이모지 없이)</h2>`)으로 나누어 실제 진료실에서 설명하듯 구체적인 수치, 검사 과정, 준비 요령, 판정 기준을 설명하십시오.
- 본문 중간에 환자가 한눈에 비교·참고할 수 있는 실용적인 정리 표(`<div class='reader-table-wrap'><table class='reader-table'><thead>...</thead><tbody>...</tbody></table></div>`)를 1개 포함하십시오.
- 표 아래나 본문 후반에 `<div class='reader-callout'><div class='callout-lead'>진료실 핵심 당부사항</div><div class='callout-desc'>...</div></div>` 박스로 실제 생활 관리나 검사 전후 주의점을 2~3가지 정리하십시오.
- 마무리는 과장된 홍보 문구 없이 차분하게 맺고, 병원 주소·전화번호·버스번호는 본문에 나열하지 마십시오(하단 공통 배너에 자동 출력됨).
- 본문 맨 마지막 줄에는 반드시 아래 의료법 안내 문구를 그대로 넣으십시오:
  `<div class='reader-callout'><div class='callout-desc'>본 게시물은 의료법 제56조를 준수하여 의료 정보 제공 목적으로 작성되었습니다. 개인의 상태에 따라 진단과 치료가 달라질 수 있으므로 반드시 전문의와 상담하시기 바랍니다.</div></div>`

[절대 금지 단어 및 규칙]
1. 의료광고법 제56조 금지어: 최고, 1위, 유일, 최초, 완치, 100%, 부작용 없음, 확실한, 완벽한, 추천합니다, 잘하는 곳, 대학병원급, 전문병원.
2. 미확인 사실 금지: 200평, 수만 건, 0.1mm, 당일 원스톱, 당일 절제, 무료 주차, 1:1 모니터링, 특정 약제명(오라팡, 프로포폴, 미다졸람 등), 백신 가수(3가, 4가 등).
3. HTML 속성값은 반드시 작은따옴표(')만 사용하십시오 (`class='reader-p'`). 큰따옴표(")는 JSON 파싱 오류를 일으킵니다.

[작성 조건]
- 분류: {cat_name}
- 발행일: {target_date.strftime('%Y년 %m월 %d일')} ({day_str})
{title_rule}

[출력: 아래 키를 가진 순수 JSON만]
{{
  "title": "따옴표 없이 담백하고 명확한 의학칼럼 제목 (25~42자)",
  "snippet": "글의 핵심 의학 정보를 담백하게 요약한 2문장 (90~120자)",
  "tags": ["태그 5~7개", "검단내과", "불로동내과"],
  "contentHtml": "<div class='reader-body reader-center'> ... </div> (공백 포함 1800~2600자 분량의 실제 전문의 문체 칼럼)"
}}
"""


def call_gemini(prompt):
    api_key = os.environ.get("GOOGLE_API_KEY") or os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GOOGLE_API_KEY 없음")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={api_key}"
    payload = {"contents": [{"parts": [{"text": prompt}]}],
               "generationConfig": {"response_mime_type": "application/json", "temperature": 0.7,
                                    "maxOutputTokens": 8192}}
    req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"),
                                 headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as res:
        data = json.loads(res.read().decode("utf-8"))
    raw_text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
    if raw_text.startswith("```json"):
        raw_text = raw_text[7:]
    if raw_text.startswith("```"):
        raw_text = raw_text[3:]
    if raw_text.endswith("```"):
        raw_text = raw_text[:-3]
    return json.loads(raw_text.strip())


def generate_valid(category, target_date, day_str, existing_titles, topic_hint=None, fixed_title=None, retries=5):
    cat_name, author, role, avatar = CATEGORY_META[category]
    for attempt in range(1, retries + 1):
        try:
            out = call_gemini(build_prompt(category, target_date, day_str, existing_titles, topic_hint, fixed_title))
        except Exception as e:
            print(f"   ⚠️ 시도 {attempt}: API 오류 {e}")
            time.sleep(3)
            continue

        raw_title = fixed_title or out.get("title", "").strip()
        raw_snippet = out.get("snippet", "").strip()
        raw_content = out.get("contentHtml", "").strip()

        # Sanitize common medical adverbs before validation
        clean_title = sanitize_medical_text(raw_title)
        clean_snippet = sanitize_medical_text(raw_snippet)
        clean_content = sanitize_medical_text(raw_content)

        post = {
            "category": category, "categoryName": cat_name,
            "title": clean_title,
            "author": author, "authorRole": role, "authorAvatar": avatar,
            "readTime": "4분 소요", "themeClass": f"theme-{category}", "cardBadge": cat_name,
            "snippet": clean_snippet,
            "tags": out.get("tags", [])[:10],
            "contentHtml": clean_content,
        }
        problems = validate_post(post)
        if not fixed_title and is_duplicate_title(post["title"], existing_titles):
            problems.append((post["title"][:20], "기존 제목과 중복"))
        if not problems:
            return post
        print(f"   ⚠️ 시도 {attempt}: 검증 실패 {problems[:4]}")
    return None


def load_queue():
    with open(QUEUE_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_queue(queue):
    with open(QUEUE_FILE, "w", encoding="utf-8") as f:
        json.dump(queue, f, ensure_ascii=False, indent=2)


def rewrite_posts(ids):
    queue = load_queue()
    titles = [p["title"] for p in queue]
    failed = []
    for p in queue:
        if p["id"] not in ids:
            continue
        print(f"✍️  [{p['id']}] 재작성: {p['title'][:45]}")
        d = datetime.fromisoformat(p["scheduledAt"])
        new = generate_valid(p["category"], d, p.get("dayOfWeek", ""), titles,
                             topic_hint=p.get("topicHint"), fixed_title=p["title"])
        if new:
            p.update({k: new[k] for k in ("snippet", "tags", "contentHtml", "author", "authorRole",
                                          "authorAvatar", "categoryName", "themeClass", "cardBadge", "readTime")})
            for k in ("cardQuote", "cardBold", "cardPoints"):
                p.pop(k, None)
            save_queue(queue)
            print("   ✅ 완료")
        else:
            failed.append(p["id"])
    if failed:
        print(f"❌ 재작성 실패: {failed}")
        sys.exit(1)


def extend_queue(weeks_ahead=4, min_days_buffer=7):
    queue = load_queue()
    queue.sort(key=lambda p: p["scheduledAt"])
    now = datetime.now(KST)
    target_end = now + timedelta(weeks=weeks_ahead)
    last_date = datetime.fromisoformat(queue[-1]["scheduledAt"])
    if last_date >= target_end:
        print(f"✅ {last_date:%Y-%m-%d}까지 큐 확보됨 (총 {len(queue)}편)")
        return

    titles = [p["title"] for p in queue]
    next_id = max(p["id"] for p in queue) + 1
    last_friday = next((p["category"] for p in reversed(queue) if p.get("dayOfWeek") == "금요일"), "vaccine")
    friday_next = "sunday" if last_friday == "vaccine" else "vaccine"
    used_hints = set(p.get("topicHint", "") for p in queue)

    d = last_date + timedelta(days=1)
    added, skipped = 0, 0
    while d <= target_end:
        slot = {0: ("월요일", "endoscopy"), 2: ("수요일", "checkup"), 4: ("금요일", None)}.get(d.weekday())
        if slot:
            day_str, category = slot
            if category is None:
                category = friday_next
                friday_next = "vaccine" if friday_next == "sunday" else "sunday"
            hints = SEASONAL_HINTS[season_of(d.month)][category]
            fresh = [h for h in hints if h not in used_hints] or hints
            hint = random.choice(fresh)
            print(f"✍️  {d:%Y-%m-%d}({day_str}) [{category}] 주제: {hint}")
            post = generate_valid(category, d, day_str, titles, topic_hint=hint)
            if post:
                post.update({"id": next_id, "dayOfWeek": day_str, "topicHint": hint,
                             "scheduledAt": d.replace(hour=8, minute=30, second=0, microsecond=0).isoformat()})
                queue.append(post)
                titles.append(post["title"])
                used_hints.add(hint)
                next_id += 1
                added += 1
                save_queue(queue)
                print(f"   ✅ {post['title']}")
            else:
                skipped += 1
                print("   ❌ 생성 실패 - 이 날짜는 건너뜀")
        d += timedelta(days=1)

    print(f"🎉 추가 {added}편 / 실패 {skipped}편 (총 {len(queue)}편)")
    upcoming = [p for p in queue if datetime.fromisoformat(p["scheduledAt"]) > now]
    if skipped and (not upcoming or datetime.fromisoformat(upcoming[-1]["scheduledAt"]) < now + timedelta(days=min_days_buffer)):
        print("❌ 예약 글이 1주일치 미만입니다. 확인이 필요합니다.")
        sys.exit(1)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--rewrite", help="재작성할 글 id (쉼표 구분)")
    ap.add_argument("--weeks", type=int, default=4)
    args = ap.parse_args()
    if args.rewrite:
        rewrite_posts({int(x) for x in args.rewrite.split(",")})
    else:
        extend_queue(weeks_ahead=args.weeks)
