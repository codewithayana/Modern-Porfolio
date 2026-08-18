# Modern Developer Portfolio

A high-performance, modern developer portfolio built with React 19, Vite, and TypeScript. This portfolio features a highly interactive and cinematic user experience, blending 3D web graphics, smooth animations, and a sleek cyberpunk/synthwave aesthetic.

## 🚀 Features

- **Cinematic 3D Intro**: Immersive landing sequence using Three.js and React Three Fiber with a glitch-style name reveal and an infinite grid background.
- **Smooth Scrolling**: Butter-smooth scrolling experience powered by Lenis.
- **Advanced Animations**: Complex, scroll-linked animations and page transitions using GSAP and Framer Motion.
- **Dynamic Projects Section**: A horizontal scrollable gallery showcasing recent work with interactive cards and live demo links.
- **Dark/Light Theme**: Full aesthetic synchronization across light and dark modes, featuring custom color palettes.
- **Responsive Design**: Flawlessly adapts across all device sizes from mobile phones to ultra-wide desktop monitors using Tailwind CSS.
- **Interactive Footer**: Sophisticated 3D tilt interaction effect.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) (v19) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **3D Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction), [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations**: [GSAP](https://gsap.com/), [Framer Motion](https://www.framer.com/motion/), [Lottie Web](https://airbnb.io/lottie/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/), [Lucide React](https://lucide.dev/)

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate into the project directory:
   ```bash
   cd Modern-Porfolio
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
   *(or use `yarn install` / `pnpm install` depending on your package manager)*

## 🏃‍♂️ Running Locally

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 🏗️ Building for Production

To create an optimized production build:

```bash
npm run build
```

You can preview the built files locally with:

```bash
npm run preview
```

## 📝 Code Quality

This project uses ESLint and Prettier for code quality and formatting.

- To check for linting errors: `npm run lint`
- To fix linting errors automatically: `npm run lint:fix`
- To format the codebase: `npm run format`
- To verify formatting: `npm run format:check`

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
