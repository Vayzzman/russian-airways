const FLIGHTS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlFkBrSSDnNIzo7zvCd_FSP_WHRU2CElpUBwnPi-WWC5dsQ2iK7CPkx51dfC6jhkPy-A40R9vHMF0T/pub?gid=234663673&single=true&output=csv';

const PILOTS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlFkBrSSDnNIzo7zvCd_FSP_WHRU2CElpUBwnPi-WWC5dsQ2iK7CPkx51dfC6jhkPy-A40R9vHMF0T/pub?gid=0&single=true&output=csv';

const STATS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlFkBrSSDnNIzo7zvCd_FSP_WHRU2CElpUBwnPi-WWC5dsQ2iK7CPkx51dfC6jhkPy-A40R9vHMF0T/pub?gid=1717542339&single=true&output=csv';

const FLEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlFkBrSSDnNIzo7zvCd_FSP_WHRU2CElpUBwnPi-WWC5dsQ2iK7CPkx51dfC6jhkPy-A40R9vHMF0T/pub?gid=2004156095&single=true&output=csv';

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

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

async function loadFlights() {
  const table = document.getElementById('flightTable');
  if (!table) return;

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
  } catch (error) {
    table.innerHTML = '<tr><td colspan="4">Ошибка загрузки рейсов</td></tr>';
  }
}

async function loadPilots() {
  const grid = document.getElementById('pilotGrid');
  if (!grid) return;

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

    setText('pilotCount', data.length);
  } catch (error) {
    grid.innerHTML = '<p>Ошибка загрузки пилотов</p>';
  }
}

async function loadStats() {
  try {
    const response = await fetch(STATS_CSV_URL + '&v=' + Date.now());
    const csv = await response.text();
    const rows = parseCSV(csv);

    const stats = {};

    rows.slice(1).forEach(row => {
      stats[row[0]] = row[1];
    });

    setText('flightCount', stats['Рейсов всего'] || '0');
    setText('distanceCount', stats['Дистанция'] || '0');
  } catch (error) {
    setText('flightCount', '0');
    setText('distanceCount', '0');
  }
}

async function loadFleet() {
  const fleetGrid = document.getElementById('fleetGrid');
  const fleetCount = document.getElementById('fleetCount');

  if (!fleetGrid) return;

  try {
    const response = await fetch(FLEET_CSV_URL + '&v=' + Date.now());
    const csv = await response.text();
    const rows = parseCSV(csv);
    const data = rows.slice(1);

    fleetGrid.innerHTML = '';

    if (fleetCount) {
      fleetCount.textContent = data.length;
    }

    data.forEach(row => {
      fleetGrid.innerHTML += `
        <div class="fleet-card">
          <h3>${row[2] || 'Aircraft'}</h3>
          <p>Регистрация: ${row[1] || ''}</p>
          <p>Локация: ${row[4] || ''}</p>
          <p>Статус: ${row[5] || ''}</p>
        </div>
      `;
    });
  } catch (error) {
    fleetGrid.innerHTML = '<p>Ошибка загрузки флота</p>';
  }
}

loadFlights();
loadPilots();
loadStats();
loadFleet();
