import { motion } from 'framer-motion';
import { MapPin, Users, Calendar, ExternalLink, CheckCircle } from 'lucide-react';
import { type Initiative } from '@/data/initiatives';
import { Badge } from '@/components/ui/badge';

interface InitiativeCardProps {
  initiative: Initiative;
  index: number;
}

export function InitiativeCard({ initiative, index }: InitiativeCardProps) {
  const categoryColors: Record<string, string> = {
    'Ciência': 'bg-stem-science/10 text-stem-science border-stem-science/20',
    'Tecnologia': 'bg-stem-technology/10 text-stem-technology border-stem-technology/20',
    'Engenharia': 'bg-stem-engineering/10 text-stem-engineering border-stem-engineering/20',
    'Matemática': 'bg-stem-mathematics/10 text-stem-mathematics border-stem-mathematics/20',
  };

  const typeColors: Record<string, string> = {
    'Bolsa': 'bg-accent/10 text-accent',
    'Mentoria': 'bg-primary/10 text-primary',
    'Evento': 'bg-ellas-teal/10 text-ellas-teal',
    'Programa': 'bg-ellas-rose/10 text-ellas-rose',
    'Curso': 'bg-stem-science/10 text-stem-science',
    'Liderança': 'bg-ellas-coral/10 text-ellas-coral',
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group bg-card rounded-xl border border-border overflow-hidden shadow-sm card-hover"
    >
      {/* Type badge header */}
      <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[initiative.type]}`}>
          {initiative.type}
        </span>
        {initiative.isVerified && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CheckCircle className="w-3.5 h-3.5 text-primary" />
            Verificada
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <h3 className="font-display font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
          {initiative.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {initiative.description}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {initiative.categories.map((cat) => (
            <span
              key={cat}
              className={`px-2 py-0.5 rounded-md text-xs font-medium border ${categoryColors[cat]}`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {initiative.city ? `${initiative.city}, ` : ''}{initiative.country}
          </div>
          {initiative.beneficiaries && (
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {initiative.beneficiaries.toLocaleString()}
            </div>
          )}
          {initiative.foundedYear && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {initiative.foundedYear}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border bg-muted/20 flex items-center justify-between">
        <span className="text-xs font-medium text-foreground">
          {initiative.organization}
        </span>
        {initiative.website && (
          <a
            href={initiative.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            Acessar
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </motion.article>
  );
}
