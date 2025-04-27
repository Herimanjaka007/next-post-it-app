import { Color } from "@/types/Color";

interface PaletteItemProps {
    color: Color
    colorClass?: string;
    onClick: () => void;
    active: boolean
}

const PaletteItem = ({ active, colorClass = "bg-cyan-500", onClick, children }: React.PropsWithChildren<PaletteItemProps>) => {
    return (
        <button
            type="button"
            className={`${colorClass} w-8 h-8 rounded-full cursor-pointer border border-gray-300 ${active && "ring-2 ring-offset-1 ring-cyan-400"} hover:ring-2 hover:ring-offset-1 hover:ring-cyan-400 transition`}
            onClick={onClick}
            aria-label="Select color"
        >
            {children}
        </button>
    );
};

export default PaletteItem;
