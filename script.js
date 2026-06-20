const FLIGHTS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlFkBrSSDnNIzo7zvCd_FSP_WHRU2CElpUBwnPi-WWC5dsQ2iK7CPkx51dfC6jhkPy-A40R9vHMF0T/pub?gid=234663673&single=true&output=csv';
const PILOTS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlFkBrSSDnNIzo7zvCd_FSP_WHRU2CElpUBwnPi-WWC5dsQ2iK7CPkx51dfC6jhkPy-A40R9vHMF0T/pub?gid=0&single=true&output=csv';

async function loadPilots() {
  const response = await fetch(PILOTS_CSV_URL);
  const csv = await response.text();

  const rows = csv.trim().split('\n').map(row => row.split(','));
  const data = rows.slice(1);

  const grid = document.getElementById('pilotGrid');
  grid.innerHTML = '';

  data.forEach(row => {
    const name = row[1] || '';
    const surname = row[2] || '';
    const callsign = row[3] || '';
    const location = row[6] || '';

    grid.innerHTML += `
      <div class="pilot-card">
        <h3>${name} ${surname}</h3>
        <p>Позывной: ${callsign}</p>
        <p>Локация: ${location}</p>
      </div>
    `;
  });

  document.getElementById('pilotCount').textContent = data.length;
}

loadPilots();

