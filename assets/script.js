let INCIDENTS = [];
function uniqueValues(rows, field){
  return [...new Set(rows.map(r => (r[field] || '').trim()).filter(Boolean))].sort();
}
function populateSelect(id, values){
  const el = document.getElementById(id);
  values.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v;
    opt.textContent = v;
    el.appendChild(opt);
  });
}
function boolLabel(v){
  if (v === true) return 'Yes';
  if (v === false) return 'No';
  return '';
}
function rowMatches(r){
  const q = document.getElementById('searchBox').value.toLowerCase().trim();
  const province = document.getElementById('provinceFilter').value;
  const incidentType = document.getElementById('incidentTypeFilter').value;
  const targetType = document.getElementById('targetTypeFilter').value;
  const severity = document.getElementById('severityFilter').value;

  if (province && r.province !== province) return false;
  if (incidentType && r.incident_type !== incidentType) return false;
  if (targetType && r.target_type !== targetType) return false;
  if (severity && r.severity !== severity) return false;

  if (!q) return true;
  const haystack = [
    r.date, r.city, r.province, r.target_name, r.target_type,
    r.incident_type, r.description, r.charges, r.police_agency, r.notes
  ].join(' ').toLowerCase();

  return haystack.includes(q);
}
function renderTable(){
  const filtered = INCIDENTS.filter(rowMatches);
  const body = document.getElementById('incidentTableBody');
  body.innerHTML = '';
  document.getElementById('resultsCount').textContent = `${filtered.length} records`;

  filtered.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.date || ''}</td>
      <td>${r.city || ''}</td>
      <td>${r.province || ''}</td>
      <td>${r.target_name || ''}</td>
      <td>${r.target_type || ''}</td>
      <td>${r.incident_type || ''}</td>
      <td><span class="badge">${r.severity || ''}</span></td>
      <td>${boolLabel(r.arrests)}</td>
    `;
    tr.addEventListener('click', () => {
      window.location.href = `incident/incident.html?id=${encodeURIComponent(r.id)}`;
    });
    body.appendChild(tr);
  });
}
fetch('data/incidents.json')
  .then(r => r.json())
  .then(data => {
    INCIDENTS = data;
    populateSelect('provinceFilter', uniqueValues(INCIDENTS, 'province'));
    populateSelect('incidentTypeFilter', uniqueValues(INCIDENTS, 'incident_type'));
    populateSelect('targetTypeFilter', uniqueValues(INCIDENTS, 'target_type'));
    populateSelect('severityFilter', uniqueValues(INCIDENTS, 'severity'));

    ['searchBox','provinceFilter','incidentTypeFilter','targetTypeFilter','severityFilter'].forEach(id => {
      document.getElementById(id).addEventListener('input', renderTable);
      document.getElementById(id).addEventListener('change', renderTable);
    });

    renderTable();
  });
