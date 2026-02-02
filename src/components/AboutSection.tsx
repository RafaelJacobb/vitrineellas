import { motion } from 'framer-motion';
import { Database, Users, BarChart3, Sparkles, Globe, Shield } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Destaque Rotativo',
    description: 'Sistema automático de rotação diária que garante visibilidade equitativa para todas as iniciativas, independente do tamanho.',
  },
  {
    icon: Globe,
    title: 'Cobertura Latino-Americana',
    description: 'Dados de iniciativas STEM em toda a América Latina, integrados com a plataforma ELLAS.',
  },
  {
    icon: BarChart3,
    title: 'Mapa Comparativo',
    description: 'Visualização geográfica para identificar lacunas regionais e guiar investimentos em equidade de gênero.',
  },
  {
    icon: Users,
    title: 'Cadastro Colaborativo',
    description: 'A comunidade pode cadastrar novas iniciativas, mantendo o ecossistema sempre atualizado.',
  },
  {
    icon: Database,
    title: 'Dados Abertos',
    description: 'Baseado nos dados abertos da rede ELLAS, promovendo transparência e acessibilidade.',
  },
  {
    icon: Shield,
    title: 'Privacidade',
    description: 'Comprometidos com a LGPD e com a proteção dos dados de mulheres em liderança STEM.',
  },
];

export function AboutSection() {
  return (
    <section id="sobre" className="py-16 md:py-24 bg-gradient-map">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Sobre o Vitrine Ellas
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Um projeto que nasceu da necessidade de centralizar e democratizar o acesso 
            a oportunidades STEM para mulheres na América Latina. Utilizamos dados da 
            plataforma ELLAS para criar transparência e impacto.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl border border-border p-6 shadow-sm card-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ELLAS connection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl font-bold mb-4">
                Integrado com a Plataforma ELLAS
              </h3>
              <p className="text-muted-foreground mb-4">
                O portal ELLAS gera e divulga dados abertos conectados com foco em países 
                da América Latina. Ele surgiu a partir da união de instituições do Brasil, 
                Bolívia e Peru para promover a equidade de gênero em Ciência e Tecnologia.
              </p>
              <p className="text-muted-foreground mb-6">
                O Vitrine Ellas utiliza esses dados para criar visualizações acessíveis 
                e promover iniciativas que muitas vezes ficam invisíveis por falta de 
                uma plataforma centralizada.
              </p>
              <a
                href="https://plataform.ellas.ufmt.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                Visitar Plataforma ELLAS
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-hero rounded-2xl opacity-10 blur-xl" />
              <div className="relative bg-gradient-hero rounded-xl p-8 text-center">
                <div className="text-5xl font-display font-bold text-primary-foreground mb-2">
                  ELLAS
                </div>
                <p className="text-primary-foreground/80 text-sm">
                  Dados abertos para Equidade de Gênero em Ciência e Tecnologia
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
