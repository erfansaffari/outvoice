SnapBill action button — square-leaning, Everett Medium, used for primary CTAs and inline actions.

```jsx
<Button variant="primary" size="lg" iconRight={<i data-lucide="arrow-right" />}>
  Request a quote
</Button>
```

Variants: `primary` (navy fill, the default CTA), `secondary` (hairline outline), `ghost` (text-only, gains teal on hover), `accent` (teal fill, use sparingly), `light` (cream fill, for dark/navy sections). Sizes: `sm` `md` `lg`. Pass `href` to render an `<a>`. Hover darkens fills / adds teal to outlines; press nudges down 1px.
