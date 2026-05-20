# Noel Bürgler's Personal CV Website

This repository contains the source code for my personal CV website, built with Gatsby and deployed on Netlify.

## 🚀 Overview

This website serves as my online CV and portfolio, showcasing my professional experience, education, and skills. It's designed to provide a comprehensive view of my background and capabilities to potential employers or collaborators.

## 🛠 Technologies Used

- [Gatsby](https://www.gatsbyjs.com/) — React-based static site framework
- [React](https://reactjs.org/) — UI library
- [GraphQL](https://graphql.org/) — data layer for content
- [gatsby-plugin-react-i18next](https://github.com/microapps/gatsby-plugin-react-i18next) — multilingual support
- [Netlify](https://www.netlify.com/) — CI/CD + hosting
- Pure CSS (CSS Modules + custom properties), no UI framework

## 🎨 Design

- **Liquid Glass aesthetic** — every card, button and nav surface uses semi-transparent backgrounds with `backdrop-filter: blur` and subtle inset rim lighting
- **Animated atmosphere** — 5 colored gradient blobs drifting across the viewport behind the cards, plus 3-layer aurora streaks and an SVG noise grain overlay
- **Theme-aware accent system** — a single `--accent-color` (blue in light mode, violet in dark mode) drives every pill, icon, language dot, stats number, timeline and focus ring consistently
- **View Transitions API** for crossfading between light/dark themes and DE/EN language switches
- **Responsive layout** — 2-column on desktop, stacks on mobile

## 💼 Content Sections

1. **About Me** — narrative introduction, profile picture, full description
2. **Skills**
   - Languages with proficiency dots (C2/C1/A2 scale)
   - General Competencies
   - 9 collapsible skill categories (Programming, Frameworks, Databases, DevOps, APIs, Publishing systems, Workflow Automation, IT Infrastructure, Print) with Expand-all toggle
3. **Stats strip** — animated count-up of years experience, roles, technologies, languages
4. **Experience** — collapsible cards with auto-computed duration, pulsing "Now" badge for the current role, location/employment-type metadata
5. **Education** — same card pattern, current studies recognized via future-end-date detection
6. **Schema.org Person JSON-LD** for SEO and rich link previews

## ⚡ Performance

- **Custom font subset** — SF Pro Display Regular + Heavy, Latin + German characters only, served as WOFF2 (66 KB total, vs 4.8 MB OTF originals)
- `font-display: swap` + `<link rel="preload">` of the regular weight
- **Optimized imagery** — profile picture and logos resized + recompressed
- LCP image marked `fetchpriority="high"`; logos `loading="lazy" decoding="async"`
- All animations on compositor-friendly properties (`transform`, `opacity`) — no `box-shadow` paints
- Respects `prefers-reduced-motion`

## 🌐 Multilingual + Theming

- 🇬🇧 English and 🇩🇪 German content
- Localized tooltips on every control
- Dark / Light theme with smooth View-Transition crossfade
- Theme + language choice persisted in localStorage

## ♿ Accessibility

- Keyboard-accessible expandable cards (`role="button"`, `tabIndex`, Enter/Space toggle)
- Visible focus rings on all interactive elements
- ARIA labels + `aria-expanded` on collapsibles
- Glass tooltips via `[data-tooltip]::after` global rule
- All images have descriptive `alt` text

## 📄 PDF Export

A downloadable PDF version of the CV is available via the PDF icon in the navigation.

## 🚀 Deployment

- Continuous deployment via [Netlify](https://www.netlify.com/)
- Automatic builds on push to `main`
- Preview deployments for pull requests
- Custom domain with SSL

[![Netlify Status](https://api.netlify.com/api/v1/badges/9f407bfc-79a3-4048-9ebd-14d0e0c7779c/deploy-status)](https://app.netlify.com/sites/noelbue/deploys)

## 🔗 Live Site

[https://www.noelbuergler.ch](https://www.noelbuergler.ch)

## 📞 Contact

If you'd like to get in touch with me regarding job opportunities or collaborations:

- Email: [job@noelbuergler.ch](mailto:job@noelbuergler.ch)
- LinkedIn: [linkedin.com/in/noelbuergler](https://www.linkedin.com/in/noelbuergler)

## 📝 Note

This project is my personal website. The source is public for transparency and as a reference for anyone curious about how it's built, but it's not intended for cloning or forking. Feel free to reach out if you have any questions about the architecture or techniques used.
