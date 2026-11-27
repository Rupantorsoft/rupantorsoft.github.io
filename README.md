# Rupantorsoft website

Source for [rupantorsoft.com](https://rupantorsoft.com), served by GitHub Pages from the `main` branch.

## Structure

```
index.html              Page markup (includes the SVG icon sprite)
assets/css/styles.css   Built stylesheet — generated, do not edit by hand
assets/js/main.js       Header, mobile menu, scroll reveal, contact form
assets/img/             Optimised logo and favicon images
src/styles.css          Stylesheet source (Tailwind + custom components)
tailwind.config.js      Brand colours and fonts
rupantorsoft_logo.png   Full-size logo (used for social sharing previews)
```

The site has no runtime JavaScript dependencies. Fonts come from Google Fonts;
the contact form posts to Formspree.

## Making changes

Requires Node.js 18 or newer.

```bash
npm install
npm run dev     # rebuilds assets/css/styles.css on every save
```

Open `index.html` in a browser to preview.

Whenever you change classes in `index.html` / `assets/js/main.js` or edit
`src/styles.css`, rebuild and commit the CSS:

```bash
npm run build
```

A GitHub Actions check fails any pull request whose `assets/css/styles.css`
is out of date.

## Icons

Icons are inline SVG `<symbol>`s at the top of `index.html`, used as
`<svg class="icon h-5 w-5"><use href="#i-name"/></svg>`. Interface icons come
from [Lucide](https://lucide.dev) 1.60.0 (ISC licence). To add one, copy the
inner paths from the icon's SVG into a new `<symbol>`.
