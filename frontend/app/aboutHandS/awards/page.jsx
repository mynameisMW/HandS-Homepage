"use client";
import React from "react";

export default function Awards() {
  const awards = [
    {
      year: "2024",
      items: [
        {
          title: "KU Health:onMAKEATHON 대상",
          team: "폭풍번개 팀 (박기상, 엄지혜, 이지현, 정경근)",
        },
        {
          title: "캡스톤 디자인 경진대회 2위",
          team: "AutoDream 팀 (이무원, 장태양, 신재욱, 김민찬)",
        },
        {
          title: "임베디드 SW 경진대회 본선 진출",
          team: "NOVA 팀 (한성우, 장성환, 강현진)",
        },
      ],
    },
    {
      year: "2023",
      items: [
        {
          title: "제20회 임베디드 SW 경진대회 우수상",
          team: "EE-TECH 팀 (김태훈, 조상우, 이무원, 강현진)",
        },
        {
          title: "캡스톤 디자인 경진대회 3위",
          team: "NeuroCam 팀 (박진우, 윤서영, 장태양)",
        },
      ],
    },
    {
      year: "2021",
      items: [
        {
          title: "스마트 디바이스 공모전 장려상",
          team: "SoundLink 팀 (김예슬, 이현진)",
        },
        {
          title: "임베디드 SW 경진대회 본선 진출",
          team: "KUEE 팀 (박성민, 최유진)",
        },
      ],
    },
    {
      year: "2010~2019",
      items: [
        {
          title: "Qualcomm Innovation Award (2017)",
          team: "Team Fusion (김준영, 임태경, 정현수)",
        },
        {
          title: "임베디드 소프트웨어 공모전 우수상 (2015)",
          team: "E² 팀 (박시현, 윤태수, 조한결)",
        },
        {
          title: "창의설계경진대회 금상 (2011)",
          team: "EcoWheel 팀 (김현수, 최하영, 박찬규)",
        },
      ],
    },
    {
      year: "~2010 이전",
      items: [
        {
          title: "한국 로봇축구대회 우승 (2003)",
          team: "HandS Robo 팀",
        },
        {
          title: "임베디드 경진대회 대상 (1998)",
          team: "HandS Pioneer 팀",
        },
      ],
    },
  ];

  return (
    <div style={styles.page}>
      <section style={styles.header}>
        <h1 style={styles.title}>🏆 수상 내역</h1>
        <p style={styles.desc}>
          HandS 소속으로 교내 및 외부 대회에 참여하여 우수한 결과로 명예를
          높여주신 분들과 그 결과를 기록하고자 작성한 공간입니다. <br />
          HandS를 빛내주신 모든 분들께 진심으로 감사드립니다.
        </p>
      </section>

      <section style={styles.container}>
        {awards.map((section) => (
          <div key={section.year} style={styles.section}>
            <h2 style={styles.year}>{section.year}</h2>
            <div style={styles.cards}>
              {section.items.map((item, idx) => (
                <div key={idx} style={styles.card}>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  <p style={styles.cardTeam}>{item.team}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

const burgundy = "#7a0026";
const lightBurgundy = "#a8324a";
const offWhite = "#f9f5f5";

const styles = {
  page: {
    fontFamily: "'Noto Sans KR', sans-serif",
    backgroundColor: offWhite,
    color: "#333",
    padding: "80px 20px",
    lineHeight: 1.6,
  },
  header: {
    textAlign: "center",
    marginBottom: "60px",
  },
  title: {
    fontSize: "42px",
    fontWeight: "800",
    color: burgundy,
    marginBottom: "20px",
  },
  desc: {
    fontSize: "17px",
    maxWidth: "750px",
    margin: "0 auto",
    color: "#444",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  section: {
    marginBottom: "60px",
  },
  year: {
    fontSize: "28px",
    fontWeight: "700",
    color: burgundy,
    borderBottom: `3px solid ${burgundy}`,
    display: "inline-block",
    marginBottom: "25px",
  },
  cards: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px 25px",
    borderRadius: "10px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.05)",
    borderLeft: `6px solid ${burgundy}`,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: burgundy,
    marginBottom: "5px",
  },
  cardTeam: {
    fontSize: "15px",
    color: "#555",
  },
};
