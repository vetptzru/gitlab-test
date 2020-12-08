const { getJiraKeyByString } = require("../utils/common");

class GitLabService {
  netService = null;
  gitLabDomain = "";
  gitLabToken = "";

  constructor(netService, gitLabDomain = "", gitLabToken = "") {
    this.netService = netService;
    this.gitLabDomain = gitLabDomain;
    this.gitLabToken = gitLabToken;
  }

  mapGitlabDiff(data) {
    if (data.commits && Array.isArray(data.commits)) {
      return data.commits
        .map(
          ({ id, short_id, created_at, author_name, author_email, title }) => ({
            id,
            short_id,
            created_at,
            author_name,
            author_email,
            title,
            jiraKey: getJiraKeyByString(title),
          })
        )
        .filter(({ jiraKey }) => Boolean(jiraKey));
    }
    return [];
  }

  compareBranches = async (projectId, from, to) => {
    const url = `${this.gitLabDomain}/projects/${projectId}/repository/compare?from=${from}&to=${to}&access_token=${this.gitLabToken}`;
    let result = null;
    try {
      const dataString = await this.netService.getByURL(url);
      const obj = JSON.parse(dataString);
      result = this.mapGitlabDiff(obj);
    } catch (e) {
      console.error(e.message);
    }
    return result;
  };
}

module.exports = {
  GitLabService,
};
