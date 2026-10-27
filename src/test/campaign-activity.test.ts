import { describe, expect, it } from 'vitest';
import { visibleSupport } from '@/lib/campaign-activity';

// Test-only records: never imported by routes, payments or analytics.
const demoMessages = (count: number) => Array.from({ length: count }, (_, index) => ({ name: `TEST supporter ${index + 1}`, message: 'TEST DATA — supportive message for layout verification only.' }));

describe('Isolated high-activity support scenarios', () => {
  it.each([10, 30, 100])('paginates %i test records without duplication or source mutation', count => {
    const records = demoMessages(count);
    expect(visibleSupport(records, 1)).toHaveLength(6);
    const all = visibleSupport(records, Math.ceil(count / 6));
    expect(all).toHaveLength(count);
    expect(new Set(all.map(record => record.name)).size).toBe(count);
    expect(records).toHaveLength(count);
    expect(visibleSupport(records, 1)).toEqual(records.slice(0, 6));
  });
  it('keeps absent support records empty', () => { expect(visibleSupport([], 100)).toEqual([]); });
  it('contains invalid page inputs', () => { expect(visibleSupport(demoMessages(10), NaN)).toHaveLength(6); expect(visibleSupport(demoMessages(10), -3)).toHaveLength(6); });
});