const db = require("./db.js");
const clear_list = require("./clear.json");

(async () => {
  //   for (const item of clear_list) {
  //     await db.add(item);
  //   }

  await db.find({}).then((el) => console.log(el.length));
})();
