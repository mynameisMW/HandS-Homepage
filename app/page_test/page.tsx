import Announcement from "../mainPage/announcement";
import React from "react";
import Link from "next/link";

export default function Page() {
    return (
        <div>
            <h1>Test Page</h1>
            <Link href="/">Go to Home</Link>
            <main style={{ marginTop: "20px" }}>
                <p>This is a test page for announcements.</p>
                <Announcement />
            </main>
        </div>
    );
}