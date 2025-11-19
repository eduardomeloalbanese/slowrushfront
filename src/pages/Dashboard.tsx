import { useState, useEffect, useMemo } from 'react';

// Tipagem dos dados
interface CheckoutData {
  id: number;
  funcionario: string;
  horasTrabalhadas: string;
  intensidadeReunioes: string;
  sentimento: string;
  comentario: string;
  data: string;
}

export function Dashboard() {
  const [checkouts, setCheckouts] = useState<CheckoutData[]>([]);
  
  // AQUI ESTAVA O "ERRO": Criamos, mas não usávamos. Agora vamos usar!
  const [loading, setLoading] = useState(true);
  
  const [filter, setFilter] = useState<'todos' | 'risco' | 'bem'>('todos');
  const [selectedCheckout, setSelectedCheckout] = useState<CheckoutData | null>(null);

  const [stats, setStats] = useState({
    mediaHoras: 0,
    riscoBurnout: 0,
    totalCheckouts: 0,
    humorPredominante: 'Neutro',
    distribuicaoHumor: { rad: 0, ok: 0, tired: 0, stress: 0 }
  });

  useEffect(() => {
    const carregarDados = () => {
      // Simula um pequeno delay para você ver o loading acontecendo (UX)
      setTimeout(() => {
        const dadosLocais = localStorage.getItem('slowrush_db');
        let dados: CheckoutData[] = [];

        if (dadosLocais) {
          dados = JSON.parse(dadosLocais);
        } else {
          dados = [
            { id: 1, funcionario: "Ana Silva", horasTrabalhadas: "9.5", intensidadeReunioes: "Alta (+4h)", sentimento: "stress", comentario: "Muitas reuniões seguidas.", data: "19/11/2025 18:00" },
            { id: 2, funcionario: "Carlos Lima", horasTrabalhadas: "8", intensidadeReunioes: "Média (2-4h)", sentimento: "ok", comentario: "Dia produtivo.", data: "19/11/2025 17:30" },
            { id: 3, funcionario: "Beatriz Souza", horasTrabalhadas: "10", intensidadeReunioes: "Alta (+4h)", sentimento: "tired", comentario: "Hora extra.", data: "18/11/2025 20:00" },
          ];
        }

        setCheckouts(dados);
        calcularEstatisticas(dados);
        setLoading(false); // Aqui desligamos o loading
      }, 800); // 0.8 segundos de espera fake
    };

    carregarDados();
    window.addEventListener('storage', carregarDados);
    return () => window.removeEventListener('storage', carregarDados);
  }, []);

  const calcularEstatisticas = (dados: CheckoutData[]) => {
    if (dados.length === 0) return;

    const totalHoras = dados.reduce((acc, curr) => acc + Number(curr.horasTrabalhadas), 0);
    const media = (totalHoras / dados.length).toFixed(1);
    const emRisco = dados.filter(d => Number(d.horasTrabalhadas) > 9 || ['stress', 'tired'].includes(d.sentimento)).length;

    const humorMap: any = { rad: 0, ok: 0, tired: 0, stress: 0 };
    dados.forEach(d => { if(humorMap[d.sentimento] !== undefined) humorMap[d.sentimento]++ });
    const humorVencedor = Object.keys(humorMap).reduce((a, b) => humorMap[a] > humorMap[b] ? a : b);

    setStats({
      mediaHoras: Number(media),
      riscoBurnout: emRisco,
      totalCheckouts: dados.length,
      humorPredominante: traduzirHumor(humorVencedor),
      distribuicaoHumor: humorMap
    });
  };

  const exportarCSV = () => {
    const headers = ["ID,Funcionario,Data,Horas,Reunioes,Sentimento,Comentario"];
    const rows = checkouts.map(c => 
      `${c.id},"${c.funcionario}","${c.data}",${c.horasTrabalhadas},"${c.intensidadeReunioes}",${c.sentimento},"${c.comentario}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "slowrush_relatorio.csv");
    document.body.appendChild(link);
    link.click();
  };

  const dadosFiltrados = useMemo(() => {
    if (filter === 'todos') return checkouts;
    if (filter === 'risco') return checkouts.filter(d => Number(d.horasTrabalhadas) > 9 || ['stress', 'tired'].includes(d.sentimento));
    if (filter === 'bem') return checkouts.filter(d => ['ok', 'rad'].includes(d.sentimento));
    return checkouts;
  }, [checkouts, filter]);

  const traduzirHumor = (cod: string) => {
    switch(cod) {
      case 'rad': return 'Radiante 🤩';
      case 'ok': return 'Estável 🙂';
      case 'tired': return 'Cansado 😴';
      case 'stress': return 'Estressado 🤯';
      default: return 'Neutro';
    }
  };

  const getBarWidth = (count: number) => {
    return stats.totalCheckouts > 0 ? (count / stats.totalCheckouts) * 100 : 0;
  };

  // --- AQUI ESTÁ A CORREÇÃO: USANDO A VARIÁVEL LOADING ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 animate-fade-in">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Carregando dados da equipe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in pb-12 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 pt-14">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Painel de Controle</h1>
          <p className="text-gray-600 dark:text-gray-400">Visão estratégica de saúde e performance.</p>
        </div>
        <button 
          onClick={exportarCSV}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-all mt-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          Baixar Relatório CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-red-500 relative overflow-hidden">
          <div className="absolute right-4 top-4 opacity-10 text-red-500">
             <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"/></svg>
          </div>
          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Risco Burnout</h3>
          <p className="text-4xl font-bold text-red-600 dark:text-red-400 mt-2">{stats.riscoBurnout}</p>
          <span className="text-xs font-medium text-red-500 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full mt-2 inline-block">
            Ação Necessária
          </span>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-blue-500 relative overflow-hidden">
           <div className="absolute right-4 top-4 opacity-10 text-blue-500">
             <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Média Horas</h3>
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.mediaHoras}h</p>
          <span className={`text-xs font-medium px-2 py-1 rounded-full mt-2 inline-block ${stats.mediaHoras > 9 ? 'text-yellow-600 bg-yellow-100' : 'text-green-600 bg-green-100'}`}>
            {stats.mediaHoras > 9 ? 'Acima do ideal' : 'Dentro da meta'}
          </span>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-purple-500">
          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Clima Predominante</h3>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-4 truncate">{stats.humorPredominante}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-emerald-500">
          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Check-outs</h3>
          <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{stats.totalCheckouts}</p>
          <span className="text-xs text-gray-400 mt-2 block">Dados atualizados agora</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-10">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Termômetro Emocional da Equipe</h3>
        <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
          <div style={{ width: `${getBarWidth(stats.distribuicaoHumor.rad)}%` }} className="bg-emerald-400 h-full transition-all duration-1000" title="Radiante"></div>
          <div style={{ width: `${getBarWidth(stats.distribuicaoHumor.ok)}%` }} className="bg-blue-400 h-full transition-all duration-1000" title="Bem"></div>
          <div style={{ width: `${getBarWidth(stats.distribuicaoHumor.tired)}%` }} className="bg-yellow-400 h-full transition-all duration-1000" title="Cansado"></div>
          <div style={{ width: `${getBarWidth(stats.distribuicaoHumor.stress)}%` }} className="bg-red-500 h-full transition-all duration-1000" title="Estressado"></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400 px-1">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-400"></div> Radiante ({stats.distribuicaoHumor.rad})</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-400"></div> Bem ({stats.distribuicaoHumor.ok})</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-400"></div> Cansado ({stats.distribuicaoHumor.tired})</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500"></div> Estressado ({stats.distribuicaoHumor.stress})</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Feed de Registros</h2>
          <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <button 
              onClick={() => setFilter('todos')}
              className={`px-4 py-1.5 text-sm rounded-md font-medium transition-all ${filter === 'todos' ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700'}`}
            >
              Todos
            </button>
            <button 
              onClick={() => setFilter('risco')}
              className={`px-4 py-1.5 text-sm rounded-md font-medium transition-all ${filter === 'risco' ? 'bg-white dark:bg-gray-600 text-red-600 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700'}`}
            >
              Em Risco
            </button>
            <button 
              onClick={() => setFilter('bem')}
              className={`px-4 py-1.5 text-sm rounded-md font-medium transition-all ${filter === 'bem' ? 'bg-white dark:bg-gray-600 text-emerald-600 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700'}`}
            >
              Bem-estar
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Colaborador</th>
                <th className="px-6 py-4 font-semibold">Horas</th>
                <th className="px-6 py-4 font-semibold">Reuniões</th>
                <th className="px-6 py-4 font-semibold">Sentimento</th>
                <th className="px-6 py-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {dadosFiltrados.map((checkout) => (
                <tr key={checkout.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900 dark:text-white">{checkout.funcionario}</div>
                    <div className="text-xs text-gray-500">{checkout.data}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${Number(checkout.horasTrabalhadas) > 9 ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                      {checkout.horasTrabalhadas}h
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300 text-sm">
                    {checkout.intensidadeReunioes}
                  </td>
                  <td className="px-6 py-4">
                     {checkout.sentimento === 'stress' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200">🤯 Estressado</span>}
                     {checkout.sentimento === 'tired' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200">😴 Cansado</span>}
                     {checkout.sentimento === 'ok' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">🙂 Bem</span>}
                     {checkout.sentimento === 'rad' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">🤩 Radiante</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedCheckout(checkout)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-semibold hover:underline"
                    >
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {dadosFiltrados.length === 0 && (
            <div className="p-12 text-center text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-2">📭</div>
              <p>Nenhum registro encontrado para este filtro.</p>
            </div>
          )}
        </div>
      </div>

      {selectedCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative border border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => setSelectedCheckout(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              ✕
            </button>
            
            <div className="mb-6">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Detalhes do Registro</span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{selectedCheckout.funcionario}</h2>
              <p className="text-sm text-gray-500">{selectedCheckout.data}</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Horas</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white">{selectedCheckout.horasTrabalhadas}h</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Reuniões</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-white mt-1">{selectedCheckout.intensidadeReunioes}</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-2">Comentário do Colaborador</p>
                <p className="text-gray-700 dark:text-gray-200 italic">
                  "{selectedCheckout.comentario || "Sem comentários adicionais."}"
                </p>
              </div>

              {['stress', 'tired'].includes(selectedCheckout.sentimento) && (
                 <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg flex items-start gap-3">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <p className="text-sm font-bold text-red-800 dark:text-red-200">Alerta de Risco</p>
                      <p className="text-xs text-red-600 dark:text-red-300 mt-1">Recomendamos agendar uma conversa 1:1 para entender o contexto.</p>
                    </div>
                 </div>
              )}
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedCheckout(null)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Fechar
              </button>
              <button 
                onClick={() => { alert("Mensagem enviada no Slack (Simulação)"); setSelectedCheckout(null); }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition-colors"
              >
                Contatar Colaborador
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}