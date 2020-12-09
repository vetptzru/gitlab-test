const { NetworkService } = require("./services/network-service");
const { GitLabService } = require("./services/gitlab-service");
const { PlanitService } = require("./services/planit-service");
const { GITLAB_API_URL, PROJECT_ID } = require("./constants");

const planitService = new PlanitService(
  new GitLabService(new NetworkService(), GITLAB_API_URL),
  PROJECT_ID
);

async function compareBranches(branchFrom, branchTo) {
  const result = await planitService.getDiffBetwenBranches(
    branchFrom,
    branchTo
  );
  result.forEach(({ jiraKey, author_name }) => {
    console.log(`${jiraKey} by ${author_name}`);
  });
}

async function compareCommitBySHA(shaFrom, shaTo) {
  const result = await planitService.getDiffBetweenCommits(shaFrom, shaTo);
  result.forEach(({ jiraKey, author_name }) => {
    console.log(`${jiraKey} by ${author_name}`);
  });
}

compareCommitBySHA(
  "185d897b1e655a7483de1f1a6cf1c7172fb1f114",
  "8e70e4d45a02992f24ec1cc44cf48706285748c7"
);

compareBranches("21-1_SPB_FT7", "master");