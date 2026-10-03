# The Grok Hack: submission template

Template repository for entries to **[The Grok Hack](https://grokhack.com/)** (hackathon.grok.me), the global hackathon powered by Grok.
Click **Use this template** (or let the grokhack.com portal create your entry repo under `github.com/Blockchains`), fill in
`submission.json` and this README, and push. CI validates the submission, builds/tests your code and scans for secrets.

| File | What to do |
|---|---|
| `submission.json` | Project name, team, track/partner platform, demo links, Grok models + features used. Validated by CI against `submission.schema.json`. |
| `README.md` | Replace this text with your project write-up (sections below). |
| `starter/` | Working Node 22 starter that calls the xAI API (streaming chat) with `XAI_API_KEY`. Keep, replace or delete. |
| `docs/JUDGING.md` | What judges look at. |

## Write-up sections (replace this README)
**Problem** · **Solution** · **How Grok is used** (models, tool calling, live search, structured outputs, vision, voice) · **Partner platform integration** ·
**What was built during the hackathon** · **Run it locally** · **Demo video** · **Team** · **License**

## Rules for keys
Never commit API keys. Use `.env` (git-ignored) locally and repository secrets in Actions. CI runs gitleaks on every push and fails on leaks.

## Local checks
```bash
python3 scripts/validate_submission.py submission.json
cd starter && npm ci && npm test && npm run e2e   # e2e: live answer with XAI_API_KEY, otherwise checks api.x.ai rejects the call (needs key)
```

License: MIT (template). Your entry may use any OSI licence; set it in `submission.json` and `LICENSE`.
