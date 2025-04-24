"use client"

import NoteGrid from "@/components/notes/NoteGrid"
import "./globals.css"
import { NotesProvider, } from "@/context/NotesContext"

const Notes = () => {
  return (
    <NotesProvider>
      <NoteGrid />
    </NotesProvider>
  )
}

export default Notes
