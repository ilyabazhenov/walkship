// Builds the landing page for GitHub Pages: docs/index.html (English) and docs/ru/index.html (Russian),
// and the privacy policy next to each: docs/privacy/ and docs/ru/privacy/.
// One template, two texts — edit the copy below, then run: node site/build.mjs
// The same copy, as plain blocks for other places, lives in press/copy.*.md.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const REPO = "https://github.com/ilyabazhenov/walkship";
const SITE = "https://ilyabazhenov.github.io/walkship";
// Opens Obtainium on an Android phone with this repo ready to add; the redirect page helps browsers that block custom schemes.
const OBTAINIUM = `https://apps.obtainium.imranr.dev/redirect?r=obtainium://add/${REPO}`;

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
  phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>',
  cloud: '<path d="M7 18.5h10.5a4 4 0 0 0 .4-8A6 6 0 0 0 6.3 9 4.8 4.8 0 0 0 7 18.5Z"/>',
  pr: '<circle cx="6" cy="5.5" r="2.2"/><circle cx="6" cy="18.5" r="2.2"/><circle cx="18" cy="18.5" r="2.2"/><path d="M6 7.7v8.6M18 16.3V10a3 3 0 0 0-3-3h-4.5M12.5 4.5 10 7l2.5 2.5"/>',
};
const icon = (name, cls = "i") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;

