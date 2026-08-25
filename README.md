# Hangman-Game-Platform

A full-stack Hangman game platform with a robust Spring Boot backend, PostgreSQL database, and a React frontend.

## Dependencies
- Java 17+
- Node.js 18+
- Docker and Docker Compose

## Installation
To install the frontend dependencies, simply run:
```bash
npm install
```
*(This command will use the root `package.json` to install the frontend dependencies.)*

## Build
To build the frontend and the backend applications, run:
```bash
npm run build
```

## Run
To start the entire application stack (Database, Backend, and Frontend), run:
```bash
npm run start
```
Alternatively, for active frontend development, you can run:
```bash
npm run dev
```

## Usage
Once the application is running, navigate to `http://localhost:5173` to play the Hangman game. The interface provides a classic look with dynamic dictionary clues.
