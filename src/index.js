const { NetworkService } = require("./services/network-service");
const { GitLabService } = require("./services/gitlab-service");
const { PlanitService } = require("./services/planit-service");
const { AUTH_TOKEN, GITLAB_API_URL, PROJECT_ID } = require("./constants");

const planitService = new PlanitService(
  new GitLabService(new NetworkService(), GITLAB_API_URL, AUTH_TOKEN),
  PROJECT_ID
);

async function main() {
  const result = await planitService.getDiffBetwenBranches(
    "21-1_SPB_FT7",
    "master"
  );
  result.forEach(({ jiraKey, author_name }) => {
    console.log(`${jiraKey} by ${author_name}`);
  });
}

main();
