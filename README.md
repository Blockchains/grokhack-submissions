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

<!-- blocks:start -->
## Use as a building block

> **For AI agents and builders:** read [`AGENTS.md`](AGENTS.md) (setup, commands, structure, rules), [`llms.txt`](llms.txt) (doc map) and the machine-readable [`blocks.json`](blocks.json) ([schema](https://github.com/Blockchains/.github/blob/main/docs/BLOCKS-SCHEMA.md)). How all Blockchains blocks fit together: **[Build with Blocks](https://github.com/Blockchains/.github/blob/main/docs/BUILD-WITH-BLOCKS.md)** · org catalogue: [https://blockchains.github.io/blocks.json](https://blockchains.github.io/blocks.json).

**What it exports**

| Export | Type | Install / access |
|---|---|---|
| `Use this template` | git | `GitHub template` |
| `submission.schema.json` | file | `required: project, tagline, team, track, repo, grok, license, status` |
| `starter/` | file | `cd starter && npm ci && npm test && npm run e2e` |

**Minimal example** (from the README)

```bash
python3 scripts/validate_submission.py submission.json
cd starter && npm ci && npm test && npm run e2e   # live answer with XAI_API_KEY, otherwise proves api.x.ai rejects the call
```

**Inputs → outputs**

- In: `submission.json` (JSON) validated by scripts/validate_submission.py; `XAI_API_KEY` (secret)
- Out: `validated entry repo` (repo)

**Composes with**

- [Blockchains/grokhack-forge](https://github.com/Blockchains/grokhack-forge): compose the app first, then submit with this template
- [Blockchains/hackathon-entry-template](https://github.com/Blockchains/hackathon-entry-template): generic (non-Grok) hackathon template
- [Blockchains/hackathons](https://github.com/Blockchains/hackathons): tracker issues

**Versioning & stability:** `stable`. `submission.schema.json` changes are announced in the README; keep old fields readable.
<!-- blocks:end -->
