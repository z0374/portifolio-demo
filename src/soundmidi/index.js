import tracks from './config/tracks.js';
import colors from './config/colors.js';

import createContext from './audio/createContext.js';
import loadSound from './audio/loadSound.js';
import playSound from './audio/playSound.js';
import warmUp from './audio/warmUp.js';
import unlock from './audio/unlock.js';

import renderButtons from './ui/renderButtons.js';
import bindClicks from './ui/bindClicks.js';
import bindKeyboard from './ui/bindKeyboard.js';

async function soundmidi() {

    const uri_assets = "https://assets.victormacedo.dev.br";
    const wavT = "wav/tracks";

    const app = document.getElementById('app');
    const audioCtx = createContext();
    const buffers = {};

    // UI
    renderButtons(app, tracks, colors);

    // LOAD
    for (let i = 0; i < tracks.length; i++) {
        const url = `${uri_assets}/${wavT}/${tracks[i].src}.wav`;
        await loadSound(audioCtx, buffers, i, url);
    }

    // WARMUP
    for (let i = 0; i < tracks.length; i++) {
        warmUp(audioCtx, buffers, i);
    }

    // UNLOCK
    document.addEventListener('click', () => unlock(audioCtx), { once: true });

    // EVENTS
    bindClicks(tracks, (i) => playSound(audioCtx, buffers, i));
    bindKeyboard(tracks, (i) => playSound(audioCtx, buffers, i));
}

soundmidi();