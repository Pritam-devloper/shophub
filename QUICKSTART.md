# 🚀 Quick Start Guide

Get your e-commerce app running in 3 simple steps!

## Step 1: Install Dependencies

Open PowerShell in the project directory and run:

```powershell
npm install
```

This will install all required packages including:
- React
- Tailwind CSS
- React Router
- Axios
- React Icons
- Vite

## Step 2: Start Development Server

```powershell
npm run dev
```

You should see output like:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

## Step 3: Open Your Browser

Navigate to **http://localhost:3000**

🎉 **That's it!** Your e-commerce app is now running!

---

## 📋 Available Commands

### Development
```powershell
npm run dev          # Start development server
```

### Production
```powershell
npm run build        # Build for production
npm run preview      # Preview production build
```

### Testing
```powershell
npm test            # Run tests (when configured)
```

---

## 🎯 What to Explore First

1. **Home Page** (`/`)
   - View featured products
   - See product carousel
   - Browse categories

2. **Shop Page** (`/shop`)
   - Filter by category
   - Search for products
   - Sort by price/rating

3. **Product Details** (Click any product)
   - Add to cart
   - Add to wishlist
   - View ratings

4. **Shopping Cart** (`/cart`)
   - Manage quantities
   - See order summary
   - Proceed to checkout

5. **Profile** (`/profile`)
   - Login/Register
   - View account info

---

## 🛠️ Troubleshooting

### Port Already in Use
If port 3000 is busy, Vite will ask to use another port. Press `y` to accept.

### Module Not Found
```powershell
rm -r node_modules
npm install
```

### Clear Cache
```powershell
npm run dev -- --force
```

---

## 🎨 Customization Tips

### Change App Name
Edit `.env`:
```env
VITE_APP_NAME=YourShopName
```

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    600: '#your-color-hex',
    // ... other shades
  }
}
```

### Add Your Logo
Replace the logo section in `src/components/layout/Header.jsx`

---

## 📚 Next Steps

1. ✅ Explore the code structure
2. ✅ Read `PROJECT_OVERVIEW.md` for detailed documentation
3. ✅ Check `DEVELOPMENT.md` for development guidelines
4. ✅ Start customizing to your needs!

---

## 🆘 Need Help?

- **Project Structure**: See `PROJECT_OVERVIEW.md`
- **Development Guide**: See `DEVELOPMENT.md`
- **API Documentation**: https://fakestoreapi.com/docs

---

**Happy Coding! 🚀**
