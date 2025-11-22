import { Link } from 'react-router-dom';

export function Sobre() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-fade-in pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      
      {/* HERO SECTION */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Bem-vindo ao <span className="text-blue-600">SlowRush</span>
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-300">
          A primeira plataforma de inteligência emocional corporativa focada em prevenir o burnout antes que ele aconteça.
        </p>
      </div>

      {/* O PROBLEMA */}
      <div className="max-w-5xl mx-auto mb-20">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                <span className="block">O Problema:</span>
                <span className="block text-red-600">Burnout Silencioso</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-500 dark:text-gray-300">
                Em ambientes de trabalho remoto e híbrido, gestores perderam a visibilidade da sobrecarga real da equipe. 
                O "presenteísmo digital" e o excesso de reuniões criam uma cultura de exaustão que só é percebida quando o talento pede demissão.
              </p>
            </div>
          </div>
          <div className="relative -mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
            <div className="flex items-center justify-center h-full bg-red-50 dark:bg-red-900/20 p-8">
               <span className="text-9xl">📉</span>
            </div>
          </div>
        </div>
      </div>

      {/* A SOLUÇÃO */}
      <div className="max-w-5xl mx-auto mb-20">
        <div className="bg-blue-600 dark:bg-blue-800 rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="relative aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
             <div className="flex items-center justify-center h-full bg-blue-500 dark:bg-blue-700 p-8">
               <span className="text-9xl">🛡️</span>
            </div>
          </div>
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pl-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">A Solução:</span>
                <span className="block text-blue-200">Dados Humanizados</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-blue-100">
                O SlowRush implementa um ritual de **Check-out Diário** onde o colaborador registra sua carga e sentimento em 30 segundos.
                Nossa plataforma analisa esses dados anonimamente e alerta o gestor sobre riscos de burnout, sugerindo ações de cultura proativas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PILARES */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
          Nossos Pilares
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Pilar 1 */}
          <div className="pt-6">
            <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Privacidade Total</h3>
                <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                  Adotamos o conceito de *Privacy-by-Design*. O gestor vê tendências da equipe, nunca dados individuais expostos.
                </p>
              </div>
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="pt-6">
            <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-emerald-500 rounded-md shadow-lg">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Simplicidade</h3>
                <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                  Sem formulários longos. Apenas 3 cliques diários para gerar insights poderosos de gestão de pessoas.
                </p>
              </div>
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="pt-6">
            <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Ação Rápida</h3>
                <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                  Transformamos sentimentos subjetivos em métricas claras (KPIs) para o RH agir antes da crise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="mt-16 text-center">
        <Link to="/Cadastro" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 shadow-md transition-transform transform hover:scale-105">
          Começar Agora
        </Link>
      </div>

    </div>
  );
}