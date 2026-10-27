/** Keep vertical scrolling independent of horizontal gallery navigation. */
export function gallerySwipeDirection(start: { x: number; y: number }, end: { x: number; y: number }) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  if (Math.abs(dx) <= 22 || Math.abs(dx) <= Math.abs(dy)) return 0;
  return dx < 0 ? 1 : -1;
}

export function galleryIndex(index: number, delta: number, length: number) {
  if (length <= 0) return 0;
  return ((index + delta) % length + length) % length;
}