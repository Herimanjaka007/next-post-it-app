export interface Note {
  id: number;
  content: string;
  color: "cyan" | "green" | "red" | "orange" | "yellow";
  x: number;
  y: number;
}

export const notesData: Note[] = [
  { id: 1, content: "Note 1 content", color: "cyan", x: 0, y: 0 },
  { id: 2, content: "Note 2 content", color: "green", x: 0, y: 0 },
  { id: 3, content: "Note 3 content", color: "red", x: 0, y: 0 },
  { id: 4, content: "Note 4 content", color: "orange", x: 0, y: 0 },
  { id: 5, content: "Note 5 content", color: "yellow", x: 0, y: 0 },
];
