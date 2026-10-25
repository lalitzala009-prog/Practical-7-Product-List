import { useState } from "react";

const initialProducts = [
  {
    id: 1,
    name: "Laptop",
    price: 55000,
    category: "Electronics",
    icon: "💻",
    stock: 12,
    color: "purple",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 25000,
    category: "Electronics",
    icon: "📱",
    stock: 20,
    color: "blue",
  },
  {
    id: 3,
    name: "Headphones",
    price: 2500,
    category: "Accessories",
    icon: "🎧",
    stock: 15,
    color: "pink",
  },
  {
    id: 4,
    name: "Keyboard",
    price: 1500,
    category: "Accessories",
    icon: "⌨️",
    stock: 25,
    color: "orange",
  },
  {
    id: 5,
    name: "Smart Watch",
    price: 4500,
    category: "Wearables",
    icon: "⌚",
    stock: 10,
    color: "green",
  },
  {
    id: 6,
    name: "Tablet",
    price: 18000,
    category: "Electronics",
    icon: "📟",
    stock: 8,
    color: "cyan",
  },
];

function ProductList() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const [showForm, setShowForm] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "Electronics",
    stock: "",
    icon: "📦",
  });

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "high") return b.price - a.price;
      return 0;
    });

  const totalValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0
  );

  const averagePrice = products.length
    ? products.reduce((total, product) => total + product.price, 0) /
      products.length
    : 0;

  function handleInputChange(event) {
    const { name, value } = event.target;

    setNewProduct((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function addProduct(event) {
    event.preventDefault();

    const product = {
      id: Date.now(),
      name: newProduct.name.trim(),
      price: Number(newProduct.price),
      category: newProduct.category,
      stock: Number(newProduct.stock),
      icon: newProduct.icon,
      color: "purple",
    };

    if (
      !product.name ||
      product.price <= 0 ||
      product.stock < 0 ||
      newProduct.price === "" ||
      newProduct.stock === ""
    ) {
      alert("Please enter valid product details.");
      return;
    }

    setProducts((previous) => [...previous, product]);

    setNewProduct({
      name: "",
      price: "",
      category: "Electronics",
      stock: "",
      icon: "📦",
    });

    setShowForm(false);
  }

  function deleteProduct(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      setProducts((previous) =>
        previous.filter((product) => product.id !== id)
      );
    }
  }

  return (
    <div className="app-container">
      <header className="topbar">
        <a href="#home" className="brand">
          <span className="brand-icon">✦</span>
          <span>Product<span className="brand-highlight">Hub</span></span>
        </a>

        <div className="topbar-right">
          <span className="status-dot"></span>
          <span className="status-text">Inventory Dashboard</span>
          <div className="profile-avatar">BCA</div>
        </div>
      </header>

      <main className="main-content" id="home">
        <section className="hero-section">
          <div className="hero-content">
            <span className="eyebrow">✦ PRODUCT MANAGEMENT SYSTEM</span>

            <h1>
              Manage your products.
              <br />
              <span>Grow your business.</span>
            </h1>

            <p>
              Track your inventory, explore products and manage your
              collection from one beautiful dashboard.
            </p>

            <button
              className="primary-button"
              onClick={() => setShowForm(!showForm)}
            >
              <span>{showForm ? "✕" : "+"}</span>
              {showForm ? "Close Form" : "Add New Product"}
            </button>
          </div>

          <div className="hero-illustration" aria-hidden="true">
            <div className="illustration-circle circle-one"></div>
            <div className="illustration-circle circle-two"></div>
            <div className="floating-card card-one">📱</div>
            <div className="floating-card card-two">🎧</div>
            <div className="floating-card card-three">💻</div>
            <div className="main-illustration">🛍️</div>
            <div className="floating-star star-one">✦</div>
            <div className="floating-star star-two">✧</div>
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card stat-purple">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <p>Total Products</p>
              <h2>{products.length}</h2>
              <span>Products in inventory</span>
            </div>
          </div>

          <div className="stat-card stat-pink">
            <div className="stat-icon">🗂️</div>
            <div className="stat-info">
              <p>Categories</p>
              <h2>{new Set(products.map((p) => p.category)).size}</h2>
              <span>Unique product groups</span>
            </div>
          </div>

          <div className="stat-card stat-blue">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <p>Average Price</p>
              <h2>
                ₹{Math.round(averagePrice).toLocaleString("en-IN")}
              </h2>
              <span>Per product</span>
            </div>
          </div>

          <div className="stat-card stat-orange">
            <div className="stat-icon">📈</div>
            <div className="stat-info">
              <p>Inventory Value</p>
              <h2>₹{totalValue.toLocaleString("en-IN")}</h2>
              <span>Total stock value</span>
            </div>
          </div>
        </section>

        {showForm && (
          <section className="form-section">
            <div className="section-heading">
              <div>
                <span className="section-label">PRODUCT DETAILS</span>
                <h2>Add a New Product</h2>
              </div>
            </div>

            <form onSubmit={addProduct} className="product-form">
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price (₹)</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="1"
                  placeholder="Enter price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                >
                  <option>Electronics</option>
                  <option>Accessories</option>
                  <option>Wearables</option>
                  <option>Home Appliances</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock Quantity</label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  placeholder="Enter quantity"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="icon">Product Icon</label>
                <select
                  id="icon"
                  name="icon"
                  value={newProduct.icon}
                  onChange={handleInputChange}
                >
                  <option value="📦">📦 Package</option>
                  <option value="💻">💻 Laptop</option>
                  <option value="📱">📱 Smartphone</option>
                  <option value="🎧">🎧 Headphones</option>
                  <option value="⌚">⌚ Watch</option>
                  <option value="🖥️">🖥️ Monitor</option>
                </select>
              </div>

              <button type="submit" className="primary-button submit-button">
                + Save Product
              </button>
            </form>
          </section>
        )}

        <section className="products-section">
          <div className="section-heading">
            <div>
              <span className="section-label">YOUR COLLECTION</span>
              <h2>Explore Products <span className="title-sparkle">✦</span></h2>
              <p className="section-description">
                Browse and manage your available products.
              </p>
            </div>

            <div className="product-count">
              {filteredProducts.length} products found
            </div>
          </div>

          <div className="filter-panel">
            <div className="search-box">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              {search && (
                <button
                  className="clear-search"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <div className="filter-controls">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                aria-label="Filter by category"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item === "All" ? "All Categories" : item}
                  </option>
                ))}
              </select>

              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                aria-label="Sort products by price"
              >
                <option value="default">Sort: Default</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <article
                className="product-card"
                key={product.id}
              >
                <div className={`product-visual ${product.color}`}>
                  <span className="category-label">
                    {product.category}
                  </span>

                  <span className="product-emoji">{product.icon}</span>

                  <span className="product-id">
                    ID #{String(product.id).slice(-4)}
                  </span>
                </div>

                <div className="product-details">
                  <div className="product-title-row">
                    <h3>{product.name}</h3>
                    <span className="product-check">✓</span>
                  </div>

                  <p className="product-subtitle">
                    Quality product · In inventory
                  </p>

                  <div className="product-meta">
                    <span>Available stock</span>
                    <strong
                      className={
                        product.stock < 5 ? "low-stock" : "stock-value"
                      }
                    >
                      {product.stock} units
                    </strong>
                  </div>

                  <div className="stock-track">
                    <div
                      className={`stock-fill ${product.color}`}
                      style={{
                        width: `${Math.min(product.stock * 4, 100)}%`,
                      }}
                    ></div>
                  </div>

                  <div className="product-footer">
                    <div>
                      <span className="price-label">PRICE</span>
                      <p className="product-price">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <button
                      className="delete-button"
                      onClick={() => deleteProduct(product.id)}
                      aria-label={`Delete ${product.name}`}
                      title="Delete product"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🔎</div>
              <h3>No products found</h3>
              <p>Try changing your search or category filter.</p>
              <button
                className="secondary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

export default ProductList;