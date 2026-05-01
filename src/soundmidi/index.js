// 🔥 dispara downloads em paralelo imediatamente
const preloadModules = [
    import('@audio/loadSound.js'),
    import('@audio/cache.js'),
    import('@audio/playSound.js'),
    import('@audio/warmUp.js'),
    import('@audio/unlock.js'),
    import('@audio/createContext.js'),
    import('@ui/renderButtons.js'),
    import('@ui/bindClicks.js'),
    import('@ui/bindKeyboard.js'),
    import('@config/tracks.js'),
    import('@config/colors.js')
];

// 👇 aguarda tudo carregar junto
const [
    { default: loadSound },
    cacheModule,
    { default: playSound },
    { default: warmUp },
    { default: unlock },
    { default: createContext },
    { default: renderButtons },
    { default: bindClicks },
    { default: bindKeyboard },
    { default: tracks },
    { default: colors }
] = await Promise.all(preloadModules);


// 🚀 APP
function soundmidi() {

    const uri_assets = "https://assets.victormacedo.dev.br";
    const wavT = "wav/tracks";

    const app = document.getElementById('app');
    const { audioCtx, masterGain } = createContext();
    const buffers = {};

    renderButtons(app, tracks);

    document.addEventListener('click', () => unlock(audioCtx), { once: true });

    const play = (i) => {
        if (!buffers[i]) return;
        playSound(audioCtx, buffers, i);
    };

    bindClicks(tracks, play);
    bindKeyboard(tracks, play);

    // 🔥 load assíncrono (sem bloquear)
    tracks.forEach((track, i) => {
        const url = `${uri_assets}/${wavT}/${track.src}.wav`;

        loadSound(audioCtx, buffers, i, url)
            .then(() => {
                const btn = document.getElementById(`b${i}`);
                btn.disabled = false;
                btn.classList.remove('loading');
                btn.classList.add('ready');
                btn.style.background = colors[i];

                warmUp(audioCtx, buffers, i);
            });
    });
}

soundmidi();