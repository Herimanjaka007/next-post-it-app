import { FilePlus } from "lucide-react";
import { colorPalettes } from "./colorPalettes";
import PaletteItem from "./PaletteItem";
import { Button } from "../ui/button";

interface PaletteProps {
    onAddNote: () => void;
}

const Palette = ({ onAddNote }: PaletteProps) => {
    return (
        <section className="absolute bottom-5 flex justify-around right-20 shadow-md rounded-4xl bg-slate-700 p-2 w-1/4 z-100">
            <Button className="cursor-pointer" onClick={onAddNote}>
                NEW<FilePlus className="text-white cursor-pointer" />
            </Button>
            {Object
                .values(colorPalettes)
                .map((palette, index) => <PaletteItem key={index} colorClass={palette["articleBg"]} />)}
        </section>
    );
}

export default Palette
