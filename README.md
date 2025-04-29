# React Dashboard (Vite)

A modern React dashboard application built with Vite, React, TypeScript, and Ant Design. This project features a fixed sidebar with user details, a dashboard, and a blogs section with CRUD functionality, utilizing the JSONPlaceholder API for data.

## Features
- Sidebar with user profile fetched from `https://jsonplaceholder.typicode.com/users/{id}`.
- Two main routes: Dashboard and Blogs.
- Blogs page displaying a list of posts fetched from `https://jsonplaceholder.typicode.com/users/{id}/posts`.
- Clickable blog posts with Edit and Delete functionality (PUT and DELETE API calls).
- Responsive layout using Ant Design components and Styled-Components.

## Prerequisites
- Node.js (v16 or higher recommended)
- Yarn package manager

## Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/mdzakir/react-dashboard.git
   cd react-dashboard
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the root directory.
   - Add the following line:
     ```
     VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
     ```
   - This sets the base URL for API calls.

4. **Run the Application**
   ```bash
   yarn dev
   ```
   - Open your browser and navigate to `http://localhost:5173` (default Vite port).

5. **Build for Production**
   ```bash
   yarn build
   ```
   - This generates a production-ready build in the `dist` folder.
   - Serve the build locally with:
     ```bash
     yarn preview
     ```

## Testing
This project uses Vitest for unit testing.

1. **Run Tests**
   ```bash
   yarn test
   ```
   - Tests are located in the `__tests__` directory (or adjust based on your structure).

2. **Check Test Coverage**
   ```bash
   yarn test --coverage
   ```
   - This generates a coverage report in the `coverage` folder. Open `coverage/lcov-report/index.html` in a browser to view detailed coverage statistics.

## Project Structure
- `src/`: Contains source code.
  - `components/`: Reusable React components (e.g., Sidebar, BlogList).
  - `hooks/`: Custom hooks (e.g., for API calls).
  - `pages/`: Route-specific pages (e.g., Dashboard, Blogs).
  - `App.tsx`: Main application component.
  - `main.tsx`: Vite entry point.
- `vite.config.ts`: Vite configuration file.
- `tsconfig.json`: TypeScript configuration.
- `.env`: Environment variables.

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make changes and commit: `git commit -m "Add new feature"`.
4. Push to the branch: `git push origin feature-branch`.
5. Submit a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
For questions or support, contact the maintainer at [mdzakir.com@gmail.com](mailto:mdzakir.com@gmail.com).