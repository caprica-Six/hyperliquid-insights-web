# Hyperliquid Insights

A modern web application for visualizing and analyzing Hyperliquid market data. This project provides an intuitive dashboard interface for exploring crypto market insights.

## Tech Stack

### Core Framework

- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type-safe JavaScript

### UI & Styling

- **shadcn/ui** - Modern component library built on Radix UI
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component primitives
  - Dialog, Dropdown Menu, Separator, Tabs, Tooltip
- **Lucide React** - Icon library
- **next-themes** - Theme switching (light/dark mode)

### State Management & Data Fetching

- **TanStack Query (React Query) 5.90** - Server state management
- **class-variance-authority** - Component variant management

### Charting & Visualization

- **Recharts 3.6** - Composable charting library

### Development Tools

- **Vitest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Testing Library** - Component testing utilities

### Migration Notes

This project was upgraded from **ChakraUI** to the modern stack of **Next.js 16** with **shadcn/ui** components, providing:

- Better performance with React Server Components
- More flexible styling with Tailwind CSS
- Improved accessibility with Radix UI primitives
- Type-safe component APIs
- Better developer experience with modern tooling

## UI Layout

```
┌─────────────────────────────────────────────────────────────┐
│                        Header (Sticky)                       │
│  [☰] Hyperliquid Insights  [🌙] [Home] [Market Data]        │
├──────────┬──────────────────────────────────────────────────┤
│          │                                                   │
│          │                                                   │
│ Sidebar  │           Main Content Area                       │
│          │           (SidebarInset)                          │
│ MARKETS  │                                                   │
│  • 📊    │           Page Content                            │
│ Dashboard│                                                   │
│  • 📈    │           (Dynamic content based on route)        │
│ Markets  │                                                   │
│          │                                                   │
│ Footer   │                                                   │
│ (footer) │                                                   │
└──────────┴──────────────────────────────────────────────────┘
```

### Layout Components

- **Header**: Sticky navigation bar with sidebar trigger, logo, and navigation links
- **Sidebar**: Collapsible navigation panel with market sections
- **SidebarInset**: Main content area that adjusts based on sidebar state
- **Footer**: Application footer

## Project Structure

```
hyperliquid-insights-web/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── page.test.tsx            # Home page tests
│   ├── markets/
│   │   └── page.tsx             # Markets page
│   ├── globals.css              # Global styles & Tailwind
│   └── favicon.ico              # App icon
│
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   └── tooltip.tsx
│   ├── charts/                  # Chart components
│   │   └── index.ts
│   ├── AppSidebar.tsx           # Main sidebar component
│   ├── Header.tsx               # Navigation header
│   ├── Footer.tsx               # Footer component
│   ├── PageLayout.tsx           # Page layout wrapper
│   ├── PageTitle.tsx            # Page title component
│   ├── ThemeProvider.tsx        # Theme context provider
│   └── ThemeToggle.tsx          # Dark/light mode toggle
│
├── lib/                         # Utility libraries
│   ├── utils.ts                 # Utility functions (cn, etc.)
│   ├── format.ts                # Formatting utilities
│   └── mock-data/               # Mock data for development
│       ├── index.ts
│       └── markets.ts
│
├── hooks/                       # Custom React hooks
│   └── use-mobile.ts            # Mobile detection hook
│
├── public/                      # Static assets
│   └── *.svg                    # SVG icons
│
├── coverage/                    # Test coverage reports
├── constants.ts                 # Application constants
├── components.json              # shadcn/ui configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── vitest.config.ts             # Vitest configuration
├── eslint.config.mjs            # ESLint configuration
└── package.json                 # Dependencies & scripts
```

### Key Directories

- **`app/`**: Next.js 16 App Router pages and layouts
- **`components/ui/`**: shadcn/ui component library
- **`components/`**: Application-specific components
- **`lib/`**: Shared utilities and helpers
- **`hooks/`**: Custom React hooks
- **`public/`**: Static assets served at the root

## Development

### Prerequisites

- Node.js 20+
- npm or yarn

### Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
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

## Features

- 📊 Market data visualization
- 🎨 Modern UI with shadcn/ui components
- 🌙 Dark/light theme support
- 📱 Responsive design
- ♿ Accessible components (Radix UI)
- ⚡ Fast performance with Next.js 16
- 🔧 Type-safe with TypeScript

## Attribution

This project is an independent reimplementation inspired by
[thunderhead-labs/hyperliquid-stats-web](https://github.com/thunderhead-labs/hyperliquid-stats-web),
which is licensed under the MIT License.

This repository does not claim to be official or affiliated.
