import { type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Anchor, ArrowDownRight, ArrowRight, Clock3, Fish, Footprints, MapPin, Menu, Navigation, Phone, Sun, UtensilsCrossed, Waves, Wind, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const assets = {
  hero: '/assets/snapsave-app_1297575332541716_hd_1789402834661.mp4',
  marina: '/assets/Zrzut_ekranu_2026-09-14_181436_1789402705092.png',
  deck: '/assets/Zrzut_ekranu_2026-09-14_181503_1789402705093.png',
  storm: '/assets/Zrzut_ekranu_2026-09-14_181531_1789402705093.png',
  dock: '/assets/Zrzut_ekranu_2026-09-14_181548_1789402705093.png',
  smokehouse: '/assets/Zrzut_ekranu_2026-09-14_181618_1789402705093.png',
};

const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Rudzka+244a%2C+44-292+Rybnik%2C+Polska';

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          observer.unobserve(node);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>{children}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="topbar">
      <div className="container-wide topbar-inner">
        <a className="brand" href="#start" onClick={close} aria-label="Przystań Kotwica — strona główna">
          <span className="brand-mark"><Anchor size={20} strokeWidth={1.4} /></span>
          <span className="brand-copy">
            <span className="brand-name">Przystań Kotwica</span>
            <span className="brand-sub">Zalew Rybnicki</span>
          </span>
        </a>
        <nav className="nav-links" aria-label="Główna nawigacja">
          <a href="#atrakcje">Na wodzie</a>
          <a href="#wedzarnia">Wędzarnia</a>
          <a href="#galeria">Zobacz miejsce</a>
          <a href="#kontakt">Dojazd</a>
        </nav>
        <a className="nav-phone" href="tel:+48501593893"><Phone size={15} /> 501 593 893</a>
        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Zamknij menu' : 'Otwórz menu'} aria-expanded={open}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <nav className="mobile-menu" aria-label="Menu mobilne">
          <a href="#atrakcje" onClick={close}>Na wodzie</a>
          <a href="#wedzarnia" onClick={close}>Wędzarnia</a>
          <a href="#galeria" onClick={close}>Zobacz miejsce</a>
          <a href="#kontakt" onClick={close}>Dojazd i godziny</a>
          <a href="tel:+48501593893" onClick={close}>Zadzwoń: 501 593 893</a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="start" className="hero">
      <div className="hero-media" aria-hidden="true">
        <video autoPlay muted loop playsInline poster={assets.marina}>
          <source src={assets.hero} type="video/mp4" />
        </video>
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <Reveal>
          <div className="hero-kicker">Rybnik · Zalew Rybnicki</div>
          <h1 className="hero-title display">Zejdź nad wodę.<br /><em>Zostań dłużej.</em></h1>
          <p className="hero-intro">Łódki, rowerki wodne i zachody słońca z kominem elektrowni w tle. Rodzinna przystań, do której wraca się dla oddechu.</p>
          <div className="hero-actions">
            <a className="button-light" href="#atrakcje">Wypłyń z nami <ArrowDownRight size={16} /></a>
            <a className="button-ghost" href="tel:+48501593893">Zapytaj o sprzęt <Phone size={15} /></a>
          </div>
          <div className="hero-meta">
            <span><Sun size={15} /> Najlepiej o zachodzie</span>
            <span><Waves size={15} /> Zalew Rybnicki</span>
            <span><Anchor size={15} /> Rudzka 244a</span>
          </div>
        </Reveal>
      </div>
      <div className="scroll-cue">Przewiń, jesteśmy nad wodą</div>
    </section>
  );
}

