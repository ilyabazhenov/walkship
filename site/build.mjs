// Builds the landing page for GitHub Pages: docs/index.html (English) and docs/ru/index.html (Russian).
// One template, two texts — edit the copy below, then run: node site/build.mjs
// The same copy, as plain blocks for other places, lives in press/copy.*.md.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const REPO = "https://github.com/ilyabazhenov/walkship";
const SITE = "https://ilyabazhenov.github.io/walkship";

const icons = {
  talk: '<path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  note: '<path d="M4 6h16M4 12h10M4 18h7"/><path d="m15 19 5-5-2-2-5 5v2h2Z"/>',
  board: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16"/>',
  memory: '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.3-4.3"/>',
  digest: '<path d="M4 5h16v14H4z"/><path d="M4 10h16M9 10v9"/>',
  mockup: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h5M8 15h8"/>',
  mac: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  mcp: '<path d="M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  plug: '<path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0V8ZM12 18v4"/>',
  offline: '<path d="M2 8.8a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',
  apple: '<path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.9-3-.8a4.5 4.5 0 0 0-3.8 2.3c-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2-1.1 2.8-2.3.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.8ZM14.1 5.8c.6-.8 1.1-1.8 1-2.8-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.7-1 2.7 1 .1 2-.5 2.7-1.3Z" fill="currentColor" stroke="none"/>',
  android: '<path d="M7 10h10v7a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-7ZM7 9a5 5 0 0 1 10 0H7ZM4.5 10.5v5M19.5 10.5v5M9.5 18v3M14.5 18v3M8.5 4.5l1 1.5M15.5 4.5l-1 1.5"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
};
const icon = (name, cls = "i") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;

