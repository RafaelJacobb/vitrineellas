import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Users, MapPin, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getDailyHighlight, getStatistics, type Initiative } from '@/data/initiatives';
import ellasTrophy from '@/assets/ellas-trophy.png';

interface HeroSectionProps {
  onOpenCadastro: () => void;
}

export function HeroSection({ onOpenCadastro }: HeroSectionProps) {
  const dailyHighlight = getDailyHighlight();
  const stats = getStatistics();
  
  const { scrollY } = useScroll();
  
  // Scroll-linked animations - synchronized between 200px and 600px scroll
  const trophyX = useTransform(scrollY, [200, 600], [0, -100]);
  const trophyScale = useTransform(scrollY, [200, 600], [1, 0.85]);
  
  // Highlight card slides in from RIGHT
  const highlightOpacity = useTransform(scrollY, [200, 600], [0, 1]);
  const highlightX = useTransform(scrollY, [200, 600], [400, 0]);

  return (
    <section id="hero" className="relative min-h-[180vh] pt-20 md:pt-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-map opacity-50" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />

      <div className="container relative mx-auto px-4 py-12 md:py-16">
        {/* Desktop: Initial Hero Grid - Text Left, Trophy Right */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto] gap-8 items-start">
          {/* Left content - Text + Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left max-w-2xl"
          >
            <Badge className="mb-6 bg-secondary text-secondary-foreground border-0 px-4 py-1.5 text-sm">
              🌟 Plataforma ELLAS
            </Badge>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Dando visibilidade para quem{' '}
              <span className="text-gradient">constrói o futuro</span>{' '}
              da ciência
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
              Um acervo digital centralizado que conecta mulheres a oportunidades em STEM 
              na América Latina. Descubra bolsas, mentorias e eventos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90 shadow-glow group">
                Explorar Iniciativas
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" onClick={onOpenCadastro}>
                Cadastrar Iniciativa
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md">
              <div className="text-left">
                <div className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  {stats.totalInitiatives}+
                </div>
                <div className="text-sm text-muted-foreground">Iniciativas</div>
              </div>
              <div className="text-left">
                <div className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  {stats.totalCountries}
                </div>
                <div className="text-sm text-muted-foreground">Países</div>
              </div>
              <div className="text-left">
                <div className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  {(stats.totalBeneficiaries / 1000).toFixed(1)}k+
                </div>
                <div className="text-sm text-muted-foreground">Beneficiárias</div>
              </div>
            </div>
          </motion.div>

          {/* Right content - Trophy (initial position, hidden after sticky takes over) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-end"
          >
            <div className="relative w-56 lg:w-64">
              <div className="absolute -inset-8 bg-gradient-hero rounded-full opacity-20 blur-3xl animate-pulse-soft" />
              <motion.img
                src={ellasTrophy}
                alt="ELLAS Trophy - Símbolo feminino com átomo"
                className="relative w-full h-auto drop-shadow-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Desktop: Sticky Container - Trophy + Highlight Card (appears on scroll) */}
        <div className="hidden lg:block sticky top-32 z-30 mt-24">
          <div className="grid grid-cols-2 gap-8 items-center">
            {/* Left Column - Trophy (slides from right to left) */}
            <motion.div
              style={{ x: trophyX, scale: trophyScale, opacity: highlightOpacity }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-hero rounded-full opacity-20 blur-3xl animate-pulse-soft" />
                <motion.img
                  src={ellasTrophy}
                  alt="ELLAS Trophy - Símbolo feminino com átomo"
                  className="relative w-56 lg:w-64 h-auto drop-shadow-2xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

            {/* Right Column - Highlight Card (slides in from right) */}
            <motion.div
              style={{ opacity: highlightOpacity, x: highlightX }}
              className="flex justify-center"
            >
              <div className="w-full max-w-lg">
                <DailyHighlightCard initiative={dailyHighlight} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-8"
          >
            <Badge className="mb-6 bg-secondary text-secondary-foreground border-0 px-4 py-1.5 text-sm">
              🌟 Plataforma ELLAS
            </Badge>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
              Dando visibilidade para quem{' '}
              <span className="text-gradient">constrói o futuro</span>{' '}
              da ciência
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
              Um acervo digital centralizado que conecta mulheres a oportunidades em STEM 
              na América Latina. Descubra bolsas, mentorias e eventos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90 shadow-glow group">
                Explorar Iniciativas
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" onClick={onOpenCadastro}>
                Cadastrar Iniciativa
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  {stats.totalInitiatives}+
                </div>
                <div className="text-sm text-muted-foreground">Iniciativas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  {stats.totalCountries}
                </div>
                <div className="text-sm text-muted-foreground">Países</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  {(stats.totalBeneficiaries / 1000).toFixed(1)}k+
                </div>
                <div className="text-sm text-muted-foreground">Beneficiárias</div>
              </div>
            </div>
          </motion.div>

          {/* Mobile Trophy */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-hero rounded-full opacity-20 blur-3xl animate-pulse-soft" />
              <motion.img
                src={ellasTrophy}
                alt="ELLAS Trophy - Símbolo feminino com átomo"
                className="relative w-48 h-auto drop-shadow-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          {/* Mobile Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <DailyHighlightCard initiative={dailyHighlight} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DailyHighlightCard({ initiative }: { initiative: Initiative }) {
  const categoryColors: Record<string, string> = {
    'Ciência': 'bg-stem-science/10 text-stem-science',
    'Tecnologia': 'bg-stem-technology/10 text-stem-technology',
    'Engenharia': 'bg-stem-engineering/10 text-stem-engineering',
    'Matemática': 'bg-stem-mathematics/10 text-stem-mathematics',
  };

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-hero rounded-3xl opacity-20 blur-2xl animate-pulse-soft" />
      
      <div className="relative bg-card/95 backdrop-blur-sm rounded-2xl border border-border shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-hero p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-primary-foreground fill-current" />
            <span className="text-primary-foreground font-semibold text-sm uppercase tracking-wide">
              Destaque do Dia
            </span>
          </div>
          <h3 className="font-display text-lg md:text-xl font-bold text-primary-foreground">
            {initiative.name}
          </h3>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5">
          <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
            {initiative.description}
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {initiative.categories.map((cat) => (
              <span key={cat} className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[cat]}`}>
                {cat}
              </span>
            ))}
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {initiative.city}, {initiative.country}
            </div>
            {initiative.beneficiaries && (
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {initiative.beneficiaries}
              </div>
            )}
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {initiative.type}
            </div>
          </div>

          {/* Organization */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-xs font-medium text-foreground">
              {initiative.organization}
            </span>
            {initiative.website && (
              <a
                href={initiative.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline"
              >
                Visitar →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
