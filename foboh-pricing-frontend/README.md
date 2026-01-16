# Foboh Pricing Frontend

A modern, production-ready React frontend application for managing pricing profiles, product selection, and customer assignments. Built with TypeScript, React Query, and Tailwind CSS to deliver optimal performance, maintainability, and user experience.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [State Management](#state-management)
- [Component Structure](#component-structure)
- [Key Features & Implementation](#key-features--implementation)
- [API Integration](#api-integration)
- [Styling & Theming](#styling--theming)
- [Development Guidelines](#development-guidelines)
- [Troubleshooting](#troubleshooting)

---

## Overview

The Foboh Pricing Frontend is a single-page application designed to streamline the management of pricing profiles. It provides an intuitive, multi-step workflow for selecting products, configuring price adjustments, and assigning customers to pricing profiles.

### Design Philosophy

The application follows modern React best practices with a focus on:

- **Performance**: Optimized rendering with React Query caching and memoization
- **Type Safety**: Full TypeScript coverage for compile-time error prevention
- **Maintainability**: Modular component architecture with clear separation of concerns
- **User Experience**: Responsive design with real-time feedback and smooth interactions
- **Scalability**: Extensible architecture that can accommodate future requirements

---

## Features

### Core Functionality

#### 1. Pricing Profile Management

Create and manage pricing profiles with configuration options:

- Custom profile naming
- Multiple profile types (Single, Multiple, All Products)
- Profile-based pricing references

#### 2. Product Selection System

Three distinct selection modes with state management:

- **One Product Mode**: Enforces single product selection with automatic deselection
- **Multiple Products Mode**: Standard multi-select with checkbox controls
- **All Products Mode**: Auto-selects all available products and prevents manual changes

#### 3. Search & Filtering Capabilities

**Current Implementation:**

The search and filtering system provides:

- **Text Search**: Real-time search across product title, SKU code, and brand names

  - Debounced input (500ms delay) to minimize API calls
  - Case-insensitive matching
  - Server-side filtering support

- **Multi-Filter System**:

  - Category filtering
  - Sub-category filtering
  - Brand filtering
  - Segment filtering
  - Filters are combinable and work together seamlessly

- **Filter State Management**:
  - Filters persist during navigation
  - Clear filters functionality
  - URL-safe filter handling (prepared for future URL state sync)

**Design Considerations:**

Advanced search features like fuzzy matching, wildcard search, and query parsing (e.g., `brand:koyama`) were considered but intentionally left out to keep the scope aligned with the initial development timeline. The current architecture allows these features to be added easily through:

- Extending the `ProductFilters` interface in `types/product.ts`
- Updating the query parameter construction in `hooks/useProducts.ts`
- Enhancing the search input component with query parsing logic

#### 4. Price Adjustment System

Sophisticated price calculation engine:

- **Base Price Selection**:
  - Global Wholesale Price (default)
  - Other pricing profiles (dynamic dropdown, not implemented now)
- **Adjustment Modes**:
  - **Fixed ($)**: Absolute dollar amount adjustments
  - **Dynamic (%)**: Percentage-based adjustments
- **Increment Control**:
  - Increase mode: Adds to base price
  - Decrease mode: Subtracts from base price
- **Real-time Calculation**:
  - Prices update instantly as adjustments change
  - Negative price protection (minimum $0.00)
  - Precise decimal handling (2 decimal places)

#### 5. Pricing Table

Interactive table displaying:

- Product details (title, SKU, category)
- Base prices
- Applied adjustments
- Calculated new prices
- Real-time updates

#### 6. Save & Publish System

- **Save as Draft**: Preserve work without publishing but not implemented on this version.
- **Auto-save Indicators**: Visual feedback during save operations(not implemented)
- **Publish Workflow**: One-click publishing after validation
- **Error Handling**: Error messages and retry logic

### User Experience Enhancements

- ✨ **Modern UI**: Clean, professional design with Tailwind CSS
- 🎯 **Intuitive Navigation**: Clear step indicators and progress tracking
- ⚡ **Performance Optimized**: React Query caching and smart re-rendering
- 📱 **Responsive Design**: Mobile-first approach with breakpoint optimization
- 🔄 **Real-time Updates**: Live calculations and instant feedback
- 🎨 **Loading States**: Skeleton screens and loading indicators
- ✅ **Form Validation**: Client-side validation with helpful error messages
- 🔍 **Empty States**: Helpful messages when no products match filters

---

## Tech Stack

### Core Technologies

- **React 19.2.0**: Modern React with latest features and optimizations
- **TypeScript 5.9.3**: Type-safe development with strict mode enabled
- **Vite 7.2.4**: Lightning-fast build tool with HMR support

### State Management

- **React Context API**: Global application state management
- **React Query (TanStack Query) 5.90.17**: Server state management

### Styling

- **Tailwind CSS 3.4.1**: Utility-first CSS framework

### Additional Libraries

- **React Toastify 11.0.5**: Toast notifications for user feedback
- **Fetch API**: Native HTTP client (wrapped by React Query)

---

## Getting Started

### Prerequisites

- **Node.js**: v18 or higher (v20+ recommended)
- **npm**: v9 or higher (or yarn/pnpm)
- **Backend API**: Running on `http://localhost:3000` (see backend README)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd foboh-pricing/foboh-pricing-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=http://localhost:3000/api/v1
   ```

   > **Note**: In Vite, environment variables must be prefixed with `VITE_` to be exposed to client-side code.

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start development server with HMR  |
| `npm run build`   | Create optimized production build  |
| `npm run preview` | Preview production build locally   |
| `npm run lint`    | Run ESLint for code quality checks |

---
