# AGENTS.md: grokhack-submissions

Instructions for AI coding agents (Grok, Cursor, Claude Code, Codex, Copilot and others) working **in** this repo or **using it as a building block**. Humans: see [README.md](README.md).

## What this is

Template repository for The Grok Hack entries: submission.json validated against submission.schema.json, a Node 22 streaming-chat starter for the xAI API, judging notes, and CI that validates, builds/tests, runs a real api.x.ai e2e and scans for secrets.

- Kind: template · stability: `stable` · licence: MIT
- Machine-readable manifest: [`blocks.json`](blocks.json) (schema: [BLOCKS-SCHEMA](https://github.com/Blockchains/.github/blob/main/docs/BLOCKS-SCHEMA.md))
- How it fits with the other Blockchains repos: [Build with Blocks](https://github.com/Blockchains/.github/blob/main/docs/BUILD-WITH-BLOCKS.md)

## Setup

```bash
cd starter && npm ci
```

## Build and test

```bash
python3 scripts/validate_submission.py submission.json
cd starter && npm test && npm run e2e
```

Tests hit **live** public networks/APIs (the org rule is no mocks). A failure can be an upstream outage: re-run before changing code.

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `XAI_API_KEY` | no | starter e2e live answer |

## Structure

| Path | What |
|---|---|
| `submission.json, submission.schema.json` | entry metadata + schema |
| `scripts/validate_submission.py` | validator |
| `starter/` | Node streaming chat starter (grok.mjs, index.mjs, tests, e2e) |
| `docs/JUDGING.md` | judging criteria |
| `.github/ISSUE_TEMPLATE/` | issue forms |

## Conventions

- Entrants replace README.md; keep the section list.
- Any OSI licence, declared in submission.json and LICENSE.

## Extension points

- Replace `starter/` with your app; CI auto-detects Node/Python at the repo root.

## Do

- Fill every required submission.json field.

## Don't

- Ship code that fakes a Grok answer when the key is missing or credits are exhausted; show the 'needs key' / 'xAI credits needed' notice instead.
- Invent data, mock network responses in shipped code, or hard-code values that should come from the live source; every repo here is 'no mocks, real data'.
- Commit secrets, keys or `.env` files. Run `gitleaks` before pushing; CI and the org policy reject leaks.

## Using it from another project

- **Use this template** (git): `GitHub template`
- **submission.schema.json** (file): `required: project, tagline, team, track, repo, grok, license, status`
- **starter/** (file): `cd starter && npm ci && npm test && npm run e2e`

See the README section [Use as a building block](README.md#use-as-a-building-block) for a copy-paste example.

## Related blocks

- [Blockchains/grokhack-forge](https://github.com/Blockchains/grokhack-forge): compose the app first, then submit with this template
- [Blockchains/hackathon-entry-template](https://github.com/Blockchains/hackathon-entry-template): generic (non-Grok) hackathon template
- [Blockchains/hackathons](https://github.com/Blockchains/hackathons): tracker issues
