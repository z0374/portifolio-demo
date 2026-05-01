export default function renderButtons(app, tracks) {
    for (let i = 0; i < tracks.length; i++) {
        app.innerHTML += `
            <button id="b${i}" disabled class="loading">
                ${tracks[i].nome}
            </button>
        `;
    }
}