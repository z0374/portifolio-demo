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

async function soundmidi() {

    const uri_assets = "https://assets.victormacedo.dev.br";
    const wavT = "wav/tracks";

    const app = document.getElementById('app');
    const audioCtx = createContext();
    const buffers = {};

    // 🎨 UI
    renderButtons(app, tracks, colors);

    // 📥 LOAD (paralelo 🔥)
    await Promise.all(
        tracks.map((track, i) => {
            const url = `${uri_assets}/${wavT}/${track.src}.wav`;
            return loadSound(audioCtx, buffers, i, url);
        })
    );

    // ⚡ WARMUP
    tracks.forEach((_, i) => warmUp(audioCtx, buffers, i));

    // 🔓 UNLOCK
    document.addEventListener('click', () => unlock(audioCtx), { once: true });

    // 🖱️ + ⌨️ EVENTS
    const play = (i) => playSound(audioCtx, buffers, i);

    bindClicks(tracks, play);
    bindKeyboard(tracks, play);
}

soundmidi();