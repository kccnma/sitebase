CHANGES
=======

2025-10-03 — Dependency cleanup and gulpfile updates (aggressive remediation)

Summary
-------
- Performed an aggressive `npm audit fix --force` to remediate known vulnerabilities.
- Ensured `npm install` completes and `npm run build` (gulp build) runs successfully.
- Removed or avoided native/binary toolchains that caused build-time failures (e.g., `node-sass` and image optimizer binary dependencies).
- Replaced the vulnerable HTML minifier pipeline with `html-minifier-terser` usage in `gulpfile.js`.
- Simplified image handling: image files are now copied from `src/img` to `dist/img` to avoid fragile binary optimizers; consider adding a `sharp`-based pipeline later for safe optimization.

Files changed
-------------
- `package.json` — applied forced upgrades and removals (see git diff for exact changes).
- `package-lock.json` — updated to reflect the installed dependency tree.
- `gulpfile.js` — updated HTML/task pipelines and removed binary imagemin usage.
- `dist/` — updated build artifacts after running `gulp build`.

Notes & follow-ups
------------------
- Recommended: create a git commit/branch to snapshot this state if you haven't already.
- If you want image optimization back, I recommend using `sharp` (pure JS, actively maintained) instead of `gulp-imagemin` and its binary plugins.
- You may want to pin or review some upgraded packages in `package.json` if specific versions are required for compatibility.

Verification
------------
- `npm install` completed without errors.
- `npm run build` completed successfully.
- `npm audit` returned zero vulnerabilities.

If you'd like, I can:
- Create a git backup branch and commit these changes.
- Reintroduce secure image optimization using `sharp` and a small gulp wrapper.
- Revert specific upgrades if you have constraints on package versions.

