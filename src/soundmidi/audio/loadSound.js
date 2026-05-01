import { getFromMemory, saveToMemory, getFromSession, saveToSession } from './cache.js';

export default async function loadSound(audioCtx, buffers, index, url) {
    let arrayBuffer = getFromMemory(url);

    if (!arrayBuffer) {
        arrayBuffer = getFromSession(url);

        if (!arrayBuffer) {
            const res = await fetch(url);
            arrayBuffer = await res.arrayBuffer();
            saveToSession(url, arrayBuffer);
        }

        saveToMemory(url, arrayBuffer);
    }

    buffers[index] = await audioCtx.decodeAudioData(arrayBuffer);
}