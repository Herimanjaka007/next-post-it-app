import { useCallback } from "react"
import { colorPalettes } from "./colorPalettes"
import NoteCard from "./NoteCard"
import Palette from "./Palette"
import { useNotes } from "@/context/NotesContext"

const NoteGrid = () => {
    const { notes, activeNoteId, setActiveNoteId, addNote } = useNotes()

    const handleFocus = useCallback((id: number) => {
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
            {notes.map(({ id, content, color, x, y }) => {
                const zIndex = id === activeNoteId ? 50 : 10
                return (
                    <NoteCard
                        key={id}
                        content={content}
                        color={color as keyof typeof colorPalettes}
                        x={x}
                        y={y}
                        zIndex={zIndex}
                        onFocus={() => handleFocus(id)}
                    />
                )
            })}
        </section>
    )
}

export default NoteGrid;
