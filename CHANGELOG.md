# Changelog

All notable changes to this project will be documented in this file.

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
