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

// Función para llenar los selects con datos
function fillSelect(selectId, data, label = "name") {
  const select = document.getElementById(selectId);
  if (!select) {
    console.error(`Elemento con ID ${selectId} no encontrado`);
    return;
  }

  const placeholders = {
    race: "Seleccione una raza",
    category: "Seleccione una categoría",
    gender: "Seleccione un género",
    User: "Seleccione un usuario"
  };

  const placeholderText = placeholders[selectId] || "Seleccione";
  select.innerHTML = `<option value="">${placeholderText}</option>`;

  if (!Array.isArray(data)) {
    console.error(`Datos para ${selectId} no son un array`);
    return;
  }

  data.forEach(item => {
    const option = document.createElement("option");
    option.value = item.id || item.identificacion;
    option.textContent = item[label] || `Sin ${label}`;
    select.appendChild(option);
  });
}

// Cargar datos para los selects
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
    console.error("Error al cargar datos de los selects:", error);
    alert("Error al cargar datos iniciales");
  }
}

// Registrar mascota con depuración
function setupFormHandler() {
  const form = document.getElementById("petForm");
  if (!form) {
    console.error("Formulario no encontrado");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("➡ Formulario enviado. Preparando datos...");

    const elements = {
      name: document.getElementById("name"),
      race: document.getElementById("race"),
      category: document.getElementById("category"),
      gender: document.getElementById("gender"),
      User: document.getElementById("User"),
      estado: document.getElementById("estado"),
      photo: document.getElementById("photo")
    };

    for (const [field, element] of Object.entries(elements)) {
      if (!element) {
        alert(`Error: Campo ${field} no encontrado`);
        return;
      }
    }

    if (!elements.name.value || !elements.estado.value) {
      alert("Nombre y estado son campos requeridos");
      return;
    }

    const formData = new FormData();
    formData.append('name', elements.name.value);
    formData.append('race_id', elements.race.value);
    formData.append('category_id', elements.category.value);
    formData.append('gender_id', elements.gender.value);
    formData.append('User_id', elements.User.value);
    formData.append('estado', elements.estado.value);

    if (elements.photo.files[0]) {
      formData.append('photo', elements.photo.files[0]);
    }

    console.log("📦 Datos del FormData:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await fetch(`${API_URL}/petsDIL`, {
        method: "POST",
        headers: getAuthHeaders(), 
        body: formData
      });

      console.log("⏳ Esperando respuesta del servidor...");

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Error del servidor:", errorData);
        throw new Error(errorData.message || "Error en el servidor");
      }

      const result = await response.json();
      console.log("✅ Mascota registrada con éxito:", result);

      form.reset();
      window.location.href = "mascotasinicio.html";
    } catch (error) {
      console.error("🚨 Error al registrar mascota:", error);
      alert(`Error: ${error.message}`);
    }
  });
}

// Inicialización de la app
function initializeApp() {
  try {
    loadSelectData();
    setupFormHandler();
  } catch (error) {
    console.error("Error al inicializar la aplicación:", error);
    alert("Error al cargar la aplicación");
  }
}

document.addEventListener("DOMContentLoaded", initializeApp);
