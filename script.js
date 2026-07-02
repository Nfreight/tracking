let data=[];
fetch('tracking.csv').then(r=>r.text()).then(t=>{
let rows=t.trim().split('\n').map(r=>r.split(','));
let h=rows.shift();
data=rows.map(r=>Object.fromEntries(h.map((k,i)=>[k,r[i]])));
});
function findShipment(){
let n=document.getElementById('track').value.trim();
let s=data.find(x=>x['TrackingNo']===n);
let d=document.getElementById('result');
if(!s){d.innerHTML='<h3>Tracking number not found.</h3>';return;}
d.innerHTML=`<h3>Status: ${s.Status}</h3>
<p><b>Tracking No:</b> ${s.TrackingNo}</p>
<p><b>Origin:</b> ${s.Origin}</p>
<p><b>Destination:</b> ${s.Destination}</p>
<p><b>Pieces:</b> ${s.Pieces}</p>
<p><b>Weight:</b> ${s.Weight}</p>
<p><b>ETA:</b> ${s.ETA}</p>
<p><b>Last Update:</b> ${s.LastUpdate}</p>`;
}
