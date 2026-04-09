function qp(name){
  const u = new URL(window.location.href);
  return u.searchParams.get(name);
}
function esc(s){
  return (s ?? '').toString()
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;');
}
fetch('../data/incidents.json')
  .then(r => r.json())
  .then(data => {
    const id = qp('id');
    const rec = data.find(x => String(x.id) === String(id));
    const box = document.getElementById('incidentDetail');

    if (!rec){
      box.innerHTML = '<a class="back-link" href="../">← Back to dataset</a><p>Record not found.</p>';
      return;
    }

    box.innerHTML = `
      <a class="back-link" href="../">← Back to dataset</a>
      <h2>Record ${esc(rec.id)}</h2>
      <dl class="kv">
        <dt>Date</dt><dd>${esc(rec.date)}</dd>
        <dt>City</dt><dd>${esc(rec.city)}</dd>
        <dt>Province</dt><dd>${esc(rec.province)}</dd>
        <dt>Target</dt><dd>${esc(rec.target_name)}</dd>
        <dt>Target Type</dt><dd>${esc(rec.target_type)}</dd>
        <dt>Incident Type</dt><dd>${esc(rec.incident_type)}</dd>
        <dt>Description</dt><dd>${esc(rec.description)}</dd>
        <dt>Severity</dt><dd>${esc(rec.severity)}</dd>
        <dt>Arrests</dt><dd>${rec.arrests === true ? 'Yes' : rec.arrests === false ? 'No' : ''}</dd>
        <dt>Charges</dt><dd>${esc(rec.charges)}</dd>
        <dt>Court Jurisdiction</dt><dd>${esc(rec.court_jurisdiction)}</dd>
        <dt>Police Agency</dt><dd>${esc(rec.police_agency)}</dd>
        <dt>Police File Number</dt><dd>${esc(rec.police_file_number)}</dd>
        <dt>Damage Estimate (CAD)</dt><dd>${esc(rec.damage_estimate_cad)}</dd>
        <dt>Source</dt><dd>${rec.source ? `<a href="${esc(rec.source)}" target="_blank" rel="noopener noreferrer">${esc(rec.source)}</a>` : ''}</dd>
        <dt>Notes</dt><dd>${esc(rec.notes)}</dd>
      </dl>
    `;
  });
