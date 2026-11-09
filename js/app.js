/**
 * 검단중앙내과의원 공식 건강블로그 (Standalone Medical Blog)
 * - 주 3회(월·수·금 08:30 KST) 자동 발행 연동
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
        <h5>진료시간 안내</h5>
        <ul>
          <li><strong>월 · 화 · 목 · 금</strong> : 08:30 ~ 19:00 (점심시간 13:00~14:00)</li>
          <li><strong>수 · 토 · 일요일</strong> : 08:30 ~ 13:00 (점심시간 없이 연속 진료)</li>
          <li><strong>일요일 진료</strong> : 매주 일요일 오전 08:30 ~ 13:00 정상 진료</li>
          <li>※ 공휴일은 휴진입니다.</li>
        </ul>
      </div>
      <div class="cta-col">
        <h5>위치 및 주차 안내</h5>
        <ul>
          <li><strong>주소</strong> : 인천광역시 서구 고산후로 285, 현해타워2 2층, 3층 (불로동)</li>
          <li><strong>버스</strong> : 신검단중학교 정류장 바로 뒤 (1, 76, 77, 991번)</li>
          <li><strong>지하철</strong> : 인천 1호선 신검단중앙역 도보 11분</li>
          <li><strong>주차</strong> : 건물 내 지하주차장 완비</li>
          <li><strong>문의</strong> : <strong>032-564-7788</strong></li>
        </ul>
      </div>
    </div>
    <div class="cta-actions-row">
      <a href="https://map.naver.com/p/search/%20%EA%B2%80%EB%8B%A8%EC%A4%91%EC%95%99%EB%82%B4%EA%B3%BC?c=15.00,0,0,0,dh&placePath=%2Finformation%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202609260654%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%20%EA%B2%80%EB%8B%A8%EC%A4%91%EC%95%99%EB%82%B4%EA%B3%BC" target="_blank" class="btn-cta-map">
        네이버 지도 길찾기
      </a>
      <a href="tel:0325647788" class="btn-cta-call">
        전화 문의 (032-564-7788)
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
        ARTICLES = pubData;
      }
    }
  } catch (e) {
    // Keep fallback if fetch fails
  }

  renderFeaturedArticle();
  renderArticleGrid();
  setupFilterEvents();
  setupSearchEvents();
});

// Dynamically update Featured Card with the latest or ID=1 article
function renderFeaturedArticle() {
  if (!ARTICLES || ARTICLES.length === 0) return;
  const featured = ARTICLES.find(a => a.id === 1) || ARTICLES[0];
  const card = document.querySelector(".featured-card");
  if (!card || !featured) return;

  const dateFormatted = featured.scheduledAt.slice(0, 10).replace(/-/g, '. ') + '.';
  card.onclick = () => openArticle(featured.id);
  card.innerHTML = `
    <div class="featured-img-wrap">
      <div class="text-thumbnail-card ${featured.themeClass} featured-size">
        <div class="card-inner title-only-card">
          <span class="tt-cat-label">${featured.categoryName}</span>
          <h4 class="tt-clean-title">${featured.title}</h4>
        </div>
      </div>
    </div>
    <div class="featured-body">
      <div class="card-meta">
        <span class="author">${featured.author} (${featured.authorRole})</span>
        <span class="sep">·</span>
        <span class="date">${dateFormatted}</span>
      </div>
      <h3 class="featured-title">${featured.title}</h3>
      <p class="featured-excerpt">${featured.snippet}</p>
      <div class="card-footer-action">
        <span class="btn-read-more">칼럼 전문 보기 &rarr;</span>
      </div>
    </div>
  `;
}

// Render Article Grid with Clean Editorial Cards
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
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #64748b;">
        <p style="font-size: 16px; font-weight: 600; margin-bottom: 6px;">조건에 맞는 건강칼럼이 없습니다.</p>
        <p style="font-size: 13.5px;">분류를 '전체보기'로 변경하시거나 다른 검색어를 입력해 보세요.</p>
      </div>
    `;
    return;
  }

  pool.forEach(article => {
    const dateFormatted = article.scheduledAt.slice(0, 10).replace(/-/g, '. ') + '.';

    const card = document.createElement("div");
    card.className = "article-card";
    card.onclick = () => openArticle(article.id);

    card.innerHTML = `
      <div class="card-img-wrap">
        <div class="text-thumbnail-card ${article.themeClass}">
          <div class="card-inner title-only-card">
            <span class="tt-cat-label">${article.categoryName}</span>
            <h5 class="tt-clean-title">${article.title}</h5>
          </div>
        </div>
      </div>
      <div class="card-body">
        <p class="card-snippet">${article.snippet}</p>
        <div class="card-footer">
          <span class="card-author">${article.author}</span>
          <span class="card-time">${dateFormatted}</span>
        </div>
      </div>
    `;
    articleGrid.appendChild(card);
  });
}

// Open Single Article Reader View
window.openArticle = function(id) {
  const article = ARTICLES.find(a => a.id === id);
  if (!article) return;

  const dateFormatted = article.scheduledAt.slice(0, 10).replace(/-/g, '. ') + '.';

  if (breadcrumbCat) breadcrumbCat.textContent = article.categoryName;

  const tagsHtml = article.tags.map(t => `<span class="reader-tag">#${t}</span>`).join(" ");

  articleReaderContent.innerHTML = `
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
          <span>${dateFormatted} (${article.dayOfWeek})</span> · <span>검단중앙내과의원 건강칼럼</span>
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
          불필요한 과잉 진료 없이 꼭 필요한 검사만을 꼼꼼히 시행하며, 
          환자분께서 진단 결과를 충분히 이해하고 안심하실 수 있도록 차근차근 설명해 드립니다.
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
