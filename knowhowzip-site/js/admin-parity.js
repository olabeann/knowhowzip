"use strict";
// UI parity with the authenticated creator dashboard, reviewed 2026-11-06.
// This static prototype uses local sample data; it never writes to production.
function toggleAdminSidebar(force){
  const shell=document.querySelector('.admin-shell');
  const collapsed=typeof force==='boolean'?force:!shell.classList.contains('sidebar-collapsed');
  shell.classList.toggle('sidebar-collapsed',collapsed);
  const button=document.querySelector('.sidebar-toggle');
  button.textContent=collapsed?'›':'‹';button.setAttribute('aria-expanded',String(!collapsed));
  button.setAttribute('aria-label',collapsed?'사이드바 펼치기':'사이드바 접기');
  try{localStorage.setItem('nhz-admin-sidebar',String(collapsed));}catch{}
}
const adminIcons={dashboard:'<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="13" y="3" width="6" height="6" rx="1"/><rect x="3" y="13" width="6" height="6" rx="1"/><rect x="13" y="13" width="6" height="6" rx="1"/>',classes:'<circle cx="11" cy="11" r="8"/><path d="m9 7 5 4-5 4Z"/>',products:'<path d="m11 2 8 4v11l-8 4-8-4V6Z M3 6l8 5 8-5 M11 11v10"/>',students:'<circle cx="9" cy="7" r="3"/><path d="M2 20v-2a7 7 0 0 1 14 0v2 M16 4a3 3 0 0 1 0 6 M18 14a6 6 0 0 1 3 5"/>',sales:'<path d="M5 2h12v19l-3-2-3 2-3-2-3 2Z M8 7h6 M8 11h6 M8 15h4"/>',settings:'<path d="m9 2-1 3-3 1-2 4 2 2-1 3 3 3 3-1 2 3 4-2 1-3 3-1-1-5-3-1-1-3Z"/><circle cx="11" cy="11" r="3"/>'};
document.querySelectorAll('.admin-nav button').forEach(button=>{const label=button.querySelector('span').textContent;button.setAttribute('aria-label',label);button.title=label;button.querySelector('i').innerHTML=`<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true">${adminIcons[button.dataset.view]||''}</svg>`;});
document.querySelector('.sidebar-bottom a').setAttribute('aria-label','내 페이지 보기');
try{const saved=localStorage.getItem('nhz-admin-sidebar');toggleAdminSidebar(innerWidth<=820||saved==='true');}catch{toggleAdminSidebar(innerWidth<=820);}

matchMedia('(max-width:820px)').addEventListener('change',event=>{if(event.matches)toggleAdminSidebar(true);});

