const gradients = [
    'linear-gradient(135deg, #6C5CE7, #FF6B6B)',
    'linear-gradient(135deg, #FF6B6B, #FFC857)',
    'linear-gradient(135deg, #3FBFB5, #6C5CE7)',
    'linear-gradient(135deg, #FFC857, #3FBFB5)',
];

export function getPlaceholderStyle(seed) {
    const index = seed ? seed.charCodeAt(0) % gradients.length : 0;
    return { background: gradients[index] };
}