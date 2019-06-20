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

app.listen(port, () => {
    console.log(`We are live at 127.0.0.1:${port}`)
})