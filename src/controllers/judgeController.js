const LeetCode = require("leetcode-query").LeetCode;
const leetcode = new LeetCode();
// const logger = require('../utils/logger');

const getSolvedProblemsByUsername = async (req, res) => {
  // logger.info(`Received request for solved problems for user: ${req.params.username}`);
  const username = req.params.username;
  console.log(username)
  try {
    await leetcode.user(username).then((result) => res.json(result));

    // logger.info(`Scraped solved problems for user: ${username}`);
  } catch (error) {
    // logger.error(`Error scraping solved problems for user: ${username}.Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}

// const fetchSubmissions = (username) => {
//   const query = `query ($username: String!) {
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

//   leetcode.graphql(
//     {
//       variables: {
//         username: username
//       },
//       query: query,
//     }
//   ).then((result) => {
//     return result;
//   });
// }

module.exports = {
  getSolvedProblemsByUsername
}
