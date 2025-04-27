import { deleteNote, updateNote } from "@/services/noteService";
import { NotePayload } from "@/types/notePayload";
import { NextRequest, NextResponse } from "next/server";
interface Context {
    params: Promise<{ id: string }>
}
export const PUT = async (req: NextRequest, { params }: Context) => {
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

export const DELETE = async (req: NextRequest, { params }: Context) => {
    const { id } = await params;
    try {
        if (await deleteNote(id))
            return NextResponse.json({ message: "Note deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: `Error when deleting note with id: ${id}.` }, { status: 500 })
    }
}