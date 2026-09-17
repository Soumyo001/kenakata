# KenaKata.com

KenaKata.com is a modern, responsive e-commerce storefront built with Next.js App Router, TypeScript, Tailwind CSS, and React.

The application provides a complete shopping experience with product discovery, filtering and sorting, product details, persistent carts, authenticated checkout, account management, mock payment processing, and per-user transaction history.

---

## Features

### Storefront

- Responsive home page
- Hero section
- Featured products
- Product categories
- Light and dark themes
- Responsive navigation
- Loading, empty, error, and not-found states

### Product Listing

- Product grid
- Search by product title
- Category filtering
- Minimum and maximum price filtering
- Sorting by:
  - Newest
  - Price: Low to High
  - Price: High to Low
  - Name
- Numbered pagination
- URL-based filter state
- Responsive mobile and desktop layouts

### Product Details

- Dynamic product routes
- Product image gallery
- Product information
- Category information
- Related products
- Add to cart
- Quantity limit handling
- Image fallback handling

### Shopping Cart

- Add products to cart
- Remove products
- Increase or decrease quantities
- Maximum quantity validation
- Persistent cart storage
- Cart totals
- Shipping calculation
- Free-shipping threshold
- Cart badge in the navbar
- Cross-tab synchronization

Cart data is separated between guests and authenticated users.

```text
kenakata-cart
kenakata-cart:user:<user-id>
kenakata-cart-owner
```

Guest carts are automatically transferred into the authenticated user's cart after login or registration. Each authenticated user keeps an independent cart.

### Checkout

- Protected checkout route
- Shipping and contact form
- Form validation
- User name and email prefilled from the authenticated session
- Cash on delivery
- Card payment simulation
- Payment processing state
- Declined-payment simulation
- Server-side order validation
- Server-generated order ID
- Order confirmation page
- Cart clearing after successful checkout

### Authentication

- User registration
- User login
- Persistent authenticated session
- Logout
- Protected routes
- Automatic redirect back to the originally requested page
- Session expiration handling
- Profile retrieval
- User avatar with initials fallback
- Auth-aware navbar
- Server-side session validation

Authentication is backed by an HTTP-only session cookie. Protected routes are checked by `proxy.ts` before navigation and are verified again on the server where authenticated user data is required.

### Account

The account page displays:

- Profile avatar
- Name
- Email
- User role
- Shopping shortcuts
- Transaction history

### Transaction History

Every successfully confirmed order is stored for the authenticated user.

Each transaction displays:

- Order ID
- Confirmation date and time
- Payment method
- Total item quantity
- Order total
- Order status
- Expandable ordered-item details

Order histories are separated by user ID:

```text
kenakata-orders:user:<user-id>
```

The history also synchronizes across tabs in the same browser.

---

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Next.js 16 | Application framework and App Router |
| React 19 | UI rendering |
| TypeScript | Static typing |
| Tailwind CSS v4 | Styling and responsive design |
| shadcn/ui | Reusable UI primitives |
| React Hook Form | Form state management |
| Zod | Runtime validation |
| next-themes | Light and dark theme support |
| Lucide React | Icons |
| Sonner | Toast notifications |
| use-debounce | Debounced product search |
| jose | JWT decoding |
| `useSyncExternalStore` | Cart and transaction-history stores |

The project uses the `@/*` path alias and does not use a `src` directory.

---

## Application Architecture

KenaKata.com follows a layered architecture that separates routing, presentation, data access, validation, authentication, and browser state.

```text
App Router
    │
    ├── Server Components
    │      │
    │      ├── Pages
    │      ├── Layouts
    │      ├── Product data
    │      └── Authentication checks
    │
    ├── Client Components
    │      │
    │      ├── Forms
    │      ├── Product filters
    │      ├── Cart interactions
    │      ├── User menu
    │      ├── Product gallery
    │      └── Transaction history
    │
    ├── API Route Handlers
    │      │
    │      ├── Authentication
    │      └── Orders
    │
    ├── API Layer
    │      │
    │      ├── Products
    │      ├── Categories
    │      ├── Users
    │      └── Authentication
    │
    └── Browser Stores
           │
           ├── Cart
           └── Order history
```

