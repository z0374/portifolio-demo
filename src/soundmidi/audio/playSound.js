export default function playSound(audioCtx, masterGain, buffers, index) {
    if (!buffers[index]) return;

    const source = audioCtx.createBufferSource();
    source.buffer = buffers[index];

    source.connect(masterGain);

    // 🔥 pequeno offset elimina latência perceptível
    const now = audioCtx.currentTime;
    source.start(now + 0.005);
}