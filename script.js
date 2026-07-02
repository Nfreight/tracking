let data=[];
fetch('tracking.csv?'+Date.now()).then(r=>r.text()).then(t=>{
 const lines=t.trim().split(/\r?\n/);
 const h=lines.shift().split(',');
 data=lines.map(l=>{let v=l.split(',');let o={};h.forEach((k,i)=>o[k.trim()]=v[i]?v[i].trim():'');return o;});
});
function norm(s){return String(s).replace(/[^a-zA-Z0-9]/g,'').toLowerCase();}
function search(){
 const q=norm(document.getElementById('q').value);
 const r=data.find(x=>norm(x.AWB)==q||norm(x.HAWB)==q||norm(x.Reference)==q);
 const d=document.getElementById('result');
 if(!r){d.innerHTML='<h3>No shipment found.</h3>';return;}
 let t='<table>';
 Object.keys(r).forEach(k=>t+=`<tr><td><b>${k}</b></td><td>${r[k]}</td></tr>`);
 t+='</table>';
 d.innerHTML=t;
}