export default function playSound(audioCtx, masterGain, buffers, index) {
    if (!buffers[index]) return;

    const source = audioCtx.createBufferSource();
    source.buffer = buffers[index];

    // 🔥 usa o gain global
    source.connect(masterGain);

    source.start(audioCtx.currentTime);
}