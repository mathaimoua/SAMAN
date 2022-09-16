const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/recentItems', rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT * FROM "items"
  JOIN "user" ON "items".user_id = "user".id
  JOIN "containers" ON "items".container_id = "containers".container_id
  JOIN "locations" ON "containers".location_id = "locations".location_id
  WHERE "user".id = $1 AND "isActive" = TRUE
  ORDER BY "date_added" DESC LIMIT 5;`;

  pool.query(queryText, [req.user.id])
    .then(response => {
      // console.log('data from server is', response.rows)
      res.send(response.rows)
    }).catch(err => {
      // console.log(err)
      // res.sendStatus(500)
    })
});

router.get('/viewall', rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT * FROM "items"
  JOIN "user" ON "items".user_id = "user".id
  JOIN "containers" ON "items".container_id = "containers".container_id
  JOIN "locations" ON "containers".location_id = "locations".location_id
  WHERE "user".id = $1;`;

  pool.query(queryText, [req.user.id])
    .then(response => {
      // console.log('data from server is', response.rows)
      res.send(response.rows)
    }).catch(err => {
      // console.log(err)
      // res.sendStatus(500)
    })
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
  queryText = `
  SELECT "item_id", "item_name", "current_holder", "model", "serial", "warranty_expiration", "state", "container_name" FROM "items"
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

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const itemID = req.params.id
  const queryText = `
  DELETE FROM "items"
  WHERE item_id = $1 AND user_id = $2
  ;`;

  pool.query(queryText, [itemID, req.user.id])
    .then(response => {
      console.log(response)
      res.sendStatus(200)})
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

router.get('/current/:id', rejectUnauthenticated, (req, res) => {
  queryText = `
  SELECT "item_id", "item_name", "current_holder", "model", "serial", "warranty_expiration", "state", "container_name", "description" FROM "items"
  JOIN "user" ON "items".user_id = "user".id
  JOIN "containers" ON "items".container_id = "containers".container_id
  JOIN "locations" ON "containers".location_id = "locations".location_id
  WHERE "user".id = $1 AND "items".item_id = $2
  ;`;

  pool.query(queryText, [req.user.id, req.params.id])
    .then(response => {
      res.send(response.rows)
    }).catch( err => {
      console.log(err)
      res.sendStatus(500)
    })
})

router.put('/:id', rejectUnauthenticated, (req, res) => {
  queryText=`
  UPDATE "items" 
  SET "item_name" = $1,
    "current_holder" = $2,
    "container_id" = $3,
    "model" = $4,
    "serial" = $5,
    "warranty_expiration" = $6,
    "state" = $7
  WHERE "item_id" = $8 AND "user_id" = $9
  ;`;

  values = [ 
    req.body.info.name,
    req.body.info.holder,
    req.body.info.container,
    req.body.info.model,
    req.body.info.serial,
    req.body.info.warranty,
    req.body.info.state,
    req.params.id,
    req.user.id
  ]

  pool.query(queryText, values)
    .then(response => {
      res.sendStatus(200)
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

router.post('/:id', rejectUnauthenticated, (req, res) => {
  queryText=`
  INSERT INTO "items" ("item_name", "user_id", "current_holder", "container_id", "model", "serial", "warranty_expiration", "state")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
  ;`;

  values = [ 
    req.body.name,
    req.user.id,
    req.body.holder,
    req.params.id,
    req.body.model,
    req.body.serial,
    req.body.warranty,
    req.body.state
  ]

  pool.query(queryText, values)
    .then(response => {
      res.sendStatus(200)
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

router.get('/search/:string', rejectUnauthenticated, (req, res) => {
  const string = '%'+ String(req.params.string) + '%'
  // console.log(string)
  queryText = `
    SELECT * FROM "items"
    JOIN "containers" ON "containers".container_id = "items".container_id
    WHERE current_holder ILIKE $1  AND user_id = $2
    OR container_name ILIKE $1 AND user_id = $2
    OR item_name ILIKE $1 AND user_id = $2
    OR model ILIKE $1 AND user_id = $2
    OR serial ILIKE $1 AND user_id = $2
    OR state ILIKE $1 AND user_id = $2
    OR current_holder ILIKE $1 AND user_id = $2;
  `;
  pool.query(queryText, [string, req.user.id])
    .then(response => {
      res.send(response.rows)
    }).catch(err => {
      res.sendStatus(500)
      console.log(err)
    })
})

module.exports = router;