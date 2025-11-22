import { Link } from 'react-router-dom';


interface Integrante {
  nome: string;
  rm: string;
  turma: string;
  fotoUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}

// Dados da Equipe 
const equipe: Integrante[] = [
  {
    nome: "Eduardo de Melo Albanese",
    rm: "RM561790",
    turma: "1TDSPX",
    fotoUrl: "public/foto_eduardo.png", // Certifique-se de que o arquivo existe em public/fotos/
    githubUrl: "https://github.com/eduardomeloalbanese",
    linkedinUrl: "https://www.linkedin.com/in/eduardo-de-melo-albanese-605043236/",
  },
  {
    nome: "Guilherme de Andrade Martini",
    rm: "RM566087",
    turma: "1TDSPX",
    fotoUrl: "public/foto_guilherme.jpg",
    githubUrl: "https://github.com/Guilhermedev2807",
    linkedinUrl: "https://www.linkedin.com/in/guilherme-de-andrade-martini-994648348",
  },
  {
    nome: "Nathan Gonçalves Pereira Mendes",
    rm: "RM564666",
    turma: "1TDSPX",
    fotoUrl: "public/foto_nathan.jpg",
    githubUrl: "http://github.com/nathangpm",
    linkedinUrl: "https://www.linkedin.com/in/nathangpmendes",
  },
];

export const Integrantes = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-fade-in">
      
      {/* Header da Seção */}
      <div className="bg-blue-600 dark:bg-blue-800 py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Nossa Equipe</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto px-4">
          Conheça os desenvolvedores da turma 1TDSPX responsáveis pelo projeto SlowRush.
        </p>
      </div>

      {/* Grid de Cards */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {equipe.map((membro) => (
            <div 
              key={membro.rm}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              {/* Foto com Fallback e Zoom no Hover */}
              <div className="h-170 overflow-hidden bg-gray-200 dark:bg-gray-700 relative group">
                <img 
                    src={membro.fotoUrl} 
                    alt={`Foto de ${membro.nome}`}
                    // Mude object-top para object-center
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" 
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${membro.nome}&background=0D8ABC&color=fff&size=256`;
                    }}
                    />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-white font-medium">{membro.turma}</span>
                </div>
              </div>
              
              {/* Conteúdo do Card */}
              <div className="p-6 flex flex-col flex-grow text-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {membro.nome}
                </h2>
                <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-3 py-1 rounded-full font-semibold mb-4 mx-auto">
                  {membro.rm}
                </span>
                
                <div className="mt-auto flex justify-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  {/* Botão GitHub */}
                  <a 
                    href={membro.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all"
                    aria-label="GitHub"
                    title="Ver GitHub"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-1.5 6-6.5a4.2 4.2 0 0 0-1-3.2A3.6 3.6 0 0 0 16.5 2.5c0 0-1-.3-3.5 1.4a12.3 12.3 0 0 0-6.5 0C4 2.2 3 2.5 3 2.5a3.6 3.6 0 0 0-1 3.2A4.2 4.2 0 0 0 1 9c0 5 3 6.5 6 6.5a4.8 4.8 0 0 0-1 3.5v4"/></svg>
                  </a>
                  
                  {/* Botão LinkedIn */}
                  <a 
                    href={membro.linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all"
                    aria-label="LinkedIn"
                    title="Ver LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/homepage" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            ← Voltar para a Home
          </Link>
        </div>
      </div>
    </div>
  );
};