const API_URL = "http://192.168.101.7:3000";

// Función para obtener encabezados con token
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No se encontró token en localStorage");
    return {};
  }
  return {
    "Authorization": `Bearer ${token}`
  };
}

// Mostrar mascotas
async function loadPets() {
  try {
    const res = await fetch(`${API_URL}/petsDIL`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error("Error al cargar mascotas");

    const pets = await res.json();
    const tbody = document.getElementById("petList");
    if (!tbody) throw new Error("Tabla de mascotas no encontrada");

    tbody.innerHTML = "";

    pets.forEach(pet => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${pet.name || 'N/A'}</td>
        <td>${pet.race?.name || 'N/A'}</td>
        <td>${pet.category?.name || 'N/A'}</td>
        <td>${pet.gender?.name || 'N/A'}</td>
        <td>${pet.user?.fullname || 'N/A'}</td>
        <td>${pet.estado || 'N/A'}</td>
        <td>
          ${pet.photo 
            ? `<img src="${API_URL}/images/${pet.photo}" alt="Foto" style="width: 80px; height: auto; border-radius: 5px;" />`
            : 'Sin foto'}
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al cargar mascotas:", error);
    alert("Error al cargar la lista de mascotas");
  }
}

// Inicialización
function initializeApp() {
  try {
    loadPets();
  } catch (error) {
    console.error("Error al inicializar la aplicación:", error);
    alert("Error al cargar la aplicación");
  }
}

document.addEventListener("DOMContentLoaded", initializeApp);
