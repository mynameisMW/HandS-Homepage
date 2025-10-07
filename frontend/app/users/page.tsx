"use client";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import Verify from "../verify";

import { useRouter } from "next/navigation";
import { verify } from "crypto";

const API_BASE = "http://127.0.0.1:8000";

export default function Users() {
    const router = useRouter();
    const [users, setUsers] = useState([] as any[]);

    async function fetchUsers() {
        try {
            const user = await fetch(`${API_BASE}/user/read_all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await user.json();
            setUsers(data);
            console.log(data);

        } catch (error) {
            console.error("Error fetching users:", error);
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
        fetchUsers();
    }, []);

    function deleteUser(id: string) {
        fetch(`${API_BASE}/user/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(() => {
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
            });
    }

    function createUser() {
        router.push(`/users/signup`);
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <button
                onClick={createUser}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Create User
            </button>
            <ul>
                {users.map((user) => (
                    <li key={user.id} className="flex justify-between items-center mb-2">
                        <span>{user.username}</span>
                        <button
                            onClick={() => deleteUser(user.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
