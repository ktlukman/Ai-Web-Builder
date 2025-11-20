import { db } from "@/config/db";
import { chatTable, frameTable, projectsTable } from "@/config/schema";
import { fr } from "date-fns/locale";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    //const { searchParams } = new URL(req.url);
    const { searchParams } = new URL(req.url);
    const frameId = searchParams.get("frameId");
    const projectId = searchParams.get("projectId")

    
    const frameResult = await db.select().from(frameTable)
    //@ts-ignore
    .where(eq(frameTable.frameId, frameId));
  
    const projectResult = await db.select().from(projectsTable)
    //@ts-ignore
    .where(eq(projectsTable.projectId, projectId));
  
    const chatResult = await db.select().from(chatTable)
    //@ts-ignore
    .where(eq(chatTable.frameId, frameId));

    const finalResult = {
        ...projectResult[0],
        ...frameResult[0],
        chatMessages: chatResult[0].chatMessages,
    };

    return NextResponse.json(finalResult);
}

export async function PUT(req: NextRequest) {
    const {designCode, frameId, projectId} = await req.json();
    const result = await db.update(frameTable).set({
        designCode: designCode,
    }).where(and(eq(frameTable.frameId, frameId), eq(frameTable.projectId, projectId)));

    return NextResponse.json({result: 'Updated!'});
};