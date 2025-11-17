import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* 1. O Menu aparece em todas as páginas */}
      <Navbar />

      {/* 2. O "Miolo" (recheio) troca baseado na URL */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route path="/homepage" element={<Home/>} />
          <Route path="*" element={<div className="text-center mt-10 text-red-500 pt-16">404 - Não encontrado</div>} />
        </Routes>
      </main>

      {/* 3. O Rodapé aparece em todas as páginas */}
      <Footer />
      
    </div>
  );
}

export default App;