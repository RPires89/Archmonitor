import { useState } from "react";
import { Bell, Search, Star, LogIn, FileText, ChevronLeft, User, Bookmark } from "lucide-react";

function Login({ onLogin }: { onLogin: (user: any) => void }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (email && senha) {
      onLogin({ nome: "Arquiteto Exemplo", email });
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-center">Acessar o ArchMonitor</h2>
        <input className="w-full border p-2 rounded" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border p-2 rounded" type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <button className="w-full bg-black text-white p-2 rounded flex justify-center items-center gap-2" onClick={handleLogin}>
          <LogIn className="w-4 h-4" /> Entrar
        </button>
      </div>
    </div>
  );
}

function Detalhes({ licitacao, voltar }: { licitacao: any; voltar: () => void }) {
  return (
    <div className="p-4 space-y-6">
      <button onClick={voltar} className="flex items-center gap-2 text-sm text-blue-500 hover:underline">
        <ChevronLeft className="w-4 h-4" /> Voltar
      </button>
      <h1 className="text-2xl font-bold">{licitacao.titulo}</h1>
      <p><strong>Órgão:</strong> {licitacao.orgao}</p>
      <p><strong>Modalidade:</strong> {licitacao.modalidade}</p>
      <p><strong>Prazo:</strong> {licitacao.prazo}</p>
      <p><strong>Descrição:</strong> Projeto de arquitetura para {licitacao.titulo.toLowerCase()} com visita técnica obrigatória e exigência de RT.</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
        <FileText className="w-4 h-4" /> Baixar Edital
      </button>
    </div>
  );
}

export default function App() {
  const [usuario, setUsuario] = useState<any>(null);
  const [detalhe, setDetalhe] = useState<any>(null);
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [verFavoritos, setVerFavoritos] = useState(false);
  const [search, setSearch] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroModalidade, setFiltroModalidade] = useState("");

  const licitacoes = [
    { id: 1, titulo: "Concurso para Escola Pública em SP", orgao: "Prefeitura de São Paulo", modalidade: "Concurso de Projeto", prazo: "10/07/2025", estado: "SP" },
    { id: 2, titulo: "Licitação de Reforma de Praça - MG", orgao: "Prefeitura de BH", modalidade: "Tomada de Preços", prazo: "12/07/2025", estado: "MG" },
    { id: 3, titulo: "Projetos Urbanísticos - RJ", orgao: "Governo do RJ", modalidade: "Concorrência Pública", prazo: "15/07/2025", estado: "RJ" }
  ];

  const resultados = licitacoes.filter((l) =>
    l.titulo.toLowerCase().includes(search.toLowerCase()) &&
    (filtroEstado ? l.estado === filtroEstado : true) &&
    (filtroModalidade ? l.modalidade === filtroModalidade : true)
  );

  const toggleFavorito = (id: number) => {
    setFavoritos((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };

  const Favoritos = () => {
    const lista = licitacoes.filter((l) => favoritos.includes(l.id));
    return (
      <div className="p-4 space-y-4">
        <button onClick={() => setVerFavoritos(false)} className="text-sm text-blue-500 hover:underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Voltar ao painel
        </button>
        <h2 className="text-xl font-bold">Meus Favoritos</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lista.map((l) => (
            <div key={l.id} className="border p-4 rounded shadow">
              <h3 className="font-semibold">{l.titulo}</h3>
              <p><strong>Órgão:</strong> {l.orgao}</p>
              <p><strong>Prazo:</strong> {l.prazo}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!usuario) return <Login onLogin={setUsuario} />;
  if (detalhe) return <Detalhes licitacao={detalhe} voltar={() => setDetalhe(null)} />;
  if (verFavoritos) return <Favoritos />;

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Painel de Licitações</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <User className="w-4 h-4" />
          <span>{usuario.nome}</span>
          <button onClick={() => setVerFavoritos(true)} title="Favoritos">
            <Bookmark className="w-4 h-4 text-blue-600" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <input className="flex-1 border p-2 rounded" placeholder="Buscar por título..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="border p-2 rounded">
          <option value="">Todos os estados</option>
          <option value="SP">SP</option>
          <option value="MG">MG</option>
          <option value="RJ">RJ</option>
        </select>
        <select value={filtroModalidade} onChange={(e) => setFiltroModalidade(e.target.value)} className="border p-2 rounded">
          <option value="">Todas as modalidades</option>
          <option value="Concurso de Projeto">Concurso de Projeto</option>
          <option value="Tomada de Preços">Tomada de Preços</option>
          <option value="Concorrência Pública">Concorrência Pública</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resultados.map((licitacao) => (
          <div key={licitacao.id} className="border p-4 rounded shadow space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">{licitacao.titulo}</h2>
              <button onClick={() => toggleFavorito(licitacao.id)} title="Favoritar">
                <Star className={`w-4 h-4 ${favoritos.includes(licitacao.id) ? "fill-yellow-400 text-yellow-500" : ""}`} />
              </button>
            </div>
            <p className="text-sm text-gray-600"><strong>Órgão:</strong> {licitacao.orgao}</p>
            <p className="text-sm text-gray-600"><strong>Modalidade:</strong> {licitacao.modalidade}</p>
            <p className="text-sm text-gray-600"><strong>Prazo:</strong> {licitacao.prazo}</p>
            <button className="w-full bg-gray-200 hover:bg-gray-300 text-sm py-1 rounded" onClick={() => setDetalhe(licitacao)}>
              Ver Edital
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