// Ordered video curriculum. Move the DOM node to preserve selected File objects.
const baseCurriculumRow=curriculumRow;
curriculumRow=function(index,value=''){
  return baseCurriculumRow(index,escapeAdminText(value)).replace('<div class="repeat-row curriculum-row">',`<div class="repeat-row curriculum-row"><div class="curriculum-order"><button type="button" aria-label="${index}강 위로 이동" onclick="moveCurriculum(this,-1)">↑</button><button type="button" draggable="true" aria-label="${index}강 순서 드래그" title="드래그하여 순서 변경" ondragstart="startCurriculumDrag(event)">⠿</button><button type="button" aria-label="${index}강 아래로 이동" onclick="moveCurriculum(this,1)">↓</button></div>`);
};
function renumberCurriculum(){
  const rows=[...document.querySelectorAll('#curriculumRows .curriculum-row')];
  rows.forEach((row,i)=>{
    row.querySelector('.curriculum-row-head em').textContent=`${i+1}강`;
    row.querySelector('.remove-row').innerHTML='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 10v7M14 10v7"/></svg>';
    const buttons=row.querySelectorAll('.curriculum-order button');
    buttons[0].disabled=i===0;buttons[2].disabled=i===rows.length-1;
    ['위로 이동','순서 드래그','아래로 이동'].forEach((label,n)=>buttons[n].setAttribute('aria-label',`${i+1}강 ${label}`));
    const remove=row.querySelector('.remove-row');remove.disabled=rows.length===1;remove.setAttribute('aria-label',`${i+1}강 삭제`);
    row.ondragover=event=>event.preventDefault();
    row.ondrop=event=>{event.preventDefault();if(draggedCurriculum&&draggedCurriculum!==row){row.before(draggedCurriculum);renumberCurriculum();}};
  });
}
let draggedCurriculum=null;
function startCurriculumDrag(event){draggedCurriculum=event.target.closest('.curriculum-row');event.dataTransfer.setData('text/plain','curriculum');event.dataTransfer.effectAllowed='move';}
function moveCurriculum(button,direction){const row=button.closest('.curriculum-row'),other=direction<0?row.previousElementSibling:row.nextElementSibling;if(other){direction<0?other.before(row):other.after(row);renumberCurriculum();}}
const baseAddCurriculum=addCurriculumRow;
addCurriculumRow=function(){baseAddCurriculum();renumberCurriculum();};
const baseRemoveEditorRow=removeEditorRow;
removeEditorRow=function(...args){baseRemoveEditorRow(...args);renumberCurriculum();};
function prepareClassEditor(form){
  if(!form)return;renumberCurriculum();
  const item=lectureContents.find(c=>c.id===form.dataset.contentId);
  form.querySelectorAll('.curriculum-row').forEach((row,i)=>{row.querySelector('.curriculum-description').value=item?.lessonDetails?.[i]?.description||'';row.querySelector('.video-duration').value=item?.lessonDetails?.[i]?.duration||'';});
  form.querySelectorAll('.material-card').forEach((row,i)=>row.querySelector('.material-description').value=item?.materialDetails?.[i]?.description||'');
}
saveClassForm=function(event,mode){
  event.preventDefault();const form=event.currentTarget;
  if(!validateClassEditorForm(form))return;
  const id=form.dataset.contentId||`content-${Date.now()}`;
  let item=lectureContents.find(c=>c.id===id);
  if(!item){item={id,color:'linear-gradient(135deg,#DCE3FF,#AFC0FF)'};lectureContents.unshift(item);}
  item.title=form.elements.contentTitle.value.trim();item.intro=form.elements.contentDescription.value.trim();
  item.content={videos:[...form.querySelectorAll('.curriculum-title')].map(e=>e.value.trim()),files:[...form.querySelectorAll('.material-title')].map(e=>e.value.trim()).filter(Boolean)};
  item.lessonDetails=[...form.querySelectorAll('.curriculum-row')].map(row=>({description:row.querySelector('.curriculum-description').value,duration:row.querySelector('.video-duration').value}));
  item.materialDetails=[...form.querySelectorAll('.material-card')].map(row=>({description:row.querySelector('.material-description').value}));
  clearEditorSession();showAdminView('classes',true);adminToast('강의 콘텐츠를 저장했습니다');
};

// Gallery: add, remove, and order up to 20 images. First image is the cover.
function syncClassImages(){
  const form=document.querySelector('.product-editor');if(!form)return;
  const images=form._classImages||[];form._classImageData=images[0]||'';
  document.getElementById('classImages').innerHTML=images.map((src,i)=>`<div class="class-image-item" role="listitem"><img src="${escapeAdminText(src)}" alt="${i+1}번째 클래스 이미지${i===0?' (대표)':''}">${i===0?'<b>대표</b>':''}<button type="button" class="image-remove" aria-label="${i+1}번째 이미지 삭제" onclick="removeClassImage(${i})">×</button><div><span>${i+1}</span><button type="button" aria-label="${i+1}번째 이미지를 앞으로 이동" ${i===0?'disabled':''} onclick="moveClassImage(${i},-1)">←</button><button type="button" aria-label="${i+1}번째 이미지를 뒤로 이동" ${i===images.length-1?'disabled':''} onclick="moveClassImage(${i},1)">→</button></div></div>`).join('');
  document.getElementById('addClassImages').textContent=`이미지 추가 (${images.length}/20)`;document.getElementById('addClassImages').disabled=images.length>=20;
  document.getElementById('classImageStatus').textContent=images.length?'':'등록된 클래스 이미지가 없습니다.';
  document.getElementById('classImageOrder').value=JSON.stringify(images);
}
function removeClassImage(index){document.querySelector('.product-editor')._classImages.splice(index,1);syncClassImages();}
function moveClassImage(index,delta){const images=document.querySelector('.product-editor')._classImages,target=index+delta;if(target<0||target>=images.length)return;[images[index],images[target]]=[images[target],images[index]];syncClassImages();}
function readImageFile(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file);});}
handleClassImageUpload=async function(input){
  const form=input.closest('form'),files=[...input.files];
  if(files.some(f=>!['image/jpeg','image/png','image/webp'].includes(f.type))){adminToast('JPG, PNG, WebP 이미지를 선택해 주세요');input.value='';return;}
  if((form._classImages?.length||0)+files.length>20){adminToast('클래스 이미지는 최대 20장까지 등록할 수 있습니다');input.value='';return;}
  try{const images=await Promise.all(files.map(readImageFile));if(!form.isConnected)return;form._classImages.push(...images);syncClassImages();}catch{adminToast('이미지를 불러오지 못했습니다');}input.value='';
};
function toggleUnlimitedAccess(input){const days=input.closest('[data-access-mode]').querySelector('.access-days');days.hidden=input.checked;days.querySelector('input').disabled=input.checked;}
function prepareProductEditor(form){
  if(!form)return;
  if(!form._classImages){const p=saleProducts.find(p=>p.id===form.dataset.productId);form._classImages=[...(p?.images||(p?.image?[p.image]:[]))];syncClassImages();}
  const unlimited=form.elements.accessUnlimited;if(unlimited)toggleUnlimitedAccess(unlimited);
  enhanceDescriptionToolbar();
}
const baseValidateProduct=validateProductEditorForm;
validateProductEditorForm=function(form){
  if(!(form._classImages||[]).length){showProductEditorStep(0,true);adminToast('클래스 이미지를 1장 이상 등록해 주세요');return false;}
  const price=Number(form.elements.originalPrice.value),discount=form.elements.discountPrice.value;
  if(price<1000||(discount!==''&&(Number(discount)<1000||Number(discount)>price))){showProductEditorStep(3,true);adminToast('결제 금액은 1,000원 이상, 할인 가격은 판매 가격 이하로 입력해 주세요');return false;}
  return baseValidateProduct(form);
};
const baseSaveProduct=saveProductForm;
saveProductForm=function(event,mode){
  const form=event.currentTarget;
  baseSaveProduct(event,mode);
  const p=saleProducts.find(p=>p.id===form.dataset.productId)||(mode==='create'?saleProducts[0]:null);
  if(!p||activeEditorSession)return;
  if(p.accessMode==='immediate')p.period=p.accessUnlimited?'수강 기간 제한 없음':`결제일로부터 ${p.periodDays}일`;
  else {const dates=[...form.querySelectorAll('[data-access-mode="fixed"] input')].map(e=>e.value.replaceAll('-','.'));p.period=dates.join(' ~ ');}
};

// Rich-text tools work in the local editor, including media and expanded editing.
function enhanceDescriptionToolbar(){
  const toolbar=document.querySelector('.class-smart-toolbar');if(!toolbar||toolbar.dataset.enhanced)return;toolbar.dataset.enhanced='1';
  toolbar.querySelector('select')?.remove();
  toolbar.insertAdjacentHTML('afterbegin',`<button type="button" onclick="formatClassDescription('formatBlock','p')">본문</button><button type="button" onclick="formatClassDescription('formatBlock','h2')">제목 1</button><button type="button" onclick="formatClassDescription('formatBlock','h3')">제목 2</button>`);
  toolbar.insertAdjacentHTML('beforeend',`<button type="button" aria-label="취소선" onclick="formatClassDescription('strikeThrough')"><s>S</s></button><button type="button" onclick="insertDescriptionVideo()">동영상</button><button type="button" onclick="formatClassDescription('undo')">실행 취소</button><button type="button" onclick="formatClassDescription('redo')">다시 실행</button><button type="button" aria-label="편집 화면 확대" onclick="toggleDescriptionFullscreen()">⛶</button><input id="descriptionImages" type="file" multiple accept="image/*" hidden onchange="insertDescriptionImages(this)">`);
  toolbar.addEventListener('mousedown',event=>{if(event.target.closest('button'))event.preventDefault();});
}
const baseFormatDescription=formatClassDescription;
formatClassDescription=function(command,value=''){
  if(command==='insertImage'){document.getElementById('descriptionImages').click();return;}
  if(command==='createLink'){const url=prompt('연결할 URL을 입력해 주세요.');if(!url)return;if(!/^https?:\/\//i.test(url)){adminToast('http 또는 https 주소를 입력해 주세요');return;}document.getElementById('classDescriptionEditor').focus();document.execCommand('createLink',false,url);syncClassDescription(document.getElementById('classDescriptionEditor'));return;}
  baseFormatDescription(command,value);
};
async function insertDescriptionImages(input){const files=[...input.files].filter(f=>f.type.startsWith('image/'));try{const urls=await Promise.all(files.map(readImageFile));const editor=document.getElementById('classDescriptionEditor');editor.focus();document.execCommand('insertHTML',false,urls.map(url=>`<img src="${url}" alt="클래스 상세 이미지">`).join(''));syncClassDescription(editor);}catch{adminToast('이미지를 불러오지 못했습니다');}input.value='';}
function insertDescriptionVideo(){
  const value=prompt('YouTube 또는 Vimeo 동영상 주소를 입력해 주세요.');if(!value)return;
  let url;try{url=new URL(value);}catch{adminToast('올바른 동영상 주소를 입력해 주세요');return;}
  let src='';if(['www.youtube.com','youtube.com','youtu.be'].includes(url.hostname)){const id=url.hostname==='youtu.be'?url.pathname.slice(1):url.searchParams.get('v')||url.pathname.split('/').pop();if(/^[\w-]{11}$/.test(id||''))src=`https://www.youtube.com/embed/${id}`;}
  else if(['vimeo.com','www.vimeo.com'].includes(url.hostname)&&/^\/\d+$/.test(url.pathname))src=`https://player.vimeo.com/video${url.pathname}`;
  if(!src){adminToast('지원되는 YouTube 또는 Vimeo 주소를 입력해 주세요');return;}
  const editor=document.getElementById('classDescriptionEditor');editor.focus();document.execCommand('insertHTML',false,`<iframe src="${src}" title="클래스 소개 동영상" allowfullscreen></iframe><p><br></p>`);syncClassDescription(editor);
}
function toggleDescriptionFullscreen(){const editor=document.querySelector('.class-smart-editor');const open=editor.classList.toggle('expanded');document.body.classList.toggle('description-expanded',open);editor.querySelector('[aria-label^="편집 화면"]').setAttribute('aria-label',open?'편집 화면 축소':'편집 화면 확대');}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.querySelector('.class-smart-editor.expanded'))toggleDescriptionFullscreen();});

// Month picker, including empty months, matches the production sales flow.
let pickerYear=Number(salesSelectedMonth.slice(0,4));
function monthPickerMarkup(){return `<div class="month-picker"><button class="btn ghost" type="button" aria-label="조회 월" aria-expanded="false" onclick="toggleMonthPicker(this)">${salesSelectedMonth.replace('-','년 ')}월 ▾</button><div class="month-popover" id="monthPopover" hidden></div></div>`;}
function toggleMonthPicker(button){const popup=document.getElementById('monthPopover');popup.hidden=!popup.hidden;button.setAttribute('aria-expanded',String(!popup.hidden));renderMonthPicker();}
function renderMonthPicker(){document.getElementById('monthPopover').innerHTML=`<div class="month-year"><button type="button" aria-label="이전 연도" onclick="pickerYear--;renderMonthPicker()">‹</button><strong>${pickerYear}년</strong><button type="button" aria-label="다음 연도" onclick="pickerYear++;renderMonthPicker()">›</button></div><div class="month-grid">${Array.from({length:12},(_,i)=>`<button type="button" onclick="setSalesMonth('${pickerYear}-${String(i+1).padStart(2,'0')}')">${i+1}월</button>`).join('')}</div>`;}
const baseRenderSales=renderSales;
renderSales=function(){const data=currentSalesData();const header=pageHeader('Sales & payout','매출·정산','월별 결제와 환불·취소 금액을 확인합니다.',`${monthPickerMarkup()}<button class="btn ghost" onclick="openSettingsPanel('payout')">정산 계좌 관리</button>`);if(!data.rows.some(r=>r.count))return header+adminEmptyState('₩','선택한 기간에 결제 내역이 없습니다.','상품 결제 내역이 발생하면 월별 결제 금액이 이곳에 표시됩니다.');const html=baseRenderSales();return header+html.slice(html.indexOf('<section class="payout-hero">'));};
viewRenderers.sales=renderSales;

// Keep settings field data local, without copying production contact/bank data.
const baseSettingsMarkup=settingsPanelMarkup;
settingsPanelMarkup=function(panel){let html=baseSettingsMarkup(panel);html=html.replaceAll('<em class="settings-required">*</em>','').replace('<em>전체 필수</em>',panel==='payout'?'<em>입력 필요</em>':'').replace('정산 정보 미입력 시 정산이 늦어질 수 있습니다.','정산 정보 미등록 시 정산이 진행되지 않습니다.').replace('모든 항목을 입력해야 저장할 수 있으며, 저장한 정보는','저장한 정보는').replace('<select required><option>부동산·경매</option></select>','<input required value="부동산·경매">').replace('<option>국민은행</option>','<option>KB국민은행</option><option>신한은행</option><option>우리은행</option><option>하나은행</option><option>NH농협은행</option><option>카카오뱅크</option><option>토스뱅크</option>');
  if(panel==='payout')html=html.replace('value="123-456-789012"','value=""').replace('<strong>7월 10일</strong>',`<strong>${Number(adminToday().slice(5,7))}월 10일</strong>`).replace('예정 금액 ₩15,936,000','예정 금액 ₩0');
  else html=html.replace('<button type="button">이미지 변경</button>',`<button type="button" onclick="document.getElementById('profileImageInput').click()">이미지 변경</button><input id="profileImageInput" type="file" accept="image/*" hidden onchange="previewChannelImage(this)">`);
  return html;};
async function previewChannelImage(input){const file=input.files[0];if(!file||!file.type.startsWith('image/'))return;const url=await readImageFile(file),avatar=input.closest('.settings-avatar');avatar.querySelector('svg,img')?.remove();avatar.insertAdjacentHTML('afterbegin',`<img src="${url}" alt="프로필 이미지" width="72" height="72">`);input.closest('form').dataset.profileImage='1';}
// Re-render after installing the UI adapters, including direct editor links.
openAdminHash(location.hash,true);

// Preview the current draft rather than an unrelated sample class.
openClassPreview=function(classId=''){
  const form=document.querySelector('.product-editor'),frame=document.getElementById('classPreviewFrame');
  if(form){
    const title=form.elements.className.value||'새 클래스',lead=form.elements.classLead.value;
    const price=Number(form.elements.discountPrice.value||form.elements.originalPrice.value)||0;
    const description=document.getElementById('classDescriptionEditor').cloneNode(true);
    description.querySelectorAll('script,style,iframe,object,embed,input,button,form').forEach(e=>e.remove());
    description.querySelectorAll('*').forEach(e=>[...e.attributes].forEach(a=>{if(!['src','href','alt'].includes(a.name)||(/^(src|href)$/.test(a.name)&&! /^(https?:|data:image\/|\.\/|\/)/i.test(a.value)))e.removeAttribute(a.name);}));
    frame.srcdoc=`<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>body{margin:0;color:#252331;background:#faf9fc;font-family:system-ui,sans-serif}header{padding:20px 6%;border-bottom:1px solid #eee;background:white;font-weight:800}main{max-width:1000px;margin:40px auto;padding:0 24px}.hero{display:grid;grid-template-columns:1fr 1fr;gap:32px}.cover{width:100%;border-radius:16px}h1{font-size:30px;line-height:1.4}p{line-height:1.8;color:#656271}.price{font-size:28px;font-weight:800;color:#6553da}article{background:white;border:1px solid #eee;padding:28px;border-radius:16px;margin-top:32px;line-height:1.8}article img{max-width:100%}@media(max-width:640px){.hero{grid-template-columns:1fr}}</style><header>노하우집 · 클래스 미리보기</header><main><div class="hero"><div>${form._classImages?.[0]?`<img class="cover" alt="대표 이미지" src="${escapeAdminText(form._classImages[0])}">`:''}</div><div><h1>${escapeAdminText(title)}</h1><p>${escapeAdminText(lead)}</p><div class="price">${won(price)}</div><p>작성 중인 클래스의 미리보기입니다.</p></div></div><article><h2>클래스 소개</h2>${description.innerHTML}</article></main></html>`;
  }else{frame.removeAttribute('srcdoc');frame.src='./index.html?policy=1#/p/'+encodeURIComponent(classId);}
  document.getElementById('classPreviewModal').classList.add('show');document.body.classList.add('preview-open');
};
