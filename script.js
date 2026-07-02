let data = [];

fetch("tracking.csv")
  .then(response => response.text())
  .then(text => {
    const rows = text.trim().split("\n").map(r => r.split(","));
    const headers = rows.shift().map(h => h.trim());

    data = rows.map(row => {
      let obj = {};
      headers.forEach((h, i) => obj[h] = (row[i] || "").trim());
      return obj;
    });
  });

function findShipment() {

  const awb = document.getElementById("track").value.trim();

  const shipment = data.find(x => x["AWB"] === awb);

  const result = document.getElementById("result");

  if (!shipment) {
    result.innerHTML = "<h3>AWB not found.</h3>";
    return;
  }

  result.innerHTML = `
    <h2>Shipment Details</h2>

    <p><b>AWB:</b> ${shipment["AWB"]}</p>
    <p><b>HAWB:</b> ${shipment["HAWB"]}</p>
    <p><b>Reference:</b> ${shipment["Reference"]}</p>
    <p><b>Airline:</b> ${shipment["Airline"]}</p>
    <p><b>Flight:</b> ${shipment["Flight"]}</p>
    <p><b>Origin:</b> ${shipment["Origin"]}</p>
    <p><b>Destination:</b> ${shipment["Destination"]}</p>
    <p><b>Pieces:</b> ${shipment["Pieces"]}</p>
    <p><b>Gross Weight:</b> ${shipment["Gross Weight"]}</p>
    <p><b>Chargeable Weight:</b> ${shipment["Chargeable Weight"]}</p>
    <p><b>Status:</b> ${shipment["Status"]}</p>
    <p><b>Last Update:</b> ${shipment["Last Update"]}</p>
  `;
}