const copy = {
  en: {
    lang: "en",
    dir: "",
    other: { href: "ru/", label: "RU", name: "Русский" },
    title: "Walkship — go for a walk, come back to a PR",
    description: "A voice partner for your projects. Talk a feature through on a walk; Walkship writes the spec, and Claude Code builds it on your Mac.",
    nav: { how: "How it works", features: "Features", privacy: "Privacy", faq: "FAQ", download: "Download" },
    eyebrow: "A voice partner for your projects",
    h1: "Go for a walk.<br>Come back to a PR.",
    sub: "Talk a feature through while you walk. Walkship turns the conversation into a spec, and Claude Code builds it on your Mac.",
    mac: "Download for Mac",
    apk: "Android APK",
    caption: "Beta · Apple Silicon Mac, macOS 14+ · requires Claude Code with a subscription",
    langNote: "The app speaks Russian for now — English is on the way.",
    howLabel: "How it works",
    howTitle: "From a thought on a walk to a pull request",
    steps: [
      ["You talk", "Hands-free: speak, pause, and the assistant answers out loud, then listens again. It knows the project — reads the code, the git history and your notes, and remembers past discussions.", "session"],
      ["It sums up", "Say “wrap it up”, and the conversation becomes decisions, open questions and features with a spec and acceptance criteria.", "feature-done"],
      ["An agent ships it", "One tap, and Claude Code or Codex builds the feature in its own git worktree, runs the checks and commits. A push on your phone, a spoken recap, “open it” — and the PR is up.", "feature-running"],
    ],
    featLabel: "Features",
    featTitle: "Everything a thinking walk needs",
    features: [
      ["note", "Quick notes", "Drop a thought without a conversation. The assistant files it under the right project, and asks when it isn’t sure."],
      ["board", "Feature board", "Every feature of every project: drafts, queued, agent at work, done. Start or restart right from the card."],
      ["memory", "Memory", "“What did we decide about settings?” — the assistant finds it in past discussions of any project."],
      ["digest", "Digest", "One button, and you hear what agents finished, where they failed, which PRs wait and what’s still open."],
      ["mockup", "Mockups", "“Show me what the screen would look like” — a sketch right in the conversation and in the spec."],
      ["mac", "Continue on the Mac", "Open a spec or a transcript in Claude Code, Cursor or Codex with one click."],
      ["mcp", "MCP for your agents", "Claude Code, Cursor and Codex in the repo can see the project’s ideas, decisions and features."],
      ["plug", "Your MCP servers", "Connect Jira, Sentry or a database, and the assistant uses them in conversation."],
      ["offline", "Nothing lost offline", "A phrase you said waits on the phone and goes out once the server is back."],
    ],
    privLabel: "Privacy",
    privTitle: "Runs on your Mac. Nowhere else.",
    privacy: [
      "Your code goes nowhere but your own Claude Code: Walkship calls the local <code>claude</code> CLI under your login. No API key.",
      "No accounts and no Walkship cloud. The server, the database and the voices run on your Mac.",
      "Speech recognition: Whisper on the Mac, the system recognizer on the phone. The assistant’s voice is neural and local too.",
      "The phone pairs with the Mac by QR code — over your home network or Tailscale.",
      "Your main branch stays untouched: the agent works in its own worktree, and you decide when a PR opens.",
    ],
    reqLabel: "Requirements",
    reqTitle: "What you need",
    reqs: [
      "A Mac with Apple Silicon (M1 or later), macOS 14 Sonoma or later",
      "Claude Code with a Claude subscription (Pro or Max); Codex optional",
      "About 5 GB free — the voice pack takes about 3.3 GB",
      "git, and <code>gh</code> (GitHub CLI) for pull requests",
      "Optional: an Android phone, and Tailscale to talk away from home",
      "Interface and voice: Russian for now",
    ],
    dlTitle: "Take your next idea for a walk",
    dlNote: "The Mac app sets everything up on first launch: Claude Code sign-in, the voice pack and a QR code for the phone.",
    allReleases: "All releases and notes",
    faqLabel: "FAQ",
    faq: [
      ["Do I need an Anthropic API key?", "No. Conversations, summaries and implementation all go through Claude Code on your subscription."],
      ["Where does my code go?", "Nowhere but your own Claude Code, exactly as if you ran it yourself. Walkship has no cloud server."],
      ["Is there an iPhone app?", "Not yet. There’s the Mac app and Android. On the Mac you can talk right in the app."],
      ["Can the agent break my repository?", "It works in a separate git worktree on its own branch. Your main branch stays as it was, and a PR opens only when you say so."],
      ["Why Russian only?", "Walkship started as a personal tool. English is planned."],
      ["How do updates work?", "The app checks for new versions and offers them from the menu bar. Your data stays in place."],
    ],
    storyTitle: "Why “Walkship”",
    story: "<em>Walk</em> + <em>ship</em>. Aristotle discussed ideas while pacing the Lyceum’s colonnade, Darwin thought while circling his Sandwalk path. Those walks used to end in forgotten ideas. A walk with Walkship ends in a pull request.",
    footer: { releases: "Releases", issues: "Report a problem", press: "Press kit" },
    alt: { mac: "Walkship on the Mac: the console with agents, conversations and open questions", phone: "Walkship on the phone" },
  },
  ru: {
    lang: "ru",
    dir: "../",
    other: { href: "../", label: "EN", name: "English" },
    title: "Walkship — ушёл гулять, вернулся к готовому PR",
    description: "Голосовой партнёр для твоих проектов. Обсуждаешь фичу на прогулке, Walkship собирает спецификацию, а Claude Code реализует её на твоём Mac.",
    nav: { how: "Как это работает", features: "Возможности", privacy: "Приватность", faq: "Вопросы", download: "Скачать" },
    eyebrow: "Голосовой партнёр для твоих проектов",
    h1: "Ушёл гулять —<br>вернулся к готовому PR.",
    sub: "Обсуждаешь фичу голосом на прогулке. Walkship собирает из разговора спецификацию, а Claude Code реализует её на твоём Mac.",
    mac: "Скачать для Mac",
    apk: "APK для Android",
    caption: "Бета · Mac с Apple Silicon, macOS 14+ · нужен Claude Code с подпиской",
    langNote: "",
    howLabel: "Как это работает",
    howTitle: "От мысли на прогулке до пул-реквеста",
    steps: [
      ["Говоришь", "Hands-free: говоришь, после паузы фраза уходит ассистенту, ответ звучит сразу, потом он снова слушает. Ассистент знает проект: читает код, историю git и заметки, помнит прошлые обсуждения.", "session"],
      ["Он собирает итоги", "Скажи «оформляй» — разговор превращается в решения, открытые вопросы и фичи со спецификацией и критериями готовности.", "feature-done"],
      ["Агент пишет код", "Одно нажатие — Claude Code или Codex реализует фичу в отдельном git worktree, прогоняет проверки и коммитит. Пуш на телефон, пересказ голосом, «открывай» — и PR готов.", "feature-running"],
    ],
    featLabel: "Возможности",
    featTitle: "Всё, что нужно прогулке с мыслями",
    features: [
      ["note", "Быстрые заметки", "Мысль на ходу без разговора. Ассистент сам решает, к какому проекту она относится, а если не уверен — спросит."],
      ["board", "Доска фич", "Все фичи всех проектов: черновики, очередь, агент в работе, готово. Запуск и перезапуск прямо с карточки."],
      ["memory", "Память", "«Что мы решали про настройки?» — ассистент найдёт ответ в прошлых обсуждениях любого проекта."],
      ["digest", "Сводка", "Одна кнопка — и голосом: что агенты закончили, где упали, какие PR ждут, какие вопросы открыты."],
      ["mockup", "Макеты", "«Покажи, как будет выглядеть экран» — набросок прямо в разговоре и в спецификации фичи."],
      ["mac", "Продолжить на Mac", "Спецификация или расшифровка открывается в Claude Code, Cursor или Codex одним нажатием."],
      ["mcp", "MCP для твоих агентов", "Claude Code, Cursor и Codex в репозитории видят идеи, решения и фичи проекта."],
      ["plug", "Внешние MCP-серверы", "Подключи Jira, Sentry или базу данных — ассистент будет пользоваться ими в разговоре."],
      ["offline", "Без связи ничего не теряется", "Сказанная фраза ждёт на телефоне и уходит сама, когда сервер снова доступен."],
    ],
    privLabel: "Приватность",
    privTitle: "Всё на твоём Mac. И больше нигде.",
    privacy: [
      "Код не уходит никуда, кроме твоего собственного Claude Code: Walkship вызывает локальный <code>claude</code> CLI под твоим логином. Ключ API не нужен.",
      "Никаких аккаунтов и облака Walkship. Сервер, база и голоса работают на Mac.",
      "Распознавание речи — Whisper на Mac и системное на телефоне. Голос ассистента — нейро-голоса, тоже локально.",
      "Телефон подключается к Mac по QR-коду — через домашнюю сеть или Tailscale.",
      "Основная ветка не трогается: агент работает в отдельном worktree, а PR открываешь ты.",
    ],
    reqLabel: "Требования",
    reqTitle: "Что нужно",
    reqs: [
      "Mac с Apple Silicon (M1 и новее), macOS 14 Sonoma или новее",
      "Claude Code с подпиской Claude (Pro или Max); Codex — по желанию",
      "Около 5 ГБ свободного места — голосовой пакет занимает ~3,3 ГБ",
      "git, для пул-реквестов — <code>gh</code> (GitHub CLI)",
      "По желанию — телефон на Android и Tailscale, чтобы говорить вне дома",
      "Интерфейс и голос пока на русском",
    ],
    dlTitle: "Возьми следующую идею на прогулку",
    dlNote: "При первом запуске приложение само всё настроит: вход в Claude Code, голосовой пакет и QR-код для телефона.",
    allReleases: "Все версии и что в них нового",
    faqLabel: "Вопросы",
    faq: [
      ["Нужен ключ Anthropic API?", "Нет. Все разговоры, итоги и реализация идут через Claude Code по твоей подписке."],
      ["Куда уходит мой код?", "Никуда, кроме твоего Claude Code — так же, как если бы ты запускал его сам. У Walkship нет своего сервера в облаке."],
      ["Есть версия для iPhone?", "Пока нет. Есть Mac-приложение и Android. На Mac можно говорить прямо в приложении."],
      ["Агент не сломает мой репозиторий?", "Он работает в отдельном git worktree на своей ветке. Основная ветка остаётся как была, а PR открывается только по твоей команде."],
      ["Почему только русский?", "Walkship начинался как личный инструмент. Английский в планах."],
      ["Как обновляться?", "Приложение само проверяет новые версии и предлагает скачать их из строки меню. Данные остаются на месте."],
    ],
    storyTitle: "Почему «Walkship»",
    story: "<em>Walk</em> + <em>ship</em>: гулять и выпускать. Аристотель обсуждал идеи, прохаживаясь по галерее Ликея, Дарвин думал, нарезая круги по тропе Sandwalk. Раньше такие прогулки заканчивались забытыми мыслями. Прогулка с Walkship заканчивается пул-реквестом.",
    footer: { releases: "Версии", issues: "Сообщить о проблеме", press: "Пресс-кит" },
    alt: { mac: "Walkship на Mac: пульт с агентами, разговорами и открытыми вопросами", phone: "Walkship на телефоне" },
  },
};

