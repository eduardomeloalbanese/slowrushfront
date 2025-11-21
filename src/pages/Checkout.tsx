import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Checkout() {
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSending, setIsSending] = useState(false);

  // Estado inicial dos dados
  const [formData, setFormData] = useState({
    funcionario: '', 
    horasTrabalhadas: '',
    intensidadeReunioes: '', 
    sentimento: '', // Começa vazio
    comentario: ''
  });

  // Scroll suave para o topo ao mudar de etapa
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const updateData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Função de envio real para a API Java
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede o reload da página
    
    // Confirmação simples antes de enviar
    if (!window.confirm("Deseja finalizar e enviar seu check-out?")) return;

    setIsSending(true);
    
    // Payload formatado para o Java
    const payload = {
      funcionario: formData.funcionario || "Colaborador Anônimo",
      horasTrabalhadas: formData.horasTrabalhadas,
      intensidadeReunioes: formData.intensidadeReunioes,
      sentimento: formData.sentimento,
      comentario: formData.comentario,
      data: new Date().toISOString() 
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      console.log(`🚀 Enviando dados para: ${apiUrl}/api/checkouts`, payload);

      const response = await fetch(`${apiUrl}/api/checkouts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Erro no envio: ${response.status}`);
      }

      // Se der certo
      alert("Check-out salvo com sucesso! Veja seu registro no Dashboard.");
      navigate('/dashboard');

    } catch (error) {
      console.error("❌ Erro ao salvar:", error);
      alert("Erro ao conectar com o servidor. Verifique sua conexão.");
    } finally {
      setIsSending(false);
    }
  };

  // Opções de Humor com Ícones
  const moods = [
    { value: 'rad', label: 'Radiante', icon: '🤩', color: 'bg-emerald-100 border-emerald-500 text-emerald-700' },
    { value: 'ok', label: 'Bem', icon: '🙂', color: 'bg-blue-100 border-blue-500 text-blue-700' },
    { value: 'tired', label: 'Cansado', icon: '😴', color: 'bg-yellow-100 border-yellow-500 text-yellow-700' },
    { value: 'stress', label: 'Estressado', icon: '🤯', color: 'bg-red-100 border-red-500 text-red-700' },
  ];

  // Validação final: Só permite enviar se tiver sentimento selecionado
  const isFormValid = formData.horasTrabalhadas && formData.sentimento;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        
        {/* Header Azul */}
        <div className="bg-blue-600 dark:bg-blue-800 p-6 text-white text-center">
          <h1 className="text-2xl font-bold mb-2">Check-out Diário</h1>
          <p className="opacity-90 text-sm">Registre seu dia para cuidarmos de você.</p>
          
          {/* Barra de Progresso (Stepper) */}
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
                {step < 3 && <div className={`w-12 h-1 rounded mx-2 ${step < currentStep ? 'bg-emerald-400' : 'bg-blue-400/50'}`}></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Formulário Principal */}
        <form 
          onSubmit={handleSubmit} 
          className="p-8"
          // Bloqueia o envio acidental com ENTER
          onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
        >
          
          {/* --- PASSO 1: IDENTIFICAÇÃO E HORAS --- */}
          {currentStep === 1 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <span className="text-2xl">👋</span> Olá! Vamos começar?
              </h2>
              
              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2 font-medium">Qual seu nome?</label>
                <input 
                  type="text" 
                  placeholder="Ex: Eduardo Melo" 
                  className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                  value={formData.funcionario}
                  onChange={(e) => updateData('funcionario', e.target.value)}
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2 font-medium">Quantas horas você trabalhou hoje?</label>
                <input 
                  type="number" 
                  placeholder="Ex: 8" 
                  className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-2xl font-bold text-center focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                  value={formData.horasTrabalhadas}
                  onChange={(e) => updateData('horasTrabalhadas', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* --- PASSO 2: REUNIÕES --- */}
          {currentStep === 2 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <span className="text-2xl">📅</span> Intensidade de Reuniões
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {['Baixa (0-2h)', 'Média (2-4h)', 'Alta (+4h)'].map((nivel) => (
                  <button
                    type="button" // Garante que é botão normal, não submit
                    key={nivel}
                    onClick={() => updateData('intensidadeReunioes', nivel)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${formData.intensidadeReunioes === nivel ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:text-white'}`}
                  >
                    {nivel}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* --- PASSO 3: SENTIMENTO --- */}
          {currentStep === 3 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <span className="text-2xl">🧠</span> Como você se sente?
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {moods.map((m) => (
                  <button
                    type="button" // Garante que é botão normal, não submit
                    key={m.value}
                    onClick={() => updateData('sentimento', m.value)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all hover:scale-105 ${formData.sentimento === m.value ? m.color + ' font-bold scale-105' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 grayscale hover:grayscale-0'}`}
                  >
                    <span className="text-4xl mb-2">{m.icon}</span>
                    <span className="dark:text-white">{m.label}</span>
                  </button>
                ))}
              </div>
              <textarea 
                rows={2}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Comentário (Opcional)"
                value={formData.comentario}
                onChange={(e) => updateData('comentario', e.target.value)}
              />
            </div>
          )}

          {/* --- RODAPÉ COM BOTÕES DE AÇÃO --- */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            
            {/* Botão Voltar (só aparece a partir do passo 2) */}
            {currentStep > 1 ? (
              <button 
                type="button" 
                onClick={() => setCurrentStep(prev => prev - 1)} 
                className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium"
              >
                Voltar
              </button>
            ) : <div></div>}

            {/* Botão Próximo ou Finalizar */}
            {currentStep < 3 ? (
              <button 
                type="button" 
                onClick={() => setCurrentStep(prev => prev + 1)}
                // Validação: Só avança se tiver Nome e Horas
                disabled={currentStep === 1 && (!formData.horasTrabalhadas || !formData.funcionario)}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-md transition-all"
              >
                Próximo
              </button>
            ) : (
              <button 
                type="submit" // Único botão que envia de verdade
                disabled={isSending || !isFormValid} // Desabilita se enviando ou se formulário inválido (sem sentimento)
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-md transition-all transform hover:scale-105 flex items-center gap-2"
              >
                {isSending ? 'Enviando...' : 'Finalizar'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}