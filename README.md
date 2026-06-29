# Satya Thakur - Software Engineer Portfolio

An interactive, high-performance developer portfolio built with a modern full-stack architecture. This website showcases my projects, skills, experience, and education through fully responsive 3D interactive interfaces and an intelligent command-line assistant.

---

## 🎨 Immersive Features

### 1. Interactive 3D Skills Cube
* **Dynamic Navigation**: An elegant, rotating 3D cube rendered purely in HTML/CSS and GSAP. 
* **Seamless Interaction**: Grab, drag, and spin the cube to interactively inspect different facets: **About**, **Projects**, **Technical Stack**, **Work Experience**, **Education**, and **Highlights**.
* **Modern Aesthetic**: Styled with a high-contrast obsidian slate color palette and elegant gold accent highlights.

### 2. 3D Project Carousel
* **Stunning Visual Deck**: An interactive 3D card layout featuring a fluid mouse-move tilt effect.
* **Featured Projects**: Highlights engineering masterpieces with live taglines, metrics, detailed breakdowns, and direct repository links.

### 3. Integrated AI Terminal Agent
* **Local Emulator**: A retro terminal interface backed by an Express server and local parsing logic.
* **Smart Responses**: Provides fast, pre-programmed resume and portfolio answers for biography, skills, and availability.
* **Local Terminal Fallback**: Implements high-speed local parsing for key terms (e.g., `bio`, `projects`, `contact`) without any external SDK requirement.

---

## 🛠️ Tech Stack

* **Frontend**:
  * **React 19** & **TypeScript** (strictly typed)
  * **Vite** (ultra-fast module bundling)
  * **Tailwind CSS v4** (modern utility-first layout engine)
  * **GSAP** (smooth timeline physics and 3D dragging)
  * **Motion** (fluid react route & enter-viewport transitions)
  * **Lucide React** (pixel-perfect iconography)

* **Backend**:
  * **Node.js** & **Express** (API routing & static asset hosting)
  * **TSX** (TypeScript Execute for zero-compilation server execution in dev)
  * **Esbuild** (compiles server-side code to highly optimized bundled CommonJS)
  * **Local AI Parsing** (secure, server-side resume and portfolio response routing)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
* **Node.js** (version 18 or higher recommended)
* **npm** (version 9 or higher)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SdThakur/portfolio.git
   cd portfolio
   ```

2. **Install node dependencies**:
   ```bash
   npm install
   ```

3. **Configure the AI Terminal (Optional)**:
   The terminal uses local parsing and resume content without requiring an external API key.

---

## 💻 Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the application in development mode. The Express server boots using `tsx` on `http://localhost:3000` with the Vite asset middleware active.

### `npm run build`
Compiles both the frontend static assets and the server-side controller:
* Vite compiles client code into static files in `dist/`.
* Esbuild bundles `server.ts` into a self-contained production bundle at `dist/server.cjs`.

### `npm run start`
Launches the compiled production build in a standalone Node environment:
```bash
node dist/server.cjs
```

### `npm run lint`
Validates type-safety and syntax using TypeScript (`tsc --noEmit`).

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).
