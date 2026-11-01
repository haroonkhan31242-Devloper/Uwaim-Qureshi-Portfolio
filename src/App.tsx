import React, { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { scrollToId } from './components/ui/motion';

const SECTION_IDS = ['home', 'about', 'services', 'skills', 'projects', 'process', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Highlight the nav link for whichever section crosses the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-bg text-fg">
        <a
          href="#about"
          className="btn btn-primary btn-sm fixed left-4 top-4 z-[90] -translate-y-24 focus:translate-y-0"
        >
          Skip to content
        </a>

        <Navbar activeSection={activeSection} />

        <main>
          <Hero onExploreClick={() => scrollToId('projects')} onContactClick={() => scrollToId('contact')} />
          <About />
          <Services />
          <Skills />
          <Projects />
          <Process />
          <Contact />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
