export const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export function log(text) {
  console.log(`${new Date().toISOString()}\t${text}`);
}

export function chunkString(text, length = 260) {
  let ret = [];
  for (let i=0; i <= text.length; i += length) {
    ret.push(text.substring(i, i + length))
  }
  return ret;
}