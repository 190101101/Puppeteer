var Datastore = require('nedb')
    , db = new Datastore();
db = {};
db.puppeteer = new Datastore('./puppeteer/example/src/puppeteer.db');

const add = async (data) => {
    return await new Promise((resolve, reject) => {
        db.puppeteer.insert(data, function (err, newDoc) {
            resolve(newDoc)
        });
    })
}
const find = async (data) => {
    return await new Promise((resolve, reject) => {
        db.puppeteer.find(data, function (err, docs) {
            resolve(docs)
        });
    })
}
const findone = async (data) => {
    return await new Promise((resolve, reject) => {
        db.puppeteer.find(data).sort({ use: 1 }).exec(function (err, docs) {
            resolve(docs[0])
          });
          
    })
}
const count = async (data) => {
    return await new Promise((resolve, reject) => {
        db.puppeteer.count(data, function (err, count) {
            resolve(count)
        });
    })
}
const update = async (data1, data2) => {
    return await new Promise((resolve, reject) => {
        db.puppeteer.update(data1, data2,{ multi: false }, function (err, numReplaced) {
            db.puppeteer.persistence.compactDatafile()
            resolve(numReplaced)
        });
    })
}
const limit = async (limit) => {
    return await new Promise((resolve, reject) => {
        db.puppeteer.find({}).limit(limit).exec(function (err, docs) {
            resolve(docs)
          });
          
    })
}

const panel = async (data) => {
    return await new Promise((resolve, reject) => {
        db.puppeteer.find(data,{udemy:1,description:1,like:1,mounth:1,day:1,hours:1,second:1,img:1,created:1,_id:1}).exec(function (err, docs) {
            resolve(docs)
          });
          
    })
}



const limited = async (limit) => {
    return await new Promise((resolve, reject) => {
        db.puppeteer.find({}).sort({ created: 1 }).limit(limit).exec(function (err, docs) {
            resolve(docs)
          });
          
    })
}


const like = async (limit) => {
    return await new Promise((resolve, reject) => {
        db.puppeteer.find({}).sort({ like: 1 }).limit(limit).exec(function (err, docs) {
            resolve(docs)
          });
          
    })
}
const primary = async () => {
    return await new Promise((resolve, reject) => {
        db.puppeteer.find({}).sort({ use: 1 }).exec(function (err, docs) {
            resolve(docs[0])
          });
          
    })
}
const remove = async (data) => {
    return await new Promise((resolve, reject) => {
        db.puppeteer.remove(data, { multi: true }, function (err, numRemoved) {
            db.puppeteer.persistence.compactDatafile()
          resolve(numRemoved)
          });
          
    })
}




module.exports = {
    add,
    find,
    count,
    findone,
    remove,
    update,
    limit,
    primary,
    like,
    limited,
    panel
}


db.puppeteer.loadDatabase();