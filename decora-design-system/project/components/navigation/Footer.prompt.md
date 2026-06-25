Navy site footer with brand block, link columns, contact, and a fine legal baseline.

```jsx
<Footer
  logo={<img src="/assets/brand/decora-logo-white.png" height={28} />}
  tagline="Architectural finishing you trust when the finish matters."
  contact={<>info@decora.ca<br/>+1 905 000 0000</>}
  columns={[
    {title:"Services", links:[{label:"Powder Coating"},{label:"Sublimation"},{label:"Architectural"}]},
    {title:"Company", links:[{label:"About"},{label:"Facility"},{label:"Careers"}]},
    {title:"Resources", links:[{label:"Spec sheets"},{label:"Warranties"}]},
  ]}
/>
```
