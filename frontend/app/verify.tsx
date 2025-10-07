"use client";
const API_BASE = "http://127.0.0.1:8000";

export default async function Verify() {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "token": token }),
    });
    if (!res.ok) {
        const refresh_token = sessionStorage.getItem("refresh_token");
        const refreshRes = await fetch(`${API_BASE}/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({"refresh_token":refresh_token }),
        });
        if (!refreshRes.ok) {
            throw new Error("Failed to refresh token");
        }
        const refreshData = await refreshRes.json();
        sessionStorage.setItem("token", refreshData.access_token);
        return refreshData;
    }
    const data = await res.json();
    return data;
  }