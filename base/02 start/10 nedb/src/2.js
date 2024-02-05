const db = require("./db.js");

const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

(async () => {
  // let data = await db.findone({ _id: "R5aMKmeBR76dBE3m" });
  // let data = await db.findone({ created: 1703108650624 });
  // let data = await db.find({ });
  // let data = await db.count({ });
  let data = await db.update({ created: 1703108650624 }, {created: 'asd'});
  console.log(data);
})();
