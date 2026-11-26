import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const admin=fs.readFileSync(new URL('../js/admin-content-types.js',import.meta.url),'utf8');
const app=fs.readFileSync(new URL('../js/app.js',import.meta.url),'utf8');
const books=[{id:'a',type:'ebook',title:'본권',pageCount:10,outline:'시작 | 1'},{id:'b',type:'ebook',title:'워크북',pageCount:20,outline:''}];
test('allows multiple ebooks while rejecting mixed types and missing content',()=>{
 const c={lectureContents:[...books,{id:'v',type:'video'}],typeOf:x=>x.type};vm.createContext(c);
 vm.runInContext(admin.slice(admin.indexOf('function selectedClassType('),admin.indexOf('function updateSelectedViewer(')),c);
 assert.equal(c.selectedClassType(['a','b']),'ebook');assert.equal(c.selectedClassType(['a']),'ebook');
 for(const ids of [[],['a','v'],['missing']])assert.throws(()=>c.selectedClassType(ids));
});
test('renders every book and opens the selected book, with access checks',()=>{
 const c={productContentSources:()=>books,productMap:{p:{id:'p',type:'ebook',bookId:'a'}},creatorOf:{p:{}},productVideoTitles:()=>[],state:{user:{}},hasValidAccess:()=>true,location:{},toast(){},showAccessDenied:()=>{c.denied=true;}};vm.createContext(c);
 vm.runInContext(app.slice(app.indexOf('function ebookBooks('),app.indexOf('function openDetail(')),c);
 vm.runInContext(app.slice(app.indexOf('function openLessonPlayer('),app.indexOf('function moveLesson(')),c);
 const html=c.ebookDetailContent(c.productMap.p,true);assert(html.includes('본권'));assert(html.includes('워크북'));assert(html.includes('총 30페이지'));assert.equal((html.match(/학습하기/g)||[]).length,2);
 assert(!c.ebookDetailContent(c.productMap.p,false).includes('학습하기'));
 c.openLessonPlayer('p',1);assert.equal(c.location.href,'./ebook-reader.html?book=b');
 c.location={};c.hasValidAccess=()=>false;c.openLessonPlayer('p',1);assert(c.denied);assert.equal(c.location.href,undefined);
});
test('local catalog retains a multi-book sale and its ordering',()=>{
 const c={localStorage:{getItem:()=>JSON.stringify({contents:books,sales:[{id:'p',name:'세트',contentIds:['b','a'],status:'공개'}]})},creators:[{id:'mmoh',products:[]}],P:x=>x,productMap:{},creatorOf:{},console};vm.createContext(c);
 vm.runInContext(fs.readFileSync(new URL('../js/local-class-catalog.js',import.meta.url),'utf8'),c);
 assert.equal(c.productMap.p.type,'ebook');assert.equal(JSON.stringify(c.productMap.p.bookIds),'["b","a"]');
});
