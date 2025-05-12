const API_URL = "http://192.168.101.7:3000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

function fillSelect(selectId, data, label = "name") {
  const select = document.getElementById(selectId);
  select.innerHTML = '<option value="">Seleccione...</option>';
  data.forEach(item => {
    const option = document.createElement("option");
    option.value = item.id || item.identificacion;
    option.textContent = item[label] || `Sin ${label}`;
    select.appendChild(option);
  });
}

async function loadSelectData() {
  try {
    const [races, categories, genders, users] = await Promise.all([
      fetch(`${API_URL}/raceDIL`, { headers: getAuthHeaders() }).then(res => res.json()),
      fetch(`${API_URL}/categoryDIL`, { headers: getAuthHeaders() }).then(res => res.json()),
      fetch(`${API_URL}/genderDIL`, { headers: getAuthHeaders() }).then(res => res.json()),
      fetch(`${API_URL}/usersDIL`, { headers: getAuthHeaders() }).then(res => res.json()),
    ]);

    fillSelect("race", races);
    fillSelect("category", categories);
    fillSelect("gender", genders);
    fillSelect("User", users, "fullname");
  } catch (error) {
    console.error("Error al cargar datos de selección:", error);
    alert("Error al cargar datos de selección.");
  }
}

async function loadPetData(petId) {
  try {
    const response = await fetch(`${API_URL}/petsDIL/${petId}`, { headers: getAuthHeaders() });
    if (!response.ok) {
      throw new Error("Mascota no encontrada");
    }
    const pet = await response.json();

    document.getElementById("name").value = pet.name;
    document.getElementById("race").value = pet.race_id;
    document.getElementById("category").value = pet.category_id;
    document.getElementById("gender").value = pet.gender_id;
    document.getElementById("User").value = pet.User_id;
    document.getElementById("estado").value = pet.estado;
    document.getElementById("currentPhoto").value = pet.photo || "";

    const petPhoto = document.getElementById("petPhoto");
    if (pet.photo) {
      petPhoto.src = `${API_URL}/images/${pet.photo}`;
      petPhoto.style.display = "block";
    } else {
      petPhoto.src = "images/default-pet.png";
    }
  } catch (error) {
    console.error("Error al cargar datos de la mascota:", error);
    alert("Error al cargar datos de la mascota.");
  }
}

function getPetIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function setupFormHandler(petId) {
  const form = document.getElementById("petForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!document.getElementById("name").value || 
        !document.getElementById("race").value ||
        !document.getElementById("category").value ||
        !document.getElementById("gender").value ||
        !document.getElementById("User").value) {
      return alert("Todos los campos son requeridos");
    }

    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("race_id", document.getElementById("race").value);
    formData.append("category_id", document.getElementById("category").value);
    formData.append("gender_id", document.getElementById("gender").value);
    formData.append("User_id", document.getElementById("User").value);
    formData.append("estado", document.getElementById("estado").value);
    formData.append("currentPhoto", document.getElementById("currentPhoto").value);

    // Agregar nueva foto si fue seleccionada
    const photoInput = document.getElementById("photo");
    if (photoInput.files[0]) {
      formData.append("photo", photoInput.files[0]);
    }

    try {
      const response = await fetch(`${API_URL}/petsDIL/${petId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Error al actualizar mascota");
      }

      alert("Mascota actualizada con éxito");
      window.location.href = "mascotasInicio.html";
    } catch (error) {
      console.error("Error al actualizar mascota:", error);
      alert(`Error: ${error.message}`);
    }
  });
}

async function initializeApp() {
  const petId = getPetIdFromURL();
  if (!petId) {
    alert("ID de mascota no especificado");
    window.location.href = "mascotasInicio.html";
    return;
  }

  await loadSelectData();
  await loadPetData(petId);
  setupFormHandler(petId);
}

document.addEventListener("DOMContentLoaded", initializeApp);