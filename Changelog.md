# Bemto changelog

## v2.1.0 (2016-12-26)

- Added support for prefix objects.
- Added settings for delimiters between classes.
- Fixed escaping for inline tags' attribute values, #84.

## v2.0.0 (2016-12-18)

- Now supporting Pug, released as `bemto.pug` in npm.

## v1.0.3 (2016-04-27)

- Fixed improper boolean attributes for custom tags.

## v1.0.2 (2016-02-26)

- Fixed incorrect behaviour of mixed blocks, #70.
- Fixed the incorrect rendering of falsey attribute in inline tags, #71.

## v1.0.1 (2016-02-12)

- Fixed incorrect handling of class tags with numbers.

## v1.0.0 (2016-02-01)

- Added a `bemto_scope` mixin for setting settings at a scope level.
- Added a way to redefine prefix on block/element level.
- Added a way to redefine tag's metadata in block's options.
- Added a `flat_elements` setting to allow elements of elements.
- Added a `role="presentation"` for links with empty `alt`, via [Estelle Weyl](https://twitter.com/estellevw/status/685332992227540992).
- Added a `role="main"` for the `<main>` tag.
- Added `output_element` and `output_modifier` for changing the syntax of the output delimiters.
- `src`-less images now would have null gif inlined (or set to the given src).
- Changed the default way the tag is passed: using either a first uppercase class or an option object.
- Changed the settings to be a single object and not a bunch of variables.
- Changed the way custom tag works, properly rendering unknown tags (including self-closing if defined in options).
- Changed the way attribute-implied tags are handled.
- Changed the order of the classes in output (was: alphabet, now: the same as in source).
- Fixed a case when the context stack was incorrectly emptied.
- Fixed the jade-bug-hardcoded doctype.
- Fixed classless blocks.
- Fixed modifiers on elements with certain separators defined.
- Fixed the blockness of a textarea and a pre tags to prevent from extra whitespace to appear inside.
- Added Code of Conduct.

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
