export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-6 mt-auto shadow-inner transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} SlowRush - Global Solution. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};