const copy = {
  en: {
    lang: "en",
    dir: "",
    other: { href: "ru/", label: "RU", name: "Русский" },
    title: "Walkship — go for a walk, come back to a PR",
    description: "A voice partner for your projects. Talk a feature through on a walk; Walkship writes the spec, and Claude Code or Codex builds it on your Mac.",
    nav: { how: "How it works", features: "Features", privacy: "Privacy", faq: "FAQ", download: "Download" },
    eyebrow: "A voice partner for your projects",
    h1: "Go for a walk.<br>Come back to a PR.",
    sub: "Talk a feature through while you walk. Walkship turns the conversation into a spec, and your coding agent — Claude Code or Codex — builds it on your Mac.",
    mac: "Download for Mac",
    apk: "Android APK",
    caption: "Beta · Apple Silicon Mac, macOS 14+ · requires Claude Code or Codex",
    langNote: "",
    howLabel: "How it works",
    howTitle: "From a thought on a walk to a pull request",
    steps: [
      ["You talk", "Hands-free: speak, pause, and the assistant answers out loud, then listens again. It knows the project — reads the code, the git history and your notes, and remembers past discussions.", "session"],
      ["It sums up", "Say “wrap it up”, and the conversation becomes decisions, open questions and features with a spec and acceptance criteria.", "feature-done"],
      ["An agent ships it", "One tap, and Claude Code or Codex builds the feature in its own git worktree, runs the checks and commits. A push on your phone, a spoken recap, “open it” — and the PR is up.", "feature-running"],
    ],
    flow: {
      zones: ["On a walk", "At home", "In the cloud"],
      you: ["Your phone", "The Walkship app: talk, listen, get a push when the work is done"],
      link: ["voice, answers, pushes", "Wi-Fi or Tailscale"],
      mac: ["Your Mac", "Walkship · everything is stored here", [
        ["talk", "Talks it through with you and knows the project: the code, git history, past talks"],
        [2, "Sums it up: decisions, open questions, specs"],
        [3, "Runs Claude Code or Codex in a separate git worktree"],
      ]],
      outs: [
        ["cloud", "Claude or ChatGPT", "Your subscription: the models for the talk and the code, under your own login", "prompts and replies"],
        ["pr", "A pull request on GitHub", "Checks passed. It opens when you say so.", "git push"],
      ],
      note: "There are no Walkship servers and no accounts.",
    },
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
    agentsLabel: "Claude or Codex",
    agentsTitle: "Your agent, your subscription — for every role",
    agents: [
      "The conversation, summaries and implementation each pick Claude Code or Codex, and a model",
      "Codex models come from your ChatGPT account; Claude’s from your Claude plan",
      "When one subscription runs out, the assistant offers to go on with the other",
      "Both subscriptions’ limits side by side, on the Mac and the phone",
    ],
    privLabel: "Privacy",
    privTitle: "Runs on your Mac. Nowhere else.",
    privacy: [
      "Your code goes only to the agents you already use — Claude Code or Codex — through their local CLIs under your own login. No API keys.",
      "No accounts and no Walkship cloud. The server, the database and the voices run on your Mac.",
      "Speech recognition: Whisper on the Mac, the system recognizer on the phone. The assistant’s voice is neural and local too.",
      "The phone pairs with the Mac by QR code — over your home network or Tailscale.",
      "Your main branch stays untouched: the agent works in its own worktree, and you decide when a PR opens.",
    ],
    reqLabel: "Requirements",
    reqTitle: "What you need",
    reqs: [
      "A Mac with Apple Silicon (M1 or later), macOS 14 Sonoma or later",
      "Claude Code with a Claude subscription (Pro or Max), or Codex with a ChatGPT subscription (Plus or Pro) — one is enough, both work together",
      "About 5 GB free — the voice pack takes about 3.3 GB",
      "git, and <code>gh</code> (GitHub CLI) for pull requests",
      "Optional: an iPhone or an Android phone, and Tailscale to talk away from home",
      "Interface and voice: English or Russian — one setting for both",
    ],
    dlTitle: "Take your next idea for a walk",
    dlNote: "The Mac app sets everything up on first launch: Claude Code or Codex sign-in, the voice pack and a QR code for the phone.",
    allReleases: "All releases and notes",
    obtainium: "Android updates: add Walkship to Obtainium",
    qr: "On the Mac? Point your Android phone’s camera here to download the APK on it.",
    faqLabel: "FAQ",
    faq: [
      ["Do I need an API key?", "No. Everything runs through Claude Code or Codex on your own Claude or ChatGPT subscription."],
      ["Can I use Codex instead of Claude Code?", "Yes, for everything: in Settings → Agents & models the conversation, summaries and implementation each pick Claude or Codex and a model. When one subscription runs out, the assistant offers to go on with the other."],
      ["Where does my code go?", "Only to the agents you use — Claude Code or Codex — exactly as if you ran them yourself. Walkship has no cloud server."],
      ["Is there an iPhone app?", "Yes, it’s on its way to the App Store. Android is available now as an APK, and on the Mac you can talk right in the app."],
      ["Can the agent break my repository?", "It works in a separate git worktree on its own branch. Your main branch stays as it was, and a PR opens only when you say so."],
      ["What languages does it speak?", "English and Russian. One setting switches the screens, the assistant and the voice, on the Mac and the phone alike."],
      ["How do updates work?", "The Mac app checks for new versions and offers them from the menu bar. Your data stays in place. On Android, add Walkship to <a href=\"https://obtainium.imranr.dev\">Obtainium</a>: it installs new APKs from GitHub releases as they come out."],
    ],
    storyTitle: "Why “Walkship”",
    story: "<em>Walk</em> + <em>ship</em>. Aristotle discussed ideas while pacing the Lyceum’s colonnade, Darwin thought while circling his Sandwalk path. Those walks used to end in forgotten ideas. A walk with Walkship ends in a pull request.",
    footer: { releases: "Releases", issues: "Report a problem", press: "Press kit", privacy: "Privacy policy" },
    alt: { mac: "Walkship on the Mac: the console with agents, conversations and open questions", phone: "Walkship on the phone" },
    android: {
      title: "Walkship for Android",
      description: "Download the Walkship APK for Android and keep it up to date with Obtainium.",
      label: "Android",
      h1: "Walkship for Android",
      caption: "Android 7+ · the phone app for Walkship on your Mac",
      button: "Download APK",
      stepsTitle: "Install",
      steps: [
        "Tap <b>Download APK</b> and open the file when it has downloaded.",
        "Android asks to allow installing apps from your browser: allow it once.",
        "Open Walkship and scan the QR code from the Mac app’s setup screen.",
      ],
      updatesTitle: "Updates",
      updates: "Android doesn’t update apps installed this way on its own. Add Walkship to <a href=\"https://obtainium.imranr.dev\">Obtainium</a>, and it will install new versions from GitHub releases as they come out.",
      obtainium: "Add to Obtainium",
    },
    policy: {
      title: "Privacy policy — Walkship",
      description: "Walkship collects no personal data: no accounts, no Walkship servers, no analytics. Everything stays on your Mac.",
      label: "Privacy policy",
      h1: "Walkship doesn’t collect your data",
      updated: "Last updated: September 28, 2026",
      lead: "Walkship has no accounts, no servers of its own, no analytics, no ads and no tracking. The developer receives nothing about you or your projects. This page explains where your data lives and what leaves your devices, so you can check it yourself.",
      sections: [
        ["Where your data lives", [
          "Walkship is a Mac app and a phone app (iPhone and Android). The phone app talks only to the Walkship server that runs on your own Mac, over your home network or a private network such as Tailscale that you set up.",
          "Your conversations, transcripts, notes, summaries, features, agent logs and settings are stored in a database on your Mac, in the <code>~/.voice-assistant</code> folder. The phone keeps only the address of your Mac, a pairing key and phrases waiting to be sent while the Mac is out of reach.",
          "The developer has no access to any of it.",
        ]],
        ["What leaves your devices, and where it goes", [
          "<b>AI models.</b> To answer you, write summaries and build features, your Mac runs Claude Code (Anthropic) or Codex (OpenAI) — whichever you choose — under your own account. What you say, the conversation so far and the parts of your project the assistant reads are sent to that service, exactly as if you ran the tool yourself. Web search, when you turn it on, is done by the same service. Their privacy policies apply: <a href=\"https://www.anthropic.com/legal/privacy\">Anthropic</a>, <a href=\"https://openai.com/policies/privacy-policy/\">OpenAI</a>.",
          "<b>Speech recognition.</b> On the phone, Walkship uses the system speech recognizer. When the language is installed on the device, recognition happens on the device; otherwise the system may send the audio to Apple (iPhone) or Google (Android) to turn it into text, under their privacy policies. On the Mac, speech is recognized locally with Whisper. The assistant’s voice is synthesized locally on the Mac.",
          "<b>Push notifications.</b> When an agent finishes or fails, your Mac sends a notification with the feature’s title and status to your phone through Expo’s push service, which hands it to Apple Push Notification service or Firebase Cloud Messaging. The phone’s push token is stored only on your Mac.",
          "<b>GitHub.</b> Pull requests are opened with your own <code>git</code> and <code>gh</code> setup when you ask for one. The Mac app checks GitHub for new versions of Walkship; that request carries no personal data beyond what any web request does, such as your IP address.",
          "<b>Services you connect.</b> If you add MCP servers (for example Jira, Sentry or a database), the assistant sends them requests on your behalf, as you configure.",
        ]],
        ["Permissions", [
          "<b>Microphone and speech recognition</b> — to hear you while you talk to the assistant. Walkship doesn’t record in the background and doesn’t keep audio.",
          "<b>Photo library</b> — iOS asks apps to describe this because the system file picker can read photo albums. Walkship doesn’t open your photos.",
          "<b>Notifications</b> — to tell you when an agent has finished.",
        ]],
        ["What the developer receives", [
          "Nothing. Walkship contains no analytics, no crash reporting, no advertising and no third-party tracking, and it doesn’t use the advertising identifier. Nothing is sold or shared, because nothing is collected.",
          "If you report a problem on GitHub, what you write there is public and handled under GitHub’s terms.",
        ]],
        ["Your control", [
          "Projects, discussions, notes and features can be deleted in the app. To remove everything, delete the Walkship apps and the <code>~/.voice-assistant</code> folder on your Mac. To stop sending data to Anthropic or OpenAI, sign out of Claude Code or Codex; their data is managed in your accounts with them.",
        ]],
        ["Children", [
          "Walkship is a tool for software developers and isn’t directed at children.",
        ]],
        ["Changes", [
          "If this policy changes, the new version will be published on this page with a new date.",
        ]],
        ["Contact", [
          `Questions about privacy: <a href="${REPO}/issues">open an issue on GitHub</a>.`,
        ]],
      ],
    },
  },
  ru: {
    lang: "ru",
    dir: "../",
    other: { href: "../", label: "EN", name: "English" },
    title: "Walkship — ушёл гулять, вернулся к готовому PR",
    description: "Голосовой партнёр для твоих проектов. Обсуждаешь фичу на прогулке, Walkship собирает спецификацию, а Claude Code или Codex реализует её на твоём Mac.",
    nav: { how: "Как это работает", features: "Возможности", privacy: "Приватность", faq: "Вопросы", download: "Скачать" },
    eyebrow: "Голосовой партнёр для твоих проектов",
    h1: "Ушёл гулять —<br>вернулся к готовому PR.",
    sub: "Обсуждаешь фичу голосом на прогулке. Walkship собирает из разговора спецификацию, а твой агент — Claude Code или Codex — реализует её на твоём Mac.",
    mac: "Скачать для Mac",
    apk: "APK для Android",
    caption: "Бета · Mac с Apple Silicon, macOS 14+ · нужен Claude Code или Codex",
    langNote: "",
    howLabel: "Как это работает",
    howTitle: "От мысли на прогулке до пул-реквеста",
    steps: [
      ["Говоришь", "Hands-free: говоришь, после паузы фраза уходит ассистенту, ответ звучит сразу, потом он снова слушает. Ассистент знает проект: читает код, историю git и заметки, помнит прошлые обсуждения.", "session"],
      ["Он собирает итоги", "Скажи «оформляй» — разговор превращается в решения, открытые вопросы и фичи со спецификацией и критериями готовности.", "feature-done"],
      ["Агент пишет код", "Одно нажатие — Claude Code или Codex реализует фичу в отдельном git worktree, прогоняет проверки и коммитит. Пуш на телефон, пересказ голосом, «открывай» — и PR готов.", "feature-running"],
    ],
    flow: {
      zones: ["На прогулке", "Дома", "В облаке"],
      you: ["Телефон", "Приложение Walkship: говоришь, слушаешь, получаешь пуш, когда работа готова"],
      link: ["голос, ответы, пуши", "Wi-Fi или Tailscale"],
      mac: ["Твой Mac", "Walkship · всё хранится здесь", [
        ["talk", "Ведёт разговор голосом и знает проект: код, историю git, прошлые обсуждения"],
        [2, "Собирает итоги: решения, открытые вопросы, спецификации"],
        [3, "Запускает Claude Code или Codex в отдельном git worktree"],
      ]],
      outs: [
        ["cloud", "Claude или ChatGPT", "Твоя подписка: модели для разговора и кода под твоим логином", "запросы и ответы"],
        ["pr", "Пул-реквест на GitHub", "Проверки пройдены. Откроется по твоей команде.", "git push"],
      ],
      note: "Серверов Walkship и аккаунтов нет.",
    },
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
    agentsLabel: "Claude или Codex",
    agentsTitle: "Твой агент и твоя подписка — для каждой роли",
    agents: [
      "Разговор, итоги и реализация — каждый выбирает Claude Code или Codex и модель",
      "Модели Codex — из твоего аккаунта ChatGPT, модели Claude — из подписки Claude",
      "Кончился лимит одной подписки — ассистент предложит продолжить на другой",
      "Лимиты обеих подписок рядом, на Mac и на телефоне",
    ],
    privLabel: "Приватность",
    privTitle: "Всё на твоём Mac. И больше нигде.",
    privacy: [
      "Код уходит только агентам, которыми ты и так пользуешься, — Claude Code или Codex — через их локальные CLI под твоим логином. Ключи API не нужны.",
      "Никаких аккаунтов и облака Walkship. Сервер, база и голоса работают на Mac.",
      "Распознавание речи — Whisper на Mac и системное на телефоне. Голос ассистента — нейро-голоса, тоже локально.",
      "Телефон подключается к Mac по QR-коду — через домашнюю сеть или Tailscale.",
      "Основная ветка не трогается: агент работает в отдельном worktree, а PR открываешь ты.",
    ],
    reqLabel: "Требования",
    reqTitle: "Что нужно",
    reqs: [
      "Mac с Apple Silicon (M1 и новее), macOS 14 Sonoma или новее",
      "Claude Code с подпиской Claude (Pro или Max) или Codex с подпиской ChatGPT (Plus или Pro) — хватит одного, вместе тоже работают",
      "Около 5 ГБ свободного места — голосовой пакет занимает ~3,3 ГБ",
      "git, для пул-реквестов — <code>gh</code> (GitHub CLI)",
      "По желанию — iPhone или телефон на Android и Tailscale, чтобы говорить вне дома",
      "Интерфейс и голос: русский или английский — одна настройка на всё",
    ],
    dlTitle: "Возьми следующую идею на прогулку",
    dlNote: "При первом запуске приложение само всё настроит: вход в Claude Code или Codex, голосовой пакет и QR-код для телефона.",
    allReleases: "Все версии и что в них нового",
    obtainium: "Обновления на Android: добавь Walkship в Obtainium",
    qr: "Открыл страницу на Mac? Наведи сюда камеру телефона на Android, чтобы скачать на него APK.",
    faqLabel: "Вопросы",
    faq: [
      ["Нужен ключ API?", "Нет. Всё идёт через Claude Code или Codex по твоей подписке Claude или ChatGPT."],
      ["Можно вместо Claude Code использовать Codex?", "Да, для всего: в «Настройки → Агенты и модели» у разговора, итогов и реализации свой выбор — Claude или Codex и модель. Если у одной подписки кончится лимит, ассистент предложит продолжить на другой."],
      ["Куда уходит мой код?", "Только агентам, которыми ты пользуешься, — Claude Code или Codex — так же, как если бы ты запускал их сам. У Walkship нет своего сервера в облаке."],
      ["Есть версия для iPhone?", "Да, она скоро появится в App Store. Android уже есть — APK на странице загрузки, а на Mac можно говорить прямо в приложении."],
      ["Агент не сломает мой репозиторий?", "Он работает в отдельном git worktree на своей ветке. Основная ветка остаётся как была, а PR открывается только по твоей команде."],
      ["На каких языках?", "На русском и английском. Одна настройка переключает экраны, ассистента и голос — и на Mac, и на телефоне."],
      ["Как обновляться?", "Приложение на Mac само проверяет новые версии и предлагает скачать их из строки меню. Данные остаются на месте. На Android добавь Walkship в <a href=\"https://obtainium.imranr.dev\">Obtainium</a> — оно будет ставить новые APK из релизов на GitHub, как только они выходят."],
    ],
    storyTitle: "Почему «Walkship»",
    story: "<em>Walk</em> + <em>ship</em>: гулять и выпускать. Аристотель обсуждал идеи, прохаживаясь по галерее Ликея, Дарвин думал, нарезая круги по тропе Sandwalk. Раньше такие прогулки заканчивались забытыми мыслями. Прогулка с Walkship заканчивается пул-реквестом.",
    footer: { releases: "Версии", issues: "Сообщить о проблеме", press: "Пресс-кит", privacy: "Политика конфиденциальности" },
    alt: { mac: "Walkship на Mac: пульт с агентами, разговорами и открытыми вопросами", phone: "Walkship на телефоне" },
    android: {
      title: "Walkship для Android",
      description: "Скачай APK Walkship для Android и обновляй его через Obtainium.",
      label: "Android",
      h1: "Walkship для Android",
      caption: "Android 7+ · телефонное приложение для Walkship на твоём Mac",
      button: "Скачать APK",
      stepsTitle: "Установка",
      steps: [
        "Нажми <b>Скачать APK</b> и открой файл, когда он скачается.",
        "Android попросит разрешить установку приложений из браузера — разреши один раз.",
        "Открой Walkship и отсканируй QR-код с экрана настройки в приложении на Mac.",
      ],
      updatesTitle: "Обновления",
      updates: "Приложения, установленные так, Android сам не обновляет. Добавь Walkship в <a href=\"https://obtainium.imranr.dev\">Obtainium</a> — оно будет ставить новые версии из релизов на GitHub, как только они выходят.",
      obtainium: "Добавить в Obtainium",
    },
    policy: {
      title: "Политика конфиденциальности — Walkship",
      description: "Walkship не собирает персональные данные: ни аккаунтов, ни серверов Walkship, ни аналитики. Всё остаётся на твоём Mac.",
      label: "Политика конфиденциальности",
      h1: "Walkship не собирает твои данные",
      updated: "Обновлено 28 сентября 2026 года",
      lead: "У Walkship нет аккаунтов, своих серверов, аналитики, рекламы и слежки. Разработчик ничего не получает ни о тебе, ни о твоих проектах. Здесь описано, где хранятся данные и что уходит с твоих устройств, — чтобы это можно было проверить.",
      sections: [
        ["Где хранятся данные", [
          "Walkship — это приложение для Mac и приложение для телефона (iPhone и Android). Телефон общается только с сервером Walkship, который работает на твоём Mac, — через домашнюю сеть или частную сеть вроде Tailscale, которую ты настраиваешь сам.",
          "Разговоры, расшифровки, заметки, итоги, фичи, журналы агентов и настройки хранятся в базе на твоём Mac, в папке <code>~/.voice-assistant</code>. На телефоне остаются только адрес Mac, ключ подключения и фразы, которые ждут отправки, пока Mac недоступен.",
          "У разработчика нет доступа ни к чему из этого.",
        ]],
        ["Что уходит с устройств и куда", [
          "<b>Модели ИИ.</b> Чтобы отвечать, собирать итоги и реализовывать фичи, Mac запускает Claude Code (Anthropic) или Codex (OpenAI) — что ты выберешь — под твоим собственным аккаунтом. Сказанное тобой, ход разговора и части проекта, которые читает ассистент, уходят в этот сервис — так же, как если бы ты запускал инструмент сам. Поиск в интернете, если он включён, выполняет тот же сервис. Действуют их политики: <a href=\"https://www.anthropic.com/legal/privacy\">Anthropic</a>, <a href=\"https://openai.com/policies/privacy-policy/\">OpenAI</a>.",
          "<b>Распознавание речи.</b> На телефоне Walkship использует системное распознавание. Если язык установлен на устройстве, речь распознаётся на нём; иначе система может отправить звук в Apple (iPhone) или Google (Android), чтобы превратить его в текст, — по их политикам. На Mac речь распознаётся локально через Whisper. Голос ассистента синтезируется локально на Mac.",
          "<b>Пуш-уведомления.</b> Когда агент закончил или упал, Mac отправляет на телефон уведомление с названием фичи и статусом через пуш-сервис Expo, а тот передаёт его в Apple Push Notification service или Firebase Cloud Messaging. Пуш-токен телефона хранится только на Mac.",
          "<b>GitHub.</b> Пул-реквесты открываются через твои <code>git</code> и <code>gh</code>, когда ты об этом попросишь. Приложение для Mac проверяет на GitHub новые версии Walkship; этот запрос не несёт персональных данных, кроме того, что есть в любом веб-запросе, например IP-адреса.",
          "<b>Подключённые сервисы.</b> Если ты добавишь MCP-серверы (например, Jira, Sentry или базу данных), ассистент будет отправлять им запросы от твоего имени — так, как ты их настроил.",
        ]],
        ["Разрешения", [
          "<b>Микрофон и распознавание речи</b> — чтобы слышать тебя, пока ты говоришь с ассистентом. Walkship не записывает в фоне и не хранит звук.",
          "<b>Фотографии</b> — iOS требует описать это разрешение, потому что системный выбор файлов умеет читать фотоальбом. Walkship не открывает твои фото.",
          "<b>Уведомления</b> — чтобы сообщить, что агент закончил работу.",
        ]],
        ["Что получает разработчик", [
          "Ничего. В Walkship нет аналитики, отчётов о сбоях, рекламы и сторонней слежки, приложение не использует рекламный идентификатор. Ничего не продаётся и не передаётся, потому что ничего не собирается.",
          "Если ты сообщишь о проблеме на GitHub, написанное там будет публичным и подчиняется правилам GitHub.",
        ]],
        ["Управление данными", [
          "Проекты, обсуждения, заметки и фичи удаляются в приложении. Чтобы удалить всё, удали приложения Walkship и папку <code>~/.voice-assistant</code> на Mac. Чтобы перестать отправлять данные в Anthropic или OpenAI, выйди из Claude Code или Codex; данными у них управляешь в своих аккаунтах.",
        ]],
        ["Дети", [
          "Walkship — инструмент для разработчиков и не предназначен для детей.",
        ]],
        ["Изменения", [
          "Если политика изменится, новая версия появится на этой странице с новой датой.",
        ]],
        ["Связь", [
          `Вопросы о конфиденциальности: <a href="${REPO}/issues">создай issue на GitHub</a>.`,
        ]],
      ],
    },
  },
};

