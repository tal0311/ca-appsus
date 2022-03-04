import { utilService } from './util-service.js';
import { storageService } from './async-storage-service.js';

const STORAGE_KEY = 'mailDB';
_creatmails();

export const mailService = {
    query,
    remove,
    save,
    get,
    getEmptymail,
};

function query() {
    return storageService.query(STORAGE_KEY);
}

function remove(mailId) {
    return storageService.remove(STORAGE_KEY, mailId);
}

function get(mailId) {
    return storageService.get(STORAGE_KEY, mailId)
    .then(mail => {
        return _setNextPrevmailId(mail)
    })
}

function save(mail) {
    if (mail.id) return storageService.put(STORAGE_KEY, mail);
    else return storageService.post(STORAGE_KEY, mail);
}

function _setNextPrevmailId(mail) {
    return storageService.query(STORAGE_KEY).then(mails => {
        const mailIdx = mails.findIndex(currmail => currmail.id === mail.id)
        mail.nextmailId = (mails[mailIdx+1])? mails[mailIdx+1].id : mails[0].id
        mail.prevmailId = (mails[mailIdx-1])? mails[mailIdx-1].id : mails[mails.length-1].id
        return mail
    })
}

// Factory Method:
function getEmptymail() {
    return {
        id: '102',
        subject: makeLorem(2),
        body: makeLorem(50),
        isRead: true,
        time: 1551133930594,
        peer: 'meir@baba.com',
        direc: 'inbox',
        starred: false,
    };
}


function _creatmails() {
    let mails = utilService.loadFromStorage(STORAGE_KEY);
    if (!mails || !mails.length) {
        mails = getFakeMails()
        utilService.saveToStorage(STORAGE_KEY, mails);
    }
    // console.log(mails);
    return mails;
}

function _creatmail(id, subject, body, isRead, sentAt,to) {
    const mail = getEmptymail(
        id,
        subject,
        body,
        isRead,
        time,
        peer,
        direc,
        starred,
    )
    mail.id = utilService.makeId()
    return mail;
}



function getFakeMails() {
    return [
        {
            id: '101',
            subject: makeLorem(2),
            body: makeLorem(50),
            isRead: false,
            time: 1551133930594,
            peer: 'avi@baba.com',
            direc: 'inbox',
            starred: false,
        },
        {
            id: '102',
            subject: makeLorem(2),
            body: makeLorem(50),
            isRead: true,
            time: 1551133930594,
            peer: 'meir@baba.com',
            direc: 'inbox',
            starred: false,
        },
        {
            id: '103',
            subject: makeLorem(2),
            body: makeLorem(50),
            isRead: false,
            time: 1551133930594,
            peer: 'david@baba.com',
            direc: 'inbox',
            starred: false,
        },
        {
            id: '104',
            subject: makeLorem(2),
            body: makeLorem(50),
            isRead: false,
            time: 1551133930594,
            peer: 'david@baba.com',
            direc: 'sent',
            starred: false,
        },
        {
            id: '105',
            subject: makeLorem(2),
            body: makeLorem(50),
            isRead: true,
            time: 1551133930594,
            peer: 'david@baba.com',
            direc: 'inbox',
            starred: false,
        },
        {
            id: '106',
            subject: makeLorem(2),
            body: makeLorem(50),
            isRead: false,
            time: 1551133930594,
            peer: 'avi@baba.com',
            direc: 'sent',
            starred: false,
        },
        {
            id: '107',
            subject: makeLorem(2),
            body: makeLorem(50),
            isRead: true,
            time: 1551133930594,
            peer: 'meir@baba.com',
            direc: 'inbox',
            starred: false,
        },
        {
            id: '108',
            subject: makeLorem(2),
            body: makeLorem(50),
            isRead: false,
            time: 1551133930594,
            peer: 'david@baba.com',
            direc: 'inbox',
            starred: false,
        },
        {
            id: '109',
            subject: makeLorem(2),
            body: makeLorem(50),
            isRead: false,
            time: 1551133930594,
            peer: 'david@baba.com',
            direc: 'sent',
            starred: false,
        },
        {
            id: '110',
            subject: makeLorem(2),
            body: makeLorem(50),
            isRead: true,
            time: 1551133930594,
            peer: 'david@baba.com',
            direc: 'inbox',
            starred: false,
        }
    ]
}









function makeLorem(wordCount = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (wordCount > 0) {
        wordCount--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
  }