import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=name=>fs.readFileSync(new URL(`../js/${name}.js`,import.meta.url),'utf8');
function setup(){
 const store=new Map();
 const c={window:{confirm:()=>true},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},saleProducts:[],showProductEditorStep:n=>c.step=n,adminToast:()=>{},console};
 vm.createContext(c);vm.runInContext(read('refund-policy'),c);
 const admin=read('admin');
 vm.runInContext(admin.slice(admin.indexOf('function validateRefundPolicyField('),admin.indexOf('function validateProductEditorForm(')),c);
 return c;
}
test('legacy defaults, custom newlines, and HTML escaping',()=>{
 const c=setup();assert.match(c.refundPolicyText({}),/환불 안내/);
 const text='첫 줄\n</textarea><script>alert(1)</script>&';
 const html=c.refundPolicyMarkup({refundPolicy:text});
 assert(html.includes('첫 줄\n&lt;/textarea&gt;'));assert(!html.includes('<script>'));
 assert.equal(c.refundPolicyText({refundPolicy:''}),'');
});
test('rejects blank policies and returns to the refund step',()=>{
 const c=setup();let focused=false;
 const form={dataset:{},elements:{refundPolicy:{value:' \n\t ',focus:()=>focused=true}}};
 assert.equal(c.validateRefundPolicyField(form),false);assert.equal(c.step,6);assert(focused);
 form.elements.refundPolicy.value='환불 안내';assert.equal(c.validateRefundPolicyField(form),true);
 assert.equal(c.refundPolicyLocked({paymentCount:1}),true);
 assert.equal(c.refundPolicyLocked({paymentCount:0}),false);
});
test('checkout shows the class policy, snapshots it, and locks after purchase',()=>{
 const c=setup(),nodes={payTitle:{},payBody:{},payModal:{classList:{add(){}}}};
 Object.assign(c,{productMap:{p:{id:'p',price:1000,title:'클래스',cohort:{period:'30일'},refundPolicy:'개별 규정\n둘째 줄'}},creatorOf:{p:{name:'크리에이터'}},discRate:()=>0,won:String,document:{getElementById:id=>nodes[id]},state:{orders:[],entitlements:[],purchased:new Set()},toast(){},closePay(){},refreshOwned(){},openPurchaseComplete(){}});
 const app=read('app');
 vm.runInContext(app.slice(app.indexOf('function openPay('),app.indexOf('function pickMethod(')),c);
 vm.runInContext(app.slice(app.indexOf('function confirmPay('),app.indexOf('function goMy(')),c);
 c.openPay('p');assert(nodes.payBody.innerHTML.includes(c.refundPolicyMarkup(c.productMap.p)));
 c.confirmPay('p');assert.equal(c.state.orders[0].refundPolicy,'개별 규정\n둘째 줄');
 const stale={id:'p',paymentCount:0,refundPolicy:'수정 시도'};
 assert.equal(c.refundPolicyLocked(stale),true);assert.equal(c.refundPolicyText(stale),'개별 규정\n둘째 줄');
 assert.equal(c.refundPolicyLocked({...stale,id:'p-copy'}),false);
});
test('saved class policy survives the public catalog mapping',()=>{
 const c=setup();c.localStorage.setItem('nhz-content-types-v1',JSON.stringify({contents:[{id:'v',type:'video'}],sales:[{id:'p',contentIds:['v'],name:'클래스',status:'공개',refundPolicy:'저장한 규정\n내용'}]}));
 Object.assign(c,{creators:[{id:'mmoh',products:[]}],productMap:{},creatorOf:{},P:x=>x});
 vm.runInContext(read('local-class-catalog'),c);
 assert.equal(c.productMap.p.refundPolicy,'저장한 규정\n내용');
});
test('save persists custom text and ignores edits once the class has payments',()=>{
 const c=setup(),product={id:'p',paymentCount:0,refundPolicy:'이전 규정'};
 c.saleProducts.push(product);
 const field=value=>({value});
 const form={dataset:{productId:'p'},elements:{classKeywords:field('태그'),classDescription:field('소개'),className:field('클래스'),classLead:field('소개'),originalPrice:field('1000'),discountPrice:field(''),refundPolicy:field('  새 규정\n둘째 줄  ')},querySelector:()=>null,querySelectorAll:()=>[],_classImages:[]};
 Object.assign(c,{selectedContentRows:()=>[{querySelector:()=>({value:'v'})}],document:{getElementById:()=>({textContent:'소개',querySelector:()=>null})},requirementOverlapDetails:()=>[],clearEditorSession(){},setTimeout(){},publicProducts:[]});
 const admin=read('admin');
 vm.runInContext(admin.slice(admin.indexOf('function saveProductForm('),admin.indexOf('function closeStudentDetailModal(')),c);
 const event={currentTarget:form,preventDefault(){}};
 c.saveProductForm(event,'edit');assert.equal(product.refundPolicy,'새 규정\n둘째 줄');
 product.paymentCount=1;delete form.elements.refundPolicy;
 c.saveProductForm(event,'edit');assert.equal(product.refundPolicy,'새 규정\n둘째 줄');
});
test('loads video and ebook templates and prevents replacing a purchased policy',()=>{
 const c=setup(),admin=read('admin');c.Event=Event;
 vm.runInContext(admin.slice(admin.indexOf('function loadRefundPolicyTemplate('),admin.indexOf('function validateRefundPolicyField(')),c);
 const events=[],field={value:'작성한 규정',readOnly:false,dispatchEvent:e=>events.push(e),focus(){},setSelectionRange(){}};
 const form={dataset:{productId:'p'},elements:{refundPolicy:field}},button={closest:()=>form};
 const product={id:'p',paymentCount:0};c.saleProducts.push(product);
 c.loadRefundPolicyTemplate(button,'ebook');assert.match(field.value,/유료 본문을 열람하지 않았다면 결제일부터 7일 이내 전액 환불/);
 assert.equal(events[0].type,'input');assert.equal(events[0].bubbles,true);
 c.loadRefundPolicyTemplate(button,'video');assert.equal(field.value,c.refundPolicyText({}));
 const video=field.value;product.paymentCount=1;c.loadRefundPolicyTemplate(button,'ebook');assert.equal(field.value,video);
 product.paymentCount=0;field.readOnly=true;c.loadRefundPolicyTemplate(button,'ebook');assert.equal(field.value,video);
 field.readOnly=false;c.localStorage.setItem('nhz-purchased-refund-p',JSON.stringify(video));
 c.loadRefundPolicyTemplate(button,'ebook');assert.equal(field.value,video);
});

