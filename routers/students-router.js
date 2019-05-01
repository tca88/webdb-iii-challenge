const knex = require("knex");
const router = require("express").Router();

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.db3"
  },
  useNullAsDefault: true,
  debug: true
};

router.get("/", (req, res) => {
  db("cohorts") // select * from rows
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  // retrieve a role by id
  db("students")
    .where({ id: req.params.id })
    .first() // select * from rows
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
  db("students")
    .insert(req.body, ["id"]) //always put id as second argument
    .then(ids => {
      return db("students")
        .where({ id: ids[0] })
        .first() // select * from rows
        .then(student => {
          res.status(200).json(student); // adding .first will prevent results from being an object inside of an array.
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
  db("students")
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
  db("students")
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

const db = knex(knexConfig);

module.exports = router;
