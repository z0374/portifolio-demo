export default function warmUp(audioCtx, buffers, index) {
    if (!buffers[index]) return;

    const source = audioCtx.createBufferSource();
    const gain = audioCtx.createGain();

    gain.gain.value = 0; // 🔇 silencioso

    source.buffer = buffers[index];
    source.connect(gain);
    gain.connect(audioCtx.destination);

    source.start(0);
}