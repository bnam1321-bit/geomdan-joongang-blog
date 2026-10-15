/**
 * 검단중앙내과의원 공식 건강블로그 (Standalone Medical Blog)
 * - 텍스트 기반 썸네일 그래픽 카드
 * - 주 3회(월·수·금 08:30 KST) 자동 발행 큐 연동
 * - 김인선 원장 공식 사진 적용 (doc_slide_kim_title.png / thum_doc_02.png)
 * - GEO (Generative Engine Optimization) 특화 구조
 */

// Published Articles loaded dynamically from data/published_posts.json
let ARTICLES = [];

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
          <li><strong>주차안내</strong> : 건물 지하주차장 완비 (<strong style="color:#0284c7;">편리한 주차 환경</strong> 제공)</li>
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
let currentCategory = "all";
let currentSearch = "";

// DOM Elements
const articleListView = document.getElementById("articleListView");
const articleReaderView = document.getElementById("articleReaderView");
const articleReaderContent = document.getElementById("articleReaderContent");
const articleGrid = document.getElementById("articleGrid");
const totalArticleCount = document.getElementById("totalArticleCount");
const categoryPills = document.getElementById("categoryPills");
const searchInput = document.getElementById("searchInput");
const breadcrumbCat = document.getElementById("breadcrumbCat");

// Initialize
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("data/published_posts.json");
    if (res.ok) {
      const pubData = await res.json();
      if (Array.isArray(pubData) && pubData.length > 0) {
        pubData.forEach(item => {
          const local = ARTICLES.find(a => a.id === item.id);
          if (local && local.contentHtml && !item.contentHtml) {
            item.contentHtml = local.contentHtml;
          }
        });
        ARTICLES = pubData;
      }
    }
  } catch (e) {
    // Keep local embedded fallback
  }

  renderArticleGrid();
  setupFilterEvents();
  setupSearchEvents();
});

// Render Article Grid with Text-Based Thumbnail Cards (Only Published Articles)
function renderArticleGrid() {
  const now = new Date();

  // Show only published articles, sorted newest first
  let pool = ARTICLES.filter(a => new Date(a.scheduledAt) <= now)
    .sort((a, b) => new Date(b.scheduledAt) - new Date(a.scheduledAt));

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
    const dateFormatted = article.scheduledAt.slice(0, 10).replace(/-/g, '. ') + '.';

    const card = document.createElement("div");
    card.className = "article-card";
    card.onclick = () => openArticle(article.id);

    // Text-based graphic thumbnail card (Title-only clean cover)
    card.innerHTML = `
      <div class="card-img-wrap">
        <div class="text-thumbnail-card ${article.themeClass}">
          <div class="card-inner title-only-card">
            <h5 class="tt-clean-title">${article.title}</h5>
          </div>
        </div>
      </div>
      <div class="card-body">
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

  const dateFormatted = article.scheduledAt.slice(0, 10).replace(/-/g, '. ') + '.';

  if (breadcrumbCat) breadcrumbCat.textContent = article.categoryName;

  const tagsHtml = article.tags.map(t => `<span class="reader-tag">#${t}</span>`).join(" ");

  articleReaderContent.innerHTML = `
    <!-- Top Text-Based Graphic Banner Card (Title-only clean cover) -->
    <div class="text-thumbnail-card ${article.themeClass} reader-banner-size">
      <div class="card-inner title-only-card">
        <h2 class="tt-clean-title">${article.title}</h2>
      </div>
    </div>

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
          <span>발행일: ${dateFormatted} (${article.dayOfWeek})</span> • <span>${article.readTime}</span>
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
