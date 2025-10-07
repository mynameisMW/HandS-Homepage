"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Verify from "./verify";
import { useRouter } from "next/navigation";
import Announcement from "./mainPage/announcement";
import { _fetchNotices } from "./mainPage/_fetchNotice";
import Introduce from "./mainPage/introduce";

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
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState<any[]>([]);

  async function fetchNotices() {
    const notices = await _fetchNotices();
    setNotices(notices);
  }
  
  useEffect(() => {
    const data = Verify();
    data.then((res) => {
      if (res.role) {
        setRole(res.role);
        setUsername(res.username);
      }
      fetchNotices();
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
      router.refresh();
    }
  };

  function onLogout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refresh_token");
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
                  href="/projects"
                  className="bg-[#a50026] text-white px-4 py-2 rounded-lg hover:bg-[#7b001c] transition"
                >
                  프로젝트
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
      <Introduce />

      {/* 👇 로그인 카드 + 공지사항을 가로로 배치 */}
      <div className="flex flex-col md:flex-row justify-center gap-8 w-full max-w-5xl">
        {/* 왼쪽: 로그인 / 사용자 카드 */}
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full md:w-1/3 text-center border border-[#7b001c]/20">
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
              {role === "admin" && (
              <Link
                    href="/page_test"
                    className="bg-[#a50026] text-white px-4 py-2 rounded-lg hover:bg-[#7b001c] transition"
                  >
                    테스트 페이지
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
          <Announcement notice={notices} />
      </div>
    </div>
  );
}