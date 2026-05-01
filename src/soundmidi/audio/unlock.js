export default function unlock(audioCtx) {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}