import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { caseStudies, findCaseStudy, getPageMetadata } from './data/caseStudies';

export function getStaticPages() {
  return ['/', '/archive.html', ...Object.values(caseStudies).map((study) => study.path)].map(getPageMetadata);
}

export async function render(pathname = '/') {
  const projectPage = findCaseStudy(pathname) ? (await import('./components/ProjectPage')).default : undefined;
  return renderToString(
    <React.StrictMode>
      <ThemeProvider>
        <App pathname={pathname} projectPage={projectPage} />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
