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

function request(url) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log(`request: `, url)
      res(url)
    }, 1000)
  })
}

const queue = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

asyncPool(3, queue, request)

request('aaaa')

/**
 * 
假设有个 
function request(url) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log(`request: `, url)
      res(url)
    }, 1000)
  })
}

实现 requestQueue(limit, ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'])
每次并发调用不超过 limit 个
 */