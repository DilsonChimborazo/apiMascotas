const API_URL = "http://192.168.101.7:3000";

function getAuthHeaders() {
    const token = localStorage.getItem("token");
    return token ? { "Authorization": `Bearer ${token}` } : {};
}

function getPetIdFromQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function loadPetDetail() {
    const petId = getPetIdFromQuery();
    if (!petId) return alert("ID de mascota no proporcionado");

    try {
    const res = await fetch(`${API_URL}/petsDIL/${petId}`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error("No se pudo cargar la mascota");

    const pet = await res.json();
    const container = document.getElementById("petDetail");

    container.innerHTML = `
        <div class="pet-card-detail">
            <img class="pet-photo-detail" src="${pet.photo ? `${API_URL}/images/${pet.photo}` : 'images/default-pet.png'}" alt="Foto de la mascota">
            <p><strong>Nombre:</strong> ${pet.name || "Sin nombre"}</p>
            <p><strong>Raza:</strong> ${pet.race?.name || "Sin raza"}</p>
            <p><strong>Categoría:</strong> ${pet.category?.name || "Sin categoría"}</p>
            <p><strong>Género:</strong> ${pet.gender?.name || "Sin género"}</p>
        </div>
    `;
    } catch (error) {
    console.error("Error:", error);
    alert("Error al cargar los detalles de la mascota");
    }
}

document.addEventListener("DOMContentLoaded", loadPetDetail);
