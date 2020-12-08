const { getByURL } = require("./net");
const { GITLAB_API_URL, AUTH_TOKEN } = require("../constants");

async function getDiffBetweenBranches(projectId, from, to) {
  const url = `${GITLAB_API_URL}/projects/${projectId}/repository/compare?from=${from}&to=${to}&access_token=${AUTH_TOKEN}`;
  let result = null;
  try {
    const dataString = await getByURL(url);    
    result = JSON.parse(dataString);
  } catch (e) {
    console.error(e.message);
  }
  return result;
}

module.exports = {
  getDiffBetweenBranches
}