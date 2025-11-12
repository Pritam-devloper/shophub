# 🛍️ ShopHub E-commerce Application

A modern, fully-featured e-commerce application built with **React 18**, **Tailwind CSS**, and **Vite**.

## ✨ Features

### Core Functionality
- 🏪 **Product Catalog** - Browse products with beautiful card layouts
- 🔍 **Advanced Search & Filtering** - Filter by category, price range, and search query
- 🛒 **Shopping Cart** - Add/remove items with quantity management
- ❤️ **Wishlist** - Save favorite products for later
- 👤 **User Authentication** - Login and registration system
- 📦 **Order Management** - View order history and status
- 💳 **Checkout Process** - Complete checkout with form validation
- ⭐ **Product Ratings** - Visual star ratings for products
- 📱 **Responsive Design** - Works perfectly on all devices

### Technical Features
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development
- 🎨 **Tailwind CSS** - Utility-first CSS framework for custom styling
- 🔄 **State Management** - React Context API for global state
- 💾 **LocalStorage** - Persist cart and wishlist data
- 🎯 **Custom Hooks** - Reusable logic with custom React hooks
- 🛡️ **Form Validation** - Client-side validation for all forms
- 🎭 **Protected Routes** - Route guards for authenticated pages

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
ecommerce-app/
│
├── public/                    # Static files
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
│
├── src/
│   ├── assets/               # Images, icons, fonts (ready to use)
│   │
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   │   ├── Button.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── RatingStars.jsx
│   │   │   └── Modal.jsx
│   │   │
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── product/         # Product-related components
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductFilter.jsx
│   │   │   └── ProductCarousel.jsx
│   │   │
│   │   └── cart/            # Cart components
│   │       ├── CartItem.jsx
│   │       ├── CartSummary.jsx
│   │       └── EmptyCart.jsx
│   │
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Profile.jsx
│   │   ├── Orders.jsx
│   │   ├── Wishlist.jsx
│   │   └── NotFound.jsx
│   │
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── ProductContext.jsx
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   ├── useFetch.js
│   │   └── useDebounce.js
│   │
│   ├── utils/               # Utility functions
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   ├── formatCurrency.js
│   │   └── validations.js
│   │
│   ├── services/            # API services
│   │   ├── api.js
│   │   ├── productService.js
│   │   ├── authService.js
│   │   └── orderService.js
│   │
│   ├── routes/              # Routing configuration
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── styles/              # Global styles
│   │   └── index.css
│   │
│   ├── App.jsx              # Main App component
│   └── main.jsx             # Entry point
│
├── .env                      # Environment variables
├── .gitignore
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
├── vite.config.js            # Vite configuration
├── package.json
├── README.md
└── DEVELOPMENT.md
```

## 🎨 Key Components

### Pages
- **Home** - Landing page with featured products and categories
- **Shop** - Product catalog with filters and search
- **ProductDetail** - Detailed product view with add to cart
- **Cart** - Shopping cart with quantity management
- **Checkout** - Order checkout with form validation
- **Profile** - User authentication (login/register)
- **Orders** - Order history and tracking
- **Wishlist** - Saved favorite products
- **NotFound** - 404 error page

### Common Components
- **Button** - Customizable button with variants
- **Loader** - Loading spinner
- **RatingStars** - Star rating display
- **Modal** - Reusable modal dialog

### Layout Components
- **Header** - Navigation with search and cart
- **Footer** - Footer with links and info
- **Sidebar** - Category sidebar filter

## 🔧 Configuration

### Environment Variables (.env)
```env
VITE_API_URL=https://fakestoreapi.com
VITE_APP_NAME=ShopHub
```

### Tailwind Theme
Customize colors in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    // ... customize your colors
  }
}
```

## 🌐 API Integration

The application uses the **FakeStore API** for product data:
- Products: `https://fakestoreapi.com/products`
- Categories: `https://fakestoreapi.com/products/categories`
- Authentication: `https://fakestoreapi.com/auth/login`

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎯 State Management

### Context Providers
1. **AuthContext** - User authentication state
2. **CartContext** - Shopping cart management
3. **ProductContext** - Product data and wishlist

### Custom Hooks
1. **useAuth** - Access authentication state
2. **useCart** - Manage cart operations
3. **useFetch** - Generic data fetching
4. **useDebounce** - Debounce input values

## 🔐 Form Validation

Built-in validation for:
- Email addresses
- Passwords (8+ chars, uppercase, lowercase, number)
- Phone numbers
- Credit card numbers
- CVV codes
- Zip codes

## 🚀 Performance Optimizations

- Lazy loading for images
- Debounced search
- LocalStorage caching
- Optimized re-renders with React.memo
- Code splitting with React Router

## 🎨 Styling Approach

- **Tailwind CSS** for utility-first styling
- **Custom components** with predefined styles
- **Responsive design** with mobile-first approach
- **Dark mode ready** (can be easily added)

## 📦 Dependencies

### Production
- `react` & `react-dom` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `react-icons` - Icon library

### Development
- `vite` - Build tool
- `tailwindcss` - CSS framework
- `autoprefixer` - CSS compatibility
- `postcss` - CSS processing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- FakeStore API for providing the product data
- Tailwind CSS for the amazing utility-first framework
- React Icons for the comprehensive icon library

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using React and Tailwind CSS**
