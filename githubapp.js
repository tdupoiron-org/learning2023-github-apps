// STEP 1 : Generate a JWT

import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";

const signing_key = process.env.GITHUBAPP_PRIVATE_KEY;
const appId = process.env.GITHUBAPP_APPID;

const octokit_app = new Octokit({
    authStrategy: createAppAuth,
    auth: {
        appId: appId,
        privateKey: signing_key,
        //installationId: 35020148,
    },
});

// authenticates as app based on request URLs
/*const octokit_auth = await octokit_app.rest.apps.getAuthenticated();
  
console.log(octokit_auth);

  // creates an installation access token as needed
  // assumes that installationId 123 belongs to @octocat, otherwise the request will fail
  await octokit_app.rest.issues.create({
    owner: "ndupoiron",
    repo: "sandbox",
    title: "Hello world from ",
  });*/

// STEP 2 : Use the JWT to get the app installations

async function getInstallations() {

    var installations = await octokit_app.apps.listInstallations();

    console.log("Installations: " + installations.data);

    var install_tokens = [];

    for (var i = 0; i < installations.data.length; i++) {
        var installation = installations.data[i];

        var installationId = installation.id;
        var owner = installation.account.login;
        var type = installation.account.type;

        var token = await octokit_app.apps.createInstallationAccessToken({
            installation_id: installationId
        })

        const install_token = {
            accessToken: token.data.token,
            installationId: installationId,
            owner: owner,
            type: type
        }

        const octokit = new Octokit({
            auth: install_token.accessToken
        });

        install_tokens.push(install_token);

    }

    return install_tokens;

}

export { getInstallations };