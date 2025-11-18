import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Checkout() {
  const navigate = useNavigate();
  
  // Estado para controlar qual etapa está aparecendo (1, 2 ou 3)
  const [currentStep, setCurrentStep] = useState(1);
  
  // Estado para guardar as respostas
  const [formData, setFormData] = useState({
    horasTrabalhadas: '',
    intensidadeReunioes: '', // Baixa, Média, Alta
    sentimento: '', // Feliz, Cansado, Estressado, etc.
    comentario: ''
  });

  // Função para atualizar os dados
  const updateData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Função para enviar (Simulando API)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aqui entraria o fetch() para sua API Java
    console.log("Dados do Check-out:", formData);

    // Feedback visual simples
    alert("Check-out realizado! Bom descanso.");
    navigate('/'); // Volta para a Home ou Login
  };

  // Ícones SVG para cada humor
  const moods = [
    { value: 'rad', label: 'Radiante', icon: '🤩', color: 'bg-emerald-100 border-emerald-500 text-emerald-700' },
    { value: 'ok', label: 'Bem', icon: '🙂', color: 'bg-blue-100 border-blue-500 text-blue-700' },
    { value: 'tired', label: 'Cansado', icon: '😴', color: 'bg-yellow-100 border-yellow-500 text-yellow-700' },
    { value: 'stress', label: 'Estressado', icon: '🤯', color: 'bg-red-100 border-red-500 text-red-700' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        
        {/* --- CABEÇALHO E BARRA DE PROGRESSO --- */}
        <div className="bg-blue-600 dark:bg-blue-800 p-6 text-white text-center">
          <h1 className="text-2xl font-bold mb-2">Check-out Diário</h1>
          <p className="opacity-90 text-sm">Registre seu dia para cuidarmos de você.</p>
          
          {/* Stepper Manual (Sem biblioteca) */}
          <div className="flex items-center justify-center mt-6 gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  step === currentStep 
                    ? 'bg-white text-blue-600 scale-110 shadow-lg' 
                    : step < currentStep 
                      ? 'bg-emerald-400 text-white' // Já passou
                      : 'bg-blue-400/50 text-blue-100' // Futuro
                }`}>
                  {step < currentStep ? '✓' : step}
                </div>
                {/* Linha conectora (menos no último) */}
                {step < 3 && (
                  <div className={`w-12 h-1 rounded mx-2 ${
                    step < currentStep ? 'bg-emerald-400' : 'bg-blue-400/50'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- CONTEÚDO DO FORMULÁRIO --- */}
        <form onSubmit={handleSubmit} className="p-8">
          
          {/* ETAPA 1: HORAS (Foco em Carga de Trabalho) */}
          {currentStep === 1 && (
            <div className="animate-fade-in space-y-6">
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

          {/* ETAPA 2: REUNIÕES (Foco em Toxicidade de Agenda) */}
          {currentStep === 2 && (
            <div className="animate-fade-in space-y-6">
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

          {/* ETAPA 3: SENTIMENTO (Dados Qualitativos) */}
          {currentStep === 3 && (
            <div className="animate-fade-in space-y-6">
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

          {/* --- BOTÕES DE NAVEGAÇÃO --- */}
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
              <div></div> /* Espaçador vazio */
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={currentStep === 1 && !formData.horasTrabalhadas} // Validação simples
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