# Eno Bassé Diamonds Frontend

Frontend for the Eno Bassé Diamonds fine jewelry e-commerce platform. Built with [Next.js](https://nextjs.org/) (App Router) and React 19.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, TypeScript, Tailwind CSS 4
- **State:** Zustand (client state), TanStack React Query (server state)
- **Auth:** NextAuth.js (credentials + Google OAuth)
- **3D:** React Three Fiber, drei, Three.js
- **Payments:** Paystack (client-side integration)
- **Media:** next-cloudinary
- **Animation:** Motion

## Prerequisites

- Node.js >= 20
- Running [backend](https://github.com/enobasse/enobasse-backend) instance

## Setup

```bash
pnpm install
```

Copy the environment file and fill in your values:

```bash
cp .env.example .env.local
```

### Environment Variables

| Variable                           | Description                          |
|------------------------------------|--------------------------------------|
| `NODE_ENV`                         | Environment mode                     |
| `NEXT_PUBLIC_API_URL`              | Backend API URL                      |
| `NEXTAUTH_URL`                     | NextAuth base URL                    |
| `NEXTAUTH_SECRET`                  | NextAuth encryption secret           |
| `GOOGLE_CLIENT_ID`                 | Google OAuth client ID               |
| `GOOGLE_CLIENT_SECRET`             | Google OAuth client secret           |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`  | Paystack public key                  |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`| Cloudinary cloud name                |
| `NEXT_PUBLIC_CLOUDINARY_API_KEY`   | Cloudinary API key                   |
| `CLOUDINARY_API_SECRET`            | Cloudinary API secret                |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`    | Google Analytics ID (optional)       |
| `MAILCHIMP_API_KEY`                | Mailchimp API key                    |
| `MAILCHIMP_API_SERVER`             | Mailchimp server prefix              |
| `MAILCHIMP_AUDIENCE_ID`            | Mailchimp audience ID                |
| `EXCHANGE_RATE_API_KEY`            | Exchange rate API key                |
| `RESEND_API_KEY`                   | Resend email API key                 |

## Running

```bash
# Development
pnpm dev

# Network-accessible (mobile testing)
pnpm dev:network
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script          | Description                        |
|-----------------|------------------------------------|
| `dev`           | Start dev server                   |
| `dev:network`   | Start dev server on all interfaces |
| `build`         | Production build                   |
| `start`         | Start production server            |
| `lint`          | Run Next.js lint                   |
| `format`        | Format with Prettier               |
| `analyze`       | Build with bundle analyzer         |

## Project Structure

```
src/
  app/            # Next.js App Router pages & API routes
  components/     # Reusable UI components
  lib/
    api/          # API client functions
    hooks/        # React hooks & TanStack Query wrappers
    store/        # Zustand stores
    types/        # TypeScript type definitions
    utils/        # Utility functions & helpers
    validations/  # Zod validation schemas
```

## Pages

| Route                  | Description                                |
|------------------------|--------------------------------------------|
| `/`                    | Landing page with hero & featured products |
| `/products`            | Product catalog with search & filters      |
| `/products/[slug]`     | Product detail page                        |
| `/collections`         | Collection listing                         |
| `/collections/[slug]`  | Collection detail with products            |
| `/cart`                | Shopping cart                              |
| `/checkout`            | Checkout with Paystack integration         |
| `/orders`              | Customer order history                     |
| `/wishlist`            | Customer wishlist                          |
| `/blog`                | Blog listing                               |
| `/blog/[slug]`         | Blog post detail                           |
| `/sign-in`             | Sign in (credentials + Google)             |
| `/sign-up`             | Registration                               |
| `/admin/dashboard`     | Admin dashboard with stats                 |
| `/admin/products`      | Product CRUD                               |
| `/admin/orders`        | Order management                           |
| `/admin/collections`   | Collection management                      |
| `/admin/blog`          | Blog post management                       |
| `/admin/accounts`      | Account management                         |
| `/admin/homepage`      | Homepage settings                          |
| `/admin/reviews`       | Review management                          |
| `/admin/testimonials`  | Testimonial management                     |
| `/admin/newsletter`    | Newsletter subscriber list                 |
| `/admin/settings`      | Admin settings                             |
| `/admin/analytics`     | Analytics overview                         |
| `/creative-studio`     | Custom ring design configurator            |
| `/custom-design`       | Custom design inquiry                      |
| `/contact`             | Contact form                               |
| `/faqs`                | Frequently asked questions                 |
| `/size-guide`          | Ring size guide                            |
| `/testimonials`        | Customer testimonials                      |

