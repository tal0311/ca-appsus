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
        id: utilService.makeId(),
        subject: utilService.makeLorem(2),
        body: utilService.makeLorem(50),
        isRead: true,
        time: 1551133930594,
        peer: 'meir@baba.com',
        direc: 'inbox',
        starred: false,
        trashed: false,
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
        trashed,
    )
    mail.id = utilService.makeId()
    return mail;
}



function getFakeMails() {
    return [
        {
            id: utilService.makeId(),
            subject: utilService.makeLorem(2),
            body: utilService.makeLorem(50),
            isRead: false,
            time: 1551133930594,
            peer: 'avi@baba.com',
            direc: 'inbox',
            starred: false,
            trashed: false,
        },
        {
            id: utilService.makeId(),
            subject: utilService.makeLorem(2),
            body: utilService.makeLorem(50),
            isRead: true,
            time: 1551133930594,
            peer: 'meir@baba.com',
            direc: 'inbox',
            starred: false,
            trashed: false,
        },
        {
            id: utilService.makeId(),
            subject: utilService.makeLorem(2),
            body: utilService.makeLorem(50),
            isRead: false,
            time: 1551133930594,
            peer: 'david@baba.com',
            direc: 'inbox',
            starred: false,
            trashed: false,
        },
        {
            id: utilService.makeId(),
            subject: utilService.makeLorem(2),
            body: utilService.makeLorem(50),
            isRead: false,
            time: 1551133930594,
            peer: 'david@baba.com',
            direc: 'sent',
            starred: false,
            trashed: false,
        },
        {
            id: utilService.makeId(),
            subject: utilService.makeLorem(2),
            body: utilService.makeLorem(50),
            isRead: true,
            time: 1551133930594,
            peer: 'david@baba.com',
            direc: 'inbox',
            starred: false,
            trashed: false,
        },
        {
            id: utilService.makeId(),
            subject: utilService.makeLorem(2),
            body: utilService.makeLorem(50),
            isRead: false,
            time: 1551133930594,
            peer: 'avi@baba.com',
            direc: 'sent',
            starred: false,
            trashed: false,
        },
        {
            id: utilService.makeId(),
            subject: utilService.makeLorem(2),
            body: utilService.makeLorem(50),
            isRead: true,
            time: 1551133930594,
            peer: 'meir@baba.com',
            direc: 'inbox',
            starred: false,
            trashed: false,
        },
        {
            id: utilService.makeId(),
            subject: utilService.makeLorem(2),
            body: utilService.makeLorem(50),
            isRead: false,
            time: 1551133930594,
            peer: 'david@baba.com',
            direc: 'inbox',
            starred: false,
            trashed: false,
        },
        {
            id: utilService.makeId(),
            subject: utilService.makeLorem(2),
            body: utilService.makeLorem(50),
            isRead: false,
            time: 1551133930594,
            peer: 'david@baba.com',
            direc: 'sent',
            starred: false,
            trashed: false,
        },
        {
            id: utilService.makeId(),
            subject: utilService.makeLorem(2),
            body: utilService.makeLorem(50),
            isRead: true,
            time: 1551133930594,
            peer: 'david@baba.com',
            direc: 'inbox',
            starred: false,
            trashed: false,
        }
    ]
}