Server Components are used by default. Client Components are introduced only where browser APIs, interactive state, event handlers, forms, or local storage are required.

---

## Project Structure

```text
kenakata/
├── app/
│   ├── (storefront)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   │
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       ├── loading.tsx
│   │   │       └── not-found.tsx
│   │   │
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   │
│   │   ├── checkout/
│   │   │   ├── page.tsx
│   │   │   └── success/
│   │   │       └── page.tsx
│   │   │
│   │   └── account/
│   │       └── page.tsx
│   │
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   ├── register/
│   │   │   │   └── route.ts
│   │   │   ├── logout/
│   │   │   │   └── route.ts
│   │   │   ├── session/
│   │   │   │   └── route.ts
│   │   │   └── session-expired/
│   │   │       └── route.ts
│   │   │
│   │   └── orders/
│   │       └── route.ts
│   │
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── account/
│   │   └── transaction-history.tsx
│   │
│   ├── auth/
│   │   └── guest-cart-scope.tsx
│   │
│   ├── cart/
│   │   ├── cart-item-row.tsx
│   │   ├── cart-skeleton.tsx
│   │   ├── cart-summary.tsx
│   │   └── cart-view.tsx
│   │
│   ├── checkout/
│   │   ├── checkout-view.tsx
│   │   └── clear-cart-on-mount.tsx
│   │
│   ├── forms/
│   │   ├── form-field.tsx
│   │   ├── checkout-form.tsx
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
│   │
│   ├── home/
│   │   ├── hero.tsx
│   │   ├── categories-section.tsx
│   │   ├── category-card.tsx
│   │   └── featured-products.tsx
│   │
│   ├── layout/
│   │   ├── container.tsx
│   │   ├── nav-bar.tsx
│   │   ├── footer.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── cart-button.tsx
│   │   └── user-menu.tsx
│   │
│   ├── product/
│   │   ├── product-card.tsx
│   │   ├── product-grid.tsx
│   │   ├── product-grid-skeleton.tsx
│   │   ├── product-filters.tsx
│   │   ├── product-results.tsx
│   │   ├── product-gallery.tsx
│   │   ├── related-products.tsx
│   │   └── add-to-cart-button.tsx
│   │
│   ├── providers/
│   │   └── app-theme-provider.tsx
│   │
│   ├── shared/
│   │   ├── empty-state.tsx
│   │   ├── pagination-controls.tsx
│   │   ├── safe-image.tsx
│   │   └── user-avatar.tsx
│   │
│   └── ui/
│       └── ...
│
├── hooks/
│   ├── use-cart.ts
│   ├── use-is-client.ts
│   └── use-order-history.ts
│
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   ├── products.ts
│   │   ├── categories.ts
│   │   ├── users.ts
│   │   └── auth.ts
│   │
│   ├── auth/
│   │   └── session.ts
│   │
│   ├── data/
│   │   └── constants.ts
│   │
│   ├── helpers/
│   │   ├── api-helper.ts
│   │   ├── auth-helper.ts
│   │   ├── cart-helper.ts
│   │   ├── form-helper.ts
│   │   └── listing-helper.ts
│   │
│   ├── types/
│   │   ├── auth.type.ts
│   │   ├── cart.type.ts
│   │   ├── category.type.ts
│   │   ├── listing.type.ts
│   │   ├── order.type.ts
│   │   ├── order-history.type.ts
│   │   ├── product.type.ts
│   │   ├── user.type.ts
│   │   └── index.ts
│   │
│   ├── validators/
│   │   ├── schema-validators/
│   │   │   ├── cart.schema.ts
│   │   │   ├── checkout.schema.ts
│   │   │   ├── listing-params.schema.ts
│   │   │   ├── login.schema.ts
│   │   │   ├── register.schema.ts
│   │   │   └── order-history.schema.ts
│   │   │
│   │   └── payload-validators/
│   │       └── order.schema.ts
│   │
│   └── utils.ts
│
├── public/
│   └── placeholder.png
│
├── proxy.ts
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Main Routes

| Route | Description | Access |
| --- | --- | --- |
| `/` | Home page | Public |
| `/products` | Product listing, search, filtering, sorting and pagination | Public |
| `/products/[id]` | Product details | Public |
| `/cart` | Shopping cart | Public |
| `/checkout` | Checkout | Authenticated |
| `/checkout/success` | Order confirmation | Authenticated |
| `/account` | User profile and transaction history | Authenticated |
| `/login` | Login page | Guest |
| `/register` | Registration page | Guest |

---

## API Routes

The application uses Next.js Route Handlers for authentication and order processing.

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/auth/login` | `POST` | Authenticate a user and create a session |
| `/api/auth/register` | `POST` | Create an account and start a session |
| `/api/auth/logout` | `POST` | End the current session |
| `/api/auth/session` | `GET` | Retrieve the current authenticated user |
| `/api/auth/session-expired` | `GET` | Clear an expired session and redirect to login |
| `/api/orders` | `POST` | Validate and process an order |

