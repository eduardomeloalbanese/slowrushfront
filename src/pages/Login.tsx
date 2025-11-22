import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'gestor' | 'colaborador'>('gestor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Redirecionamento baseado no tipo de usuário
      if (userType === 'gestor') {
      navigate('/dashboard');
    } else {
      navigate('/checkout');
}
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] animate-fade-in px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        
        {/* TABS DE SELEÇÃO DE PERFIL */}
        <div className="flex border-b border-gray-100 dark:border-gray-700">
          <button
            onClick={() => setUserType('gestor')}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${
              userType === 'gestor' 
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Sou Gestor (RH)
          </button>
          <button
            onClick={() => setUserType('colaborador')}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${
              userType === 'colaborador' 
                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Sou Colaborador
          </button>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {userType === 'gestor' ? 'Painel Corporativo' : 'Bem-vindo ao SlowRush'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
              {userType === 'gestor' 
                ? 'Acesse os indicadores de saúde da sua equipe.' 
                : 'Faça seu check-out diário e cuide de você.'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                E-mail Corporativo
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                placeholder="nome@empresa.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Senha
                </label>
                <a href="#" className="text-xs text-blue-600 hover:underline dark:text-blue-400">Esqueceu?</a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 ${
                userType === 'gestor' 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-emerald-500 hover:bg-emerald-600'
              }`}
            >
              {userType === 'gestor' ? 'Acessar Dashboard' : 'Iniciar Check-out'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Não tem uma conta?{' '}
            <Link to="/cadastro" className="font-bold text-blue-600 hover:underline dark:text-blue-400">
              Criar conta agora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}