export const utilService = {
  saveToStorage,
  loadFromStorage,
  makeId,
  getRandomIntInclusive,
  getRandomFloatInclusive,
}

function saveToStorage(key, value) {
  console.log('saved to local')
  localStorage.setItem(key, JSON.stringify(value) || null)
}

function loadFromStorage(key) {
  console.log('load to local')
  let data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function makeId(length = 8) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function getRandomFloatInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return (Math.random() * (max - min + 1) + min).toFixed(2) //The maximum is inclusive and the minimum is inclusive
}
