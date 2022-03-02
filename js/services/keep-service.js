import { utilService } from './util-service.js'
import { storageService } from './async-storage-service.js'

const STORAGE_KEY = 'keepDB'
_creatNots()

export const keepService = {
  query,
  remove,
  save,
  get,
}

function query() {
  return storageService.query(STORAGE_KEY)
}

function remove(noteId) {
  return storageService.remove(STORAGE_KEY, noteId)
}

function get(noteId) {
  return storageService.get(STORAGE_KEY, noteId).then((note) => {
    return _setNextPrevmailId(nots)
  })
}

function save(note) {
  if (note.id) return storageService.put(STORAGE_KEY, note)
  else return storageService.post(STORAGE_KEY, note)
}

// function _setNextPrevmailId(note) {
//   return storageService.query(STORAGE_KEY).then((mails) => {
//     const mailIdx = mails.findIndex((currmail) => currmail.id === mail.id)
//     mail.nextmailId = mails[mailIdx + 1] ? mails[mailIdx + 1].id : mails[0].id
//     mail.prevmailId = mails[mailIdx - 1]
//       ? mails[mailIdx - 1].id
//       : mails[mails.length - 1].id
//     return mail
//   })
// }

// Factory Method:
function getEmptyNote() {
  return {
    id,
    subject,
    body,
    isRead,
    sentAt,
    to,
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
    })
    notes.push({
      id: 'n102',
      type: 'keepVideoCmp',
      info: {
        title: 'my video title',
        content: 'https://www.youtube.com/watch?v=gThS-KfIxOs&t=2599s',
      },
      style: {
        backgroundColor: '#00d',
      },
    })
    notes.push({
      id: 'n102',
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
      id: 'n103',
      type: 'keepTodoCmp',
      info: {
        label: 'Get my stuff together',
        todos: [
          { txt: 'Driving liscence', doneAt: null },
          { txt: 'Coding power', doneAt: 187111111 },
        ],
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
