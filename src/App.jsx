import { useEffect, useRef, useState } from 'react'
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
        <img className="hero-logo" src={CAPA_PODCAST} alt="" />
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

        {receita.fotoReceita && (
          <img className="foto-receita" src={receita.fotoReceita} alt={receita.nome} />
        )}

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

const CAPA_PODCAST = '/briga.webp'

const ICONE_X = (
  <Icone>
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </Icone>
)

// Barra de progresso clicável/arrastável, usada no mini player e no player cheio.
function Barra({ tempo, duracao, aoBuscar, className = '' }) {
  const progresso = duracao ? (tempo / duracao) * 100 : 0
  const buscar = (e) => {
    if (!duracao) return
    const { left, width } = e.currentTarget.getBoundingClientRect()
    aoBuscar(Math.min(Math.max((e.clientX - left) / width, 0), 1) * duracao)
  }
  return (
    <div
      className={`barra ${className}`}
      onClick={buscar}
      role="progressbar"
      aria-valuenow={Math.round(progresso)}
    >
      <div className="barra-preenchida" style={{ width: `${progresso}%` }}>
        <span className="bolinha" />
      </div>
    </div>
  )
}

function Podcasts({ player }) {
  const { episodio: atual, tocando, tocar, alternar } = player
  return (
    <div className="tela">
      <header className="cabecalho playlist">
        <img className="playlist-capa" src={CAPA_PODCAST} alt="" />
        <div>
          <small className="playlist-tipo">Playlist</small>
          <h1>Podcasts</h1>
          <p>
            Brigadeiros Gourmet · {podcasts.length} episódios
          </p>
        </div>
      </header>

      <div className="playlist-acoes">
        <button
          className="botao-tocar-tudo"
          onClick={() => (atual ? alternar() : tocar(0))}
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
          {tocando ? 'Pausar' : 'Tocar tudo'}
        </button>
      </div>

      <ol className="faixas">
        {podcasts.map((p, i) => {
          const ativo = atual?.id === p.id
          return (
            <li
              key={p.id}
              className={`faixa ${ativo ? 'ativa' : ''} ${p.audio ? '' : 'sem-audio'}`}
              onClick={() => p.audio && (ativo ? alternar() : tocar(i))}
            >
              <span className="faixa-num">
                {ativo && tocando ? <span className="equalizador" aria-hidden="true" /> : i + 1}
              </span>
              <div className="faixa-info">
                <strong>{p.titulo}</strong>
                <p>{p.descricao}</p>
              </div>
              <small>{p.audio ? p.duracao : 'em breve'}</small>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function MiniPlayer({ player, aoExpandir }) {
  const { episodio, tocando, tempo, duracao, alternar, buscar, fechar } = player
  if (!episodio) return null
  return (
    <div className="mini-player" onClick={aoExpandir}>
      <Barra tempo={tempo} duracao={duracao} aoBuscar={buscar} className="fina" />
      <div className="mini-player-linha">
        <img src={CAPA_PODCAST} alt="" />
        <div className="mini-player-info">
          <strong>{episodio.titulo}</strong>
          <small>Brigadeiros Gourmet</small>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            alternar()
          }}
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
        <button
          onClick={(e) => {
            e.stopPropagation()
            fechar()
          }}
          aria-label="Fechar player"
        >
          {ICONE_X}
        </button>
      </div>
    </div>
  )
}

function PlayerCheio({ player, aoFechar }) {
  const { episodio, tocando, tempo, duracao, alternar, buscar, pular, fechar, anterior, proximo } =
    player
  if (!episodio) return null
  return (
    <div className="player-cheio">
      <header>
        <button onClick={aoFechar} aria-label="Minimizar">
          <Icone>
            <path d="m6 9 6 6 6-6" />
          </Icone>
        </button>
        <small>Tocando da playlist Podcasts</small>
        <button
          onClick={() => {
            fechar()
            aoFechar()
          }}
          aria-label="Fechar player"
        >
          {ICONE_X}
        </button>
      </header>

      <img className="player-capa" src={CAPA_PODCAST} alt="" />

      <div className="player-texto">
        <h2>{episodio.titulo}</h2>
        <p>{episodio.descricao}</p>
      </div>

      <Barra tempo={tempo} duracao={duracao} aoBuscar={buscar} />
      <div className="player-tempos">
        <small>{formatarTempo(tempo)}</small>
        <small>{formatarTempo(duracao)}</small>
      </div>

      <div className="player-controles">
        <button onClick={anterior} aria-label="Anterior">
          <Icone>
            <path d="M18 6 8 12l10 6z" />
            <path d="M6 5.5v13" />
          </Icone>
        </button>
        <button onClick={() => pular(-15)} aria-label="Voltar 15 segundos">
          <Icone>
            <path d="M11 4 4.5 8.5 11 13" />
            <path d="M4.5 8.5H14a5.5 5.5 0 0 1 0 11H8" />
          </Icone>
        </button>
        <button className="principal" onClick={alternar} aria-label={tocando ? 'Pausar' : 'Tocar'}>
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
        <button onClick={() => pular(15)} aria-label="Avançar 15 segundos">
          <Icone>
            <path d="m13 4 6.5 4.5L13 13" />
            <path d="M19.5 8.5H10a5.5 5.5 0 0 0 0 11h6" />
          </Icone>
        </button>
        <button onClick={proximo} aria-label="Próximo">
          <Icone>
            <path d="M6 6l10 6L6 18z" />
            <path d="M18 5.5v13" />
          </Icone>
        </button>
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

// Um único áudio para todo o app, para a faixa seguir tocando ao trocar de aba.
function usePlayer() {
  const audioRef = useRef(null)
  const [indice, setIndice] = useState(null)
  const [tocando, setTocando] = useState(false)
  const [tempo, setTempo] = useState(0)
  const [duracao, setDuracao] = useState(0)

  const comAudio = podcasts.filter((p) => p.audio)
  const episodio = indice === null ? null : podcasts[indice]

  // Ao trocar de faixa, espera o novo src entrar no DOM para dar play.
  useEffect(() => {
    if (indice !== null) audioRef.current?.play()
  }, [indice])

  const tocar = (i) => {
    if (i === indice) return audioRef.current?.play()
    setTempo(0)
    setDuracao(0)
    setIndice(i)
  }

  const alternar = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.paused ? audio.play() : audio.pause()
  }

  const buscar = (segundos) => {
    if (audioRef.current) audioRef.current.currentTime = segundos
  }

  const pular = (segundos) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.min(Math.max(audio.currentTime + segundos, 0), duracao || 0)
  }

  // Fecha o player e para o áudio.
  const fechar = () => {
    audioRef.current?.pause()
    setIndice(null)
    setTocando(false)
    setTempo(0)
    setDuracao(0)
  }

  // Anda pela lista pulando episódios sem áudio.
  const mover = (passo) => {
    if (indice === null) return false
    for (let i = indice + passo; i >= 0 && i < podcasts.length; i += passo) {
      if (podcasts[i].audio) {
        tocar(i)
        return true
      }
    }
    return false
  }

  const player = {
    episodio,
    tocando,
    tempo,
    duracao,
    tocar,
    alternar,
    buscar,
    pular,
    fechar,
    anterior: () => mover(-1),
    proximo: () => mover(1),
    temAudio: comAudio.length > 0,
  }

  const elemento = episodio?.audio ? (
    <audio
      ref={audioRef}
      src={episodio.audio}
      preload="metadata"
      onPlay={() => setTocando(true)}
      onPause={() => setTocando(false)}
      onEnded={() => {
        // Toca o próximo; se era o último, fecha o player.
        if (!mover(1)) fechar()
      }}
      onTimeUpdate={(e) => setTempo(e.currentTarget.currentTime)}
      onLoadedMetadata={(e) => setDuracao(e.currentTarget.duration)}
    />
  ) : null

  return [player, elemento]
}

function App() {
  const [aba, setAba] = useState('inicio')
  const [receitaAberta, setReceitaAberta] = useState(null)
  const [playerAberto, setPlayerAberto] = useState(false)
  const [player, audioElemento] = usePlayer()

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
    tela = <Podcasts player={player} />
  } else {
    tela = <Guia abrirReceita={abrirReceita} />
  }

  return (
    <div className={`app ${player.episodio ? 'com-player' : ''}`}>
      {tela}
      {audioElemento}
      {playerAberto && <PlayerCheio player={player} aoFechar={() => setPlayerAberto(false)} />}
      <MiniPlayer player={player} aoExpandir={() => setPlayerAberto(true)} />
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
