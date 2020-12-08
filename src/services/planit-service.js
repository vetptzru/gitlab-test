const { groupCommitsByKey } = require("../utils/common");

class PlanitService {
  gitLabService = null;
  projectId = null;

  constructor(gitLabService, projectId) {
    this.gitLabService = gitLabService;
    this.projectId = projectId;
  }

  getDiffBetwenBranches = async (from, to) => {
    const commits = await this.gitLabService.compareBranches(
      this.projectId,
      from,
      to
    );
    const groupCommits = groupCommitsByKey(
      commits.filter(({ jiraKey }) => Boolean(jiraKey)),
      "jiraKey"
    );
    return groupCommits;
  };

  _getDiffBetweenCommits = async (branch, from, to) => {
    const commitFrom = await this.gitLabService.getCommitBySHA(
      this.projectId,
      from
    );
    const commitTo = await this.gitLabService.getCommitBySHA(
      this.projectId,
      to
    );
    const commits = await this.gitLabService.getCommitsBetweenDates(
      this.projectId,
      branch,
      commitFrom["created_at"],
      commitTo["created_at"]
    );
    return commits;
  };

  getDiffBetweenCommits = async (from, to) => {
    const result = await this.gitLabService.getCommitBetweenSHA(
      this.projectId,
      from,
      to
    );
    return result;
  };
}

module.exports = {
  PlanitService,
};
