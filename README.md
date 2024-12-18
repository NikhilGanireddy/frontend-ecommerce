# Wine & Liquor E-Commerce Store

An elegant and modern e-commerce web application that allows users to browse, filter, and purchase wines and liquors. This project demonstrates a full-stack setup with a Django backend serving product data and a Next.js frontend for a rich, animated UI and a seamless user experience. The application also includes authentication (via Clerk), a shopping cart, and a checkout process.

## Technologies Used

- **Frontend:**
  - [Next.js 13+ (App Router)](https://nextjs.org/docs/app)
  - [React](https://reactjs.org/)
  - [Clerk](https://clerk.com/) for user authentication
  - [Tailwind CSS](https://tailwindcss.com/) & Bootstrap for styling and responsive design
  - CSS animations and transitions for smooth UX
  - Pagination and filtering on the product listing page

- **Backend:**
  - [Django](https://www.djangoproject.com/) for serving product data via a simple REST endpoint
  - `products.json` file containing product details (no database required)
  
- **State Management:**
  - Custom React Context for cart state management

## Features

1. **Landing Page:**  
   A modern, animated landing page with a hero section, features, and calls to action.

2. **User Authentication (via Clerk):**  
   Users must sign in to view products and manage their cart. After logging in, they are directed to the product listing page.

3. **Product Listing Page:**
   - Fetches product data from the Django backend.
   - Search bar to filter products by name.
   - Category and price-based sorting filters.
   - Pagination for easy navigation through large product lists.
   - Add-to-cart functionality with quantity selection.

4. **Cart Page:**
   - Displays all products in the cart along with their quantities and prices.
   - Allows updating product quantities.
   - Shows total cart value.
   - Provides a checkout button to simulate purchase completion.

5. **Thank You Page:**
   - Acknowledges the user’s order with a modern, animated greeting.
   - Clears the cart upon reaching this page.
   - Encourages the user to continue shopping.

6. **Navigation:**
   - Navbar with links to Home, Products, Cart, and Login/Sign Out.
   - Smooth transitions and animations for an engaging user experience.

## Getting Started

### Prerequisites

- [Node.js (LTS)](https://nodejs.org/)
- [Python 3.8+](https://www.python.org/)
- [Django](https://www.djangoproject.com/)
- A [Clerk](https://clerk.com/) account (for authentication keys)

### Backend Setup (Django)

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install Django (if not installed globally):
   ```bash
   pip install django
   ```

3. Run the Django server:
   ```bash
   python manage.py runserver
   ```

   The backend will start at `http://127.0.0.1:8000/api/products/`, serving the product JSON data.

### Frontend Setup (Next.js)

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file and add your Clerk keys:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_PUBLISHABLE_KEY
   CLERK_SECRET_KEY=YOUR_CLERK_SECRET_KEY
   ```
   
4. Run the development server:
   ```bash
   npm run dev
   ```
   
   The frontend should now be running at `http://localhost:3000`.

### Accessing the Application

- Open `http://localhost:3000` in your browser.
- Sign in using the Clerk authentication flow.
- Once authenticated, navigate to the Products page to browse and add items to your cart.
- Proceed to the Cart page to review your order.
- Click "Checkout" to be taken to the Thank You page.

## Project Structure

```bash
.
├─ backend/
│  ├─ manage.py
│  ├─ backend/
│  │  ├─ settings.py
│  │  ├─ urls.py
│  │  └─ wsgi.py
│  └─ api/
│     ├─ urls.py
│     ├─ views.py
│     └─ products.json
└─ frontend/
   ├─ app/
   │  ├─ layout.js
   │  ├─ page.js         # Landing page
   │  ├─ login/
   │  │  └─ page.jsx
   │  ├─ products/
   │  │  └─ page.jsx
   │  ├─ cart/
   │  │  └─ page.jsx
   │  ├─ thank-you/
   │  │  └─ page.jsx
   │  └─ globals.css
   ├─ context/
   │  └─ CartContext.js
   ├─ middleware.js
   ├─ package.json
   ├─ postcss.config.js
   └─ tailwind.config.js
```

## Customization

- **Styling:** Tweak `globals.css` and Tailwind utilities to suit your branding.
- **Animations:** Adjust the CSS keyframes and durations for desired animation effects.
- **Data Source:** Update `products.json` or connect to a database as needed.
- **Auth Provider:** Replace or configure Clerk keys as desired.

## License

This project is open-source and available under the [MIT License](LICENSE).