---

## Data Layer

All remote data access is organized inside `lib/api`.

```text
lib/api/
├── client.ts
├── products.ts
├── categories.ts
├── users.ts
└── auth.ts
```

`client.ts` provides the common request layer, while domain modules provide typed functions for the rest of the application.

This keeps network logic outside components and allows pages and Server Components to work with strongly typed application data.

---

## Validation

Zod schemas are used throughout the application to validate data at important boundaries.

Validation includes:

- Product listing URL parameters
- Login input
- Registration input
- Cart storage
- Checkout form data
- Order payloads
- Transaction history storage

The validators are divided into:

```text
lib/validators/
├── schema-validators/
└── payload-validators/
```

React Hook Form works together with Zod for interactive forms.

---

## Authentication Flow

Authentication follows this flow:

```text
Login / Register Form
        ↓
Next.js Auth Route Handler
        ↓
Authentication API
        ↓
Authenticated User Profile
        ↓
HTTP-only Session Cookie
        ↓
Protected Application Routes
```

The browser never needs to directly read the session token.

### Route Protection

`proxy.ts` handles navigation-level protection for:

```text
/checkout
/account
```

Protected Server Components also verify the current user before rendering authenticated content.

When an unauthenticated visitor attempts to open a protected page, the requested location is preserved:

```text
/login?redirect=/checkout
```

After successful login, the user is returned to the requested page.

---

## Cart Architecture

The cart is implemented as an external browser store using `useSyncExternalStore`.

No React Context provider is required.

```text
useCart()
   │
   ├── read active cart
   ├── validate stored data
   ├── calculate totals
   ├── add item
   ├── remove item
   └── update quantity
```

### Guest Cart

Guest items are stored under:

```text
kenakata-cart
```

### Authenticated Cart

Each user receives a separate cart:

```text
kenakata-cart:user:<user-id>
```

The currently active cart is selected with:

```text
kenakata-cart-owner
```

When a guest logs in or registers, guest items are merged into the authenticated user's existing cart.

Quantities for identical products are combined while respecting the application's maximum quantity.

### Cross-Tab Synchronization

Cart components subscribe to browser storage changes.

Updating the cart in one tab automatically updates other open tabs for the same application.

---

## Checkout Flow

The checkout process works as follows:

```text
Cart
  ↓
Protected Checkout
  ↓
Shipping Details
  ↓
Payment Method
  ↓
Form Validation
  ↓
POST /api/orders
  ↓
Server Validation
  ↓
Payment Processing
  ↓
Order Confirmation
  ↓
Transaction Saved
  ↓
Success Page
  ↓
Cart Cleared
```

The checkout form supports:

- Cash on delivery
- Card payment
- Shipping validation
- Payment validation
- Processing state
- Payment errors
- Server-generated order IDs

Order IDs follow this format:

```text
KK-XXXXXXXX
```

---

## Transaction History

Confirmed orders are stored independently for each authenticated account.

```text
kenakata-orders:user:<user-id>
```

Each transaction stores an order snapshot containing:

```text
orderId
createdAt
paymentMethod
total
items
```

The account page reads the authenticated user's order history and displays the newest transactions first.

Transaction data is validated before being displayed.

---

## Image Handling

Images are rendered through reusable image components.

The application includes:

- Next.js image optimization
- Responsive image sizing
- Image URL sanitization
- Fallback images
- Profile-avatar fallback initials
- Product image error handling

This keeps invalid image data from breaking product cards, galleries, carts, or account pages.

---

## Rendering Strategy

