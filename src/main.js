import "./styles/style.css";

import "./css/main.css";
// Definicion de variables
const config = {
  nombreComercio: "Mi Comercio S.A.",
  tasaIVA: 0.16
};

let tasaDolar;

let factura = {
  cliente: "",
  producto: "",
  cantidad: 0,
  precio: 0.0,
  subTotal: 0.0,
  totalDolar: 0.0,
  total: 0.0,
  nroFactura: 0
};

// llamada a una API
async function obtenerTasaDolar() {
  // obteniendo el valor de la API
  const respuesta = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  // convierte la respuesta en un objeto que puedo usar
  const datos = await respuesta.json();
  let tasaDolar = datos.rates.VES; // VES = bolívares
  return tasaDolar;
}

// calculos matematicos
function calcularFactura(factura, config, tasaDolar) {
  // Validación
  if (factura.cantidad <= 0 || factura.precio <= 0) {
    console.warn("⚠️ La cantidad y el precio deben ser mayores que cero.");
    return; // Detiene la función si los datos no son válidos
  }
  // Cálculos
  factura.subTotal = factura.cantidad * factura.precio;
  let totalIVA = factura.subTotal * config.tasaIVA;
  factura.total = factura.subTotal + totalIVA;
  factura.totalDolar = factura.total / tasaDolar;
}
