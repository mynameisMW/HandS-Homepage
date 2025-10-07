import { _fetchNotices } from "./_fetchNotice";
import Link from "next/link";

export default function Announcement({ notice }: { notice: any[] }) {

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl md:w-2/3 shadow-lg border border-[#7b001c]/20">
      {/* 상단 제목 */}
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#7b001c]">📢 공지사항</h1>
      </header>

      {/* 안내 문구 */}
      <p className="text-gray-600 text-[15px] leading-relaxed">
        HandS의 최신 소식과 공지사항을 한눈에 확인하세요.
      </p>

      {/* 공지 리스트 */}
      {notice.length > 0 ? (
        <ul className="divide-y divide-gray-100 text-gray-800">
          {notice.map((item: any, idx: number) => (
            <li
              key={item.id}
              className="py-3 px-3 hover:bg-[#fdf2f2] rounded-lg transition-all duration-200"
            >
              <Link
                href={`/notice/${item.id}`}
                className="text-lg font-semibold text-[#7b001c] hover:underline"
              >
                {idx + 1}. {item.title}
              </Link>
              <p className="text-sm text-gray-500 mt-2">
                {item.date
                  ? new Date(item.date).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "날짜 정보 없음"}
              </p>

              {/* 태그 */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {item.tags.map((tag: any, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-[2px] text-xs bg-[#7b001c]/10 text-[#7b001c] rounded-full"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <p>현재 등록된 공지사항이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
