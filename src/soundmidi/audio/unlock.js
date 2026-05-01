export default async function unlock(audioCtx) {
    if (audioCtx.state !== 'running') {
        await audioCtx.resume();
    }
}