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
        <section className="absolute bottom-5 flex justify-around right-20 shadow-md rounded-4xl bg-slate-700 p-2 w-1/4 z-100">
            <Button className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 hover:scale-105 rounded-4xl text-black" onClick={onAddNote}>
                NEW<Plus className="text-black cursor-pointer" />
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
