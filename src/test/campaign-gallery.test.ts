import { describe, expect, it } from 'vitest';
import { galleryIndex, gallerySwipeDirection } from '@/lib/campaign-gallery';

describe('Campaign gallery navigation', () => {
  it('wraps from the last summary slide to the first photo and back', () => {
    expect(galleryIndex(4, 1, 5)).toBe(0);
    expect(galleryIndex(0, -1, 5)).toBe(4);
  });
  it('does not treat a vertical scroll or a short gesture as a photo change', () => {
    expect(gallerySwipeDirection({ x: 0, y: 0 }, { x: 23, y: 40 })).toBe(0);
    expect(gallerySwipeDirection({ x: 0, y: 0 }, { x: 22, y: 0 })).toBe(0);
  });
  it('moves only for horizontal-dominant swipes exceeding 22 pixels', () => {
    expect(gallerySwipeDirection({ x: 40, y: 0 }, { x: 0, y: 10 })).toBe(1);
    expect(gallerySwipeDirection({ x: 0, y: 0 }, { x: 23, y: 10 })).toBe(-1);
  });
});