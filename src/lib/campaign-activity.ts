export const SUPPORT_PAGE_SIZE = 6;

export function visibleSupport<T>(messages: readonly T[], page: number): T[] {
  const safePage = Number.isFinite(page) ? Math.max(1, Math.floor(page)) : 1;
  return messages.slice(0, safePage * SUPPORT_PAGE_SIZE);
}