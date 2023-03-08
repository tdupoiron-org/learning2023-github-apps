# learning2023-github-apps

## [1 - Preparation](training/1_PREPARATION.md)

## [2 - Test the API using a Personal Access Token](training/2_PERSONAL_ACCESS_TOKEN.md)

## [3 - GitHub App](training/3_GITHUB_APP.md)

## [4 - Codespace](training/4_CODESPACE.md)

# Javascript

I created a small Javascript app to extract Issues from GitHub and to send them to Elasticsearch.
It is a basic nodeJs project organized in 4 files:

* githubapp.js
Most interesting module for this training. It uses the octokit Javascript GitHub library to authenticate to GitHub using the GitHub App service-to-service flow. The module provides a `getInstallations` function that connects to GitHub, lists all namespaces where the GitHub App was installed and generate an access token for each of them. The functions returns an array of install_token objects with the following info:
  * accesstoken
  * installationId
  * owner
  * type (User of Organization)
  
Behind the scene it queries GitHub API on several endpoints:

1. Generate the JWT from the appID and the private key
https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-json-web-token-jwt-for-a-github-app

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
Documentation


```
npm update
```
