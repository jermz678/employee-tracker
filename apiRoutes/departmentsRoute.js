const express = require('express');
const router = express.Router();
const db = require('../db/connection');

//creating a new department
router.post('/department', ({ body }, res) => {
    
    const sql = `INSERT INTO department (dep_name) VALUES (?)`;
    const params = [
        body.dep_name
    ];

    db.query(sql, params, (err, result)=> {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          res.json({
            message: 'success',
            data: body
          });
          startQuestions();
        });
    });





module.exports = router;