Different routes use rendering strategies suited to their content.

| Route | Strategy |
| --- | --- |
| `/` | ISR |
| `/products` | Dynamic server rendering |
| `/products/[id]` | Static generation + ISR |
| `/cart` | Server-rendered shell + client cart store |
| `/checkout` | Protected server shell + client checkout |
| `/account` | Protected Server Component + client transaction history |

Product details use dynamic route parameters, while listing state is represented through URL search parameters.

---

## Search, Filtering and Pagination

Product listing state is stored in the URL.

Supported parameters include:

```text
search
category
minPrice
maxPrice
sort
page
```

Example:

```text
/products?search=shirt&category=1&minPrice=10&maxPrice=100&sort=price-asc&page=2
```

This makes listing views navigable, shareable, and compatible with normal browser navigation.

Search input is debounced before updating the URL.

---

## Theme

The application supports light and dark themes.

Theme state is handled globally and can be changed from the navigation bar.

---

## Responsive Design

KenaKata.com is designed for mobile, tablet, and desktop layouts.

Responsive behavior includes:

- Adaptive navigation
- Responsive product grids
- Mobile-friendly filters
- Responsive cart layout
- Responsive checkout form
- Responsive transaction cards
- Responsive product gallery
- Adaptive typography and spacing

A custom `xs` breakpoint is available at `360px` for small-screen layout control.

---

## Getting Started

### Prerequisites

Make sure Node.js and npm are installed.

### Clone the Repository

```bash
git clone <repository-url>
cd kenakata
```

### Install Dependencies

```bash
npm install
```

### Environment Setup

Create `.env`:

```bash
touch .env
```

Add the required API base URL:

```env
NEXT_PUBLIC_API_URL=https://api.escuelajs.co/api/v1
```

### Start the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Available Scripts

### Development

```bash
npm run dev
```

Starts the development server.

### Production Build

```bash
npm run build
```

Creates the optimized production build.

### Start Production Server

```bash
npm run start
```

Runs the production build.

### Lint

```bash
npm run lint
```

Runs the project's lint checks.

---

## How to Use

### Browse Products

Open `/products` to browse the complete catalog.

Use the available controls to:

- Search products
- Select a category
- Filter by price
- Change sorting
- Navigate between pages

### View a Product

Select a product card to open its details page.

From there you can:

- Browse product images
- Read product information
- Add the product to the cart
- View related products

### Use the Cart

Open `/cart` from the navbar.

You can:

- Review products
- Change quantities
- Remove items
- View subtotal
- View shipping cost
- Continue to checkout

### Checkout

Select **Proceed to checkout**.

If you are not authenticated, the application redirects you to login and returns you to checkout after authentication.

Complete the shipping form, choose a payment method, and place the order.

After a successful order, the application displays the confirmation page and clears the completed cart.

### Account

Open the user menu in the navbar and select **My account**.

The account page contains:

- Profile details
- Avatar
- Role
- Shopping shortcuts
- Transaction history

### Logout

Open the user menu and select **Log out**.

The authenticated cart remains associated with that account, while the browser returns to guest-cart mode.

---

## State Persistence

The application persists important client-side shopping state.

### Cart

```text
Guest:
kenakata-cart

Authenticated:
kenakata-cart:user:<user-id>
```

### Active Cart Owner

```text
kenakata-cart-owner
```

### Transaction History

```text
kenakata-orders:user:<user-id>
```

All stored cart and transaction data is validated before it is consumed by the UI.

---

## Key Application Flows

### Guest to Authenticated Shopping

```text
Guest adds products
        ↓
Guest cart
        ↓
Login / Register
        ↓
Guest cart merges with user cart
        ↓
User continues shopping
```

### Returning User

```text
Login
  ↓
User session restored
  ↓
User-specific cart activated
  ↓
Previous cart available
```

### Successful Purchase

```text
User cart
    ↓
Checkout
    ↓
Validated order
    ↓
Confirmed transaction
    ↓
Transaction history
    ↓
Cart cleared
```

---

## Live Application

```text
kenakata-six-nu.vercel.app
```

---

## KenaKata.com

A complete e-commerce storefront focused on modern Next.js architecture, reusable components, responsive design, typed data handling, persistent shopping state, authenticated checkout, and account-based order history.