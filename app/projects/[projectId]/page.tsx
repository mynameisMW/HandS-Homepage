import ProjectView from "./notionRendering"
import Link from "next/link";
import { NotionAPI } from "notion-client";

const API_BASE = "http://127.0.0.1:8000";
const notion = new NotionAPI(
    {
        authToken: process.env.NOTION_API_KEY,
        activeUser: "HandS"
    }
);

export default async function Projects({params}: {params: {projectId: string}}) {
    const projectId = params.projectId;
    const recordMap = await notion.getPage(projectId);
    if (!recordMap) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <Link href="/projects">← Back to Projects</Link>
            <ProjectView recordMap={recordMap} />
        </div>
    );
}
