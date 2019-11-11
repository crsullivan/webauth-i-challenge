// this file is the data access layer
const db = require('../data/db-config.js');

module.exports = {
  find,
  findById,
  add,
  findBy

};

function find() {
    return db('users').select('id', 'username');
}

function findBy(filter) {
    return db('users').where(filter);
  }

function add(user) {
    return db('users')
      .insert(user, 'id')
      .then(ids => {
        const [id] = ids;
        return findById(id);
      });
  }
  
  function findById(id) {
    return db('users')
      .select('id', 'username')
      .where({ id })
      .first();
  }