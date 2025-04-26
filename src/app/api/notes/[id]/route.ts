import { updateNote } from "@/services/noteService";
import { NotePayload } from "@/types/notePayload";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const note: NotePayload = await req.json();
    try {
        await updateNote(id, note);
        return NextResponse.json({ message: "Note updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error when updating note:", error);
        return NextResponse.json({ error: "Failed to update note" }, { status: 500 })
    }
}