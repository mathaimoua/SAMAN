const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/recentItems', rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT "item_name", "item_id","current_holder", "model", "serial", "warranty_expiration", "state", "container_name", "date_added" FROM "items"
  JOIN "user" ON "items".user_id = "user".id
  JOIN "containers" ON "items".container_id = "containers".container_id
  JOIN "locations" ON "containers".location_id = "locations".location_id
  WHERE "user".id = $1 AND "isActive" = TRUE
  LIMIT 5;`;

  pool.query(queryText, [req.user.id])
    .then(response => {
      // console.log('data from server is', response.rows)
      res.send(response.rows)
    }).catch(err => {
      // console.log(err)
      // res.sendStatus(500)
    })
});

router.get('/:id', (req, res) => {
  queryText = `
  SELECT "item_name", "current_holder", "model", "serial", "warranty_expiration", "state", "container_name" FROM "items"
  JOIN "user" ON "items".user_id = "user".id
  JOIN "containers" ON "items".container_id = "containers".container_id
  JOIN "locations" ON "containers".location_id = "locations".location_id
  WHERE "user".id = $1 AND "containers".container_id = $2
  ;`;

  pool.query(queryText, [req.user.id, req.params.id])
    .then( response => {
      res.send(response.rows)
    }).catch( err => {
      console.log(err);
      res.sendStatus(500)
    })
})

router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;