// A screenshot that follows the page's theme: dark and light captures of the same screen.
const shot = (d, name, alt, cls, eager = false) =>
  `<picture class="${cls}"><source media="(prefers-color-scheme: light)" srcset="${d}assets/img/${name}-light.webp"><img src="${d}assets/img/${name}-dark.webp" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;

const logo = (d) =>
  `<picture><source media="(prefers-color-scheme: light)" srcset="${d}assets/walkship-horizontal-on-light.svg"><img src="${d}assets/walkship-horizontal-on-dark.svg" alt="Walkship" height="28"></picture>`;

function page(c) {
  const d = c.dir;
  const url = c.lang === "en" ? `${SITE}/` : `${SITE}/ru/`;
  return `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${c.title}</title>
<meta name="description" content="${c.description}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${SITE}/">
<link rel="alternate" hreflang="ru" href="${SITE}/ru/">
<meta property="og:type" content="website">
<meta property="og:title" content="${c.title}">
<meta property="og:description" content="${c.description}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/assets/og-${c.lang}.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0B0C0A" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#F2F1EB" media="(prefers-color-scheme: light)">
<link rel="icon" href="${d}assets/walkship-mark-on-dark.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${d}assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${d}assets/style.css">
</head>
<body>
<header class="top">
  <div class="wrap top-in">
    <a class="brand" href="./">${logo(d)}</a>
    <nav class="nav">
      <a href="#how">${c.nav.how}</a><a href="#features">${c.nav.features}</a><a href="#privacy">${c.nav.privacy}</a><a href="#faq">${c.nav.faq}</a>
    </nav>
    <a class="lang" href="${c.other.href}" hreflang="${c.other.label.toLowerCase()}" title="${c.other.name}">${c.other.label}</a>
    <a class="btn btn-sm" href="#download">${c.nav.download}</a>
  </div>
