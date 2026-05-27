# [Site Base (v2)](https://kccnma.github.io/sitebase/ "SiteBase Docs and Demos")

The is the latest (v2) development version of SiteBase, an ongoing, work-in-progress minimal HTML + CSS + JS base front-end framework for simple web site projects. This is the full dev version that contains the uncompiled source files, documentation, lessons, and post-build pre-compiled static-rendered files in multiple variations for different users and development environments.

## Download
- [Download SiteBase .Zip](https://kccnma.github.io/sitebase/docs/variations/sitebase.static "Download SiteBase .zip file")

## Lessons
- [SiteBase Step-by-Step Lessons](https://kccnma.github.io/sitebase/docs/lessons.html "SiteBase Lessons (incomplete)")

## Documentation
- [SiteBase Docs](https://kccnma.github.io/sitebase/docs/index.html "SiteBase Docs (incomplete)")

## Demos
- [SiteBase Demo Site](https://kccnma.github.io/sitebase/docs/variations/sitebase-static/ "SiteBase Website")

## Looking for the original SiteBase (version #1)?
- [SiteBase1](https://kccnma.github.io/sitebase1/ "SiteBase1 Demo and Docs")

## To Run the full dev version locally
- WARNING: please note that this source develpment repository is currently under construction and may not install without manually updating multiple dependencies. This is a known issue and on the list of future project plans/goals.
- this source development version requires [node](https://nodejs.org/en/) and [gulp](https://gulpjs.com/) 
```
$ npm install
$ npm run dev
```

## Updates
- 5-27-26
  - Moved latest dev version of sitebase (v2) from sitebase2 repo to main sitebase repo
- 3-09-26
  - Refactored Layout to have a simple semantic grid system by default, with bonus/optional extras as addons, such as a 12-column grid
  - Refactored Site Structure to have a more simplified site navigation system by default, with bonus/optional extras as addons, such as nested lists as drop-down menus
- 1-23-26
  - made minor code refactor improvements (eg cleaned up core typography, added native smooth scrolling)
  - updated lessons with updated content and a new visual for the globals step
  - updated docs with added content and multiple new visuals visuals
- 1-14-26
  - implemented a limited set of css custom properties (variables)
- 10-02-25
  - ran npm audit fix --force and addressed all dependency warnings and errors
  - updated gulp and removed imagemin due to not able to fix it (simply piping/copying images from src to dist instead)
  - increased the navicon size 
- 02-12-25
  - refactored all css (removed redundacies, fixed variable usage, updated margin left/right to inline)
- 01-27-25
  - updated lessons 1b-6
  - added a new globals step (1b)
  - added a starter set of variables via css custom properties
  - updated the flexbox grid system using gap and a css custom property for the grid gap
- 01-24-25
  - initital migration of source code from SiteBase1

## Known Issues
- Legacy SiteBase1 Accordion UI components are dated (need to be updated to details summary elements)
- SASS/SCSS Related
  - Some css comments are awkward due to native css nesting 
  - Some vendor prefixed propoerties are still appearing and need to be removed

## Road Map
- Update all SiteBase Video Lessons
- Add SiteBase Logo as an Image/SVG to the Main/Docs Site Header
- Convert more sass variables > css custom properties (eg sizing units, border styles, etc)
- Remove sass compiler step once all css has been refactored to use modern css 
