"use client"

import { Trash2 } from "lucide-react"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { colorPalettes } from "./colorPalettes";

interface NoteCardProps {
    color?: keyof typeof colorPalettes;
    content?: string;
    x?: number;
    y?: number;
    zIndex?: number;
    onFocus?: () => void;
}

const NoteCard = ({ color = "cyan", content = "", x = 0, y = 0, zIndex = 10, onFocus }: NoteCardProps) => {
    const [note, setNote] = useState(content);
    const articleRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const noteCardRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState({ x, y });
    const [dragging, setDragging] = useState(false);
    const dragStartPos = useRef<{ mouseX: number; mouseY: number; cardX: number; cardY: number } | null>(null);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value);
    }

    useEffect(() => {
        if (textareaRef.current && articleRef.current) {
            textareaRef.current.style.height = "auto";
            articleRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [note]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (noteCardRef.current) {
            setDragging(true);
            dragStartPos.current = {
                mouseX: e.clientX,
                mouseY: e.clientY,
                cardX: position.x,
                cardY: position.y,
            };
            e.preventDefault();
            if (onFocus) {
                onFocus();
            }
        }
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (dragging && dragStartPos.current && noteCardRef.current) {
            const deltaX = e.clientX - dragStartPos.current.mouseX;
            const deltaY = e.clientY - dragStartPos.current.mouseY;

            const newX = dragStartPos.current.cardX + deltaX;
            const newY = dragStartPos.current.cardY + deltaY;

            const maxX = window.innerWidth - noteCardRef.current.offsetWidth;
            const maxY = window.innerHeight - noteCardRef.current.offsetHeight;

            setPosition({
                x: Math.min(Math.max(0, newX), maxX),
                y: Math.min(Math.max(0, newY), maxY),
            });
        }
    }, [dragging]);

    const handleMouseUp = () => {
        setDragging(false);
        dragStartPos.current = null;
    };

    useEffect(() => {
        if (dragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        } else {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging, handleMouseMove]);

    const palette = colorPalettes[color] || colorPalettes.cyan;
    return (
        <section
            ref={noteCardRef}
            className={`rounded-lg border shadow-sm w-1/4 overflow-hidden ${palette.cardBg}`}
            style={{ position: "absolute", left: position.x, top: position.y, zIndex }}
        >
            <header
                onMouseDown={handleMouseDown}
                className="w-full flex items-center cursor-move">
                <span className="text-center p-3">
                    <Trash2 className="cursor-pointer" />
                </span>
            </header>
            <article ref={articleRef} className={`w-full rounded-lg ${palette.articleBg}`}>
                <textarea
                    spellCheck="false"
                    ref={textareaRef}
                    name="note" id="note"
                    className="w-full h-full bg-inherit border-none outline-none resize-none p-6 overflow-hidden"
                    value={note}
                    onChange={handleChange}
                />
            </article>
        </section >
    )
}

export default NoteCard
