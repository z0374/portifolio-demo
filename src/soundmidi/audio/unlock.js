document.addEventListener('pointerdown', async () => {
    if (audioCtx.state !== 'running') {
        await audioCtx.resume();

        // 🔥 hack: tocar buffer vazio
        const buffer = audioCtx.createBuffer(1, 1, 22050);
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start(0);
    }
}, { once: true });