# Bemto — mixins for writing [BEM](http://bem.github.com/bem-method/pages/beginning/beginning.en.html)-style code for [Jade](http://jade-lang.com/).

## Install & Use

1. Clone `bemto` somewhere to your project:

    ```sh
    git clone git://github.com/kizu/bemto.git
    ```
2. Include it in your `.jade` project:

    ```Jade
include bemto/bemto
```

3. Use it:

    ```Jade
    +b.block1
      +e.element1 Foo
      +b.block2
        +e("a")(href="#bar").element Bar
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

```Jade
+b.foo bar
```

That would render as

```HTML
<div class="foo">bar</div>
```

While the simple block's syntax, of course, is harder than the simple Jade's tags, the main point is to create the contexts for elements.

### Elements

“Element” is a accessory element of the block. You can read on the concept of the elements in the [bem methodology](http://bem.github.com/bem-method/pages/beginning/beginning.en.html#Element), or in the [great article by Nicolas Gallagher](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/) (see the “Structured class names” part). Elements often are written using the block's name plus element's name with some separator (often `__` or `-`) inbetween.

Bemto gives a convenient way to declare the elements: just use the `e` mixin inside any block context:

```Jade
+b.foo
  +e.bar baz
```

This would render like

```HTML
<div class="foo">
  <div class="foo__bar">baz</div>
</div>
```

### Modifiers

…

### Changing the tag name

By default the blocks and elements render as `div`s. You can change it by passing the desired tag name as an argument:

```Jade
+b('span').foo bar
```

That would render as

```HTML
<span class="foo">bar</span>
```

### Attributes

Like any Jade tag or mixin, blocks and elements can take attributes that would go to the desired tags:

```Jade
+b.foo(title="Oh, it's a title")
  +e('a').bar(href='#baz') baz
```

would render like

```HTML
<div class="foo" title="Oh, it's a title">
  <a class="foo__bar" href="#baz">baz</a>
</div>
```

### Context

Look at the previous example: you have there some excess code that you can throw away. It's the `('a')` part — as long as you set the `href` attribute, the block would automagically become the link. Also, there are other tags that you can omit: `li` in `ul` or `ol` context, or `span` in any already inline context.

So, here is a bigger example:

```Jade
+b('ul').list
  +e.item
    +e.link(href="foo")
      +e.inner foo
  +e.item
    +e.link(href="bar")
      +e.inner bar
```

Would render to

```HTML
<ul class="list">
  <li class="list__item">
    <a class="list__link" href="foo">
      <span class="list__inner">foo</span>
    </a>
  </li>
  <li class="list__item">
    <a class="list__link" href="bar">
      <span class="list__inner">bar</span>
    </a>
  </li>
</ul>
```

For now that's all, but there would be other contexts in the future of bemto.

