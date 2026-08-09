// Point these at your three Spring Boot services.
// In production, move these into src/environments/environment.ts
export const API_CONFIG = {
  productServiceUrl: 'http://localhost:9000/api/product',
  orderServiceUrl: 'http://localhost:9000/api/order',
};

export const DAILY_ALLOWANCE_SECONDS = 24 * 60 * 60; // 24hr credit