const express = require('express')
const bodyParser = require('body-parser')
const {pool} = require('./services/db')

const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.get('/', (req, res) => {
    res.send('Welcome to our Sports API')
});

app.get('/admins', (req, res) => {
    pool.connect((err, client, done) => {
        const query = 'SELECT * FROM admin_users'
        client.query(query, (error, result) => {
            done()
            if (error) {
                res.status(400).json({error})
            }
            if(result.rows < '1') {
                res.status(404).send({
                    status: 'Failed',
                    message: 'No admin information found'
                });
            } else {
                res.status(200).send({
                    status: 'Successful',
                    message: 'Admin information retrieved',
                    admins: result.rows,
                })
            }
        })
    })
})

app.post('/admins', (req, res) => {
    const data = {
        firstName: req.body.first_name,
        middleName: req.body.middle_name,
        lastName: req.body.last_name,
        created: req.body.created_at,
        username: req.body.user_name,
        password: req.body.user_password,
        email: req.body.user_email,
        login: req.body.login_time
    }

    pool.connect((err, client, done) => {
        const currentDate = new Date();
        currentDate
        const query = 'INSERT INTO admin_users(first_name, middle_name, last_name, user_name, user_password, user_email) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
        const values = [data.firstName, data.middleName, data.lastName, data.username, data.password, data.email]

        client.query(query, values, (error, result) => {
            done();
            if (error) {
                res.status(400).json({error})
            }
            res.status(202).send({
                status: 'Successful',
                result: result.rows[0],
            })
        })
    })
})

app.get('/admins/:id', (req, res) => {
    const id = req.params.id;
    pool.connect((err, client, done) => {
        const query = 'SELECT id from admin_users'
    })
    res.send(`Admins ${id} profile`)
})

app.listen(port, () => {
    console.log(`We are live at 127.0.0.1:${port}`)
})