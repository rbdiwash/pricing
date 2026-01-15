# Foboh Pricing Frontend

A modern React-based frontend application for managing pricing profiles, product selection, and customer assignments. Built with TypeScript, React Query, and Tailwind CSS for optimal performance and maintainability.

## 🚀 Features

### Core Functionality

- **Pricing Profile Management**: Create and manage pricing profiles with custom configurations
- **Product Selection**: Select products using three modes:
  - Single product selection
  - Multiple product selection
  - All products selection
- **Advanced Search & Filtering**:
  - Search by product name, SKU, or brand
  - Filter by category, sub-category, segment, and brand
  - Real-time search with debouncing
- **Price Adjustment Controls**:
  - Adjust prices based on Global Wholesale Price or other pricing profiles
  - Fixed ($) or Dynamic (%) adjustment modes
  - Increase or decrease price adjustments
  - Real-time price calculations
- **Pricing Table**: View calculated prices with adjustment details
- **Multi-Step Workflow**: Guided setup process with step-by-step navigation
- **Save & Publish**: Save profiles as drafts or publish them directly

### User Experience

- ✨ Modern, responsive UI built with Tailwind CSS
- 🎯 Intuitive step-by-step workflow
- ⚡ Fast performance with React Query caching
- 📱 Mobile-responsive design
- 🔄 Real-time updates and calculations

## 🛠️ Tech Stack

- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **State Management**:
  - React Context API (Global state)
  - React Query / TanStack Query (Server state)
- **Styling**: Tailwind CSS 3.4.1
- **HTTP Client**: Fetch API (with React Query)

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Backend API running on `http://localhost:3000` (see backend README)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd foboh-pricing/foboh-pricing-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
foboh-pricing-frontend/
├── src/
│   ├── components/          # React components
│   │   ├── pricing-profile/ # Pricing profile specific components
│   │   │   ├── AssignCustomersSection.tsx
│   │   │   ├── BasicPricingProfileSection.tsx
│   │   │   ├── NavigationFooter.tsx
│   │   │   ├── PriceAdjustmentControls.tsx
│   │   │   ├── PricingTable.tsx
│   │   │   ├── ProductPricingForm.tsx
│   │   │   ├── ProductPricingSection.tsx
│   │   │   ├── ProductPricingSummary.tsx
│   │   │   ├── ProfileTypeSelector.tsx
│   │   │   └── SearchAndFilters.tsx
│   │   ├── Header.tsx
│   │   ├── PricingProfileSetup.tsx
│   │   ├── ProductCard.tsx
│   │   └── Sidebar.tsx
│   ├── contexts/            # React Context providers
│   │   └── PricingProfileContext.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useDebounce.js
│   │   ├── usePricingProfiles.ts
│   │   └── useProducts.ts
│   ├── types/               # TypeScript type definitions
│   │   └── product.ts
│   ├── utils/               # Utility functions
│   │   └── priceCalculation.ts
│   ├── consts/              # Constants
│   │   └── const.js
│   ├── App.tsx              # Main App component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── package.json
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── postcss.config.js        # PostCSS configuration
```

## 🎯 Available Scripts

### Development

```bash
npm run dev
```

Starts the development server with hot module replacement (HMR).

### Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` directory.

### Preview

```bash
npm run preview
```

Previews the production build locally.

### Lint

```bash
npm run lint
```

Runs ESLint to check code quality and consistency.

## 🔌 API Integration

The frontend communicates with the backend API at `http://localhost:3000/api/v1`.

### Endpoints Used

#### Products

- `GET /api/v1/products` - Fetch products with optional filters
  - Query parameters: `search`, `category`, `brand`, `segment`

#### Pricing Profiles

- `GET /api/v1/pricing-profiles` - Fetch all pricing profiles
- `GET /api/v1/pricing-profiles/:id` - Fetch a single profile
- `POST /api/v1/pricing-profiles` - Create a new pricing profile
- `PUT /api/v1/pricing-profiles/:id` - Update a pricing profile
- `DELETE /api/v1/pricing-profiles/:id` - Delete a pricing profile

### Configuration

API base URL is configured in:

- `src/hooks/useProducts.ts`
- `src/hooks/usePricingProfiles.ts`

To change the API URL, update the `API_BASE_URL` constant in these files.

## 🏗️ Architecture

### State Management

#### Global State (React Context)

- **PricingProfileContext**: Manages pricing profile state including:
  - Profile type selection
  - Selected products
  - Search queries and filters
  - Price adjustment configurations

