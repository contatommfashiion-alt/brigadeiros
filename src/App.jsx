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
  dica: (
    <Icone>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
    </Icone>
  ),
  conservacao: (
    <Icone>
      <path d="M3 8.5 12 4l9 4.5v8L12 21l-9-4.5z" />
      <path d="M3 8.5 12 13l9-4.5" />
      <path d="M12 13v8" />
    </Icone>
  ),
  atencao: (
    <Icone>
      <path d="M12 4 2.5 20h19z" />
      <path d="M12 10v4.5" />
      <path d="M12 17.5v.01" />
    </Icone>
  ),
  variacao: (
    <Icone>
      <path d="M20 11a8 8 0 0 0-14.5-4.5" />
      <path d="M4 4v4h4" />
      <path d="M4 13a8 8 0 0 0 14.5 4.5" />
      <path d="M20 20v-4h-4" />
    </Icone>
  ),
  nota: (
    <Icone>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
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
  return (
    <div className="tela">
      <section className="hero">
        <div className="hero-texto">
          <h1>Brigadeiros Gourmet</h1>
          <p>Descubra receitas, recheios e coberturas para encantar.</p>
          <button className="botao-destaque" onClick={() => irPara('receitas')}>
            Ver Receitas
            <Icone>
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </Icone>
          </button>
        </div>
      </section>

      <SecaoCarrossel titulo="Podcasts" acao="Ver todos" onAcao={() => irPara('podcasts')}>
        {podcasts.map((p) => (
          <article className="card-podcast" key={p.id} onClick={() => irPara('podcasts')}>
            <div className="play">
              <Icone>
                <path d="M7 4.5v15l12-7.5z" />
              </Icone>
            </div>
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
  const marcar = (chave) => setFeitos((f) => ({ ...f, [chave]: !f[chave] }))
  // Aceita "passos" (um único bloco) ou "preparos" (vários blocos com título).
  const preparos = receita.preparos ?? [{ titulo: 'Modo de preparo', passos: receita.passos }]
  return (
    <div className="tela">
      <CardImagem item={receita} className="capa-grande">
        <button className="voltar" onClick={voltar} aria-label="Voltar">
          ←
        </button>
      </CardImagem>
      <div className="conteudo">
        <h1>{receita.nome}</h1>
        <p className="resumo">{receita.resumo ?? receita.descricao}</p>
        <div className="infos">
          <span>⏱ {receita.tempo}</span>
          <span>🍬 {receita.rendimento}</span>
          {receita.dificuldade && <span>📊 {receita.dificuldade}</span>}
        </div>

        <h2>Ingredientes</h2>
        <ul className="ingredientes">
          {receita.ingredientes.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>

        {receita.paraEnrolar && (
          <>
            <h3>Para enrolar</h3>
            <ul className="ingredientes">
              {receita.paraEnrolar.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </>
        )}

        {preparos.map((bloco, b) => (
          <div key={b}>
            <h2>{bloco.titulo}</h2>
            <ol className="passos">
              {bloco.passos.map((passo, i) => {
                const chave = `${b}-${i}`
                return (
                  <li
                    key={chave}
                    className={feitos[chave] ? 'feito' : ''}
                    onClick={() => marcar(chave)}
                  >
                    <span className="numero">{i + 1}</span>
                    <span>{passo}</span>
                  </li>
                )
              })}
            </ol>
          </div>
        ))}

        {receita.comoUsar && (
          <>
            <h2>Como usar</h2>
            <p className="texto">{receita.comoUsar}</p>
          </>
        )}

        {receita.variacao && (
          <div className="dica variacao">
            <strong>
              {ICONES.variacao} {receita.variacao.titulo}
            </strong>
            <p>{receita.variacao.texto}</p>
          </div>
        )}

        {receita.dicas && (
          <div className="dica">
            <strong>
              {ICONES.dica} Dica
            </strong>
            <p>{receita.dicas}</p>
          </div>
        )}

        {receita.nota && (
          <div className="dica nota">
            <strong>
              {ICONES.nota} {receita.nota.titulo}
            </strong>
            <p>{receita.nota.texto}</p>
          </div>
        )}

        {receita.atencao && (
          <div className="dica atencao">
            <strong>
              {ICONES.atencao} Atenção
            </strong>
            <p>{receita.atencao}</p>
          </div>
        )}

        {receita.conservacao && (
          <div className="dica conservacao">
            <strong>
              {ICONES.conservacao} Conservação
            </strong>
            <p>{receita.conservacao}</p>
          </div>
        )}
      </div>
    </div>
  )
}

const formatarTempo = (s) => {
  if (!Number.isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const seg = Math.floor(s % 60)
  return `${m}:${String(seg).padStart(2, '0')}`
}

function Episodio({ episodio, ativo, aoTocar }) {
  const audioRef = useRef(null)
  const [tocando, setTocando] = useState(false)
  const [tempo, setTempo] = useState(0)
  const [duracao, setDuracao] = useState(0)

  // Pausa este episódio quando outro começa a tocar.
  if (!ativo && tocando) {
    audioRef.current?.pause()
  }

  const alternar = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      aoTocar()
      audio.play()
    } else {
      audio.pause()
    }
  }

  const buscar = (e) => {
    const audio = audioRef.current
    if (!audio || !duracao) return
    const { left, width } = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - left) / width) * duracao
  }

  const semAudio = !episodio.audio
  const progresso = duracao ? (tempo / duracao) * 100 : 0

  return (
    <article className="card-episodio">
      <button
        className={`play ${tocando ? 'ativo' : ''}`}
        onClick={alternar}
        disabled={semAudio}
        aria-label={tocando ? 'Pausar' : 'Tocar'}
      >
        {tocando ? (
          <Icone>
            <path d="M8 5v14" />
            <path d="M16 5v14" />
          </Icone>
        ) : (
          <Icone>
            <path d="M7 4.5v15l12-7.5z" />
          </Icone>
        )}
      </button>
      <div className="episodio-info">
        <strong>{episodio.titulo}</strong>
        <p>{episodio.descricao}</p>
        {semAudio ? (
          <small className="aviso">Áudio em breve · {episodio.duracao}</small>
        ) : (
          <>
            <div className="barra" onClick={buscar} role="progressbar" aria-valuenow={progresso}>
              <div className="barra-preenchida" style={{ width: `${progresso}%` }} />
            </div>
            <small>
              {formatarTempo(tempo)} / {formatarTempo(duracao || 0)}
            </small>
            <audio
              ref={audioRef}
              src={episodio.audio}
              preload="metadata"
              onPlay={() => setTocando(true)}
              onPause={() => setTocando(false)}
              onEnded={() => setTocando(false)}
              onTimeUpdate={(e) => setTempo(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuracao(e.currentTarget.duration)}
            />
          </>
        )}
      </div>
    </article>
  )
}

function Podcasts() {
  const [ativo, setAtivo] = useState(null)
  return (
    <div className="tela">
      <header className="cabecalho">
        <h1>Podcasts</h1>
        <p>Ouça enquanto prepara seus doces.</p>
      </header>
      <div className="lista">
        {podcasts.map((p) => (
          <Episodio key={p.id} episodio={p} ativo={ativo === p.id} aoTocar={() => setAtivo(p.id)} />
        ))}
      </div>
    </div>
  )
}

function Guia({ abrirReceita }) {
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
        {itens.map((g) => {
          const temDetalhe = Boolean(g.passos || g.preparos)
          return (
            <article
              className={`card-lista ${temDetalhe ? '' : 'sem-detalhe'}`}
              key={g.id}
              onClick={temDetalhe ? () => abrirReceita(g) : undefined}
            >
              <CardImagem item={g} className="thumb" />
              <div>
                <strong>{g.nome}</strong>
                <p>{g.descricao}</p>
                {temDetalhe && <small>Ver receita ›</small>}
              </div>
            </article>
          )
        })}
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
    tela = <Guia abrirReceita={abrirReceita} />
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
