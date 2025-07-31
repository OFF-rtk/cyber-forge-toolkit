# 🧪 Terminal UI System – React Component Library

A modern developer-focused design system inspired by terminal aesthetics. Built with speed, reusability, and clear UX principles. Optimized for building dashboards and SaaS apps with a unique retro-modern feel.

## ✨ Tech Stack

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS v4** (custom theme)
- **Zustand** (lightweight global state)
- **React Hook Form** (form management + validation)

---

## 📦 Components

### `TerminalButton`

Props:

- `label: string`
- `onClick: () => void`
- `variant?: 'primary' | 'ghost' | 'danger'`
- `size?: 'sm' | 'base' | 'lg'`

```tsx
<TerminalButton
  label="Execute"
  onClick={() => console.log('Clicked')}
  variant="primary"
  size="base"
/>
```

---

### `TerminalInput`

Props:

- `label: string`
- `name: string`
- `control: Control<any>`
- `placeholder?: string`
- `type?: string`

```tsx
<TerminalFormInput
  label="Username"
  name="username"
  control={control}
  placeholder="Enter your username"
/>
```

---

### `TerminalSelect`

Props:

- `label: string`
- `name: string`
- `control: Control<any>`
- `options: { label: string; value: string }[]`
- `placeholder?: string`

```tsx
<TerminalSelect
  label="Environment"
  name="env"
  control={control}
  options=[
    { label: 'Production', value: 'prod' },
    { label: 'Development', value: 'dev' },
  ]
/>
```

---

### `TerminalTextarea`

Props:

- `label: string`
- `name: string`
- `control: Control<any>`
- `placeholder?: string`

```tsx
<TerminalTextarea
  label="Message"
  name="message"
  control={control}
  placeholder="Type here..."
/>
```

---

### `TerminalNavbar`

Props:

- `floating?: boolean`

```tsx
<TerminalNavbar floating />
```

---

### `TerminalBreadcrumb`

Auto-detects route path and renders breadcrumb links with slashes.

```tsx
<TerminalBreadcrumb />
```

---

### `TerminalCard`

Wrap content with a styled card surface.

```tsx
<TerminalCard>
  <p>Hello from the terminal card</p>
</TerminalCard>
```

---

### `TerminalContainer`

Wraps page content with padding and max-width constraints.

```tsx
<TerminalContainer>
  <Dashboard />
</TerminalContainer>
```

---

### `TerminalTabs`

Props:

- `tabs: { id: string; label: string; content: ReactNode }[]`
- `defaultTab?: string`

```tsx
<TerminalTabs
  defaultTab="overview"
  tabs=[
    { id: 'overview', label: 'Overview', content: <Overview /> },
    { id: 'settings', label: 'Settings', content: <Settings /> },
  ]
/>
```

---

### `TerminalAccordion`

Props:

- `items: { id: string; title: string; content: string }[]`

```tsx
<TerminalAccordion
  items=[
    { id: 'faq1', title: 'What is this?', content: 'A terminal UI library.' },
    { id: 'faq2', title: 'How do I use it?', content: 'Clone the repo and run dev.' },
  ]
/>
```

---

### `TerminalBadge`

Props:

- `text?: string`
- `dot?: boolean`
- `color?: string`

```tsx
<TerminalBadge text="Active" />
<TerminalBadge dot color="green" />
```

---

## 🛠 Setup Instructions

```bash
git clone https://github.com/OFF-rtk/cyber-forge-toolkit.git
cd cyber-forge-toolkit
pnpm install
pnpm run dev
```

---

