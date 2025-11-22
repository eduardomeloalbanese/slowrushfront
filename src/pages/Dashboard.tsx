import React, { useState, useEffect, useMemo } from 'react';

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
  const [loading, setLoading] = useState(true);
  const [isApiOnline, setIsApiOnline] = useState(false);
  
  const [filter, setFilter] = useState<'todos' | 'risco' | 'bem'>('todos');
  const [selectedCheckout, setSelectedCheckout] = useState<CheckoutData | null>(null);
  const [isEditing, setIsEditing] = useState(false); // Controle de edição

  const [stats, setStats] = useState({
    mediaHoras: 0,
    riscoBurnout: 0,
    totalCheckouts: 0,
    humorPredominante: 'Neutro',
    distribuicaoHumor: { rad: 0, ok: 0, tired: 0, stress: 0 }
  });

  // --- CARREGAR DADOS ---
  const fetchDados = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      console.log(`🔄 Buscando dados em: ${apiUrl}/api/checkouts`);

      const response = await fetch(`${apiUrl}/api/checkouts`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Falha na API');

      const dadosJava = await response.json();
      setCheckouts(dadosJava);
      calcularEstatisticas(dadosJava);
      setIsApiOnline(true);
    } catch (error) {
      console.warn("⚠️ API Java indisponível. Usando dados locais/mock.", error);
      setIsApiOnline(false);
      // Mock simplificado para não quebrar
      setCheckouts([
          { id: 1, funcionario: "Ana Silva (Mock)", horasTrabalhadas: "9.5", intensidadeReunioes: "Alta (+4h)", sentimento: "stress", comentario: "Muitas reuniões.", data: "19/11/2025 18:00" },
          { id: 2, funcionario: "Carlos Lima (Mock)", horasTrabalhadas: "8", intensidadeReunioes: "Média (2-4h)", sentimento: "ok", comentario: "Dia produtivo.", data: "19/11/2025 17:30" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDados();
  }, []);

  // --- DELETAR REGISTRO ---
  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este registro?")) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/checkouts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error("Erro ao excluir");

      // Atualiza a lista local removendo o item
      setCheckouts(prev => prev.filter(item => item.id !== id));
      // Recalcula estatísticas
      const novaLista = checkouts.filter(item => item.id !== id);
      calcularEstatisticas(novaLista);
      
      alert("Registro excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("Não foi possível excluir (Verifique se o Java tem o endpoint DELETE).");
    }
  };

  // --- ATUALIZAR REGISTRO (EDITAR) ---
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCheckout) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/checkouts/${selectedCheckout.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedCheckout),
      });

      if (!response.ok) throw new Error("Erro ao atualizar");

      alert("Registro atualizado com sucesso!");
      setIsEditing(false);
      setSelectedCheckout(null);
      fetchDados(); // Recarrega a lista para garantir dados frescos
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Não foi possível salvar as alterações (Verifique se o Java tem o endpoint PUT).");
    }
  };


  // --- CÁLCULOS E AUXILIARES ---
  const calcularEstatisticas = (dados: CheckoutData[]) => {
    if (dados.length === 0) {
       setStats({ mediaHoras: 0, riscoBurnout: 0, totalCheckouts: 0, humorPredominante: 'Sem dados', distribuicaoHumor: { rad: 0, ok: 0, tired: 0, stress: 0 } });
       return;
    }
    const totalHoras = dados.reduce((acc, curr) => acc + Number(curr.horasTrabalhadas), 0);
    const media = (totalHoras / dados.length).toFixed(1);
    const emRisco = dados.filter(d => {
      const s = (d.sentimento || '').toLowerCase();
      return Number(d.horasTrabalhadas) > 9 || s.includes('stress') || s.includes('tired') || s.includes('estressado') || s.includes('cansado');
    }).length;
    
    const humorMap: any = { rad: 0, ok: 0, tired: 0, stress: 0 };
    dados.forEach(d => { 
      const sent = (d.sentimento || '').toLowerCase();
      if (sent.includes('rad') || sent.includes('feliz')) humorMap.rad++;
      else if (sent.includes('ok') || sent.includes('bem')) humorMap.ok++;
      else if (sent.includes('tired') || sent.includes('cansado')) humorMap.tired++;
      else if (sent.includes('stress') || sent.includes('estressado')) humorMap.stress++;
    });
    
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
    if (checkouts.length === 0) return alert("Sem dados.");
    const headers = ["ID,Funcionario,Data,Horas,Reunioes,Sentimento,Comentario"];
    const rows = checkouts.map(c => `${c.id},"${c.funcionario}","${c.data}",${c.horasTrabalhadas},"${c.intensidadeReunioes}",${c.sentimento},"${c.comentario}"`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "slowrush_relatorio.csv");
    document.body.appendChild(link);
    link.click();
  };

  const dadosFiltrados = useMemo(() => {
    if (filter === 'todos') return checkouts;
    if (filter === 'risco') return checkouts.filter(d => Number(d.horasTrabalhadas) > 9 || ['stress', 'tired'].some(x => (d.sentimento || '').toLowerCase().includes(x)));
    if (filter === 'bem') return checkouts.filter(d => ['ok', 'rad'].some(x => (d.sentimento || '').toLowerCase().includes(x)));
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

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:text-white">Carregando...</div>;

  return (
    <div className="min-h-screen animate-fade-in pb-12 relative">
      
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 pt-20">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Painel de Controle</h1>
          <div className="flex items-center gap-2 mt-1">
            {isApiOnline ? <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">● Online (Java)</span> : <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">⚠ Offline</span>}
          </div>
        </div>
        <button onClick={exportarCSV} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow mt-2 self-start md:self-center">Baixar Relatório CSV</button>
      </div>

      {/* KPIs e Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-red-500">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Risco Burnout</h3>
            <p className="text-4xl font-bold text-red-600 dark:text-red-400 mt-2">{stats.riscoBurnout}</p>
         </div>
         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Média Horas</h3>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.mediaHoras}h</p>
         </div>
         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-purple-500">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Clima</h3>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-4 truncate">{stats.humorPredominante}</p>
         </div>
         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-emerald-500">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Total</h3>
            <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{stats.totalCheckouts}</p>
         </div>
      </div>

      {/* Termômetro */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-10">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Termômetro Emocional</h3>
        <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
          <div style={{ width: `${getBarWidth(stats.distribuicaoHumor.rad)}%` }} className="bg-emerald-400 h-full transition-all duration-1000"></div>
          <div style={{ width: `${getBarWidth(stats.distribuicaoHumor.ok)}%` }} className="bg-blue-400 h-full transition-all duration-1000"></div>
          <div style={{ width: `${getBarWidth(stats.distribuicaoHumor.tired)}%` }} className="bg-yellow-400 h-full transition-all duration-1000"></div>
          <div style={{ width: `${getBarWidth(stats.distribuicaoHumor.stress)}%` }} className="bg-red-500 h-full transition-all duration-1000"></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
           <span>Radiante ({stats.distribuicaoHumor.rad})</span>
           <span>Bem ({stats.distribuicaoHumor.ok})</span>
           <span>Cansado ({stats.distribuicaoHumor.tired})</span>
           <span>Estressado ({stats.distribuicaoHumor.stress})</span>
        </div>
      </div>

      {/* Tabela com Ações */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Feed de Registros</h2>
          <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <button onClick={() => setFilter('todos')} className={`px-4 py-1.5 text-sm rounded-md font-medium transition-all ${filter === 'todos' ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700'}`}>Todos</button>
            <button onClick={() => setFilter('risco')} className={`px-4 py-1.5 text-sm rounded-md font-medium transition-all ${filter === 'risco' ? 'bg-white dark:bg-gray-600 text-red-600 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700'}`}>Em Risco</button>
            <button onClick={() => setFilter('bem')} className={`px-4 py-1.5 text-sm rounded-md font-medium transition-all ${filter === 'bem' ? 'bg-white dark:bg-gray-600 text-emerald-600 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700'}`}>Bem-estar</button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Colaborador</th>
                <th className="px-6 py-4">Horas</th>
                <th className="px-6 py-4">Sentimento</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {dadosFiltrados.map((checkout) => {
                const s = (checkout.sentimento || '').toLowerCase();
                return (
                  <tr key={checkout.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 dark:text-white">{checkout.funcionario}</div>
                      <div className="text-xs text-gray-500">{checkout.data}</div>
                    </td>
                    <td className="px-6 py-4"><span className="font-bold dark:text-white">{checkout.horasTrabalhadas}h</span></td>
                    <td className="px-6 py-4">
                       {s.includes('stress') && <span className="text-red-500 font-bold">🤯 Estressado</span>}
                       {s.includes('tired') && <span className="text-yellow-500 font-bold">😴 Cansado</span>}
                       {s.includes('ok') && <span className="text-blue-500 font-bold">🙂 Bem</span>}
                       {s.includes('rad') && <span className="text-emerald-500 font-bold">🤩 Radiante</span>}
                       {!s && <span className="text-gray-400 italic">Não informado</span>}
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-3">
                      <button onClick={() => { setSelectedCheckout(checkout); setIsEditing(false); }} className="text-blue-600 hover:underline text-sm">Ver</button>
                      <button onClick={() => { setSelectedCheckout(checkout); setIsEditing(true); }} className="text-yellow-600 hover:underline text-sm">Editar</button>
                      <button onClick={() => handleDelete(checkout.id)} className="text-red-600 hover:underline text-sm">Excluir</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {dadosFiltrados.length === 0 && <div className="p-12 text-center text-gray-500">📭 Nenhum registro encontrado.</div>}
        </div>
      </div>

      {/* Modal de Detalhes / Edição */}
      {selectedCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-700">
             
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-2xl font-bold dark:text-white">
                 {isEditing ? 'Editar Registro' : selectedCheckout.funcionario}
               </h2>
               <button onClick={() => setSelectedCheckout(null)} className="text-gray-500 hover:text-gray-700 dark:hover:text-white">✕</button>
             </div>

             {isEditing ? (
               <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-300">Horas Trabalhadas</label>
                    <input 
                      type="number" // Campo numérico para horas (Java espera string, mas input number é melhor UX)
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                      value={selectedCheckout.horasTrabalhadas}
                      onChange={(e) => setSelectedCheckout({...selectedCheckout, horasTrabalhadas: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-300">Comentário</label>
                    <textarea 
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                      rows={3}
                      value={selectedCheckout.comentario}
                      onChange={(e) => setSelectedCheckout({...selectedCheckout, comentario: e.target.value})}
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setSelectedCheckout(null)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">Cancelar</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Salvar</button>
                  </div>
               </form>
             ) : (
               <>
                 <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                      <p className="text-xs text-gray-500 uppercase">Horas</p>
                      <p className="font-bold dark:text-white">{selectedCheckout.horasTrabalhadas}h</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                      <p className="text-xs text-gray-500 uppercase">Reuniões</p>
                      <p className="font-bold dark:text-white">{selectedCheckout.intensidadeReunioes}</p>
                    </div>
                 </div>
                 <p className="text-gray-600 dark:text-gray-300 italic mb-6">"{selectedCheckout.comentario || "Sem comentários."}"</p>
                 
                 <div className="flex justify-end gap-2">
                    <button onClick={() => { setIsEditing(true); }} className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200">Editar</button>
                    <button onClick={() => setSelectedCheckout(null)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">Fechar</button>
                 </div>
               </>
             )}
          </div>
        </div>
      )}
    </div>
  );
}