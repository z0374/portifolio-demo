export default async function loadSound(audioCtx, workletNode, index, url) {
    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    // 🔥 pega canal (mono)
    const channelData = audioBuffer.getChannelData(0);

    // ⚠️ copiar buffer (evita problemas de memória)
    const copy = new Float32Array(channelData);

    workletNode.port.postMessage({
        type: 'load',
        data: {
            id: index,
            buffer: copy
        }
    });
}