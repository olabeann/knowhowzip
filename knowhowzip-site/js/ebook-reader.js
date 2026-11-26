import { getDocument, GlobalWorkerOptions, TextLayer } from '../vendor/pdfjs/pdf.mjs';
import { renderInternalLinks } from './ebook-links.mjs';
import { installPageSwipe, pageKeyDirection } from './ebook-navigation.mjs?v=20261126-touch-fix';
GlobalWorkerOptions.workerSrc = new URL('../vendor/pdfjs/pdf.worker.mjs', import.meta.url).href;
const $ = id => document.getElementById(id);
let chapters = ['표지 · 처음 시작하는 경매','이 책을 읽는 방법','나만의 학습 지도 만들기','기록을 남기는 세 가지 질문','배운 내용을 내 것으로','다음 학습을 준비하며'];
const bookId = new URLSearchParams(location.search).get('book') || 'ebook-demo';
let outlinePages = [1,2,3,4,5,6];
const escapeText = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const key = `knowhowzip:${bookId}:v1`;
let saved = {};
try { saved = JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch {}
let pageNumber = Number.isInteger(saved.page) ? Math.max(1, Math.min(100000, saved.page)) : 1;
let pdf, zoom = 1, generation = 0, task, textTask;
function canSwipePages() {
  return !!pdf && (document.body.classList.contains('reading-focus') || zoom <= 1)
    && (window.visualViewport?.scale || 1) <= 1.01;
}
installPageSwipe($('paperStage'), { enabled: canSwipePages, navigate: direction => go(pageNumber + direction) });
function persist() {
  try { localStorage.setItem(key, JSON.stringify({ page: pageNumber })); $('saveStatus').textContent = `${pageNumber}페이지까지 읽었어요 · 이 브라우저에서 이어서 읽기`; }
  catch { $('saveStatus').textContent = '이 브라우저에서는 읽던 위치를 저장할 수 없어요'; }
}
function chapterButton(n, title = chapters[outlinePages.indexOf(n)] || `${n}페이지`) {
  const button = document.createElement('button');
  button.className = `chapter${n === pageNumber ? ' active' : ''}`;
  if(n === pageNumber) button.setAttribute('aria-current', 'page');
  button.innerHTML = `<span class="chapter-number">${n === 1 ? '▤' : String(n - 1).padStart(2, '0')}</span><span><b>${escapeText(title)}</b>${n === pageNumber ? '<small>지금 읽고 있어요</small>' : ''}</span><span class="page">${n}</span>`;
  button.disabled = !pdf;
  button.addEventListener('click', () => { go(n); $('bookSidebar').classList.remove('open'); $('mobileContents').setAttribute('aria-expanded', 'false'); });
  return button;
}
function updateNavigation() {
  $('chapterList').replaceChildren(...chapters.map((title, i) => chapterButton(outlinePages[i], title)));
  $('pageNumber').value = pageNumber;
  $('previous').disabled = !pdf || pageNumber === 1;
  $('next').disabled = !pdf || pageNumber === pdf.numPages;
  $('focusPrevious').disabled=$('previous').disabled;$('focusNext').disabled=$('next').disabled;
  $('focusPage').textContent=pdf?`${pageNumber} / ${pdf.numPages}`:'';
}
async function render() {
  if (!pdf) return;
  const current = ++generation;
  $('paperStage').classList.toggle('page-swipe-enabled', canSwipePages());
  task?.cancel(); textTask?.cancel();
  $('linkLayer').replaceChildren();
  try {
    const page = await pdf.getPage(pageNumber);
    if(current !== generation) return;
    const stage = $('paperStage');
    const base = page.getViewport({ scale: 1 });
    const available = stage.clientWidth - (document.body.classList.contains('reading-focus')?32:innerWidth <= 800 ? 24 : innerWidth > 1500 ? 160 : innerWidth <= 900 ? 36 : 72);
    const scale = document.body.classList.contains('reading-focus')?Math.min(available/base.width,(stage.clientHeight-32)/base.height):Math.min(available,760)/base.width*zoom;
    const viewport = page.getViewport({ scale });
    const canvas = $('pdfCanvas');
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.floor(viewport.width * ratio); canvas.height = Math.floor(viewport.height * ratio);
    canvas.style.width = `${viewport.width}px`; canvas.style.height = `${viewport.height}px`;
    canvas.setAttribute('aria-label', `${pageNumber}페이지: ${chapters[outlinePages.indexOf(pageNumber)] || "전자책"}`);
    $('paper').hidden = false;
    $('loadMessage').hidden = true;
    $('textLayer').replaceChildren();
    $('textLayer').style.setProperty('--scale-factor', scale);
    task = page.render({ canvasContext: canvas.getContext('2d'), viewport, transform: [ratio,0,0,ratio,0,0] });
    await task.promise;
    if(current !== generation) return;
    textTask = new TextLayer({ textContentSource: page.streamTextContent(), container: $('textLayer'), viewport });
    await textTask.render();
    if(current !== generation) return;
    try {
      await renderInternalLinks({ pdf, page, viewport, container: $('linkLayer'), isCurrent: () => current === generation, navigate: n => {
        go(n);
        $(document.body.classList.contains('reading-focus') ? 'exitFullscreen' : 'pageNumber').focus({ preventScroll: true });
      } });
    } catch(error) { console.warn('PDF 내부 링크를 불러오지 못했습니다.', error); }
    if(current !== generation) return;
    $('pageStatus').textContent = `${pageNumber} / ${pdf.numPages} 페이지`;
    $('fitWidth').textContent = zoom === 1 ? '너비 맞춤' : `${Math.round(zoom*100)}%`;
    $('zoomOut').disabled = zoom <= .6; $('zoomIn').disabled = zoom >= 2;
    persist();
  } catch(error) {
    if (current !== generation || error.name === 'RenderingCancelledException' || error.name === 'AbortException') return;
    $('loadMessage').hidden = false; $('loadMessage').textContent = '페이지를 표시하지 못했어요. 새로고침해 다시 시도해 주세요.';
    console.error(error);
  }
}
function go(n) { if(!pdf || !Number.isFinite(n)) return; pageNumber = Math.max(1,Math.min(pdf.numPages,Math.round(n))); updateNavigation(); $('paperStage').scrollTop=0; render(); }
$('previous').onclick = () => go(pageNumber-1);
$('next').onclick = () => go(pageNumber+1);
$('pageNumber').onchange = event => { const n=Number(event.target.value); if(!event.target.value || !Number.isFinite(n)){event.target.value=pageNumber;return;} go(n); };
$('zoomOut').onclick = () => { zoom=Math.max(.6,Math.round((zoom-.2)*10)/10); render(); };
$('zoomIn').onclick = () => { zoom=Math.min(2,Math.round((zoom+.2)*10)/10); render(); };
$('fitWidth').onclick = () => { zoom=1;render(); };
function closeContents(){
  $('bookSidebar').classList.remove('open');$('mobileContents').setAttribute('aria-expanded','false');$('mobileContents').focus();
}
$('closeContents').onclick=closeContents;
function setReadingFocus(active){
  document.body.classList.toggle('reading-focus',active);
  document.querySelector('.focus-controls').hidden=!active;
  $('fullscreen').setAttribute('aria-pressed',String(active));
  if(active){$('bookSidebar').classList.remove('open');$('mobileContents').setAttribute('aria-expanded','false');$('exitFullscreen').focus();}
  else $('fullscreen').focus();
  render();
}
$('fullscreen').onclick=async()=>{
  setReadingFocus(true);
  try{await document.documentElement.requestFullscreen?.();}catch{/* Reading mode also works when browser fullscreen is unavailable. */}
  render();
};
async function exitReadingFocus(){
  if(document.fullscreenElement){try{await document.exitFullscreen();}catch{}}
  setReadingFocus(false);
}
$('exitFullscreen').onclick=exitReadingFocus;
$('focusPrevious').onclick=()=>go(pageNumber-1);$('focusNext').onclick=()=>go(pageNumber+1);
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&document.body.classList.contains('reading-focus'))setReadingFocus(false);});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (document.body.classList.contains('reading-focus')) { event.preventDefault(); exitReadingFocus(); }
    else if ($('bookSidebar').classList.contains('open')) { event.preventDefault(); closeContents(); }
    return;
  }
  const direction = pageKeyDirection(event);
  if (!direction || !pdf) return;
  event.preventDefault();
  go(pageNumber + direction);
});
$('mobileContents').onclick = () => { const open=$('bookSidebar').classList.toggle('open'); $('mobileContents').setAttribute('aria-expanded',String(open));if(open)$('closeContents').focus(); };
window.visualViewport?.addEventListener('resize', () => $('paperStage').classList.toggle('page-swipe-enabled', canSwipePages()));
let resizeTimer; window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(render,150);});
updateNavigation();
try {
  let source = new URL('../assets/ebooks/knowhowzip-reading-sample.pdf',import.meta.url).href;
  if(bookId !== 'ebook-demo') {
    const {loadBook} = await import('./ebook-storage.mjs');
    const book = await loadBook(bookId);
    if(!book?.file) throw new Error('저장된 전자책을 찾을 수 없습니다.');
    source = { data: await book.file.arrayBuffer(), isEvalSupported: false };
    document.querySelector('.book-heading h1').textContent=book.title;
    document.querySelector('.sidebar-intro h2').textContent=book.title;
    document.querySelector('.book-heading p').textContent='내 전자책';
    document.querySelector('.reader-header .breadcrumb').parentElement.textContent='내 학습 / 전자책';
    document.title=`${book.title} · 노하우집`;
    const toc=book.toc?.length?book.toc:[{title:'처음부터 읽기',page:1}];
    chapters=toc.map(item=>item.title);outlinePages=toc.map(item=>item.page);
  }
  pdf=await getDocument(source).promise;
  document.querySelector('.book-meta span:last-child').textContent=`${pdf.numPages}페이지`;
  $('totalPages').textContent=`/ ${pdf.numPages}`; $('pageNumber').max=pdf.numPages;
  ['pageNumber','zoomOut','zoomIn','fitWidth','fullscreen'].forEach(id=>$(id).disabled=false);
  go(pageNumber);
} catch(error) { $('loadMessage').textContent=bookId !== 'ebook-demo' ? '저장된 전자책을 불러오지 못했어요. PDF를 등록한 브라우저에서 다시 열어 주세요.' : '전자책을 불러오지 못했어요. 연결을 확인한 뒤 새로고침해 주세요.'; console.error(error); }
