import { describe, expect, it } from 'vitest';
import { formatPrice, formatPercentageChange } from './format';

describe('formatPrice', () => {
  it('should format price with default 2 decimals', () => {
    expect(formatPrice(100)).toBe('$100.00');
    expect(formatPrice(1234.56)).toBe('$1,234.56');
    expect(formatPrice(0.99)).toBe('$0.99');
  });

  it('should format price with custom decimals', () => {
    expect(formatPrice(100, 0)).toBe('$100');
    expect(formatPrice(1234.567, 3)).toBe('$1,234.567');
    expect(formatPrice(0.1234, 4)).toBe('$0.1234');
    expect(formatPrice(0.001, 6)).toBe('$0.001000');
  });

  it('should format large numbers with commas', () => {
    expect(formatPrice(1000000)).toBe('$1,000,000.00');
    expect(formatPrice(1234567.89)).toBe('$1,234,567.89');
  });

  it('should format small prices correctly', () => {
    expect(formatPrice(0.01, 2)).toBe('$0.01');
    expect(formatPrice(0.001, 4)).toBe('$0.0010');
  });

  it('should format zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
    expect(formatPrice(0, 0)).toBe('$0');
  });
});

describe('formatPercentageChange', () => {
  it('should format positive percentage with plus sign', () => {
    expect(formatPercentageChange(1.5)).toBe('+1.50%');
    expect(formatPercentageChange(0.7)).toBe('+0.70%');
    expect(formatPercentageChange(100)).toBe('+100.00%');
  });

  it('should format negative percentage without plus sign', () => {
    expect(formatPercentageChange(-1.5)).toBe('-1.50%');
    expect(formatPercentageChange(-0.5)).toBe('-0.50%');
    expect(formatPercentageChange(-100)).toBe('-100.00%');
  });

  it('should format zero percentage', () => {
    expect(formatPercentageChange(0)).toBe('+0.00%');
  });

  it('should format decimal percentages correctly', () => {
    expect(formatPercentageChange(0.01)).toBe('+0.01%');
    expect(formatPercentageChange(-0.01)).toBe('-0.01%');
    expect(formatPercentageChange(0.123)).toBe('+0.12%');
    expect(formatPercentageChange(-0.456)).toBe('-0.46%');
  });
});
