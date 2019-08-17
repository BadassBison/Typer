import { writable } from 'svelte/store';

export const inputStore = writable();
export const deleteStore = writable(false);
export const principleStore = writable({
    title: "",
    curr: "",
    right: "",
    left: "",
    error: "",
    success: ""
});
export const newPrincipleStore = writable(false);
export const typingOver = writable(false);
export const time = writable();
export const keyCount = writable(0);
export const wpm = writable(0);
export const accuracy = writable(100);
export const totalWrong = writable(0);