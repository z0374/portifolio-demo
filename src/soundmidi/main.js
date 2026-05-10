import tracks from "@config/tracks.js";
import colors from "@config/colors.js";

import createContext from "@audio/createContext.js";
import createWorklet from "@audio/workletNode.js";
import loadSound from "@audio/loadSound.js";
import playSound from "@audio/playSound.js";
import unlock from "@audio/unlock.js";

import renderButtons from "@ui/renderButtons.js";
import bindClicks from "@ui/bindClicks.js";
import bindKeyboard from "@ui/bindKeyboard.js";

async function soundmidi() {
  const uri_assets = "https://assets.victormacedo.dev.br";
  const wavT = "wav/tracks";

  const app = document.getElementById("app");

  const audioCtx = createContext();
  const workletNode = await createWorklet(audioCtx);

  renderButtons(app, tracks);

  document.addEventListener("pointerdown", () => unlock(audioCtx), {
    once: true,
  });

  const play = (i) => playSound(workletNode, i);

  bindClicks(tracks, play);
  bindKeyboard(tracks, play);

  tracks.forEach((track, i) => {
    const url = `${uri_assets}/${wavT}/${track.src}.wav`;

    loadSound(audioCtx, workletNode, i, url).then(() => {
      const btn = document.getElementById(`b${i}`);

      btn.disabled = false;
      btn.classList.remove("loading");
      btn.style.background = colors[i];
    });
  });
}

soundmidi();
