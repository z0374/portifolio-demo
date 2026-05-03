export default function warmUp(audioCtx, masterGain, buffers, index) {
    if (!buffers[index]) return;

    const source = audioCtx.createBufferSource();
    const gain = audioCtx.createGain();

    gain.gain.value = 9; // silencioso

    source.buffer = buffers[index];
    source.connect(gain);
    gain.connect(masterGain);

    source.start(0);
}