Amount input with a `$` adornment box, matching the brand Input. Use anywhere a dollar value is entered (package rate, travel fee, deposit).

```jsx
<MoneyField label="Travel fee" value={fee} onChange={(e) => setFee(Number(e.target.value))} />
```

Notes: number input under the hood; read `Number(e.target.value)` in your handler. Teal focus ring, square corners.
