export default function playSound(workletNode, index) {
    workletNode.port.postMessage({
        type: 'play',
        data: { id: index }
    });
}