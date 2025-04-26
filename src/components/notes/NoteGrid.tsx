import { useCallback } from "react"
import NoteCard from "./NoteCard"
import Palette from "./palette/Palette"
import { useNotes } from "@/context/NotesContext"
import { Loader } from "lucide-react"
import { NotePayload } from "@/types/notePayload"

const NoteGrid = () => {
    const { notes, activeNoteId, setActiveNoteId, addNote, loading, updateNote } = useNotes()

    const handleFocus = useCallback((id: string) => {
        setActiveNoteId(id)
    }, [setActiveNoteId])

    const handleAddNote = useCallback(() => {
        addNote({
            content: "New note",
            color: "cyan",
            x: 100,
            y: 100,
        })
    }, [addNote])

    return (
        <section className="absolute top-0 left-0 w-full h-full note-grid bg-slate-900">
            <Palette onAddNote={handleAddNote} />
            {
                loading ?
                    <div className="w-full h-full flex justify-center items-center">
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
                                onFocus={() => handleFocus(id)}
                                onUpdate={(newContent: NotePayload) => updateNote(id, newContent)}
                            />
                        )
                    })
            }
        </section>
    )
}

export default NoteGrid;
