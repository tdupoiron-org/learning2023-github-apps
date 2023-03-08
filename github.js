import { Octokit } from "@octokit/rest";

// Get authenticated user
async function getAuthenticatedUser(token) {

    const octokit = new Octokit({
        auth: token
    });

    const user = await octokit.users.getAuthenticated();
    return user.data;
}

export { getAuthenticatedUser }

// List repositories for user
async function getReposForUser(octokit, owner) {
    const repos = await octokit.repos.listForUser({
        username: owner
    });
    return repos.data;
}

// List repositories for organization
async function getReposForOrg(octokit, owner) {
    const repos = await octokit.repos.listForOrg({
        org: owner
    });
    return repos.data;
}

// For each repository, list issues
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
    
    var repos=[];

    if (type == "User") {
        repos.push(...await getReposForUser(octokit, owner));
    } else if (type == "Organization") {
        repos.push(...await getReposForOrg(octokit, owner));
    }

    var issues = [];

    for (const repo of repos) {
        console.log("Repo: " + repo.name);
        issues.push(...await getIssues(octokit, owner, repo.name));
    }

    return issues
}

export { getAllIssues }