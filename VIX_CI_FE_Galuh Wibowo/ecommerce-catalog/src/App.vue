<template>
  <div id="app" :class="pageCategoryClass">
    <!-- Loading State -->
    <div v-if="loading" class="card loading-card">
      <div class="loader"></div>
    </div>

    <!-- Unavailable Product State -->
    <div v-else-if="isUnavailable" class="card unavailable-card">
      <div class="unavailable-bg-pattern">
        <svg viewBox="0 0 24 24" width="260" height="260" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9" stroke-width="2"></line>
          <line x1="15" y1="9" x2="15.01" y2="9" stroke-width="2"></line>
        </svg>
      </div>
      <div class="unavailable-content">
        <p>This product is unavailable to show</p>
        <div class="button-group">
          <button type="button" class="btn btn-next" @click="fetchNextProduct">Next product</button>
        </div>
      </div>
    </div>

    <!-- Available Product State -->
    <div v-else class="card product-card">
      <div class="product-image">
        <img :src="product.image" :alt="product.title" />
      </div>
      <div class="product-details">
        <div class="product-header">
          <h2 class="product-title">{{ product.title }}</h2>
          <div class="product-meta">
            <span class="product-category">{{ product.category }}</span>
            <div class="product-rating">
              <span class="rating-number">{{ product.rating?.rate }}/5</span>
              <div class="rating-circles">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="circle"
                  :class="{ filled: star <= Math.round(product.rating?.rate || 0) }"
                ></span>
              </div>
            </div>
          </div>
          <div class="divider"></div>
        </div>

        <div class="product-body">
          <p class="product-description">{{ product.description }}</p>
        </div>

        <div class="product-footer">
          <div class="divider"></div>
          <div class="product-price">${{ product.price }}</div>
          <div class="button-group">
            <button type="button" class="btn btn-buy" @click="handleBuy">Buy now</button>
            <button type="button" class="btn btn-next" @click="fetchNextProduct">Next product</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      index: 1,
      product: {},
      loading: false,
      isUnavailable: false
    }
  },
  computed: {
    pageCategoryClass() {
      if (this.isUnavailable) return 'page-unavailable'
      if (this.product.category === "men's clothing") return 'page-men'
      if (this.product.category === "women's clothing") return 'page-women'
      return 'page-unavailable'
    }
  },
  mounted() {
    this.fetchProduct()
  },
  methods: {
    async fetchProduct() {
      this.loading = true
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${this.index}`)
        const data = await res.json()
        
        if (data && (data.category === "men's clothing" || data.category === "women's clothing")) {
          this.product = data
          this.isUnavailable = false
        } else {
          this.product = {}
          this.isUnavailable = true
        }
      } catch (err) {
        this.product = {}
        this.isUnavailable = true
      } finally {
        this.loading = false
      }
    },
    fetchNextProduct() {
      if (this.index >= 20) {
        this.index = 1
      } else {
        this.index += 1
      }
      this.fetchProduct()
    },
    handleBuy() {
      alert(`Product "${this.product.title}" added to cart!`)
    }
  }
}
</script>

<style>
:root {
  --blue-primary: #002772;
  --blue-bg: #d6e6ff;
  --purple-primary: #720060;
  --purple-bg: #fde2ff;
  --dark-text: #1e1e1e;
  --gray-text: #3f3f3f;
  --gray-light: #dcdcdc;
  --gray-border: #e0e0e0;
  --white: #ffffff;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: #f5f5f5;
}

#app {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  transition: background-color 0.3s ease;
}

/* Page Themes */
.page-men {
  background-color: var(--blue-bg);
}
.page-men .btn-buy {
  background-color: var(--blue-primary);
  color: var(--white);
  border: 2px solid var(--blue-primary);
}
.page-men .btn-next {
  border: 2px solid var(--blue-primary);
  color: var(--blue-primary);
  background-color: transparent;
}
.page-men .product-title,
.page-men .product-price {
  color: var(--blue-primary);
}
.page-men .rating-circles .circle {
  border-color: var(--blue-primary);
}
.page-men .rating-circles .circle.filled {
  background-color: var(--blue-primary);
}
.page-men .loader {
  border-top-color: var(--blue-primary);
}

.page-women {
  background-color: var(--purple-bg);
}
.page-women .btn-buy {
  background-color: var(--purple-primary);
  color: var(--white);
  border: 2px solid var(--purple-primary);
}
.page-women .btn-next {
  border: 2px solid var(--purple-primary);
  color: var(--purple-primary);
  background-color: transparent;
}
.page-women .product-title,
.page-women .product-price {
  color: var(--purple-primary);
}
.page-women .rating-circles .circle {
  border-color: var(--purple-primary);
}
.page-women .rating-circles .circle.filled {
  background-color: var(--purple-primary);
}
.page-women .loader {
  border-top-color: var(--purple-primary);
}

.page-unavailable {
  background-color: var(--gray-light);
}
.page-unavailable .btn-next {
  border: 2px solid var(--dark-text);
  color: var(--dark-text);
  background-color: transparent;
  width: 100%;
  max-width: 460px;
}
.page-unavailable .loader {
  border-top-color: var(--dark-text);
}

/* Card Component */
.card {
  background: var(--white);
  border-radius: 12px;
  padding: 48px;
  width: 100%;
  max-width: 960px;
  min-height: 540px;
  display: flex;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

/* Product Card Layout */
.product-card {
  display: flex;
  gap: 50px;
}

.product-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.product-image img {
  max-width: 100%;
  max-height: 360px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product-image img:hover {
  transform: scale(1.03);
}

.product-details {
  flex: 1.4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-title {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 12px;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--gray-text);
  font-size: 14px;
  margin-bottom: 12px;
}

.product-category {
  text-transform: capitalize;
  font-weight: 500;
}

/* Rating Circles */
.product-rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rating-number {
  font-weight: 500;
}

.rating-circles {
  display: flex;
  gap: 4px;
  align-items: center;
}

.rating-circles .circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1.5px solid #ccc;
  background-color: transparent;
}

/* Dividers */
.divider {
  height: 1px;
  background-color: var(--gray-border);
  margin: 10px 0;
  width: 100%;
}

/* Product Description */
.product-description {
  font-size: 14px;
  color: var(--dark-text);
  line-height: 1.6;
  margin: 12px 0;
  max-height: 140px;
  overflow-y: auto;
  padding-right: 8px;
}

/* Custom Scrollbar */
.product-description::-webkit-scrollbar {
  width: 5px;
}
.product-description::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.product-description::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}
.product-description::-webkit-scrollbar-thumb:hover {
  background: #999;
}

/* Price & Buttons */
.product-price {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 18px;
}

.button-group {
  display: flex;
  gap: 16px;
}

.btn {
  flex: 1;
  padding: 12px 20px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

/* Unavailable View */
.unavailable-card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.unavailable-bg-pattern {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000000;
  opacity: 0.05;
  pointer-events: none;
  z-index: 1;
}

.unavailable-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.unavailable-content p {
  color: var(--dark-text);
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 24px;
}

.unavailable-content .button-group {
  width: 100%;
  display: flex;
  justify-content: center;
}

/* Loader */
.loading-card {
  justify-content: center;
  align-items: center;
}

.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid var(--blue-primary);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card {
    padding: 24px;
    min-height: auto;
  }

  .product-card {
    flex-direction: column;
    gap: 24px;
  }

  .product-image img {
    max-height: 220px;
  }

  .button-group {
    flex-direction: column;
  }
}
</style>