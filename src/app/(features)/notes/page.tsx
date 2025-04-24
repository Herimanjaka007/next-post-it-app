"use client"

import { useState } from "react"
import NoteCard from "@/components/notes/NoteCard"
import { colorPalettes } from "@/components/notes/colorPalettes"
import "./globals.css"
import Palette from "@/components/notes/Palette"

const notesData = [
  { id: 1, content: "Note 1 content", color: "cyan", x: 0, y: 0 },
  { id: 2, content: "Note 2 content", color: "green", x: 0, y: 0 },
  { id: 3, content: "Note 3 content", color: "red", x: 0, y: 0 },
  { id: 4, content: "Note 4 content", color: "orange", x: 0, y: 0 },
  { id: 5, content: "Note 5 content", color: "yellow", x: 0, y: 0 },
] as const;

const Notes = () => {
  const [activeNoteId, setActiveNoteId] = useState<number | null>(null);

  const handleFocus = (id: number) => {
    setActiveNoteId(id);
  };

  return (
    <section className="absolute top-0 left-0 w-full h-full note-grid bg-slate-900">
      <Palette />
      {notesData.map(({ id, content, color, x, y }) => {
        const zIndex = id === activeNoteId ? 50 : 10;
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
        );
      })}
    </section>
  );
};

export default Notes;
