/**
 * 검단중앙내과의원 공식 건강블로그 (Standalone Medical Blog)
 * - 텍스트 기반 썸네일 그래픽 카드
 * - 주 3회(월·수·금 08:30 KST) 자동 발행 큐 연동
 * - 김인선 원장 공식 사진 적용 (doc_slide_kim_title.png / thum_doc_02.png)
 * - GEO (Generative Engine Optimization) 특화 구조
 */

// 12 Scheduled Articles across 4 Weeks (Mon / Wed / Fri 08:30 KST)
let ARTICLES = [
  {
    id: 1,
    scheduledAt: "2026-09-21T08:30:00+09:00",
    dayOfWeek: "월요일",
    category: "endoscopy",
    categoryName: "위·대장 내시경 클리닉",
    title: '"속 쓰리고 더부룩한데 약만 드셨나요?" 위·대장 내시경 세부전문의가 짚어주는 조기 발견의 차이',
    author: "노인영 대표원장",
    authorRole: "내과 전문의 / 소화기내시경 세부전문의",
    authorAvatar: "https://joongangmedicine.com/img/main/doctor/thum_doc_01.png",
    readTime: "3분 소요",
    themeClass: "theme-endoscopy",
    cardBadge: "위·대장 내시경 클리닉",
    cardQuote: '"속 쓰림·소화불량, 단순 위염일까?"',
    cardBold: "위·대장 내시경 조기 진단의 차이",
    cardPoints: [
      "• 대학병원급 고화질 내시경 시스템",
      "• 발견 즉시 당일 원스톱 용종절제술",
      "• 1:1 수면 활력징후 모니터링 안심 케어"
    ],
    snippet: "속 쓰림이나 잦은 소화불량을 단순 체기로 넘기지 마세요. 소화기 질환은 초기에 뚜렷한 증상이 없는 경우가 많아 정밀 내시경 검진이 무엇보다 중요합니다.",
    tags: ["위내시경", "대장내시경", "수면내시경", "용종절제술", "소화기내시경세부전문의", "검단내과", "불로동내과", "속쓰림원인"],
    contentHtml: `
      <div class="reader-body reader-center">
        <p class="reader-p">안녕하십니까.</p>
        <p class="reader-p">올바른 의학 정보로 지역 주민의 건강을 따뜻하게 살피는</p>
        <p class="reader-p"><strong style="color: #0284c7; font-size: 20px;">검단중앙내과의원</strong>입니다.</p>

        <div class="reader-blank"></div>

        <p class="reader-quote-dialog">"조금만 스트레스 받아도 명치가 콕콕 쑤셔요."</p>
        <p class="reader-quote-dialog">"소화제를 달고 사는데, 내시경을 꼭 받아야 하나요?"</p>
        <p class="reader-quote-dialog">"내시경 검사는 힘들고 무서워서 차일피일 미루게 돼요."</p>

        <div class="reader-blank"></div>

        <p class="reader-p">진료실에서 환자분들과 마주하다 보면,</p>
        <p class="reader-p">속 쓰림이나 잦은 소화불량, 복부 팽만감을 단순한 '신경성 위염'이나 '체기'로만 생각하시고</p>
        <p class="reader-p">약국 소화제나 제산제로 버티시는 경우를 참 많이 봅니다.</p>

        <div class="reader-blank"></div>

        <p class="reader-p">하지만 내과 전문의로서 안타까운 진실을 말씀드리면,</p>
        <p class="reader-p"><strong style="color: #e11d48;">위와 대장의 초기 병변이나 암은 초기에 뚜렷한 자각 증상이 거의 없다</strong>는 점입니다.</p>
        <p class="reader-p">속이 쓰리거나 더부룩한 일상적 신호 뒤에 작은 용종이나 점막의 궤양, 혹은 조기 암세포가 조용히 자라고 있을 수 있습니다.</p>

        <div class="reader-blank"></div>

        <p class="reader-p">오늘은 검단 불로동 이웃분들의 평생 건강 주치의, 검단중앙내과와 함께</p>
        <p class="reader-p"><strong>위·대장 내시경 검사가 왜 필수적인지, 어떤 기준으로 검진 병원을 선택해야 하는지</strong> 알기 쉽게 전해드리겠습니다.</p>

        <hr class="reader-hr">

        <div class="reader-subheading">🔬 1. 작은 병변도 놓치지 않는 고해상도 내시경 시스템</div>

        <div class="reader-callout">
          <div class="callout-lead">"눈앞에서 직접 보듯 선명하게 점막을 살핍니다"</div>
          <div class="callout-desc">
            조기 위암과 대장 선종은 정상 점막과의 경계가 흐릿하여,<br>
            내시경 장비의 고해상도 화질과 미세 혈관 관찰 능력이 조기 진단의 성패를 가릅니다.
          </div>
        </div>

        <p class="reader-p">위·대장 내시경은 카메라를 통해 소화기관 내부 점막을 실시간으로 직접 들여다보는 가장 정확한 정밀 진단 검사입니다.</p>
        <p class="reader-p">검단중앙내과는 대학병원급 고화질 내시경 시스템을 완비하여 0.1mm 단위의 작은 이상 소견도 놓치지 않고 꼼꼼히 관찰합니다.</p>

        <hr class="reader-hr">

        <div class="reader-subheading">🩺 2. 소화기내시경 세부전문의가 직접 검사하고 시술합니다</div>

        <div class="reader-callout">
          <div class="callout-lead">수만 건의 풍부한 임상경험을 갖춘 세부전문의 직접 집도</div>
          <div class="callout-desc">
            검사 도중 발견되는 대장 용종은 암으로 발전할 수 있는 씨앗입니다.<br>
            검단중앙내과에서는 발견 즉시 <strong>'당일 원스톱 용종절제술'</strong>을 시행합니다.
          </div>
        </div>

        <p class="reader-p">검단중앙내과의 노인영 대표원장은</p>
        <p class="reader-p">· <strong style="color: #0284c7;">내과 전문의 & 소화기내시경 세부전문의</strong></p>
        <p class="reader-p">· 한림대학교 성심병원 소화기내과 외래 교수 및 전임의</p>
        <p class="reader-p">· 대한 소화기내시경학회 / 대한 간학회 정회원</p>
        <p class="reader-p">· 메디컬투데이, 건강매거진 with 굿닥터 방송 출연</p>

        <p class="reader-p">용종이 발견되었을 때 큰 병원으로 재전원할 필요 없이, 현장에서 바로 제거하여 두 번 검사받는 불편함을 덜어드립니다.</p>

        <hr class="reader-hr">

        <div class="reader-subheading">😴 3. 통증과 불안을 덜어드리는 안전한 수면내시경</div>

        <div class="reader-callout">
          <div class="callout-lead">"잠깐 눈 감았다 뜨니 편안하게 끝났어요"</div>
          <div class="callout-desc">
            1:1 활력징후(산소포화도·맥박) 실시간 모니터링 시스템과<br>
            학회 기준을 철저히 준수한 1회용 마우스피스 & 멸균 소독 관리
          </div>
        </div>

        <p class="reader-p">환자 개인의 연령, 체중, 기저질환을 세밀히 고려하여 가장 안전한 진정 약물 용량을 처방하며, 전담 간호 인력이 회복 시까지 1:1로 밀착 케어합니다.</p>

        <div class="reader-blank"></div>
        <p class="reader-p">감사합니다.</p>
      </div>
    `
  },
  {
    id: 2,
    scheduledAt: "2026-09-23T08:30:00+09:00",
    dayOfWeek: "수요일",
    category: "checkup",
    categoryName: "5대암·국가건강검진",
    title: '"올해 국가건강검진, 어디서 받아야 안심일까요?" 5대암부터 만성질환까지 꼼꼼하게 챙기는 검진 원칙',
    author: "노인영 대표원장",
    authorRole: "내과 전문의 / 소화기내시경 세부전문의",
    authorAvatar: "https://joongangmedicine.com/img/main/doctor/thum_doc_01.png",
    readTime: "4분 소요",
    themeClass: "theme-checkup",
    cardBadge: "보건복지부 지정 국가검진",
    cardQuote: '"올해 국가건강검진, 어디서 받아야 안심일까?"',
    cardBold: "5대암부터 만성질환까지 꼼꼼한 검진",
    cardPoints: [
      "• 위·대장·간·유방·자궁 5대암 국가검진",
      "• 200평 규모 쾌적한 독립 종합검진센터",
      "• 이상 소견 발견 시 원스톱 즉각 치료 연계"
    ],
    snippet: "미루다 보면 연말에 몰려요! 보건복지부 지정 국가검진 기관 검단중앙내과의 5대암·공단검진 프로그램 및 안심 검진 기준 안내.",
    tags: ["국가건강검진", "공단검진", "5대암검진", "위암검진", "대장암검진", "검단건강검진", "불로동건강검진", "직장인건강검진"],
    contentHtml: `
      <div class="reader-body reader-center">
        <p class="reader-p">안녕하십니까.</p>
        <p class="reader-p">올바른 의학 정보로 지역 주민의 건강을 따뜻하게 살피는</p>
        <p class="reader-p"><strong style="color: #0284c7; font-size: 20px;">검단중앙내과의원</strong>입니다.</p>

        <div class="reader-blank"></div>

        <p class="reader-quote-dialog">"올해 건강검진 대상자라는데, 어디로 가야 하나요?"</p>
        <p class="reader-quote-dialog">"증상도 딱히 없는데 기본 검사만 대충 받으면 안 될까요?"</p>
        <p class="reader-quote-dialog">"연말에 받으려니 예약이 꽉 차서 검사받기가 너무 힘들어요."</p>

        <div class="reader-blank"></div>

        <p class="reader-p">해마다 가을이 찾아오면 국민건강보험공단 건강검진 안내표를 확인하시고 언제, 어디서 검진을 받아야 할지 고민하시는 분들이 많습니다.</p>
        <p class="reader-p"><strong style="color: #e11d48;">조기 발견이 생명을 살리는 암과 만성질환은 증상이 나타났을 때는 이미 진행된 경우가 많습니다.</strong></p>

        <hr class="reader-hr">

        <div class="reader-subheading">📋 1. 올해 국가건강검진 대상자 안내</div>

        <div class="reader-callout">
          <div class="callout-lead">"일반건강검진은 2년마다 돌아오는 내 몸의 정기점검"</div>
          <div class="callout-desc">
            · <strong>지역가입자</strong>: 세대주 및 만 20세 이상 세대원 중 짝수/홀수 해당 연도 출생자<br>
            · <strong>직장가입자</strong>: 비사무직 근로자 전체(매년), 사무직 근로자(격년제)<br>
            · <strong>피부양자/의료급여수급자</strong>: 만 19세~만 64세 해당 연도 출생자
          </div>
        </div>

        <hr class="reader-hr">

        <div class="reader-subheading">🎗️ 2. 한국인 사망원인 1위, '국가 5대암 검진'</div>

        <div class="reader-table-wrap">
          <table class="reader-table">
            <thead>
              <tr>
                <th>암 종류</th>
                <th>대상 및 주기</th>
                <th>검사 방법</th>
                <th>비용 안내</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>위암</strong></td>
                <td>만 40세 이상 (2년마다)</td>
                <td>위내시경 검사</td>
                <td>본인부담 10% 또는 무료</td>
              </tr>
              <tr>
                <td><strong>대장암</strong></td>
                <td>만 50세 이상 (1년마다)</td>
                <td>분변잠혈검사 (대변검사)<br>※ 이상 시 대장내시경 연계</td>
                <td><strong style="color: #0284c7;">전액 무료</strong></td>
              </tr>
              <tr>
                <td><strong>간암</strong></td>
                <td>만 40세 이상 고위험군 (6개월)</td>
                <td>간초음파 + 혈청알파태아단백</td>
                <td>본인부담 10% 또는 무료</td>
              </tr>
              <tr>
                <td><strong>유방암</strong></td>
                <td>만 40세 이상 여성 (2년)</td>
                <td>유방촬영술 (X-ray)</td>
                <td>본인부담 10% 또는 무료</td>
              </tr>
              <tr>
                <td><strong>자궁경부암</strong></td>
                <td>만 20세 이상 여성 (2년)</td>
                <td>자궁경부 세포검사</td>
                <td><strong style="color: #0284c7;">전액 무료</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr class="reader-hr">

        <div class="reader-subheading">🌟 3. 검단중앙내과 국가검진만의 특별한 장점</div>
        <p class="reader-p">1. 소화기내시경 세부전문의 & 가정의학과 전문의 2인 협진</p>
        <p class="reader-p">2. 내시경 중 용종 발견 시 당일 원스톱 절제술 가능</p>
        <p class="reader-p">3. 200평 규모의 분리된 쾌적한 검진 공간</p>
        <p class="reader-p">4. 바쁜 직장인을 위한 <strong>일요일 오전 08:30~13:00 검진 및 진료</strong></p>

        <div class="reader-blank"></div>
        <p class="reader-p">감사합니다.</p>
      </div>
    `
  },
  {
    id: 3,
    scheduledAt: "2026-09-25T08:30:00+09:00",
    dayOfWeek: "금요일",
    category: "sunday",
    categoryName: "일요일진료·병원소식",
    title: '"평일엔 시간 없고 주말엔 문 여는 병원이 없다면?" 검단 주민을 위한 일요일 진료 & 2인 전문의 맞춤 케어',
    author: "김인선 원장",
    authorRole: "가정의학과 전문의",
    authorAvatar: "https://joongangmedicine.com/img/main/doctor/thum_doc_02.png",
    readTime: "3분 소요",
    themeClass: "theme-sunday",
    cardBadge: "☀️ 일요일 오전 정상 진료",
    cardQuote: '"평일엔 시간 없고 주말엔 병원이 닫았다면?"',
    cardBold: "일요일에도 아침 8시 반부터! 2인 전문의 케어",
    cardPoints: [
      "• 수·토·일요일 점심시간 없이 연속 진료",
      "• 내과 + 가정의학과 2인 전문의 밀착 협진",
      "• 건물 내 지하주차장 무료 주차 지원"
    ],
    snippet: "일요일에도 아침 8시 반부터 문을 엽니다! 내과 전문의와 가정의학과 전문의가 함께하는 검단중앙내과 2인 진료 시스템 및 주말 진료 안내.",
    tags: ["검단일요일내과", "검단주말진료", "불로동내과", "신검단중앙역내과", "소화기내과", "가정의학과", "만성질환", "일요일병원"],
    contentHtml: `
      <div class="reader-body reader-center">
        <p class="reader-p">안녕하십니까.</p>
        <p class="reader-p">올바른 의학 정보로 지역 주민의 건강을 따뜻하게 살피는</p>
        <p class="reader-p"><strong style="color: #0284c7; font-size: 20px;">검단중앙내과의원</strong>입니다.</p>

        <div class="reader-blank"></div>

        <p class="reader-quote-dialog">"퇴근하고 나면 병원 문이 다 닫혀 있어서 갈 수가 없어요."</p>
        <p class="reader-quote-dialog">"주말이나 일요일에 갑자기 아플 때 어디로 가야 하죠?"</p>
        <p class="reader-quote-dialog">"평일에 직장 때문에 만성질환 약 타러 가기가 너무 힘들어요."</p>

        <div class="reader-blank"></div>

        <p class="reader-p">몸이 으슬으슬 춥거나 속이 불편해도 <strong style="color: #e11d48;">"시간이 없어서", "일요일엔 병원이 안 열어서"</strong> 참고 견디시다가 병을 키우시는 안타까운 경우가 많습니다.</p>
        <p class="reader-p">이웃 주민분들의 고충을 덜어드리고자, 검단 불로동 <strong style="color: #0d2847;">검단중앙내과는 일요일에도 오전 08:30부터 13:00까지 점심시간 없이 진료</strong>합니다.</p>

        <hr class="reader-hr">

        <div class="reader-subheading">☀️ 1. 주말에도 안심! '일요일 오전 진료' 시행</div>
        <div class="reader-callout">
          <div class="callout-lead">검단중앙내과는 일요일에도 활짝 열려 있습니다</div>
          <div class="callout-desc">
            · <strong>수 · 토 · 일요일</strong> : 오전 08:30 ~ 13:00 (<strong style="color: #e11d48;">점심시간 없이 연속 진료</strong>)<br>
            · <strong>월 · 화 · 목 · 금</strong> : 오전 08:30 ~ 19:00 (평일 야간진료)<br>
            · 평일 낮 방문이 어려우신 직장인분들도 일요일 아침 편안하게 내원하실 수 있습니다.
          </div>
        </div>

        <hr class="reader-hr">

        <div class="reader-subheading">👨‍⚕️👩‍⚕️ 2. 내과 전문의 + 가정의학과 전문의 2인 협진</div>

        <div class="reader-img-card">
          <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <div style="text-align: center; max-width: 260px;">
              <img src="https://joongangmedicine.com/img/main/doctor/doc_slide_01.png" alt="노인영 대표원장" style="width: 100%; border-radius: 8px;">
              <p style="font-weight: 700; margin-top: 8px; font-size: 15px;">노인영 대표원장</p>
              <p style="font-size: 12px; color: #666;">내과 / 소화기내시경 세부전문의</p>
            </div>
            <div style="text-align: center; max-width: 260px;">
              <img src="https://joongangmedicine.com/img/main/doctor/doc_slide_kim_title.png" alt="김인선 원장" style="width: 100%; border-radius: 8px;">
              <p style="font-weight: 700; margin-top: 8px; font-size: 15px;">김인선 원장</p>
              <p style="font-size: 12px; color: #666;">가정의학과 전문의</p>
            </div>
          </div>
          <p class="reader-img-caption">▲ 검단중앙내과의원 2인 의료진 (노인영 대표원장 &amp; 김인선 원장)</p>
        </div>

        <div class="reader-callout">
          <div class="callout-lead">내과 세부 진료부터 온 가족 전신 건강관리까지</div>
          <div class="callout-desc">
            · <strong>노인영 대표원장</strong> : 위·대장 내시경, 당일 용종절제술, 간·소화기질환, 심혈관 만성질환<br>
            · <strong>김인선 원장</strong> : 전신 만성질환, 비만 클리닉, 1:1 맞춤 영양수액, 갱년기 및 통증 케어
          </div>
        </div>

        <p class="reader-p">소화기 질환과 정밀 내시경 시술은 <strong style="color: #0284c7;">노인영 대표원장</strong>이, 전신 대사 상태와 비만·피로회복 수액 요법은 <strong style="color: #0284c7;">김인선 원장</strong>이 맡아 환자분을 입체적으로 치료합니다.</p>

        <div class="reader-blank"></div>
        <p class="reader-p">감사합니다.</p>
      </div>
    `
  },
  {
    id: 4,
    scheduledAt: "2026-09-28T08:30:00+09:00",
    dayOfWeek: "월요일",
    category: "endoscopy",
    categoryName: "위·대장 내시경 클리닉",
    title: '"대장내시경 검사 전날, 커피와 음식 언제까지 먹어도 될까요?" 안전한 검사를 위한 장정결 가이드',
    author: "노인영 대표원장",
    authorRole: "내과 전문의 / 소화기내시경 세부전문의",
    authorAvatar: "https://joongangmedicine.com/img/main/doctor/thum_doc_01.png",
    readTime: "3분 소요",
    themeClass: "theme-endoscopy",
    cardBadge: "위·대장 내시경 클리닉",
    cardQuote: '"검사 전날 커피 한 잔, 정말 안 될까?"',
    cardBold: "대장내시경 음식 조절 & 복약 수칙",
    cardPoints: [
      "• 3일 전 피해야 할 음식(씨 있는 과일, 해조류)",
      "• 검사 전날 식사와 커피 가능 시간대",
      "• 알약 장정결제 복용 팁과 수분 섭취"
    ],
    snippet: "대장내시경의 정확도는 장이 얼마나 깨끗하게 비워졌는지에 달려 있습니다. 소화기내시경 세부전문의가 3일 전 식단부터 검사 당일까지 꼭 지켜야 할 장정결 팁을 짚어드립니다.",
    tags: ["대장내시경전날음식", "대장내시경커피", "장정결제", "알약장정결제", "검단대장내시경", "불로동내시경", "소화기내과"],
    contentHtml: `
      <div class="reader-body reader-center">
        <p class="reader-p">안녕하십니까. 검단중앙내과의원 소화기내시경 세부전문의 노인영 대표원장입니다.</p>
        <div class="reader-blank"></div>
        <p class="reader-quote-dialog">"원장님, 대장내시경 전날 아메리카노 한 잔은 마셔도 되나요?"</p>
        <p class="reader-quote-dialog">"김치찌개 건더기 빼고 국물만 먹는 건 괜찮죠?"</p>
        <div class="reader-blank"></div>
        <p class="reader-p">대장내시경 검사를 앞두고 가장 많이 주시는 질문이 바로 '음식 조절'입니다. 대장 점막에 음식물 찌꺼기가 남아있으면 2~3mm 크기의 미세 선종이 가려져 정확한 관찰이 어렵습니다.</p>

        <hr class="reader-hr">
        <div class="reader-subheading">🥗 1. 검사 3일 전부터 피해야 할 음식</div>
        <div class="reader-callout">
          <div class="callout-lead">장벽에 오래 들러붙는 씨앗류와 섬유질을 피해주세요</div>
          <div class="callout-desc">
            · <strong>피할 음식</strong>: 키위, 수박, 참외, 포도 등 씨 있는 과일 / 김, 미역 등 해조류 / 잡곡밥, 현미밥, 깨, 콩류 / 고춧가루, 김치, 나물류<br>
            · <strong>드셔도 좋은 음식</strong>: 백미 흰쌀밥, 흰죽, 계란찜, 두부, 연두부, 맑은 생선살, 카스테라, 감자
          </div>
        </div>

        <hr class="reader-hr">
        <div class="reader-subheading">☕ 2. 검사 전날 식사와 커피는 어떻게 하나요?</div>
        <p class="reader-p"><strong>검사 전날 점심:</strong> 오후 1~2시경 가벼운 흰죽이나 미음으로 식사합니다.</p>
        <p class="reader-p"><strong>검사 전날 저녁:</strong> 저녁 식사는 금식하며, 탈수를 막기 위해 물이나 맑은 이온음료를 충분히 섭취합니다.</p>
        <p class="reader-p"><strong>커피 여부:</strong> 우유가 든 라떼류는 절대 금물이며, 연한 아메리카노나 블랙커피는 검사 전날 정오(12시) 이전까지만 소량 허용됩니다. 오후 이후에는 장 점막 착색 방지를 위해 피하시는 것이 좋습니다.</p>

        <hr class="reader-hr">
        <div class="reader-subheading">💊 3. 마시기 쉬운 알약 장정결제 구비</div>
        <p class="reader-p">검단중앙내과는 물약 특유의 비릿한 맛 때문에 복용이 힘드신 분들을 위해 <strong>알약 형태의 정제형 장정결제(오라팡 등)</strong>를 처방해 드리고 있습니다. 정해진 물의 양을 시간을 지켜 충분히 드셔야 안전하고 깨끗한 장정결이 완성됩니다.</p>

        <div class="reader-blank"></div>
        <p class="reader-p">정확한 검사를 위해 하루 이틀의 식단 조절에 함께 힘써주시기 바랍니다. 감사합니다.</p>
      </div>
    `
  },
  {
    id: 5,
    scheduledAt: "2026-09-30T08:30:00+09:00",
    dayOfWeek: "수요일",
    category: "checkup",
    categoryName: "5대암·국가건강검진",
    title: '"위암 검진 2년 주기, 왜 아무 증상이 없어도 꼭 받아야 할까요?" 조기 위암 5년 생존율 90%의 진실',
    author: "노인영 대표원장",
    authorRole: "내과 전문의 / 소화기내시경 세부전문의",
    authorAvatar: "https://joongangmedicine.com/img/main/doctor/thum_doc_01.png",
    readTime: "4분 소요",
    themeClass: "theme-checkup",
    cardBadge: "5대암 국가건강검진",
    cardQuote: '"안 아픈데 위내시경을 왜 또 받나요?"',
    cardBold: "조기 위암 발견과 내시경 절제술의 비밀",
    cardPoints: [
      "• 초기 위암은 80% 이상 무증상으로 진행",
      "• 2년 주기 위내시경 시 조기 발견율 90% 이상",
      "• 개복 수술 없이 내시경만으로 치료 가능한 단계"
    ],
    snippet: "조기 위암은 조기에만 발견하면 수술 없이 내시경 시술만으로도 완치가 가능합니다. 만 40세 이상 남녀라면 증상이 없어도 2년마다 국가 위암검진을 놓쳐서는 안 되는 이유를 설명합니다.",
    tags: ["위암검진", "위내시경주기", "조기위암", "국가암검진", "검단위내시경", "불로동위내시경", "위암생존율"],
    contentHtml: `
      <div class="reader-body reader-center">
        <p class="reader-p">안녕하십니까. 검단중앙내과의원 소화기내시경 세부전문의 노인영 대표원장입니다.</p>
        <div class="reader-blank"></div>
        <p class="reader-quote-dialog">"원장님, 소화도 잘되고 아무 데도 안 아픈데 굳이 내시경을 해야 할까요?"</p>
        <p class="reader-quote-dialog">"2년 전에 받았을 때 깨끗했는데 올해 또 받아야 하나요?"</p>
        <div class="reader-blank"></div>
        <p class="reader-p">위암은 우리나라 암 발생률 상위권을 차지하는 대표적인 암이지만, <strong>조기에 발견하면 5년 생존율이 90~95% 이상</strong>에 달할 정도로 치료 성적이 매우 우수합니다.</p>

        <hr class="reader-hr">
        <div class="reader-subheading">⚠️ 1. 조기 위암 환자의 80%는 아무 증상이 없습니다</div>
        <div class="reader-callout">
          <div class="callout-lead">소화불량이나 체중 감소가 나타났다면 이미 진행된 상태일 수 있습니다</div>
          <div class="callout-desc">
            위암이 점막층에만 국한된 조기 위암 단계에서는 거의 아무런 증상이 없습니다.<br>
            증상이 나타나기를 기다렸다가 병원을 찾으면 점막하층과 근육층으로 침윤된 진행성 위암일 가능성이 높습니다.
          </div>
        </div>

        <hr class="reader-hr">
        <div class="reader-subheading">🩺 2. 조기 발견 시 수술 없이 '내시경 점막하 박리술' 완치</div>
        <p class="reader-p">위벽 깊숙이 침범하지 않은 조기 암은 전신마취 하의 개복 수술 없이, <strong>내시경 시술만으로 암 조직을 말끔히 포 뜨듯 도려내는 치료(ESD)</strong>가 가능합니다. 이를 위해서는 정기적인 2년 주기 위내시경 검사가 필수입니다.</p>

        <hr class="reader-hr">
        <div class="reader-subheading">🏛️ 3. 만 40세 이상 남녀 국가 위암검진 지원</div>
        <p class="reader-p">대한민국 만 40세 이상 국민이라면 국민건강보험공단에서 2년마다 위내시경 검진 비용의 90% 또는 100%를 지원합니다. 검단중앙내과는 대학병원급 고해상도 내시경 장비로 점막 표면의 미세 변화까지 꼼꼼하게 판독합니다.</p>

        <div class="reader-blank"></div>
        <p class="reader-p">증상이 없다는 것이 병이 없다는 뜻은 아닙니다. 올해 검진 대상자라면 미루지 마시고 꼭 검진받으세요. 감사합니다.</p>
      </div>
    `
  },
  {
    id: 6,
    scheduledAt: "2026-10-02T08:30:00+09:00",
    dayOfWeek: "금요일",
    category: "vaccine",
    categoryName: "예방접종·수액",
    title: '"올가을 독감 백신, 언제 맞는 게 가장 효과적일까요?" 2026-2027절기 인플루엔자 & 면역 회복 수액',
    author: "김인선 원장",
    authorRole: "가정의학과 전문의",
    authorAvatar: "https://joongangmedicine.com/img/main/doctor/thum_doc_02.png",
    readTime: "3분 소요",
    themeClass: "theme-vaccine",
    cardBadge: "2026-2027 예방접종 클리닉",
    cardQuote: '"올가을 독감 백신, 언제 맞는 게 가장 효과적일까?"',
    cardBold: "인플루엔자 4가 백신 & 맞춤 영양수액",
    cardPoints: [
      "• 9월 말 ~ 10월 중순 최적기 접종",
      "• 폐렴구균·대상포진 시너지 동시접종 권장",
      "• 1:1 맞춤 피로회복 & 면역강화 수액"
    ],
    snippet: "독감은 일반 감기와 다릅니다! 2026-2027절기 독감 4가 백신 접종 적기와 폐렴구균 동시 접종, 환절기 피로회복 수액 솔루션.",
    tags: ["독감예방접종", "독감백신", "폐렴구균접종", "대상포진접종", "피로회복수액", "면역수액", "검단내과", "불로동수액"],
    contentHtml: `
      <div class="reader-body reader-center">
        <p class="reader-p">안녕하십니까. 검단중앙내과의원 가정의학과 전문의 김인선 원장입니다.</p>
        <div class="reader-blank"></div>
        <p class="reader-quote-dialog">"아침저녁으로 쌀쌀해지는데 독감 주사는 언제 맞아야 하나요?"</p>
        <p class="reader-quote-dialog">"작년에 맞았는데 올해 또 맞아야 하나요?"</p>
        <div class="reader-blank"></div>
        <p class="reader-p">인플루엔자 바이러스는 해마다 유행하는 항원형이 변이되므로 매년 가을 새로운 백신을 접종받으셔야 온전한 면역력을 확보할 수 있습니다.</p>

        <hr class="reader-hr">
        <div class="reader-subheading">⏱️ 1. 9월 말 ~ 10월 중순 접종이 최적기입니다</div>
        <div class="reader-callout">
          <div class="callout-lead">항체 생성 기간(약 2주)과 지속 기간(약 6개월) 고려</div>
          <div class="callout-desc">
            독감 백신 접종 후 항체가 생기기까지 약 2주가 걸립니다.<br>
            국내 독감 유행 정점(12월~이듬해 3월)을 대비하기 위해 10월 중순까지 접종을 마치시는 것이 가장 이상적입니다.
          </div>
        </div>

        <hr class="reader-hr">
        <div class="reader-subheading">🛡️ 2. 폐렴구균 백신 동시 접종으로 합병증 예방</div>
        <p class="reader-p">독감의 가장 무서운 합병증은 세균성 폐렴입니다. 만 65세 이상 어르신이나 고혈압, 당뇨, 심장 질환을 앓고 계신 만성질환자분들은 독감 백신 접종 시 <strong>폐렴구균 백신을 반대쪽 팔에 동시 접종</strong>하시는 것을 적극 권장합니다.</p>

        <hr class="reader-hr">
        <div class="reader-subheading">💧 3. 환절기 면역 강화 및 만성피로 맞춤 수액</div>
        <p class="reader-p">면역력이 급격히 떨어져 잦은 감기나 심한 피로를 겪으시는 분들을 위해 고농축 비타민C, 아연, 셀레늄 등이 배합된 1:1 맞춤 영양수액 요법을 함께 진행하고 있습니다.</p>

        <div class="reader-blank"></div>
        <p class="reader-p">검단중앙내과는 일요일 오전(08:30~13:00)에도 진료하므로 주말을 이용해 온 가족이 편안하게 접종받으실 수 있습니다. 감사합니다.</p>
      </div>
    `
  },
  {
    id: 7,
    scheduledAt: "2026-10-05T08:30:00+09:00",
    dayOfWeek: "월요일",
    category: "endoscopy",
    categoryName: "위·대장 내시경 클리닉",
    title: '"대장 용종, 발견하면 왜 당일 바로 떼야 할까요?" 선종성 용종과 대장암 예방의 진실',
    author: "노인영 대표원장",
    authorRole: "내과 전문의 / 소화기내시경 세부전문의",
    authorAvatar: "https://joongangmedicine.com/img/main/doctor/thum_doc_01.png",
    readTime: "4분 소요",
    themeClass: "theme-endoscopy",
    cardBadge: "소화기내시경 세부전문의",
    cardQuote: '"용종 떼러 큰 병원 다시 가야 하나요?"',
    cardBold: "검단중앙내과 당일 원스톱 용종절제술",
    cardPoints: [
      "• 대장암의 95%는 선종성 용종에서 시작",
      "• 검사 현장에서 즉시 제거하는 원스톱 시술",
      "• 시술 후 주의사항과 안전한 조직검사 연계"
    ],
    snippet: "대장 용종은 대장암으로 발전하는 씨앗입니다. 검단중앙내과는 수만 건의 시술 경험을 가진 세부전문의가 검사 중 발견 즉시 당일 용종절제술을 시행하여 두 번 검사받는 불편을 없앱니다.",
    tags: ["대장용종", "용종절제술", "당일용종절제", "대장암예방", "선종성용종", "검단대장내시경", "불로동용종제거"],
    contentHtml: `
      <div class="reader-body reader-center">
        <p class="reader-p">안녕하십니까. 검단중앙내과의원 소화기내시경 세부전문의 노인영 대표원장입니다.</p>
        <div class="reader-blank"></div>
        <p class="reader-quote-dialog">"대장내시경을 했는데 용종이 있대요. 큰 병원 가서 다시 떼야 하나요?"</p>
        <p class="reader-quote-dialog">"용종을 떼어내면 피가 많이 나거나 아프지 않나요?"</p>
        <div class="reader-blank"></div>
        <p class="reader-p">대장내시경 검사를 받는 가장 결정적인 이유는 바로 <strong>'용종(Polyp)'을 발견하고 제거하기 위함</strong>입니다.</p>

        <hr class="reader-hr">
        <div class="reader-subheading">🌱 1. 대장암의 95%는 '선종성 용종'에서 시작됩니다</div>
        <div class="reader-callout">
          <div class="callout-lead">"용종을 미리 제거하는 것이 가장 확실한 대장암 예방입니다"</div>
          <div class="callout-desc">
            대장 용종 중 '선종(Adenoma)'은 방치할 경우 대개 5~10년에 걸쳐 크기가 커지며 대장암으로 변합니다.<br>
            즉, 암이 되기 전 단계인 선종을 제거하면 대장암 발생 위험을 70~90% 이상 사전에 차단할 수 있습니다.
          </div>
        </div>

        <hr class="reader-hr">
        <div class="reader-subheading">⚡ 2. 검단중앙내과 당일 원스톱 용종절제술</div>
        <p class="reader-p">일부 의원에서는 대장내시경 도중 용종이 발견되어도 장비나 시술 난이도 문제로 상급병원 전원을 권유하기도 합니다. 이 경우 환자분은 또다시 장정결제를 복용하고 2차 검사를 받아야 하는 큰 고통을 겪게 됩니다.</p>
        <p class="reader-p">검단중앙내과는 <strong>수만 건의 내시경 치료 경험을 가진 소화기내시경 세부전문의가 직접 집도</strong>하므로, 검사 중 발견되는 용종을 즉시 올가미(Snare)나 고주파 전류를 이용해 안전하게 제거하는 <strong>당일 원스톱 용종절제술</strong>을 시행합니다.</p>

        <hr class="reader-hr">
        <div class="reader-subheading">🔬 3. 절제 후 정밀 조직검사 및 추적 관리</div>
        <p class="reader-p">제거된 조직은 병리과 정밀 조직검사를 통해 이형성증(Dysplasia) 정도를 확인하며, 향후 1년, 3년, 5년 뒤 안전한 대장내시경 추적 검진 주기를 1:1로 맞춤 설계해 드립니다.</p>

        <div class="reader-blank"></div>
        <p class="reader-p">대장암 예방의 지름길, 안전한 당일 원스톱 용종절제술로 건강한 장을 지키세요. 감사합니다.</p>
      </div>
    `
  },
  {
    id: 8,
    scheduledAt: "2026-10-07T08:30:00+09:00",
    dayOfWeek: "수요일",
    category: "checkup",
    categoryName: "5대암·국가건강검진",
    title: '"건강검진 혈액검사에서 간 수치(AST/ALT)가 높다면?" 침묵의 장기가 보내는 지방간·간염 신호',
    author: "노인영 대표원장",
    authorRole: "내과 전문의 / 소화기내시경 세부전문의",
    authorAvatar: "https://joongangmedicine.com/img/main/doctor/thum_doc_01.png",
    readTime: "4분 소요",
    themeClass: "theme-checkup",
    cardBadge: "간질환 & 초음파 클리닉",
    cardQuote: '"술도 안 마시는데 간 수치가 왜 높죠?"',
    cardBold: "비알코올성 지방간과 상복부 초음파 검진",
    cardPoints: [
      "• AST/ALT, 감마GTP 수치의 정확한 의미",
      "• 비알코올성 지방간과 대사증후군 연관성",
      "• 초음파 검사를 통한 간경화·간암 조기 감별"
    ],
    snippet: "간은 70% 이상 망가져도 통증이 없는 침묵의 장기입니다. 건강검진 결과표에서 간 수치 이상을 발견했을 때 당황하지 않고 원인을 감별하는 법과 정밀 초음파 검진의 중요성을 전합니다.",
    tags: ["간수치", "ASTALT", "지방간", "상복부초음파", "간초음파", "검단건강검진", "불로동간초음파", "만성피로"],
    contentHtml: `
      <div class="reader-body reader-center">
        <p class="reader-p">안녕하십니까. 검단중앙내과의원 소화기내과 전문의 노인영 대표원장입니다.</p>
        <div class="reader-blank"></div>
        <p class="reader-quote-dialog">"원장님, 저는 술을 한 방울도 안 마시는데 왜 간 수치가 80까지 올라갔나요?"</p>
        <p class="reader-quote-dialog">"간 수치가 높으면 간경화가 오는 건가요?"</p>
        <div class="reader-blank"></div>
        <p class="reader-p">국가건강검진 혈액검사 결과표에서 가장 흔하게 마주치는 이상 소견 중 하나가 바로 <strong>AST(GOT), ALT(GPT), 감마GTP(γ-GTP)</strong> 상승입니다.</p>

        <hr class="reader-hr">
        <div class="reader-subheading">🧪 1. AST와 ALT는 간세포의 파괴를 나타냅니다</div>
        <div class="reader-callout">
          <div class="callout-lead">간세포가 손상되면 혈액 속으로 효소가 흘러나옵니다</div>
          <div class="callout-desc">
            정상 수치는 통상 40 IU/L 이하입니다.<br>
            간세포가 염증으로 파괴되면 세포 내에 있던 효소들이 혈중으로 누출되어 수치가 상승합니다.
          </div>
        </div>

        <hr class="reader-hr">
        <div class="reader-subheading">🍔 2. 술을 안 마셔도 생기는 '비알코올성 지방간'</div>
        <p class="reader-p">최근에는 음주보다 과도한 탄수화물·당류 섭취, 복부 비만, 당뇨병, 고지혈증 등 <strong>대사증후군과 동반된 비알코올성 지방간질환(NAFLD)</strong> 환자가 급증하고 있습니다.</p>
        <p class="reader-p">단순 지방간을 가볍게 방치하면 간세포 괴사가 일어나는 지방간염(NASH)으로 진행되고, 수년에 걸쳐 간경변증 및 간암 위험까지 초래할 수 있습니다.</p>

        <hr class="reader-hr">
        <div class="reader-subheading">📡 3. 상복부 정밀 초음파를 통한 정확한 감별</div>
        <p class="reader-p">간 수치가 상승했다면 반드시 정밀 초음파 검사를 통해 간의 에코 음영, 지방 침착도, 담낭 결석, 췌장 상태 등을 종합적으로 확인해야 합니다. 검단중앙내과는 대학병원급 정밀 초음파 장비를 갖추고 있어 정확한 감별 진단이 가능합니다.</p>

        <div class="reader-blank"></div>
        <p class="reader-p">침묵의 장기 간이 보내는 경고 신호, 정밀 검진으로 원인을 바로잡으세요. 감사합니다.</p>
      </div>
    `
  },
  {
    id: 9,
    scheduledAt: "2026-10-09T08:30:00+09:00",
    dayOfWeek: "금요일",
    category: "sunday",
    categoryName: "일요일진료·병원소식",
    title: '"혈압약 한 번 먹기 시작하면 평생 못 끊나요?" 고혈압의 오해와 심뇌혈관 질환 예방 원칙',
    author: "김인선 원장",
    authorRole: "가정의학과 전문의",
    authorAvatar: "https://joongangmedicine.com/img/main/doctor/thum_doc_02.png",
    readTime: "3분 소요",
    themeClass: "theme-sunday",
    cardBadge: "만성질환 집중 케어",
    cardQuote: '"약 먹기 무서워서 버티고 계신가요?"',
    cardBold: "고혈압 약물 치료의 오해와 혈관 보호",
    cardPoints: [
      "• 혈압약을 일찍 시작해야 뇌졸중·심근경색 예방",
      "• 생활습관 개선으로 약 용량 조절 및 감량 가능",
      "• 평일 야간 & 일요일 오전 진료로 정기 처방 관리"
    ],
    snippet: "혈압약을 평생 먹을까 봐 복용을 주저하시는 분들이 많습니다. 하지만 혈압약은 중독되는 약이 아니라 혈관을 보호하는 든든한 방패입니다. 가정의학과 전문의가 올바른 혈압 관리법을 알려드립니다.",
    tags: ["고혈압약", "혈압관리", "만성질환", "뇌졸중예방", "불로동내과", "신검단중앙역내과", "검단일요일내과", "가정의학과"],
    contentHtml: `
      <div class="reader-body reader-center">
        <p class="reader-p">안녕하십니까. 검단중앙내과의원 가정의학과 전문의 김인선 원장입니다.</p>
        <div class="reader-blank"></div>
        <p class="reader-quote-dialog">"혈압약 한 번 먹으면 평생 못 끊는다는데, 최대한 늦게 먹어야 하는 거 아닌가요?"</p>
        <p class="reader-quote-dialog">"머리도 안 아프고 멀쩡한데 왜 약을 먹으라고 하죠?"</p>
        <div class="reader-blank"></div>
        <p class="reader-p">진료실에서 혈압 진단을 받으신 환자분들께서 가장 흔히 토로하시는 오해와 두려움입니다.</p>

        <hr class="reader-hr">
        <div class="reader-subheading">🛡️ 1. 혈압약은 '중독'되는 것이 아니라 혈관을 지키는 '방패'입니다</div>
        <div class="reader-callout">
          <div class="callout-lead">약이 끊기 힘든 것이 아니라, 고혈압 상태 자체가 지속되는 것입니다</div>
          <div class="callout-desc">
            수도관의 수압이 너무 높으면 파이프에 균열이 가듯, 높은 혈압은 24시간 내내 뇌혈관과 심장혈관, 신장 모세혈관을 망가뜨립니다.<br>
            혈압약은 혈압을 안전 범위로 낮추어 <strong>뇌졸중(중풍), 심근경색, 만성 콩팥병을 예방하는 든든한 안전벨트</strong>입니다.
          </div>
        </div>

        <hr class="reader-hr">
        <div class="reader-subheading">🏃‍♂️ 2. 생활습관 개선과 체중 감량 시 약을 줄일 수 있습니다</div>
        <p class="reader-p">체중을 5kg 감량하고 저염식과 유산소 운동을 꾸준히 실천하시면 수축기 혈압이 5~10mmHg 이상 떨어집니다. 실제로 초기 고혈압 환자분들 중 생활습관을 철저히 개선하여 약의 용량을 절반으로 줄이거나 의사의 지도하에 복용을 중단하는 사례도 적지 않습니다.</p>

        <hr class="reader-hr">
        <div class="reader-subheading">⏰ 3. 바쁜 직장인을 위한 일요일 오전 만성질환 관리</div>
        <p class="reader-p">평일 진료 시간에 쫓겨 혈압약 처방을 거르시는 일이 없도록, 검단중앙내과는 <strong>일요일 오전 08:30~13:00에도 정기 진료</strong>를 운영합니다. 지속적인 혈압 모니터링과 합병증 검사를 편안하게 받아보세요.</p>

        <div class="reader-blank"></div>
        <p class="reader-p">혈관 건강은 한 번 무너지면 되돌리기 어렵습니다. 꾸준한 동행 관리로 건강을 지켜드리겠습니다. 감사합니다.</p>
      </div>
    `
  },
  {
    id: 10,
    scheduledAt: "2026-10-12T08:30:00+09:00",
    dayOfWeek: "월요일",
    category: "endoscopy",
    categoryName: "위·대장 내시경 클리닉",
    title: '"수면내시경, 자고 일어났는데 왜 아무 기억이 안 날까요?" 안전한 진정내시경 원리와 회복 가이드',
    author: "노인영 대표원장",
    authorRole: "내과 전문의 / 소화기내시경 세부전문의",
    authorAvatar: "https://joongangmedicine.com/img/main/doctor/thum_doc_01.png",
    readTime: "3분 소요",
    themeClass: "theme-endoscopy",
    cardBadge: "안심 수면내시경",
    cardQuote: '"수면내시경 중 헛소리할까 봐 겁나요"',
    cardBold: "미다졸람·프로포폴 진정 원리와 안전 수칙",
    cardPoints: [
      "• 전신마취가 아닌 의식하 진정(수면) 요법의 차이",
      "• 1:1 맥박·산소포화도 실시간 자동 감시",
      "• 검사 후 운전 금지 및 안전 귀가 수칙"
    ],
    snippet: "수면내시경은 전신마취가 아닌 의식하 진정 요법으로, 잠든 상태에서 불안과 통증 없이 검사를 마칠 수 있는 안전한 방법입니다. 검단중앙내과의 철저한 1:1 수면 모니터링 시스템을 소개합니다.",
    tags: ["수면내시경", "수면내시경마취", "진정내시경", "내시경회복", "검단수면내시경", "불로동내과", "소화기내과"],
    contentHtml: `
      <div class="reader-body reader-center">
        <p class="reader-p">안녕하십니까. 검단중앙내과의원 소화기내시경 세부전문의 노인영 대표원장입니다.</p>
        <div class="reader-blank"></div>
        <p class="reader-quote-dialog">"수면내시경 받다가 영영 못 깨어나면 어쩌죠?"</p>
        <p class="reader-quote-dialog">"잠든 사이에 헛소리나 말실수를 할까 봐 너무 부끄러워요."</p>
        <div class="reader-blank"></div>
        <p class="reader-p">수면내시경 검사를 앞두고 막연한 공포나 부끄러움을 느끼시는 분들이 많습니다. 그러나 정확한 의학적 원리를 이해하시면 훨씬 편안한 마음으로 임하실 수 있습니다.</p>

        <hr class="reader-hr">
        <div class="reader-subheading">💤 1. 전신마취가 아닌 '의식하 진정 요법'입니다</div>
        <div class="reader-callout">
          <div class="callout-lead">스스로 호흡하며 통증과 불안만 완화하는 안전한 진정 상태</div>
          <div class="callout-desc">
            전신마취는 인공호흡기를 달아야 할 정도로 중추신경계가 완전히 차단되는 마취입니다.<br>
            반면 수면(진정)내시경은 자가 호흡이 유지되면서 살짝 졸린 얕은 잠 상태를 유도하여, 검사 중의 구역질과 복통을 기억하지 못하게 돕는 요법입니다.
          </div>
        </div>

        <hr class="reader-hr">
        <div class="reader-subheading">📟 2. 1:1 산소포화도 & 맥박 실시간 모니터링</div>
        <p class="reader-p">검단중앙내과는 환자분에게 손가락 센서를 연결하여 검사가 진행되는 전 과정 동안 산소포화도(SpO2)와 맥박을 실시간으로 감시합니다. 만약의 상황에 즉시 대응할 수 있는 길항제(해독제)와 응급 장비를 상시 구비하고 있습니다.</p>

        <hr class="reader-hr">
        <div class="reader-subheading">🚗 3. 검사 당일 꼭 지켜야 할 주의사항</div>
        <p class="reader-p">1. <strong>자가 운전 절대 금지</strong>: 검사가 끝난 뒤 완전히 깬 것처럼 느껴져도 뇌의 인지 기능과 반응 속도는 둔화되어 있습니다. 반드시 대중교통을 이용하시거나 보호자를 동반하셔야 합니다.</p>
        <p class="reader-p">2. <strong>중요한 계약이나 결정 연기</strong>: 당일에는 중요한 법적 계약이나 금융 거래는 피하시는 것이 좋습니다.</p>

        <div class="reader-blank"></div>
        <p class="reader-p">불안 없이 편안하게, 세부전문의의 세심한 손길로 검사받으세요. 감사합니다.</p>
      </div>
    `
  },
  {
    id: 11,
    scheduledAt: "2026-10-14T08:30:00+09:00",
    dayOfWeek: "수요일",
    category: "checkup",
    categoryName: "5대암·국가건강검진",
    title: '"국가 대장암 분변잠혈검사에서 \'양성\'이 나왔다면?" 당황하지 않고 대장내시경 받는 법',
    author: "노인영 대표원장",
    authorRole: "내과 전문의 / 소화기내시경 세부전문의",
    authorAvatar: "https://joongangmedicine.com/img/main/doctor/thum_doc_01.png",
    readTime: "4분 소요",
    themeClass: "theme-checkup",
    cardBadge: "국가 대장암 검진",
    cardQuote: '"대변검사에서 피가 섞여 나왔다는데 암일까요?"',
    cardBold: "분변잠혈 양성 판정과 대장내시경 국가지원",
    cardPoints: [
      "• 분변잠혈 양성이 암을 뜻하지는 않습니다",
      "• 용종, 치질, 염증성 질환 등 정밀 감별 필요",
      "• 국가 지원으로 대장내시경 무료/본인부담 절감"
    ],
    snippet: "대변검사에서 잠혈 양성 통보를 받으시면 덜컥 겁부터 내시는 경우가 많습니다. 분변잠혈은 작은 용종이나 치핵에 의해서도 나타나므로, 세부전문의 대장내시경을 통해 원인을 정확히 찾는 것이 급선무입니다.",
    tags: ["분변잠혈검사", "대변검사양성", "대장암검진", "혈변원인", "대장내시경검사", "검단건강검진", "불로동내과"],
    contentHtml: `
      <div class="reader-body reader-center">
        <p class="reader-p">안녕하십니까. 검단중앙내과의원 소화기내시경 세부전문의 노인영 대표원장입니다.</p>
        <div class="reader-blank"></div>
        <p class="reader-quote-dialog">"공단에서 분변잠혈검사 양성이라고 재검 받으라는데, 대장암에 걸린 건가요?"</p>
        <div class="reader-blank"></div>
        <p class="reader-p">국민건강보험공단 5대암 검진 중 만 50세 이상을 대상으로 매년 실시되는 대변검사에서 '잠혈 반응 양성(피가 섞여 나옴)' 결과를 받고 큰 충격을 받으시는 분들이 많습니다. 결론부터 말씀드리면, <strong>분변잠혈검사 양성이 곧 대장암을 의미하는 것은 아닙니다.</strong></p>

        <hr class="reader-hr">
        <div class="reader-subheading">🩸 1. 분변잠혈 양성의 다양한 원인들</div>
        <div class="reader-callout">
          <div class="callout-lead">대변 속에 눈에 보이지 않는 미세 혈액이 검출되었다는 뜻입니다</div>
          <div class="callout-desc">
            · 대장 용종(선종)의 미세 출혈<br>
            · 치질(치핵), 치열 등 항문 질환에 의한 출혈<br>
            · 대장 게실염, 궤양성 대장염 등 염증성 장질환<br>
            · 대장암 (선별 대상 중 일부)
          </div>
        </div>
        <p class="reader-p">실제로 분변잠혈 양성 판정을 받아 대장내시경을 시행해 보면 대다수는 암이 아닌 단순 양성 용종이나 치핵, 가벼운 장염인 경우가 훨씬 많습니다.</p>

        <hr class="reader-hr">
        <div class="reader-subheading">💰 2. 2차 대장내시경 검사비 전액 무료 지원</div>
        <p class="reader-p">국가 대장암 분변잠혈검사에서 양성 반응이 나온 분은 <strong>국민건강보험공단에서 2차 검사인 대장내시경 검사 비용을 전액 지원</strong>해 드립니다. (단, 수면비 등 비급여 항목 일부 제외)</p>

        <hr class="reader-hr">
        <div class="reader-subheading">🏥 3. 검단중앙내과 당일 원스톱 절제 연계</div>
        <p class="reader-p">출혈의 원인을 확인하면서 선종성 용종이 발견될 경우, 검단중앙내과에서는 즉시 당일 용종절제술을 함께 시행하여 암의 싹을 근본적으로 제거합니다.</p>

        <div class="reader-blank"></div>
        <p class="reader-p">양성 통보를 받으셨다면 불안해하지 마시고, 공단 지원 혜택으로 편안하게 대장내시경을 받아보세요. 감사합니다.</p>
      </div>
    `
  },
  {
    id: 12,
    scheduledAt: "2026-10-16T08:30:00+09:00",
    dayOfWeek: "금요일",
    category: "vaccine",
    categoryName: "예방접종·수액",
    title: '"자도 자도 피곤하고 면역력이 바닥났다면?" 만성피로 증후군과 1:1 맞춤 영양수액 솔루션',
    author: "김인선 원장",
    authorRole: "가정의학과 전문의",
    authorAvatar: "https://joongangmedicine.com/img/main/doctor/thum_doc_02.png",
    readTime: "3분 소요",
    themeClass: "theme-vaccine",
    cardBadge: "1:1 맞춤 영양수액",
    cardQuote: '"주말 내내 쉬었는데도 월요일이 두려워요"',
    cardBold: "가정의학과 전문의 처방 프리미엄 수액 케어",
    cardPoints: [
      "• 고용량 비타민C + 마이어스 칵테일 피로 회복",
      "• 간기능 개선 및 체내 활성산소 제거 글루타치온",
      "• 안락하고 프라이빗한 독립 수액실에서 힐링"
    ],
    snippet: "충분한 수면을 취해도 피로가 풀리지 않는다면 체내 비타민과 미네랄 고갈, 산화 스트레스가 원인일 수 있습니다. 가정의학과 전문의 문진을 통해 내 몸에 딱 맞는 맞춤 영양수액을 처방받아 보세요.",
    tags: ["만성피로", "영양수액", "피로회복수액", "면역수액", "글루타치온", "비타민주사", "검단수액", "불로동수액"],
    contentHtml: `
      <div class="reader-body reader-center">
        <p class="reader-p">안녕하십니까. 검단중앙내과의원 가정의학과 전문의 김인선 원장입니다.</p>
        <div class="reader-blank"></div>
        <p class="reader-quote-dialog">"주말에 하루 종일 누워 있어도 월요일 아침이면 온몸이 천근만근 무거워요."</p>
        <p class="reader-quote-dialog">"영양제를 이것저것 챙겨 먹는데도 피로가 전혀 안 풀려요."</p>
        <div class="reader-blank"></div>
        <p class="reader-p">6개월 이상 휴식을 취해도 호전되지 않는 피로감, 집중력 저하, 근육통을 <strong>'만성피로 증후군'</strong>이라 부릅니다. 이는 단순한 게으름이 아니라 체내 세포의 미토콘드리아 기능 저하와 미세 영양소 고갈이 원인입니다.</p>

        <hr class="reader-hr">
        <div class="reader-subheading">🧪 1. 경구 영양제 vs 정맥 영양수액(IVNT)의 차이</div>
        <div class="reader-callout">
          <div class="callout-lead">위장관 흡수 한계를 뛰어넘어 혈관으로 직접 영양을 공급합니다</div>
          <div class="callout-desc">
            입으로 먹는 비타민은 소화관을 거치며 상당량이 분해되거나 배출되어 생체 이용률이 10~20%에 불과합니다.<br>
            반면 1:1 맞춤 정맥 영양수액은 혈액을 통해 필요한 조직과 세포로 100% 즉시 흡수되어 빠른 피로 회복과 면역 회복을 돕습니다.
          </div>
        </div>

        <hr class="reader-hr">
        <div class="reader-subheading">🌿 2. 검단중앙내과 대표 맞춤 수액 프로그램</div>
        <p class="reader-p">· <strong>마이어스 칵테일 (Myer's Cocktail)</strong>: 비타민C, 비타민B군, 마그네슘이 최적 비율로 배합되어 만성피로와 근육 긴장을 빠르게 해소</p>
        <p class="reader-p">· <strong>백옥·항산화 수액 (글루타치온)</strong>: 강력한 항산화 성분으로 간 해독 기능을 높이고 체내 활성산소를 억제</p>
        <p class="reader-p">· <strong>감기몸살·면역강화 수액</strong>: 환절기 오한, 발열, 전신 몸살 시 빠른 면역 세포 활성화 및 전해질 교정</p>

        <hr class="reader-hr">
        <div class="reader-subheading">🛏️ 3. 안락하고 프라이빗한 독립 수액실</div>
        <p class="reader-p">검단중앙내과는 편안하고 조용한 독립 수액 공간을 마련하여 수액 치료를 받으시는 동안 편안히 휴식하실 수 있도록 세심하게 배려하고 있습니다. 평일 야간(오후 7시) 및 <strong>일요일 오전(08:30~13:00)</strong>에도 언제든 이용하실 수 있습니다.</p>

        <div class="reader-blank"></div>
        <p class="reader-p">지친 일상에 건강한 활력을 불어넣어 드리겠습니다. 감사합니다.</p>
      </div>
    `
  }
];

