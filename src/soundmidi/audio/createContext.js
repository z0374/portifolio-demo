export default function createContext() {
    return new (window.AudioContext || window.webkitAudioContext)({
        latencyHint: 'interactive'
    });
}