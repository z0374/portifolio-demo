export default function bindClicks(tracks, play) {
    for (let i = 0; i < tracks.length; i++) {
        document
            .getElementById(`b${i}`)
            .addEventListener('click', () => play(i));
    }
}