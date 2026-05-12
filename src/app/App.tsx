import { useState, useEffect, lazy, Suspense } from 'react';
import { Info, FileText } from 'lucide-react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ActivityFeed } from './components/ActivityFeed';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { HowItWorks } from './components/HowItWorks';
import { ProjectWizard } from './components/ProjectWizard';
import { Features } from './components/Features';
import { UseCases } from './components/UseCases';
import { GovernanceScale } from './components/GovernanceScale';
import { DashboardPreview } from './components/DashboardPreview';
import { Comparison } from './components/Comparison';
import { Resources } from './components/Resources';
import { Testimonials } from './components/Testimonials';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

const MeetingMinutes = lazy(() => import('./components/MeetingMinutes').then(m => ({ default: m.MeetingMinutes })));
const Litepaper = lazy(() => import('./components/Litepaper').then(m => ({ default: m.Litepaper })));
const Roadmap = lazy(() => import('./components/Roadmap').then(m => ({ default: m.Roadmap })));
const ProjectIndex = lazy(() => import('./components/ProjectIndex').then(m => ({ default: m.ProjectIndex })));
const ProjectDetail = lazy(() => import('./components/ProjectDetail').then(m => ({ default: m.ProjectDetail })));
const GovernanceDashboard = lazy(() => import('./components/GovernanceDashboard').then(m => ({ default: m.GovernanceDashboard })));

export type Phase = 'prelaunch' | 'testnet' | 'mainnet';
export type View = 'landing' | 'minutes' | 'litepaper' | 'roadmap' | 'projects' | 'project-detail' | 'governance';

function ViewFallback() {
  return <div className="min-h-screen bg-white dark:bg-neutral-950" />;
}

function useAdminMode() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('0xdx_admin') === '1';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const adminParam = params.get('admin');
    if (adminParam === '1') {
      window.localStorage.setItem('0xdx_admin', '1');
      setIsAdmin(true);
    } else if (adminParam === '0') {
      window.localStorage.removeItem('0xdx_admin');
      setIsAdmin(false);
    }
  }, []);

  return isAdmin;
}

export default function App() {
  const [phase, setPhase] = useState<Phase>('prelaunch');
  const [view, setView] = useState<View>('landing');
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const { theme, toggleTheme } = useTheme();
  const isAdmin = useAdminMode();

  if (view === 'minutes') {
    return (
      <Suspense fallback={<ViewFallback />}>
        <MeetingMinutes onBack={() => setView('landing')} theme={theme} onThemeToggle={toggleTheme} />
      </Suspense>
    );
  }

  if (view === 'litepaper') {
    return (
      <Suspense fallback={<ViewFallback />}>
        <Litepaper onBack={() => setView('landing')} theme={theme} onThemeToggle={toggleTheme} />
      </Suspense>
    );
  }

  if (view === 'roadmap') {
    return (
      <Suspense fallback={<ViewFallback />}>
        <Roadmap onBack={() => setView('landing')} theme={theme} onThemeToggle={toggleTheme} />
      </Suspense>
    );
  }

  if (view === 'projects') {
    return (
      <Suspense fallback={<ViewFallback />}>
        <ProjectIndex
          onBack={() => setView('landing')}
          onProjectClick={(id) => {
            setSelectedProjectId(id);
            setView('project-detail');
          }}
          theme={theme}
          onThemeToggle={toggleTheme}
        />
      </Suspense>
    );
  }

  if (view === 'project-detail' && selectedProjectId) {
    return (
      <Suspense fallback={<ViewFallback />}>
        <ProjectDetail projectId={selectedProjectId} onBack={() => setView('projects')} theme={theme} onThemeToggle={toggleTheme} />
      </Suspense>
    );
  }

  if (view === 'governance') {
    return (
      <Suspense fallback={<ViewFallback />}>
        <GovernanceDashboard onBack={() => setView('landing')} theme={theme} onThemeToggle={toggleTheme} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <a href="#main" className="skip-to-content">Skip to content</a>
      <Navbar
        onHomeClick={() => setView('landing')}
        onLitepaperClick={() => setView('litepaper')}
        onDiscoverClick={() => setView('projects')}
        onRoadmapClick={() => setView('roadmap')}
        onGovernanceClick={() => setView('governance')}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      <main id="main">
        {/* Narrative arc: Hook → Problem → Mechanism → Economics → Proof → Pivot → CTA */}
        <Hero phase={phase} onLitepaperClick={() => setView('litepaper')} />
        {isAdmin && <ActivityFeed phase={phase} />}
        <ProblemSection />
        <HowItWorks />
        <GovernanceScale phase={phase} />
        <UseCases phase={phase} />
        {isAdmin && <DashboardPreview phase={phase} />}
        <Comparison />
        {isAdmin && <SolutionSection />}
        {isAdmin && <Features />}
        <ProjectWizard phase={phase} />
        <Resources onLitepaperClick={() => setView('litepaper')} onRoadmapClick={() => setView('roadmap')} />
        {isAdmin && <Testimonials phase={phase} />}
        <CTA phase={phase} onLitepaperClick={() => setView('litepaper')} />
      </main>
      <Footer phase={phase} onLitepaperClick={() => setView('litepaper')} onRoadmapClick={() => setView('roadmap')} />

      {/* Admin-only phase switcher dev tool. Enable with ?admin=1, disable with ?admin=0. */}
      {isAdmin && (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
        <button
          onClick={() => setView('minutes')}
          className="bg-white dark:bg-neutral-900 text-black dark:text-white px-4 py-3 shadow-xl border border-neutral-200 dark:border-neutral-700 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
        >
          <FileText className="w-4 h-4" />
          View Live Minutes Demo
        </button>
        <div className="flex items-center gap-3 bg-black text-white px-4 py-3 border border-neutral-800">
          <div className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            <Info className="w-4 h-4" />
            <span>Phase:</span>
          </div>
          <div className="flex items-center gap-1">
            {(['prelaunch', 'testnet', 'mainnet'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPhase(p)}
                className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 transition-colors ${
                  phase === p
                    ? p === 'prelaunch'
                      ? 'bg-neutral-300 text-black'
                      : p === 'testnet'
                      ? 'bg-orange-400 text-black'
                      : 'bg-emerald-400 text-black'
                    : 'text-neutral-500 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