function Intro() {
  return (
    <section className="intro-section section-pad">
      <div className="container-wide intro-grid">
        <Reveal className="intro-copy">
          <span className="eyebrow">Tu zaczyna się dzień</span>
          <h2 className="section-title">Nie trzeba<br /><em>daleko jechać.</em></h2>
          <p>Wystarczy skręcić w Rudzką i zejść kilka kroków w stronę wody. W Kotwicy czas płynie trochę inaczej — między pierwszym chlupnięciem wiosła a ostatnim światłem nad zalewem.</p>
          <p className="intro-note">Przystań prowadzi rodzina. Sprzęt wydajemy osobiście, bez pośpiechu i z uśmiechem.</p>
        </Reveal>
        <Reveal className="intro-visual" delay={1}>
          <div className="intro-image main"><img src={assets.marina} alt="Czerwone rowerki wodne i łodzie w Przystani Kotwica" /></div>
          <div className="intro-image inset"><img src={assets.deck} alt="Taras przystani nad Zalewem Rybnickim o zachodzie" /></div>
          <div className="image-caption">Zalew Rybnicki / 50°08′N</div>
        </Reveal>
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section id="atrakcje" className="offer-section section-pad">
      <div className="container-wide">
        <Reveal className="offer-head">
          <div>
            <span className="eyebrow">Główna atrakcja</span>
            <h2 className="section-title">Woda robi<br />całą robotę.</h2>
          </div>
          <p>Wybierz swój rytm. Spokojny rejs przy brzegu, trochę prędkości albo leniwe pedałowanie we dwoje.</p>
        </Reveal>
        <div className="offer-grid">
          <Reveal className="offer-card">
            <img src={assets.storm} alt="Czerwony rowerek wodny na tle Zalewu Rybnickiego" />
            <a className="offer-action" href="tel:+48501593893" aria-label="Zadzwoń i zapytaj o rowerki wodne"><Phone size={14} /><span>Zapytaj o sprzęt</span></a>
            <div className="offer-card-body"><span className="offer-number">01 / NAJCHĘTNIEJ WYBIERANE</span><h3>Rowerki wodne</h3><p>Klasyka letniego popołudnia. Wsiadasz, odbijasz od pomostu i już po chwili masz swój kawałek zalewu.</p></div>
          </Reveal>
          <Reveal className="offer-card" delay={1}>
            <img src={assets.dock} alt="Łódź motorowa przy pomoście" />
            <a className="offer-action" href="tel:+48501593893" aria-label="Zadzwoń i zapytaj o łodzie"><Phone size={14} /><span>Zapytaj o sprzęt</span></a>
            <div className="offer-card-body"><span className="offer-number">02 / DLA CIEKAWYCH</span><h3>Łódki</h3><p>Więcej przestrzeni, dalej od brzegu. Zapytaj o dostępny sprzęt.</p></div>
          </Reveal>
          <Reveal className="offer-card" delay={2}>
            <img src={assets.marina} alt="Jachty zacumowane przy przystani" />
            <a className="offer-action" href="tel:+48501593893" aria-label="Zadzwoń do Przystani Kotwica"><Phone size={14} /><span>Zadzwoń do nas</span></a>
            <div className="offer-card-body"><span className="offer-number">03 / NA SPOKOJNIE</span><h3>Przystań</h3><p>Miejsce na chwilę przy stole, nad wodą i z widokiem na daleki brzeg.</p></div>
          </Reveal>
        </div>
        <Reveal className="offer-bottom">
          <span>Nie prowadzimy rezerwacji online — zadzwoń, sprawdzimy dostępność.</span>
          <a href="tel:+48501593893">501 593 893 <ArrowRight size={15} /></a>
        </Reveal>
      </div>
    </section>
  );
}

function DetailsBand() {
  return (
    <section className="details-band" aria-label="Najważniejsze informacje">
      <div className="container-wide details-row">
        <div className="detail"><Clock3 size={20} /><div><small>Dziś otwarte</small><strong>Pon–Pt 12:00–21:00</strong></div></div>
        <div className="detail"><Sun size={20} /><div><small>Weekend</small><strong>Sob 10:00–23:00 · Nd 10:00–21:00</strong></div></div>
        <div className="detail"><Phone size={20} /><div><small>Rezerwacje sprzętu</small><strong><a href="tel:+48501593893">501 593 893</a></strong></div></div>
      </div>
    </section>
  );
}

