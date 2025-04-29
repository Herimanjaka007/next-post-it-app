"use client"

import { useCallback, useRef } from "react"
import NoteCard from "./NoteCard"
import Palette from "./palette/Palette"
import { useNotes } from "@/context/NotesContext"
import { Loader } from "lucide-react"
import { NoteFrontEnd } from "@/types/noteFrontend"

const NoteGrid = () => {
    const { notes, activeNoteId, setActiveNoteId, addNote, loading, deleteNote, selectedColor } = useNotes()
    const noteContainerRef = useRef<HTMLDivElement>(null);

    const handleFocus = useCallback(({ id }: NoteFrontEnd) => {
        setActiveNoteId(id)
    }, [setActiveNoteId])

    const handleAddNote = useCallback(() => {
        addNote({
            content: "New note",
            color: selectedColor,
            x: 100,
            y: 100,
        })
    }, [addNote, selectedColor])

    return (
        <section
            ref={noteContainerRef}
            className="relative top-0 min-h-[100vh] overflow-auto w-full note-grid bg-slate-900"
        >
            <Palette onAddNote={handleAddNote} />
            {
                loading ?
                    <div className="absolute inset-0 min-h-full flex justify-center items-center">
                        <Loader className="animate-spin text-white" width={60} height={60} />
                    </div>
                    :
                    notes.map((note) => {
                        const { id } = note;
                        const zIndex = id === activeNoteId ? 50 : 10
                        return (
                            <NoteCard
                                key={id}
                                noteData={note}
                                zIndex={zIndex}
                                onFocus={handleFocus}
                                onDelete={() => deleteNote(id)}
                                noteContainerRef={noteContainerRef}
                            />
                        )
                    })
            }
        </ section>
    )
}

export default NoteGrid;
