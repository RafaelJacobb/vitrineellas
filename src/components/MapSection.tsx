import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown, Info } from 'lucide-react';
import { countryStats, getInitiativesByCountry } from '@/data/initiatives';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function MapSection() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const maxInitiatives = Math.max(...countryStats.map(c => c.initiatives));

  const getIntensity = (initiatives: number) => {
    const ratio = initiatives / maxInitiatives;
    if (ratio > 0.8) return 'bg-primary';
    if (ratio > 0.5) return 'bg-primary/80';
    if (ratio > 0.3) return 'bg-primary/60';
    return 'bg-primary/40';
  };

  const selectedInitiatives = selectedCountry 
    ? getInitiativesByCountry(selectedCountry)
    : [];

  return (
    <section id="mapa" className="py-16 md:py-24 bg-gradient-map">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Mapa de Iniciativas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visualize a distribuição de iniciativas STEM para mulheres na América Latina.
            Identifique regiões com mais oportunidades e áreas que precisam de mais suporte.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
              {/* SVG Map of Latin America */}
              <div className="relative aspect-[4/3] bg-muted/30 rounded-xl overflow-hidden">
                <svg viewBox="0 0 400 500" className="w-full h-full">
                  {/* Simplified Latin America map paths */}
                  <defs>
                    <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(280, 60%, 45%)" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="hsl(350, 70%, 65%)" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  
                  {/* Background */}
                  <rect x="0" y="0" width="400" height="500" fill="url(#mapGradient)" />
                  
                  {/* Country representations as circles positioned roughly */}
                  <TooltipProvider>
                    {countryStats.map((country, index) => {
                      // Approximate positions for each country
                      const positions: Record<string, { x: number; y: number }> = {
                        'Colômbia': { x: 120, y: 80 },
                        'Equador': { x: 95, y: 130 },
                        'Peru': { x: 110, y: 180 },
                        'Bolívia': { x: 170, y: 230 },
                        'Brasil': { x: 280, y: 200 },
                        'Chile': { x: 130, y: 340 },
                        'Argentina': { x: 180, y: 380 },
                        'Uruguai': { x: 230, y: 360 },
                      };

                      const pos = positions[country.country] || { x: 200, y: 200 + index * 50 };
                      const size = 15 + (country.initiatives / maxInitiatives) * 30;
                      const isSelected = selectedCountry === country.country;

                      return (
                        <Tooltip key={country.code}>
                          <TooltipTrigger asChild>
                            <g
                              className="cursor-pointer transition-all duration-300"
                              onClick={() => setSelectedCountry(
                                selectedCountry === country.country ? null : country.country
                              )}
                            >
                              <circle
                                cx={pos.x}
                                cy={pos.y}
                                r={size}
                                className={`${getIntensity(country.initiatives)} transition-all duration-300 ${
                                  isSelected ? 'stroke-primary stroke-2' : 'stroke-background stroke-1'
                                }`}
                                fill="currentColor"
                                opacity={isSelected ? 1 : 0.8}
                              />
                              <text
                                x={pos.x}
                                y={pos.y + size + 15}
                                textAnchor="middle"
                                className="fill-foreground text-xs font-medium"
                              >
                                {country.code}
                              </text>
                            </g>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-center">
                              <p className="font-semibold">{country.country}</p>
                              <p className="text-sm text-muted-foreground">
                                {country.initiatives} iniciativa{country.initiatives !== 1 ? 's' : ''}
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </TooltipProvider>
                </svg>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border">
                  <p className="text-xs font-medium mb-2">Densidade</p>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary/40" />
                    <span className="text-xs text-muted-foreground">Baixa</span>
                    <div className="w-3 h-3 rounded-full bg-primary/70" />
                    <span className="text-xs text-muted-foreground">Média</span>
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-xs text-muted-foreground">Alta</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Country selector */}
            <div className="bg-card rounded-xl border border-border p-4 shadow-md">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Selecionar País
              </label>
              <Select value={selectedCountry || ''} onValueChange={(val) => setSelectedCountry(val || null)}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os países" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os países</SelectItem>
                  {countryStats.map((country) => (
                    <SelectItem key={country.code} value={country.country}>
                      {country.country} ({country.initiatives})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Country stats */}
            <div className="bg-card rounded-xl border border-border p-4 shadow-md">
              <h3 className="font-display font-semibold text-lg mb-4">
                {selectedCountry || 'Todos os Países'}
              </h3>
              
              {selectedCountry ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Iniciativas</span>
                    <span className="font-semibold text-foreground">
                      {selectedInitiatives.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Beneficiárias</span>
                    <span className="font-semibold text-foreground">
                      {selectedInitiatives.reduce((sum, i) => sum + (i.beneficiaries || 0), 0)}
                    </span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="text-sm font-medium mb-2">Tipos de Iniciativas:</p>
                    <div className="flex flex-wrap gap-2">
                      {[...new Set(selectedInitiatives.map(i => i.type))].map(type => (
                        <span key={type} className="px-2 py-1 bg-secondary rounded-full text-xs">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {countryStats
                    .sort((a, b) => b.initiatives - a.initiatives)
                    .map((country) => (
                      <div
                        key={country.code}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedCountry(country.country)}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">{country.country}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 bg-muted rounded-full w-20">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${(country.initiatives / maxInitiatives) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-6 text-right">
                            {country.initiatives}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Info card */}
            <div className="bg-secondary/50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    Dados da Rede ELLAS
                  </p>
                  <p className="text-xs text-muted-foreground">
                    As informações são atualizadas regularmente a partir da plataforma ELLAS 
                    e do cadastro colaborativo da comunidade.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
