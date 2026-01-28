export const fetchProducts = async () => {
  const response = await fetch('/api/products');
  return response.ok ? await response.json() : [];
};

export const fetchProductById = async (id) => {
  const products = await fetchProducts();
  return products.find(p => p.id == id) || null;
};

export const fetchCategories = async () => {
  const response = await fetch('/api/categories');
  return response.ok ? await response.json() : ["Kõik"];
};

export const getFavoritesByUserId = async (userId) => {
  const response = await fetch(`/api/favorites/${userId}`);
  return response.ok ? await response.json() : [];
};

export const addFavorite = async (userId, productId) => {
  const response = await fetch(`/api/favorites/${userId}/${productId}`, { method: 'POST' });
  return response.ok ? await response.json() : [];
};

export const deleteFavorite = async (userId, productId) => {
  const response = await fetch(`/api/favorites/${userId}/${productId}`, { method: 'DELETE' });
  return response.ok ? await response.json() : [];
};