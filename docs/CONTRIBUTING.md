# 🤝 Contributing

This document outlines the development setup, code style guidelines, and contribution workflow for Hyperliquid Insights.

## Development Setup

### Prerequisites

- Node.js 20+
- npm or yarn

### Getting Started

```bash
# Clone the repository
git clone https://github.com/caprica-Six/hyperliquid-insights-web.git
cd hyperliquid-insights-web

# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Run development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run verify` - Runs lint, format, build and test

## Code Style

### TypeScript

- Use TypeScript for all new code
- Enable strict mode settings
- Use explicit types for function parameters and return values
- Avoid `any` type; use `unknown` when necessary

### React

- Use functional components with hooks
- Prefer Server Components when possible (Next.js 16)
- Use meaningful component and prop names
- Keep components small and focused

### Styling

- Use Tailwind CSS classes
- Follow component variant patterns with `class-variance-authority`
- Maintain consistent spacing and typography

### File Organization

- Group related components in folders
- Use index files for clean imports
- Keep utility functions in `/lib/`
- Place types in `/types/`

## Commit Guidelines

- Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`
- Keep commits focused and atomic
- Write clear commit messages

## Pull Request Workflow

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Make** your changes with tests
4. **Run** tests and linting: `npm run verify`
5. **Commit** your changes
6. **Push** to your fork
7. **Create** a Pull Request with:
   - Clear title and description
   - Reference any related issues
   - Include screenshots for UI changes

### PR Requirements

- ✅ All tests pass
- ✅ Code is linted and formatted
- ✅ TypeScript compilation succeeds
- ✅ No console errors or warnings
- ✅ Documentation updated if needed

## Code Review Process

- At least one maintainer review required
- Address all review comments
- Maintainers will merge approved PRs

## Issue Reporting

- Use GitHub Issues for bugs and feature requests
- Provide clear reproduction steps
- Include browser/OS information
- Attach screenshots for UI issues

## Related Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - System design and structure
- [TESTING.md](TESTING.md) - Testing guidelines and commands
- [API_REFERENCE.md](API_REFERENCE.md) - API integration details