</header>

<main>
<section class="hero">
  <div class="wrap">
    <p class="label">${c.eyebrow}</p>
    <h1>${c.h1}</h1>
    <p class="sub">${c.sub}</p>
    <div class="cta">
      <a class="btn" data-asset="dmg" href="${REPO}/releases/latest">${icon("apple")}${c.mac}</a>
      <a class="btn btn-ghost" data-asset="apk" href="${REPO}/releases/latest">${icon("android")}${c.apk}</a>
    </div>
    <p class="caption"><span data-version></span>${c.caption}</p>
    ${c.langNote ? `<p class="caption note">${c.langNote}</p>` : ""}
  </div>
  <div class="wrap stage">
    <div class="window">
      <div class="window-bar"><i></i><i></i><i></i></div>
      ${shot(d, "mac-home", c.alt.mac, "window-shot", true)}
    </div>
    <div class="phone">${shot(d, "phone-home", c.alt.phone, "phone-shot", true)}</div>
  </div>
</section>

<section id="how" class="section">
  <div class="wrap">
    <p class="label">${c.howLabel}</p>
    <h2>${c.howTitle}</h2>
    <ol class="steps">
      ${c.steps
        .map(
          ([t, body, img], i) => `<li class="step">
        <div class="phone phone-sm">${shot(d, `phone-${img}`, t, "phone-shot")}</div>
        <div><span class="num">0${i + 1}</span><h3>${t}</h3><p>${body}</p></div>
      </li>`,
        )
        .join("\n      ")}
    </ol>
  </div>
