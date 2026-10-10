# Editorial homepage release preflight

Date: 10 October 2026.

The owner explicitly requested: "Commit and push to main and origin/main, and redeploy". This supersedes the local-only execution boundary recorded in the implementation plan, design contract and earlier reviews. Those documents describe the implementation stage, not a continuing prohibition on this release.

## Verified release target

- Repository: `williamcjrogers/VeriCase-Website-New`.
- Branch: `main`, initially equal to `origin/main` at `8e3f282ec343cbbd4a1bce1a7965babf5dec376d` after a fresh fetch.
- Vercel team: `quantum-commercial-solutions`.
- Vercel project: `veri-case-website-new-re2v`, ID `prj_JavSKONSjXnMvEpWc3lIYoMVLuGV`.
- Verified Git connection: this repository, production branch `main`, root directory `frontend`.
- Production domain: `https://veri-case.com`; `www.veri-case.com` redirects to the apex.

The Vercel connector returned a team-access error. The installed authenticated Vercel CLI successfully inspected the same explicit team and project. No deployment configuration, permission, dependency or lockfile was changed.

## Fresh checks

- Jest: 25 suites, 182 tests passed.
- Copy-checker tests: 2 passed.
- Source and prerendered copy lint: zero warnings.
- Production build and prerendering: passed.
- Generated sample hashes: all eight unchanged.
- Build assets: `main.61b75f85.js`, `main.9bc83858.css`.
- Full additional source preflight: approved, no material blocker.
- Whitespace check: passed.

The existing package-manager declaration and Node deprecation warnings did not prevent the build or tests. The independent reports in this folder record their exact scope. Earlier responsive and interaction evidence remains in the local optimisation review folder.

## Commit scope and final verification

The release includes the accumulated approved frontend source and tests, design contract, implementation plan and architecture records. The runtime session autosave and bulk historical screenshots, PDFs and raw review captures remain local and are not part of the website source commit.

After pushing, the operator must verify the new commit on `origin/main`, the Git-triggered production deployment for that exact SHA, its READY state and domain assignment, and representative desktop and phone browser behaviour. This preflight is not itself evidence of a successful production deployment.
