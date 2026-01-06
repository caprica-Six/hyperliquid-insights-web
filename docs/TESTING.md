# 🧪 Testing

This document covers the testing setup, commands, examples, and coverage reporting for Hyperliquid Insights.

## Testing Framework

The project uses **Vitest** for fast, modern testing with **Testing Library** for component testing utilities.

### Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage

# Verify (run tests and coverage)
npm run verify
```

### Test Structure

Tests are located alongside components:

- `app/page.test.tsx` - Home page tests
- `lib/format.test.ts` - Utility function tests
- `components/OverviewCard.test.tsx` - Component tests

### Example Test

```typescript
// lib/format.test.ts
import { describe, it, expect } from 'vitest';
import { formatPrice, formatPercentage } from './format';

describe('formatPrice', () => {
  it('formats price with dollar sign', () => {
    expect(formatPrice(1234.56)).toBe('$1,234.56');
  });

  it('handles zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });
});

describe('formatPercentage', () => {
  it('formats positive percentage', () => {
    expect(formatPercentage(5.67)).toBe('+5.67%');
  });

  it('formats negative percentage', () => {
    expect(formatPercentage(-2.34)).toBe('-2.34%');
  });
});
```

### Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 85%
- **Lines**: > 80%

### Running Coverage

```bash
npm run test:coverage
```

Coverage reports are generated in the `coverage/` directory and include HTML reports for detailed analysis.

## Test Categories

- **Unit Tests**: Individual functions and utilities
- **Component Tests**: React component rendering and interactions
- **Integration Tests**: Page-level functionality

## Best Practices

- Use descriptive test names
- Test both success and error cases
- Mock external dependencies (API calls)
- Keep tests fast and isolated
- Use Testing Library queries for accessibility

## Related Documentation

- [CONTRIBUTING.md](CONTRIBUTING.md) - Development workflow and code style
- [ARCHITECTURE.md](ARCHITECTURE.md) - Project structure and organization
