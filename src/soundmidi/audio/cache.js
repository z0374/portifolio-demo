const memoryCache = new Map();

export function getFromMemory(url) {
    return memoryCache.get(url);
}

export function saveToMemory(url, buffer) {
    memoryCache.set(url, buffer);
}

export function getFromSession(url) {
    const data = sessionStorage.getItem(url);
    if (!data) return null;

    const binary = atob(data);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes.buffer;
}

export function saveToSession(url, buffer) {
    try {
        let binary = '';
        const bytes = new Uint8Array(buffer);

        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        sessionStorage.setItem(url, btoa(binary));
    } catch (e) {
        console.warn("sessionStorage cheio");
    }
}