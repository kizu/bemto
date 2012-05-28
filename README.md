# bemto — mixins for writing [BEM](http://bem.github.com/bem-method/pages/beginning/beginning.en.html)-style code for [Jade](http://jade-lang.com/).

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