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
    },
});

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

        install_tokens.push(install_token);

    }

    return install_tokens;

}

export { getInstallations };