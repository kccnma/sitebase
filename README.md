# [SiteBase](https://kccnma.github.io/sitebase/ "SiteBase Demo")

Latest development version of Sitebase, an ongoing, always-a-work-in-progress minimal HTML + CSS + JS base front-end framework for simple web site projects. This is the full dev version that contains the uncompiled source files, documentation, lessons, and post-build pre-compiled static-rendered files in multiple variations for different users and development environments.

- Variation 1 - a Static CSS Variation
- Variation 2 - a Sassy CSS Variation (GUI workflow using Prepros)
- Variation 3 - a NPM/Gulp Variation (CLI workflow)
- Variation 4 - a Parcel Variation (CLI workflow)

## Documentation
- [SiteBase documentation](https://kccnma.github.io/sitebase/documentation.html "SiteBase Docs (incomplete)")

## Demos

- [SiteBase home](https://kccnma.github.io/sitebase/ "SiteBase Website")
- [SiteBase demo](https://kccnma.github.io/sitebase/variations/sitebase1/ "SiteBase Static Demo (No Frills)")

## Links to stand-alone variation repos

- [sitebase1-static](https://github.com/kccnma/sitebase1-static)
- [sitebase2-sassy](https://github.com/kccnma/sitebase2-sassy)
- [sitebase3-npmgulp](https://github.com/kccnma/sitebase3-npmgulp)
- [sitebase4-parcel](https://github.com/kccnma/sitebase4-parcel)

## To Run the full dev version locally
- make sure that you have node and gulp installed locally/globally
```
$ npm install
$ npm run dev
```

## Updates
- 01-04-21
  - Updated gulpfile.js to Gulp 4
  - Consolidated gulp docs into main gulpfile (removable at the bottom, temp fix for now)
- 03-09-20
  - Added parcel version
- 02-10-20
  - Added meta descriptions to head for all sub pages and lessons
  - Added meta http-equiv to head for ie/edge
- 03-28-19
  - Fixed various old legacy example bugs
- 02/06/19
  - Updated the grid to flexbox
  - Added a max-width to all paragraphs
  - Switched to box-sizing: border-box
  - Added meta description to head
  - Removed Google shiv
- 12-17-18
  - Updated gulp (with gulp.series)
  - Removed old HTML5 conditional in head

## Roadmap

- Refactor mobile nav Javascript (w/ data attributes)
- Add more reusable components and design patterns
- Add more layout examples
