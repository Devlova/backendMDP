'use strict';

var response = require('./res');
var connection = require('./conn');

exports.users = function(req, res) {
    connection.query('SELECT * FROM person', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.findUsers = function(req, res) {
    
    var user_id = req.params.user_id;

    connection.query('SELECT * FROM person where id = ?',
    [ user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.searchUsers = function(req, res) {
    
    var user_id = req.query.user_id;
    //console.log(`nama : ${user_id}`)
    connection.query('SELECT first_name FROM person where id = ?',
    [ user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createUsers = function(req, res) {
    
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    connection.query('INSERT INTO person (first_name, last_name) values (?,?)',
    [ first_name, last_name ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan user!", res)
        }
    });
};

exports.updateUsers = function(req, res) {
    
    var user_id = req.body.user_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    connection.query('UPDATE person SET first_name = ?, last_name = ? WHERE id = ?',
    [ first_name, last_name, user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.deleteUsers = function(req, res) {
    
    var user_id = req.body.user_id;

    connection.query('DELETE FROM person WHERE id = ?',
    [ user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};



exports.findUsersx = async function(req, res) {

    function findContact(id){
        return new Promise(resolve => {
            var query = 'SELECT * FROM contact where user_id = ?';
            connection.query(query,[ id ], function (error, rows, fields){
                if(error){
                    console.log(error)
                } else{
                    resolve(rows); //Kembalian berupa kontak data
                }
            });
        });
    }

    var user_id = req.params.user_id;

    let logs = await findContact(user_id);
    console.log(logs);

    var query = 'SELECT * FROM person where id = ?';
    connection.query(query, [ user_id ], function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            connection.end()        
            return response.ok({rows,logs}, res)
        }
    });
};