// The map of the pieces above the steps, in three zones: the phone on a walk, the Mac at home (dashed:
// everything stays inside it), the models and the PR in the cloud. The 01–03 marks point at the steps
// below. A row on wide screens, a column on phones (style.css → .flow).
const flow = (f) => {
  const step = (n) => `<em class="flow-step">0${n}</em>`;
  const col = (cls, zone, body) =>
    `<div class="flow-col ${cls}"><p class="flow-zone"${zone ? "" : ' aria-hidden="true"'}>${zone || "&nbsp;"}</p><div class="flow-body">${body}</div></div>`;
  const link = (cls, what, how, { both = false, n = 0 } = {}) =>
    `<div class="flow-link ${cls}">${both ? '<b class="head-start"></b>' : ""}<b class="head-end"></b>${n ? step(n) : ""}<span class="flow-what">${what}</span>${how ? `<span class="flow-how">${how}</span>` : ""}</div>`;
  const node = (ic, title, body) => `<div class="flow-node">${icon(ic)}<h3>${title}</h3><p>${body}</p></div>`;
  const [macTitle, macSub, rows] = f.mac;
  return `<div class="flow">
      ${col("flow-col-walk", f.zones[0], node("phone", ...f.you))}
      ${col("flow-col-link", "", link("flow-link-phone", ...f.link, { both: true, n: 1 }))}
      ${col("flow-col-home", f.zones[1], `<div class="flow-node flow-mac">${icon("mac")}<h3>${macTitle}</h3><p class="flow-sub">${macSub}</p>
        <ul class="flow-rows">${rows.map(([m, t]) => `<li>${typeof m === "number" ? step(m) : icon(m)}<span>${t}</span></li>`).join("")}</ul>
      </div>`)}
      ${col("flow-col-out", f.zones[2], f.outs
        .map(([ic, t, body, what], i) => `<div class="flow-out">${link("flow-link-out", what, "", { both: i === 0 })}${node(ic, t, body)}</div>`)
        .join(""))}
    </div>
    <p class="flow-note">${f.note}</p>`;
};

