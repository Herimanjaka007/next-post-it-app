"use client"

import { Trash2 } from "lucide-react"
import { ChangeEvent, useRef, useState } from "react"
import { colorPalettes } from "./colorPalettes"
import { useCardReposition } from "./useCardReposition"
import { useAdjustNoteHeight } from "./useAdjustNoteHeight"

interface NoteCardProps {
    color?: keyof typeof colorPalettes
    content?: string
    x?: number
    y?: number
    zIndex?: number
    onFocus?: () => void
}

const NoteCard = ({ color = "cyan", content = "", x = 0, y = 0, zIndex = 10, onFocus }: NoteCardProps) => {
    const [note, setNote] = useState(content)
    const articleRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const { position, cardRef, handleMouseDown } = useCardReposition(x, y)

    useAdjustNoteHeight(textareaRef, articleRef, note)

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value)
    }

    const palette = colorPalettes[color] || colorPalettes.cyan
    return (
        <section
            ref={cardRef}
            className={`rounded-lg border shadow-sm w-1/4 overflow-hidden ${palette.cardBg}`}
            style={{ position: "absolute", left: position.x, top: position.y, zIndex }}
        >
            <header onMouseDown={(e) => {
                handleMouseDown(e)
                if (onFocus) {
                    onFocus()
                }
            }} className="w-full flex items-center cursor-move">
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
