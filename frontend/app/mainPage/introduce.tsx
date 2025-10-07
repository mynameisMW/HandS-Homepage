import Link from "next/link";
export default function Introduce() {
    return(
    <section className="bg-white shadow-lg rounded-2xl p-8 text-center border border-[#7b001c]/20 max-w-5xl">
        <h2 className="text-2xl font-semibold text-[#7b001c] mb-4">
          <Link href="/AboutHandS" className="hover:underline">
            Who we are
          </Link>
        </h2>
        <p className="text-gray-700 leading-relaxed">
          <strong className="text-[#7b001c]">HandS</strong>는 Hardware and
          Software의 줄임말로,{" "}
          <span className="font-medium text-[#a50026]">
            모든 것을 직접 손으로 만들며 노는 학회
          </span>
          입니다. 프로젝트 단위로 모든 활동을 진행하며, 자유롭게 상상하고,
          밤새워 탐구하고, 작품을 만들어 나갑니다.  
          전공, 나이, 학년에 상관없이 열정을 가진 모든 사람들이 활동하고 있으며,  
          전기전자공학과 관련된 모든 주제에 대해{" "}
          <span className="font-medium text-[#a50026]">
            실질적인 경험을 하고자 하는 모든 분들
          </span>
          을 환영합니다.
        </p>
      </section>
    )
}