#### Server State (React Query)

- **useProducts**: Manages product data fetching and caching
- **usePricingProfiles**: Manages pricing profile CRUD operations

### Component Hierarchy

```
App
└── PricingProfileSetup (Main Container)
    ├── BasicPricingProfileSection
    ├── ProductPricingSection
    │   ├── ProductPricingSummary (Collapsed View)
    │   └── ProductPricingForm (Full View)
    │       ├── ProfileTypeSelector
    │       ├── SearchAndFilters
    │       ├── ProductCard (List)
    │       ├── PriceAdjustmentControls
    │       └── PricingTable
    ├── AssignCustomersSection
    └── NavigationFooter
```

### Key Components

#### PricingProfileSetup

Main container component that orchestrates the entire pricing profile setup workflow.

#### ProductPricingSection

Wrapper component that switches between summary and full form views based on current step.

#### ProductPricingForm

Complete form for product selection, filtering, and price adjustment configuration.

#### PriceAdjustmentControls

Controls for configuring price adjustments (mode, increment, value, based on).

#### PricingTable

Table displaying calculated prices for selected products with adjustment details.

## 📖 Usage Guide

### Creating a Pricing Profile

1. **Enter Profile Name**: Fill in the profile name in the "Basic Pricing Profile" section
2. **Select Profile Type**: Choose between "One Product", "Multiple Products", or "All Products"
3. **Search & Filter Products**: Use search bar and filters to find desired products
4. **Select Products**: Check products to include in the pricing profile
5. **Configure Price Adjustments**:
   - Select "Based on" price (Global Wholesale Price or another profile)
   - Choose adjustment mode (Fixed $ or Dynamic %)
   - Select increment mode (Increase or Decrease)
   - Enter adjustment value
6. **Review Pricing Table**: Verify calculated prices in the pricing table
7. **Save or Proceed**:
   - Click "Save as Draft" to save without publishing
   - Click "Next" to proceed to customer assignment
8. **Assign Customers** (Step 2): Configure customer assignments
9. **Publish**: Click "Save & Publish Profile" to finalize

### Price Calculation

Prices are calculated using the following formula:

- **Fixed Mode**: `New Price = Base Price ± Adjustment Value`
- **Dynamic Mode**: `New Price = Base Price ± (Base Price × Adjustment Value / 100)`

## 🎨 Styling

The project uses **Tailwind CSS** for styling. Key customizations:

- Primary color: Defined in `tailwind.config.js`
- Responsive breakpoints: Standard Tailwind breakpoints
- Custom utilities: Scrollbar styling in `index.css`

### Customizing Colors

Edit `tailwind.config.js` to customize the primary color:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color-here',
    },
  },
}
```

## 🔍 Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow React functional component patterns with hooks
- Use custom hooks for reusable logic
- Keep components small and focused (Single Responsibility Principle)

### Best Practices

- ✅ Use React Query for all API calls
- ✅ Use Context API for global state
- ✅ Implement proper error handling
- ✅ Add loading states for async operations
- ✅ Use debouncing for search inputs
- ✅ Memoize expensive calculations with `useMemo`
- ✅ Use `useCallback` for event handlers passed to children

### Adding New Features

1. **New Component**: Create in appropriate directory under `src/components/`
2. **New Hook**: Add to `src/hooks/` directory
3. **New Type**: Define in `src/types/` directory
4. **New Utility**: Add to `src/utils/` directory

## 🐛 Troubleshooting

### API Connection Issues

- Ensure backend server is running on `http://localhost:3000`
- Check CORS configuration on backend
- Verify API endpoint URLs in hook files

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`
- Verify all imports are correct

### Styling Issues

- Ensure Tailwind CSS is properly configured
- Check `tailwind.config.js` content paths
- Verify PostCSS configuration

## 📝 Environment Variables

Currently, the API URL is hardcoded. To use environment variables:

1. Create `.env` file:

   ```
   VITE_API_BASE_URL=http://localhost:3000/api/v1
   ```

2. Update hooks to use:
   ```typescript
   const API_BASE_URL =
     import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";
   ```

## 🤝 Contributing

1. Follow the existing code structure and patterns
2. Use TypeScript for new code
3. Add proper error handling
4. Write reusable components
5. Update this README if adding new features

## 📄 License

[Add your license information here]

## 👥 Authors

[Add author information here]

## 🔗 Related Projects

- Backend API: [foboh-pricing-backend](../foboh-pricing-backend)

---

**Note**: This application requires the backend API to be running. See the backend README for setup instructions.
