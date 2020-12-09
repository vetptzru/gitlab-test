## Usages:

### Get commits between two branches (diff):
```
const planitService = new PlanitService(new GitLabService(new NetworkService(), GITLAB_API_URL), PROJECT_ID);
planitService.getDiffBetwenBranches(branchFrom, branchTo);
```

### Get commits between two commits (diff):
```
const planitService = new PlanitService(new GitLabService(new NetworkService(), GITLAB_API_URL), PROJECT_ID);
planitService.getDiffBetweenCommits(shaFrom, shaTo);
```

## Uses GitLab API:

### Compare two branches:
```
https://GITLAB_DOMEN/projects/PROJECT_ID/repository/compare?from=BRANCH_FROM&to=BRANCH_TO
```

### Compare two commits:
```
https://GITLAB_DOMEN/projects/PROJECT_ID/repository/compare?from=COMMIT_FROM&to=COMMIT_TO
```
