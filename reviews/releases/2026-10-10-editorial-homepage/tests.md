# Release test verification

Date: 10 October 2026

Fresh full-suite validation of the existing working tree before the authorised commit, push and deployment. No source files were changed by this verification.

| Check | Result |
| --- | --- |
| Complete existing Jest suite | 25 suites passed, 182 tests passed, 0 failures |
| Copy-checker tests | 2 passed, 0 failures |
| Source copy lint | Passed, 0 warnings |

Commands used:

```sh
CI=true COREPACK_ENABLE_PROJECT_SPEC=0 corepack pnpm --dir frontend --config.pm-on-fail=warn --config.verify-deps-before-run=false test --watchAll=false --runInBand
CI=true COREPACK_ENABLE_PROJECT_SPEC=0 corepack pnpm --dir frontend --config.pm-on-fail=warn --config.verify-deps-before-run=false test:copy
CI=true COREPACK_ENABLE_PROJECT_SPEC=0 corepack pnpm --dir frontend --config.pm-on-fail=warn --config.verify-deps-before-run=false lint:copy
```

All commands exited with status 0. The runner printed the existing package-manager declaration warning that the project is configured for yarn; execution through the approved corepack pnpm wrapper completed successfully. No failed assertions or source fixes were identified.

Logs: `jest.log`, `copy-tests.log`, `source-copy.log`.

The production build and live deployment acceptance are separate checks owned by the release coordinator.

Verdict: green.
