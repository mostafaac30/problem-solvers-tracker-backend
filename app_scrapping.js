const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const winston = require('winston');
const moment = require('moment');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});


function timeDifference(timeValue, timeUnit) {
  return moment().subtract(timeValue, timeUnit).format("MM-DD-YYYY HH:mm:ss");
}

function calculateProblemDate(timeAgo) {
  let time;
  let timeValue;
  let timeUnit;

  if (timeAgo.indexOf("second") !== -1) {
    timeUnit = "seconds";
    timeValue = timeAgo.split(" ")[0];
    time = timeDifference(timeValue, timeUnit);
  }
  else if (timeAgo.indexOf("minute") !== -1) {
    timeUnit = "minutes";
    timeValue = timeAgo.split(" ")[0];
    time = timeDifference(timeValue, timeUnit);
  }
  else if (timeAgo.indexOf("hour") !== -1) {
    timeUnit = "hours";
    timeValue = timeAgo.split(" ")[0];
    time = timeDifference(timeValue, timeUnit);
  }
  else if (timeAgo.indexOf("day") !== -1) {

    timeUnit = "days";
    timeValue = parseInt(timeAgo.split(" ")[0]);
    time = timeDifference(timeValue, timeUnit);
  }
  else if (timeAgo.indexOf("month") !== -1) {
    timeUnit = "months";
    timeValue = parseInt(timeAgo.split(" ")[0]);
    time = timeDifference(timeValue, timeUnit);
  }
  else if (timeAgo.indexOf("year") !== -1) {
    timeUnit = "years";
    timeValue = timeAgo.split(" ")[0];
    time = timeDifference(timeValue, timeUnit);
  }
  return time;
}

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}




// app.get('/solved-problems/:username', async (req, res) => {
//   logger.info(`Received request for solved problems for user: ${req.params.username}`);
//   const username = req.params.username;
//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(`https://leetcode.com/${username}/`);
//     const solvedProblems = await page.evaluate(() => {
//       const rows = Array.from(document.querySelectorAll('.flex .rounded'));
//       return rows.map((row) => {
//         const splitText = row.innerText.split("\n");
//         const problemName = splitText[0];
//         if (problemName === "Current") {
//           return undefined;
//         }
//         let time = splitText[1];


//         return { problemName, time };
//       }).filter(row => row !== undefined);
//     });

//     await browser.close();
//     logger.info(`Scraped ${solvedProblems.length} solved problems for user: ${username}`);
//     for (let p of solvedProblems) {
//       p.time = calculateProblemDate(p.time);
//     }
//     res.json({ solvedProblems });
//   } catch (error) {
//     logger.error(`Error scraping solved problems for user: ${username}. Error: ${error.message}`);
//     res.status(500).json({ error: error.message });
//   }
// });



// app.listen(3000, () => {
//   logger.info('Server listening on port 3000');
// });



// // Import the Telegram Bot library
// const TelegramBot = require('node-telegram-bot-api');
// const { json } = require('express');





// async function getProblems(username) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(`https://leetcode.com/${username}/`);
//   const solvedProblems = await page.evaluate(() => {
//     const rows = Array.from(document.querySelectorAll('.flex .rounded'));
//     return rows.map((row) => {
//       const splitText = row.innerText.split("\n");
//       const problemName = splitText[0];
//       if (problemName === "Current") {
//         return undefined;
//       }
//       let time = splitText[1];


//       return { problemName, time };
//     }).filter(row => row !== undefined);
//   });

//   await browser.close();
//   logger.info(`Scraped ${solvedProblems.length} solved problems for user: ${username}`);
//   for (let p of solvedProblems) {
//     p.time = calculateProblemDate(p.time);
//   }
//   return solvedProblems;
// }

// // Replace with your bot's token
// const token = '5071667812:AAGlPcxxl5y1YywybkS0t2r1gIu0Cntw0Ww';

// // Create a new Telegram bot
// const bot = new TelegramBot(token, { polling: true });

// // Handle incoming messages
// bot.on('message', async (msg) => {
//   const chatId = msg.chat.id;

//   // check if the message is a command 
//   if (msg.text.toString().toLowerCase().includes('/start')) {

//     let problems = await (await getProblems('Mostafa_M'));
//     //convert problems to a string separated bt \n

//     for (let i = 0; i < problems.length; i++) {
//       problems[i] = `${i + 1} - ` + problems[i].problemName
//     }
//     problems = problems.join('\n');
//     bot.sendMessage(chatId, problems);

//   } else {
//     bot.sendMessage(chatId, 'I\'m sorry, I don\'t understand what you\'re saying. Please type /start to begin.');
//   }
// });




///
const LeetCode = require("leetcode-query").LeetCode;
const leetcode = new LeetCode();
let previousUserData = leetcode.user("Mostafa_M").then(console.log);


// Check for updates every hour
// setInterval(async () => {
//   const user = await leetcode.user("Mostafa_M");
//   if (!previousUserData || previousUserData.updated_at !== user.updated_at) {
//     console.log("Profile updated!");
//     previousUserData = user;
//   } else {
//     console.log("Profile not updated.");
//   }
// }, 6000); // 60 minutes * 60 seconds * 1000 milliseconds



// const query = `query ($username: String!) {
//   matchedUser(username: $username) {
//       username
//       socialAccounts
//       githubUrl
//       profile {
//           realName
//           websites
//           countryName
//           skillTags
//           company
//           school
//           starRating
//           aboutMe
//           userAvatar
//           reputation
//           ranking
//       }
//   }
//   userStatus {
//     userId
//     username
//     avatar
//     isSignedIn
//     isMockUser
//     isPremium
//     isAdmin
//     isSuperuser
//     isTranslator
//     permissions
//   }

// }
// `;

// leetcode.graphql(
//   {
//     variables: {
//       username: "Mostafa_M"
//     },
//     query: query,
//   }
// ).then((result) => {
//   console.log(result);
// });

// app.get('/solved-problems/:username', async (req, res) => {
//   logger.info(`Received request for solved problems for user: ${req.params.username}`);
//   const username = req.params.username;
//   try {
//     await leetcode.user(username).then((result) => {
//       res.json(result);

//     });
//     logger.info(`Scraped solved problems for user: ${username}`);

//   } catch (error) {
//     logger.error(`Error scraping solved problems for user: ${username}. Error: ${error.message}`);
//     res.status(500).json({ error: error.message });
//   }
// });




//clean code for API

// const express = require('express');
// const app = express();
// const userRouter = require('/src/routes/user_router');
// const authRouter = require('/src/routes/authRouter');
const judgeRouter = require("/src/routes/judge");


// require('dotenv').config();

// // Use the user router for requests to the /user endpoint
// app.use('/user', userRouter);

// // Use the auth router for requests to the /auth endpoint
// app.use('/auth', authRouter);

// // Start the server on a specific port
// const port = 3000;
// app.listen(port, () => {
// console.log(Server is running on port ${port});
// });



