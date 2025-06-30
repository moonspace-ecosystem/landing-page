# Moonspace - Financial Intelligence Platform

A landing page for Moonspace, an AI-powered platform that automatically converts Australian corporate financial reports to IFRS and US GAAP standards.

## Tech Stack

- **BunJS** - JavaScript runtime and toolkit
- **ReactJS** - UI library
- **Effect.website** - Functional programming library for handling side effects
- **TailwindCSS** - Utility-first CSS framework
- **TypeScript** - Type safety

## Prerequisites

- [Bun](https://bun.sh/) installed on your machine

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/moonspace-landing.git
cd moonspace-landing
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser to see the application.

## Building for Production

```bash
bun run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
moonspace/
├── src/
│   ├── config/
│   │   └── appConfig.ts       # Application configuration
│   ├── components/            # React components
│   ├── effects/               # Effect-based side effects
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   ├── App.tsx                # Main App component
│   └── main.tsx               # Entry point
├── public/                    # Static assets
├── index.html                 # HTML template
└── package.json               # Project dependencies and scripts
```

## Key Features

- **Functional Programming** with Effect.website for managing side effects
- **Type Safety** with TypeScript
- **Performance** with BunJS
- **Responsive Design** with TailwindCSS
- **Component-Based Architecture** with React

## Environment Variables

In a production environment, you should set up environment variables for sensitive configuration. The application is designed to read configuration from environment variables with fallbacks to the default values.

## License

[MIT](LICENSE)
