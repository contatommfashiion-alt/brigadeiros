import { useRef, useState } from 'react'
import { receitas, guia, podcasts } from './dados.js'
import './App.css'

// Ícones de linha (traço fino), 24x24.
const Icone = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

const ICONES = {
  inicio: (
    <Icone>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10.5V20h14v-9.5" />
      <path d="M10 20v-6h4v6" />
    </Icone>
  ),
  receitas: (
    <Icone>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
      <path d="M9 8h7M9 11.5h5" />
    </Icone>
  ),
  podcasts: (
    <Icone>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="13" width="4" height="7" rx="1.5" />
      <rect x="17" y="13" width="4" height="7" rx="1.5" />
    </Icone>
  ),
  guia: (
    <Icone>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M7.5 9.5 3 6.5v11l4.5-3" />
      <path d="M16.5 9.5 21 6.5v11l-4.5-3" />
    </Icone>
  ),
}

const ABAS = [
  { id: 'inicio', rotulo: 'Início' },
  { id: 'receitas', rotulo: 'Receitas' },
  { id: 'podcasts', rotulo: 'Podcasts' },
  { id: 'guia', rotulo: 'Guia' },
]

function CardImagem({ item, className = '', children }) {
  const estilo = item.imagem
    ? { backgroundImage: `url(${item.imagem})` }
    : { background: item.cor }
  return (
    <div className={`imagem ${className}`} style={estilo}>
      {!item.imagem && (
        <span className="emoji" aria-hidden="true">
          {item.emoji}
        </span>
      )}
      {children}
    </div>
  )
}

// Seção com título, link de ação e setas no cabeçalho para rolar o carrossel.
function SecaoCarrossel({ titulo, acao, onAcao, children }) {
  const ref = useRef(null)
  const rolar = (direcao) => {
    const el = ref.current
    if (!el) return
    const card = el.firstElementChild
    const passo = card ? card.offsetWidth + 12 : el.clientWidth * 0.8
    el.scrollBy({ left: direcao * passo, behavior: 'smooth' })
  }
  return (
    <section className="secao">
      <div className="secao-topo">
        <h2>{titulo}</h2>
        <div className="secao-acoes">
          <button className="link" onClick={onAcao}>
            {acao}
          </button>
          <button className="seta" onClick={() => rolar(-1)} aria-label="Anterior">
            ‹
          </button>
          <button className="seta" onClick={() => rolar(1)} aria-label="Próximo">
            ›
          </button>
        </div>
      </div>
      <div className="carrossel" ref={ref}>
        {children}
      </div>
    </section>
  )
}

