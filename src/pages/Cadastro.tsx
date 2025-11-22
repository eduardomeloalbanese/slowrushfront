import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export function Cadastro() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState<"gestor" | "colaborador">("gestor");

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
    empresa: "",
    codigoEquipe: "",
  });

  // Limpa campos específicos quando troca de aba (mesma lógica do Login)
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      empresa: "",
      codigoEquipe: "",
    }));
  }, [userType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    if (userType === "gestor" && !formData.empresa) {
      alert("O campo 'Empresa' é obrigatório para gestores.");
      return;
    }

    if (userType === "colaborador" && !formData.codigoEquipe) {
      alert("O campo 'Código da Equipe' é obrigatório para colaboradores.");
      return;
    }

    console.log("Cadastro enviado:", {
      ...formData,
      tipo: userType,
    });

    alert(
      `Conta de ${userType === "gestor" ? "Gestor" : "Colaborador"} criada com sucesso!`
    );

    // Redirecionamento separado por tipo (igual ao Login)
    if (userType === "gestor") {
      navigate("/dashboard");
    } else {
      navigate("/checkout"); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] animate-fade-in px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors duration-300">

        {/* ABAS */}
        <div className="flex border-b border-gray-100 dark:border-gray-700">
          <button
            onClick={() => setUserType("gestor")}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${
              userType === "gestor"
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            Sou Gestor (RH)
          </button>

          <button
            onClick={() => setUserType("colaborador")}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${
              userType === "colaborador"
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            Sou Colaborador
          </button>
        </div>

        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Crie sua conta grátis</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              {userType === "gestor"
                ? "Comece a monitorar a saúde da sua equipe hoje."
                : "Junte-se ao seu time e cuide do seu bem-estar."}
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                name="nome"
                required
                value={formData.nome}
                onChange={handleChange}
                placeholder="Seu nome"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                E-mail Corporativo
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="voce@empresa.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              />
            </div>

            {/* Campo dinâmico */}
            {userType === "gestor" ? (
              <div className="animate-fade-in">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  name="empresa"
                  required
                  value={formData.empresa}
                  onChange={handleChange}
                  placeholder="Ex: Tech Solutions"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                />
              </div>
            ) : (
              <div className="animate-fade-in">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Código da Equipe
                </label>
                <input
                  type="text"
                  name="codigoEquipe"
                  required
                  value={formData.codigoEquipe}
                  onChange={handleChange}
                  placeholder="Ex: #MKT-2025"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">* Peça este código ao seu gestor.</p>
              </div>
            )}

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Senha
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              />
            </div>

            {/* Confirmar senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirmar Senha
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              />
            </div>

            {/* Botão */}
            <button
              type="submit"
              className={`w-full py-3 px-4 text-white font-bold rounded-lg shadow-md mt-4 transition-transform transform hover:-translate-y-0.5 ${
                userType === "gestor"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-emerald-500 hover:bg-emerald-600"
              }`}
            >
              {userType === "gestor" ? "Cadastrar Empresa" : "Cadastrar-se"}
            </button>
          </form>

          {/* Link para login */}
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Já possui uma conta?{" "}
            <Link
              to="/login"
              className="font-bold text-blue-600 hover:underline dark:text-blue-400"
            >
              Fazer Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