// A screenshot that follows the page's theme: dark and light captures of the same screen,
// taken with the app in the page's language (assets/img/en, assets/img/ru).
const shot = (c, name, alt, cls, eager = false) =>
  `<picture class="${cls}"><source media="(prefers-color-scheme: light)" srcset="${c.dir}assets/img/${c.lang}/${name}-light.webp"><img src="${c.dir}assets/img/${c.lang}/${name}-dark.webp" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;

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
      ${shot(c, "mac-home", c.alt.mac, "window-shot", true)}
    </div>
    <div class="phone">${shot(c, "phone-home", c.alt.phone, "phone-shot", true)}</div>
  </div>
</section>

<section id="how" class="section">
  <div class="wrap">
    <p class="label">${c.howLabel}</p>
    <h2>${c.howTitle}</h2>
    ${flow(c.flow)}
    <ol class="steps">
      ${c.steps
        .map(
          ([t, body, img], i) => `<li class="step">
        <div class="phone phone-sm">${shot(c, `phone-${img}`, t, "phone-shot")}</div>
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
      ${shot(c, "mac-board", c.features[1][1], "window-shot")}
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

<section id="agents" class="section">
  <div class="wrap split split-flip">
    <div>
      <p class="label">${c.agentsLabel}</p>
      <h2>${c.agentsTitle}</h2>
      <ul class="ticks">
        ${c.agents.map((p) => `<li>${icon("check")}<span>${p}</span></li>`).join("\n        ")}
      </ul>
    </div>
    <div class="window window-side">
      <div class="window-bar"><i></i><i></i><i></i></div>
      ${shot(c, "mac-models", c.agentsTitle, "window-shot")}
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
      ${shot(c, "mac-session", c.steps[0][0], "window-shot")}
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
        <a class="qr" href="${c.dir}${c.lang === "en" ? "" : "ru/"}android/">
          <img src="${c.dir}assets/qr-android-${c.lang}.svg" width="116" height="116" alt="">
          <span>${c.qr}</span>
        </a>
        <p class="caption"><a href="${REPO}/releases">${c.allReleases} →</a><br><a href="${OBTAINIUM}">${c.obtainium} →</a></p>
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
      <a href="privacy/">${c.footer.privacy}</a>
      <a href="${c.other.href}" hreflang="${c.other.label.toLowerCase()}">${c.other.name}</a>
    </nav>
  </div>
