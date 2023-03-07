// ELASTIC
const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD_ID
  },
  auth: {
    username: process.env.ELASTIC_CLOUD_USERNAME,
    password: process.env.ELASTIC_CLOUD_PASSWORD
  }
})

async function pushDocument(issue) {

  console.log("Pushing issue", issue.id);

    await client.index({
        id: issue.id,
        index: "github-issues",
        body: {
            issue
        }
    })

    await client.indices.refresh({index: 'github-issues'});
}

// GITHUB
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function getIssues() {
  const issues = await octokit.issues.listForRepo({
    owner: "tdupoiron",
    repo: "sandbox"
  });
  return issues.data;
}

async function main() {
  const issues = await getIssues();
  
  // for each issue, push it to elastic
  for (const issue of issues) {
    await pushDocument(issue);
  }

}

main().catch(console.log);