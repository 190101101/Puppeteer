const db = require("./db.js");

(async () => {
    const all = await db.find({});

    for(const item of all){
        await db.remove({_id:item._id});
    }
})();
