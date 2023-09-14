# Book-Catallog-Backend

Application Routes:

# User

    api/v1/auth/signup (POST)
    api/v1/users (GET)
    api/v1/users/5e27b1d1-92fd-48f7-84dd-3b0d2c00406c (Single GET)
    api/v1/users/5e27b1d1-92fd-48f7-84dd-3b0d2c00406c (PATCH)
    api/v1/users/5e27b1d1-92fd-48f7-84dd-3b0d2c00406c (DELETE)
    api/v1/profile (GET)

# Category

    api/v1/categories/create-category (POST)
    api/v1/categories (GET)
    api/v1/categories/eea154c9-ef63-4f51-a496-de675cb81adb (Single GET)
    api/v1/categories/eea154c9-ef63-4f51-a496-de675cb81adb (PATCH)
    api/v1/categories/eea154c9-ef63-4f51-a496-de675cb81adb (DELETE)

# Books

    api/v1/books/create-book (POST)
    api/v1/books (GET)
    api/v1/books/:categoryId/category (GET)
    api/v1/books/:id (GET)
    api/v1/books/:id (PATCH)
    api/v1/books/:id (DELETE)

# Orders

    api/v1/orders/create-order (POST)
    api/v1/orders (GET)
    api/v1/orders/:id (GET)
