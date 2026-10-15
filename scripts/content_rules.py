"""
검단중앙내과 콘텐츠 규칙 (단일 기준)
- VERIFIED_FACTS: 공식 홈페이지(joongangmedicine.com)에서 확인된 사실만 기재
- FORBIDDEN_PATTERNS: 미확인 주장 / 의료광고법 위험 표현
새 사실을 추가하려면 반드시 원장님 확인 후 VERIFIED_FACTS에 넣을 것.
"""

import re
import difflib

VERIFIED_FACTS = """
[검단중앙내과의원 - 확인된 사실만 사용할 것 (출처: 공식 홈페이지)]
- 보건복지부 지정 국가건강검진 기관
- 주소: 인천광역시 서구 고산후로 285, 현해타워2 2·3층 (불로동)
- 교통: 신검단중학교 버스정류장 바로 뒤(1, 76, 77, 991번), 인천1호선 신검단중앙역 도보 11분
- 주차: 건물 내 지하주차장 완비 (요금 정보 없음 - '무료'라고 쓰지 말 것)
- 전화: 032-564-7788
- 진료시간: 월·화·목·금 08:30~19:00 (점심 13:00~14:00) / 수·토·일 08:30~13:00 (점심시간 없이 진료) / 공휴일 휴진
- 노인영 대표원장: 내과 전문의, 소화기내시경 세부전문의, 한림대학교 성심병원 소화기내과 외래교수·전임의,
  대한내과학회 평생정회원, 대한소화기내시경학회·대한간학회·대한당뇨병학회·대한고혈압학회 정회원,
  건강매거진 with 굿닥터·MBN 특집다큐H·메디컬투데이 출연
- 김인선 원장: 가정의학과 전문의, 삼성서울병원 전공의, 가톨릭중앙의료원 서울성모병원 수련의,
  대한가정의학회·대한비만학회 정회원, 대한일차진료학회·대한비만치료학회·대한임상통증학회 회원
- 진료: 공단검진·5대암검진·종합검진, 소화기·호흡기·내분비대사·순환기 질환, 위·대장 내시경(수면내시경 포함),
  용종절제술, 초음파(복부·갑상선·심장·경동맥 등)·방사선 검사, 영양수액, 비만클리닉, 예방접종
- 진료 철학: 꼭 필요한 진료, 꼼꼼한 검사, 이해하기 쉬운 설명
"""

# (정규식, 사유)
FORBIDDEN_PATTERNS = [
    (r"\d+\s*평", "검진센터 규모 미확인"),
    (r"독립\s*(종합)?\s*검진\s*센터", "미확인 시설"),
    (r"독립\s*수액실", "미확인 시설"),
    (r"수만\s*건|수천\s*건|\d[\d,]*\s*건\s*이상", "시술 건수 미확인"),
    (r"0\.\d+\s*mm", "장비 성능 수치 미확인"),
    (r"대학\s*병원\s*급", "비교 표현(의료광고법 위험)"),
    (r"원스톱", "'당일 원스톱' 미확인"),
    (r"당일\s*(바로\s*)?(용종|절제)", "'당일 절제' 미확인"),
    (r"무료\s*주차|주차\s*(비|요금)?\s*무료|전액\s*무료\s*주차", "주차 요금 미확인"),
    (r"1\s*:\s*1\s*(활력|산소|모니터|맥박)", "미확인 모니터링 체계"),
    (r"마우스피스", "미확인 기구"),
    (r"CO2|이산화탄소\s*가스", "미확인 장비"),
    (r"오라팡|알약\s*(형태의\s*)?장정결제|정제형\s*장정결제", "미확인 처방"),
    (r"마이어스|글루타치온|백옥\s*주사|백옥\s*수액|비타민\s*D\s*주사", "미확인 수액/주사 제품"),
    (r"프로포폴|미다졸람", "미확인 진정 약제"),
    (r"[34]\s*가\s*(독감\s*)?백신", "백신 가수 명시 금지(절기별 변동)"),
    (r"전문\s*병원", "'전문병원'은 법정 지정 용어"),
    (r"최고|1위|유일|최초|완치|100\s*%|부작용\s*(이\s*)?없|확실한|완벽한|잘하는\s*곳|추천합니다", "의료광고법 금지 표현"),
]

ALLOWED_CATEGORIES = {"endoscopy", "checkup", "sunday", "vaccine"}


def find_violations(text):
    """주어진 텍스트에서 금지 패턴을 찾아 [(매칭문구, 사유)] 반환"""
    found = []
    for pat, reason in FORBIDDEN_PATTERNS:
        for m in re.finditer(pat, text):
            found.append((m.group(0), reason))
    return found


def check_html_safety(html):
    issues = []
    if re.search(r"<\s*script", html, re.I):
        issues.append(("<script>", "스크립트 태그 금지"))
    if re.search(r"\son\w+\s*=", html, re.I):
        issues.append(("on*= 속성", "이벤트 속성 금지"))
    if re.search(r"<\s*iframe", html, re.I):
        issues.append(("<iframe>", "iframe 금지"))
    return issues


def post_text_fields(post):
    parts = [post.get("title", ""), post.get("snippet", ""), " ".join(post.get("tags", [])),
             post.get("contentHtml", "")]
    return "\n".join(parts)


def validate_post(post, require_body=True):
    """게시글 1편 검증. 문제 목록 반환 (빈 리스트면 통과)"""
    problems = []
    for key in ("title", "snippet", "category"):
        if not post.get(key):
            problems.append((key, "필수 항목 누락"))
    if post.get("category") not in ALLOWED_CATEGORIES:
        problems.append((post.get("category"), "잘못된 카테고리"))
    body = post.get("contentHtml", "")
    if require_body:
        plain = re.sub(r"<[^>]+>", "", body)
        if len(plain) < 1200:
            problems.append((f"{len(plain)}자", "본문이 너무 짧음(1200자 미만)"))
        if "의료법 제56조" not in body:
            problems.append(("면책 문구", "의료법 안내 문구 누락"))
    problems += check_html_safety(body)
    problems += find_violations(post_text_fields(post))
    return problems


def normalize_title(t):
    return re.sub(r"[\s\"'“”‘’?!.,·:]", "", t or "")


def is_duplicate_title(title, existing_titles, threshold=0.75):
    n = normalize_title(title)
    for t in existing_titles:
        if difflib.SequenceMatcher(None, n, normalize_title(t)).ratio() >= threshold:
            return True
    return False
