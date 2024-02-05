const db = require("./db.js");

const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

(async () => {
    const item = await db.findone({created: 'zxc'});
    item.created = 1703109269796;
    let data = await db.update({ _id: item._id }, item);
    console.log(data);
})();
