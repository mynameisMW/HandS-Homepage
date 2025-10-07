import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "고려대학교 전기전자공학부 전공학회 HandS",
  description: "Hardware and Software - 고려대학교 전기전자공학부 전공학회",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-[#fdfbf8] text-gray-900 font-sans">
        {/* 헤더 */}
        <header className="flex flex-col items-center justify-center py-8 border-b border-[#7b001c]/20 bg-[#7b001c] text-white shadow-md">
          {/* 로고와 타이틀 */}
          <div className="flex items-center ml-[-420px] gap-4">
            <Image
              src="/HandS_logo.png"
              alt="HandS 로고"
              width={70}
              height={70}
              className="rounded-md bg-white p-1"
              priority
            />
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                <Link href="/" className="hover:underline">
                  고려대학교 전기전자공학부{" "}
                  <span className="text-[#f2d16b]">HandS</span>
                </Link>
              </h1>
              <p className="text-md mt-1 text-[#fefcf9]/150">
                Hardware and Software
              </p>
            </div>
          </div>
        </header>

        {/* 본문 */}
        <main className="max-w-5xl mx-auto p-6">{children}</main>

        {/* 푸터 */}
        <footer className="mt-16 py-6 text-center text-gray-600 border-t border-[#7b001c]/10">
          <p>© 고려대학교 전기전자공학부 전공학회 HandS</p>
          <p className="text-sm mt-1 text-gray-500">고려대학교 신공학관 109호</p>
        </footer>
      </body>
    </html>
  );
}
