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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;