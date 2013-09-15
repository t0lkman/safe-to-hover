# safe-to-hover.js

Making pages scroll smoothly is super important and `:hover` does not play well
with scrolling.

Why? [Because painting is really

scroll a page fast, it leaves a trail of required repainting underneath the
cursor as the document flies by. This makes the page janky. We dont like jank.

# 123
If your toplevel document is what scrolls:

```js
SafeToHover.decorateScrollableElement(window);
```

If its an overflow scroll div:

```js
SafeToHover.decorateScrollableElement(myOverflowDiv);
```

Either way, modify your selectors thusly:
```css
/* Before */
my-element.my-class:hover {
}

/* After */
body[safe-to-hover] my-element.my-class:hover {
}
```

Have fun.