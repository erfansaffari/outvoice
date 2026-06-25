Continuous partner/client logo marquee. Use two rows (one `reverse`) for the brand's two-row treatment.

```jsx
<LogoMarquee speed={38}>{logos}</LogoMarquee>
<LogoMarquee speed={44} reverse>{moreLogos}</LogoMarquee>
```

Children render twice for a seamless loop; animation pauses on hover and respects reduced-motion. Edge `fade` mask on by default.
