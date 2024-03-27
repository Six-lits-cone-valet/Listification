function browserSupport () {
  if (!('indexedDB' in window)) {
    return false;
  }
  return true;
}

export default browserSupport;