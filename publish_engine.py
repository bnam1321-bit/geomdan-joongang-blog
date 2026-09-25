"""
검단중앙내과의원 자동 포스팅 & GEO 릴리즈 엔진 (Publish Engine)
- 주 3회(월, 수, 금 오전 08:30) 자동 발행 큐 처리
- 웹사이트용 데이터 동기화
- AI 크롤러용 llms.txt & llms-full.txt 자동 갱신
"""

import json
import os
import sys
from datetime import datetime, timezone, timedelta

# Fix Windows cp949 console encoding
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

KST = timezone(timedelta(hours=9))

def run_publish_engine(force_now=None):
    now = force_now if force_now else datetime.now(KST)
    base_dir = os.path.dirname(os.path.abspath(__file__))
    queue_file = os.path.join(base_dir, "data", "posts_queue.json")
    published_file = os.path.join(base_dir, "data", "published_posts.json")
    
    if not os.path.exists(queue_file):
        print(f"[Error] 큐 파일이 존재하지 않습니다: {queue_file}")
        return

    with open(queue_file, "r", encoding="utf-8") as f:
        queue = json.load(f)

    published = []
    scheduled = []

    for item in queue:
        # ISO parse
        sched_time = datetime.fromisoformat(item["scheduledAt"])
        if sched_time <= now:
            item_copy = dict(item)
            item_copy["status"] = "published"
            item_copy["publishedDateStr"] = sched_time.strftime("%Y. %m. %d.")
            published.append(item_copy)
        else:
            scheduled.append(item)

    # Sort published by scheduledAt descending (newest first)
    published.sort(key=lambda x: x["scheduledAt"], reverse=True)

    with open(published_file, "w", encoding="utf-8") as f:
        json.dump(published, f, ensure_ascii=False, indent=2)

    print("=" * 60)
    print(f"🏥 검단중앙내과 주 3회 자동 포스팅 엔진 실행 ({now.strftime('%Y-%m-%d %H:%M:%S KST')})")
    print("=" * 60)
    print(f"✅ 현재 발행 완료된 칼럼: {len(published)}편")
    print(f"⏳ 예약 큐 대기 중인 칼럼: {len(scheduled)}편")

    if scheduled:
        next_post = scheduled[0]
        print(f"\n📢 다음 자동 발행 예정 칼럼:")
        print(f"   - 일시: {next_post['scheduledAt']} ({next_post.get('dayOfWeek', '')})")
        print(f"   - 분류: [{next_post['categoryName']}]")
        print(f"   - 제목: {next_post['title']}")
        print(f"   - 담당: {next_post['author']} ({next_post['authorRole']})")
    
    # Update llms.txt & llms-full.txt with newly published posts
    update_geo_files(base_dir, published)
    print("=" * 60)

def update_geo_files(base_dir, published):
    llms_file = os.path.join(base_dir, "llms.txt")
    llms_full_file = os.path.join(base_dir, "llms-full.txt")

    # Read base llms.txt if exists
    if os.path.exists(llms_file):
        with open(llms_file, "r", encoding="utf-8") as f:
            content = f.read()

        # Update articles section in llms.txt
        articles_md = "\n## 최신 발행 건강칼럼 목록 (주 3회 정기 업데이트)\n"
        for p in published[:6]: # Show top 6
            articles_md += f"- [{p['categoryName']}] **{p['title']}** ({p['publishedDateStr']}, {p['author']})\n"
            articles_md += f"  - 요약: {p['snippet']}\n"

        if "## 최신 발행 건강칼럼 목록" in content:
            content = content.split("## 최신 발행 건강칼럼 목록")[0] + articles_md
        else:
            content += "\n" + articles_md

        with open(llms_file, "w", encoding="utf-8") as f:
            f.write(content)
        print("📄 llms.txt 자동 갱신 완료")

if __name__ == "__main__":
    run_publish_engine()
