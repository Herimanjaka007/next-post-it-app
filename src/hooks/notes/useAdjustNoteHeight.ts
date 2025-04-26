import { useEffect } from "react";

export function useAdjustNoteHeight(
  textareaRef: React.RefObject<HTMLTextAreaElement | null>,
  articleRef: React.RefObject<HTMLDivElement | null>,
  note: string
) {
  useEffect(() => {
    if (textareaRef.current && articleRef.current) {
      textareaRef.current.style.height = "auto";
      articleRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [note, textareaRef, articleRef]);
}
