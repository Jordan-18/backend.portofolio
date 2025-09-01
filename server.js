const express = require('express')
const session = require('express-session')
const cors = require('cors')
const dotenv = require('dotenv'); dotenv.config()
const datawebsite = require('./Modules/datawebsite/Routes/datawebsite.route.js')
const experience = require('./Modules/experience/Routes/experience.route.js')
const education = require('./Modules/education/Routes/education.route.js')
const about = require('./Modules/about/Routes/about.route.js')
const language = require('./Modules/language/Routes/language.route.js')

const app = express();
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized:false, 
    cookie: { maxAge: oneDay }
}));

app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));

app.use(education)
app.use(experience)
app.use(about)
app.use(language)

app.use(datawebsite)

app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
  
    const intervalId = setInterval(() => {
      res.write(`data: ${JSON.stringify({ message: 'Hello from the server!' })}\n\n`);
    }, 1000);
  
    req.on('close', () => {
      clearInterval(intervalId);
    });
});

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));