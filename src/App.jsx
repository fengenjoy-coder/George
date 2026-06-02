import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/sections/HeroSection'
import { TierSystemSection } from './components/sections/TierSystemSection'
import { MBCSection } from './components/sections/MBCSection'
import { PointsEconomySection, ExchangeSection } from './components/sections/PointsEconomySection'
import { ExperiencePyramidSection } from './components/sections/ExperiencePyramidSection'
import { ModulesSection } from './components/sections/ModulesSection'
import { PhoneShowcaseSection } from './components/sections/PhoneShowcaseSection'
import { CoreLoopSection } from './components/sections/CoreLoopSection'
import { MetricsRoadmapSection } from './components/sections/MetricsRoadmapSection'
import { RulesSection } from './components/sections/RulesSection'
import { AnnualResetSection } from './components/sections/AnnualResetSection'
import { MemberPathSection } from './components/sections/MemberPathSection'

function App() {
  return (
    <div className="min-h-screen bg-dark-primary">
      <Navbar />
      <main>
        <HeroSection />
        <TierSystemSection />
        <MemberPathSection />
        <MBCSection />
        <PointsEconomySection />
        <ExchangeSection />
        <ExperiencePyramidSection />
        <ModulesSection />
        <PhoneShowcaseSection />
        <CoreLoopSection />
        <AnnualResetSection />
        <MetricsRoadmapSection />
        <RulesSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
