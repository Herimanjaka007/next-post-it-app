import { colorPalettes } from "./colorPalettes";
import PaletteItem from "./PaletteItem";

const Palette = () => {
    return (
        <section className="absolute bottom-5 flex justify-around right-20 shadow-md rounded-4xl bg-slate-700 p-2 w-1/4 z-100">
            {Object
                .values(colorPalettes)
                .map((palette, index) => <PaletteItem key={index} colorClass={palette["articleBg"]} />)}
        </section>
    );
}

export default Palette