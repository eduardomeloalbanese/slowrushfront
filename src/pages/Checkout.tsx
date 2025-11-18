import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Checkout() {
  const navigate = useNavigate();
  
  // Controle das etapas (1, 2 ou 3)
  const [currentStep, setCurrentStep] = useState(1);
  
  // Estado dos dados do formulário
  const [formData, setFormData] = useState({
    horasTrabalhadas: '',
    intensidadeReunioes: '', // Ex: 'Baixa (0-2h)'
    sentimento: '',          // Ex: 'rad', 'stress'
    comentario: ''
  });

  // Atualiza o estado conforme o usuário digita/clica
  const updateData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- CONVERSORES PARA A API (O Java espera números) ---

  // Converte o código do sentimento para número (1 a 5)
  const converterSentimento = (sentimento: string) => {
    switch (sentimento) {
      case 'rad': return 1;   // Ótimo
      case 'ok': return 2;    // Bem
      case 'tired': return 4; // Cansado
      case 'stress': return 5;// Estressado
      default: return 3;      // Neutro
    }
  };

  // Converte a string de reuniões para um número estimado
  const converterReunioes = (intensidade: string) => {
      if (intensidade.includes('Baixa')) return 2;
      if (intensidade.includes('Média')) return 4;
      if (intensidade.includes('Alta')) return 8;
      return 0;
  };

  // --- FUNÇÃO DE ENVIO (CONEXÃO COM A API) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Prepara o objeto JSON para o Java
    const dadosParaAPI = {
        horasTrabalhadas: parseFloat(formData.horasTrabalhadas),
        numeroReunioes: converterReunioes(formData.intensidadeReunioes),
        nivelEstresse: converterSentimento(formData.sentimento),
        // Opcional: se quiser enviar o comentário, adicione no DTO do Java ou concatene aqui
        // descricao: formData.comentario 
    };

    console.log("Enviando payload:", dadosParaAPI);

    try {
        // 2. Pega o link do Render do arquivo .env
        const baseUrl = import.meta.env.VITE_API_URL; 

        // 3. Faz a requisição POST
        const response = await fetch(`${baseUrl}/api/registros`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosParaAPI)
        });

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        // 4. Recebe a resposta (FeedbackDTO)
        const feedback = await response.json();

        // 5. Exibe o Alerta Inteligente (A lógica do SlowRush)
        if (feedback.alertaCritico) {
            // Cenário de Burnout (Vermelho)
            alert(`⚠️ ALERTA DE BEM-ESTAR:\n\n${feedback.mensagem}`);
        } else {
            // Cenário Normal (Verde)
            alert(`✅ Tudo certo:\n\n${feedback.mensagem}`);
        }

        // Redireciona para a home
        navigate('/'); 

    } catch (error) {
        console.error("Erro ao enviar:", error);
        alert("Erro de conexão. Verifique se a API está rodando no Render.");
    }
  };

  // Configuração visual dos ícones de humor
  const moods = [
    { value: 'rad', label: 'Radiante', icon: '🤩', color: 'bg-emerald-100 border-emerald-500 text-emerald-700' },
    { value: 'ok', label: 'Bem', icon: '🙂', color: 'bg-blue-100 border-blue-500 text-blue-700' },
    { value: 'tired', label: 'Cansado', icon: '😴', color: 'bg-yellow-100 border-yellow-500 text-yellow-700' },
    { value: 'stress', label: 'Estressado', icon: '🤯', color: 'bg-red-100 border-red-500 text-red-700' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        
        {/* CABEÇALHO AZUL */}
        <div className="bg-blue-600 dark:bg-blue-800 p-6 text-white text-center">
          <h1 className="text-2xl font-bold mb-2">Check-out Diário</h1>
          <p className="opacity-90 text-sm">Registre seu dia para cuidarmos de você.</p>
          
          {/* Barra de Progresso (Bolinhas) */}
          <div className="flex items-center justify-center mt-6 gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  step === currentStep 
                    ? 'bg-white text-blue-600 scale-110 shadow-lg' 
                    : step < currentStep 
                      ? 'bg-emerald-400 text-white' 
                      : 'bg-blue-400/50 text-blue-100'
                }`}>
                  {step < currentStep ? '✓' : step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 rounded mx-2 ${
                    step < currentStep ? 'bg-emerald-400' : 'bg-blue-400/50'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit} className="p-8">
          
          {/* PASSO 1: HORAS TRABALHADAS */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <span className="text-2xl">⏱️</span> Como foi sua carga horária?
              </h2>
              
              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2 font-medium">
                  Quantas horas você trabalhou hoje?
                </label>
                <input 
                  type="number" 
                  placeholder="Ex: 8" 
                  className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-2xl font-bold text-center focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                  value={formData.horasTrabalhadas}
                  onChange={(e) => updateData('horasTrabalhadas', e.target.value)}
                  autoFocus
                />
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-300 text-sm">
                <strong>Dica:</strong> Se passou de 9h, considere descansar amanhã de manhã.
              </div>
            </div>
          )}

          {/* PASSO 2: REUNIÕES */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <span className="text-2xl">📅</span> Intensidade de Reuniões
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300">Você teve tempo para focar no trabalho (Deep Work)?</p>
              
              <div className="grid grid-cols-1 gap-3">
                {['Baixa (0-2h)', 'Média (2-4h)', 'Alta (+4h)'].map((nivel) => (
                  <button
                    type="button"
                    key={nivel}
                    onClick={() => updateData('intensidadeReunioes', nivel)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.intensidadeReunioes === nivel
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold shadow-sm'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-gray-500 dark:text-white'
                    }`}
                  >
                    {nivel}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PASSO 3: SENTIMENTO */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <span className="text-2xl">🧠</span> Como você se sente agora?
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {moods.map((m) => (
                  <button
                    type="button"
                    key={m.value}
                    onClick={() => updateData('sentimento', m.value)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                      formData.sentimento === m.value
                        ? m.color + ' font-bold shadow-md scale-105'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 grayscale hover:grayscale-0'
                    }`}
                  >
                    <span className="text-4xl mb-2">{m.icon}</span>
                    <span className="dark:text-white">{m.label}</span>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2 text-sm">Algo a acrescentar? (Opcional)</label>
                <textarea 
                  rows={2}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ex: Tive dificuldade com..."
                  value={formData.comentario}
                  onChange={(e) => updateData('comentario', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* BOTÕES DE NAVEGAÇÃO (VOLTAR / PRÓXIMO / ENVIAR) */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-6 py-2 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Voltar
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={currentStep === 1 && !formData.horasTrabalhadas}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-md transition-all"
              >
                Próximo
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg shadow-md transition-all transform hover:scale-105"
              >
                Finalizar Check-out
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}