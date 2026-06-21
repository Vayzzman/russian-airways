const FLIGHTS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlFkBrSSDnNIzo7zvCd_FSP_WHRU2CElpUBwnPi-WWC5dsQ2iK7CPkx51dfC6jhkPy-A40R9vHMF0T/pub?gid=234663673&single=true&output=csv';

const PILOTS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlFkBrSSDnNIzo7zvCd_FSP_WHRU2CElpUBwnPi-WWC5dsQ2iK7CPkx51dfC6jhkPy-A40R9vHMF0T/pub?gid=0&single=true&output=csv';

function parseCSV(csv) {
  const rows = [];
  let row = [];
  let cell = '';
  let insideQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];

    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      row.push(cell.trim());
      cell = '';
    } else if ((char === '\n' || char === '\r') && !insideQuotes) {
      if (cell || row.length) {
        row.push(cell.trim());
        rows.push(row);
        row = [];
        cell = '';
      }
    } else {
      cell += char;
    }
  }

  if (cell || row.length) {
    row.push(cell.trim());
    rows.push(row);
  }

  return rows;
}

async function loadFlights() {
  const table = document.getElementById('flightTable');

  try {
    const response = await fetch(FLIGHTS_CSV_URL + '&v=' + Date.now());
    const csv = await response.text();
    const rows = parseCSV(csv);
    const data = rows.slice(1);

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
  } catch (error) {
    table.innerHTML = '<tr><td colspan="4">Ошибка загрузки рейсов</td></tr>';
  }
}

async function loadPilots() {
  const grid = document.getElementById('pilotGrid');

  try {
    const response = await fetch(PILOTS_CSV_URL + '&v=' + Date.now());
    const csv = await response.text();
    const rows = parseCSV(csv);
    const data = rows.slice(1);

    grid.innerHTML = '';

    data.forEach(row => {
      grid.innerHTML += `
        <div class="pilot-card">
          <h3>${row[1] || ''} ${row[2] || ''}</h3>
          <p>Должность: ${row[5] || 'Пилот'}</p>
          <p>Местоположение: ${row[6] || ''}</p>
        </div>
      `;
    });

    document.getElementById('pilotCount').textContent = data.length;
  } catch (error) {
    grid.innerHTML = '<p>Ошибка загрузки пилотов</p>';
  }
}

document.getElementById('awardCount').textContent = '0';

loadFlights();
loadPilots();
