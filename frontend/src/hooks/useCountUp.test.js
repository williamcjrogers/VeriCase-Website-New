import { parseStat, formatStat } from './useCountUp';

describe('useCountUp utilities', () => {
  describe('parseStat', () => {
    it('parses numbers with commas', () => {
      const parsed = parseStat('2,264');
      expect(parsed.target).toBe(2264);
      expect(parsed.decimals).toBe(0);
      expect(parsed.useGrouping).toBe(true);
      expect(parsed.suffix).toBe('');
      expect(parsed.prefix).toBe('');
    });

    it('parses decimal percentages', () => {
      const parsed = parseStat('33.4%');
      expect(parsed.target).toBe(33.4);
      expect(parsed.decimals).toBe(1);
      expect(parsed.useGrouping).toBe(false);
      expect(parsed.suffix).toBe('%');
    });

    it('parses whole percentages', () => {
      const parsed = parseStat('72%');
      expect(parsed.target).toBe(72);
      expect(parsed.decimals).toBe(0);
      expect(parsed.suffix).toBe('%');
    });

    it('parses negative numbers with decimals and percentage', () => {
      const parsed = parseStat('-42.8%');
      expect(parsed.target).toBe(42.8);
      expect(parsed.decimals).toBe(1);
      expect(parsed.prefix).toBe('-');
      expect(parsed.suffix).toBe('%');
    });

    it('parses large figures with labels', () => {
      const parsed = parseStat('8 EXHIBITS');
      expect(parsed.target).toBe(8);
      expect(parsed.decimals).toBe(0);
      expect(parsed.suffix).toBe(' EXHIBITS');
    });

    it('handles raw numeric inputs', () => {
      const parsed = parseStat(50000);
      expect(parsed.target).toBe(50000);
      expect(parsed.decimals).toBe(0);
    });
  });

  describe('formatStat', () => {
    it('formats numbers with commas', () => {
      const parsed = parseStat('2,264');
      expect(formatStat(2264, parsed)).toBe('2,264');
      expect(formatStat(0, parsed)).toBe('0');
      expect(formatStat(1500, parsed)).toBe('1,500');
    });

    it('formats decimal percentages', () => {
      const parsed = parseStat('33.4%');
      expect(formatStat(33.4, parsed)).toBe('33.4%');
      expect(formatStat(0, parsed)).toBe('0.0%');
      expect(formatStat(12.35, parsed)).toBe('12.4%');
    });

    it('formats negative percentages', () => {
      const parsed = parseStat('-42.8%');
      expect(formatStat(42.8, parsed)).toBe('-42.8%');
      expect(formatStat(0, parsed)).toBe('-0.0%');
    });

    it('formats labels', () => {
      const parsed = parseStat('8 EXHIBITS');
      expect(formatStat(8, parsed)).toBe('8 EXHIBITS');
      expect(formatStat(0, parsed)).toBe('0 EXHIBITS');
    });
  });
});