// Clinic Common CTA Block for bottom of each article
const CLINIC_ARTICLE_CTA = `
  <div class="reader-clinic-cta">
    <div class="cta-header">
      <img src="https://joongangmedicine.com/img/favicon.png" alt="검단중앙내과 심볼" class="cta-logo">
      <h4>검단중앙내과의원 진료 및 오시는 길 안내</h4>
    </div>
    <div class="cta-grid">
      <div class="cta-col">
        <h5><i class="fa-regular fa-clock"></i> 진료시간 안내</h5>
        <ul>
          <li><strong>월 · 화 · 목 · 금</strong> : 08:30 ~ 19:00 (점심시간 13:00~14:00)</li>
          <li><strong>수 · 토 · 일요일</strong> : 08:30 ~ 13:00 (<strong style="color:#ea580c;">점심시간 없이 연속 진료</strong>)</li>
          <li><strong style="color:#ea580c;">※ 일요일도 오전 8시 반부터 정상 진료합니다!</strong></li>
          <li>※ 공휴일은 휴진입니다.</li>
        </ul>
      </div>
      <div class="cta-col">
        <h5><i class="fa-solid fa-map-location-dot"></i> 위치 및 주차 안내</h5>
        <ul>
          <li><strong>주소</strong> : 인천광역시 서구 고산후로 285, 현해타워2 2층, 3층 (불로동)</li>
          <li><strong>대중교통</strong> : 신검단중학교 정류장 바로 뒤 (1, 76, 77, 991번 버스)</li>
          <li><strong>지하철</strong> : 인천 1호선 신검단중앙역 도보 11분</li>
          <li><strong>주차안내</strong> : 건물 지하주차장 완비 (<strong style="color:#0284c7;">진료 환자 전액 무료 주차</strong> 지원)</li>
          <li><strong>전화문의</strong> : <strong>032-564-7788</strong></li>
        </ul>
      </div>
    </div>
    <div class="cta-actions-row">
      <a href="https://map.naver.com/p/search/%20%EA%B2%80%EB%8B%A8%EC%A4%91%EC%95%99%EB%82%B4%EA%B3%BC?c=15.00,0,0,0,dh&placePath=%2Finformation%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202609260654%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%20%EA%B2%80%EB%8B%A8%EC%A4%91%EC%95%99%EB%82%B4%EA%B3%BC" target="_blank" class="btn-cta-map">
        <i class="fa-solid fa-map"></i> 네이버 지도 길찾기 바로가기
      </a>
      <a href="tel:0325647788" class="btn-cta-call">
        <i class="fa-solid fa-phone"></i> 병원 전화 상담 및 예약 (032-564-7788)
      </a>
    </div>
  </div>
`;

