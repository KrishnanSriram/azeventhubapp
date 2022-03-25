'use strict';

var express = require('express');
const { json } = require('express/lib/response');
var router = express.Router();
const user_controller = require('./../controller/users');
const eventhub_publisher = require('./../controller/eventhub/publisher');
/* GET - Init user. */
router.get('/init', (req, res, next) => {
  user_controller.init_users()
  res.json({ 'message': 'Data initialization complete. You are good to go!' }).status(200);
});
/* POST - Add NEW user. */
router.post('/', async (req, res, next) => {
  const { firstName, lastName, email } = req.body;
  console.log(`Add new user - ${lastName}, ${firstName}`);
  // Add validation here
  try {
    const new_user = user_controller.add_user(firstName, lastName, email)
    const confirmation = await eventhub_publisher.sendEventWithJSONPayload(new_user);
    const final_response = { ...new_user, receipt: confirmation };
    res.json(final_response).status(201);
  } catch (error) {
    res.json(error).status(500);
  }
});
/* GET users listing. */
router.get('/', (req, res, next) => {
  try {
    res.json(user_controller.list_users()).status(200)
  } catch (error) {
    res.json(error).status(500);
  }
});
/* FIND user. */
router.get('/:userId', (req, res, next) => {
  console.log(`Find User Id: ${req.params.userId}`);
  try {
    const userId = req.params.userId
    const user = user_controller.find_user(userId);
    console.log('Found user', user);
    res.json(user).status(200);
  } catch (error) {
    res.json(error).status(500);
  }
});



module.exports = router;
