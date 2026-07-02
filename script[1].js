let data = [];

fetch("tracking.csv")
  .then(response => response.text())
  .then(text => {
    let rows = text.trim().split("\n").map(r => r.split(","));
    let headers = rows.shift();

    data = rows.map(row => {
      let obj = {};
      headers.forEach((h, i) => obj[h.trim()] = (row[i] || "").trim());
      return obj;
    });
  });

function findShipment() {
  const awb = document.getElementById("track").value.trim();

  const s = data.find(x => x["AWB"] === awb);

  const result = document.getElementById("result");

  if (!s) {
    result.innerHTML = "<h3>AWB not found.</h3>";
    return;
  }

  result.innerHTML = `
    <h2>Shipment Details</h2>
    <p><b>AWB:</b> ${s["AWB"]}</p>
    <p><b>HAWB:</b> ${s["HAWB"]}</p>
    <p><b>Reference:</b> ${s["Reference"]}</p>
    <p><b>Airline:</b> ${s["Airline"]}</p>
    <p><b>Flight:</b> ${s["Flight"]}</p>
    <p><b>Origin:</b> ${s["Origin"]}</p>
    <p><b>Destination:</b> ${s["Destination"]}</p>
    <p><b>Pieces:</b> ${s["Pieces"]}</p>
    <p><b>Gross Weight:</b> ${s["Gross Weight"]}</p>
    <p><b>Chargeable Weight:</b> ${s["Chargeable Weight"]}</p>
    <p><b>Status:</b> ${s["Status"]}</p>
    <p><b>Last Update:</b> ${s["Last Update"]}</p>
  `;
}
