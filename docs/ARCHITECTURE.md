# 🏗️ Architecture

This document describes the system design, data flow, UI layout, project structure, and the migration from ChakraUI to the modern stack.

## System Design

Hyperliquid Insights is built with a modern, scalable architecture using Next.js 16 App Router and Server Components for optimal performance. The application follows a component-driven design with clear separation of concerns.

### Data Flow

```
User Request → Next.js Server Component → API Function → CoinGecko API
                                      ↓ (on failure)
                                      → Mock Data Fallback
                                      ↓
                                      → Render Component
```

- **Server Components**: Handle data fetching and initial rendering
- **Client Components**: Interactive features (charts, theme toggle)
- **API Layer**: Centralized in `/lib/api/` with error handling
- **Fallback System**: Automatic mock data when API fails

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
│   ├── api/                     # API integration layer
│   │   └── coingecko.ts         # CoinGecko API functions
│   ├── utils.ts                 # Utility functions (cn, etc.)
│   ├── format.ts                # Formatting utilities
│   └── mock-data/               # Mock data for fallback/development
│       ├── index.ts
│       ├── markets.ts           # Market data for homepage cards
│       ├── coin-details.ts      # Detailed coin information
│       └── markets-table.ts     # Market data for table (25 items)
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

## Migration: ChakraUI → Modern Stack

This project was upgraded from **ChakraUI** to the modern stack of **Next.js 16** with **shadcn/ui** components, providing:

- Better performance with React Server Components
- More flexible styling with Tailwind CSS
- Improved accessibility with Radix UI primitives
- Type-safe component APIs
- Better developer experience with modern tooling

### Migration Benefits

✅ **Performance**: Server Components reduce bundle size and improve loading times  
✅ **Accessibility**: Radix UI primitives ensure WCAG compliance  
✅ **Developer Experience**: TypeScript integration and modern tooling  
✅ **Maintainability**: Component-driven architecture with clear separation of concerns  
✅ **Scalability**: Modular design supports easy feature additions

## Related Documentation

- [API_REFERENCE.md](API_REFERENCE.md) - API functions and integration
- [CONTRIBUTING.md](CONTRIBUTING.md) - Development setup and workflow
