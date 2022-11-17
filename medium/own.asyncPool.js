async function asyncPool(poolLimit, queue, iteratorFn) {
  const ret = []
  const executing = []

  for (let i = 0; i < queue.length; i++) {
    const item = queue[i]
    const p = Promise.resolve().then(() => iteratorFn(item, queue))

    ret.push(p)
    const e = p.then(() => executing.splice(executing.indexOf(e), 1))

    executing.push(e)
    if (executing.length >= poolLimit) {
      await Promise.race(executing)
    }
  }
  return Promise.all(ret)
}

const request = function(id){
  return new Promise((resolve,reject)=>{
      //随机一个执行时间
      let time = Math.floor(1000*Math.random());
      console.log(`id为${id}开始请求,预计执行时间${time/1000}`)
      setTimeout(()=>{
          resolve(id);
      },time)
  }).then((id)=>{
      console.log(`id为${id}的请求进行逻辑处理`)
      return id;
  })
}

// function requestQueue(limit, array){
//   const len = array.length;
//   let current = 0;
//   const ret = [];
//   const queueTask = [];
  
//   function queue(){
//     if(current >= len){
//       return Promise.resolve(ret)
//     }
//     const promiseFn = Promise.resolve(request(array[current]));
//     ret.push(promiseFn);
//     current ++;
//     let p = Promise.resolve();
//     if(queueTask.length < limit){
//       const e = promiseFn.then(() => queueTask.splice(queueTask.findIndex(item => item === promiseFn), 1));
//       queueTask.push(e);
//        if(queueTask.length === limit){
//         p = Promise.race(queueTask)
//       }
//     }
//     return p.then(() => queue())
//   }
//   return queue().then((res) => Promise.all(res))
// }

const queue = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

// asyncPool(3, queue, request)

// requestQueue(2, queue)

// function asyncPool(limit, list) {
  
//   let i = limit - 1
//   async function next() {
//     const item = list[i]
//     console.log('item', item)

//     try {
//       if (!!item) {
//         i++
//         await request(item)
//       }
//     } finally {
//       next()
//     } 
//   }
  
//   for (let i = 0; i < limit; i++) {
//     next()    
//   }
// }

/**
 * 
假设有个 
const request = function(id){
    return new Promise((resolve,reject)=>{
        //随机一个执行时间
        let time = Math.floor(1000*Math.random());
        console.log(`id为${id}开始请求,预计执行时间${time/1000}`)
        setTimeout(()=>{
            resolve(id);
        },time)
    }).then((id)=>{
        console.log(`id为${id}的请求进行逻辑处理`)
        return id;
    })
}

实现 requestQueue(limit, [0,1,2,3,4,5,6,7,8,9,10])
每次并发调用不超过 limit 个, 返回结果与 Promise.all 一致
 */

const requestQueue = (limit, arrsId) => {
  let len = arrsId.length;
  const result = new Array(len).fill(false);
  
  // 实际完成数量
  let count = 0;
    
  return new Promise((resolve, reject) => {
    while (count < limit) {
      next();
    }
    
    function next() {
      let current = count++;
      if (current >= len) {
        !result.includes(false) && resolve(result);
        return;
      }
      
      const id = arrsId[current];
      request(id).then((res) => {
        result[current] = res;
        if (current < len) {
          next();
        }
      }).catch((err) => {
        reject(err);
      })
      
    }
  })
}

requestQueue(3, [0,1,2,3,4,5,6,7,8,9,10])