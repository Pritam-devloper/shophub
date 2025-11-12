# E-commerce Application - Development Guide

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Build

```bash
npm run build
```

## Features Implemented

✅ Product browsing and filtering
✅ Shopping cart with localStorage persistence
✅ Wishlist functionality
✅ User authentication (login/register)
✅ Product search
✅ Responsive design
✅ Order management
✅ Checkout process
✅ Rating system
✅ Multiple product categories

## Project Structure

- `/src/components` - Reusable components
  - `/common` - Button, Loader, Modal, RatingStars
  - `/layout` - Header, Footer, Sidebar
  - `/product` - ProductCard, ProductList, ProductFilter, ProductCarousel
  - `/cart` - CartItem, CartSummary, EmptyCart

- `/src/pages` - Main page components
  - Home, Shop, ProductDetail, Cart, Checkout, Profile, Orders, Wishlist, NotFound

- `/src/context` - React Context providers
  - AuthContext, CartContext, ProductContext

- `/src/hooks` - Custom React hooks
  - useAuth, useCart, useFetch, useDebounce

- `/src/services` - API services
  - api, productService, authService, orderService

- `/src/utils` - Utility functions
  - constants, helpers, formatCurrency, validations

## API Integration

The app uses FakeStore API (https://fakestoreapi.com) for product data.

## Customization

- Update Tailwind colors in `tailwind.config.js`
- Modify API endpoint in `.env`
- Customize app name in `.env`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
