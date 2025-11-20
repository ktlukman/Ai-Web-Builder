import { db } from "@/config/db";
import { chatTable, frameTable, projectsTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {projectId, frameId, messages} = await req.json();
    const user = await currentUser();

    const projectResult = await db.insert(projectsTable).values({
        projectId: projectId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
    });

    const frameResult = await db.insert(frameTable).values({
        frameId: frameId,
        projectId: projectId,
    });

    const chatResult = await db.insert(chatTable).values({
        chatMessages: messages,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        frameId: frameId,
    });

    return NextResponse.json({
        projectId, frameId, messages
    })
}