import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { MapSection } from '@/components/MapSection';
import { CatalogSection } from '@/components/CatalogSection';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';
import { CadastroModal } from '@/components/CadastroModal';

const Index = () => {
  const [isCadastroOpen, setIsCadastroOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenCadastro={() => setIsCadastroOpen(true)} />
      
      <main>
        <HeroSection onOpenCadastro={() => setIsCadastroOpen(true)} />
        <MapSection />
        <CatalogSection />
        <AboutSection />
      </main>

      <Footer />

      <CadastroModal 
        isOpen={isCadastroOpen} 
        onClose={() => setIsCadastroOpen(false)} 
      />
    </div>
  );
};

export default Index;
