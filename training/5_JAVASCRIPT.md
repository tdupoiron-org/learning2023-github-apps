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
I'm using the GraphQL API to list repositories for user or organization depending on the namespace.

Then I'm using the octokit library to read issues.

```
// List repositories for a user via graphql api
async function getReposForUserGraphQL(graphqlWithAuth, owner) {
    
    const query = `{
        user(login: "${owner}") {
          repositories(first: 100, affiliations: OWNER) {
            nodes {
              name
              visibility
            }
          }
        }
      }`;

    const repos = await graphqlWithAuth(query);

    return repos.user.repositories.nodes;
}

// List repositories for an organization via graphql api
async function getReposForOrgGraphQL(graphqlWithAuth, owner) {
    
    const query = `{
        organization(login: "${owner}") {
          repositories(first: 100, affiliations: OWNER) {
            nodes {
              name
              visibility
            }
          }
        }
      }`;

    const repos = await graphqlWithAuth(query);

    return repos.organization.repositories.nodes;
}

// List issues
const issues = await octokit.issues.listForRepo({
    owner: owner,
    repo: repo,
    state: "all",
});
```

## elastic.js
Mirroring the GitHub modules, this file authenticates to Elastic Cloud and push Document into the github-issues indice.

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

Call the index.js file with node command to run the script
```
node index.js
```

```
Number of installations : 3
* Installation ID: 35020988
* Owner: tdupoiron-org
* Type: Organization
  - Repo: sandbox (PRIVATE)
  - Repo: sandbox-maven (PUBLIC)
  - Repo: tdupoiron-learning2023 (PRIVATE)
  - Pushing issue 1615468117
  - Pushing issue 1535084637
* Installation ID: 35020148
* Owner: ndupoiron
* Type: User
  - Repo: sandbox (PRIVATE)
  - Repo: learning2023-github-apps (PRIVATE)
  - Pushing issue 1615468144
  - Pushing issue 1615463102
  - Pushing issue 1615459579
* Installation ID: 35012049
* Owner: tdupoiron
* Type: User
  - Repo: tdupoiron (PUBLIC)
  - Repo: github-notes (PRIVATE)
  - Repo: introduction-to-github (PRIVATE)
  - Repo: sandbox (PUBLIC)
  - Pushing issue 1427016092
  - Pushing issue 1394359247
  - Pushing issue 1374591905
````

Go to next section: [6 - Visualize results in Kibana](6_KIBANA.md)