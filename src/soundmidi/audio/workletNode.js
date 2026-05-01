export default async function createWorklet(audioCtx) {

    // 🔥 código do processor inline
    const processorCode = `
    class SamplerProcessor extends AudioWorkletProcessor {

        constructor() {
            super();
            this.samples = {};
            this.playQueue = [];

            this.port.onmessage = (event) => {
                const { type, data } = event.data;

                if (type === 'load') {
                    this.samples[data.id] = data.buffer;
                }

                if (type === 'play') {
                    this.playQueue.push({
                        id: data.id,
                        pos: 0
                    });
                }
            };
        }

        process(inputs, outputs) {
            const output = outputs[0];

            for (let channel = 0; channel < output.length; channel++) {
                const channelData = output[channel];

                for (let i = 0; i < channelData.length; i++) {
                    let sampleValue = 0;

                    for (let j = this.playQueue.length - 1; j >= 0; j--) {
                        const item = this.playQueue[j];
                        const buffer = this.samples[item.id];

                        if (!buffer) continue;

                        if (item.pos < buffer.length) {
                            sampleValue += buffer[item.pos++];
                        } else {
                            this.playQueue.splice(j, 1);
                        }
                    }

                    channelData[i] = sampleValue;
                }
            }

            return true;
        }
    }

    registerProcessor('sampler-processor', SamplerProcessor);
    `;

    // 🔥 cria blob (100% navegador)
    const blob = new Blob([processorCode], { type: 'application/javascript' });
    const blobURL = URL.createObjectURL(blob);

    // 🔥 carrega worklet
    await audioCtx.audioWorklet.addModule(blobURL);

    const node = new AudioWorkletNode(audioCtx, 'sampler-processor');

    node.connect(audioCtx.destination);

    return node;
}