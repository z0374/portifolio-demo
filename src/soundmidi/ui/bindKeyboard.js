export default function bindKeyboard(tracks, play) {
    document.addEventListener('keydown', (event) => {
        for (let i = 0; i < tracks.length; i++) {
            if (event.code === 'Numpad' + tracks[i].tecla) {
                play(i);
                document.getElementById(`b${i}`).focus();
            }
        }
    });
}