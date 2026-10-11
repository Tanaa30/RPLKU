import { FormEvent, useEffect, useMemo, useState } from "react";

const A = "/assets";

type Screen =
  | "login"
  | "register"
  | "reset"
  | "home"
  | "cinemas"
  | "tickets"
  | "detail"
  | "seats"
  | "checkout"
  | "success";

type Movie = {
  id: string;
  title: string;
  image: string;
  tag: string;
  chain: string;
  genre: string;
  rating: string;
  duration: string;
  synopsis: string;
  trailer?: string;
};

const movies: Movie[] = [
  { id: "tunggu-aku-sukses-nanti", title: "Tunggu Aku Sukses Nanti", image: `${A}/2860f.png`, tag: "PRE-SALE", chain: "XXI", genre: "Drama", rating: "R 13+", duration: "1 jam 59 menit", synopsis: "Perjalanan seorang anak muda yang mengejar mimpinya, sembari belajar arti rumah dan orang-orang yang selalu menunggunya.", trailer: "https://youtu.be/Un3tacgTEFA?si=-hGahE6UptXImP--" },
  { id: "miracle-in-cell-no-7", title: "2nd miracle in cell no. 7", image: `${A}/db97e.png`, tag: "NOW SHOWING", chain: "Cinepolis", genre: "Drama", rating: "R 13+", duration: "2 jam 12 menit", synopsis: "Seorang ayah yang salah tuduh kembali diadili, sementara sang anak berusaha membebaskan dirinya dari balik jeruji." },
  { id: "cinta-dalam-ikhlas", title: "Cinta Dalam Ikhlas", image: `${A}/90c81.png`, tag: "NOW SHOWING", chain: "XXI", genre: "Drama", rating: "R 13+", duration: "1 jam 48 menit", synopsis: "Kisah dua insan yang belajar bahwa melepaskan kadang menjadi bentuk cinta yang paling tulus." },
  { id: "seporsi-mie-ayam", title: "Seporsi Mie Ayam Sebelum Mati", image: `${A}/seporsi-mie-ayam.jpg`, tag: "PRE-SALE", chain: "Cinepolis", genre: "Drama", rating: "R 13+", duration: "1 jam 54 menit", synopsis: "Di sebuah warung mie ayam sederhana, seorang pemuda mempertemukan kembali orang-orang yang pernah meninggalkannya." },
  { id: "barbie", title: "Barbie", image: `${A}/barbie.jpg`, tag: "NOW SHOWING", chain: "XXI", genre: "Komedi", rating: "R 13+", duration: "1 jam 54 menit", synopsis: "Barbie mengalami krisis eksistensial dan harus memilih antara dunia fantasi yang sempurna atau kehidupan nyata yang berantakan." },
  { id: "jujutsu-kaisen", title: "Jujutsu Kaisen: Hidden Inventory", image: `${A}/jujutsu-kaisen.jpg`, tag: "NOW SHOWING", chain: "Cinepolis", genre: "Aksi", rating: "R 13+", duration: "1 jam 28 menit", synopsis: "Masa muda Gojo dan Geto saat misi rahasia mengambil jari Ryoumen Sukuna berubah menjadi titik balik sejarah dunia kutukan." },
  { id: "meg-2", title: "Meg 2: The Trench", image: `${A}/meg2.jpg`, tag: "NOW SHOWING", chain: "XXI", genre: "Aksi", rating: "R 17+", duration: "1 jam 56 menit", synopsis: "Ekspedisi ilmiah di dasar samudra berubah menjadi pertarungan hidup melawan predator purba yang tak terbayangkan." },
  { id: "tangled", title: "Tangled", image: `${A}/tangled.jpg`, tag: "NOW SHOWING", chain: "Cinepolis", genre: "Animasi", rating: "SU", duration: "1 jam 40 menit", synopsis: "Seorang pencuri tampan membantu putri berambut emas keluar dari menara untuk pertama kali melihat dunia luar." },
  { id: "frozen-3", title: "Frozen 3", image: `${A}/frozen3.jpg`, tag: "PRE-SALE", chain: "XXI", genre: "Animasi", rating: "SU", duration: "1 jam 45 menit", synopsis: "Ancaman baru dari utara memaksa Anna dan Elsa menghadapi kekuatan yang lebih tua dari Arendelle sendiri." },
  { id: "project-silence", title: "Project Silence", image: `${A}/project-silence.jpg`, tag: "NOW SHOWING", chain: "Cinepolis", genre: "Aksi", rating: "R 17+", duration: "1 jam 50 menit", synopsis: "Kecelakaan beruntun di jembatan berkabut memerangkap para penyintas bersama proyek militer yang gagal dikendalikan." },
  { id: "cruella", title: "Cruella", image: `${A}/cruella.jpg`, tag: "NOW SHOWING", chain: "XXI", genre: "Drama", rating: "R 13+", duration: "2 jam 14 menit", synopsis: "Seorang perancang muda berbakat berubah menjadi penjahat ikonik saat membalas dendam pada mode dan takdirnya." },
  { id: "white-snake", title: "White Snake", image: `${A}/white-snake.jpg`, tag: "NOW SHOWING", chain: "Cinepolis", genre: "Animasi", rating: "R 13+", duration: "1 jam 43 menit", synopsis: "Sepasang siluman ular dan pendekar manusia jatuh cinta di tengah perang antara dua dunia yang saling bermusuhan." },
  { id: "hololive", title: "Hololive: Multiverse of Promotion", image: `${A}/hololive.jpg`, tag: "NOW SHOWING", chain: "XXI", genre: "Animasi", rating: "SU", duration: "1 jam 20 menit", synopsis: "Para Vtuber Hololive terlempar ke dalam dimensi game dan harus bekerja sama untuk kembali ke dunia mereka." },
  { id: "jurassic-world-2", title: "Jurassic World: Fallen Kingdom", image: `${A}/jurassic-world-2.jpg`, tag: "NOW SHOWING", chain: "Cinepolis", genre: "Aksi", rating: "R 13+", duration: "2 jam 8 menit", synopsis: "Island Nublar akan meletus, dan upaya penyelamatan dinosaurus justru membuka ancaman yang jauh lebih berbahaya." },
  { id: "my-little-pony", title: "My Little Pony: The Movie", image: `${A}/my-little-pony.jpg`, tag: "NOW SHOWING", chain: "XXI", genre: "Animasi", rating: "SU", duration: "1 jam 39 menit", synopsis: "Twilight Sparkle dan teman-temannya melawan penakluk kabut untuk menyelamatkan Equestria dari kegelapan." },
  { id: "spiderman-brand-new-day", title: "Spider-Man: Brand New Day", image: `${A}/spiderman-brand-new-day.jpg`, tag: "PRE-SALE", chain: "Cinepolis", genre: "Aksi", rating: "R 13+", duration: "2 jam 5 menit", synopsis: "Setelah peristiwa multiversa, Peter Parker memulai lembaran baru dengan musuh yang tak lagi ia kenali." },
  { id: "inside-out-2", title: "Inside Out 2", image: `${A}/inside-out-2.jpg`, tag: "NOW SHOWING", chain: "XXI", genre: "Animasi", rating: "SU", duration: "1 jam 36 menit", synopsis: "Kedatangan emosi baru di kepala Riley membuat Joy dan kawan-kawan harus menghadapi kekacauan masa remaja." },
  { id: "reawaken-man", title: "Reawaken Man: The Red", image: `${A}/reawaken-man.jpg`, tag: "PRE-SALE", chain: "Cinepolis", genre: "Aksi", rating: "R 17+", duration: "1 jam 58 menit", synopsis: "Seorang pria bangkit dari kematian dengan kekuatan mematikan dan mengejar keadilan di kota yang penuh rahasia." },
];

