const LeetCode = require("leetcode-query").LeetCode;
const leetcode = new LeetCode();
// const logger = require('../utils/logger');

const getSolvedProblemsByUsername = async (username) => {
  console.log(username)
  try {
    const solvedProblems = await leetcode.user(username);
    return solvedProblems;
  } catch (error) {
    throw error;
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
