const API_URL = "http://localhost:8080/categorias";

export const obtenerCategorias = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener categorías");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en obtenerCategorias:", error);
    throw error;
  }
};
