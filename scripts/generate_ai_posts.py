"""
검단중앙내과의원 시즌별 AI 자동 원고 생성 스크립트 (Seasonal AI Post Generator)
- 더바른성모내과 블로그의 검증된 프롬프트 & 의료광고법 준수 가이드라인 완벽 계승
- Google Gemini API (gemini-2.5-flash) 및 OpenAI API 지원
- .env 자동 로드 (GOOGLE_API_KEY / GEMINI_API_KEY)
- API 오류 시에도 무중단 동작하는 스마트 4계절 의학 템플릿 Fallback 내장
"""

import os
import sys
import json
import urllib.request
import urllib.error
from datetime import datetime, timezone, timedelta

# Fix Windows cp949 console encoding
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

KST = timezone(timedelta(hours=9))

# .env 파일 수동 파싱 (외부 패키지 없이 내장 기능만 사용)
def load_env():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    env_file = os.path.join(base_dir, ".env")
    if os.path.exists(env_file):
        with open(env_file, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, val = line.split("=", 1)
                    key = key.strip()
                    val = val.strip().strip("'").strip('"')
                    if key not in os.environ:
                        os.environ[key] = val

load_env()

# 더바른성모내과 양식 참고: 의료광고법 준수 프롬프트 & 검단중앙내과 팩트시트
SYSTEM_PROMPT = """
# Role & Philosophy (역할 및 철학)
당신은 인천 검단신도시 불로동에 위치한 **'검단중앙내과의원'**의 의료진(노인영 대표원장 및 김인선 원장)입니다.
더바른성모내과 블로그의 성공적인 편집 원칙을 계승하여, 환자의 건강을 위해 정확하고 정직한 의학 정보를 전달하는 **객관적인 팩트(Fact) 정보 제공자**로서 글을 작성합니다.

# Constraints (의료광고법 및 AI SEO 제약 조건)
1. **의료광고법 제56조 1항 준수**:
   - '최고', '1위', '완치', '100%', '부작용 없음', '유일한', '잘하는 곳' 등의 단정적·과장성 표현을 절대 사용하지 마십시오.
   - 글 하단에 반드시 의료법 준수 안내(Disclaimer)를 포함하십시오.
2. **문체 및 화자**:
   - 진료실에서 차분히 환자와 마주 앉아 설명하듯 부드러운 '**~습니다/다**'와 '**~요**'를 자연스럽게 섞어 쓰십시오.
   - 불필요한 기계적 인사말("안녕하십니까", "안녕하세요")은 지양하고, 환자가 겪는 증상과 공감 스토리로 포문을 여십시오.
3. **질문형 소제목 구조**:
   - 기계적인 H2("증상", "원인", "치료") 대신, 환자가 궁금해할 법한 **대화형/질문형 소제목**을 작성하십시오.
4. **검단중앙내과의원 팩트 정보 자연스러운 분산 배치**:
   - 위치: 인천 서구 고산후로 285 현해타워2 2층·3층 (불로동, 신검단중학교 버스정류장 바로 뒤, 신검단중앙역 도보 11분, 무료 지하주차장 완비)
   - 의료진: 노인영 대표원장(내과 전문의, 소화기내시경 세부전문의) / 김인선 원장(가정의학과 전문의)
   - 진료시간: 평일 08:30~19:00 / **수·토·일요일 08:30~13:00 (점심시간 없이 일요일 오전 정상 진료!)**
   - 시설: 대학병원급 고화질 내시경, 당일 원스톱 용종절제술, 200평 규모 독립 종합검진센터, 1:1 안심 수면 모니터링
"""

# 시즌별 의학 테마 캘린더
SEASONAL_TOPICS = {
    "spring": {
        "endoscopy": [
            ("봄철 춘곤증인 줄 알았는데 위궤양? 소화불량과 헬리코박터균 제균 치료", "헬리코박터균과 위궤양 조기 진단"),
            ("환절기 스트레스성 역류성 식도염, 위내시경으로 점막 손상도 확인하기", "역류성 식도염 병기 감별과 약물 치료")
        ],
        "checkup": [
            ("새봄 맞이 직장인·공단 건강검진, 연초에 여유롭게 받아야 하는 이유", "상반기 건강검진의 여유와 정확도"),
            ("봄철 국가 5대암 검진: 간초음파로 확인하는 지방간과 간경화 예방", "상복부 초음파를 통한 간 정밀 검진")
        ],
        "sunday": [
            ("봄철 큰 일교차와 혈압 변동, 일요일 아침에 편하게 받는 혈압 체크", "환절기 혈관 수축과 가정혈압 관리법"),
            ("직장인 만성피로와 주말 진료, 일요일 오전 8시 반부터 문 여는 내과", "주말 시간 낭비 없는 2인 전문의 밀착 진료")
        ],
        "vaccine": [
            ("나른한 봄날 춘곤증? 만성피로를 날리는 고용량 마이어스 영양수액", "미토콘드리아 활성화와 피로회복 수액"),
            ("봄철 황사와 미세먼지 호흡기 질환, 면역 강화 수액 솔루션", "비타민C와 항산화 영양주사 요법")
        ]
    },
    "summer": {
        "endoscopy": [
            ("여름철 찬 음식 먹고 복통·설사? 단순 배탈과 대장염의 내시경적 감별", "감염성 장염과 염증성 장질환 구분"),
            ("휴가철 전 위·대장 내시경, 당일 용종절제술로 편안한 여행 준비하기", "당일 원스톱 용종절제술의 안전성")
        ],
        "checkup": [
            ("여름휴가 기간을 이용한 5대암 국가종합검진, 200평 독립센터에서 쾌적하게", "여름 비수기 원스톱 건강검진 안내"),
            ("갈증 심하고 소변 잦다면? 국가검진 혈당 수치로 당뇨병 조기 발견", "공복혈당과 당화혈색소(HbA1c) 검진")
        ],
        "sunday": [
            ("여름철 냉방병과 급성 위장염, 일요일에도 문 여는 검단중앙내과 진료", "주말 및 일요일 오전 08:30 진료 안내"),
            ("주말 나들이 후 갑작스러운 고열·몸살, 일요일 아침 신속 진료", "일요일 오전 점심시간 없이 연속 진료")
        ],
        "vaccine": [
            ("무더위 탈수와 열사병 대비! 빠른 수분·전해질 균형 회복 아미노산 수액", "가정의학과 맞춤 수분 영양수액 케어"),
            ("냉방병으로 지친 체력, 면역력 증진 마이어스 칵테일 수액", "환절기 피로 회복과 전해질 공급")
        ]
    },
    "autumn": {
        "endoscopy": [
            ("대장내시경 검사 전날, 커피와 음식 언제까지 먹어도 될까요? 장정결 수칙", "3일 전 식단 조절과 알약 장정결제 복용법"),
            ("수면내시경, 자고 일어났는데 왜 아무 기억이 안 날까요? 안전한 진정 원리", "1:1 활력징후 모니터링 안심 수면내시경")
        ],
        "checkup": [
            ("연말 건강검진 대란 전 10월에 꼭 받아야 하는 국가 5대암 검진", "연말 몰림 피하는 가을 검진 골든타임"),
            ("국가 대장암 분변잠혈검사 '양성' 판정 시 당황하지 않고 대장내시경 받는 법", "분변잠혈 양성 원인과 공단 지원 혜택")
        ],
        "sunday": [
            ("쌀쌀해진 날씨에 혈압약 복용 주저마세요! 심뇌혈관 질환 예방 원칙", "혈관 보호를 위한 조기 혈압 치료와 일요일 진료"),
            ("평일엔 야근, 주말엔 검단중앙내과! 일요일 오전 만성질환 정기 처방", "일요일 오전 08:30~13:00 정기 진료")
        ],
        "vaccine": [
            ("올가을 독감 백신 언제 맞아야 할까요? 2026-2027절기 4가 백신 & 폐렴구균", "독감·폐렴구균 동시 접종의 시너지 효과"),
            ("자도 자도 피곤하고 면역력이 바닥났다면? 만성피로 증후군과 1:1 맞춤 영양수액", "가정의학과 전문의 처방 프리미엄 수액")
        ]
    },
    "winter": {
        "endoscopy": [
            ("연말 잦은 술자리 후 속쓰림과 블랙스툴(흑색변)? 위출혈 응급 신호", "위궤양 출혈의 조기 내시경 지혈술"),
            ("겨울철 수면내시경, 추운 날씨에도 따뜻하고 안전하게 받는 검진 팁", "체온 유지 시스템과 안락한 회복실 케어")
        ],
        "checkup": [
            ("올해 국가건강검진 마지막 기회! 12월 말 마감 전 꼭 챙겨야 할 검진 항목", "12월 국가검진 마감 전 수검 요령"),
            ("잦은 연말 회식으로 치솟은 간 수치(AST/ALT), 지방간 초음파 정밀 검사", "알코올성 및 비알코올성 지방간 치료")
        ],
        "sunday": [
            ("갑작스러운 한파에 뇌졸중·심근경색 주의보! 고혈압 환자 겨울철 외출 수칙", "겨울철 혈압 급상승 예방과 주말 진료"),
            ("주말 한파로 찾아온 감기몸살, 일요일 아침에 치료받는 일요일 내과", "일요일 오전 8시 반부터 정상 진료")
        ],
        "vaccine": [
            ("지친 연말 간 해독과 피로 회복을 돕는 고농축 글루타치온 백옥 수액", "가정의학과 전문의 1:1 맞춤 영양수액"),
            ("겨울철 면역 결핍 방지! 고용량 비타민D 주사 및 비타민C 영양주사", "뼈 건강과 면역력을 동시에 지키는 주사 요법")
        ]
    }
}

def get_current_season(month):
    if month in [3, 4, 5]:
        return "spring"
    elif month in [6, 7, 8]:
        return "summer"
    elif month in [9, 10, 11]:
        return "autumn"
    else:
        return "winter"

def generate_post_with_gemini(category, season, target_date, day_of_week):
    """
    Google Gemini 2.5 Flash 모델을 호출하여 의료광고법과 GEO 규격을 완벽 준수한 건강칼럼 생성
    """
    api_key = os.environ.get("GOOGLE_API_KEY") or os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return None

    is_kim = (category in ["sunday", "vaccine"])
    author_name = "김인선 원장" if is_kim else "노인영 대표원장"
    author_role = "가정의학과 전문의" if is_kim else "내과 전문의 / 소화기내시경 세부전문의"
    author_avatar = "https://joongangmedicine.com/img/main/doctor/thum_doc_02.png" if is_kim else "https://joongangmedicine.com/img/main/doctor/thum_doc_01.png"

    category_names = {
        "endoscopy": "위·대장 내시경 클리닉",
        "checkup": "5대암·국가건강검진",
        "sunday": "일요일진료·병원소식",
        "vaccine": "예방접종·수액"
    }
    cat_name = category_names.get(category, "건강칼럼")

    user_prompt = f"""
{SYSTEM_PROMPT}

## 칼럼 작성 요청 사양
- 작성 의사: {author_name} ({author_role})
- 대분류: {cat_name} (theme-{category})
- 계절 테마: {season} 시즌
- 발행 예정일: {target_date.strftime('%Y년 %m월 %d일')} ({day_of_week})

## 반드시 아래 JSON 스키마에 맞추어 유효한 JSON 형식으로만 응답하십시오 (Markdown 코드블록 없이 순수 JSON):
{{
  "category": "{category}",
  "categoryName": "{cat_name}",
  "title": "환자의 궁금증을 자극하는 따옴표 포함 질문형 제목 (35~45자)",
  "author": "{author_name}",
  "authorRole": "{author_role}",
  "authorAvatar": "{author_avatar}",
  "readTime": "3~4분 소요",
  "themeClass": "theme-{category}",
  "cardBadge": "{cat_name}",
  "cardQuote": "따옴표로 둘러싸인 환자의 핵심 질문 (20자 내외)",
  "cardBold": "의학적 해답을 제시하는 굵은 한 줄 타이틀 (22자 내외)",
  "cardPoints": [
    "• 핵심 포인트 1",
    "• 핵심 포인트 2",
    "• 핵심 포인트 3"
  ],
  "snippet": "검색 결과 및 요약용 2줄 설명 (100자 내외)",
  "tags": ["태그1", "태그2", "태그3", "검단내과", "불로동내과"],
  "contentHtml": "<div class=\\"reader-body reader-center\\">...대화형 p.reader-p, reader-subheading, reader-callout, reader-blank 등으로 작성된 1500자 이상의 고품질 본문. 하단에 의료법 제56조 1항 준수 안내문구 필수 포함...</div>"
}}
"""

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [{"parts": [{"text": user_prompt}]}],
        "generationConfig": {
            "response_mime_type": "application/json",
            "temperature": 0.7,
            "maxOutputTokens": 8192
        }
    }

    try:
        req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=headers)
        with urllib.request.urlopen(req, timeout=30) as res:
            data = json.loads(res.read().decode('utf-8'))
            raw_text = data['candidates'][0]['content']['parts'][0]['text']
            post_data = json.loads(raw_text)
            post_data["author"] = author_name
            post_data["authorRole"] = author_role
            post_data["authorAvatar"] = author_avatar
            print(f"✨ [Gemini 2.5 Flash] '{post_data['title'][:28]}...' 생성 성공!")
            return post_data
    except Exception as e:
        print(f"⚠️ Gemini 2.5 Flash 호출 오류 (Fallback 모드로 안전 전환): {e}")
        return None