// App State
let currentQueueFilter = "published"; // 'published' | 'scheduled'
let currentCategory = "all";
let currentSearch = "";

// DOM Elements
const articleListView = document.getElementById("articleListView");
const articleReaderView = document.getElementById("articleReaderView");
const articleReaderContent = document.getElementById("articleReaderContent");
const articleGrid = document.getElementById("articleGrid");
const totalArticleCount = document.getElementById("totalArticleCount");
const filterTitleText = document.getElementById("filterTitleText");
const countPublishedEl = document.getElementById("countPublished");
const countScheduledEl = document.getElementById("countScheduled");
const btnViewPublished = document.getElementById("btnViewPublished");
const btnViewScheduled = document.getElementById("btnViewScheduled");
const categoryPills = document.getElementById("categoryPills");
const searchInput = document.getElementById("searchInput");
const breadcrumbCat = document.getElementById("breadcrumbCat");

// Initialize
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("data/posts_queue.json");
    if (res.ok) {
      const queueData = await res.json();
      if (Array.isArray(queueData) && queueData.length > 0) {
        queueData.forEach(item => {
          const local = ARTICLES.find(a => a.id === item.id);
          if (local && local.contentHtml && !item.contentHtml) {
            item.contentHtml = local.contentHtml;
          }
        });
        ARTICLES = queueData;
      }
    }
  } catch (e) {
    // Keep local embedded fallback
  }

  renderArticleGrid();
  setupFilterEvents();
  setupSearchEvents();
});

