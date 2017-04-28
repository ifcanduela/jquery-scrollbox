# jquery-scrollbox

A very simple jQuery plugin to add vertical scrollbars to block-level elements.

Requires [jQuery](https://jquery.com/) and the
[Mousewheel plugin](https://github.com/jquery/jquery-mousewheel).

## Usage

Add the script to your HTML:

```html
<script src="/js/vendor/jquery-scrollbox.js"></script>
```

Put a class on the container you want to make scrollable. It must have a
definite height. Then select it with jQuery and call `scrollbox()` on it.

```js
$('.scrollable').scrollbox();
```

Finally, include the styles from `jquery-scrollable.css` in your stylesheet (and modify
to taste).
