# DescartesLaw

A tool to measure Descartes's Law for optical systems. This application utilizes React, TypeScript, and Tailwind CSS to provide a visually engaging and interactive experience for understanding the principles of optics.

## Key Features & Benefits

- **Interactive Simulation:** Visually demonstrate how light rays behave when passing through different mediums.
- **Real-time Calculations:** Automatically calculates angles of incidence and refraction based on user-adjustable parameters.
- **User-Friendly Interface:** Intuitive design built with React and Tailwind CSS for a seamless user experience.
- **Educational Tool:** Ideal for students, educators, and anyone interested in exploring the fundamentals of optics.

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

- **Node.js:** Version 18 or higher is recommended.  Download from [nodejs.org](https://nodejs.org/).
- **npm:**  Node Package Manager (usually installed with Node.js).
- **Git:** For version control and cloning the repository. Download from [git-scm.com](https://git-scm.com/).

## Installation & Setup Instructions

Follow these steps to get the project up and running:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/enigma505-5/DescartesLaw.git
   cd DescartesLaw
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   This will start the application in development mode, usually accessible at `http://localhost:5173`.

## Usage Examples

Once the application is running, you can:

- Adjust the angle of incidence of the light ray.
- Modify the refractive indices of the two mediums.
- Observe the resulting angle of refraction and the path of the light ray.

## Configuration Options

The application's configuration can be adjusted through environment variables (not currently implemented) and within the React components themselves. For example, the default refractive indices can be modified directly in the component code.

## Project Structure

```
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── src/
    ├── App.css
    ├── App.tsx
    └── components/
        ├── layout.tsx
        └── ui/
            ├── badge.tsx
            ├── button.tsx
            ├── landingconte nt.tsx
            ├── lightrays.tsx
            ├── navbar.tsx
    ├── index.css
    ├── main.tsx
    └── pages/
```

- **`src/`:** Contains the main source code for the application.
- **`src/App.tsx`:** The main application component.
- **`src/components/`:** Houses reusable UI components.
- **`index.html`:** The main HTML entry point.
- **`package.json`:** Contains project metadata and dependencies.

## Contributing Guidelines

We welcome contributions to improve DescartesLaw!, wait until this option is available.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License Information

License not specified. All rights reserved to the owner.

## Acknowledgments

- This project utilizes the following open-source libraries:
    - React
    - TypeScript
    - Tailwind CSS
    - OGL

```
