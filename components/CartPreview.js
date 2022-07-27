import { createGlobalState } from 'react-hooks-global-state';

let { setGlobalState, useGlobalState } = createGlobalState({ count: 0 });

function udpateCartItemsCount (arr) {
  let sum = 0
  arr.forEach((e)=>{
    sum = sum + e["node"]["quantity"]
  })
  return sum
}

export { udpateCartItemsCount };
export { useGlobalState, setGlobalState };
