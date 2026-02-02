import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { initiatives, type STEMCategory, type InitiativeType } from '@/data/initiatives';
import { InitiativeCard } from './InitiativeCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const stemCategories: STEMCategory[] = ['Ciência', 'Tecnologia', 'Engenharia', 'Matemática'];
const initiativeTypes: InitiativeType[] = ['Bolsa', 'Mentoria', 'Evento', 'Programa', 'Curso', 'Liderança'];

export function CatalogSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<STEMCategory | null>(null);
  const [selectedType, setSelectedType] = useState<InitiativeType | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const countries = useMemo(() => 
    [...new Set(initiatives.map(i => i.country))].sort(),
    []
  );

  const filteredInitiatives = useMemo(() => {
    return initiatives.filter(initiative => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          initiative.name.toLowerCase().includes(query) ||
          initiative.description.toLowerCase().includes(query) ||
          initiative.organization.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory && !initiative.categories.includes(selectedCategory)) {
        return false;
      }

      // Type filter
      if (selectedType && initiative.type !== selectedType) {
        return false;
      }

      // Country filter
      if (selectedCountry && initiative.country !== selectedCountry) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedType, selectedCountry]);

  const activeFiltersCount = [selectedCategory, selectedType, selectedCountry].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedType(null);
    setSelectedCountry(null);
    setSearchQuery('');
  };

  return (
    <section id="catalogo" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Catálogo de Iniciativas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore bolsas, mentorias, eventos e programas para mulheres em STEM.
            Use os filtros para encontrar oportunidades relevantes.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-xl border border-border p-4 md:p-6 mb-8 shadow-sm"
        >
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nome, descrição ou organização..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* STEM Category filter */}
            <Select
              value={selectedCategory || ''}
              onValueChange={(val) => setSelectedCategory(val as STEMCategory || null)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Área STEM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas as áreas</SelectItem>
                {stemCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Type filter */}
            <Select
              value={selectedType || ''}
              onValueChange={(val) => setSelectedType(val as InitiativeType || null)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os tipos</SelectItem>
                {initiativeTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Country filter */}
            <Select
              value={selectedCountry || ''}
              onValueChange={(val) => setSelectedCountry(val || null)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="País" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os países</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear filters */}
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                <X className="w-4 h-4 mr-1" />
                Limpar ({activeFiltersCount})
              </Button>
            )}

            {/* Results count */}
            <div className="ml-auto text-sm text-muted-foreground">
              {filteredInitiatives.length} iniciativa{filteredInitiatives.length !== 1 ? 's' : ''} encontrada{filteredInitiatives.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Active filters badges */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
              {selectedCategory && (
                <Badge variant="secondary" className="gap-1">
                  {selectedCategory}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory(null)} />
                </Badge>
              )}
              {selectedType && (
                <Badge variant="secondary" className="gap-1">
                  {selectedType}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedType(null)} />
                </Badge>
              )}
              {selectedCountry && (
                <Badge variant="secondary" className="gap-1">
                  {selectedCountry}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCountry(null)} />
                </Badge>
              )}
            </div>
          )}
        </motion.div>

        {/* Results grid */}
        {filteredInitiatives.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInitiatives.map((initiative, index) => (
              <InitiativeCard key={initiative.id} initiative={initiative} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">Nenhuma iniciativa encontrada</h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros ou termos de busca.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Limpar filtros
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
