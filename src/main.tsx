import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { findCaseStudy } from './data/caseStudies';
import './index.css';

const root = document.getElementById('root')!;

async function mountApp() {
  const pathname = window.location.pathname;
  // Keep the prerendered project visible until its component is ready to hydrate.
  const projectPage = findCaseStudy(pathname) ? (await import('./components/ProjectPage')).default : undefined;
  const app = (
    <React.StrictMode>
      <ThemeProvider>
        <App pathname={pathname} projectPage={projectPage} />
      </ThemeProvider>
    </React.StrictMode>
  );

  if (root.hasChildNodes()) {
    ReactDOM.hydrateRoot(root, app);
  } else {
    ReactDOM.createRoot(root).render(app);
  }
}

void mountApp();
