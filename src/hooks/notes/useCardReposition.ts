import { useState, useRef, useCallback, useEffect } from "react";
import { useWaitUpdate } from "./useWaitUpdate";
import { NotePayload } from "@/types/notePayload";

export function useCardReposition(
    noteId: string,
    { x, y }: NotePayload,
    noteContainerRef: { current: HTMLDivElement | null }) {

    const [position, setPosition] = useState({ x, y });
    const [dragging, setDragging] = useState(false);
    const dragStartPos = useRef<{ mouseX: number; mouseY: number; cardX: number; cardY: number } | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const { waitAndUpdate } = useWaitUpdate(noteId, 1.5);
    const handleMouseDown = (e: React.MouseEvent) => {
        if (cardRef.current) {
            setDragging(true);
            dragStartPos.current = {
                mouseX: e.clientX,
                mouseY: e.clientY,
                cardX: position.x!,
                cardY: position.y!,
            };
            e.preventDefault();
        }
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (dragging && dragStartPos.current && cardRef.current && noteContainerRef.current) {
            const deltaX = e.clientX - dragStartPos.current.mouseX;
            const deltaY = e.clientY - dragStartPos.current.mouseY;

            const newX = dragStartPos.current.cardX + deltaX;
            const newY = dragStartPos.current.cardY + deltaY;

            const maxX = window.innerWidth - cardRef.current.offsetWidth;
            const noteContainerBottom = noteContainerRef.current.getBoundingClientRect()?.bottom;
            const noteCardBottom = cardRef.current.getBoundingClientRect().bottom;
            if (noteCardBottom + 50 >= noteContainerBottom) {
                noteContainerRef.current.scrollTop += 100;
            }
            setPosition({
                x: Math.min(Math.max(0, newX), maxX),
                y: Math.max(0, newY),
            });
        }
    }, [dragging, noteContainerRef]);

    const handleMouseUp = useCallback(() => {
        setDragging(false);
        waitAndUpdate(position);
        dragStartPos.current = null;
    }, [waitAndUpdate, position]);

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
    }, [dragging, handleMouseMove, handleMouseUp]);

    return {
        position,
        cardRef,
        handleMouseDown,
    };
}
