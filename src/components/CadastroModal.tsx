import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type STEMCategory, type InitiativeType } from '@/data/initiatives';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

interface CadastroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const stemCategories: STEMCategory[] = ['Ciência', 'Tecnologia', 'Engenharia', 'Matemática'];
const initiativeTypes: InitiativeType[] = ['Bolsa', 'Mentoria', 'Evento', 'Programa', 'Curso', 'Liderança'];
const countries = ['Brasil', 'Argentina', 'Bolívia', 'Chile', 'Colômbia', 'Equador', 'Peru', 'Uruguai', 'Paraguai', 'Venezuela'];

// Form validation schema
const formSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').max(100, 'Nome muito longo'),
  description: z.string().min(20, 'Descrição deve ter pelo menos 20 caracteres').max(500, 'Descrição muito longa'),
  type: z.string().min(1, 'Selecione um tipo'),
  categories: z.array(z.string()).min(1, 'Selecione pelo menos uma área STEM'),
  country: z.string().min(1, 'Selecione um país'),
  state: z.string().min(2, 'Informe o estado/região').max(50),
  city: z.string().max(100).optional(),
  organization: z.string().min(2, 'Informe a organização').max(100),
  website: z.string().url('URL inválida').optional().or(z.literal('')),
  email: z.string().email('Email inválido'),
});

type FormData = z.infer<typeof formSchema>;

export function CadastroModal({ isOpen, onClose }: CadastroModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    type: '',
    categories: [],
    country: '',
    state: '',
    city: '',
    organization: '',
    website: '',
    email: '',
  });

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is modified
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCategoryToggle = (category: STEMCategory) => {
    const updated = formData.categories.includes(category)
      ? formData.categories.filter(c => c !== category)
      : [...formData.categories, category];
    handleInputChange('categories', updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof FormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    
    toast({
      title: "Iniciativa cadastrada!",
      description: "Sua iniciativa foi enviada para análise e será publicada em breve.",
    });

    // Reset form and close
    setFormData({
      name: '',
      description: '',
      type: '',
      categories: [],
      country: '',
      state: '',
      city: '',
      organization: '',
      website: '',
      email: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] bg-card rounded-2xl shadow-lg z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-border bg-gradient-hero">
              <div>
                <h2 className="font-display text-xl font-bold text-primary-foreground">
                  Cadastrar Iniciativa
                </h2>
                <p className="text-sm text-primary-foreground/80">
                  Compartilhe uma oportunidade com a comunidade
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
              >
                <X className="w-5 h-5 text-primary-foreground" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="space-y-5">
                {/* Name */}
                <div>
                  <Label htmlFor="name">Nome da Iniciativa *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Ex: Programa Mulheres na Ciência"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Descreva a iniciativa, seus objetivos e público-alvo..."
                    rows={3}
                    className={errors.description ? 'border-destructive' : ''}
                  />
                  {errors.description && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.description}
                    </p>
                  )}
                </div>

                {/* Type and Organization row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Tipo de Iniciativa *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(val) => handleInputChange('type', val)}
                    >
                      <SelectTrigger className={errors.type ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {initiativeTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.type && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.type}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="organization">Organização *</Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => handleInputChange('organization', e.target.value)}
                      placeholder="Ex: Universidade Federal"
                      className={errors.organization ? 'border-destructive' : ''}
                    />
                    {errors.organization && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.organization}
                      </p>
                    )}
                  </div>
                </div>

                {/* STEM Categories */}
                <div>
                  <Label>Áreas STEM *</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {stemCategories.map((cat) => {
                      const isSelected = formData.categories.includes(cat);
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleCategoryToggle(cat)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                            isSelected
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-muted text-muted-foreground border-border hover:border-primary'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                  {errors.categories && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.categories}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label>País *</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(val) => handleInputChange('country', val)}
                    >
                      <SelectTrigger className={errors.country ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.country && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.country}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="state">Estado/Região *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="Ex: São Paulo"
                      className={errors.state ? 'border-destructive' : ''}
                    />
                    {errors.state && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.state}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Ex: Campinas"
                    />
                  </div>
                </div>

                {/* Contact */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://..."
                      className={errors.website ? 'border-destructive' : ''}
                    />
                    {errors.website && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.website}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email de contato *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="contato@exemplo.com"
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Privacy note */}
                <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    As iniciativas cadastradas passarão por uma análise antes de serem publicadas. 
                    Seus dados de contato são protegidos conforme a LGPD.
                  </p>
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="p-4 md:p-6 border-t border-border flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-hero hover:opacity-90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Cadastrar Iniciativa'
                )}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
