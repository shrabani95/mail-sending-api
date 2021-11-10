// console.warn(" sw from public folder");

// for creating catche

let cacheData="appV1";
this.addEventListener('install',(event)=>{
        event.waitUntil(
            caches.open(cacheData).then((cache)=>{
                cache.addAll([                     
                    '/static/js/main.chunk.js',
                    '/static/js/bundle.js',                   
                    '/static/js/0.chunk.js',            
                    '/index.html',
                    '/user',                    
                    '/'
                ])
            })

        )
    })

    this.addEventListener('fetch',(event)=>{
        if(!navigator.onLine)
        {
            event.respondWith(
                caches.match(event.request).then((result)=>{
                    if(result)
                    {
                        return result;
                    }
                    let requestUrl=event.request.clone();
                    return fetch(requestUrl)
                })
            )
        }
     
    })