</footer>
<script src="${d}assets/site.js" defer></script>
</body>
</html>
`;
}

// A page one level below the landing (docs/<slug>/ and docs/ru/<slug>/): same header, footer and theme.
function subPage(c, slug, p, main, tail = "") {
  const d = `${c.dir}../`;
  const home = c.lang === "en" ? `${SITE}/` : `${SITE}/ru/`;
  const url = `${home}${slug}/`;
  const other = c.lang === "en" ? `../ru/${slug}/` : `../../${slug}/`;
  return `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${p.title}</title>
<meta name="description" content="${p.description}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${SITE}/${slug}/">
<link rel="alternate" hreflang="ru" href="${SITE}/ru/${slug}/">
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
    <a class="brand" href="../">${logo(d)}</a>
    <nav class="nav"></nav>
    <a class="lang" href="${other}" hreflang="${c.other.label.toLowerCase()}" title="${c.other.name}">${c.other.label}</a>
    <a class="btn btn-sm" href="../#download">${c.nav.download}</a>
  </div>
</header>

${main}

<footer class="foot">
  <div class="wrap foot-in">
    ${logo(d)}
    <span class="foot-tag">Go for a walk. Come back to a PR.</span>
    <nav>
      <a href="${REPO}/releases">${c.footer.releases}</a>
      <a href="${REPO}/issues">${c.footer.issues}</a>
      <a href="../">Walkship</a>
      <a href="${other}" hreflang="${c.other.label.toLowerCase()}">${c.other.name}</a>
    </nav>
  </div>
