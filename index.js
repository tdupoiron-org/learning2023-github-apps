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

async function pushDocument() {

    await client.index({
        id: "1",
        index: "github-issues",
        body: {
            repository: "testrepo",
            id: "1",
            title: "Test issue",
            body: "This is a test issue",
            creationDate: new Date(),
            creationUser: "testuser",
            status: "open",
            tags: ["test", "javascript"],
            closed: false,
            nbOfComments: 0
        }
    })

    await client.indices.refresh({index: 'github-issues'});
}

pushDocument().catch(console.log)