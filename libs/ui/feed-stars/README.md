# feed-stars

Animated 1–5 stars rating as a vanilla ES6 custom element. ~5 KB minified.
Adapted from Aaron Iker's [Stars rating animation](https://codepen.io/aaroniker/pen/XWrxyRJ).

- Single `<feed-stars>` custom element. No framework, no jQuery.
- Style-encapsulated via Shadow DOM; themable through CSS custom properties.
- Keyboard accessible (`role=radiogroup`, arrow keys, Home/End, Space/Enter).
- Honours `prefers-reduced-motion`.

## Use

Drop the module in (works directly from a CDN):

```html
<script type="module" src="https://cdn.toolbomber.com/libs/feed-stars/v-latest/feed-stars.min.mjs"></script>

<feed-stars value="3"></feed-stars>

<script>
  document.querySelector('feed-stars').addEventListener('change', (e) => {
    console.log(e.detail.value); // 1..5
  });
</script>
```

Pin to a specific version with `v-0.0.1` instead of `v-latest`.

Or as an ES import in a bundler:

```js
import 'feed-stars';
```

## API

### Attributes
- `value` — initial / current rating, integer `1`–`5`. Set to anything else (or omit) for "unset".
- `disabled` — non-interactive when present.

### Properties
- `el.value` — getter/setter, integer (`0` = unset, `1`–`5` = rating).
- `el.reset()` — clear back to unset.

### Events
- `change` — `event.detail.value` is the new rating (`1`–`5`, or `0` if the
  user cleared the rating by clicking the already-selected star). Bubbles +
  composed.

### Interaction
- Click or `Space` / `Enter` on a star — select it.
- Click or `Space` / `Enter` on the **already-selected** star — clear it
  (deselect → `value === 0`).
- `←` / `→` / `↑` / `↓` — step by one. `Home` / `End` jump to 1 / 5.

## Theming

All visual properties are CSS custom properties on the host (or any ancestor):

| Prop                            | Default                       |
| ------------------------------- | ----------------------------- |
| `--feed-stars-active`           | `#FFED76`                     |
| `--feed-stars-active-pale`      | `rgba(255, 237, 118, 0.36)`   |
| `--feed-stars-inactive`         | `#121621`                     |
| `--feed-stars-face-active`      | `#121621`                     |
| `--feed-stars-face-inactive`    | `#1C212E`                     |
| `--feed-stars-gap`              | `16px`                        |

Light-theme example:

```css
feed-stars {
  --feed-stars-active: #f59e0b;
  --feed-stars-active-pale: rgba(245, 158, 11, 0.36);
  --feed-stars-inactive: #e5e7eb;
  --feed-stars-face-active: #ffffff;
  --feed-stars-face-inactive: #fafafa;
}
```

## Dev

```sh
npm install
node build.js              # emit dist/feed-stars{,.min}.mjs
python3 -m http.server 8090   # then open example.html
```

## Publish to cdn.toolbomber.com

The cdn repo (`~/Projects/cdn`) uses one folder per version: `libs/<name>/v-X.Y.Z/`,
with a `v-latest` symlink pointing at the newest version.

```sh
node build.js
VER=$(node -p "require('./package.json').version")
DEST=~/Projects/cdn/libs/feed-stars/v-$VER
mkdir -p "$DEST"
cp dist/feed-stars.mjs dist/feed-stars.min.mjs "$DEST/"
(cd ~/Projects/cdn/libs/feed-stars && rm -f v-latest && ln -s "v-$VER" v-latest)
(cd ~/Projects/cdn && git add libs/feed-stars && \
  git commit -m "Add feed-stars v$VER" && git push)
```
