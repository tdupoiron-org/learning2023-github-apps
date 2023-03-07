import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function getIssues() {
  const issues = await octokit.issues.listForRepo({
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    state: "all",
  });
  return issues.data;
}

export { getIssues };