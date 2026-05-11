import { useState, lazy, Suspense } from 'react';
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
  return <div className="min-h-screen bg-white" />;
}

export default function App() {
  const [phase] = useState<Phase>('prelaunch');
  const [view, setView] = useState<View>('landing');
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  if (view === 'minutes') {
    return (
      <Suspense fallback={<ViewFallback />}>
        <MeetingMinutes onBack={() => setView('landing')} />
      </Suspense>
    );
  }

  if (view === 'litepaper') {
    return (
      <Suspense fallback={<ViewFallback />}>
        <Litepaper onBack={() => setView('landing')} />
      </Suspense>
    );
  }

  if (view === 'roadmap') {
    return (
      <Suspense fallback={<ViewFallback />}>
        <Roadmap onBack={() => setView('landing')} />
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
        />
      </Suspense>
    );
  }

  if (view === 'project-detail' && selectedProjectId) {
    return (
      <Suspense fallback={<ViewFallback />}>
        <ProjectDetail projectId={selectedProjectId} onBack={() => setView('projects')} />
      </Suspense>
    );
  }

  if (view === 'governance') {
    return (
      <Suspense fallback={<ViewFallback />}>
        <GovernanceDashboard onBack={() => setView('landing')} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <a href="#main" className="skip-to-content">Skip to content</a>
      <Navbar
        onHomeClick={() => setView('landing')}
        onLitepaperClick={() => setView('litepaper')}
        onDiscoverClick={() => setView('projects')}
        onRoadmapClick={() => setView('roadmap')}
        onGovernanceClick={() => setView('governance')}
      />
      <main id="main">
        <Hero phase={phase} onLitepaperClick={() => setView('litepaper')} />
        {phase !== 'prelaunch' && <ActivityFeed phase={phase} />}
        <UseCases phase={phase} />
        <GovernanceScale phase={phase} />
        <HowItWorks />
        <DashboardPreview phase={phase} />
        {phase !== 'prelaunch' && <ProjectWizard phase={phase} />}
        <Features />
        <ProblemSection />
        <SolutionSection />
        <Comparison />
        <Resources onLitepaperClick={() => setView('litepaper')} onRoadmapClick={() => setView('roadmap')} />
        <CTA phase={phase} onLitepaperClick={() => setView('litepaper')} />
      </main>
      <Footer onLitepaperClick={() => setView('litepaper')} onRoadmapClick={() => setView('roadmap')} />
    </div>
  );
}