</section>

<section class="section section-tight">
  <div class="wrap">
    <div class="window">
      <div class="window-bar"><i></i><i></i><i></i></div>
      ${shot(d, "mac-board", c.features[1][1], "window-shot")}
    </div>
  </div>
</section>

<section id="features" class="section">
  <div class="wrap">
    <p class="label">${c.featLabel}</p>
    <h2>${c.featTitle}</h2>
    <div class="grid">
      ${c.features.map(([ic, t, body]) => `<article class="card">${icon(ic)}<h3>${t}</h3><p>${body}</p></article>`).join("\n      ")}
    </div>
  </div>
</section>

<section id="privacy" class="section">
  <div class="wrap split">
    <div>
      <p class="label">${c.privLabel}</p>
      <h2>${c.privTitle}</h2>
      <ul class="ticks">
        ${c.privacy.map((p) => `<li>${icon("check")}<span>${p}</span></li>`).join("\n        ")}
      </ul>
    </div>
    <div class="window window-side">
      <div class="window-bar"><i></i><i></i><i></i></div>
      ${shot(d, "mac-session", c.steps[0][0], "window-shot")}
    </div>
  </div>
</section>

<section id="download" class="section download">
  <div class="wrap">
    <div class="panel">
      <div>
        <p class="label">${c.reqLabel}</p>
        <h2>${c.dlTitle}</h2>
        <p class="sub">${c.dlNote}</p>
        <div class="cta">
          <a class="btn" data-asset="dmg" href="${REPO}/releases/latest">${icon("apple")}${c.mac}</a>
          <a class="btn btn-ghost" data-asset="apk" href="${REPO}/releases/latest">${icon("android")}${c.apk}</a>
        </div>
        <p class="caption"><a href="${REPO}/releases">${c.allReleases} →</a></p>
      </div>
      <div>
        <h3 class="req-title">${c.reqTitle}</h3>
        <ul class="reqs">
          ${c.reqs.map((r) => `<li>${r}</li>`).join("\n          ")}
        </ul>
      </div>
    </div>
  </div>
</section>

<section id="faq" class="section">
  <div class="wrap faq-wrap">
    <div>
      <p class="label">${c.faqLabel}</p>
      <div class="faq">
        ${c.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n        ")}
      </div>
    </div>
    <aside class="story">
      <img src="${d}assets/icon-256.png" alt="" width="96" height="96">
      <h3>${c.storyTitle}</h3>
      <p>${c.story}</p>
    </aside>
  </div>
</section>
</main>

<footer class="foot">
  <div class="wrap foot-in">
    ${logo(d)}
    <span class="foot-tag">Go for a walk. Come back to a PR.</span>
    <nav>
      <a href="${REPO}/releases">${c.footer.releases}</a>
      <a href="${REPO}/issues">${c.footer.issues}</a>
      <a href="${REPO}/tree/main/press">${c.footer.press}</a>
      <a href="${c.other.href}" hreflang="${c.other.label.toLowerCase()}">${c.other.name}</a>
    </nav>
  </div>
</footer>
<script src="${d}assets/site.js" defer></script>
</body>
</html>
`;
}

fs.writeFileSync(path.join(root, "docs/index.html"), page(copy.en));
fs.mkdirSync(path.join(root, "docs/ru"), { recursive: true });
fs.writeFileSync(path.join(root, "docs/ru/index.html"), page(copy.ru));
console.log("docs/index.html, docs/ru/index.html");
