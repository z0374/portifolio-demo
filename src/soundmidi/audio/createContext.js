export default function createContext() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)({
        latencyHint: 'interactive'
    });

    // 🎚️ master gain (volume global)
    const masterGain = audioCtx.createGain();
    masterGain.gain.value = 1;

    // 🔗 conecta uma vez só
    masterGain.connect(audioCtx.destination);

    return {
        audioCtx,
        masterGain
    };
}