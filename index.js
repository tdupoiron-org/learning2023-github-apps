import { pushDocument } from './elastic.js';
import { getAllIssues } from './github.js';
import { getInstallations } from './githubapp.js';

async function main() {

  const install_tokens = await getInstallations();

  for (const install_token of install_tokens) {
    console.log("Installation ID: " + install_token.installationId);
    console.log("Owner: " + install_token.owner);
    console.log("Access token: " + install_token.accessToken);
    console.log("Type: " + install_token.type);
    
    const issues = await getAllIssues(install_token.accessToken, install_token.owner, install_token.type);

    // for each issue, push it to elastic
    for (const issue of issues) {
      await pushDocument(issue);
    }

  }

}

main().catch(console.log);