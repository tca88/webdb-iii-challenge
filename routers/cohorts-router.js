const knex = require("knex");
const router = require("express").Router();

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.db3"
  },
  useNullAsDefault: true
  //   debug: true
};

const db = knex(knexConfig);

router.get("/", (req, res) => {
  db("cohorts") // select * from rows
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  // retrieve a role by id
  db("cohorts")
    .where({ id: req.params.id })
    .first() // select * from rows
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id/students", (req, res) => {
  // retrieve a role by id
  db("students")
    .where({ cohorts_id: req.params.id })
    .then(student => {
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // insert into roles () values (req.body)
  db("cohorts")
    .insert(req.body, ["id"]) //always put id as second argument
    .then(ids => {
      return db("cohorts")
        .where({ id: ids[0] })
        .first() // select * from rows
        .then(cohort => {
          res.status(200).json(cohort); // adding .first will prevent results from being an object inside of an array.
        })
        .catch(err => {
          res.status(500).json(err);
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "records" : "record"} updated`
        });
      } else {
        res.status(404).json({ message: "Cohort does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "records" : "record"} deleted`
        });
      } else {
        res.status(404).json({ message: "Cohort does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
