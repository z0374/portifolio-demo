export default function playSound(audioCtx, buffers, index) {
    if (!buffers[index]) return;

    const source = audioCtx.createBufferSource();
    source.buffer = buffers[index];
    source.connect(audioCtx.destination);
    source.start(0);
}