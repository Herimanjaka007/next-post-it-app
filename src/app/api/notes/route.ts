import { createNote, getNotes, updateNote } from "@/services/noteService";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    try {
        const notes = await getNotes();
        return NextResponse.json(notes, { status: 200 });
    } catch (error) {
        console.error("Error fetching notes:", error);
        return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
    }
}

export const POST = async (req: NextRequest) => {
    const note = await req.json();
    try {
        const newNote = createNote(note);
        return NextResponse.json(newNote, { status: 201 });
    } catch (error) {
        console.error("Error when creating note:", error);
        return NextResponse.json({ error: "Failed to create note" }, { status: 500 })
    }
}