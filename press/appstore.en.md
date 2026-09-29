# Walkship — App Store listing (English, U.S.)

The texts for App Store Connect, field by field. Limits in brackets.
Rules kept here: no other mobile platforms in the description (guideline 2.3.10); no other companies' brands in
the name, subtitle or keywords (2.3.7) — Claude Code and Codex appear in the description only as requirements;
the description says up front that the app needs the Mac app. Keywords don't repeat words from the name and subtitle.

## Name (30)

```
Walkship
```

## Subtitle (30)

```
Walk, talk, come back to a PR
```

## Promotional text (170)

```
Talk a feature through on a walk. Walkship turns the conversation into a spec, and your coding agent builds it on your Mac. Come back to a pull request.
```

## Description (4000)

```
Walkship is a voice partner for your software projects. Talk a feature through while you walk — the assistant knows your code, its git history and your past discussions. It turns the conversation into a spec, and your coding agent builds it on your Mac. You come back to a pull request.

HOW IT WORKS
• You talk. Hands-free: speak, pause, and the assistant answers out loud, then listens again. Tap to interrupt at any moment, or type instead.
• It sums up. Say "wrap it up", and the conversation becomes decisions, open questions and features with a spec and acceptance criteria.
• An agent ships it. One tap, and Claude Code or Codex builds the feature on its own branch on your Mac and runs the checks. You get a notification, a spoken recap, and a pull request when you say so.

EVERYTHING A THINKING WALK NEEDS
• Quick notes — drop a thought without a conversation; the assistant files it under the right project and asks when it isn't sure.
• Feature board — every feature of every project: drafts, queued, agent at work, done.
• Memory — "What did we decide about settings?" The assistant finds it in past discussions of any project.
• Digest — one button, and you hear what agents finished, where they failed and what's still open.
• Mockups — "Show me what the screen would look like", right in the conversation.
• Nothing lost offline — a phrase you said waits on the phone and goes out once your Mac is reachable.
• English and Russian — one setting for the screens, the assistant and the voice.

WHAT YOU NEED
Walkship on iPhone is the companion to the free Walkship app for Mac, which does the work:
• A Mac with Apple Silicon and macOS 14 or later, with Walkship for Mac from ilyabazhenov.github.io/walkship
• Claude Code with a Claude subscription, or Codex with a ChatGPT subscription — one is enough
• The phone pairs with the Mac by QR code, over your home network or Tailscale away from home

PRIVATE BY DESIGN
No accounts, no Walkship servers, no analytics, no ads. Your conversations and projects stay on your Mac; your code goes only to the agent you already use, under your own login. Your main branch stays untouched — the agent works in its own git worktree, and a pull request opens only when you say so.
```

## Keywords (100)

```
voice,ai,coding,agent,assistant,developer,programmer,spec,code,git,ideas,notes,brainstorm,hands-free
```

## URLs

- Support: https://github.com/ilyabazhenov/walkship/issues
- Marketing: https://ilyabazhenov.github.io/walkship/
- Privacy policy: https://ilyabazhenov.github.io/walkship/privacy/

## App Review notes (4000)

App Store Connect → App Review → Notes. "Sign-in required" stays off: there are no accounts, the demo opens without one.

```
Walkship is the iPhone companion to Walkship for Mac, a free app the user runs on their own Mac (like the Plex or Home Assistant apps, which talk to a server the user hosts). The Mac does the work: it runs the user's own Claude Code or Codex under the user's own subscription. There are no Walkship accounts and no Walkship servers.

HOW TO REVIEW WITHOUT A MAC — the built-in demo
1. On first launch, read the notice about where conversations go and tap "Agree and continue".
2. On the first screen, tap "Try without a Mac". The demo opens with made-up projects; a banner at the top says the replies are recorded.
3. At the bottom, with the project "trailnote" selected, tap the microphone button. A conversation opens.
4. Say anything, or tap the "Say: …" hint above the "Talk" button. The microphone and speech recognition are real; the assistant's replies are pre-recorded in the app's voice and follow a short script. Tap during a reply to interrupt it.
5. After three exchanges, say "Wrap it up" (or tap "Sum up"). The conversation becomes a summary and a feature spec.
6. Open the feature and tap "Run implementation". A simulated coding-agent run shows its log and finishes in about 20 seconds.
7. Also try "Digest" on the home screen (a spoken summary) and "Discuss the result by voice" on a finished feature.
"Exit" on the demo banner leaves the demo. Nothing in the demo leaves the device.

REAL USE (not needed for review)
Requires a Mac with Apple Silicon (macOS 14+) running Walkship for Mac (https://ilyabazhenov.github.io/walkship/) and a Claude or ChatGPT subscription. The phone pairs with the Mac by QR code over the home network or the user's own Tailscale network.

PERMISSIONS AND CONFIGURATION
- Microphone and Speech Recognition: to hear the user during a conversation. Nothing is recorded in the background and no audio is stored.
- Local Network: to connect to the Walkship app on the user's own Mac.
- Background audio (UIBackgroundModes: audio): during a hands-free conversation on a walk, the assistant's reply keeps playing after the screen locks.
- NSAllowsArbitraryLoads: the app connects only to the server the user runs on their own Mac, by a local-network or Tailscale address over plain HTTP, which cannot have a public TLS certificate. The app contacts no third-party hosts itself.
- Photo Library usage string: required at upload because a system file library links the photo APIs. The app never requests this permission and never accesses photos.
- Notifications: optional, to tell the user when a coding agent has finished.

PRIVACY
No accounts, no analytics, no ads, no tracking. Conversations and projects stay on the user's Mac. The Mac sends conversation text to Anthropic (Claude) or OpenAI (ChatGPT/Codex) under the user's own account; the app explains this on first launch and asks for agreement (guideline 5.1.2(i)). Privacy policy: https://ilyabazhenov.github.io/walkship/privacy/
```

## App information

- Category: Developer Tools; secondary: Productivity
- Content rights: no third-party content
- Age rating: every answer "No" / "None" → 4+
- Encryption: `ITSAppUsesNonExemptEncryption = false` in app.json, no documents
- Digital Services Act: non-trader (free, no in-app purchases)
- App privacy: "Data not collected" — see the privacy policy
