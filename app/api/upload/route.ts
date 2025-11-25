import { db } from "@/config/db";
import { uploadTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, file.name);

    // Ensure upload directory exists (optional: add fs.mkdir if needed)
    await writeFile(filePath, buffer);

    // Save metadata to DB
    await db.insert(uploadTable).values({
        name: file.name,
        path: `/uploads/${file.name}`,
    });

    return NextResponse.json({
        name: file.name,
        path: `/uploads/${file.name}`,
    });
}