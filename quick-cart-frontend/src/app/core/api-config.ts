// Point these at your three Spring Boot services.
// In production, move these into src/environments/environment.ts
export const API_CONFIG = {
  productServiceUrl: 'http://localhost:8081/api/products',
  inventoryServiceUrl: 'http://localhost:8082/api/inventory',
  orderServiceUrl: 'http://localhost:8083/api/orders',
};

export const DAILY_ALLOWANCE_SECONDS = 24 * 60 * 60; // 24hr credit