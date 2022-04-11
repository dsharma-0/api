const express = require("express");
const moment = require("moment");
const mySecret = process.env['token']
const { valid } = require("./tokens.json");
const { lines } = require("./lines.json");
const axios = require('axios')
const app = express();
const cheerio = require('cheerio')
let date_time = new Date();

// get current date
// adjust 0 before single digit date
let date = ("0" + date_time.getDate()).slice(-2);

// get current month
let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

// get current year
let year = date_time.getFullYear();

// get current hours
let hours = date_time.getHours();

// get current minutes
let minutes = date_time.getMinutes();

// get current seconds
let seconds = date_time.getSeconds();

// prints date & time in YYYY-MM-DD HH:MM:SS format
console.log(date + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds);
app.get('/', (req, res) => {
	res.json("Welcome to my api" + "type : /quote ; /lines "+
           'at the end')
});
app.get('/hi', (req, res) => {
	res.json("`www.google.com`")
})

app.get("/lines", (request, response) => {
  if(!request.query || !request.query.token || !validateToken(request.query.token)) { 
    return response.json({error: "Invalid Token added!"});
  }
  const TimeObject = {
     "line(English)": `${lines[Math.floor(Math.random()*lines.length)]}` + '❤😝',
    "line(Hindi)": `${myArray[Math.floor(Math.random()*myArray.length)]}` + '❤😝'
  }
  console.log("Api access for /lines");
  response.json(TimeObject);
})

app.listen(80, () => {
  console.log("Website online on port 80");
})

function validateToken(token) {
  if(valid.includes(token)) {
    return true;
  } else {
    return false;
  }
}

let quote = {}
let q = null
let a = null

app.get('/lines-quote', (req, res) => {
	const url = `https://zenquotes.io/`
	axios.get(url).then(response => {
		const $ = cheerio.load(response.data)

		$('div[id="carousel-quote-1"]').each(function () {
			$(this).find('div > h1').each(function (index, element) {
				quote['quote'] = $(element).text()
			})
			$(this).find('div > p').each(function () {
				quote['author'] = $(this).text()
			})
		})
		res.json(quote)
	})
})

app.get("/logo", (request, response) => {
  const TimeObject1 = {
    "url": `https://cdn.discordapp.com/icons/773668217163218944/a_6a5521bea97de4e7b2f3b3f90c573e14.gif`,
    "size": `256`,
    "type": `.gif`
  }
  console.log("Api access for /logo");
  response.json(TimeObject1);
});
app.use(express.json());
app.post('/',(req,resp)=> {
console.log(req.body)
  resp.send(req.body)
});

var myArray = [
  `somase m hota hai aalu.... \n kya m tumhe patalu?`, 
"she: kya kar rehe ho? Answer :tumhe patne ki khosih", 
"question : kaise ho? Answer : jese tumhare mummy dhund rahe hai",
 
];
