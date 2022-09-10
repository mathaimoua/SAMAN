const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT  "container_id", "container_name", "locations".location_id, "locations".location_name FROM "containers"
  JOIN "locations"
  ON "containers".location_id = "locations".location_id
  WHERE "locations".user_id = $1 AND "locations".location_id = $2
  ;`;

  pool.query(queryText, [req.user.id, req.params.id])
    .then(response => {
      res.send(response.rows)
    }).catch(err => {
      // console.log(err)
      // res.sendStatus(500)
    })
});

router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
  INSERT INTO "containers" ("container_name", "location_id")
  VALUES ($1, $2);
  ;`;

  pool.query(queryText, [req.body.name, req.body.location])
    .then( response => {
      console.log(response)
      res.sendStatus(200)    
    }).catch( err => {
        console.log(err)
        res.sentStatus(500)
      })

});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const containerID = req.params.id
  const queryText = `
  DELETE FROM "containers"
  WHERE container_id = $1
  ;`;

  pool.query(queryText, [containerID])
    .then(response => {
      console.log(response)
      res.sendStatus(200)
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

router.put('/editname/:id', rejectUnauthenticated, (req, res) => {
  const containerID = req.params.id
  // console.log('id is', containerID, 'new name is', req.body.name)
  const queryText = `
  UPDATE "containers"
  SET "container_name" = $1
  WHERE "container_id" = $2
  ;`;

  pool.query(queryText, [req.body.name, containerID])
    .then(response => {
      console.log(response)
      res.sendStatus(200)
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

module.exports = router;