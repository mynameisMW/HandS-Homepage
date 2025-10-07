"use client";
import { useState, useEffect, use } from "react";

import { useRouter } from "next/navigation";

const API_BASE = "http://127.0.0.1:8000";

export default function Users() {
    const router = useRouter();
    const [users, setUsers] = useState([] as any[]);

    function createUser(id: string, password: string, username: string, email: string) {
        fetch(`${API_BASE}/user/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, password, username, email }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(() => {
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
                alert("회원 생성이 완료되었습니다.");
                window.location.href = "/";
              })
            .catch((error) => {
                console.error("Error deleting user:", error);
            });
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Create User</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const id = (form.elements.namedItem("id") as HTMLInputElement).value;
                    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
                    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
                    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                    createUser(id, password, username, email);
                }}
                className="space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700">ID</label>
                    <input  
                        type="text"
                        name="id"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                    Create User
                </button>
            </form>
        </div>
    );
}
