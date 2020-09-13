const db = require('../database/dbConfig')

async function addUser(user) {
    const [id] = await db("users").insert(user)
	return findById(id)
}

function findById(id) {
    return db("users")
		.select("id", "username")
		.where({ id })
		.first()
}

function findBy(filter) {
	return db("users")
		.select("id", "username", "password", "department")
		.where(filter)
}

function find() {
	return db("users").select("id", "username", "department")
}

module.exports = {
    addUser,
    findById,
    findBy,
    find
}