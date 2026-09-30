# Walkship — page copy (English)

Ready-made blocks for the landing page, a store listing, a post or an email. Same order as `docs/index.html`.

## Name and tagline

- Name: **Walkship**. One capital letter: not WalkShip, not WALKSHIP.
- Tagline: **Go for a walk. Come back to a PR.**

## Descriptions

**One line (under 80 characters).**
A voice partner for your projects: talk it through on a walk, an agent ships it.

**Short (under 200 characters).**
Walkship is a voice partner for developers. Talk a feature or a new product idea through on a walk; Walkship writes
the spec, and Claude Code or Codex builds it on your Mac and opens a pull request.

**Paragraph.**
The best ideas rarely come at the desk. Walkship is a voice partner that knows your projects: it reads the code
and the git history and remembers past discussions and notes. Talk to it on the go, and it turns the conversation
into decisions, open questions and features with acceptance criteria. One tap, and Claude Code or Codex builds the
feature on its own branch on your Mac, runs the checks and sends you a push. Talk the result over, say "open it",
and the pull request is up. An idea can start before there's any code: talk it over across several walks, and
connect the repository when it exists. Everything runs on your Mac, on your Claude or ChatGPT subscription, with no
Walkship cloud.

## Hero

- Eyebrow: `A VOICE PARTNER FOR YOUR PROJECTS`
- Headline: **Go for a walk. Come back to a PR.**
- Subhead: Talk through a feature or a new product idea while you walk. Walkship turns the conversation into a
  spec, and your coding agent — Claude Code or Codex — builds it on your Mac.
- Buttons: **Download for Mac** · **Android APK**
- Under the buttons: Beta · Apple Silicon Mac, macOS 14+ · requires Claude Code or Codex

## How it works — three steps

1. **You talk.** Hands-free: speak, pause, and the assistant answers out loud, then listens again. It knows the
   project: it reads the code, the git history and your notes, and remembers past discussions.
2. **It sums up.** Say "wrap it up" and the conversation becomes decisions, open questions and features with a spec
   and acceptance criteria.
3. **An agent ships it.** One tap, and Claude Code or Codex builds the feature in a separate git worktree, runs the
   checks and commits. A push on your phone, a spoken recap, "open it" — and the PR is up.

## Before the code

- Label: `BEFORE THE CODE`
- Headline: **Start with an idea. Connect the code when there is some.**
- Subhead: A product often begins as a conversation, long before a repository. Walkship keeps it from the first
  walk to the first PR.
- A project can start without code: an idea you talk over across several walks, with memory, notes and summaries.
- The Product preset gives the assistant the right habits: tell what's checked from what's a guess, keep to the
  first version.
- Instead of features, the summary keeps to-dos you tick off, on the Mac and the phone alike.
- Once a repository exists, "Connect code" attaches the folder: discussions and to-dos stay, and to-dos can go to an
  agent.
- Not just code: presets for a trip, a renovation, a move or an event — the same talks, memory and summaries.

## Features

- **Quick notes.** Drop a thought without a conversation. The assistant files it under the right project, and asks
  when it isn't sure.
- **Feature board.** Every feature of every project: drafts, queued, agent at work, done. Start or restart right
  from the card.
- **Memory.** "What did we decide about settings?" — the assistant finds it in past discussions of any project.
- **Digest.** One button, and you hear what agents finished, where they failed, which PRs wait and what's still open.
- **Mockups.** "Show me what the screen would look like" — a sketch right in the conversation and in the spec.
- **Continue on the Mac.** Open a spec or a transcript in Claude Code, Cursor or Codex with one click.
- **MCP for your agents.** Claude Code, Cursor and Codex in the repo can see the project's ideas, decisions and
  features.
- **Your MCP servers.** Connect Jira, Sentry or a database, and the assistant uses them in conversation.
- **When the Mac is out of reach.** A phrase you said waits on the phone and goes out once the Mac is back. Or go on
  talking through a model with your own key — it all moves to the Mac later.

## Your Mac, your accounts. No Walkship cloud.

- Your code goes only to the agents you already use — Claude Code or Codex — through their local
  CLIs under your own login. No API keys.
- No accounts and no Walkship cloud. The server, the database and the voices run on your Mac.
- Speech recognition: Whisper on the Mac, the system recognizer on the phone. The assistant's voice: neural voices,
  also local.
- The phone pairs with the Mac by QR code, with a single token, and reaches it from anywhere: directly at home, through an encrypted relay away from it.
- Mac out of reach? The phone can go on with a model you set up with your own key — DeepSeek or any OpenAI-style
  API, even your own Ollama — straight from the phone.
- Your main branch stays untouched: the agent works in its own worktree, and you decide when a PR opens.

## Requirements

- A Mac with Apple Silicon (M1 or later), macOS 14 Sonoma or later.
- Claude Code with a Claude subscription (Pro or Max), or Codex with a ChatGPT subscription (Plus or Pro) — one is
  enough, both work together.
- About 5 GB free: the voice pack (Whisper and neural voices) takes about 3.3 GB.
- git; `gh` (GitHub CLI) for pull requests.
- Optional: an iPhone or an Android phone — it works at home and away, nothing else to install.
- Optional: an API key for DeepSeek or another OpenAI-style model, to keep talking on the phone while the Mac is out
  of reach.
- Interface and voice: English or Russian — one setting for both.

## FAQ

**Is it free?**
[Decide before publishing: is the beta free? Will there be a paid plan?]

**Do I need an API key?**
Not with the Mac: everything runs through Claude Code or Codex on your own Claude or ChatGPT subscription. A key is
needed only to keep talking on the phone while the Mac is out of reach — for DeepSeek or any OpenAI-style API.

**Can I use Codex instead of Claude Code?**
Yes, for everything: in Settings → Agents & models the conversation, summaries and implementation each pick Claude or
Codex and a model. When one subscription runs out, the assistant offers to go on with the other.

**Where does my code go?**
Only to the agents you use — Claude Code or Codex — exactly as if you ran them yourself. When you talk on the phone
without the Mac, what the assistant reads goes to the model you set up with your own key. Walkship has no cloud server.

**What if my Mac is off?**
The phone offers to go on through your own model. It remembers what the Mac knew about the project — past summaries,
features, notes — and reads the code from GitHub if you sign in. Once the Mac is back, everything you said moves over
to it, and a feature you asked to build starts there.

**Is there an iPhone app?**
Yes, it's on its way to the App Store. Android is available now as an APK, and on the Mac you can talk right in the app.

**Can the agent break my repository?**
It works in a separate git worktree on its own branch. Your main branch stays as it was, and a PR opens only when
you say so.

**What languages does it speak?**
English and Russian. One setting switches the screens, the assistant and the voice, on the Mac and the phone alike.

**How do updates work?**
The Mac app checks for new versions and offers them from the menu bar. Your data stays in place. On Android, add Walkship to Obtainium: it installs new APKs from GitHub releases as they come out.

## The story (for "About", a post or a press release)

**Walkship** = *walk* + *ship*. The best ideas come on a walk, and in developer speak *ship* means "release".
There's a second layer: *-ship* as in *partnership* — a walking companion, someone to think out loud with.

Aristotle discussed ideas while pacing the Lyceum's colonnade. Darwin thought while circling his Sandwalk path.
Nietzsche trusted only thoughts that came while walking. Those walks used to end in forgotten ideas. A walk with
Walkship ends in a pull request.

The mark: a pistachio "done" disc with a check, ringed by a recorded phrase — voice bars with uneven syllables and
pauses. Voice around, result in the middle: said, done.
