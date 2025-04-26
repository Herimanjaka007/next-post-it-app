"use client"

import { Trash2 } from "lucide-react"
import React, { ChangeEvent, useRef, useState } from "react"
import { colorPalettes } from "../../lib/colorPalettes"
import { useCardReposition } from "../../hooks/notes/useCardReposition"
import { useAdjustNoteHeight } from "../../hooks/notes/useAdjustNoteHeight"
import { Note } from "@/types/note"
import { useWaitUpdate } from "@/hooks/notes/useWaitUpdate"
import { NotePayload } from "@/types/notePayload"

interface NoteCardProps {
    noteData: Note
    zIndex?: number
    onFocus?: () => void
    onUpdate?: (content: NotePayload) => void
}

const NoteCard = ({ noteData, zIndex = 10, onFocus, onUpdate }: NoteCardProps) => {
    const { color = "cyan", content = "", x = 0, y = 0 } = noteData;
    const [note, setNote] = useState(content);
    const articleRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { position, cardRef, handleMouseDown } = useCardReposition(x, y, onUpdate!);
    useAdjustNoteHeight(textareaRef, articleRef, note);
    const waitAndUpdate = useWaitUpdate({ content: note }, onUpdate!, 3);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const content = e.target.value;
        setNote(content);
        waitAndUpdate();
    }

    const handleChangePosition = (e: React.MouseEvent) => {
        handleMouseDown(e);
        if (onFocus) onFocus();
    }

    const palette = colorPalettes[color] || colorPalettes.cyan
    return (
        <section
            ref={cardRef}
            className={`rounded-lg border shadow-sm w-1/4 overflow-hidden ${palette.cardBg}`}
            style={{ position: "absolute", left: position.x, top: position.y, zIndex }}
        >
            <header
                onMouseDown={handleChangePosition}
                className="w-full flex items-center cursor-move"
            >
                <span className="text-center p-3">
                    <Trash2 className="cursor-pointer" />
                </span>
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
