# VIN Decoder

A single-page application for decoding Vehicle Identification Numbers (VINs) using the public [NHTSA API](https://vpic.nhtsa.dot.gov/api/). Enter any 17-character VIN to get a breakdown of the vehicle's manufacturer, model year, plant, and other specifications. The app also provides a browsable reference of all available vehicle variables.

## Features

- VIN decoding with inline validation (length, character set)
- Results table showing only populated variables
- Last 3 decoded VINs saved in localStorage — click to re-run
- Full list of NHTSA vehicle variables with descriptions
- Variable detail view
- Dark mode support
- Responsive layout (420px – 1440px)

## Tech stack

- [React 19](https://react.dev/)
- [React Router v6](https://reactrouter.com/)
- [TanStack Query v5](https://tanstack.com/query)
- [NHTSA Vehicle API](https://vpic.nhtsa.dot.gov/api/)
- TypeScript + Vite

## Local setup

**Requirements:** Node.js 18+

```bash
# 1. Clone the repository
git clone <repo-url>
cd vin-decoder

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Other commands

```bash
npm run build    # production build (type-checks first)
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## Project structure

```
src/
├── api/
│   └── nhtsa.ts          # NHTSA fetch functions and types
├── components/
│   ├── Layout.tsx         # Nav bar and page wrapper
│   └── VinForm.tsx        # VIN input with validation
├── hooks/
│   └── useVinHistory.ts   # localStorage hook for recent VINs
├── pages/
│   ├── Home.tsx           # / — decode form and results
│   ├── Variables.tsx      # /variables — variable list
│   └── VariableDetail.tsx # /variables/:id — variable detail
├── App.tsx                # Route definitions
├── main.tsx               # App entry point
└── index.css              # Global styles
```
