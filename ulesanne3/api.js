export const fetchProducts = async () => {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error();
    return await response.json();
  } catch (error) {
    return [];
  }
};