# compress

Browser-side image compression. Resizes a `File` (or `Blob`) and quality-steps
JPEG output until the result is at or below a target byte budget. Wraps
[pica](https://github.com/nodeca/pica) for the resize.

## Usage

```js
import { compressImage } from 'https://cdn.jsdelivr.net/gh/holmhq-admin/cdn@master/libs/utils/compress/v-0.0.1/compress.min.mjs'

const blob = await compressImage(file, { maxBytes: 250_000, maxDim: 1536 })
formData.append('file', blob, 'upload.jpg')
```

## Options

- `maxBytes` (default `250_000`) — upper bound for the returned blob.
- `maxDim` (default `1536`) — long-edge cap in pixels before compression.

Returns a `Blob` (`image/jpeg`). Quality is stepped 0.85 → 0.75 → 0.65 →
0.55 → 0.5; if the smallest size still exceeds `maxBytes`, the 0.5-quality
blob is returned anyway (best effort, never throws on size).

## Why these defaults

- `250_000` bytes ≈ 250 KB, which fits comfortably under holm's 1 MiB
  egress request body cap with plenty of headroom for multipart framing.
- `1536` matches the largest output dimension we currently request from
  Azure image-edits — no point uploading a higher-resolution reference.

## Notes

- Pica internally uses Web Workers via `blob:` URLs. If the host page's
  CSP blocks `worker-src blob:`, pica auto-falls back to main-thread JS
  resize (slower, still correct).
- Pica is fetched at runtime from `cdn.jsdelivr.net/npm/pica@9/+esm`. The
  consuming app's CSP must allow `cdn.jsdelivr.net`.
