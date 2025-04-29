"use client"

import { Loader, Trash2 } from "lucide-react"
import { ChangeEvent, useRef, useState } from "react"
import { useWaitUpdate } from "@/hooks/notes/useWaitUpdate"
import { NoteFrontEnd } from "@/types/noteFrontend"
import { useCardReposition } from "@/hooks/notes/useCardReposition"
import { useAdjustNoteHeight } from "@/hooks/notes/useAdjustNoteHeight"
import { colorPalettes } from "@/lib/colorPalettes"

interface NoteCardProps {
    noteData: NoteFrontEnd
    zIndex?: number
    onFocus: ({ id }: NoteFrontEnd) => void
    onDelete: () => void
    noteContainerRef: { current: HTMLDivElement | null }
}

const NoteCard = ({ noteData, zIndex = 10, onFocus, onDelete, noteContainerRef }: NoteCardProps) => {
    const { id, color, content, x, y } = noteData;
    const [note, setNote] = useState(content);
    const articleRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { position, cardRef, handleMouseDown } = useCardReposition(id, { x, y }, noteContainerRef);
    useAdjustNoteHeight(textareaRef, articleRef, note);
    const { loading, waitAndUpdate } = useWaitUpdate(id, 3);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const content = e.target.value;
        setNote(content);
        waitAndUpdate({ content });
    }

    const handleChangePosition = (e: React.MouseEvent) => {
        handleMouseDown(e);
        onFocus(noteData);
    }

    const palette = colorPalettes[color] || colorPalettes.cyan
    return (
        <section
            ref={cardRef}
            className={`rounded-lg w-[200px] lg:w-[350px] overflow-hidden ${palette.cardBg}`}
            style={{ position: "absolute", left: position.x, top: position.y, zIndex }}
        >
            <header
                onMouseDown={handleChangePosition}
                className="w-full flex items-center cursor-move"
            >
                <span className="text-center p-3" onClick={onDelete}>
                    <Trash2 className="cursor-pointer" />
                </span>
                {
                    loading && (
                        <span className="ms-auto flex items-center gap-2 px-2">
                            <p>Saving </p>
                            <Loader className="animate-spin" />
                        </span>
                    )
                }
            </header>
            <article ref={articleRef} className={`w-full rounded-lg ${palette.articleBg}`}>
                <textarea
                    spellCheck="false"
                    ref={textareaRef}
                    name="note"
                    id="note"
                    className="w-full h-full bg-inherit border-none outline-none resize-none p-6 overflow-hidden"
                    value={note}
                    onChange={handleChange}
                />
            </article>
        </section>
    )
}

export default NoteCard
