<template>
  <div class="admin-layout" :class="{ 'sidebar-collapsed': !isSidebarOpen }">
    <!-- Mobile Hamburger Toggle Header -->
    <header class="mobile-nav-header">
      <button @click="toggleSidebar" class="hamburger-btn" aria-label="Toggle Navigation">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <span class="mobile-logo-text">ZENITH ADMIN</span>
    </header>

    <!-- Overlay backdrop for mobile sidebars -->
    <div v-if="isSidebarOpen" @click="closeSidebar" class="sidebar-backdrop"></div>

    <!-- Sidebar Panel -->
    <aside class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
      <div class="brand">
        <h2>Zenith Admin</h2>
      </div>
      <nav>
        <button 
          @click="selectTab('dashboard')" 
          :class="{ active: currentTab === 'dashboard' }"
        >
          Dashboard
        </button>
        <button 
          @click="selectTab('products')" 
          :class="{ active: currentTab === 'products' }"
        >
          Products
        </button>
        <button 
          @click="selectTab('orders')" 
          :class="{ active: currentTab === 'orders' }"
        >
          Orders
        </button>
        <button 
          @click="selectTab('settings')" 
          :class="{ active: currentTab === 'settings' }"
        >
          Settings
        </button>
      </nav>
    </aside>

    <!-- Main Content Panel -->
    <main class="content">
      <header class="topbar">
        <h1 style="text-transform: capitalize;">{{ currentTab }}</h1>
        <div class="user-profile">Admin User</div>
      </header>
      
      <!-- Dashboard View -->
      <div v-if="currentTab === 'dashboard'">
        <div class="metrics">
          <div class="metric-card">
            <h3>Total Revenue</h3>
            <p>${{ totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</p>
          </div>
          <div class="metric-card">
            <h3>Orders Count</h3>
            <p>{{ orders.length }}</p>
          </div>
          <div class="metric-card">
            <h3>Active Products</h3>
            <p>{{ products.length }}</p>
          </div>
        </div>

        <!-- Analytical Charts Mock (Pure Canvas and styled grids) -->
        <div class="analytics-row">
          <div class="recent-orders chart-card">
            <h2>Revenue Growth (Last 6 Months)</h2>
            <div class="chart-container">
              <div class="bar-chart">
                <div class="bar-col" v-for="month in salesHistory" :key="month.name">
                  <div class="bar-fill" :style="{ height: month.percentage + '%' }">
                    <span class="bar-tooltip">${{ month.revenue }}</span>
                  </div>
                  <span class="bar-label">{{ month.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="recent-orders stats-donut-card">
            <h2>Category Distribution</h2>
            <div class="stats-donut-list">
              <div v-for="category in categoryDistribution" :key="category.name" class="category-item">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                  <span>{{ category.name }}</span>
                  <span style="font-weight: 600;">{{ category.count }} ({{ category.percentage }}%)</span>
                </div>
                <div class="progress-bar-bg">
                  <div class="progress-bar-fill" :style="{ width: category.percentage + '%', background: category.color }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="recent-orders">
          <h2>Recent Activity</h2>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in orders.slice(0, 3)" :key="order.id">
                  <td>{{ order.id }}</td>
                  <td>{{ order.customer }}</td>
                  <td>${{ order.amount.toFixed(2) }}</td>
                  <td>
                    <span :class="['status', order.status.toLowerCase()]">
                      {{ order.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Products View -->
      <div v-else-if="currentTab === 'products'" class="recent-orders">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 10px;">
          <h2>Manage Products</h2>
          <div style="display: flex; gap: 10px; width: 100%; max-width: 400px; flex-wrap: wrap;">
            <input type="text" v-model="productSearch" class="modal-input" placeholder="Search products..." style="flex: 1; padding: 0.4rem 0.8rem;" />
            <button @click="showAddProductModal = true" class="action-btn-primary" style="white-space: nowrap;">+ Add Product</button>
          </div>
        </div>
        
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in filteredProducts" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>${{ product.price.toFixed(2) }}</td>
                <td>{{ product.stock }} pcs</td>
                <td>
                  <button @click="deleteProduct(product.id)" class="action-btn-danger">Delete</button>
                </td>
              </tr>
              <tr v-if="filteredProducts.length === 0">
                <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2rem;">No products found matching search query.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Add Product Modal -->
        <div v-if="showAddProductModal" class="modal-overlay">
          <div class="modal-card">
            <h3>Add New Product</h3>
            <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 1rem;">
              <div>
                <label class="form-label">Product Name</label>
                <input type="text" v-model="newProduct.name" class="modal-input" placeholder="e.g. Apex Sound Pro" />
              </div>
              <div>
                <label class="form-label">Category</label>
                <select v-model="newProduct.category" class="modal-input">
                  <option>Electronics</option>
                  <option>Clothing</option>
                  <option>Home</option>
                  <option>Sports</option>
                  <option>Beauty</option>
                </select>
              </div>
              <div>
                <label class="form-label">Price ($)</label>
                <input type="number" v-model.number="newProduct.price" class="modal-input" placeholder="0.00" />
              </div>
              <div>
                <label class="form-label">Stock Qty</label>
                <input type="number" v-model.number="newProduct.stock" class="modal-input" placeholder="10" />
              </div>
              <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 0.5rem;">
                <button @click="showAddProductModal = false" class="modal-btn-cancel">Cancel</button>
                <button @click="addProduct" class="modal-btn-confirm">Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Orders View -->
      <div v-else-if="currentTab === 'orders'" class="recent-orders">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 10px;">
          <h2>All Orders</h2>
          <div style="display: flex; gap: 10px;">
            <button @click="orderFilter = 'all'" :class="['filter-tab-btn', { active: orderFilter === 'all' }]">All</button>
            <button @click="orderFilter = 'Processing'" :class="['filter-tab-btn', { active: orderFilter === 'Processing' }]">Processing</button>
            <button @click="orderFilter = 'Shipped'" :class="['filter-tab-btn', { active: orderFilter === 'Shipped' }]">Shipped</button>
          </div>
        </div>
        
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in filteredOrders" :key="order.id">
                <td>{{ order.id }}</td>
                <td>{{ order.customer }}</td>
                <td>{{ order.date }}</td>
                <td>${{ order.amount.toFixed(2) }}</td>
                <td>
                  <span :class="['status', order.status.toLowerCase()]">
                    {{ order.status }}
                  </span>
                </td>
                <td>
                  <button 
                    v-if="order.status === 'Processing'" 
                    @click="shipOrder(order.id)" 
                    class="action-btn-primary" 
                    style="padding: 0.25rem 0.5rem; font-size: 0.75rem;"
                  >
                    Ship
                  </button>
                </td>
              </tr>
              <tr v-if="filteredOrders.length === 0">
                <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2rem;">No orders in this category.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Settings View -->
      <div v-else-if="currentTab === 'settings'" class="recent-orders">
        <h2>System Settings</h2>
        <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem;">
          <div>
            <label style="display: block; font-weight: 500; margin-bottom: 0.5rem; color: var(--text-muted);">Store Name</label>
            <input type="text" v-model="settings.storeName" style="background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); padding: 0.6rem 1rem; border-radius: 8px; color: #fff; width: 100%; max-width: 400px;" />
          </div>
          <div>
            <label style="display: block; font-weight: 500; margin-bottom: 0.5rem; color: var(--text-muted);">Currency</label>
            <select v-model="settings.currency" style="background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); padding: 0.6rem 1rem; border-radius: 8px; color: #fff; width: 100%; max-width: 400px;">
              <option>USD ($)</option>
              <option>UAH (₴)</option>
              <option>EUR (€)</option>
            </select>
          </div>
          <div>
            <button @click="saveSettings" style="background: var(--accent-color); color: #fff; padding: 0.6rem 1.5rem; border-radius: 8px; font-weight: 600;">Save Changes</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const currentTab = ref('dashboard');
const showAddProductModal = ref(false);
const isSidebarOpen = ref(false);
const productSearch = ref('');
const orderFilter = ref('all');

const settings = ref({
  storeName: 'Zenith Store',
  currency: 'USD ($)'
});

// Mock Sales History for internal chart visualization
const salesHistory = ref([
  { name: 'Jan', revenue: 15400, percentage: 45 },
  { name: 'Feb', revenue: 18200, percentage: 55 },
  { name: 'Mar', revenue: 16900, percentage: 50 },
  { name: 'Apr', revenue: 22100, percentage: 70 },
  { name: 'May', revenue: 24500, percentage: 80 },
  { name: 'Jun', revenue: 28900, percentage: 95 }
]);

// Reactively manage products
const products = ref([
  { id: 1, name: 'Zenith Quantum Pro', category: 'Electronics', price: 1499.00, stock: 25 },
  { id: 2, name: 'Apex Sound Pro', category: 'Electronics', price: 199.99, stock: 120 },
  { id: 3, name: 'Thermoblend Smart Pot', category: 'Home', price: 289.00, stock: 40 },
  { id: 4, name: 'Zenith HydroFlask', category: 'Sports', price: 34.50, stock: 95 },
  { id: 5, name: 'Velvet Glow Serum', category: 'Beauty', price: 89.00, stock: 65 }
]);

// Reactively manage orders
const orders = ref([
  { id: 'ORD-10492', customer: 'Alice Smith', date: '2026-06-20', amount: 1299.99, status: 'Processing' },
  { id: 'ORD-10493', customer: 'Bob Johnson', date: '2026-06-19', amount: 49.99, status: 'Shipped' },
  { id: 'ORD-10494', customer: 'Charlie Brown', date: '2026-06-18', amount: 89.50, status: 'Shipped' },
  { id: 'ORD-10495', customer: 'Diana Prince', date: '2026-06-17', amount: 450.00, status: 'Processing' }
]);

const newProduct = ref({
  name: '',
  category: 'Electronics',
  price: 0,
  stock: 10
});

// Computed stats
const totalRevenue = computed(() => {
  return orders.value.reduce((acc, order) => acc + order.amount, 0);
});

// Computed category counts
const categoryDistribution = computed(() => {
  const counts = {};
  products.value.forEach(p => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });
  const total = products.value.length || 1;
  const colors = {
    Electronics: '#60a5fa',
    Clothing: '#f59e0b',
    Home: '#10b981',
    Sports: '#8b5cf6',
    Beauty: '#ec4899'
  };
  return Object.keys(counts).map(key => ({
    name: key,
    count: counts[key],
    percentage: Math.round((counts[key] / total) * 100),
    color: colors[key] || '#94a3b8'
  }));
});

// Filtering logic
const filteredProducts = computed(() => {
  if (!productSearch.value.trim()) return products.value;
  const q = productSearch.value.toLowerCase().trim();
  return products.value.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
});

const filteredOrders = computed(() => {
  if (orderFilter.value === 'all') return orders.value;
  return orders.value.filter(o => o.status === orderFilter.value);
});

// Mobile functions
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
const closeSidebar = () => {
  isSidebarOpen.value = false;
};
const selectTab = (tab) => {
  currentTab.value = tab;
  closeSidebar();
};

// Functions
const addProduct = () => {
  if (newProduct.value.name.trim()) {
    products.value.push({
      id: products.value.length ? Math.max(...products.value.map(p => p.id)) + 1 : 1,
      name: newProduct.value.name,
      category: newProduct.value.category,
      price: newProduct.value.price || 0,
      stock: newProduct.value.stock || 0
    });
    // Reset form
    newProduct.value = { name: '', category: 'Electronics', price: 0, stock: 10 };
    showAddProductModal.value = false;
  }
};

const deleteProduct = (id) => {
  products.value = products.value.filter(p => p.id !== id);
};

const shipOrder = (orderId) => {
  const order = orders.value.find(o => o.id === orderId);
  if (order) {
    order.status = 'Shipped';
  }
};

const saveSettings = () => {
  alert('Settings saved successfully!');
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  position: relative;
  overflow: hidden;
}

/* Sidebar Styling */
.sidebar {
  width: 260px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border-right: 1px solid var(--border-color);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
}

.brand h2 {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  letter-spacing: -0.5px;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

nav button {
  color: var(--text-muted);
  font-size: 1.05rem;
  padding: 0.7rem 1.2rem;
  border-radius: 10px;
  transition: all 0.25s ease;
  background: transparent;
  border: none;
  text-align: left;
  width: 100%;
  cursor: pointer;
  font-weight: 500;
}

nav button:hover, nav button.active {
  background: var(--accent-color-light);
  color: var(--text-color);
  transform: translateX(4px);
}

.content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  min-width: 0; /* Webkit fix */
}

/* Top Navigation Bar */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.topbar h1 {
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.user-profile {
  font-size: 0.95rem;
  font-weight: 600;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

/* Analytical Grid row */
.analytics-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.chart-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chart-container {
  height: 200px;
  display: flex;
  align-items: flex-end;
  margin-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px dashed var(--border-color);
}

.bar-chart {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: flex-end;
  gap: 10px;
}

.bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
  position: relative;
}

.bar-fill {
  width: 70%;
  background: var(--accent-gradient);
  border-radius: 6px 6px 0 0;
  position: relative;
  transition: height 0.6s ease;
  min-height: 5px;
  cursor: pointer;
}

.bar-fill:hover {
  filter: brightness(1.1);
}

.bar-fill:hover .bar-tooltip {
  visibility: visible;
  opacity: 1;
  transform: translate(-50%, -10px);
}

.bar-tooltip {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translate(-50%, 0);
  background: #1e293b;
  border: 1px solid var(--border-color);
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s ease;
}

.bar-label {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 8px;
}

/* Category progress donut simulation */
.stats-donut-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.category-item {
  font-size: 13px;
}

.progress-bar-bg {
  width: 100%;
  height: 6px;
  background: rgba(255,255,255,0.05);
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.4s ease;
}

/* Metrics Dashboard */
.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.metric-card {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  transition: transform 0.25s ease;
}

.metric-card:hover {
  transform: translateY(-4px);
}

.metric-card h3 {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.metric-card p {
  font-size: 2rem;
  font-weight: 700;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Recent Activity Tables */
.recent-orders {
  background: var(--glass-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
  margin-bottom: 1.5rem;
}

.recent-orders h2 {
  font-size: 1.25rem;
  font-weight: 600;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

th {
  color: var(--text-muted);
  font-weight: 500;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

td {
  font-size: 14px;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.825rem;
  font-weight: 600;
  display: inline-block;
}

.status.processing {
  background: rgba(245, 158, 11, 0.15);
  color: var(--amber);
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.status.shipped {
  background: rgba(16, 185, 129, 0.15);
  color: var(--green);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

/* Header Action tabs for Orders views */
.filter-tab-btn {
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  border-radius: 8px;
  padding: 0.4rem 1rem;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.filter-tab-btn:hover, .filter-tab-btn.active {
  background: var(--accent-color-light);
  color: #fff;
  border-color: transparent;
}

/* Primary Action Buttons */
.action-btn-primary {
  background: var(--accent-color);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
  transition: opacity 0.2s;
}
.action-btn-primary:hover {
  opacity: 0.9;
}

.action-btn-danger {
  background: rgba(239, 68, 68, 0.15);
  color: var(--red);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.850rem;
  transition: background 0.2s;
}
.action-btn-danger:hover {
  background: rgba(239, 68, 68, 0.3);
}

/* Modal styling */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-card {
  background: #1e293b;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  width: 100%;
  max-width: 450px;
  padding: 2rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.modal-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.6rem 1rem;
  color: #fff;
  outline: none;
  font-size: 0.95rem;
}
.modal-input:focus {
  border-color: var(--accent-color);
}

.modal-btn-cancel {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
}

.modal-btn-confirm {
  background: var(--accent-color);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-muted);
  margin-bottom: 0.4rem;
}

/* Mobile Layout Structures */
.mobile-nav-header {
  display: none;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem;
  align-items: center;
  gap: 15px;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 99;
  height: 60px;
}

.hamburger-btn {
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
}

.mobile-logo-text {
  font-weight: 800;
  letter-spacing: 1px;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.15rem;
}

.sidebar-backdrop {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 98;
}

/* --- Media Queries and Responsive Styles --- */
@media (max-width: 900px) {
  .analytics-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .admin-layout {
    flex-direction: column;
    padding-top: 60px; /* space for mobile toggle header */
  }

  .mobile-nav-header {
    display: flex;
  }

  .sidebar-backdrop {
    display: block;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 280px;
    transform: translateX(-100%);
    box-shadow: 10px 0 30px rgba(0,0,0,0.5);
  }

  .sidebar.sidebar-open {
    transform: translateX(0);
  }

  .content {
    padding: 1.25rem;
  }

  .topbar {
    display: none; /* Mobile toggle header has title template instead */
  }

  .metrics {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .metric-card {
    padding: 1.25rem;
  }

  .recent-orders {
    padding: 1.25rem;
  }
}
</style>