const TICKET_PRICE = 20000;
const SERVICE_FEE = 2000;
const TICKETS_KEY = "tix-tickets";
const REVIEWS_KEY = "tix-reviews";

const showDates = [
  { day: "28 Jun", sub: "Hari ini" },
  { day: "29 Jun", sub: "Sen" },
  { day: "30 Jun", sub: "Sel" },
  { day: "1 Jul", sub: "Rab" },
];

const cinemaFor = (chain: string) => (chain === "Cinepolis" ? "CINEPOLIS TUNJUNGAN PLAZA" : "TRANSMART NGAGEL XXI");
const fullDate = (index: number) => `${showDates[index].day} 2026`;
const rupiah = (value: number) => `Rp${value.toLocaleString("id-ID")}`;

type Ticket = {
  id: string;
  title: string;
  image: string;
  cinema: string;
  date: string;
  time: string;
  seats: string[];
  method: string;
  total: number;
};

type Booking = {
  movie: Movie;
  date: string;
  time: string;
  seats: string[];
  method: string;
};

type Review = {
  id: string;
  movieId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

const seedReviews: Review[] = [
  { id: "r1", movieId: "tunggu-aku-sukses-nanti", author: "Rani P.", rating: 5, comment: "Ceritanya dekat banget sama keluarga. Aku nangis di 20 menit terakhir, recommended banget!", date: "2 hari lalu" },
  { id: "r2", movieId: "tunggu-aku-sukses-nanti", author: "Dimas A.", rating: 4, comment: "Akting pemain utamanya dapet. Cuma alur awalnya agak lambat menurutku.", date: "5 hari lalu" },
  { id: "r3", movieId: "miracle-in-cell-no-7", author: "Sinta W.", rating: 5, comment: "Sekuelnya tetap sedih sama kayak versi pertama. Siap-siap tisu ya.", date: "1 hari lalu" },
  { id: "r4", movieId: "cinta-dalam-ikhlas", author: "Bayu K.", rating: 4, comment: "Sweet tapi nggak norak. Cocok ditonton bareng pasangan.", date: "3 hari lalu" },
  { id: "r5", movieId: "barbie", author: "Nadia F.", rating: 5, comment: "Jauh lebih dalam dari yang aku kira. Lucu tapi tetap nyentuh isu penting.", date: "6 hari lalu" },
  { id: "r6", movieId: "jujutsu-kaisen", author: "Reza M.", rating: 5, comment: "Visual fight scene-nya gila. Gojo makin keren di arc ini.", date: "4 hari lalu" },
  { id: "r7", movieId: "meg-2", author: "Tio S.", rating: 3, comment: "Seru di bagian aksinya, tapi ceritanya tipis. Buat yang cari hiburan saja oke.", date: "1 minggu lalu" },
  { id: "r8", movieId: "tangled", author: "Melati D.", rating: 5, comment: "Animasinya indah dan musiknya enak. Klasik yang nggak membosankan.", date: "2 minggu lalu" },
  { id: "r9", movieId: "frozen-3", author: "Arga H.", rating: 4, comment: "Elsa tetap memukau. Ceritanya lebih seru dari sekuel sebelumnya.", date: "1 hari lalu" },
  { id: "r10", movieId: "cruella", author: "Putri N.", rating: 5, comment: "Kostum dan musiknya juara. Emma Stone cocok banget peran ini.", date: "3 hari lalu" },
];

const WATCHLIST_KEY = "tix-watchlist";

const authPosters = movies.map(({ title, image }) => ({ title, image }));

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3.1" />
      {!open && <line x1="4" y1="20" x2="20" y2="4" />}
    </svg>
  );
}

