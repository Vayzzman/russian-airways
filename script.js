document.getElementById('pilotCount').textContent = '24';
document.getElementById('flightCount').textContent = '1250';
document.getElementById('awardCount').textContent = '18';

const flights = [
  {
    pilot: 'Semen Vaysman',
    route: 'Казань → Санкт-Петербург',
    aircraft: 'A320neo',
    time: '1:55',
    date: '21.06.2026'
  },
  {
    pilot: 'Gleb Azarov',
    route: 'Москва → Калининград',
    aircraft: 'A321neo',
    time: '2:10',
    date: '21.06.2026'
  },
  {
    pilot: 'Anton Riedel',
    route: 'Сочи → Казань',
    aircraft: 'B737 MAX',
    time: '1:45',
    date: '20.06.2026'
  }
];

const table = document.getElementById('flightTable');

table.innerHTML = '';

flights.forEach(flight => {
  table.innerHTML += `
    <tr>
      <td>${flight.date}</td>
      <td>${flight.pilot}</td>
      <td>${flight.route}</td>
      <td>${flight.aircraft}</td>
      <td>${flight.time}</td>
    </tr>
  `;
});
