import { atom } from "jotai";

export const countAtom = atom<number>(1);

export const headerTitleAtom = atom<string>("");

export const isMenuOpenAtom = atom<boolean>(false);
