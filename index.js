import { pushDocument } from './elastic.js';
import { getIssues } from './github.js';

async function main() {
  const issues = await getIssues();
  
  // for each issue, push it to elastic
  for (const issue of issues) {
    await pushDocument(issue);
  }

}

main().catch(console.log);