function getJiraKeyByString(string) {
  const JiraKeyTemplate = new RegExp("^[A-Za-z]{1,5}-[0-9]{1,10}");
  const match = JiraKeyTemplate.exec(string);
  if (match) {
    return match[0];
  }
  return null;
}

function groupCommitsByKey(commits, key) {
  const map = new Map();
  commits.forEach((commit) => {
    if (!map.has(commit[key])) {
      map.set(commit[key], commit);
    }
  });
  return Array.from(map.values());
}

module.exports = {
  getJiraKeyByString,
  groupCommitsByKey,
};
