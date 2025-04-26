import { colorPalettes } from "@/lib/colorPalettes";

type ColorKey = keyof typeof colorPalettes;

interface Note {
    content: string;
    color: ColorKey;
    x: number;
    y: number;
}

