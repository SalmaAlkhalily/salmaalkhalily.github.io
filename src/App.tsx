import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectArchive from './components/ProjectArchive';
import { findCaseStudy, getPageMetadata, type CaseStudyKey } from './data/caseStudies';
import { lazy, Suspense, useEffect, type ComponentType } from 'react';

const LazyProjectPage = lazy(() => import('./components/ProjectPage'));
type ProjectPageComponent = ComponentType<{ studyKey: CaseStudyKey }>;

export default function App({ pathname = '/', projectPage }: { pathname?: string; projectPage?: ProjectPageComponent }) {
  const studyKey = findCaseStudy(pathname);
  const archive = pathname === '/archive.html';
  const innerPage = Boolean(studyKey || archive);
  const StudyPage = projectPage ?? LazyProjectPage;

  useEffect(() => {
    const metadata = getPageMetadata(pathname);
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', metadata.url);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', metadata.url);
  }, [pathname]);

  return (
    <>
      <Header innerPage={innerPage} />
      <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
        {studyKey ? (
          <Suspense fallback={<div className="container project-loading" role="status">Loading project…</div>}>
            <StudyPage studyKey={studyKey} />
          </Suspense>
        ) : archive ? (
          <ProjectArchive />
        ) : (
          <>
            <Hero />
            <About />
            <Experience />
            <Education />
            <Projects />
            <Skills />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