test('editor offers explicit template loading while purchased classes only show readable policy',()=>{
 const c=setup(),admin=read('admin');c.escapeAdminText=c.escapeRefundPolicy;c.Event=Event;
 vm.runInContext(admin.slice(admin.indexOf('function productRefundSection('),admin.indexOf('function validateRefundPolicyField(')),c);
 const editable=c.productRefundSection({id:'new',paymentCount:0});
 assert(editable.includes('name="refundTemplateType"'));assert(editable.includes('name="refundPolicy"'));
 assert(!editable.includes('onchange='));
 const locked=c.productRefundSection({id:'paid',paymentCount:1,refundPolicy:'첫 줄\n둘째 줄'});
 assert(!locked.includes('<textarea'));assert(!locked.includes('<select'));assert(!locked.includes('<button'));
 assert(locked.includes('전체 규정 펼치기'));assert(locked.includes('첫 줄\n둘째 줄'));
 const field={value:'직접 작성',dispatchEvent(){},focus(){},setSelectionRange(){}};
 const form={dataset:{},elements:{refundPolicy:field,refundTemplateType:{value:'ebook'}}};
 assert.equal(field.value,'직접 작성');c.loadRefundPolicyTemplate({closest:()=>form});
 assert.match(field.value,/유료 본문을 열람하지 않았다면 결제일부터 7일 이내 전액 환불/);
});

test('template revisions preserve saved and legacy paid terms',()=>{
 const c=setup();
 assert.match(c.refundPolicyText({paymentCount:0}),/영상 강의 환불 안내/);
 assert.match(c.refundPolicyText({paymentCount:1}),/결제일부터 수강 시작일까지 언제든지 전액 환불/);
 assert.equal(c.refundPolicyText({paymentCount:1,refundPolicy:'구매 시 약정'}),'구매 시 약정');
});

test('canceling template confirmation preserves draft, caret and scroll',()=>{
 const c=setup(),admin=read('admin');c.Event=Event;
 vm.runInContext(admin.slice(admin.indexOf('function loadRefundPolicyTemplate('),admin.indexOf('function validateRefundPolicyField(')),c);
 let message,changed=false;
 c.window.confirm=text=>{message=text;return false;};
 const field={value:'작성 중인 내용',scrollTop:250,selectionStart:7,dispatchEvent(){changed=true;},focus(){changed=true;},setSelectionRange(){changed=true;}};
 c.loadRefundPolicyTemplate({closest:()=>({dataset:{},elements:{refundPolicy:field,refundTemplateType:{value:'video'}}})});
 assert.equal(message,'작성 중인 내용이 삭제되고 선택한 기본 문구로 바뀝니다.');
 assert.equal(field.value,'작성 중인 내용');assert.equal(field.scrollTop,250);assert.equal(field.selectionStart,7);assert.equal(changed,false);
});
