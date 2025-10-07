"use client";
import Link from "next/link";
import { useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function signupUser(username: string, id: string, password: string, email: string) {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/user/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, id, password, email }),
      });
      const data = await res.json();

      if (data.error) throw new Error("회원가입 실패");
      alert("🎉 회원가입 성공! 로그인 페이지로 이동합니다.");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  const onClick = () => {
    if (!username || !id || !password || !email) {
      alert("모든 항목을 입력해주세요!");
      return;
    }
    signupUser(username, id, password, email);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>HandS 회원가입</h2>
        <p style={styles.subtitle}>
          하드웨어와 소프트웨어를 잇는 <strong>HandS</strong>의 일원이 되어보세요.
        </p>

        <div style={styles.form}>
          <label style={styles.label}>이름 (닉네임)</label>
          <input
            placeholder="예: 이무원"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>ID</label>
          <input
            placeholder="로그인에 사용할 ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>비밀번호</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
            <label style={styles.label}>이메일</label>
          <input
            placeholder="이메일 주소"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <button onClick={onClick} style={styles.button} disabled={loading}>
            {loading ? "가입 중..." : "회원가입"}
          </button>

          <p style={styles.footer}>
            이미 계정이 있으신가요?{" "}
            <Link href="/" style={styles.link}>
              로그인하기 →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const burgundy = "#7a0026";
const lightBurgundy = "#a8324a";

const styles = {
  page: {
    minHeight: "100vh",
    background: `linear-gradient(135deg, ${burgundy}, ${lightBurgundy})`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Noto Sans KR', sans-serif",
    color: "#222",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "40px",
    width: "400px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    color: burgundy,
    fontWeight: "700",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "15px",
    color: "#555",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "600",
    color: burgundy,
  },
  input: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px 12px",
    fontSize: "15px",
    outline: "none",
    transition: "border 0.2s ease",
  },
  button: {
    backgroundColor: burgundy,
    color: "#fff",
    fontWeight: "600",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    padding: "12px 0",
    marginTop: "10px",
    cursor: "pointer",
    transition: "0.3s",
  },
  buttonHover: {
    backgroundColor: lightBurgundy,
  },
  footer: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#555",
  },
  link: {
    color: burgundy,
    textDecoration: "none",
    fontWeight: "600",
  },
};
