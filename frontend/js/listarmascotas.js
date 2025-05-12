const API_URL = "http://192.168.101.7:3000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

async function loadPets() {
  try {
    const res = await fetch(`${API_URL}/petsDIL`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error("Error al cargar mascotas");

    const pets = await res.json();
    const container = document.getElementById("petList");
    container.innerHTML = "";

    pets.forEach(pet => {
      const card = document.createElement("div");
      card.className = "pet-card";

      card.innerHTML = `
        <div class="pet-info">
          <img class="pet-photo" src="${pet.photo ? `${API_URL}/images/${pet.photo}` : 'images/default-pet.png'}" alt="Foto">
          <div>
            <h1 class="pet-name">${pet.name || 'Sin nombre'}</h1>
            <p class="pet-race">${pet.race?.name || 'Sin raza'}</p>
          </div>
        </div>
        <div class="pet-actions">
          <a href="vermascotas.html?id=${pet.id}"><img src="images/btn-show.svg" alt="Ver"></a>
          <a href="editarmascotas.html?id=${pet.id}"><img src="images/btn-edit.svg" alt="Editar"></a>
          <a href="#" class="btn-delete" data-id="${pet.id}"><img src="images/btn-delete.svg" alt="Eliminar"></a>
        </div>
      `;

      container.appendChild(card);
    });

    document.querySelectorAll(".btn-delete").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        const id = btn.getAttribute("data-id");

        if (confirm("¿Estás seguro de que deseas eliminar esta mascota?")) {
          try {
            const res = await fetch(`${API_URL}/petsDIL/${id}`, {
              method: "DELETE",
              headers: getAuthHeaders()
            });
            if (!res.ok) throw new Error("Error al eliminar mascota");
            loadPets();
          } catch (error) {
            console.error("Error al eliminar mascota:", error);
            alert("Hubo un problema al eliminar la mascota");
          }
        }
      });
    });

  } catch (error) {
    console.error("Error al cargar mascotas:", error);
    alert("Error al cargar la lista de mascotas");
  }
}

document.addEventListener("DOMContentLoaded", loadPets);
