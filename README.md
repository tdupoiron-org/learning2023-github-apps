# learning2023-github-apps

## [1 - Preparation](training/1_PREPARATION.md)

## [2 - Test the API using a Personal Access Token](training/2_PERSONAL_ACCESS_TOKEN.md)

## [3 - GitHub App](training/3_GITHUB_APP.md)

## [4 - Codespace](training/4_CODESPACE.md)

# Javascript

I created a small Javascript app to extract Issues from GitHub and to send them to Elasticsearch.
It is a basic nodeJs project organized in 4 files:

<img width="177" alt="image" src="https://user-images.githubusercontent.com/7711190/223730455-236e1e28-65ef-4807-8277-833e8226a4bf.png">

## githubapp.js
Most interesting module for this training. It uses the octokit Javascript GitHub library to authenticate to GitHub using the GitHub App service-to-service flow. The module provides a `getInstallations` function that connects to GitHub, lists all namespaces where the GitHub App was installed and generate an access token for each of them. The functions returns an array of install_token objects with the following info:
  * accesstoken
  * installationId
  * owner
  * type (User of Organization)
  
Behind the scene it queries GitHub API on several endpoints:

1. Generate the JWT from the appID and the private key
[Documentation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-json-web-token-jwt-for-a-github-app)

```
const signing_key = process.env.GITHUBAPP_PRIVATE_KEY;
const appId = process.env.GITHUBAPP_APPID;

const octokit_app = new Octokit({
    authStrategy: createAppAuth,
    auth: {
        appId: appId,
        privateKey: signing_key,
    },
});
```

2. Use the jwt to list GitHub App installations
[Documentation](https://docs.github.com/en/rest/apps/apps?apiVersion=2022-11-28#list-installations-for-the-authenticated-app)

```
GET https://api.github.com/app/installations
```

The octokit library hides this complexity in the following line of code:

```
var installations = await octokit_app.apps.listInstallations();
```

3. Finally, once we have found an installation, we can query the token endpoint to get an access token for this installation.
[Documentation](https://docs.github.com/en/rest/apps/apps?apiVersion=2022-11-28#create-an-installation-access-token-for-an-app)

```
POST https://api.github.com/app/installations/{installation_id}/access_tokens
```

```
var token = await octokit_app.apps.createInstallationAccessToken({
  installation_id: installationId
})
```

## github.js
This module expose a `getAllIssues` operation to list all issues for a given access token, namespace and namespace type.
Again, we are using the octokit functions to wrap the API endpoints.

```
// List repositories for user
const repos = await octokit.repos.listForUser({
    username: owner
});

// List repositories for organization
const repos = await octokit.repos.listForOrg({
    org: owner
});

// List issues
const issues = await octokit.issues.listForRepo({
    owner: owner,
    repo: repo,
    state: "all",
});
```

## elastic.js
Mirroring the GitHub modules, this file authenticate to Elastic Cloud and push Document into the github-issues indice.

```
const client = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD_ID
  },
  auth: {
    username: process.env.ELASTIC_CLOUD_USERNAME,
    password: process.env.ELASTIC_CLOUD_PASSWORD
  }
})

await client.index({
     id: issue.id,
     index: "github-issues",
     body: {
         issue
     }
 })
```

## index.js
This is the entry file that calls GitHub first to capture issues and invoke Elastic module then to push the documents to Kibana.
Indices are identified by issue_id. Hence an update on an issue updates the corresponding document in Elasticsearch.

## Usage
Make sure you created your GitHub App before and declared the following secrets into the Codespace:

* ELASTIC_CLOUD_PASSWORD
* ELASTIC_CLOUD_USERNAME
* ELASTIC_CLOUD_ID
* GITHUBAPP_APPID
* GITHUBAPP_PRIVATEKEY

Run the following commands in a terminal

1. Install npm dependencies
```
npm update
```

2. Call the index.js file with node command
````
node index.js
````

