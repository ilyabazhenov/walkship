# Walkship — page copy (English)

Ready-made blocks for the landing page, a store listing, a post or an email. Same order as `docs/index.html`.

## Name and tagline

- Name: **Walkship**. One capital letter: not WalkShip, not WALKSHIP.
- Tagline: **Go for a walk. Come back to a PR.**

## Descriptions

**One line (under 80 characters).**
A voice partner for your projects: talk it through on a walk, an agent ships it.

**Short (under 200 characters).**
Walkship is a voice partner for developers. Talk a feature through on a walk; Walkship writes the spec, and Claude
Code builds it on your Mac and opens a pull request.

**Paragraph.**
The best ideas rarely come at the desk. Walkship is a voice partner that knows your projects: it reads the code
and the git history and remembers past discussions and notes. Talk to it on the go, and it turns the conversation
into decisions, open questions and features with acceptance criteria. One tap, and a Claude Code agent builds the
feature on its own branch on your Mac, runs the checks and sends you a push. Talk the result over, say "open it",
and the pull request is up. Everything runs on your Mac, on your Claude subscription, with no Walkship cloud.

## Hero

- Eyebrow: `A VOICE PARTNER FOR YOUR PROJECTS`
- Headline: **Go for a walk. Come back to a PR.**
- Subhead: Talk a feature through while you walk. Walkship turns the conversation into a spec, and Claude Code
  builds it on your Mac.
- Buttons: **Download for Mac** · **Android APK**
- Under the buttons: Beta · Apple Silicon Mac, macOS 14+ · requires Claude Code with a subscription
- Note: The app speaks Russian for now; English is on the way.

## How it works — three steps

1. **You talk.** Hands-free: speak, pause, and the assistant answers out loud, then listens again. It knows the
   project: it reads the code, the git history and your notes, and remembers past discussions.
2. **It sums up.** Say "wrap it up" and the conversation becomes decisions, open questions and features with a spec
   and acceptance criteria.
3. **An agent ships it.** One tap, and Claude Code or Codex builds the feature in a separate git worktree, runs the
   checks and commits. A push on your phone, a spoken recap, "open it" — and the PR is up.

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
- **Nothing lost offline.** A phrase you said waits on the phone and goes out once the server is back.

## Runs on your Mac

- Your code goes nowhere but your own Claude Code: Walkship calls the local `claude` CLI under your login. No API key.
- No accounts and no Walkship cloud. The server, the database and the voices run on your Mac.
- Speech recognition: Whisper on the Mac, the system recognizer on the phone. The assistant's voice: neural voices,
  also local.
- The phone pairs with the Mac by QR code over your home network or Tailscale, with a single token.
- Your main branch stays untouched: the agent works in its own worktree, and you decide when a PR opens.

## Requirements

- A Mac with Apple Silicon (M1 or later), macOS 14 Sonoma or later.
- Claude Code with a Claude subscription (Pro or Max). Codex is optional, as a second agent.
- About 5 GB free: the voice pack (Whisper and neural voices) takes about 3.3 GB.
- git; `gh` (GitHub CLI) for pull requests.
- Optional: an Android phone, and Tailscale to talk away from home.
- The interface and the voice are Russian-only for now.

## FAQ

**Is it free?**
[Decide before publishing: is the beta free? Will there be a paid plan?]

**Do I need an Anthropic API key?**
No. Conversations, summaries and implementation all go through Claude Code on your subscription.

**Where does my code go?**
Nowhere but your own Claude Code, exactly as if you ran it yourself. Walkship has no cloud server.

**Is there an iPhone app?**
Not yet. There's the Mac app and Android. On the Mac you can talk right in the app.

**Can the agent break my repository?**
It works in a separate git worktree on its own branch. Your main branch stays as it was, and a PR opens only when
you say so.

**Why Russian only?**
Walkship started as a personal tool. English is planned.

**How do updates work?**
The app checks for new versions and offers them from the menu bar. Your data stays in place.

## The story (for "About", a post or a press release)

**Walkship** = *walk* + *ship*. The best ideas come on a walk, and in developer speak *ship* means "release".
There's a second layer: *-ship* as in *partnership* — a walking companion, someone to think out loud with.

Aristotle discussed ideas while pacing the Lyceum's colonnade. Darwin thought while circling his Sandwalk path.
Nietzsche trusted only thoughts that came while walking. Those walks used to end in forgotten ideas. A walk with
Walkship ends in a pull request.

The mark: a pistachio "done" disc with a check, ringed by a recorded phrase — voice bars with uneven syllables and
pauses. Voice around, result in the middle: said, done.
