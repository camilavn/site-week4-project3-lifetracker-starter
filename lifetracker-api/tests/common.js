const {Client} = require("pg");
const {getDatabaseUri} = require("./config");

const db = new Client({});
db.connect();


commonBeforeAll(async function () {
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM goals");
    await db.query("DELETE FROM tasks");
    await db.query("DELETE FROM user_goals");
});

commonBeforeEach(async function () {
    await db.query("BEGIN");
}
);

commonAfterEach(async function () {
    await db.query("ROLLBACK");
}
);

commonAfterAll(async function () {
    await db.end();
}
);

module.exports = db;