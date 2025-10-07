"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Verify from "./verify";

const API_BASE = "http://127.0.0.1:8000";

async function login(id: string, password: string) {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
      return false;
    }
    sessionStorage.setItem("token", data.access_token);
    sessionStorage.setItem("refresh_token", data.refresh_token);
    alert("로그인 성공");
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default function Home() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const data = Verify();
    data.then((res) => {
      if (res.role) {
        setRole(res.role);
        setUsername(res.username);
      }
      setLoading(false);
    }, (err) => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const onLogin = async () => {
    const success = await login(id, password);
    if (success) {
      const { role, username } = await Verify();
      setRole(role);
      setUsername(username);
      window.location.reload();
    }
  };

  function onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    setRole("");
    setUsername("");
    alert("로그아웃되었습니다.");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-600 text-lg">
        🔍 로그인 상태 확인 중...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      {role ? (
        <div className="flex justify-center gap-4">
                {role === "admin" && (
                  <Link
                    href="/users"
                    className="bg-[#7b001c] text-white px-4 py-2 rounded-lg hover:bg-[#5a0015] transition"
                  >
                    회원 관리
                  </Link>
                )}
                <Link
                  href="/posts"
                  className="bg-[#a50026] text-white px-4 py-2 rounded-lg hover:bg-[#7b001c] transition"
                >
                  게시물
                </Link>
                <Link
                  href="/AboutHandS"
                  className="bg-[#a50026] text-white px-4 py-2 rounded-lg hover:bg-[#7b001c] transition"
                >
                  HandS 소개
                </Link>
          </div>
        ) : null}
      {/* 소개 섹션 */}
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

      {/* 👇 로그인 카드 + 공지사항을 가로로 배치 */}
      <div className="flex flex-col md:flex-row justify-center gap-8 w-full max-w-5xl">
        {/* 왼쪽: 로그인 / 사용자 카드 */}
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full md:w-1/2 text-center border border-[#7b001c]/20">
          {role ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#7b001c]">
                환영합니다, {username}님 🎉
              </h2>
              <p className="text-md text-gray-500 mb-6">권한: {role}</p>
              <Link
                href={`/users/${id}`} 
                className="w-full block bg-[#7b001c] text-white py-2 rounded-lg hover:bg-[#5a0015] transition"
              >
                내 정보 보기
              </Link>
              {role === "admin" && (
                <Link
                  href="/users"
                  className="w-full block bg-[#7b001c] text-white py-2 rounded-lg hover:bg-[#5a0015] transition"
                >
                  회원 관리
                </Link>
              )}
              <button
                onClick={onLogout}
                className="mt-6 w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#7b001c]">
                로그인 🔐
              </h2>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className="flex flex-col gap-3 mb-4"
                >
              <div className="flex flex-col gap-3 mb-4">
                <input
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#7b001c]/70"
                  placeholder="ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
                <input
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#7b001c]/70"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {id && password ? (
                <button
                  type="submit"
                  onClick={onLogin}
                  className="w-full bg-[#7b001c] text-white py-2 rounded-lg hover:bg-[#5a0015] transition"
                >
                  로그인
                </button>
                ) : (
                <button
                  type="button"
                  onClick={onLogin}
                  className="w-full bg-[#7b001c] text-white py-2 rounded-lg hover:bg-[#5a0015] transition"
                >
                  로그인
                </button>
                )}
                </form>
              <div className="text-center mt-4">
                <Link
                  href="/users/signup"
                  className="text-sm text-[#7b001c] hover:underline"
                  >
                  회원가입 하기
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 오른쪽: 공지사항 */}
        <section className="w-full md:w-1/2 bg-white shadow-lg rounded-2xl border border-[#7b001c]/20 p-8">
          <h2 className="text-2xl font-semibold text-[#7b001c] mb-4">
            📢 공지사항
          </h2>
          <ul className="divide-y divide-gray-100 text-gray-700 text-left">
            <li className="py-3 hover:bg-[#fdf2f2] transition px-2 rounded-lg">
              <Link
                href="/notice/1"
                className="font-medium text-[#7b001c] hover:underline"
              >
                🧠 2025년 2학기 HandS 프로젝트 모집 안내
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                이번 학기에는 AI·로봇·IoT 등 다양한 주제로 프로젝트가 진행됩니다.
              </p>
            </li>
            <li className="py-3 hover:bg-[#fdf2f2] transition px-2 rounded-lg">
              <Link
                href="/notice/2"
                className="font-medium text-[#7b001c] hover:underline"
              >
                💡 전전톤(EE-thon) 2025 개최 안내
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                “나만 알고 싶은 꿀템 만들기” — 7월 개최 예정!
              </p>
            </li>
            <li className="py-3 hover:bg-[#fdf2f2] transition px-2 rounded-lg">
              <Link
                href="/notice/3"
                className="font-medium text-[#7b001c] hover:underline"
              >
                🤝 YEHS 연합 세미나 일정
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                전국 공학도 네트워크 YEHS와 함께하는 2025 겨울 세미나 안내
              </p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
