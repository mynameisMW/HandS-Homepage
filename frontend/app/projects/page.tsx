"use client";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import Verify from "../verify";

import { useRouter } from "next/navigation";

const API_BASE = "http://127.0.0.1:8000";

export default function Projects() {
    const router = useRouter();
    const [projects, setProjects] = useState([]);

    async function fetchProjects() {
        try {
            const response = await fetch(`${API_BASE}/projects`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setProjects(data);
            console.log(data[0]["url"]);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }
    async function checkVerify() {
        const verifyResult = await Verify();
        if (verifyResult.role !== "admin") {
            alert("관리자만 접근할 수 있습니다.");
            router.push("/");
        }
    }
    useEffect(() => {
        checkVerify();
        fetchProjects();
    }, []);

    async function viewProject(project: any) {
        const url = project.url;
        console.log(url);
        console.log(project.url);
        const projectIdWithSlug = url.split("/").at(-1);
        const projectId = projectIdWithSlug?.split("-").at(-1);
        console.log(projectId);
        window.open(`/projects/${projectId}`, "_blank");
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">User List</h1>

            <ul>
                {projects.map((project: any) => {
                const props = project.properties;

                const title = props["이름"]?.title?.[0]?.text?.content || "제목 없음";
                const 분야 = props["분야"]?.multi_select?.map((t: any) => t.name).join(", ");
                const 수상 = props["수상"]?.checkbox ? "🏆 수상" : "";
                const 전시 = props["전시회 출품"]?.checkbox ? "🎨 전시 출품" : "";
                const 팀장 = props["팀장"]?.multi_select?.map((p: any) => p.name).join(", ");
                const 팀원 = props["팀원"]?.multi_select?.map((p: any) => p.name).join(", ");

                return (
                    <li key={project.id} style={styles.postItem}>
                    <div style={styles.postHeader}>
                        <h3 style={styles.postTitle}>{title}</h3>
                            {분야 && <span style={styles.postTag}>{분야}</span>}
                            </div>

                            {(수상 || 전시) && (
                            <div style={styles.postMeta}>
                                <span>
                                {수상} {전시}
                                </span>
                                <span style={styles.postDate}>
                                {new Date(project.created_time).toLocaleDateString()}
                                </span>
                            </div>
                            )}

                            {(팀장 || 팀원) && (
                            <div style={styles.teamInfo}>
                                {팀장 && (
                                <p>
                                    👑 <strong>팀장:</strong> {팀장}
                                </p>
                                )}
                                {팀원 && (
                                <p>
                                    🤝 <strong>팀원:</strong> {팀원}
                                </p>
                                )}
                            </div>
                            )}

                            <button onClick={() => viewProject(project)} style={styles.viewLink}>
                            노션에서 보기 →
                            </button>
                        </li>
                        );
                })}</ul>
        </div>
    );
}

const styles = {
    postList: { listStyle: "none", padding: 0 },
    postItem: {
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    },
    postHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
    },
    postTitle: {
        fontSize: "20px",
        fontWeight: "600",
        color: "#222",
        margin: 0,
    },
    postTag: {
        backgroundColor: "#f3f4f6",
        padding: "5px 10px",
        borderRadius: "6px",
        fontSize: "13px",
        color: "#555",
    },
    postMeta: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "14px",
        color: "#777",
        marginBottom: "10px",
    },
    postDate: { color: "#999" },
    teamInfo: {
        fontSize: "14px",
        color: "#444",
        marginBottom: "10px",
        lineHeight: 1.5,
    },
    viewLink: {
        color: "#0070f3",
        textDecoration: "none",
        fontWeight: "bold",
    },
    };
