const db = require('../database/db-config');

module.exports = {
  add,
  find,
  findAllUsers,
  findBy,
  findById,
};

function find() {
  return db('users')
    .select('id', 'username');
}

function findAllUsers() {
  return db('users')
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .select('id', 'username', 'password', 'location', 'email')
    .first();
}

function add(user) {
  return db('users')
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    })
}

function findById(username) {
  return db('users')
    .where({ username })
    .first();
}