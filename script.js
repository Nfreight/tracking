let rows=[];
fetch('tracking.xlsx').then(r=>r.arrayBuffer()).then(b=>{
 const wb=XLSX.read(b,{type:'array'});
 rows=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
});
function search(){
 const q=document.getElementById('track').value.trim().toLowerCase();
 const r=rows.find(x=>String(x.AWB).toLowerCase()==q||String(x.HAWB).toLowerCase()==q||String(x.Reference).toLowerCase()==q);
 const d=document.getElementById('result');
 if(!r){d.innerHTML='<p>No shipment found.</p>';return;}
 let t='<table>';
 for(const k in r){t+=`<tr><td><b>${k}</b></td><td>${r[k]}</td></tr>`;}
 t+='</table>';
 d.innerHTML=t;
}
