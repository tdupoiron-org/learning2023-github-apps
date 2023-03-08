import { Octokit } from "@octokit/rest";
import { graphql } from "@octokit/graphql";

// Get authenticated user
async function getAuthenticatedUser(token) {

    const octokit = new Octokit({
        auth: token
    });

    const user = await octokit.users.getAuthenticated();
    return user.data;
}

export { getAuthenticatedUser }

// List repositories for user via graphql api
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

// List repositories for organization via graphql api
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

// List repositories for organization
async function getReposForOrg(octokit, owner) {
    const repos = await octokit.repos.listForOrg({
        org: owner
    });
    return repos.data;
}

// List issues
async function getIssues(octokit, owner, repo) {
    const issues = await octokit.issues.listForRepo({
        owner: owner,
        repo: repo,
        state: "all",
    });
    return issues.data;
}

async function getAllIssues(token, owner, type) {

    const octokit = new Octokit({
        auth: token
    });

    const graphqlWithAuth = graphql.defaults({
        headers: {
          authorization: `token ${token}`,
        },
    });
    
    var repos=[];

    if (type == "User") {
        repos.push(...await getReposForUserGraphQL(graphqlWithAuth, owner));
    } else if (type == "Organization") {
        repos.push(...await getReposForOrgGraphQL(graphqlWithAuth, owner));
    }

    var issues = [];

    for (const repo of repos) {
        console.log("Repo: " + repo.name + " (" + repo.visibility + ")");
        issues.push(...await getIssues(octokit, owner, repo.name));
    }

    return issues
}

export { getAllIssues }