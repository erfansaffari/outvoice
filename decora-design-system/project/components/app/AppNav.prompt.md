Sticky frosted top navigation for the SnapBill product — wordmark left, tab buttons right, active tab filled navy. Use for any in-app screen.

```jsx
<AppNav
  brand="SnapBill"
  active="new"
  items={[
    { key: "new", label: "New", icon: <Icon name="file-text" size={15} /> },
    { key: "history", label: "History", icon: <Icon name="history" size={15} /> },
    { key: "settings", label: "Settings", icon: <Icon name="settings" size={15} /> },
  ]}
  onNavigate={(key) => setScreen(key)}
/>
```

Notes: dependency-free — pass icons per item. Clicking the wordmark navigates to the first item. Frosted cream background (cream 85% + 10px blur) over scrolling content.