// Set Queue Filter: 'published' or 'scheduled'
window.setQueueFilter = function(filterType) {
  currentQueueFilter = filterType;
  if (filterType === "published") {
    btnViewPublished.classList.add("active");
    btnViewScheduled.classList.remove("active");
    if (filterTitleText) filterTitleText.textContent = "발행 완료 건강칼럼";
  } else {
    btnViewScheduled.classList.add("active");
    btnViewPublished.classList.remove("active");
    if (filterTitleText) filterTitleText.textContent = "예약 대기 큐 (월·수·금 08:30 발행 예정)";
  }
  renderArticleGrid();
};

// Render Article Grid with Text-Based Thumbnail Cards and Auto-Schedule Detection
function renderArticleGrid() {
  const now = new Date();

  // Split into published and scheduled lists
  const publishedList = ARTICLES.filter(a => new Date(a.scheduledAt) <= now)
    .sort((a, b) => new Date(b.scheduledAt) - new Date(a.scheduledAt));

  const scheduledList = ARTICLES.filter(a => new Date(a.scheduledAt) > now)
    .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt));

  // Update counter badges
  if (countPublishedEl) countPublishedEl.textContent = publishedList.length;
  if (countScheduledEl) countScheduledEl.textContent = scheduledList.length;

  // Active pool based on selected tab
  let pool = currentQueueFilter === "published" ? publishedList : scheduledList;

  // Filter by category
  if (currentCategory !== "all") {
    pool = pool.filter(a => a.category === currentCategory);
  }

  // Filter by search query
  if (currentSearch.trim() !== "") {
    const q = currentSearch.trim().toLowerCase();
    pool = pool.filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.snippet.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (totalArticleCount) totalArticleCount.textContent = pool.length;
  articleGrid.innerHTML = "";

  if (pool.length === 0) {
    articleGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #94a3b8;">
        <i class="fa-solid fa-file-circle-question" style="font-size: 40px; margin-bottom: 12px; color: #cbd5e1;"></i>
        <p style="font-size: 16px; font-weight: 600;">조건에 맞는 칼럼이 없습니다.</p>
        <p style="font-size: 13px;">카테고리를 전체로 변경하시거나 다른 검색어를 입력해 보세요.</p>
      </div>
    `;
    return;
  }

  pool.forEach(article => {
    const isScheduled = new Date(article.scheduledAt) > now;
    const dateFormatted = article.scheduledAt.slice(0, 10).replace(/-/g, '. ') + '.';

    const card = document.createElement("div");
    card.className = "article-card";
    card.onclick = () => openArticle(article.id);

    // Text-based graphic thumbnail card
    card.innerHTML = `
      <div class="card-img-wrap">
        <div class="text-thumbnail-card ${article.themeClass}">
          <div class="card-inner">
            <span class="tt-cat-badge">${article.cardBadge}</span>
            <h5 class="tt-main-title">${article.cardQuote}<strong>${article.cardBold}</strong></h5>
            <div class="tt-points">
              ${article.cardPoints.map(p => `<span>${p}</span>`).join('')}
            </div>
            <div class="tt-footer">
              <img src="https://joongangmedicine.com/img/favicon.png" alt="로고" class="tt-logo">
              <span>검단중앙내과의원</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        ${isScheduled ? `
          <div class="scheduled-release-badge">
            <i class="fa-regular fa-clock"></i> ${dateFormatted} (${article.dayOfWeek}) 08:30 정기 발행 예정
          </div>
        ` : ''}
        <h4 class="card-title">${article.title}</h4>
        <p class="card-snippet">${article.snippet}</p>
        <div class="card-footer">
          <span class="card-author"><i class="fa-solid fa-user-doctor"></i> ${article.author}</span>
          <span class="card-time"><i class="fa-regular fa-calendar"></i> ${dateFormatted}</span>
        </div>
      </div>
    `;
    articleGrid.appendChild(card);
  });
}

// Open Single Article Reader View with Text-Based Header Banner
window.openArticle = function(id) {
  const article = ARTICLES.find(a => a.id === id);
  if (!article) return;

  const now = new Date();
  const isScheduled = new Date(article.scheduledAt) > now;
  const dateFormatted = article.scheduledAt.slice(0, 10).replace(/-/g, '. ') + '.';

  if (breadcrumbCat) breadcrumbCat.textContent = article.categoryName;

  const tagsHtml = article.tags.map(t => `<span class="reader-tag">#${t}</span>`).join(" ");

  articleReaderContent.innerHTML = `
    <!-- Top Text-Based Graphic Banner Card -->
    <div class="text-thumbnail-card ${article.themeClass} reader-banner-size">
      <div class="card-inner">
        <span class="tt-cat-badge" style="font-size: 13px; padding: 6px 14px;">${article.cardBadge}</span>
        <h2 class="tt-main-title">${article.cardQuote}<strong>${article.cardBold}</strong></h2>
        <div class="tt-points" style="font-size: 14px; gap: 6px; margin: 16px 0;">
          ${article.cardPoints.map(p => `<span>${p}</span>`).join('')}
        </div>
        <div class="tt-footer" style="font-size: 12px;">
          <img src="https://joongangmedicine.com/img/favicon.png" alt="로고" class="tt-logo" style="width: 18px; height: 18px;">
          <span>검단중앙내과의원 ｜ GEOMDAN JOONGANG CLINIC</span>
        </div>
      </div>
    </div>

    <!-- Scheduled Notice Banner (If viewing an upcoming queue post) -->
    ${isScheduled ? `
      <div class="reader-callout" style="border-left-color: #f59e0b; background-color: #fffbeb; margin: 24px 0 10px 0;">
        <div class="callout-lead" style="color: #b45309;"><i class="fa-solid fa-clock-rotate-left"></i> [예약 대기 큐] 주 3회 정기 자동 발행 예정 칼럼</div>
        <div class="callout-desc" style="color: #92400e;">
          본 칼럼은 <strong>${dateFormatted} (${article.dayOfWeek}) 오전 08:30 KST</strong>에 자동 정기 발행 대기 중인 콘텐츠입니다.<br>
          검단중앙내과는 매주 <strong>월 · 수 · 금 오전 08:30</strong> 새로운 검단 지역 밀착 의학 칼럼을 발행합니다.
        </div>
      </div>
    ` : ''}

    <!-- Article Header -->
    <header class="reader-header">
      <span class="reader-cat">${article.categoryName}</span>
      <h1 class="reader-title">${article.title}</h1>
      <div class="reader-meta-row">
        <div class="meta-author-group">
          <img src="${article.authorAvatar}" alt="${article.author}" class="meta-avatar">
          <div>
            <div class="meta-doc-name">${article.author}</div>
            <div class="meta-doc-title">${article.authorRole}</div>
          </div>
        </div>
        <div class="meta-date-group">
          <span>${isScheduled ? '발행 예정일: ' : '발행일: '}${dateFormatted} (${article.dayOfWeek})</span> • <span>${article.readTime}</span>
        </div>
      </div>
    </header>

    <!-- Article Content -->
    <div class="reader-main-content">
      ${article.contentHtml}
    </div>

    <!-- Author Profile Bio Box -->
    <div class="reader-author-bio">
      <img src="${article.authorAvatar}" alt="${article.author}" class="bio-avatar">
      <div class="bio-content">
        <h4>${article.author} (${article.authorRole})</h4>
        <p>
          "불필요한 과잉 진료 없이 꼭 필요한 검사만을 꼼꼼히 시행하며, 
          환자분께서 진단 결과를 충분히 납득하고 안심하실 수 있도록 친절하게 설명해 드립니다."
        </p>
      </div>
    </div>

    <!-- Clinic Footer CTA Box -->
    ${CLINIC_ARTICLE_CTA}

    <!-- Tags -->
    <div class="reader-tags-box">
      ${tagsHtml}
    </div>
  `;

  // Switch view
  articleListView.classList.remove("active");
  articleReaderView.classList.add("active");

  // Scroll to top of article reader
  articleReaderView.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Show Article List View
window.showArticleList = function() {
  articleReaderView.classList.remove("active");
  articleListView.classList.add("active");
  document.getElementById("featured").scrollIntoView({ behavior: "smooth" });
};

// Filter Event Listeners
function setupFilterEvents() {
  const pills = categoryPills.querySelectorAll(".cat-pill");
  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.getAttribute("data-cat");
      renderArticleGrid();
    });
  });
}

// Search Event Listeners
function setupSearchEvents() {
  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderArticleGrid();
  });
}
