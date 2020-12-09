## Usages:

### Get commits between two branches (diff):

```
const planitService = new PlanitService(new GitLabService(new NetworkService(), GITLAB_API_URL), PROJECT_ID);
planitService.getDiffBetwenBranches(branchFrom, branchTo);
```

Output:
```
[
  {
    id: '6fe882c0c8d6063413666b961e984b72de71ef5e',
    short_id: '6fe882c1',
    created_at: '2020-10-07T15:36:19.000+03:00',
    author_name: 'User Name',
    author_email: 'user@domain.ru',
    title: 'UIA-12233 add feature',       
    jiraKey: 'UIA-12233'
  },
]
```



### Get commits between two commits (diff):

```
const planitService = new PlanitService(new GitLabService(new NetworkService(), GITLAB_API_URL), PROJECT_ID);
planitService.getDiffBetweenCommits(shaFrom, shaTo);
```

Output:
```
[
  {
    id: '6fe882c0c8d6063413666b961e984b72de71ef5e',
    short_id: '6fe882c1',
    created_at: '2020-10-07T15:36:19.000+03:00',
    author_name: 'User Name',
    author_email: 'user@domain.ru',
    title: 'UIA-12233 add feature',       
    jiraKey: 'UIA-12233'
  },
]
```

## Uses GitLab API:

### Compare two branches:

#### Request:

```
https://GITLAB_DOMEN/projects/PROJECT_ID/repository/compare?from=BRANCH_FROM&to=BRANCH_TO
```

#### Response:

```

{
  "commit": {
    "id": "12d65c8dd2b2676fa3ac47d955accc085a37a9c1",
    "short_id": "12d65c8dd2b",
    "title": "JS fix",
    "author_name": "Example User",
    "author_email": "user@example.com",
    "created_at": "2014-02-27T10:27:00+02:00"
  },
  "commits": [{
    "id": "12d65c8dd2b2676fa3ac47d955accc085a37a9c1",
    "short_id": "12d65c8dd2b",
    "title": "JS fix",
    "author_name": "Example User",
    "author_email": "user@example.com",
    "created_at": "2014-02-27T10:27:00+02:00"
  }],
  "diffs": [{
    "old_path": "files/js/application.js",
    "new_path": "files/js/application.js",
    "a_mode": null,
    "b_mode": "100644",
    "diff": "--- a/files/js/application.js\n+++ b/files/js/application.js\n@@ -24,8 +24,10 @@\n //= require g.raphael-min\n //= require g.bar-min\n //= require branch-graph\n-//= require highlightjs.min\n-//= require ace/ace\n //= require_tree .\n //= require d3\n //= require underscore\n+\n+function fix() { \n+  alert(\"Fixed\")\n+}",
    "new_file": false,
    "renamed_file": false,
    "deleted_file": false
  }],
  "compare_timeout": false,
  "compare_same_ref": false
}
```

### Compare two commits:

#### Request:

```
https://GITLAB_DOMEN/projects/PROJECT_ID/repository/compare?from=COMMIT_FROM&to=COMMIT_TO
```

#### Response:

```

{
  "commit": {
    "id": "12d65c8dd2b2676fa3ac47d955accc085a37a9c1",
    "short_id": "12d65c8dd2b",
    "title": "JS fix",
    "author_name": "Example User",
    "author_email": "user@example.com",
    "created_at": "2014-02-27T10:27:00+02:00"
  },
  "commits": [{
    "id": "12d65c8dd2b2676fa3ac47d955accc085a37a9c1",
    "short_id": "12d65c8dd2b",
    "title": "JS fix",
    "author_name": "Example User",
    "author_email": "user@example.com",
    "created_at": "2014-02-27T10:27:00+02:00"
  }],
  "diffs": [{
    "old_path": "files/js/application.js",
    "new_path": "files/js/application.js",
    "a_mode": null,
    "b_mode": "100644",
    "diff": "--- a/files/js/application.js\n+++ b/files/js/application.js\n@@ -24,8 +24,10 @@\n //= require g.raphael-min\n //= require g.bar-min\n //= require branch-graph\n-//= require highlightjs.min\n-//= require ace/ace\n //= require_tree .\n //= require d3\n //= require underscore\n+\n+function fix() { \n+  alert(\"Fixed\")\n+}",
    "new_file": false,
    "renamed_file": false,
    "deleted_file": false
  }],
  "compare_timeout": false,
  "compare_same_ref": false
}
```
