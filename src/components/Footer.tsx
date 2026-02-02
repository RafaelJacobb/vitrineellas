import { Sparkles, Github, ExternalLink, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display font-bold text-lg">Vitrine Ellas</span>
              </div>
            </div>
            <p className="text-background/70 text-sm max-w-md mb-4">
              Um acervo digital centralizado que conecta mulheres a oportunidades em STEM 
              na América Latina. Baseado nos dados da plataforma ELLAS.
            </p>
            <p className="text-background/50 text-xs">
              "Dando visibilidade para quem constrói o futuro da ciência."
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#hero" className="hover:text-background transition-colors">Início</a></li>
              <li><a href="#mapa" className="hover:text-background transition-colors">Mapa</a></li>
              <li><a href="#catalogo" className="hover:text-background transition-colors">Iniciativas</a></li>
              <li><a href="#sobre" className="hover:text-background transition-colors">Sobre</a></li>
            </ul>
          </div>

          {/* External */}
          <div>
            <h4 className="font-semibold mb-4">Links Externos</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a 
                  href="https://plataform.ellas.ufmt.br/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-background transition-colors flex items-center gap-1"
                >
                  Plataforma ELLAS
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.ufmt.br/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-background transition-colors flex items-center gap-1"
                >
                  UFMT
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">
            © {currentYear} Vitrine Ellas. Projeto acadêmico.
          </p>
          <p className="text-sm text-background/50 flex items-center gap-1">
            Feito com <Heart className="w-4 h-4 text-accent fill-current" /> para mulheres em STEM
          </p>
        </div>
      </div>
    </footer>
  );
}
