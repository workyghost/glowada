# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-06-26

### Added
- **Harfmix Page Layout & Copy**: Fully replicated Harfmix structure for Glowada including dark neon styling (`#0a0202`), red accents (`#f44d46`), and gold accents (`#feb311`).
- **All 10 Core Sections**: Integrated Hero Video loop, About Us, Mission/Vision/Certificates cards, Most Popular Product card, Products Grid, Why Us list, YouTube Videos Grid, Sectoral Applications, Request Form, and Partner Marquee.
- **Dynamic Video Management**: Added `Video` model to Prisma schema, created `/api/videos` and `/api/videos/[id]` endpoints, and integrated the "Video Yönetimi" tab in the Admin Dashboard.
- **Distributor Customization**: Extended `Setting` model and UI with fields for distributor text ("Glowada Abcmix'in Türkiye Distribütörüdür."), Twitter link, and YouTube channel.

## [1.0.0] - 2026-06-26

### Added
- **Core Setup**: Initialized clean Next.js 15 project using TypeScript, Tailwind CSS, PostCSS, and Prisma ORM.
- **Database Schema**: Configured relational models for admin `User`, homepage `Slide`, `Product` showcase items, and general layout `Setting`.
- **API Router Handlers**:
  - Secure `/api/auth/login`, `/api/auth/logout`, and `/api/auth/session` checking JWT cookies.
  - `/api/sliders` and `/api/products` endpoints with support for GET operations (public) and POST/DELETE actions (protected).
  - `/api/settings` for dynamic logo and header/footer information updates.
  - Self-seeding `/api/init` bootstrap script.
- **Modern Landing Page**:
  - Dynamic Slider Component with fade transitions and autoplay.
  - Category-based tabbed product filtering layout with hover and scale effects.
  - Fully responsive, mobile-drawer header navigation.
  - Embedded, responsive YouTube video showcase container.
  - Styled footer menu showing location details, quick links, and WhatsApp shortcuts.
  - Live quote contact form validating submissions with state alerts.
- **Admin Dashboard Layout**:
  - Secure `/admin` sidebar framework checking server-side session headers.
  - Built-in multi-tab edit forms for managing slides, listings, and text fields.
- **Dokploy Integration**: Setup configuration scripts for Dokploy deployment and Traefik domain binding.
