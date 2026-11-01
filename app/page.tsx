import ClientBoot from "./client-boot";
export default function Home() {
  return (
    <>
      <a className="skip" href="#app-root">
        Ir à composição de mesas
      </a>
      <header>
        <a href="/">
          cortejo<span>UM ESTUDO SOBRE ENCONTROS</span>
        </a>
        <a href="/api-docs.html">O método ↗</a>
      </header>
      <main>
        <section className="salon">
          <div className="intro">
            <span>CASA ABERTA / MESAS POSSÍVEIS</span>
            <h1>
              À mesa,
              <br />o acaso tem
              <br />
              <em>companhia.</em>
            </h1>
          </div>
          <canvas
            id="salon"
            role="img"
            aria-label="Composição das mesas e convidados fictícios, detalhada na lista"
          />
          <div className="key">
            <span>● Estúdio</span>
            <span>● Oficina</span>
            <span>● Ateliê</span>
          </div>
          <figure>
            <img
              src="/media/subject.webp"
              width="1200"
              height="800"
              loading="lazy"
              alt="Salão real vazio, referência para um encontro imaginário"
            />
            <figcaption>A sala é real. Os encontros são imaginados.</figcaption>
          </figure>
        </section>
        <section className="invitation">
          <div className="invitation-head">
            <span>UM CONVITE À COMPOSIÇÃO</span>
            <h2>
              Quem senta
              <br />
              com quem?
            </h2>
            <p>
              Afinidades aproximam. Diferenças abrem conversas. Experimente uma
              disposição que respeite os seus limites.
            </p>
          </div>
          <div id="app-root">Abrindo o salão…</div>
        </section>
      </main>
      <footer>
        <span>Gustavo Paz / Cortejo</span>
        <a href="/credits.html">Créditos ↗</a>
        <a href="https://github.com/gustapaz/cortejo">Código ↗</a>
        <button id="motion-toggle" aria-pressed="false">
          Pausar movimento
        </button>
      </footer>
      <ClientBoot />
    </>
  );
}
