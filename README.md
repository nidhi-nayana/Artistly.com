# Artistly.com

A modern, AI-powered platform for artists, built with Next.js, Genkit AI, Firebase, and Tailwind CSS. Artistly.com provides tools for artist onboarding, profile management, and more, with a beautiful, responsive UI.

## Features
- Artist onboarding and profile management
- AI-powered artist bio enhancement (via Genkit)
- Dashboard and data tables
- Advanced UI components (Radix UI, custom components)
- Theming and dark mode support
- Built with Next.js App Router
- Tailwind CSS for rapid UI development

## Tech Stack
- **Next.js** 15
- **React** 18
- **TypeScript**
- **Tailwind CSS**
- **Genkit AI** (Google AI integration)
- **Firebase**
- **Radix UI** components
- **Zod** (schema validation)

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm (comes with Node.js)

### Installation
```bash
npm install
```

### Development
Start the development server:
```bash
npm run dev
```
The app will be available at [http://localhost:9002](http://localhost:9002).

#### Genkit AI Dev Server
To start the Genkit AI development server:
```bash
npm run genkit:dev
```
Or with file watching:
```bash
npm run genkit:watch
```

### Build for Production
```bash
npm run build
npm start
```

### Linting & Type Checking
```bash
npm run lint
npm run typecheck
```

## Project Structure
```
src/
  ai/           # Genkit AI flows and config
  app/          # Next.js app directory (pages, routes, layouts)
  components/   # Reusable UI and layout components
  hooks/        # Custom React hooks
  lib/          # Utilities, types, and data helpers
```

## Notable Files
- `src/app/page.tsx` — Main landing page
- `src/app/artists/` — Artist-related pages and components
- `src/app/dashboard/` — Dashboard and data table
- `src/app/onboarding/` — Artist onboarding flow
- `src/ai/flows/` — AI-powered features (e.g., enhance-artist-bio)

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)
