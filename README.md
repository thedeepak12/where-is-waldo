# Where's Waldo?

A full-stack, interactive "Where's Waldo" style photo tagging application. Challenge yourself to find iconic characters in a dense, detailed scene with real-time backend validation and a competitive leaderboard.

## Features

- **Interactive Photo Tagging**: Precision-based character selection with custom targeting UI.
- **Real-time Validation**: Secure backend coordinate checking.
- **Dynamic Feedback**: Instant visual confirmation when a character is found.
- **Global Leaderboard**: Track your time and compete with players worldwide.
- **Responsive Design**: Optimized for a premium desktop experience.

## How to Play

1. **Scan the Scene**: Search the detailed image for Waldo, Wilma, the Wizard, and Odlaw.
2. **Spot & Click**: Once located, click directly on the character.
3. **Identify**: Select the character's name from the context menu to validate.
4. **Race the Clock**: Find all four as fast as possible to secure your spot on the leaderboard!

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM

## Architecture

The application focuses on a secure validation flow:
1. **Client**: Captures click coordinates relative to the image size (percentage-based).
2. **Backend**: Receives the character name and coordinates via a secure API route.
3. **Validation**: Drizzle queries the database for character locations. The backend applies a "hit-box" tolerance to account for variations in click precision.
4. **State Management**: Once validated, the character is locked in the "found" state across the UI.

## Getting Started

### Prerequisites

- Node.js (Latest LTS)
- pnpm (Recommended)
- A PostgreSQL database

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/thedeepak12/where-is-waldo.git
   cd where-is-waldo
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgres://user:password@host:port/dbname
   ```

4. **Database Migration**:
   ```bash
   pnpm drizzle-kit push
   ```

5. **Run Development Server**:
   ```bash
   pnpm dev
   ```

## Project Structure

```text
├── drizzle/            # Database migrations and schemas
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router
│   ├── components/     # Reusable UI components
│   └── db/             # Database connection and schema definitions
└── package.json        # Dependencies and scripts
```

## Acknowledgments

- Credit to Martin Handford, the creator of the original "Where's Wally?" series of puzzle books.
