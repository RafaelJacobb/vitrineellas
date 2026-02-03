import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Atom, Calculator, Pi, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  organization: z.string().min(2, 'Organização deve ter pelo menos 2 caracteres'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não conferem",
  path: ["confirmPassword"],
});

type AuthMode = 'login' | 'register';

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  
  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    organization: '',
    password: '',
    confirmPassword: '',
  });
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErrors({});

    const result = loginSchema.safeParse(loginData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) errors[err.path[0] as string] = err.message;
      });
      setLoginErrors(errors);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    toast({
      title: "Login realizado!",
      description: "Bem-vinda de volta à Vitrine Ellas.",
    });
    navigate('/');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterErrors({});

    const result = registerSchema.safeParse(registerData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) errors[err.path[0] as string] = err.message;
      });
      setRegisterErrors(errors);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    toast({
      title: "Cadastro realizado!",
      description: "Sua conta foi criada com sucesso. Bem-vinda à comunidade!",
    });
    navigate('/');
  };

  const stemIcons = [
    { icon: Pi, label: 'Matemática', color: 'text-stem-math' },
    { icon: Calculator, label: 'Tecnologia', color: 'text-stem-tech' },
    { icon: Atom, label: 'Ciência', color: 'text-stem-science' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Voltar ao início</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* STEM Icons */}
          <div className="flex justify-center gap-6 mb-8">
            {stemIcons.map(({ icon: Icon, label, color }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-14 h-14 rounded-xl bg-card border border-border shadow-sm flex items-center justify-center ${color}`}
              >
                <Icon className="w-7 h-7" />
              </motion.div>
            ))}
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Bem-vinda à
            </h1>
            <h2 className="font-display text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Vitrine Ellas
            </h2>
          </div>

          {/* Auth Card */}
          <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-border">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                  mode === 'login'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Login
                {mode === 'login' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-hero"
                  />
                )}
              </button>
              <button
                onClick={() => setMode('register')}
                className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                  mode === 'register'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Cadastrar
                {mode === 'register' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-hero"
                  />
                )}
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {mode === 'login' ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className={loginErrors.email ? 'border-destructive' : ''}
                    />
                    {loginErrors.email && (
                      <p className="text-xs text-destructive mt-1">{loginErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="login-password">Senha</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className={loginErrors.password ? 'border-destructive pr-10' : 'pr-10'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {loginErrors.password && (
                      <p className="text-xs text-destructive mt-1">{loginErrors.password}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                        Lembrar-me
                      </Label>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-primary hover:underline"
                    >
                      Esqueci a senha
                    </button>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-hero hover:opacity-90"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      'Entrar'
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleRegister}
                  className="space-y-4"
                >
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Faça parte da <span className="text-primary font-medium">comunidade</span>
                  </p>

                  <div>
                    <Label htmlFor="register-name">Nome completo</Label>
                    <Input
                      id="register-name"
                      placeholder="Seu nome"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      className={registerErrors.name ? 'border-destructive' : ''}
                    />
                    {registerErrors.name && (
                      <p className="text-xs text-destructive mt-1">{registerErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className={registerErrors.email ? 'border-destructive' : ''}
                    />
                    {registerErrors.email && (
                      <p className="text-xs text-destructive mt-1">{registerErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="register-org">Organização / Instituto</Label>
                    <Input
                      id="register-org"
                      placeholder="Universidade, empresa..."
                      value={registerData.organization}
                      onChange={(e) => setRegisterData({ ...registerData, organization: e.target.value })}
                      className={registerErrors.organization ? 'border-destructive' : ''}
                    />
                    {registerErrors.organization && (
                      <p className="text-xs text-destructive mt-1">{registerErrors.organization}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="register-password">Senha</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        className={registerErrors.password ? 'border-destructive pr-10' : 'pr-10'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {registerErrors.password && (
                      <p className="text-xs text-destructive mt-1">{registerErrors.password}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="register-confirm">Confirmar senha</Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className={registerErrors.confirmPassword ? 'border-destructive' : ''}
                    />
                    {registerErrors.confirmPassword && (
                      <p className="text-xs text-destructive mt-1">{registerErrors.confirmPassword}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-hero hover:opacity-90"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Cadastrando...
                      </>
                    ) : (
                      'Cadastrar'
                    )}
                  </Button>
                </motion.form>
              )}
            </div>
          </div>

          {/* STEM Categories Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">Ellas fazem</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {['Ciência', 'Tecnologia', 'Engenharia', 'Matemática'].map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
