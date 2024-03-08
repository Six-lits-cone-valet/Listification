function browserSupport () {
    console.log('checking support');
  if (!('indexedDB' in window)) {
    return false;
  }
  return true;
}

export default browserSupport;