function Smokehouse() {
  return (
    <section id="wedzarnia" className="smoke-section section-pad">
      <div className="container-wide smoke-grid">
        <Reveal className="smoke-visual">
          <img src={assets.smokehouse} alt="Ryby w tradycyjnej wędzarni Przystani Kotwica" />
          <div className="smoke-stamp">prosto<br />z wędzarni</div>
        </Reveal>
        <Reveal className="smoke-copy" delay={1}>
          <span className="eyebrow">Po rejsie smakuje najlepiej</span>
          <h2 className="section-title">Dym, sól<br />i dobry <em>moment.</em></h2>
          <p>Nasza wędzarnia pachnie tak, że trudno przejść obok obojętnie. Ryby przygotowujemy na miejscu — złote, soczyste, z charakterem. Najlepiej smakują na tarasie, kiedy słońce schodzi za elektrownię.</p>
          <ul className="smoke-list">
            <li><Fish size={17} /> Ryby wędzone na miejscu</li>
            <li><UtensilsCrossed size={17} /> Coś dobrego po zejściu z wody</li>
            <li><Wind size={17} /> Zapach, który prowadzi do przystani</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="galeria" className="gallery-section">
      <div className="container-wide">
        <Reveal className="gallery-head">
          <div><span className="eyebrow">Zobacz miejsce</span><h2 className="section-title">Jedna przystań,<br />wiele kadrów.</h2></div>
          <p>Od spokojnej tafli po granatową burzę. Zalew nigdy nie wygląda dwa razy tak samo.</p>
        </Reveal>
      </div>
      <div className="container-wide gallery-track">
        <Reveal className="gallery-item"><img src={assets.deck} alt="Taras i pomost o zachodzie słońca" /><span className="gallery-label">taras nad wodą</span></Reveal>
        <Reveal className="gallery-item" delay={1}><img src={assets.marina} alt="Widok na elektrownię nad zalewem" /><span className="gallery-label">widok na Rybnik</span></Reveal>
        <Reveal className="gallery-item" delay={2}><img src={assets.dock} alt="Czerwone łódki przy brzegu" /><span className="gallery-label">pomost kotwicy</span></Reveal>
        <Reveal className="gallery-item" delay={3}><img src={assets.storm} alt="Ciemne chmury nad przystanią" /><span className="gallery-label">przed burzą</span></Reveal>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="kontakt" className="visit-section section-pad">
      <div className="container-wide visit-grid">
        <Reveal className="visit-copy">
          <span className="eyebrow">Wpadnij nad wodę</span>
          <h2 className="section-title">Będziemy<br />na miejscu.</h2>
          <p>Znajdziesz nas przy Rudzkiej 244a, 44-292 Rybnik. Zadzwoń przed przyjazdem, jeśli chcesz sprawdzić dostępność sprzętu.</p>
          <div className="hours" aria-label="Godziny otwarcia">
            <div className="hours-row"><span>Poniedziałek – Piątek</span><strong>12:00 – 21:00</strong></div>
            <div className="hours-row"><span>Sobota</span><strong>10:00 – 23:00</strong></div>
            <div className="hours-row"><span>Niedziela</span><strong>10:00 – 21:00</strong></div>
          </div>
        </Reveal>
        <Reveal className="map-card" delay={1}>
          <div className="map-grid" />
          <div className="map-pin"><MapPin size={24} /></div>
          <div className="map-info">
            <div><h3>Przystań Kotwica</h3><p>Rudzka 244a · 44-292 Rybnik</p></div>
            <a className="button-light" href={directionsUrl} target="_blank" rel="noreferrer">Wyznacz trasę <Navigation size={14} /></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="cta-band">
      <div className="container-wide cta-content">
        <Reveal>
          <span className="eyebrow">Do zobaczenia na pomoście</span>
          <h2>Weź wolne<br />popołudnie.</h2>
        </Reveal>
        <Reveal className="cta-action" delay={1}>
          <a className="button-light" href="tel:+48501593893">Zadzwoń do nas <Phone size={15} /></a>
          <a className="button-ghost" href="mailto:kontakt@przystankotwica.pl">Napisz wiadomość <ArrowRight size={15} /></a>
          <span>501 593 893 · Rudzka 244a, Rybnik</span>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container-wide footer-row">
        <div className="footer-brand">Przystań Kotwica</div>
        <div>Rodzinna przystań nad Zalewem Rybnickim</div>
        <nav className="footer-links" aria-label="Nawigacja stopki">
          <a href="#start">Początek</a><a href="#atrakcje">Oferta</a><a href="#kontakt">Kontakt</a>
        </nav>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <main className="site-shell">
      <Header />
      <Hero />
      <Intro />
      <Offer />
      <DetailsBand />
      <Smokehouse />
      <Gallery />
      <Visit />
      <FinalCta />
      <Footer />
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;