function Icon({ name, className = "" }: { name: "search" | "bell" | "home" | "pin" | "back"; className?: string }) {
  const paths: Record<typeof name, { d: string; fill?: boolean }> = {
    search: { d: "M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" },
    bell: { d: "M4 19V17H6V10C6 8.61667 6.41667 7.39167 7.25 6.325C8.08333 5.24167 9.16667 4.53333 10.5 4.2V3.5C10.5 3.08333 10.6417 2.73333 10.925 2.45C11.225 2.15 11.5833 2 12 2C12.4167 2 12.7667 2.15 13.05 2.45C13.35 2.73333 13.5 3.08333 13.5 3.5V4.2C14.8333 4.53333 15.9167 5.24167 16.75 6.325C17.5833 7.39167 18 8.61667 18 10V17H20V19H4ZM12 22C11.45 22 10.975 21.8083 10.575 21.425C10.1917 21.025 10 20.55 10 20H14C14 20.55 13.8 21.025 13.4 21.425C13.0167 21.8083 12.55 22 12 22ZM8 17H16V10C16 8.9 15.6083 7.95833 14.825 7.175C14.0417 6.39167 13.1 6 12 6C10.9 6 9.95833 6.39167 9.175 7.175C8.39167 7.95833 8 8.9 8 10V17Z", fill: true },
    pin: { d: "M12 12C12.55 12 13.0208 11.8042 13.4125 11.4125C13.8042 11.0208 14 10.55 14 10C14 9.45 13.8042 8.97917 13.4125 8.5875C13.0208 8.19583 12.55 8 12 8C11.45 8 10.9792 8.19583 10.5875 8.5875C10.1958 8.97917 10 9.45 10 10C10 10.55 10.1958 11.0208 10.5875 11.4125C10.9792 11.8042 11.45 12 12 12ZM12 22C9.31667 19.7167 7.3125 17.5958 5.9875 15.6375C4.6625 13.6792 4 11.8667 4 10.2C4 7.7 4.80417 5.70833 6.4125 4.225C8.02083 2.74167 9.88333 2 12 2C14.1167 2 15.9792 2.74167 17.5875 4.225C19.1958 5.70833 20 7.7 20 10.2C20 11.8667 19.3375 13.6792 18.0125 15.6375C16.6875 17.5958 14.6833 19.7167 12 22Z", fill: true },
    home: { d: "M18 44V24H30V44M6 18L24 4L42 18V40C42 41.0609 41.5786 42.0783 40.8284 42.8284C40.0783 43.5786 39.0609 44 38 44H10C8.93913 44 7.92172 43.5786 7.17157 42.8284C6.42143 42.0783 6 41.0609 6 40V18Z", fill: false },
    back: { d: "M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z", fill: true },
  };
  const path = paths[name];
  const filled = path.fill !== false;
  return (
    <svg
      aria-hidden="true"
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke={filled ? "none" : "currentColor"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path.d} fill={filled ? "currentColor" : "none"} />
    </svg>
  );
}

