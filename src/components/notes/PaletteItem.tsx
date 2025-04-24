interface PaletteItemProps {
    colorClass?: string;
    onClick?: () => void;
}

const PaletteItem = ({ colorClass = "bg-cyan-500", onClick }: PaletteItemProps) => {
    return (
        <button
            type="button"
            className={`${colorClass} w-8 h-8 rounded-full cursor-pointer border border-gray-300 hover:ring-2 hover:ring-offset-1 hover:ring-cyan-400 transition`}
            onClick={onClick}
            aria-label="Select color"
        />
    );
};

export default PaletteItem;
