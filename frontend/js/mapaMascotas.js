const API_URL = "http://192.168.101.7:3000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No se encontró token en localStorage");
    return {};
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

async function loadPetsMap() {
  try {
    console.log("Iniciando carga del mapa...");
    const response = await fetch(`${API_URL}/petsDIL`, { headers: getAuthHeaders() });
    if (!response.ok) {
      throw new Error("Error al obtener las mascotas");
    }
    const pets = await response.json();
    console.log("Coordenadas crudas:", pets.map(pet => ({ name: pet.name, lat: pet.latitude, lon: pet.longitude })));

    // Inicializar el mapa (centrado en Bogotá)
    const map = L.map("map").setView([1.8529803,-76.0755615], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Filtrar mascotas con coordenadas válidas
    const validPets = pets.filter((pet) => {
      const lat = pet.latitude;
      const lon = pet.longitude;
      const isValid = lat && lon && !isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
      console.log(`Validando ${pet.name}: lat=${lat}, lon=${lon}, válido=${isValid}`);
      return isValid;
    });
    console.log("Mascotas con coordenadas válidas:", validPets);

    validPets.forEach((pet) => {
      const lat = pet.latitude;
      const lon = pet.longitude;
      const marker = L.marker([lat, lon]).addTo(map).bindPopup(`
        <b>${pet.name}</b><br>
        Raza: ${pet.race?.name || "Sin raza"}<br>
        Categoría: ${pet.category?.name || "Sin categoría"}<br>
        Género: ${pet.gender?.name || "Sin género"}<br>
        Estado: ${pet.estado || "Sin estado"}<br>
        <a href="vermascotas.html?id=${pet.id}">Ver detalles</a>
      `);
      console.log(`Marcador agregado para ${pet.name} en [${lat}, ${lon}]`, marker);
    });

    if (validPets.length > 0) {
      const group = new L.featureGroup(
        validPets.map((pet) => L.marker([pet.latitude, pet.longitude]))
      );
      map.fitBounds(group.getBounds(), { padding: [50, 50] });
      console.log("Mapa ajustado a los límites de los marcadores");
    } else {
      console.log("No se encontraron mascotas con coordenadas válidas");
    }
  } catch (error) {
    console.error("Error al cargar el mapa de mascotas:", error);
    document.getElementById("map").innerHTML = "<p>Error al cargar las mascotas.</p>";
  }
}

// Ejecutar directamente
loadPetsMap();