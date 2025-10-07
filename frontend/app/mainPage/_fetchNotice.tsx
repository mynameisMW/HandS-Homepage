const API_BASE = "http://127.0.0.1:8000";

export async function _fetchNotices() {
    const res = await fetch(`${API_BASE}/announcements`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    const notices = (data.results || []).map((page: any) => ({
    id: page.id,
    title: page.properties["이름"]?.title?.[0]?.plain_text || "제목 없음",
    date: page.properties["생성일"]?.created_time || null,
    tags: page.properties["태그"]?.multi_select || [],
  }));
    return notices;
}