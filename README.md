# Andalus Studio Management System

A Next.js application for running the Andalus Architecture studio: projects, clients,
operations, finance, tools, and analytics in one system. Built with Next.js (App Router),
TypeScript, and Tailwind CSS.

The full navigation shell (`src/lib/navigation.ts`) and Dashboard are functional; other
sections are stubbed out with their planned feature set until each module is built.
The Fee Calculator lives under **Tools & Intelligence → Calculators**.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project structure

- `src/lib/navigation.ts` — single source of truth for the sidebar and page metadata
- `src/components/AppShell.tsx`, `Sidebar.tsx`, `Topbar.tsx` — app chrome
- `src/app/page.tsx` — Dashboard (home)
- `src/app/[...slug]/page.tsx` — catch-all route rendering stub pages, or a custom
  page when one is registered in `CUSTOM_PAGES`
- `src/components/tools/FeeCalculatorPage.tsx` — the fee calculator

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
