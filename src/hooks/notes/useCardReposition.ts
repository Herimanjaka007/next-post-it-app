import { useState, useRef, useCallback, useEffect } from "react";
import { useWaitUpdate } from "./useWaitUpdate";
import { NotePayload } from "@/types/notePayload";

export function useCardReposition(initialX = 0, initialY = 0, onUpdate: (note: NotePayload) => void) {
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [dragging, setDragging] = useState(false);
    const dragStartPos = useRef<{ mouseX: number; mouseY: number; cardX: number; cardY: number } | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const waitAndUpdate = useWaitUpdate(position, onUpdate, 1.5);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (cardRef.current) {
            setDragging(true);
            dragStartPos.current = {
                mouseX: e.clientX,
                mouseY: e.clientY,
                cardX: position.x,
                cardY: position.y,
            };
            e.preventDefault();
        }
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (dragging && dragStartPos.current && cardRef.current) {
            const deltaX = e.clientX - dragStartPos.current.mouseX;
            const deltaY = e.clientY - dragStartPos.current.mouseY;

            const newX = dragStartPos.current.cardX + deltaX;
            const newY = dragStartPos.current.cardY + deltaY;

            const maxX = window.innerWidth - cardRef.current.offsetWidth;
            const maxY = window.innerHeight - cardRef.current.offsetHeight;

            setPosition({
                x: Math.min(Math.max(0, newX), maxX),
                y: Math.min(Math.max(0, newY), maxY),
            });
        }
    }, [dragging]);

    const handleMouseUp = useCallback(() => {
        setDragging(false);
        waitAndUpdate();
        dragStartPos.current = null;
    }, [waitAndUpdate]);

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
