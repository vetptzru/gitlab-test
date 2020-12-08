const { getJiraKeyByString } = require("../utils/common");

class GitLabService {
  netService = null;
  gitLabDomain = "";  

  constructor(netService, gitLabDomain = "") {
    this.netService = netService;
    this.gitLabDomain = gitLabDomain;    
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

  getDiffByURL = async (url) => {
    let result = null;
    try {
      const dataString = await this.netService.getByURL(url);      
      return JSON.parse(dataString);
    } catch (e) {
      console.error(e.message);
    }
    return result;
  };

  compareBranches = async (projectId, from, to) => {
    const url = `${this.gitLabDomain}/projects/${projectId}/repository/compare?from=${from}&to=${to}`;
    const result = await this.getDiffByURL(url);
    return this.mapGitlabDiff(result);
  };

  getCommitBetweenSHA = async (projectId, from, to) => {
    const url = `${this.gitLabDomain}/projects/${projectId}/repository/compare?from=${from}&to=${to}`;        
    const result = await this.getDiffByURL(url);
    return this.mapGitlabDiff(result);
  };

  getCommitBySHA = async (projectId, sha) => {
    const url = `${this.gitLabDomain}/projects/${projectId}/repository/commits/${sha}`;
    const result = await this.getDiffByURL(url);
    return result;
  }

  getCommitsBetweenDates = async (projectId, ref_name, since, until) => {
    const url = `${this.gitLabDomain}/projects/${projectId}/repository/commits/?ref_name=${ref_name}&since=${since}&until=${until}`;
    console.log(url);
    const result = await this.getDiffByURL(url);
    return result;
  }
}

module.exports = {
  GitLabService,
};
