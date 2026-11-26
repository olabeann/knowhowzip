function database() {
  return new Promise((resolve,reject)=>{
    const request=indexedDB.open('knowhowzip-ebook-preview',1);
    request.onupgradeneeded=()=>request.result.createObjectStore('books',{keyPath:'id'});
    request.onsuccess=()=>resolve(request.result);
    request.onerror=()=>reject(request.error);
  });
}
export async function saveBook(book) {
  const db=await database();
  return new Promise((resolve,reject)=>{const tx=db.transaction('books','readwrite');tx.objectStore('books').put(book);tx.oncomplete=()=>{db.close();resolve();};tx.onerror=()=>{db.close();reject(tx.error);};});
}
export async function loadBook(id) {
  const db=await database();
  return new Promise((resolve,reject)=>{const tx=db.transaction('books');const request=tx.objectStore('books').get(id);request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);tx.oncomplete=()=>db.close();});
}