def generate_fallback_post(category, season, target_date, day_of_week, index_offset=0):
    """
    API Key 통신 장애 시에도 100% 안전하게 동작하는 스마트 룰베이스 생성기
    """
    is_kim = (category in ["sunday", "vaccine"])
    author_name = "김인선 원장" if is_kim else "노인영 대표원장"
    author_role = "가정의학과 전문의" if is_kim else "내과 전문의 / 소화기내시경 세부전문의"
    author_avatar = "https://joongangmedicine.com/img/main/doctor/thum_doc_02.png" if is_kim else "https://joongangmedicine.com/img/main/doctor/thum_doc_01.png"

    category_names = {
        "endoscopy": "위·대장 내시경 클리닉",
        "checkup": "5대암·국가건강검진",
        "sunday": "일요일진료·병원소식",
        "vaccine": "예방접종·수액"
    }

    topics = SEASONAL_TOPICS.get(season, SEASONAL_TOPICS["autumn"])
    topic_group = topics.get(category, topics.get("endoscopy"))
    item_title, item_bold = topic_group[index_offset % len(topic_group)]

    return {
        "category": category,
        "categoryName": category_names.get(category, "건강칼럼"),
        "title": f'"{item_title}"',
        "author": author_name,
        "authorRole": author_role,
        "authorAvatar": author_avatar,
        "readTime": "3분 소요",
        "themeClass": f"theme-{category}",
        "cardBadge": category_names.get(category, "전문 진료 클리닉"),
        "cardQuote": f'"{item_title[:22]}..."',
        "cardBold": item_bold,
        "cardPoints": [
            "• 소화기내시경 및 가정의학과 2인 전문의 협진",
            "• 대학병원급 장비 기반의 정밀 진단 시스템",
            "• 일요일 오전 08:30~13:00 안심 주말 진료"
        ],
        "snippet": f"{item_title}에 대해 검단중앙내과의원 전문 의료진이 알기 쉽게 전해드립니다. 초기 정확한 진단과 올바른 예방 관리가 건강을 지키는 지름길입니다.",
        "tags": ["검단내과", "불로동내과", "검단중앙내과", "건강검진", "일요일진료"],
        "contentHtml": f"""
          <div class="reader-body reader-center">
            <p class="reader-p">진료실에서 마주하는 검단 주민분들의 고민을 진솔하게 나눕니다.</p>
            <p class="reader-p">올바른 의학 정보로 지역 주민의 평생 주치의가 되는 검단중앙내과의원 {author_name}입니다.</p>
            <div class="reader-blank"></div>
            <p class="reader-quote-dialog">"{item_title}"</p>
            <div class="reader-blank"></div>
            <p class="reader-p">이런 증상이 반복되면 일상이 참 피곤하고 불안해집니다. 원인이 무엇일까요?</p>
            <hr class="reader-hr">
            <div class="reader-subheading">🩺 1. 증상을 가볍게 넘겨서는 안 되는 이유</div>
            <div class="reader-callout">
              <div class="callout-lead">{item_bold}</div>
              <div class="callout-desc">초기 증상이 경미하더라도 원인을 명확히 진단받고 조기에 치료를 시작하는 것이 합병증을 막는 가장 확실한 방법입니다.</div>
            </div>
            <p class="reader-p">인천 서구 검단 불로동 검단중앙내과의원은 대학병원급 정밀 검진 장비와 풍부한 임상 경험을 갖춘 2인 전문의가 정직하고 세심하게 진료합니다.</p>
            <hr class="reader-hr">
            <div class="reader-subheading">🏥 2. 바쁜 주민을 위한 일요일 진료 & 지하 무료 주차</div>
            <p class="reader-p">평일 진료가 어려우신 분들을 위해 <strong>일요일에도 오전 08:30부터 13:00까지 점심시간 없이 정상 진료</strong>합니다. 현해타워2 건물 지하주차장에 무료 주차가 지원되므로 편안하게 내원하시기 바랍니다.</p>
            <div class="reader-blank"></div>
            <div class="reader-callout" style="background:#f8fafc; border-left-color:#94a3b8; font-size:12px; color:#64748b;">
              💡 <strong>진료 안내 및 주의사항 (의료법 제56조 1항 준수)</strong><br>
              본 게시물은 의료법 제56조 1항을 준수하여 의료 정보 제공 목적으로 작성되었습니다. 개개인의 기저질환 및 상태에 따라 진단 결과가 다를 수 있으므로 반드시 내과 전문의와 상담하시기 바랍니다.
            </div>
            <div class="reader-blank"></div>
            <p class="reader-p">감사합니다.</p>
          </div>
        """
    }

