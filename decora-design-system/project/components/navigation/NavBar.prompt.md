Slim sticky site header. Transparent over the dark hero, frosted cream once scrolled.

```jsx
<NavBar
  logo={<span style={{ fontWeight: 500, fontSize: 18, letterSpacing: "0.04em", color: "var(--cream-50)" }}>SnapBill</span>}
  links={[{label:"Features"},{label:"How it works"},{label:"Pricing"},{label:"Sign in"}]}
  cta={<Button variant="light" size="sm">Start free</Button>}
  variant="onDark"
/>
```

`variant`: `auto` (toggles on scroll), `onDark` (transparent, light text), `solid` (frosted). Defaults the CTA to a Button; override with `cta`. Use a light wordmark on dark, navy wordmark on cream.
