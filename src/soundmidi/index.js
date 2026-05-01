import tracks from '@config/tracks.js';
import colors from '@config/colors.js';

import createContext from '@audio/createContext.js';
import loadSound from '@audio/loadSound.js';
import playSound from '@audio/playSound.js';
import warmUp from '@audio/warmUp.js';
import unlock from '@audio/unlock.js';

import renderButtons from '@ui/renderButtons.js';
import bindClicks from '@ui/bindClicks.js';
import bindKeyboard from '@ui/bindKeyboard.js';

function soundmidi() {

    const uri_assets = "https://assets.victormacedo.dev.br";
    const wavT = "wav/tracks";

    const app = document.getElementById('app');
    const audioCtx = createContext();
    const buffers = {};

    // 🎨 render imediato (SEM BLOQUEIO)
    renderButtons(app, tracks);

    // 🔓 unlock
    document.addEventListener('click', () => unlock(audioCtx), { once: true });

    // ▶️ função de play segura
    const play = (i) => {
        if (!buffers[i]) return;
        playSound(audioCtx, buffers, i);
    };

    bindClicks(tracks, play);
    bindKeyboard(tracks, play);

    // 🚀 LOAD EM BACKGROUND (não bloqueia LCP)
    tracks.forEach((track, i) => {

        const url = `${uri_assets}/${wavT}/${track.src}.wav`;

        loadSound(audioCtx, buffers, i, url)
            .then(() => {
                const btn = document.getElementById(`b${i}`);

                // 🎨 ativa botão
                btn.disabled = false;
                btn.classList.remove('loading');
                btn.classList.add('ready');
                btn.style.background = colors[i];

                // 🔥 warmup individual (melhor que global)
                warmUp(audioCtx, buffers, i);
            })
            .catch(() => {
                console.warn("Erro ao carregar:", track.src);
            });

    });
}

soundmidi();