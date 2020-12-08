const { getDiffBetweenBranches } = require("./services/gitlab-service");


function getJiraKey(string) {
  const JiraKeyTemplate = new RegExp('^[A-Za-z]{1,5}\-[0-9]{1,10}');
  const match = JiraKeyTemplate.exec(string);
  if (match) {
    return match[0];
  }
  return null;
}

function mapGitlabDiff(data) {
  if (data.commits && Array.isArray(data.commits)) {
    return data.commits.map(({ id, short_id, created_at, author_name, author_email, title }) => ({
      id, short_id, created_at, author_name, author_email, title, jiraKey: getJiraKey(title)
    })).filter(({ jiraKey }) => Boolean(jiraKey))
  }
  return [];
}

function groupCommitsByJiraKey(commits) {
  const map = new Map();
  commits.forEach(({jiraKey, author_name}) => {
    if (!map.has(jiraKey)) {
      console.log(jiraKey);
      map.set(jiraKey, {jiraKey, author_name});
    }
  });  
  return Array.from(map.values());
}

async function main() {
  try {
    // const data = await getDiffBetweenBranches(611, "master", "21-1_SPB_FT7");
    const data = await getDiffBetweenBranches(611, "21-1_SPB_FT7", "master");
    const allCommits = mapGitlabDiff(data);
    const commitsGroupByJiraKey = groupCommitsByJiraKey(allCommits);
    console.log(commitsGroupByJiraKey);    
  } catch (e) {
    console.error(e);
  }
}

main();