import React, { useState } from 'react';

export function Contato() {
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui entraria a lógica de envio para a API
    setFormStatus('success');
    
    // Reseta o status após 5 segundos para permitir novo envio
    setTimeout(() => {
      setFormStatus('idle');
      (e.target as HTMLFormElement).reset();
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      
      <div className="max-w-3xl w-full space-y-8">
        {/* Cabeçalho da Página */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Entre em Contato
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Tem alguma dúvida sobre como o SlowRush pode ajudar a sua empresa? 
            Preencha o formulário abaixo e nossa equipe de especialistas entrará em contato.
          </p>
        </div>

        {/* Formulário */}
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
          
          {formStatus === 'success' ? (
            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md p-4 text-center animate-fade-in">
              <div className="flex justify-center mb-2">
                <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-green-800 dark:text-green-200">Mensagem enviada!</h3>
              <p className="text-green-700 dark:text-green-300 mt-1">
                Obrigado pelo contato. Responderemos em breve.
              </p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* Nome */}
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nome Completo
                </label>
                <div className="mt-1">
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Seu nome"
                  />
                </div>
              </div>

              {/* Telefone */}
              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Telefone
                </label>
                <div className="mt-1">
                  <input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  E-mail Corporativo
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="voce@empresa.com"
                  />
                </div>
              </div>

              {/* Redes Sociais (Opcional) */}
              <div>
                <label htmlFor="redes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  LinkedIn / Site da Empresa (Opcional)
                </label>
                <div className="mt-1">
                  <input
                    id="redes"
                    name="redes"
                    type="text"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>

              {/* Mensagem */}
              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Como podemos ajudar?
                </label>
                <div className="mt-1">
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={4}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Descreva sua necessidade..."
                  />
                </div>
              </div>

              {/* Botão de Envio */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors transform hover:scale-[1.01]"
                >
                  Enviar Mensagem
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Informações Adicionais (Rodapé do Contato) */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Suporte Técnico</h4>
            <p className="mt-2 text-gray-500 dark:text-gray-400">suporte@slowrush.com</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Vendas</h4>
            <p className="mt-2 text-gray-500 dark:text-gray-400">vendas@slowrush.com</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Localização</h4>
            <p className="mt-2 text-gray-500 dark:text-gray-400">São Paulo, SP - Brasil</p>
          </div>
        </div>

      </div>
    </div>
  );
}