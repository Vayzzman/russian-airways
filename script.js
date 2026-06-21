const FLIGHTS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlFkBrSSDnNIzo7zvCd_FSP_WHRU2CElpUBwnPi-WWC5dsQ2iK7CPkx51dfC6jhkPy-A40R9vHMF0T/pub?gid=234663673&single=true&output=csv';

const PILOTS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlFkBrSSDnNIzo7zvCd_FSP_WHRU2CElpUBwnPi-WWC5dsQ2iK7CPkx51dfC6jhkPy-A40R9vHMF0T/pub?gid=0&single=true&output=csv';

function parseCSV(csv) {
  return csv.trim().split('\n').map(row =>
    row.split(',').map(cell => cell.replace(/^"|"$/g, '').trim())
  );
}

async function loadFlights() {
  const response = await fetch(FLIGHTS_CSV_URL);
  const csv = await response.text();
  const rows = parseCSV(csv);
  const data = rows.slice(1);

  const table = document.getElementById('flightTable');
  table.innerHTML = '';

  data.slice(0, 20).forEach(row => {
    table.innerHTML += `
      <tr>
        <td>${row[0] || ''}</td>
        <td>${row[1] || ''}</td>
        <td>${row[2] || ''}</td>
        <td>${row[3] || ''}</td>
      </tr>
    `;
  });

  document.getElementById('flightCount').textContent = data.length;
}

  const table = document.getElementById('flightTable');
  table.innerHTML = '';

  data.slice(0, 20).forEach(row => {
    table.innerHTML += `
      <tr>
        <td>${row[0] || ''}</td>
        <td>${row[1] || ''}</td>
        <td>${row[2] || ''}</td>
        <td>${row[3] || ''}</td>
        <td>${row[4] || ''}</td>
      </tr>
    `;
  });

  document.getElementById('flightCount').textContent = data.length;
}

async function loadPilots() {
  const response = await fetch(PILOTS_CSV_URL);
  const csv = await response.text();
  const rows = parseCSV(csv);
  const data = rows.slice(1);

  const grid = document.getElementById('pilotGrid');
  grid.innerHTML = '';

  data.forEach(row => {
    grid.innerHTML += `
      <div class="pilot-card">
        <h3>${row[1] || ''} ${row[2] || ''}</h3>
        <p>Локация: ${row[6] || ''}</p>
      </div>
    `;
  });

  document.getElementById('pilotCount').textContent = data.length;
}

document.getElementById('awardCount').textContent = '0';

loadFlights();
loadPilots();
