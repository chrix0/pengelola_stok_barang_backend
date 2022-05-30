const express = require('express')
const sqlite3 = require('sqlite3')
const app = express();

const db = new sqlite3.Database('data.db')
db.run('CREATE TABLE IF NOT EXISTS AKUN (username TEXT PRIMARY KEY, nama TEXT, password TEXT, role TEXT, notelp TEXT')
db.run('CREATE TABLE IF NOT EXISTS BARANG (id TEXT PRIMARY KEY, nama TEXT, idSupplier TEXT, stok INT')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('READY')
  })


//TABEL AKUN
app.get('/users/list', (req,res) =>{
    db.all('SELECT * FROM AKUN', (err, data) => {
        if (err){
            res.status(500)
            res.send(err.message)
        }
        else{
            res.send(data)
        }
    })
})

app.delete('/users/:id', (req,res) => {
    db.run('DELETE FROM AKUN WHERE id = ?', [req.params.id], function(err){
        if (err){
            res.status(500)
            res.send({status : 'NG'})
        }
        else{
            res.send({status : 'OK'})
        }
        res.end()
    })
})

app.post('/signup/submit', (req,res) =>{
    db.run('INSERT INTO AKUN (username, nama, password, role, notelp) VALUES (?,?,?,?,?)', [req.body.username, req.body.nama, req.body.password, req.body.role, req.body.notelp], function(err){
        if (err){
            res.status(500)
            res.send({status : 'NG'})
        }
        else{
            res.send({status : 'OK'})
        }
        res.end()
    })
})

app.post('/login/submit', (req,res) => {
    db.get('SELECT * FROM AKUN WHERE USERNAME = ? AND PASSWORD = ?', [req.body.username, req.body.password], (err, data) => {
        if (err){
            res.status(500)
            res.send({status : 'NG'})
        }
        else{
            if(data){
                res.send({status : 'OK'})
            }
            else{
                res.send({status : 'NOT FOUND'})
            }
            res.end()
        }
    })
})

app.put('/users/:id', (req,res) =>{
    db.run('UPDATE AKUN SET PASSWORD = ? WHERE USERNAME = ?', [req.body.username], function(err) {
        if (err){
            res.status(500)
            res.send({status : 'NG'})
        }else{
            res.send({status : 'OK'})
        }
        res.end()
    })
})

// BARANG
app.get('/barang', (req,res) =>{
    db.all('SELECT * FROM BARANG', (err,data) =>{
        if(err){
            res.status(500)
            res.send(err.message)
        }
        else{
            res.send(data)
        }
    })
})

