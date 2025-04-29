import { Plus } from "lucide-react";
import PaletteItem from "./PaletteItem";
import { colorPalettes } from "@/lib/colorPalettes";
import { Button } from "@/components/ui/button";
import { Color } from "@/types/Color";
import { useNotes } from "@/context/NotesContext";

interface PaletteProps {
    onAddNote: () => void;
}

const Palette = ({ onAddNote }: PaletteProps) => {
    const { selectedColor, setSelectedColor } = useNotes()
    return (
        <section className="fixed left-10 md:left-[35vw] space-x-4 top-5 flex justify-around shadow-md rounded-4xl bg-slate-700 p-2 z-100">
            <Button className="cursor-pointer bg-gray-900 hover:bg-gray-950 hover:scale-105 rounded-4xl" onClick={onAddNote}>
                NEW<Plus className="cursor-pointer" />
            </Button>
            {
                Object
                    .entries(colorPalettes)
                    .map(([color, palette]) => (
                        <PaletteItem
                            key={color}
                            active={color === selectedColor}
                            onClick={() => setSelectedColor(color as Color)}
                            color={color as Color}
                            colorClass={palette["cardBg"]} />
                    ))
            }
        </section>
    );
}

export default Palette
