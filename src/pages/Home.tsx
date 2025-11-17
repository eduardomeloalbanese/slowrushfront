import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="animate-fade-in pt-16"> 
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6">
              <span className="flex h-2 w-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              Gestão de Bem-Estar baseada em Dados
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Transforme a Gestão de Pessoas de <span className="text-blue-600 dark:text-blue-400">Reativa</span> para <span className="text-emerald-500">Proativa</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              O SlowRush dá visibilidade à sobrecarga da sua equipe sem invadir a privacidade. Reduza o turnover e combata o burnout com insights anônimos.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contato" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Agendar Demo para RH
              </Link>
              <Link to="/login" className="px-8 py-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all">
                Acesso do Cliente
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS / PROBLEM SECTION */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
            <div className="p-4">
              <div className="text-4xl font-bold text-red-500 mb-2">6x</div>
              <p className="text-gray-600 dark:text-gray-400">Custo do salário para repor um talento perdido por burnout.</p>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-gray-600 dark:text-gray-400">Privacidade garantida. O gestor nunca vê dados individuais.</p>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-emerald-500 mb-2">33%</div>
              <p className="text-gray-600 dark:text-gray-400">ROI imediato ao evitar a saída de apenas um funcionário.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (Check-out + Dashboard) */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Como o SlowRush Funciona</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Unimos o cuidado individual com a inteligência corporativa através do nosso ritual diário.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Step 1: O Funcionário */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border-l-4 border-blue-500">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-300 mr-4">
                  {/* Clock Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1. Check-out Diário</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Ao final do dia, o colaborador reporta voluntariamente em 30 segundos:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <svg className="text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg> 
                  Horas trabalhadas e extras
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                   <svg className="text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                  Intensidade de reuniões
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                   <svg className="text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                  Sentimento (Nível de estresse)
                </li>
              </ul>
            </div>

            {/* Step 2: O Gestor */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border-l-4 border-purple-500">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg text-purple-600 dark:text-purple-300 mr-4">
                  {/* Chart Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2. Dashboard do Gestor</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Os dados são anonimizados e transformados em inteligência para o RH e Liderança:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <svg className="text-purple-500 mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                  Termômetro de risco de Burnout
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <svg className="text-purple-500 mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                  Alertas de "Toxicidade de Agenda"
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <svg className="text-purple-500 mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                  Sugestões de ações culturais
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY & DIFFERENTIALS */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="inline-flex p-4 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 rounded-full mb-4">
                {/* Lock Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Privacy-by-Design</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Diferente de ferramentas espiãs, garantimos anonimato total. Isso gera confiança e dados reais.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="inline-flex p-4 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full mb-4">
                {/* Users Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Foco na Causa Raiz</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Não tratamos apenas o sintoma. Identificamos má gestão de tempo e excesso de reuniões antes que virem burnout.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="inline-flex p-4 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-full mb-4">
                {/* Heart Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Cultura de Cuidado</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Demonstre que sua empresa ouve a equipe baseada em dados, fortalecendo o Employer Branding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI CALL TO ACTION */}
      <section className="py-20 bg-blue-600 dark:bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">O Custo do Invisível é Alto</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Para uma empresa de 50 funcionários, evitar uma única demissão gera uma economia de R$ 42.000,00. 
            Transforme custos de turnover em investimento na cultura.
          </p>
          <Link to="/contato" className="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105">
            Calcular meu ROI Agora
          </Link>
        </div>
      </section>
    </div>
  );
};