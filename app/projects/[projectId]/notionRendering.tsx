"use client";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import React from "react";

export default function ProjectView({ recordMap }: { recordMap: any }) {
  if (!recordMap || !recordMap.block) {
    return <p className="text-center text-gray-500 mt-10">내용이 없습니다.</p>;
  }
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow">
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
      />
    </div>
  );
}
