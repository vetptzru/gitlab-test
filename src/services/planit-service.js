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
}

module.exports = {
  PlanitService,
};