function Auth({
  mode,
  go,
}: {
  mode: "login" | "register" | "reset";
  go: (screen: Screen) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    go(mode === "reset" ? "login" : "home");
  };

  const titles = {
    login: "Masuk ke CINETIX",
    register: "Daftar CINETIX",
    reset: "Reset Password",
  };

  return (
    <main className="auth-page">
      <section className="auth-brand">
        <div className="poster-marquee" aria-hidden="true">
          <div className="poster-track">
            {[...authPosters, ...authPosters].map((poster, index) => (
              <div className="poster-tile" key={`${poster.title}-${index}`}>
                <img src={poster.image} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="brand-mark">Cinetix</div>
        <p>Film terbaik, kursi favoritmu, dalam satu tempat.</p>
      </section>
      <section className="auth-panel">
        <button className="back-button" onClick={() => mode === "login" ? go("home") : go("login")} aria-label="Kembali">
          <Icon name="back" />
        </button>
        <div className="auth-copy">
          <span className="eyebrow">CINETIX</span>
          <h1>{titles[mode]}</h1>
          <p>
            {mode === "login" && "Masuk untuk melanjutkan pemesanan tiketmu."}
            {mode === "register" && "Buat akun dan nikmati pengalaman menonton yang lebih mudah."}
            {mode === "reset" && "Kami akan mengirim tautan pemulihan ke nomor handphonemu."}
          </p>
        </div>
        <form onSubmit={submit} className="auth-form">
          <label>
            Nomor handphone
            <div className="phone-input">
              <span>+62</span>
              <input required inputMode="tel" defaultValue={mode === "login" ? "8123456789" : ""} placeholder="812 3456 7890" />
            </div>
          </label>
          {mode !== "reset" && (
            <label>
              Password
              <div className="password-input">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  defaultValue={mode === "login" ? "bismillah" : ""}
                  placeholder="Minimal 8 karakter"
                />
                <button
                  type="button"
                  className={`eye-button${showPassword ? " on" : ""}`}
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  aria-pressed={showPassword}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </label>
          )}
          {mode === "register" && (
            <label className="agreement">
              <input required type="checkbox" />
              <span>Saya menyetujui syarat dan kebijakan privasi CINETIX.</span>
            </label>
          )}
          {mode === "login" && <button className="text-link start" type="button" onClick={() => go("reset")}>Lupa password?</button>}
          <button className="primary wide" type="submit">
            {mode === "login" ? "Masuk" : mode === "register" ? "Daftar" : "Reset Password"}
          </button>
        </form>
        {mode === "login" && (
          <p className="auth-switch">Belum punya akun? <button onClick={() => go("register")}>Daftar sekarang</button></p>
        )}
        <p className="help">Butuh bantuan? Hubungi layanan pelanggan kami.</p>
      </section>
    </main>
  );
}

function Shell({
  children,
  screen,
  go,
  dark,
  setDark,
}: {
  children: React.ReactNode;
  screen: Screen;
  go: (screen: Screen) => void;
  dark: boolean;
  setDark: (dark: boolean) => void;
}) {
  const nav = [
    { id: "home" as Screen, label: "Home" },
    { id: "cinemas" as Screen, label: "Bioskop" },
    { id: "tickets" as Screen, label: "Tiket" },
  ];
  return (
    <div className={`app-shell ${dark ? "dark" : ""}`}>
      <aside className="side-nav">
        <div className="brand-mark small">Cinetix</div>
        <nav>
          {nav.map((item) => (
            <button className={screen === item.id ? "active" : ""} key={item.id} onClick={() => go(item.id)}>
              <span className="nav-dot" />{item.label}
            </button>
          ))}
        </nav>
        <button className="account-button" onClick={() => go("login")}>Keluar</button>
      </aside>
      <div className="app-body">
        <header className="topbar">
          <div className="search-box">
            <Icon name="search" />
            <input aria-label="Cari" placeholder="Cari judul film, bioskop, kota..." />
          </div>
          <button className="round-button" aria-label="Notifikasi"><Icon name="bell" /></button>
          <button className="theme-button" onClick={() => setDark(!dark)} aria-label="Ganti tema">
            {dark ? "Light" : "Dark"}
          </button>
          <button className="avatar" onClick={() => go("login")} aria-label="Akun">A</button>
        </header>
        {children}
      </div>
      <nav className="bottom-nav">
        {nav.map((item) => (
          <button className={screen === item.id ? "active" : ""} key={item.id} onClick={() => go(item.id)}>
            <span>{item.id === "home" ? "⌂" : item.id === "cinemas" ? "▦" : "▱"}</span>{item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

function Home({
  watchlist,
  toggleWatchlist,
  openDetail,
}: {
  watchlist: string[];
  toggleWatchlist: (id: string) => void;
  openDetail: (movie: Movie) => void;
}) {
  const [filter, setFilter] = useState("Semua Film");
  const filters = ["Semua Film", "XXI", "Cinepolis", "Watchlist"];
  const visibleMovies =
    filter === "Watchlist"
      ? movies.filter((movie) => watchlist.includes(movie.id))
      : filter === "Semua Film"
        ? movies
        : movies.filter((movie) => movie.chain === filter);

  return (
    <main className="content">
      <section className="location-row">
        <div><Icon name="pin" /><span>Lokasi kamu</span><strong>Surabaya</strong></div>
        <button>Ganti lokasi</button>
      </section>
      <button className="hero" onClick={() => openDetail(movies[0])}>
        <div className="hero-copy">
          <span className="pill yellow">PRE-SALE SUDAH DIBUKA</span>
          <h1>Cerita yang dekat,<br />di layar yang besar.</h1>
          <p>Tunggu Aku Sukses Nanti segera tayang. Amankan kursimu sekarang.</p>
          <span className="hero-cta">Lihat jadwal</span>
        </div>
        <img src={`${A}/2860f.png`} alt="Poster Tunggu Aku Sukses Nanti" />
      </button>
      <section className="section-heading">
        <div>
          <span className="eyebrow">{filter === "Watchlist" ? "WATCHLIST SAYA" : "PILIHAN MINGGU INI"}</span>
          <h2>{filter === "Watchlist" ? "Film yang kamu simpan" : "Sedang tayang"}</h2>
        </div>
        <button>Lihat semua</button>
      </section>
      <div className="filter-row">
        {filters.map((item) => (
          <button
            className={filter === item ? "active" : ""}
            key={item}
            onClick={() => setFilter(item)}
            aria-pressed={filter === item}
          >
            {item}{item === "Watchlist" && watchlist.length > 0 ? ` (${watchlist.length})` : ""}
          </button>
        ))}
      </div>
      {visibleMovies.length === 0 && filter === "Watchlist" ? (
        <div className="empty-state">
          <span className="empty-heart"><HeartIcon filled={false} /></span>
          <h3>Watchlist masih kosong</h3>
          <p>Ketik ikon hati di poster film untuk menyimpannya ke sini.</p>
          <button className="secondary-button" onClick={() => setFilter("Semua Film")}>Lihat semua film</button>
        </div>
      ) : (
        <div className="movie-grid">
          {visibleMovies.map((movie) => {
            const saved = watchlist.includes(movie.id);
            return (
              <div className="movie-card" key={movie.id}>
                <button className="poster-wrap" onClick={() => openDetail(movie)}>
                  <img src={movie.image} alt={`Poster ${movie.title}`} />
                  <span>{movie.tag}</span>
                </button>
                <button
                  className={`heart-button${saved ? " saved" : ""}`}
                  aria-pressed={saved}
                  aria-label={saved ? `Hapus ${movie.title} dari watchlist` : `Tambah ${movie.title} ke watchlist`}
                  onClick={() => toggleWatchlist(movie.id)}
                >
                  <HeartIcon filled={saved} />
                </button>
                <h3>{movie.title}</h3>
                <p>{movie.genre} · {movie.rating}{saved ? " · Diwatchlist" : ""}</p>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="star-picker" role="radiogroup" aria-label="Beri penilaian">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          role="radio"
          aria-checked={value === star}
          aria-label={`Beri ${star} bintang`}
          className={star <= value ? "on" : ""}
          onClick={() => onChange(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function Reviews({
  movieId,
  reviews,
  onAdd,
}: {
  movieId: string;
  reviews: Review[];
  onAdd: (review: Omit<Review, "id" | "date">) => void;
}) {
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const list = reviews.filter((review) => review.movieId === movieId);
  const average = list.length ? list.reduce((sum, review) => sum + review.rating, 0) / list.length : 0;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!author.trim() || !comment.trim()) {
      setError("Nama dan ulasan wajib diisi.");
      return;
    }
    onAdd({ movieId, author: author.trim(), rating, comment: comment.trim() });
    setAuthor("");
    setComment("");
    setRating(5);
    setError("");
  };

  return (
    <section className="booking-card review-card">
      <div className="section-heading compact">
        <div><span className="eyebrow">ULASAN PENONTON</span><h2>Apa kata mereka</h2></div>
        <span className="review-score">{list.length ? `${average.toFixed(1)} / 5` : "Belum ada"}</span>
      </div>

      <form className="review-form" onSubmit={submit}>
        <div className="review-form-head">
          <label>
            Nama
            <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Nama kamu" maxLength={40} />
          </label>
          <div className="review-rating-field">
            <span>Penilaian</span>
            <StarPicker value={rating} onChange={setRating} />
          </div>
        </div>
        <label>
          Ulasan
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Ceritakan pengalaman menontonmu..." rows={3} maxLength={400} />
        </label>
        {error && <p className="review-error">{error}</p>}
        <div className="review-form-foot">
          <small>{comment.length}/400</small>
          <button className="primary" type="submit">Kirim ulasan</button>
        </div>
      </form>

      {list.length === 0 ? (
        <div className="empty-state">
          <span className="empty-heart">★</span>
          <h3>Belum ada ulasan</h3>
          <p>Jadilah penonton pertama yang memberikan ulasan untuk film ini.</p>
        </div>
      ) : (
        <ul className="review-list">
          {list.map((review) => (
            <li key={review.id}>
              <div className="review-meta">
                <span className="review-avatar">{review.author.charAt(0).toUpperCase()}</span>
                <div>
                  <strong>{review.author}</strong>
                  <span className="review-stars" aria-label={`Penilaian ${review.rating} dari 5`}>
                    {"★".repeat(review.rating)}<i>{"★".repeat(5 - review.rating)}</i>
                  </span>
                </div>
                <time>{review.date}</time>
              </div>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Detail({
  go,
  movie,
  onBooking,
  reviews,
  onAddReview,
}: {
  go: (screen: Screen) => void;
  movie: Movie;
  onBooking: (patch: Partial<Booking>) => void;
  reviews: Review[];
  onAddReview: (review: Omit<Review, "id" | "date">) => void;
}) {
  const [date, setDate] = useState(0);
  const [time, setTime] = useState("14.10");
  return (
    <main className="content detail-page">
      <button className="inline-back" onClick={() => go("home")}><Icon name="back" /> Kembali</button>
      <section className="detail-hero">
        <img src={movie.image} alt={`Poster ${movie.title}`} />
        <div>
          <span className="pill yellow">{movie.tag}</span>
          <h1>{movie.title}</h1>
          <p className="muted">{movie.genre} · {movie.duration} · {movie.rating}</p>
          <p>{movie.synopsis}</p>
          {movie.trailer && <a className="secondary-button" href={movie.trailer} target="_blank" rel="noreferrer">Nonton trailer</a>}
        </div>
      </section>
      <section className="booking-card">
        <div className="section-heading compact"><div><span className="eyebrow">JADWAL</span><h2>Pilih waktu menonton</h2></div></div>
        <div className="date-row">
          {showDates.map((item, index) => (
            <button key={item.day} className={date === index ? "active" : ""} onClick={() => setDate(index)}><strong>{item.day}</strong><span>{item.sub}</span></button>
          ))}
        </div>
        <div className="cinema-schedule">
          <div><span className="cinema-logo">{movie.chain === "Cinepolis" ? "CGV" : "XXI"}</span><div><h3>{cinemaFor(movie.chain)}</h3><p>2D · Jl. Raya Ngagel No. 137</p></div></div>
          <div className="time-row">
            {["12.10", "14.10", "17.10"].map((value, index) => <button disabled={index === 2} className={time === value ? "active" : ""} onClick={() => setTime(value)} key={value}>{value}<small>{index === 2 ? "Penuh" : index === 1 ? "Sisa 10" : "Tersedia"}</small></button>)}
          </div>
        </div>
        <button
          className="primary booking-action"
          onClick={() => {
            onBooking({ date: fullDate(date), time });
            go("seats");
          }}
        >
          Pilih kursi · {time}
        </button>
      </section>
      <Reviews movieId={movie.id} reviews={reviews} onAdd={onAddReview} />
    </main>
  );
}

function Seats({ go, booking, setBooking }: { go: (screen: Screen) => void; booking: Booking; setBooking: (patch: Partial<Booking>) => void }) {
  const [selected, setSelected] = useState<string[]>(booking.seats.length ? booking.seats : ["D8"]);
  const unavailable = ["A2", "A3", "B6", "C4", "C5", "D3", "E7", "F2"];
  const seats = useMemo(() => Array.from({ length: 48 }, (_, i) => `${String.fromCharCode(65 + Math.floor(i / 8))}${(i % 8) + 1}`), []);
  const toggle = (seat: string) => setSelected((current) => current.includes(seat) ? current.filter((item) => item !== seat) : current.length < 4 ? [...current, seat] : current);
  const total = selected.length * TICKET_PRICE;
  return (
    <main className="content seats-page">
      <div className="page-title"><button className="back-button" onClick={() => go("detail")}><Icon name="back" /></button><div><span className="eyebrow">{cinemaFor(booking.movie.chain)}</span><h1>Pilih kursi</h1><p>{booking.movie.title} · {booking.date} · {booking.time} · Studio 2D</p></div></div>
      <section className="seat-panel">
        <div className="screen"><span>Layar bioskop</span></div>
        <div className="seat-grid">
          {seats.map((seat) => <button aria-label={`Kursi ${seat}`} disabled={unavailable.includes(seat)} className={selected.includes(seat) ? "selected" : ""} onClick={() => toggle(seat)} key={seat}>{seat}</button>)}
        </div>
        <div className="seat-legend"><span><i />Tersedia</span><span><i className="picked" />Pilihanmu</span><span><i className="taken" />Tidak tersedia</span></div>
      </section>
      <aside className="selection-summary">
        <span className="eyebrow">PILIHANMU</span>
        <h2>{selected.length ? selected.join(", ") : "Belum ada kursi"}</h2>
        <p>{selected.length} tiket × {rupiah(TICKET_PRICE)}</p>
        <div><span>Total</span><strong>{rupiah(total)}</strong></div>
        <button
          className="primary wide"
          disabled={!selected.length}
          onClick={() => {
            setBooking({ seats: selected });
            go("checkout");
          }}
        >
          Lanjut pembayaran
        </button>
      </aside>
    </main>
  );
}

function Checkout({
  go,
  booking,
  setBooking,
  onPaid,
}: {
  go: (screen: Screen) => void;
  booking: Booking;
  setBooking: (patch: Partial<Booking>) => void;
  onPaid: () => void;
}) {
  const [method, setMethod] = useState(booking.method);
  const seatCount = booking.seats.length;
  const subtotal = seatCount * TICKET_PRICE;
  const total = subtotal + SERVICE_FEE;
  return (
    <main className="content checkout-page">
      <div className="page-title"><button className="back-button" onClick={() => go("seats")}><Icon name="back" /></button><div><span className="eyebrow">LANGKAH TERAKHIR</span><h1>Detail transaksi</h1></div></div>
      <div className="checkout-grid">
        <section>
          <div className="countdown">Selesaikan pembayaran dalam <strong>09:42</strong></div>
          <div className="order-movie">
            <img src={booking.movie.image} alt={`Poster ${booking.movie.title}`} />
            <div><h2>{booking.movie.title}</h2><p>{cinemaFor(booking.movie.chain)}</p><p>{booking.date}, {booking.time} · Studio 2D · Kursi {booking.seats.join(", ")}</p></div>
          </div>
          <h3 className="subheading">Metode pembayaran</h3>
          <div className="payment-list">
            {["DANA", "GoPay", "OVO", "Kartu debit / kredit"].map((item) => <label className={method === item ? "active" : ""} key={item}><input type="radio" name="method" checked={method === item} onChange={() => setMethod(item)} /><span>{item}<small>{item === "DANA" ? "Saldo cukup" : "Pembayaran aman"}</small></span></label>)}
          </div>
        </section>
        <aside className="price-card">
          <span className="eyebrow">RINCIAN</span>
          <h2>Total pembayaran</h2>
          <div><span>Harga tiket ({seatCount})</span><strong>{rupiah(subtotal)}</strong></div>
          <div><span>Biaya layanan</span><strong>{rupiah(SERVICE_FEE)}</strong></div>
          <div className="total"><span>Total</span><strong>{rupiah(total)}</strong></div>
          <button
            className="primary wide"
            onClick={() => {
              setBooking({ method });
              onPaid();
            }}
          >
            Bayar sekarang
          </button>
        </aside>
      </div>
    </main>
  );
}

function Tickets({
  go,
  tickets,
  openTicket,
}: {
  go: (screen: Screen) => void;
  tickets: Ticket[];
  openTicket: (ticket: Ticket) => void;
}) {
  return (
    <main className="content">
      <div className="section-heading"><div><span className="eyebrow">TIKET SAYA</span><h1>Daftar transaksi</h1></div></div>
      <div className="tabs"><button className="active">Akan datang</button><button>Riwayat transaksi</button></div>
      {tickets.length === 0 ? (
        <div className="empty-state">
          <span className="empty-heart">🎟</span>
          <h3>Belum ada tiket</h3>
          <p>Pilih film favoritmu di halaman utama, lalu selesaikan pembayaran. Tiketmu akan muncul di sini.</p>
          <button className="secondary-button" onClick={() => go("home")}>Pilih film</button>
        </div>
      ) : (
        <div className="ticket-list">
          {tickets.map((ticket) => (
            <button className="ticket-card" key={ticket.id} onClick={() => openTicket(ticket)}>
              <img src={ticket.image} alt={`Poster ${ticket.title}`} />
              <div><span className="pill blue">AKAN DATANG</span><h2>{ticket.title}</h2><p>{ticket.cinema}</p><p>{ticket.date}, {ticket.time}</p><strong>Studio 2D · Kursi {ticket.seats.join(", ")}</strong></div>
              <span className="ticket-arrow">›</span>
            </button>
          ))}
        </div>
      )}
    </main>
  );
}

function Cinemas() {
  const cinemas = ["TRANSMART NGAGEL XXI", "TUNJUNGAN PLAZA XXI", "BG JUNCTION CGV", "PAKUWON MALL XXI"];
  return (
    <main className="content">
      <div className="section-heading"><div><span className="eyebrow">DI SEKITARMU</span><h1>Bioskop di Surabaya</h1></div></div>
      <div className="cinema-list">{cinemas.map((cinema, index) => <button key={cinema}><span className="cinema-logo">{index === 2 ? "CGV" : "XXI"}</span><div><h3>{cinema}</h3><p>{(1.2 + index * 1.7).toFixed(1)} km · Lihat jadwal film</p></div><span>›</span></button>)}</div>
    </main>
  );
}

function Success({ go, ticket }: { go: (screen: Screen) => void; ticket: Ticket | null }) {
  if (!ticket) {
    return (
      <main className="success-page">
        <div className="success-check">🎟</div>
        <span className="eyebrow">BELUM ADA TIKET</span>
        <h1>Belum ada transaksi</h1>
        <p>Tiketmu akan muncul di sini setelah kamu menyelesaikan pembayaran.</p>
        <div className="success-actions"><button className="primary" onClick={() => go("home")}>Pilih film</button></div>
      </main>
    );
  }
  return (
    <main className="success-page">
      <div className="success-check">✓</div>
      <span className="eyebrow">TRANSAKSI BERHASIL</span>
      <h1>Pembayaran berhasil!</h1>
      <p>Tiketmu sudah siap. Selamat menonton!</p>
      <div className="digital-ticket">
        <div className="ticket-info"><img src={ticket.image} alt={`Poster ${ticket.title}`} /><div><h2>{ticket.title}</h2><p>{ticket.cinema}</p><p>{ticket.date} · {ticket.time}</p><strong>Studio 2D · Kursi {ticket.seats.join(", ")}</strong></div></div>
        <div className="perforation" />
        <img className="qr" src={`${A}/5af46.png`} alt="QR tiket masuk studio" />
        <small>Tunjukkan QR ini di pintu masuk studio</small>
        <div className="transaction"><span>ID Transaksi</span><strong>{ticket.id}</strong><span>Metode</span><strong>{ticket.method}</strong></div>
      </div>
      <div className="success-actions"><button className="primary" onClick={() => go("tickets")}>Lihat tiket saya</button><button className="secondary-button" onClick={() => go("home")}>Kembali ke home</button></div>
    </main>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [dark, setDark] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie>(movies[0]);
  const [booking, setBookingState] = useState<Booking>({ movie: movies[0], date: fullDate(0), time: "14.10", seats: ["D8"], method: "DANA" });
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    try {
      const stored = localStorage.getItem(TICKETS_KEY);
      return stored ? (JSON.parse(stored) as Ticket[]) : [];
    } catch {
      return [];
    }
  });
  const [viewedTicket, setViewedTicket] = useState<Ticket | null>(null);
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const stored = localStorage.getItem(REVIEWS_KEY);
      return stored ? (JSON.parse(stored) as Review[]) : seedReviews;
    } catch {
      return seedReviews;
    }
  });
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WATCHLIST_KEY);
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  }, [reviews]);

  const toggleWatchlist = (id: string) =>
    setWatchlist((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  const setBooking = (patch: Partial<Booking>) => setBookingState((current) => ({ ...current, ...patch }));

  const addReview = (review: Omit<Review, "id" | "date">) =>
    setReviews((current) => [
      { ...review, id: `r${Date.now()}`, date: "Baru saja" },
      ...current,
    ]);

  const openDetail = (movie: Movie) => {
    setSelectedMovie(movie);
    setBookingState({ movie, date: fullDate(0), time: "14.10", seats: ["D8"], method: "DANA" });
    setScreen("detail");
  };

  const handlePaid = () => {
    const ticket: Ticket = {
      id: `CINETIX${Math.floor(10000000 + Math.random() * 90000000)}`,
      title: booking.movie.title,
      image: booking.movie.image,
      cinema: cinemaFor(booking.movie.chain),
      date: booking.date,
      time: booking.time,
      seats: booking.seats,
      method: booking.method,
      total: booking.seats.length * TICKET_PRICE + SERVICE_FEE,
    };
    setTickets((current) => [ticket, ...current]);
    setViewedTicket(ticket);
    setScreen("success");
  };

  const openTicket = (ticket: Ticket) => {
    setViewedTicket(ticket);
    setScreen("success");
  };

  if (screen === "login" || screen === "register" || screen === "reset") return <Auth mode={screen} go={setScreen} />;
  return (
    <Shell screen={screen} go={setScreen} dark={dark} setDark={setDark}>
      {screen === "home" && <Home watchlist={watchlist} toggleWatchlist={toggleWatchlist} openDetail={openDetail} />}
      {screen === "cinemas" && <Cinemas />}
      {screen === "tickets" && <Tickets go={setScreen} tickets={tickets} openTicket={openTicket} />}
      {screen === "detail" && (
        <Detail go={setScreen} movie={selectedMovie} onBooking={setBooking} reviews={reviews} onAddReview={addReview} />
      )}
      {screen === "seats" && <Seats go={setScreen} booking={booking} setBooking={setBooking} />}
      {screen === "checkout" && <Checkout go={setScreen} booking={booking} setBooking={setBooking} onPaid={handlePaid} />}
      {screen === "success" && <Success go={setScreen} ticket={viewedTicket} />}
    </Shell>
  );
}
