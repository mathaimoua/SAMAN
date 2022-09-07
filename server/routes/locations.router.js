const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/main', rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT "location_name" FROM "locations"
  JOIN "user"
  ON "locations".user_id = "user".id
  WHERE "locations".user_id = $1 AND "isActive" = true;`;

  pool.query(queryText, [req.user.id])
    .then(response => {
      // console.log('data from server is', response.rows)
      res.send(response.rows[0])
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