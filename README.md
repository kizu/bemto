# Bemto — mixins for writing [BEM][]-style code for [Pug][] [![Build Status][build]][build-link] [![NPM version][version]][version-link]

[BEM]: http://bem.github.com/bem-method/pages/beginning/beginning.en.html
[Pug]: https://pugjs.org/

[build]: https://travis-ci.org/kizu/bemto.png?branch=master
[build-link]: https://travis-ci.org/kizu/bemto
[version]: https://badge.fury.io/js/bemto.pug.png
[version-link]: http://badge.fury.io/js/bemto.pug

## Table of Contents

1. [Install & Use](#install--use)
2. [Features](#features)
    - [Blocks](#blocks)
    - [Elements](#elements)
    - [Modifiers](#modifiers)
    - [Changing the tag name](#changing-the-tag-name)
    - [Attributes](#attributes)
    - [Context](#context)
    - [Redefining tag's metadata](#redefining-tags-metadata)

3. [Settings](#settings)
    - [Adding Prefix](#adding-prefix)
    - [Setting for Element syntax](#setting-for-element-syntax)
    - [Setting for Modifier syntax](#setting-for-modifier-syntax)
    - [Setting for allowing nested elements](#setting-for-allowing-nested-elements)
    - [Scope for the settings](#scope-for-the-settings)
    - [Setting for the output syntax of the elements/modifiers](#setting-for-allowing-nested-elements)


4. [Using for building complex mixins](#using-for-building-complex-mixins)

## Install & Use

### Cloning

1. Clone `bemto` somewhere to your project:

    ```sh
    git clone git://github.com/kizu/bemto.git
    ```
2. Include it in your `.pug` project:

    ```Pug
    include bemto/bemto.pug
    ```

### Or install via npm / yarn

1. Install `bemto` to your project:

  ```sh
  # via npm
  npm i bemto -D

  # via yarn
  yarn add bemto -D
  ```

2. Include it in your `.pug` project:

  ```Pug
  include (path to node_modules, for example: ../../)node_modules/bemto.pug/bemto_webpack
  ```

### Use it:

    ```Pug
    +b.block1
      +e.element1 Foo
      +b.block2
        +e.A(href="#bar").element Bar
      +e.element2 Baz
    ```

    would render to something like

    ```HTML
    <div class="block1">
      <div class="block1__element1">
        Foo
      </div>
      <div class="block2">
        <a class="block2__element" href="#bar">Bar</a>
      </div>
      <div class="block1__element2">
        Baz
      </div>
    </div>
    ```

## Features

### Blocks

“Block” is the main thing there. It creates the block from the first passed class and creates the context for all nested elements.

You can create block calling the `b` mixin with some class attached to it:

```Pug
+b.foo bar
```

That would render as

```HTML
<div class="foo">bar</div>
```

While the simple block's syntax, of course, is harder than the simple Pug's tags, the main point is to create the contexts for elements.

### Elements

“Element” is a accessory element of the block. You can read on the concept of the elements in the [bem methodology](http://bem.github.com/bem-method/pages/beginning/beginning.en.html#Element), or in the [great article by Nicolas Gallagher](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/) (see the “Structured class names” part). Elements often are written using the block's name plus element's name with some separator (often `__` or `-`) in-between.

Bemto gives a convenient way to declare the elements: just use the `e` mixin inside any block context:

```Pug
+b.foo
  +e.bar baz
```

This would render like

```HTML
<div class="foo">
  <div class="foo__bar">baz</div>
</div>
```

#### Context of the element

Note that bemto uses the first classname of the block as a context for further elements. If you'd like to use another class without changing the order, you can mark it with `__` in the end:

```Pug
+b.foo.bar__
  +e.baz
```

This way instead of `foo` bemto would base the nested elements from the `bar`:

```HTML
<div class="foo bar">
  <div class="bar__baz">
  </div>
</div>
```

### Modifiers

“Modifier” is a state of the block or element. It is often written with the addition of it's type and/or value after the single underscore like `block_mode_foo` or just `block_foo`. However, at the most cases, the block must contain either the original block/element's class, either the modifier class.

Bemto makes it easy to write such modifiers, 'cause you don't need now to write the same block's name twice:

```Pug
+b.block_foo bar
```

Becomes

```HTML
<div class="block block_foo">bar</div>
```

See? You write just `.block_foo` but by fact get the `.block.block_foo` instead!

But what if you need to have more than one modifier on one block or element? Bemto have a way to do so: add a class to your block or element starting with a modifier token:

```Pug
+b.block_foo._bar._baz
  +e.element_type_lol._mode_moddy Blah
```

and that would render as

```HTML
<div class="block block_foo block_bar block_baz">
  <div class="block__element block__element_type_lol block__element_mode_moddy">
    Blah
  </div>
</div>
```

You can also use shorter modifier syntax like `class="block -modifier"` (but only when this syntax won't be used for delimiting full modifiers or elements).

```Pug
+b.-foo.-bar.-baz
```

this would render to

```HTML
<div class="block -foo -bar -baz">
</div>
```


### Changing the tag name

By default the blocks and elements render as `div`s. You can change it by passing the desired tag name as the first class in uppercase:

```Pug
+b.SPAN.foo bar
```

Or by passing an `options` object with a `tag` param:

```Pug
+b({tag: 'span'})foo bar
```

Either way would render as

```HTML
<span class="foo">bar</span>
```

### Attributes

Like any Pug tag or mixin, blocks and elements can take attributes that would go to the desired tags:

```Pug
+b.foo(title="Oh, it's a title")
  +e.A.bar(href='#baz') baz
```

would render like

```HTML
<div class="foo" title="Oh, it's a title">
  <a class="foo__bar" href="#baz">baz</a>
</div>
```

#### Automatic attributes

There are some tags like `img` that must have at least one attribute set. Bemto would create attributes with some predefined values for such tags. So, for images this code — `+b.image(src="foo.png")` would render `<img alt="" class="image" src="foo.png"/>` — you can see that in that case there is the added empty `alt`.

Also, in some cases there is a need to adjust some attributes according to other ones. For `img` if the `alt` is set, but the `title` is not we'd need to set it to empty, 'cause there'd be a inconsistency between browsers (IE would show the `title` bubble for `alt`). And from the other side, if there is only `title` set in an image, we'd need to clone it to `alt`. Bemto do all those things.

### Context

Look at the previous example: you have there some excess code that you can throw away. It's the `('a')` part — as long as you set the `href` attribute, the block would automagically become the link. Also, there are other tags that you can omit: `li` in `ul` or `ol` context, or `span` in any already inline context.

So, here is a bigger example:

```Pug
+b.UL.list
  +b.list-item
    +e.link(href="foo")
      +e.text foo
  +b.list-item
    +e.link(href="bar")
      +e.text bar
```

Would render to

```HTML
<ul class="list">
  <li class="list-item">
    <a class="list-item__link" href="foo">
      <span class="list-item__text">foo</span>
    </a>
  </li>
  <li class="list-item">
    <a class="list-item__link" href="bar">
      <span class="list-item__text">bar</span>
    </a>
  </li>
</ul>
```

For now that's all, but there would be other contexts in the future of bemto.

### Redefining tag's metadata

In a case you'd like some tag to set a different context, i.e. to override it's content_type, you can use a `metadata` option for the block/element. For example, if you'd like a link to have block context, you can redefine it in this way:

```Pug
+b({ metadata: { content_type: 'block' } }).A.foo
  +e.bar
```

would render as

``` html
<a class="foo">
<div class="foo__bar">baz
</div></a>
```

## Settings

There are some settings you can set for different syntaxes of BEM.

For doing so, you must set them after including the `bemto` like this:

```Pug
-
  set_bemto_settings({
    prefix: '',
    element: '__',
    modifier: '_'
  })
```

Here you can see all available settings with their default values.

### Adding Prefix

If you'd like to prefix all your bemto-generated blocks, you can set the `prefix` setting to a String or an Object.

#### Strings for prefix setting

If you'd set a string, it would be just prepended to the names of all blocks:

```Pug
- set_bemto_settings({ prefix: 'b-' })

+b.block
  +e.element foo

```

and that would then render as

```HTML
<div class="b-block">
  <div class="b-block__element">
    foo
  </div>
</div>
```

Note that if you had already used this prefix in a classname, it won't be added, so you won't have occasional duplicated prefixes.

#### Objects for prefix setting

If you'd want to have more control over prefixes, you can use a special object instead of a string:

``` Pug
-
  set_bemto_settings({
    prefix: {
      '': 'b-',
      'js-': true,
      'is-': 'is-',
      'global-': '',
      'nope-': false,
      'sc-': 'shortcut-'
    }
  })
```

Look at the above example, it have all the variations the prefix object accepts:

- The empty string for key works the same as a string setting: you'd get the value for this key prepended for all classnames without detected prefixes.

- If a value for any key is `true`, this prefix would be always treated as such and won't be prepended by other prefixes.

- If a value for a key is `false` or an empty string, the classnames with this prefix would be rendered without it.

- In other cases, where the key and the value are both strings, all the key prefixes in the source code would be replaced with the value ones, and also all of those prefixes would be treated as registered ones, so you wouldn't add other prefixes for them.

### Setting for Element syntax

If you don't like the default elements syntax with the `__` delimiter, you can set using the `element` setting:

```Pug
- set_bemto_settings({ element: '-' })

+b.block
  +e.element foo

```

this would render to

```HTML
<div class="block">
  <div class="block-element">
    foo
  </div>
</div>
```

### Setting for Modifier syntax

If you'd like to use different modifier syntax, like the one Nicolas Gallagher mentioned in [his article](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/), you can use the `modifier` setting:

```Pug
- set_bemto_settings({ modifier: '--' })

+b.block--modifier-name.--other-modifier foo
```

and that would expand to

```HTML
<div class="block block--modifier-name block--other-modifier">
  foo
</div>
```

### Setting for allowing nested elements

There can be cases when you could want to make elements of elements, i.e. when using element names instead of block names:

```Pug
+b.block-element
  +e.element2
```

renders by default to

```HTML

<div class="foo__bar">
  <div class="foo__baz">
  </div>
</div>
```

If you'd like to have `foo__bar__baz` in the output instead, you can set the `flat_elements` to `false`:

```Pug
- set_bemto_settings({ flat_elements: false })

+b.foo__bar
  +e.baz
```

This would render with the nested element:

```HTML
<div class="foo__bar">
  <div class="foo__bar__baz">
  </div>
</div>
```

### Scope for the settings

If you'll need to have some settings just in a certain scope, you can wrap your code in `bemto_scope` mixin, passing your desired settings right into it:

```Pug
+b.foo_bar
  +bemto_scope({
      prefix: 'b-',
      element: '-',
      modifier: '--'
    })
    +b.nnnn
      +e.mmmm--kkkk
  +e.baz
```

Would render as

```HTML
<div class="foo foo_bar">
  <div class="b-nnnn">
    <div class="b-nnnn-mmmm b-nnnn-mmmm--kkkk">
    </div>
  </div>
  <div class="foo__baz">
  </div>
</div>
```

### Setting for the output syntax of the elements/modifiers

If you'd like to use different syntax of the element/modifier delimiter in Pug source and the html output, you can use the `ouput_element` and `output_modifier` settings, otherwise the same delimiter as in the `element` and `modifier` settings would be used.

```Pug
-
  set_bemto_settings({
    element: '-',
    modifier: '--',
    output_element: '__',
    output_modifier: '_'
  })

+b.block.block2-
  +e.element--modifier foo
```

would output

```HTML
<div class="block block2">
  <div class="block2__element block2__element_modifier">foo
  </div>
</div>
```

You can see how the source uses the `-` for element and `--` for modifier, but the result gets `__` and `_` instead.

### Setting for delimiters between classnames

If you'd like to have extra delimieters between the rendered classnames for clarity, you can use a `class_delimiter` setting:

``` Pug
- set_bemto_settings({ class_delimiter: '|' })

+b.foo.bar_baz
```

Would be rendered as

``` HTML
<div class="foo | bar | bar_baz">
</div>
```

Note that there would be always added spaces around the given delimiter, so you don't need to include them in the setting's value.

## Using for building complex mixins

This is somewhat obvious, but I must mention that the bemto blocks would be great for using as the bricks for building more complex blocks. The Pug mixins work in the way where you can translate any attributes through to the any inner blocks. So you can do this:

```Pug
mixin link(url)
  +b.SPAN.link(href=url)&attributes(attributes)
    block
```

And then use it in this way:

```Pug
+link('#Foo') Foo

+link('https://github.com')._external Github

+link('http://kizu.ru').url(rel="me") Here I am

+link Ah, I'm not a link

+link('https://github.com')
  +e.icon(src="http://favicon.yandex.net/favicon/github.com")
  +e.text Github
```

And that would render to

```HTML
<a class="link" href="#Foo">Foo</a>

<a class="link link_external" href="https://github.com">Github</a>

<a class="link url" href="http://kizu.ru" rel="me">Here I am</a>

<span class="link">Ah, I'm not a link</span>

<a class="link" href="https://github.com">
  <img alt="" role="presentation" class="link__icon" src="http://favicon.yandex.net/favicon/github.com"/>
  <span class="link__text">Github</span>
</a>
```

There you can see almost all of the bemto features that can be used for any mixin with `attributes` variable attached to any inner bemto block inside of it.

- - -

To be continued!

If you'd like to follow on the bemto progress, [follow me on twitter](https://twitter.com/kizmarh/).

- - -

Copyright (c) 2012 Roman Komarov <kizu@kizu.ru>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
