import { utilService } from './util-service.js'
import { storageService } from './async-storage-service.js'

const STORAGE_KEY = 'keepDB'
_creatNots()

export const keepService = {
  query,
  remove,
  save,
  get,
  getEmptyNote,
}

function query() {
  return storageService.query(STORAGE_KEY)
}

function remove(noteId) {
  return storageService.remove(STORAGE_KEY, noteId)
}

function get(noteId) {
  return storageService.get(STORAGE_KEY, noteId)
}

function save(note) {
  if (note.id) return storageService.put(STORAGE_KEY, note)
  else return storageService.post(STORAGE_KEY, note)
}

// Factory Method:

function getEmptyNote() {
  return {
    type: '',
    isPinned: false,
    info: {
      title: '',
      content: '',
    },
    style: {
      backgroundColor: '',
    },
  }
}

function _creatNots() {
  let notes = utilService.loadFromStorage(STORAGE_KEY)
  if (!notes || !notes.length) {
    notes = []
    notes.push({
      id: 'n101',
      type: 'keepTxtCmp',
      isPinned: true,
      info: {
        title: 'my txt title',
        content: 'Fullstack Me Baby!',
      },
      style: {
        backgroundColor: '#00d',
      },
    })
    notes.push({
      id: 'n102',
      type: 'keepVideoCmp',
      info: {
        title: 'my video title',
        content: 'https://www.youtube.com/embed?v=gThS-KfIxOs&t=2599s',
      },
      style: {
        backgroundColor: '#00d',
      },
    })
    notes.push({
      id: 'n103',
      type: 'keepImgCmp',
      info: {
        title: 'img title',
        content: 'https://source.unsplash.com/random/200x200',
      },
      style: {
        backgroundColor: '#00d',
      },
    })
    notes.push({
      id: 'n104',
      type: 'keepTodoCmp',
      info: {
        label: 'Get my stuff together',
        todos: [
          { txt: 'Driving liscence', doneAt: null },
          { txt: 'Coding power', doneAt: 187111111 },
        ],
      },
      style: {
        backgroundColor: '#00d',
      },
    })

    utilService.saveToStorage(STORAGE_KEY, notes)
  }
  return notes
}

// function _creatNote(id, subject, body, isRead, sentAt, to) {
//   mail.id = utilService.makeId()
//   return mail
// }
