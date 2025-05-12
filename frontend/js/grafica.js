const cargarGraficaEstadoMascotas = async () => {
  try {
    const response = await fetch("http://192.168.101.7:3000/petsGraficaDIL");
    const resumen = await response.json();

    if (Array.isArray(resumen)) {
      const labels = resumen.map((item) => item.estado);
      const data = resumen.map((item) => item._count.estado);

      const ctx = document.getElementById("estadoChart").getContext("2d");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Número de Mascotas por Estado",
              data: data,
              backgroundColor: [
                "rgba(75, 192, 192, 0.5)",
                "rgba(255, 159, 64, 0.5)",
              ],
              borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              precision: 0,
            },
          },
        },
      });
    } else {
      console.error("Respuesta no es un array:", resumen);
    }
  } catch (error) {
    console.error("Error al cargar gráfica:", error);
  }
};

document.addEventListener("DOMContentLoaded", cargarGraficaEstadoMascotas);
