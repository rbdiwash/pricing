# Foboh Pricing Backend API

A RESTful API backend for managing product pricing and pricing profiles. This API provides endpoints for retrieving products with advanced filtering capabilities and managing pricing profiles with various configuration options.

## Features

- **Product Management**: Retrieve products with filtering by category, sub-category, brand, segment, and text search
- **Pricing Profile Management**: Full CRUD operations for pricing profiles
- **Price Calculations**: Support for fixed and dynamic (percentage) price adjustments
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **CORS Enabled**: Ready for frontend integration

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Swagger UI Express** - API documentation interface
- **YAML.js** - Swagger documentation parsing
- **CORS** - Cross-origin resource sharing

## Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn package manager

## Installation

1. Clone the repository and navigate to the backend directory:

```bash
cd foboh-pricing-backend
```

2. Install dependencies:

```bash
npm install
```

## Running the Server

Start the development server:

```bash
npm start
```

The server will start on `http://localhost:3000`

### Server Endpoints

- **API Base URL**: `http://localhost:3000/api/v1`
- **API Documentation**: `http://localhost:3000/api-docs`
- **Health Check**: `http://localhost:3000/`

## API Endpoints

### Products

#### Get Products

```
GET /api/v1/products
```

Retrieve a list of products with optional filtering.

**Query Parameters:**

- `search` (string) - Search term to filter by title, SKU code, or brand (case-insensitive)
- `category` (string) - Filter by category
- `subCategory` (string) - Filter by sub-category
- `brand` (string) - Filter by brand
- `segment` (string) - Filter by segment

**Example Request:**

```bash
GET /api/v1/products?search=wine&category=Alcoholic Beverage&segment=Red
```

**Example Response:**

```json
[
  {
    "id": "1",
    "title": "High Garden Pinot Noir 2021",
    "skuCode": "HGVPIN216",
    "brand": "High Garden",
    "category": "Alcoholic Beverage",
    "subCategory": "Wine",
    "segment": "Red",
    "globalWholesalePrice": 279.06
  }
]
```

### Pricing Profiles

#### Get All Pricing Profiles

```
GET /api/v1/pricing-profiles
```

Retrieve all pricing profiles.

**Example Response:**

```json
[
  {
    "id": "1",
    "name": "Global Wholesale Price",
    "type": "global",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Pricing Profile by ID

```
GET /api/v1/pricing-profiles/:id
```

Retrieve a specific pricing profile by its ID.

**Example Response:**

```json
{
  "id": "2",
  "name": "Profile 1",
  "profileType": "multiple",
  "selectedProducts": ["1", "2", "3", "4", "5"],
  "priceAdjustment": {
    "basedOn": "globalWholesalePrice",
    "mode": "dynamic",
    "incrementMode": "decrease",
    "adjustmentValue": 10
  },
  "createdAt": "2026-01-16T12:32:24.477Z",
  "status": "draft"
}
```

#### Create Pricing Profile

```
POST /api/v1/pricing-profiles
```

Create a new pricing profile.

**Request Body:**

```json
{
  "name": "Summer Sale Profile",
  "profileType": "multiple",
  "selectedProducts": ["1", "2", "3"],
  "priceAdjustment": {
    "basedOn": "global",
    "mode": "fixed",
    "incrementMode": "increase",
    "adjustmentValue": 10.0
  }
}
```

**Response (201 Created):**

```json
{
  "id": "2",
  "name": "Summer Sale Profile",
  "profileType": "multiple",
  "selectedProducts": ["1", "2", "3"],
  "priceAdjustment": {
    "basedOn": "global",
    "mode": "fixed",
    "incrementMode": "increase",
    "adjustmentValue": 10.0
  },
  "createdAt": "2024-01-15T10:30:00.000Z",
  "status": "draft"
}
```

#### Update Pricing Profile

```
PUT /api/v1/pricing-profiles/:id
```

Update an existing pricing profile. Supports partial updates.

**Request Body:**

```json
{
  "name": "Updated Profile Name",
  "status": "published",
  "priceAdjustment": {
    "mode": "dynamic",
    "incrementMode": "decrease",
    "adjustmentValue": 20.0
  }
}
```

#### Delete Pricing Profile

```
DELETE /api/v1/pricing-profiles/:id
```

Delete a pricing profile by ID.

**Response:** 204 No Content

#### Calculate Adjusted Prices for Products

```
POST /api/v1/pricing-profiles/:id/calculate-prices
```

Calculate adjusted prices for one or more products based on a pricing profile's configuration. This endpoint applies the pricing profile's adjustment rules to determine the final prices.

**Request Body (optional):**

```json
{
  "productIds": ["1", "2", "3"]
}
```

If `productIds` is omitted, prices are calculated for all products.

**Example Response:**

```json
{
  "profileId": "2",
  "profileName": "Summer Sale Profile",
  "products": [
    {
      "id": "1",
      "title": "High Garden Pinot Noir 2021",
      "skuCode": "HGVPIN216",
      "globalWholesalePrice": 279.06,
      "basePrice": 279.06,
      "adjustedPrice": 289.06
    }
  ]
}
```

#### Calculate Adjusted Price for Single Product

```
POST /api/v1/pricing-profiles/:id/calculate-price/:productId
```

Calculate the adjusted price for a single product based on a pricing profile.

**Example Response:**

```json
{
  "productId": "1",
  "productTitle": "High Garden Pinot Noir 2021",
  "globalWholesalePrice": 279.06,
  "adjustedPrice": 289.06,
  "profileId": "2",
  "profileName": "Summer Sale Profile"
}
```

## API Documentation

Interactive API documentation is available at:

```
 https://pricing-0bfi.onrender.com/api-docs or in localhost at http://localhost:3000/api-docs
```

The documentation is built using Swagger/OpenAPI 3.0

## Data Models

### Price Adjustment

- **basedOn**: Base pricing reference ("globalWholesalePrice" or "global" for global wholesale price, or a pricing profile ID for chained calculations)
- **mode**:
  - `fixed` - Dollar amount adjustment
  - `dynamic` - Percentage-based adjustment
- **incrementMode**:
  - `increase` - Add to base price
  - `decrease` - Subtract from base price
- **adjustmentValue**: Adjustment amount (dollar amount for fixed mode, percentage for dynamic mode)

### Price Calculation Logic

The backend implements sophisticated pricing calculation logic:

1. **Base Price Resolution**:

   - If `basedOn` is "globalWholesalePrice" or "global", uses the product's `globalWholesalePrice`
   - For now as per requirement, `basedOn` is "globalWholesalePrice" only but if needed to adjust the pricing according to profile, it can be done easily but need some more time, also it was not in the requirements.

2. **Adjustment Application**:

   - **Fixed Mode**: Adds or subtracts a fixed dollar amount
     - Example: Base price $100, adjustment $10 increase → $110
   - **Dynamic Mode**: Applies a percentage-based adjustment
     - Example: Base price $100, adjustment 15% increase → $115

3. **Price Protection**: Calculated prices never go below $0 (negative prices are prevented)

## Development Notes

### Data Storage

Currently, the application uses in-memory storage for pricing profiles. This means:

- Data is lost when the server restarts
- Suitable for development and testing
- For production, consider integrating a database (MongoDB, PostgreSQL, etc.)

### Product Data

Product data is stored in `data/product.js` as a JavaScript module. In production, this should be replaced with a database connection.

### CORS Configuration

CORS is enabled for all origins. For production, configure CORS to allow only specific origins:
