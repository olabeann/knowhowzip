"use strict";
// Local prototype: shared content/sale records, separate type-specific editors.
const typeStoreKey='nhz-content-types-v1';
const typeEscape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const typeOf=item=>item?.type==='ebook'?'ebook':'video';
const typeName=type=>type==='ebook'?'전자책':'영상';
let contentTypeFilter='all',saleTypeFilter='all';
let typeStorageWarning='';
try {
  const saved=JSON.parse(localStorage.getItem(typeStoreKey)||'null');
  if(saved&&Array.isArray(saved.contents)&&Array.isArray(saved.sales)){
    lectureContents.splice(0,lectureContents.length,...saved.contents);
    saleProducts.splice(0,saleProducts.length,...saved.sales);
  } else {
    lectureContents.push({id:'ebook-demo',type:'ebook',title:'경매 입문 가이드',intro:'처음 시작하는 경매, 한 권으로. 전자책 뷰어용 샘플 콘텐츠입니다.',fileName:'knowhowzip-reading-sample.pdf',pageCount:6,outline:'표지 · 처음 시작하는 경매 | 1\n이 책을 읽는 방법 | 2\n나만의 학습 지도 만들기 | 3\n기록을 남기는 세 가지 질문 | 4\n배운 내용을 내 것으로 | 5\n다음 학습을 준비하며 | 6',content:{videos:[],files:[]},sample:true});
    saleProducts.push({id:'sale-ebook-demo',type:'ebook',name:'처음 시작하는 경매, 한 권으로',desc:'경매 입문 가이드 전자책 · 판매 구성 예시',contentIds:['ebook-demo'],price:19000,originalPrice:19000,status:'비공개',period:'결제일로부터 365일',periodDays:365,accessMode:'immediate',recruitmentAlways:true,paymentCount:0,requirement:'조건 없음',courses:[],tags:['전자책'],operation:{},faq:[]});
  }
} catch {typeStorageWarning='브라우저 저장 데이터를 불러오지 못했습니다. 기본 예시를 표시합니다.';}
function persistTypeData(){
  try{localStorage.setItem(typeStoreKey,JSON.stringify({contents:lectureContents,sales:saleProducts}));return true;}
  catch{adminToast('브라우저 저장 공간이 부족합니다. 현재 탭에만 반영되었습니다.');return false;}
}
function typeBadge(type){return `<span class="type-badge ${type}">${typeName(type)}</span>`;}
function typeTabs(kind,items){const active=kind==='content'?contentTypeFilter:saleTypeFilter;return `<div class="type-tabs" aria-label="유형 필터">${[['all','전체'],['video','영상'],['ebook','전자책']].map(([type,label])=>`<button aria-pressed="${active===type}" class="${active===type?'active':''}" onclick="setTypeFilter('${kind}','${type}')">${label}<small>${items.filter(item=>type==='all'||typeOf(item)===type).length}</small></button>`).join('')}</div>`;}
function setTypeFilter(kind,type){if(kind==='content')contentTypeFilter=type;else saleTypeFilter=type;showAdminView(kind==='content'?'classes':'products');}
function renderManagedProducts(){
  const rows=emptyPreviewRows(saleProducts);
  return pageHeader('Class management','클래스 관리','영상 강의와 전자책의 소개, 기간, 가격과 공개 상태를 관리합니다.',`<button class="btn primary" onclick="openProductEditor('create')">+ 새 클래스 등록</button>`)+`<div class="product-admin-grid managed-products">${rows.map(product=>{
    const ebook=typeOf(product)==='ebook',id=typeEscape(product.id),arg=typeEscape(JSON.stringify(product.id)),menuArg=typeEscape(JSON.stringify('sale-'+product.id)),title=typeEscape(product.name),state=managedClassSalesState(product),contents=linkedContentItems(product);
    const stateLabel=!ebook&&state.className==='selling'&&!product.recruitmentAlways?'모집중':state.label;
    return `<article class="sale-product-card" role="button" tabindex="0" aria-label="${title} 관리" onclick="openProductEditor('edit',${arg})" onkeydown="if(event.target===this&&(event.key==='Enter'||event.key===' ')){event.preventDefault();openProductEditor('edit',${arg})}"><div class="sale-product-top"><span>${ebook?'전자책':'영상'}</span><div class="sale-product-state"><em class="visibility ${product.status==='공개'?'open':'private'}">${typeEscape(product.status)}</em><em class="sales ${state.className}">${stateLabel}</em><div class="class-card-menu"><button type="button" aria-label="${title} 메뉴" onclick="toggleClassMenu(event,${menuArg})">&#8942;</button><div class="class-card-menu-pop" id="class-menu-sale-${id}" onclick="event.stopPropagation()"><button type="button" onclick="openProductEditor('edit',${arg})">수정</button><button type="button" onclick="duplicateManagedClass(${arg})">복제</button><button type="button" class="danger" onclick="deleteManagedClass(${arg})">삭제</button></div></div></div></div><h2>${title}</h2><p>${typeEscape(product.desc||'')}</p><div class="product-card-price"><strong>${won(product.price)}</strong><small>${ebook?'이용':'수강'} 기간 · ${typeEscape(product.period||'미설정')}</small><small>${ebook?'판매':'모집'} 기간 · ${ebook&&product.recruitmentAlways?'상시 판매':typeEscape(managedRecruitmentPeriod(product))}</small></div><div class="product-card-summary"><div><b>${ebook?'제공 방식':'수강 조건'}</b><span>${ebook?'온라인 뷰어':typeEscape(product.requirement||'조건 없음')}</span></div><div><b>${ebook?'전자책':'강의 콘텐츠'}</b><span>${contents.map(item=>typeEscape(item.title)).join(' · ')||'미연결'}</span></div></div></article>`;
  }).join('')}</div>${rows.length?'':adminEmptyState('▣','등록된 클래스가 없습니다.','콘텐츠를 연결해 판매할 클래스를 등록하세요.','클래스 등록',"showTypeChooser('sale')")}`;
}
function renderLectureContentCards(){
  const all=emptyPreviewRows(lectureContents);
  const rows=all.filter(item=>contentTypeFilter==='all'||typeOf(item)===contentTypeFilter);
  return pageHeader('Lecture content','강의 콘텐츠','영상 강의와 전자책을 등록하고 관리하세요.',`<button class="btn primary" onclick="showTypeChooser('content')">+ 새 콘텐츠</button>`)+`<div class="library-toolbar">${typeTabs('content',all)}</div><div class="lecture-library">${rows.map(item=>{
    const id=typeEscape(item.id),arg=typeEscape(JSON.stringify(item.id)),title=typeEscape(item.title),ebook=typeOf(item)==='ebook';
    const linked=linkedClassCount(item.id);
    const stats=ebook?[[item.pageCount||0,'페이지'],[linked,'연결 판매']]:[[item.content?.videos?.length||0,'영상'],[item.content?.files?.length||0,'자료'],[linked,'연결 판매']];
    return `<article class="lecture-library-card"><div class="library-card-type">${typeBadge(ebook?'ebook':'video')}</div><button type="button" class="lecture-card-open" aria-label="${title} 관리" onclick="openClassEditor('edit',${arg})"><h2>${title}</h2><p>${typeEscape(item.intro||'')}</p><span class="lecture-card-stats">${stats.map(([count,label])=>`<span><b>${count}</b><small>${label}</small></span>`).join('')}</span></button><div class="class-card-menu"><button type="button" aria-label="${title} 메뉴" onclick="toggleClassMenu(event,${arg})">&#8942;</button><div class="class-card-menu-pop" id="class-menu-${id}" onclick="event.stopPropagation()"><button type="button" onclick="openClassEditor('edit',${arg})">수정</button>${ebook?`<a href="ebook-reader.html?book=${encodeURIComponent(item.id)}" target="_blank" rel="noopener">뷰어 미리보기 ↗</a>`:''}<button type="button" class="danger" onclick="deleteLectureContent(${arg})">삭제</button></div></div></article>`;
  }).join('')}</div>${rows.length?'':adminEmptyState('▶','등록된 콘텐츠가 없습니다.','영상 강의나 전자책을 등록해 보세요.','콘텐츠 등록',"showTypeChooser('content')")}${typeStorageWarning?`<p class="type-error">${typeEscape(typeStorageWarning)}</p>`:''}`;
}
renderClasses=renderLectureContentCards;renderProducts=renderManagedProducts;
viewRenderers.classes=renderClasses;viewRenderers.products=renderProducts;
function setTypeScreen(html,hash,view,skip=false){return runAdminNavigation(()=>{currentAdminView=view;document.querySelectorAll('.admin-nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===view));document.getElementById('adminContent').innerHTML=html;history.replaceState(null,'',hash);window.scrollTo({top:0});const form=document.querySelector('.type-form');if(form)beginEditorSession(form,'전자책');},skip);}
function showTypeChooser(kind,skip=false){
  const title=kind==='content'?'어떤 콘텐츠를 만들까요?':'어떤 콘텐츠를 판매할까요?';
  setTypeScreen(pageHeader('Choose a type',title,'크리에이터 계정은 하나로 유지하고, 등록할 때 유형을 선택하세요.',`<button class="btn ghost" onclick="showAdminView('${kind==='content'?'classes':'products'}')">목록으로</button>`)+`<div class="type-choice"><button onclick="chooseContentType('${kind}','video')"><span class="symbol">▷</span>${typeBadge('video')}<h2>영상으로 전하는 노하우</h2><p>영상 강의와 커리큘럼을 구성하고<br>학습에 필요한 자료를 함께 제공하세요.</p><small>영상으로 시작하기</small></button><button onclick="chooseContentType('${kind}','ebook')"><span class="symbol">▤</span>${typeBadge('ebook')}<h2>한 권에 담는 노하우</h2><p>PDF 전자책과 목차를 등록하고<br>온라인 뷰어로 읽는 경험을 제공하세요.</p><small>전자책으로 시작하기</small></button></div>`,kind==='content'?'#content-type':'#sale-type',kind==='content'?'classes':'products',skip);
}
const typeBaseClassEditor=openClassEditor,typeBaseProductEditor=openProductEditor,typeBaseRouter=openAdminHash;
function chooseContentType(kind,type){if(type==='ebook')kind==='content'?openEbookEditor():openEbookSaleEditor();else kind==='content'?openVideoContent('create'):openVideoSale('create');}
function videoBanner(form){form?.insertAdjacentHTML('afterbegin',`<div class="type-editor-banner">${typeBadge('video')}<span>영상 강의 · 커리큘럼과 첨부 자료</span></div>`);}
function openVideoContent(mode,id='',skip=false){typeBaseClassEditor(mode,id,skip);}
function openVideoSale(mode,id='',skip=false){typeBaseProductEditor(mode,id,skip);const form=document.querySelector('.product-editor');if(form&&!form.querySelector('.type-editor-banner')){videoBanner(form);beginEditorSession(form,'영상 판매');}}
openClassEditor=function(mode,id='',skip=false){if(mode==='create')return showTypeChooser('content',skip);if(typeOf(lectureContents.find(c=>c.id===id))==='ebook')return openEbookEditor(id,skip);return openVideoContent(mode,id,skip);};
openProductEditor=function(mode='create',id='',skip=false){
  typeBaseProductEditor(mode,id,skip);
  const form=document.querySelector('.product-editor');
  if(form){updateSelectedViewer(form);beginEditorSession(form,'클래스');}
};
const typeBaseClassChoice=classChoiceList;
classChoiceList=function(product,lock){
  const holder=document.createElement('div');holder.innerHTML=typeBaseClassChoice(product,lock);
  holder.querySelectorAll('input[name="linkedContents[]"]').forEach(input=>{
    const item=lectureContents.find(c=>c.id===input.value),row=input.closest('label'),ebook=typeOf(item)==='ebook';
    row.querySelector('span>b').insertAdjacentHTML('beforeend',` ${typeBadge(ebook?'ebook':'video')}`);
    if(ebook)row.dataset.contentType='ebook';
    if(ebook)row.querySelector('span>small').textContent=`PDF · ${item.pageCount||0}페이지 · ${linkedClassCount(item.id)}개 클래스에서 사용`;
  });
  return holder.innerHTML;
};
function selectedClassType(ids){
  const items=ids.map(id=>lectureContents.find(c=>c.id===id));
  if(!items.length||items.some(item=>!item))throw new Error('연결할 콘텐츠를 선택해 주세요.');
  const type=typeOf(items[0]);
  if(items.some(item=>typeOf(item)!==type))throw new Error('영상과 전자책은 함께 연결할 수 없습니다. 기존 선택을 해제한 뒤 선택해 주세요.');
  return type;
}
function updateSelectedViewer(form){
  let hint=form.querySelector('.selected-viewer');
  if(!hint){hint=document.createElement('p');hint.className='selected-viewer';hint.setAttribute('role','status');form.querySelector('.included-lecture-list').after(hint);}
  const ids=[...form.querySelectorAll('input[name="linkedContents[]"]:checked')].map(input=>input.value);
  try{const type=selectedClassType(ids);hint.textContent=type==='ebook'?'전자책 뷰어로 제공됩니다.':'영상 플레이어로 제공됩니다.';}catch(error){hint.textContent=ids.length?error.message:'콘텐츠를 선택하면 제공 방식이 자동으로 정해집니다.';}
}
const typeBaseToggleChoice=toggleProductClassChoice;
toggleProductClassChoice=function(input){
  if(input.checked){try{selectedClassType([...input.form.querySelectorAll('input[name="linkedContents[]"]:checked')].map(item=>item.value));}catch(error){input.checked=false;adminToast(error.message);}}
  typeBaseToggleChoice(input);updateSelectedViewer(input.form);
};
const typeBaseSaveClass=saveClassForm;
saveClassForm=function(event,mode){typeBaseSaveClass(event,mode);if(!activeEditorSession)persistTypeData();};
const typeBaseSaveProduct=saveProductForm;
saveProductForm=function(event,mode){
  const form=event.currentTarget;let type;
  try{type=selectedClassType([...form.querySelectorAll('input[name="linkedContents[]"]:checked')].map(input=>input.value));}
  catch(error){event.preventDefault();adminToast(error.message);showProductEditorStep(1,true);return;}
  typeBaseSaveProduct(event,mode);
  if(!activeEditorSession){
    const product=saleProducts.find(item=>item.id===form.dataset.productId)||(mode==='create'?saleProducts[0]:null);
    if(product){product.type=type;product.viewerType=type;product.bookId=type==='ebook'?product.contentIds[0]:null;product.bookIds=type==='ebook'?[...product.contentIds]:[];}
    persistTypeData();
  }
};
for(const name of ['confirmLectureContentDelete','confirmManagedClassDelete','duplicateManagedClass']){const original=window[name];window[name]=function(...args){original(...args);persistTypeData();};}
function ebookHeading(title,back){return `<div class="editor-head"><button type="button" class="editor-back" onclick="showAdminView('${back}')">목록으로</button><div><span>E-BOOK</span><h1>${title}</h1><p>영상 없이, 한 권의 책으로 노하우를 전하세요.</p></div></div>`;}
function renderEbookOutlineRow(title='',page='',locked=false,index=0,total=1){
  return `<div class="ebook-outline-row"><span class="ebook-outline-number">${index+1}</span><label>목차 제목<input data-outline-title name="outlineTitle[]" value="${typeEscape(title)}" placeholder="예: 들어가며" ${locked?'readonly':''}></label><label>시작 페이지<input data-outline-page name="outlinePage[]" type="number" min="1" step="1" inputmode="numeric" value="${typeEscape(page)}" ${locked?'readonly':''}></label>${locked?'':`<div class="ebook-outline-actions"><button type="button" data-outline-up aria-label="${index+1}번 목차 위로 이동" onclick="changeEbookOutline(this,'up')" ${index===0?'disabled':''}>↑</button><button type="button" data-outline-down aria-label="${index+1}번 목차 아래로 이동" onclick="changeEbookOutline(this,'down')" ${index===total-1?'disabled':''}>↓</button><button type="button" data-outline-remove aria-label="${index+1}번 목차 삭제" onclick="changeEbookOutline(this,'remove')">삭제</button></div>`}</div>`;
}
function renderEbookOutline(value,locked){
  const rows=value.split('\n').filter(line=>line.trim()).map(line=>{const split=line.lastIndexOf('|');return split<0?[line,'']:[line.slice(0,split).trim(),line.slice(split+1).trim()];});
  if(!rows.length&&!locked)rows.push(['','']);
  return `<section class="ebook-outline" aria-labelledby="ebookOutlineHeading"><div class="ebook-outline-heading"><h3 id="ebookOutlineHeading">목차 <span data-outline-count>${rows.length}개</span></h3>${locked?'':'<button type="button" class="btn ghost" data-outline-add onclick="addEbookOutline(this)">+ 목차 추가</button>'}</div><p class="ebook-outline-help">${locked?'목차 제목과 시작 페이지를 확인하세요.':'제목과 시작 페이지를 입력하세요. 화살표로 순서를 바꿀 수 있습니다.'}<br>시작 페이지는 PDF 파일의 페이지 순서 기준입니다.</p><div class="ebook-outline-list">${rows.map(([title,page],index)=>renderEbookOutlineRow(title,page,locked,index,rows.length)).join('')}</div><p class="ebook-outline-empty" ${rows.length?'hidden':''}>등록된 목차가 없습니다.</p></section>`;
}
function refreshEbookOutline(editor){
  const rows=[...editor.querySelectorAll('.ebook-outline-row')];
  editor.querySelector('[data-outline-count]').textContent=`${rows.length}개`;
  editor.querySelector('.ebook-outline-empty').hidden=!!rows.length;
  rows.forEach((row,index)=>{
    row.querySelector('.ebook-outline-number').textContent=index+1;
    for(const [action,label] of [['up','위로 이동'],['down','아래로 이동'],['remove','삭제']]){
      const button=row.querySelector(`[data-outline-${action}]`);
      button.setAttribute('aria-label',`${index+1}번 목차 ${label}`);
      button.disabled=action==='up'?index===0:action==='down'?index===rows.length-1:false;
    }
  });
}
function addEbookOutline(button){
  const editor=button.closest('.ebook-outline'),list=editor.querySelector('.ebook-outline-list');
  list.insertAdjacentHTML('beforeend',renderEbookOutlineRow());
  refreshEbookOutline(editor);list.lastElementChild.querySelector('input').focus();
}
function changeEbookOutline(button,action){
  const row=button.closest('.ebook-outline-row'),editor=row.closest('.ebook-outline'),list=row.parentElement;
  if(action==='up'&&row.previousElementSibling)list.insertBefore(row,row.previousElementSibling);
  if(action==='down'&&row.nextElementSibling)list.insertBefore(row.nextElementSibling,row);
  if(action==='remove'){
    const next=row.nextElementSibling||row.previousElementSibling;
    row.remove();(next?.querySelector('input')||editor.querySelector('[data-outline-add]')).focus();
  }
  refreshEbookOutline(editor);
  if(action!=='remove')row.querySelector('input').focus();
}
function readEbookOutline(form,pages){
  const toc=[];
  for(const [index,row] of [...form.querySelectorAll('.ebook-outline-row')].entries()){
    const titleInput=row.querySelector('[data-outline-title]'),pageInput=row.querySelector('[data-outline-page]');
    const title=titleInput.value.trim(),rawPage=pageInput.value.trim(),page=Number(rawPage);
    if(!title&&!rawPage)continue;
    if(!title||title.includes('|')){showClassEditorStep(1,true);titleInput.focus();throw new Error(`${index+1}번 목차의 제목을 입력해 주세요. 제목에는 | 기호를 사용할 수 없습니다.`);}
    if(!Number.isInteger(page)||page<1||page>pages){showClassEditorStep(1,true);pageInput.focus();throw new Error(`${index+1}번 목차의 시작 페이지를 1~${pages} 사이의 정수로 입력해 주세요.`);}
    toc.push({title,page});
  }
  return toc;
}
function openEbookEditor(id='',skip=false){
  const item=lectureContents.find(c=>c.id===id)||{},locked=id&&linkedClassCount(id)>0;
  const saveButton=locked?'':'<button type="submit" class="btn primary" data-ebook-save>콘텐츠 저장</button>';
  setTypeScreen(`<form class="type-form class-editor ebook-content-editor" data-id="${typeEscape(id)}" data-active-class-step="0" novalidate onsubmit="saveEbookContent(event)">
    <div class="editor-head"><button type="button" class="editor-back" onclick="showAdminView('classes')">← 강의 콘텐츠</button><div><span>Lecture content editing</span><h1>${id?'전자책 콘텐츠 관리':'새 전자책 콘텐츠'}</h1><p>PDF와 목차를 관리합니다. 저장한 콘텐츠는 클래스 관리에서 판매에 연결할 수 있습니다.</p></div><div class="editor-actions">${saveButton}</div></div>
    ${locked?'<div class="type-note">판매에 연결된 원본은 조회만 가능합니다. 개정판은 새 콘텐츠로 등록해 주세요.</div>':''}
    <div class="editor-layout"><nav class="editor-steps class-editor-steps" aria-label="전자책 콘텐츠 등록 단계"><button type="button" class="active" data-class-step="0" data-step-title="기본 정보" aria-current="step" aria-controls="ebook-info" onclick="showClassEditorStep(0)"><i>1</i><span>기본 정보<small>제목·설명</small></span></button><button type="button" data-class-step="1" data-step-title="PDF·목차" aria-controls="ebook-file" onclick="showClassEditorStep(1)"><i>2</i><span>PDF·목차<small>파일·페이지 설정</small></span></button></nav>
    <div class="editor-sections">
      <section class="panel editor-section class-step-panel active" id="ebook-info"><div class="editor-section-head"><i>1</i><div><h2>전자책 콘텐츠 정보</h2><p>관리자에서 콘텐츠를 구분할 제목과 설명을 입력합니다.</p></div><span>${locked?'읽기 전용':'제목 필수'}</span></div><div class="editor-fields"><label class="wide">콘텐츠 제목 <em>*</em><input name="title" maxlength="80" required value="${typeEscape(item.title||'')}" ${locked?'readonly':''} placeholder="예: 경매 입문 가이드"><small>수강생 판매 화면에는 클래스명이 표시되며, 이 제목은 관리자용입니다.</small></label><label class="wide">콘텐츠 설명<textarea name="description" ${locked?'readonly':''} placeholder="책의 구성과 학습 목표를 적어주세요.">${typeEscape(item.intro||'')}</textarea></label></div></section>
      <section class="panel editor-section class-step-panel" id="ebook-file" hidden><div class="editor-section-head"><i>2</i><div><h2>PDF·목차</h2><p>전자책 파일을 등록하고 목차의 시작 페이지를 설정합니다.</p></div><span>${locked?'읽기 전용':'PDF 필수 · 목차 선택'}</span></div><div class="content-editor-block"><div class="content-editor-title"><div><h3>전자책 파일</h3><p>PDF 1개를 등록하세요. 페이지 수는 자동으로 확인합니다.</p></div>${id?`<a class="type-link" href="ebook-reader.html?book=${encodeURIComponent(id)}" target="_blank" rel="noopener">저장된 전자책 보기</a>`:''}</div><div class="type-fields">${locked?'':`<label class="pdf-upload">PDF 선택 *<input name="pdfFile" type="file" accept="application/pdf,.pdf" onchange="inspectEbookFile(this)"><small>PDF · 최대 50MB (미리보기 기준)</small></label>`}<div class="type-file-info" id="ebookFileInfo">${item.fileName?`${typeEscape(item.fileName)} · ${item.pageCount}페이지`:'선택한 파일이 없습니다.'}</div></div></div><div class="content-editor-block type-fields">${renderEbookOutline(item.outline||'',locked)}</div></section>
      <div class="editor-step-actions"><button type="button" class="btn ghost" id="classStepPrevious" onclick="goClassEditorStep(-1)" disabled>← 이전 단계</button><span id="classStepCurrent">1 / 2 · 기본 정보</span><button type="button" class="btn primary" id="classStepNext" onclick="goClassEditorStep(1)">다음 단계 →</button></div>
    </div></div><p class="type-error" id="ebookError" role="alert"></p>
    <div class="editor-bottom-bar"><span><b>전자책 콘텐츠</b><small>PDF와 목차를 확인한 뒤 저장해 주세요.</small></span><div><button type="button" class="btn ghost" onclick="showAdminView('classes')">${locked?'목록으로':'취소'}</button>${saveButton}</div></div>
  </form>`,id?`#ebook-edit-${id}`:'#ebook-new','classes',skip);
}
async function inspectEbookFile(input){
  const form=input.form,file=input.files[0];form._pdf=null;form._pdfFile=null;form._reading=!!file;const token=Symbol();form._fileToken=token;$('ebookError').textContent='';
  if(!file){form._reading=false;$('ebookFileInfo').textContent='선택한 파일이 없습니다.';return;}
  $('ebookFileInfo').textContent='PDF를 확인하고 있어요…';
  try{
    if(!/\.pdf$/i.test(file.name)||file.size>50*1024*1024||!file.size)throw new Error('50MB 이하의 PDF 파일을 선택해 주세요.');
    const lib=await import('./../vendor/pdfjs/pdf.mjs');lib.GlobalWorkerOptions.workerSrc=new URL('./js/../vendor/pdfjs/pdf.worker.mjs',location.href).href;
    const doc=await lib.getDocument({data:await file.arrayBuffer(),isEvalSupported:false}).promise;
    const count=doc.numPages;await doc.destroy();if(form._fileToken!==token)return;
    form._pdf={fileName:file.name,pageCount:count};form._pdfFile=file;$('ebookFileInfo').textContent=`${file.name} · ${count}페이지 · ${(file.size/1024/1024).toFixed(1)}MB`;
  }catch(error){if(form._fileToken!==token)return;input.value='';$('ebookFileInfo').textContent='파일을 다시 선택해 주세요.';$('ebookError').textContent=error.name==='PasswordException'?'암호가 설정되지 않은 PDF를 선택해 주세요.':error.message||'올바른 PDF 파일을 선택해 주세요.';}
  finally{if(form._fileToken===token)form._reading=false;}
}
function $(id){return document.getElementById(id);}
async function saveEbookContent(event){
  event.preventDefault();const form=event.currentTarget,old=lectureContents.find(c=>c.id===form.dataset.id);if(form._saving||(old&&linkedClassCount(old.id)>0))return;
  const invalid=form.querySelector(':invalid');if(invalid){showClassEditorStep(invalid.closest('#ebook-file')?1:0,true);invalid.focus();invalid.reportValidity();return;}
  const error=$('ebookError');error.textContent='';const title=form.elements.title.value.trim();if(!title){showClassEditorStep(0,true);form.elements.title.focus();error.textContent='콘텐츠 제목을 입력해 주세요.';return;}
  if(form._reading){showClassEditorStep(1,true);error.textContent='PDF 확인이 끝난 뒤 저장해 주세요.';return;}
  const fileInfo=form._pdf||old;if(!fileInfo?.pageCount){showClassEditorStep(1,true);error.textContent='전자책 PDF를 선택해 주세요.';return;}
  try{
    const toc=readEbookOutline(form,fileInfo.pageCount);
    const item={...old,...fileInfo,id:old?.id||`ebook-${crypto.randomUUID()}`,type:'ebook',title,intro:form.elements.description.value.trim(),outline:toc.map(entry=>`${entry.title} | ${entry.page}`).join('\n'),content:{videos:[],files:[]},sample:form._pdfFile?false:!!old?.sample};
    form._saving=true;form.querySelectorAll('[data-ebook-save]').forEach(button=>button.disabled=true);
    if(!item.sample){const storage=await import('./ebook-storage.mjs');const existing=form._pdfFile?null:await storage.loadBook(item.id);const file=form._pdfFile||existing?.file;if(!file)throw new Error('저장된 파일을 찾을 수 없습니다. PDF를 다시 선택해 주세요.');await storage.saveBook({id:item.id,title:item.title,file,toc});}
    if(old)Object.assign(old,item);else lectureContents.unshift(item);
    const persisted=persistTypeData();clearEditorSession();contentTypeFilter='ebook';showAdminView('classes',true);if(persisted)adminToast('전자책 콘텐츠를 이 브라우저에 저장했습니다.');
  }catch(err){error.textContent=err.message||'파일 저장에 실패했습니다. 저장 공간을 확인해 주세요.';showClassEditorStep(1,true);form._saving=false;form.querySelectorAll('[data-ebook-save]').forEach(button=>button.disabled=false);}
}
function openEbookSaleEditor(id='',skip=false){return openProductEditor(id?'edit':'create',id,skip);}
openAdminHash=function(hash,skip=true){
  if(hash==='#content-type')return showTypeChooser('content',skip);
  if(hash==='#sale-type')return showTypeChooser('sale',skip);
  if(hash==='#ebook-new')return openEbookEditor('',skip);
  if(hash.startsWith('#ebook-edit-'))return openEbookEditor(hash.slice(12),skip);
  if(hash==='#ebook-sale-new')return openProductEditor('create','',skip);
  if(hash.startsWith('#ebook-sale-edit-'))return openProductEditor('edit',hash.slice(17),skip);
  if(hash==='#class-new')return openVideoContent('create','',skip);
  if(hash==='#product-new')return openProductEditor('create','',skip);
  return typeBaseRouter(hash,skip);
};
document.querySelectorAll('.admin-nav button').forEach(button=>{const label={classes:'강의 콘텐츠',products:'클래스 관리',students:'수강생 관리'}[button.dataset.view];if(label){button.querySelector('span').textContent=label;button.title=label;button.setAttribute('aria-label',label);}});
openAdminHash(initialView?'#'+initialView:location.hash,true);
