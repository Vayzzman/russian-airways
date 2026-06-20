const FLIGHTS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlFkBrSSDnNIzo7zvCd_FSP_WHRU2CElpUBwnPi-WWC5dsQ2iK7CPkx51dfC6jhkPy-A40R9vHMF0T/pub?gid=234663673&single=true&output=csv';

async function loadFlights() {
  const response = await fetch(FLIGHTS_CSV_URL);
  const csv = await response.text();

  const rows = csv.trim().split('\n').map(row => row.split(','));
  const data = rows.slice(1);

  document.getElementById('flightCount').textContent = data.length;
  document.getElementById('pilotCount').textContent = new Set(data.map(row => row[1])).size;
  document.getElementById('awardCount').textContent = '18';

  const table = document.getElementById('flightTable');
  table.innerHTML = '';

  data.slice(0, 20).forEach(row => {
    const date = row[0] || '';
    const pilot = row[1] || '';
    const route = row[2] || '';
    const aircraft = row[3] || '';
    const time = row[4] && row[5] ? row[4] + ',' + row[5] : row[4] || '';
    table.innerHTML += `
      <tr>
        <td>${date}</td>
        <td>${pilot}</td>
        <td>${route}</td>
        <td>${aircraft}</td>
        <td>${time}</td>
      </tr>
    `;
  });
}

loadFlights();
