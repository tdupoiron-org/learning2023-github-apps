import { Client } from '@elastic/elasticsearch'

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

export { pushDocument }