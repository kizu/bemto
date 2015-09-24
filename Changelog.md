# Bemto changelog

## v1.0.0 (in development)

- `src`-less images now would have null gif inlined (or set to the given src).
- Changed the way the tag is passed: using either a first uppercase class or an option object.
- Changed the settings to be a single object and not a bunch of variables.
- Changed the way custom tag works, properly rendering unknown tags (including self-closing if defined in options).
- Fixed the jade-bug-hardcoded doctype.
- Fixed classless blocks

## v0.2.3 (2015-12-30)

- Fixed the absence of the `time` tag.

## v0.2.2 (2015-05-05)

- Fixed support for more html5 elements: `<figure>`, `<figcaption>`, `<main>`, `<picture>` and `<source/>`.

## v0.2.1 (2015-04-22)

- Fixed `select` and `option` rendered as `div`s.

## v0.2.0 (2015-03-16)

- Removed (before undocummented) automixing of current block on element blocks.
- Added auto inputs on `type` attribute, #38.
- Added `<svg>` to supported tags, #39.

## v0.1.1 (2015-03-03)

- Fixed `<hr>` being replaced with `<br>`, #37.

## v0.1.0 (2014-05-16)

- Initial version
