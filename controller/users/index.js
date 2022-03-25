'use strict';

const uuid = require('uuid');
const { getMaxListeners } = require('../../app');

const users = []

const init_users = () => {
  add_user('Krishnan', 'Sriram', 'krishnan.sriram@getMaxListeners.com');
  add_user('Sriram', 'Subramaniam', 'sriram.subramaniam@getMaxListeners.com');
  add_user('Jayanthi', 'Sriram', 'jayanthi.sriram@getMaxListeners.com');
}

const add_user = (firstName, lastName, email) => {
  const user = {
    userId: uuid.v4(),
    firstName,
    lastName,
    email
  }
  users.push(user)
  return user;
}

const list_users = () => {
  return {
    users,
    count: users.length
  };
}

const find_user = (userId) => {
  console.log('Filter for user', userId);
  return users.filter((user) => {
    return user.userId == userId;
  });
}

module.exports = {
  init_users,
  add_user,
  list_users,
  find_user
}
