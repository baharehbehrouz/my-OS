// Bahareh OS — Google Apps Script backend
// 1) TOKEN را به یک رمز دلخواه تغییر بده  2) Deploy > New deployment > Web app
//    Execute as: Me  |  Who has access: Anyone
const TOKEN = 'CHANGE_ME';
const CH = 40000;

function out(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON)}
function sh(n){const s=SpreadsheetApp.getActive();return s.getSheetByName(n)||s.insertSheet(n)}
function put(n,head,rows){const s=sh(n);s.clear();s.getRange(1,1,1,head.length).setValues([head]).setFontWeight('bold');
  if(rows.length)s.getRange(2,1,rows.length,head.length).setValues(rows)}

function doPost(e){
  const b=JSON.parse(e.postData.contents);
  if(b.token!==TOKEN)return out({ok:false});
  const S=b.state, json=JSON.stringify(S), chunks=[];
  for(let i=0;i<json.length;i+=CH)chunks.push([json.slice(i,i+CH)]);
  const st=sh('State');st.clear();st.getRange(1,1,chunks.length,1).setValues(chunks);
  put('Tasks',['date','task','first step','type','done'],S.tasks.map(t=>[t.date,t.t,t.step||'',t.tag,t.done?'yes':'']));
  put('Projects',['project','type','next step','progress %'],S.projects.map(p=>[p.n,p.tag,p.next||'',p.pct]));
  const hr=[];S.habits.forEach(h=>Object.keys(h.log).forEach(d=>hr.push([d,h.n])));
  put('Habits',['date','habit'],hr);
  put('Savings',['date','amount'],(S.sav.log||[]).map(l=>[l.d,l.a]));
  put('Focus',['date','sessions'],Object.keys(S.focus||{}).map(d=>[d,S.focus[d]]));
  const bk=sh('Backups'),today=Utilities.formatDate(new Date(),Session.getScriptTimeZone(),'yyyy-MM-dd');
  const last=bk.getLastRow()?bk.getRange(bk.getLastRow(),1).getValue():'';
  if(String(last).slice(0,10)!==today){const row=[today].concat(chunks.map(c=>c[0]));bk.getRange(bk.getLastRow()+1,1,1,row.length).setValues([row])}
  return out({ok:true});
}

function doGet(e){
  if((e.parameter||{}).token!==TOKEN)return out({ok:false});
  const st=sh('State');if(!st.getLastRow())return out({ok:true,state:null});
  const json=st.getRange(1,1,st.getLastRow(),1).getValues().map(r=>r[0]).join('');
  return out({ok:true,state:JSON.parse(json)});
}
