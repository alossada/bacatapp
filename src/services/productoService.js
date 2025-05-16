const API_URL = "http://localhost:8080/productos";

export const registrarProducto = async (producto) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });

    if (!response.ok) {
      throw new Error("Error al registrar producto");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en registrarProducto:", error);
    throw error;
  }
};
