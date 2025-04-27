import connectToDatabase from "@/lib/mongodb";
import NoteModel, { NoteDocument } from "@/models/Note";
import { Note } from "@/types/note";
import { NoteFrontEnd } from "@/types/noteFrontend";
import { NotePayload } from "@/types/notePayload";

const mapNoteDocumentToFrontEnd = (note: NoteDocument): NoteFrontEnd => {
    return {
        id: note._id.toString(),
        content: note.content,
        color: note.color,
        x: note.x,
        y: note.y,
    }
}

export const getNotes = async (): Promise<NoteFrontEnd[]> => {
    await connectToDatabase();
    const notes = await NoteModel.find();
    return notes.map(mapNoteDocumentToFrontEnd);
}

export const createNote = async (note: Note) => {
    await connectToDatabase();
    const newNote = new NoteModel(note);
    await newNote.save();
    return mapNoteDocumentToFrontEnd(newNote);
}

export const updateNote = async (noteId: string, payload: NotePayload) => {
    await connectToDatabase();
    await NoteModel.findByIdAndUpdate(noteId, payload);
}

export const deleteNote = async (noteId: string) => {
    await connectToDatabase();
    await NoteModel.findByIdAndDelete(noteId);
    return true;
}