"use client"

import { Color } from "@/types/Color";
import { Note } from "@/types/note";
import { NoteFrontEnd } from "@/types/noteFrontend";
import { NotePayload } from "@/types/notePayload";
import { createContext, useState, useContext, ReactNode, useCallback, useEffect } from "react";

interface NotesContextType {
    notes: NoteFrontEnd[];
    activeNoteId: string | null;
    setActiveNoteId: (id: string | null) => void;
    addNote: (note: Note) => void;
    updateNote: (noteId: string, note: NotePayload) => void;
    deleteNote: (noteId: string) => void;
    selectedColor: Color;
    setSelectedColor: (color: Color) => void;
    loading: boolean;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
    const [notes, setNotes] = useState<NoteFrontEnd[]>([]);
    const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<Color>("cyan");
    const [loading, setLoading] = useState(true);

    const addNote = useCallback(async (note: Note) => {
        const res = await fetch("/api/notes", {
            method: "POST",
            body: JSON.stringify(note)
        });
        if (res.ok) {
            const newNote = await res.json();
            setNotes(prevNotes => [...prevNotes, newNote]);
        }
    }, []);

    const updateNote = useCallback(async (noteId: string, note: NotePayload) => {
        const res = await fetch(`/api/notes/${noteId}`, {
            method: "PUT",
            body: JSON.stringify(note)
        });
        if (res.ok) {
            console.log("Note updated successfully");
        }
    }, []);

    const deleteNote = useCallback(async (noteId: string) => {
        const res = await fetch(`/api/notes/${noteId}`, {
            method: "DELETE",
        });
        if (res.ok) {
            const newNotes = [...notes].filter(note => note.id !== noteId);
            setNotes(newNotes);
        }
    }, [notes]);

    const getNotes = useCallback(async (): Promise<NoteFrontEnd[]> => {
        try {
            const res = await fetch("/api/notes");
            if (!res.ok) throw new Error("Failed to fetch notes");
            const notes = await res.json();
            return notes;
        } catch (error) {
            console.error("Error fetching notes:", error);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        getNotes().then(setNotes);
    }, [getNotes]);

    const value = {
        loading,
        notes,
        activeNoteId,
        setActiveNoteId,
        addNote,
        updateNote,
        deleteNote,
        selectedColor,
        setSelectedColor
    };
    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = (): NotesContextType => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error("useNotes must be used within a NotesProvider");
    }
    return context;
};
