"use client";
import Image from "next/image";
import Link from "next/link";

export default function AboutHandS() {
  return (
    <div style={styles.page}>
      {/* 상단 네비게이션 */}
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <Link href="/AboutHandS" style={styles.logo}>
            HandS
          </Link>
        </div>
        <div style={styles.navRight}>
          <a href="/AboutHandS/awards" style={styles.navLink}>
            수상 내역
          </a>
          <a href="#professor" style={styles.navLink}>
            담당 교수
          </a>
          <a href="#executives" style={styles.navLink}>
            운영진
          </a>
          <a href="#contact" style={styles.navLink}>
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.title}>HandS</h1>
        <p style={styles.subtitle}>Hardware and Software</p>
        <p style={styles.desc}>
          고려대학교 전기전자공학부 학술동아리 <strong>HandS</strong>는  
          하드웨어와 소프트웨어의 경계를 넘나드는 창의적인 엔지니어들이  
          모여 함께 배우고 성장하는 공간입니다.
        </p>
      </section>

      {/* Mission Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>🎯 우리의 목표</h2>
        <p style={styles.text}>
          HandS는 “배움의 즐거움과 창조의 가치”를 실현하기 위해  
          회로, 임베디드, 로봇, 인공지능 등 다양한 분야를 융합해  
          프로젝트를 진행하고, 학회원들이 스스로 성장할 수 있는  
          환경을 만듭니다.
        </p>
      </section>

      {/* Activities Section */}
      <section style={styles.sectionAlt}>
        <h2 style={styles.sectionTitle}>⚙️ 주요 활동</h2>
        <div style={styles.cardGrid}>
          <div style={styles.card}>
            <Image src="/images/hackathon.jpg" alt="전전톤" width={400} height={250} style={styles.image} />
            <h3 style={styles.cardTitle}>전전톤 (HandS Hackathon)</h3>
            <p style={styles.cardText}>
              하드웨어와 소프트웨어를 융합해 자유롭게 아이디어를 실현하는  
              고려대 전전 학회만의 특별한 해커톤 행사입니다.
            </p>
          </div>

          <div style={styles.card}>
            <Image src="/images/seminar.jpg" alt="세미나" width={400} height={250} style={styles.image} />
            <h3 style={styles.cardTitle}>정기 세미나</h3>
            <p style={styles.cardText}>
              회로, 임베디드, 인공지능, ROS 등 다양한 기술 주제로  
              학회원들이 직접 강연하고 배우는 시간입니다.
            </p>
          </div>

          <div style={styles.card}>
            <Image src="/images/project.jpg" alt="프로젝트" width={400} height={250} style={styles.image} />
            <h3 style={styles.cardTitle}>프로젝트 & 전시</h3>
            <p style={styles.cardText}>
              매 학기 진행되는 팀 프로젝트를 통해 실제 작동하는  
              결과물을 제작하고, 전시회를 통해 성과를 공유합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Professor Section */}
      <section id="professor" style={styles.section}>
        <h2 style={styles.sectionTitle}>👨‍🏫 담당 교수</h2>
        <p style={styles.text}>
          HandS의 지도 교수님은 <strong>김황남 교수님</strong> (고려대학교 전기전자공학부)입니다.  
          학회원들이 자율적으로 연구와 프로젝트를 진행할 수 있도록 지도와 조언을 아끼지 않으십니다.
        </p>
      </section>

      {/* Executives Section */}
      <section id="executives" style={styles.sectionAlt}>
        <h2 style={styles.sectionTitle}>👥 운영진</h2>
        <div style={styles.executiveGrid}>
          <div style={styles.executiveCard}>
            <Image src="/images/president.jpg" alt="회장" width={180} height={180} style={styles.profileImage} />
            <h3 style={styles.name}>이무원</h3>
            <p style={styles.role}>회장 (President)</p>
          </div>

          <div style={styles.executiveCard}>
            <Image src="/images/vice.jpg" alt="부회장" width={180} height={180} style={styles.profileImage} />
            <h3 style={styles.name}>김서윤</h3>
            <p style={styles.role}>부회장 (Vice President)</p>
          </div>

          <div style={styles.executiveCard}>
            <Image src="/images/manager.jpg" alt="운영팀장" width={180} height={180} style={styles.profileImage} />
            <h3 style={styles.name}>박지현</h3>
            <p style={styles.role}>운영팀장 (Manager)</p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Link href="/about/executives" style={styles.historyButton}>
            📜 역대 운영진 보기
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={styles.section}>
        <h2 style={styles.sectionTitle}>📮 Contact</h2>
        <p style={styles.text}>
          📧 이메일: <a href="mailto:hands.koreauniv@gmail.com" style={styles.link}>hands.koreauniv@gmail.com</a> <br />
          💬 Instagram: <a href="https://instagram.com/hands_ku" target="_blank" style={styles.link}>@hands_ku</a> <br />
          🏫 위치: 고려대학교 하나스퀘어 지하 1층 학회실 (HandS)
        </p>
      </section>

      <footer style={styles.footer}>
        <p>© 2025 HandS | Korea University Electrical and Electronic Engineering</p>
      </footer>
    </div>
  );
}

const burgundy = "#7a0026";
const lightBurgundy = "#a8324a";

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    fontFamily: "'Noto Sans KR', sans-serif",
    lineHeight: 1.6,
    color: "#222",
    backgroundColor: "#fafafa",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: burgundy,
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
  logo: { fontSize: "24px", fontWeight: "700", textDecoration: "none", color: "white" },
  navRight: { display: "flex", gap: "30px" },
  navLink: { color: "white", textDecoration: "none", fontWeight: "500", fontSize: "16px" },
  hero: {
    textAlign: "center",
    padding: "100px 20px 60px",
    background: `linear-gradient(135deg, ${burgundy} 0%, ${lightBurgundy} 100%)`,
    color: "white",
  },
  title: { fontSize: "60px", fontWeight: "800", marginBottom: "10px" },
  subtitle: { fontSize: "22px", marginBottom: "25px" },
  desc: { maxWidth: "700px", margin: "0 auto", fontSize: "18px" },
  section: { padding: "80px 20px", maxWidth: "900px", margin: "0 auto" },
  sectionAlt: { padding: "80px 20px", backgroundColor: "#f8f5f6" },
  sectionTitle: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "25px",
    color: burgundy,
    textAlign: "center",
  },
  text: { fontSize: "18px", textAlign: "center", color: "#333" },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "40px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    padding: "20px",
    textAlign: "center",
  },
  image: { borderRadius: "8px", objectFit: "cover", marginBottom: "15px" },
  cardTitle: { fontSize: "20px", fontWeight: "600", marginBottom: "10px", color: burgundy },
  cardText: { fontSize: "16px", color: "#444" },
  executiveGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "40px",
    marginTop: "30px",
  },
  executiveCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    width: "220px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },
  profileImage: { borderRadius: "50%", marginBottom: "10px", objectFit: "cover" },
  name: { fontSize: "18px", fontWeight: "600", marginBottom: "4px", color: burgundy },
  role: { fontSize: "14px", color: "#666" },
  historyButton: {
    backgroundColor: burgundy,
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
  },
  link: { color: burgundy, textDecoration: "none", fontWeight: "500" },
  footer: {
    textAlign: "center",
    padding: "40px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: burgundy,
  },
};