</footer>
${tail}</body>
</html>
`;
}

// The privacy policy, the page App Store Connect and Google Play link to: docs/privacy/ and docs/ru/privacy/.
function policyPage(c) {
  const p = c.policy;
  return subPage(c, "privacy", p, `<main class="section legal">
  <div class="wrap">
    <p class="label">${p.label}</p>
    <h1>${p.h1}</h1>
    <p class="legal-date">${p.updated}</p>
    <p class="legal-lead">${p.lead}</p>
    ${p.sections
      .map(([h, paras]) => `<section>
      <h2>${h}</h2>
      ${paras.map((t) => `<p>${t}</p>`).join("\n      ")}
    </section>`)
      .join("\n    ")}
  </div>
</main>`);
}

// The QR images (docs/assets/qr-android-{en,ru}.svg) encode these pages' fixed URLs, so they were made once with
// the `qrcode` package; remake them only if SITE changes.
// Where the QR code in the download panel leads: docs/android/ and docs/ru/android/. The phone opens it
// after a scan and gets the APK in one tap (site.js points the button at the latest release's file).
function androidPage(c) {
  const p = c.android;
  return subPage(c, "android", p, `<main class="section legal android">
  <div class="wrap">
    <p class="label">${p.label}</p>
    <h1>${p.h1}</h1>
    <p class="caption"><span data-version></span>${p.caption}</p>
    <div class="cta">
      <a class="btn" data-asset="apk" href="${REPO}/releases/latest">${icon("android")}${p.button}</a>
    </div>
    <section>
      <h2>${p.stepsTitle}</h2>
      <ol>${p.steps.map((t) => `<li>${t}</li>`).join("")}</ol>
    </section>
    <section>
      <h2>${p.updatesTitle}</h2>
      <p>${p.updates}</p>
      <div class="cta"><a class="btn btn-ghost" href="${OBTAINIUM}">${p.obtainium}</a></div>
    </section>
  </div>
</main>`, `<script src="${c.dir}../assets/site.js"></script>\n`);
}

fs.writeFileSync(path.join(root, "docs/index.html"), page(copy.en));
fs.mkdirSync(path.join(root, "docs/ru"), { recursive: true });
fs.writeFileSync(path.join(root, "docs/ru/index.html"), page(copy.ru));
for (const c of [copy.en, copy.ru]) {
  const dir = path.join(root, "docs", c.lang === "en" ? "" : "ru", "privacy");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), policyPage(c));
  const android = path.join(root, "docs", c.lang === "en" ? "" : "ru", "android");
  fs.mkdirSync(android, { recursive: true });
  fs.writeFileSync(path.join(android, "index.html"), androidPage(c));
}
console.log("docs/index.html, docs/ru/index.html, docs/{,ru/}privacy/index.html, docs/{,ru/}android/index.html");