def extend_posts_queue(weeks_ahead=4):
    """
    현재 큐 파일(posts_queue.json)을 검사하여, 부족한 분량을 주 3회(월, 수, 금) 일정으로 자동 연장 생성
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    queue_file = os.path.join(base_dir, "data", "posts_queue.json")

    with open(queue_file, "r", encoding="utf-8") as f:
        queue = json.load(f)

    last_post = queue[-1]
    last_date = datetime.fromisoformat(last_post["scheduledAt"])

    now = datetime.now(KST)
    target_end_date = now + timedelta(weeks=weeks_ahead)

    if last_date >= target_end_date:
        print(f"✅ 이미 {last_date.strftime('%Y-%m-%d')}까지 큐가 충분히 확보되어 있습니다. (전체 큐: {len(queue)}편)")
        return

    print(f"🚀 {last_date.strftime('%Y-%m-%d')} 이후 신규 큐 생성을 시작합니다...")

    curr_date = last_date + timedelta(days=1)
    next_id = max(p["id"] for p in queue) + 1
    added_count = 0

    rotation_plan = [
        (0, "월요일", "endoscopy"),
        (2, "수요일", "checkup"),
        (4, "금요일", "sunday_or_vaccine")
    ]
    friday_flip = 0

    while curr_date <= target_end_date:
        weekday = curr_date.weekday()
        match = next((item for item in rotation_plan if item[0] == weekday), None)
        if match:
            day_num, day_str, cat_type = match
            if cat_type == "sunday_or_vaccine":
                category = "vaccine" if (friday_flip % 2 == 1) else "sunday"
                friday_flip += 1
            else:
                category = cat_type

            season = get_current_season(curr_date.month)
            scheduled_at = curr_date.replace(hour=8, minute=30, second=0, microsecond=0).isoformat()

            # 1. Google Gemini 2.5 Flash API 호출
            post_data = generate_post_with_gemini(category, season, curr_date, day_str)

            # 2. 실패 시 스마트 Fallback 템플릿 사용
            if not post_data:
                post_data = generate_fallback_post(category, season, curr_date, day_str, index_offset=added_count)

            post_data["id"] = next_id
            post_data["scheduledAt"] = scheduled_at
            post_data["dayOfWeek"] = day_str

            queue.append(post_data)
            next_id += 1
            added_count += 1

        curr_date += timedelta(days=1)

    with open(queue_file, "w", encoding="utf-8") as f:
        json.dump(queue, f, ensure_ascii=False, indent=2)

    print(f"🎉 총 {added_count}편의 신규 건강칼럼이 큐에 추가되었습니다! (전체 큐: {len(queue)}편)")

if __name__ == "__main__":
    extend_posts_queue(weeks_ahead=4)