function Inicio({ irPara, abrirReceita }) {
  const destaque = receitas[0]
  return (
    <div className="tela">
      <section className="hero" style={{ background: destaque.cor }}>
        <span className="hero-emoji" aria-hidden="true">
          🍫
        </span>
        <div className="hero-texto">
          <p className="marca">🍬 Brigadeiro Bliss</p>
          <h1>Brigadeiros Gourmet</h1>
          <p>Descubra receitas, recheios e coberturas para encantar.</p>
          <button className="botao-destaque" onClick={() => irPara('receitas')}>
            Ver Receitas
          </button>
        </div>
      </section>

      <SecaoCarrossel titulo="🎧 Podcasts" acao="Ver todos" onAcao={() => irPara('podcasts')}>
        {podcasts.map((p) => (
          <article className="card-podcast" key={p.id} onClick={() => irPara('podcasts')}>
            <div className="play">▶</div>
            <strong>{p.titulo}</strong>
            <span>{p.duracao}</span>
          </article>
        ))}
      </SecaoCarrossel>

      <SecaoCarrossel
        titulo="Guia de Recheios & Coberturas"
        acao="Ver guia"
        onAcao={() => irPara('guia')}
      >
        {[...guia.recheios, ...guia.coberturas].slice(0, 6).map((g) => (
          <article className="card-mini" key={g.id} onClick={() => irPara('guia')}>
            <CardImagem item={g} className="mini" />
            <strong>{g.nome}</strong>
          </article>
        ))}
      </SecaoCarrossel>

      <section className="secao">
        <div className="secao-topo">
          <h2>Receitas populares</h2>
        </div>
        <div className="lista">
          {receitas.slice(0, 3).map((r) => (
            <article className="card-lista" key={r.id} onClick={() => abrirReceita(r)}>
              <CardImagem item={r} className="thumb" />
              <div>
                <strong>{r.nome}</strong>
                <p>{r.resumo}</p>
                <small>
                  ⏱ {r.tempo} · {r.dificuldade}
                </small>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function Receitas({ abrirReceita }) {
  const [busca, setBusca] = useState('')
  const filtradas = receitas.filter((r) =>
    r.nome.toLowerCase().includes(busca.toLowerCase()),
  )
  return (
    <div className="tela">
      <header className="cabecalho">
        <h1>Receitas</h1>
        <input
          type="search"
          placeholder="Buscar receita..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </header>
      <div className="grade">
        {filtradas.map((r) => (
          <article className="card-grade" key={r.id} onClick={() => abrirReceita(r)}>
            <CardImagem item={r} className="capa" />
            <strong>{r.nome}</strong>
            <small>
              ⏱ {r.tempo} · {r.dificuldade}
            </small>
          </article>
        ))}
        {filtradas.length === 0 && <p className="vazio">Nenhuma receita encontrada.</p>}
      </div>
    </div>
  )
}

function Receita({ receita, voltar }) {
  const [feitos, setFeitos] = useState({})
  const marcar = (i) => setFeitos((f) => ({ ...f, [i]: !f[i] }))
  return (
    <div className="tela">
      <CardImagem item={receita} className="capa-grande">
        <button className="voltar" onClick={voltar} aria-label="Voltar">
          ←
        </button>
      </CardImagem>
      <div className="conteudo">
        <h1>{receita.nome}</h1>
        <p className="resumo">{receita.resumo}</p>
        <div className="infos">
          <span>⏱ {receita.tempo}</span>
          <span>🍬 {receita.rendimento}</span>
          <span>📊 {receita.dificuldade}</span>
        </div>

        <h2>Ingredientes</h2>
        <ul className="ingredientes">
          {receita.ingredientes.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>

        <h2>Modo de preparo</h2>
        <ol className="passos">
          {receita.passos.map((passo, i) => (
            <li
              key={i}
              className={feitos[i] ? 'feito' : ''}
              onClick={() => marcar(i)}
            >
              <span className="numero">{i + 1}</span>
              <span>{passo}</span>
            </li>
          ))}
        </ol>

        {receita.dicas && (
          <div className="dica">
            <strong>💡 Dica</strong>
            <p>{receita.dicas}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function Podcasts() {
  const [tocando, setTocando] = useState(null)
  return (
    <div className="tela">
      <header className="cabecalho">
        <h1>Podcasts</h1>
        <p>Ouça enquanto prepara seus doces.</p>
      </header>
      <div className="lista">
        {podcasts.map((p) => (
          <article className="card-episodio" key={p.id}>
            <button
              className={`play ${tocando === p.id ? 'ativo' : ''}`}
              onClick={() => setTocando(tocando === p.id ? null : p.id)}
              aria-label={tocando === p.id ? 'Pausar' : 'Tocar'}
            >
              {tocando === p.id ? '❚❚' : '▶'}
            </button>
            <div>
              <strong>{p.titulo}</strong>
              <p>{p.descricao}</p>
              <small>{p.duracao}</small>
              {tocando === p.id && (
                <div className="player">
                  {p.audio ? (
                    <audio src={p.audio} controls autoPlay />
                  ) : (
                    <small className="aviso">Áudio em breve.</small>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function Guia() {
  const [aba, setAba] = useState('recheios')
  const itens = guia[aba]
  return (
    <div className="tela">
      <header className="cabecalho">
        <h1>Guia</h1>
        <div className="segmentos">
          <button className={aba === 'recheios' ? 'ativo' : ''} onClick={() => setAba('recheios')}>
            Recheios
          </button>
          <button className={aba === 'coberturas' ? 'ativo' : ''} onClick={() => setAba('coberturas')}>
            Coberturas
          </button>
        </div>
      </header>
      <div className="lista">
        {itens.map((g) => (
          <article className="card-lista" key={g.id}>
            <CardImagem item={g} className="thumb" />
            <div>
              <strong>{g.nome}</strong>
              <p>{g.descricao}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function App() {
  const [aba, setAba] = useState('inicio')
  const [receitaAberta, setReceitaAberta] = useState(null)

  const irPara = (id) => {
    setReceitaAberta(null)
    setAba(id)
    window.scrollTo(0, 0)
  }
  const abrirReceita = (r) => {
    setReceitaAberta(r)
    window.scrollTo(0, 0)
  }

  let tela
  if (receitaAberta) {
    tela = <Receita receita={receitaAberta} voltar={() => setReceitaAberta(null)} />
  } else if (aba === 'inicio') {
    tela = <Inicio irPara={irPara} abrirReceita={abrirReceita} />
  } else if (aba === 'receitas') {
    tela = <Receitas abrirReceita={abrirReceita} />
  } else if (aba === 'podcasts') {
    tela = <Podcasts />
  } else {
    tela = <Guia />
  }

  return (
    <div className="app">
      {tela}
      <nav className="rodape">
        {ABAS.map((a) => (
          <button
            key={a.id}
            className={aba === a.id && !receitaAberta ? 'ativo' : ''}
            onClick={() => irPara(a.id)}
          >
            <span className="icone">{ICONES[a.id]}</span>
            <span className="rotulo">{a.rotulo}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App
