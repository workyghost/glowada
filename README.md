# Glowada Web Application

Glowada is a premium, modern, and highly interactive business web application designed for a modular LED signages and lightbox brand. The project features a fully responsive and animated public landing page inspired by Harfmix.com, combined with a custom WordPress-like admin dashboard for real-time site customization.

## Features

### Public Landing Page
- **Top Navigation & Brand Header**: Custom brand logo, customizable navigation, and a call-to-action button linking directly to WhatsApp.
- **Dynamic Hero Slider**: A fully responsive, animated carousel overlayed with customizable text and action buttons. Loaded dynamically from the database.
- **Product Showcase**: Tabbed product category showcase grid. Items have premium hover animations, custom pricing details, and quick WhatsApp quotation triggers.
- **YouTube Videos Grid**: A grid of 6 embedded YouTube videos showcasing application use cases across different sectors, fully configurable via the dashboard.
- **Quotation & Contact Form**: Validated quote request form with immediate visual feedback, address details, and contact shortcuts.
- **Footer**: Dynamic contact coordinates, social media links, quick links menu, and automatically updating copyright year.

### Admin Dashboard (`/admin`)
- **Secure Admin Session**: Hashed credentials using `bcryptjs` and session tokens managed via JWT cookies.
- **General Settings tab**: Upsert company logo text, address, phone number, WhatsApp link, email, social links, distributor note, and the main hero background video link.
- **Slider Manager tab**: List, add, and delete homepage slides (image URLs, title overlays, description text, and button link details).
- **Product Manager tab**: Register or delete categorized items, assign pricing tags, and manage order rankings.
- **Video Manager tab**: Register, list, or delete the 6 YouTube showcase videos with custom titles and sorting order.

---

## Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) with PostCSS & Autoprefixer
- **Database**: [Prisma ORM](https://www.prisma.io/) with PostgreSQL (production) & SQLite (local development)
- **Authentication**: JWT via `@modelcontextprotocol/sdk` and `jose` token signing
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Getting Started

### Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file at the root of the project:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-development-jwt-secret-key-12345"
   ```

3. **Initialize Database & Seed**:
   Run database migrations and seed default admin account and settings:
   ```bash
   npx prisma db push
   ```
   On first boot, the application will automatically seed a default admin user (`admin` / `glowada123`) and initial homepage mock data.

4. **Start Dev Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the website, and [http://localhost:3000/admin](http://localhost:3000/admin) to log in to the dashboard.

---

## Deployment on Dokploy

1. **Deploy Database**: Create a PostgreSQL database service (`glowada-db`) on Dokploy.
2. **Deploy Application**: Create an Application service (`glowada-web`) on Dokploy pointing to this repository.
3. **Environment Settings**: Set the following environment variables in the Dokploy application settings:
   - `DATABASE_URL`: `postgresql://<user>:<password>@<postgres-service-host>:5432/<db-name>?schema=public`
   - `JWT_SECRET`: A secure random secret key.
   - `PORT`: `3000`
4. **Domain Configuration**: Bind your domain (e.g., `www.glowada.com` and `glowada.com`) to the application and enable automatic Traefik SSL (HTTPS).
5. **Trigger Deploy**: Deploy and run the app. Trigger `/api/init` (or load the homepage) to initialize the database schema on Dokploy.
