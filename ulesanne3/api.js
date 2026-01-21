export const fetchProducts = async () => {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error();
    return await response.json();
  } catch (error) {
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) throw new Error();
    return await response.json();
  } catch (error) {
    return null;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch('/api/categories');
    if (!response.ok) throw new Error();
    return await response.json();
  } catch (error) {
    return [];
  }
};

