export default function renderButtons(app, tracks, colors) {
    for (let i = 0; i < tracks.length; i++) {
        app.innerHTML += `
            <button id="b${i}" style="background:${colors[i]}">
                ${tracks[i].nome}
            </button>
        `;
    }
}