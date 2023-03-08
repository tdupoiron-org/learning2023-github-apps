# GitHub App

## Registration

In this section, we are going to declare the GitHub App and install it in our namespaces.

* Go to your personal settings > Developer settings > GitHub App

<img width="317" alt="image" src="https://user-images.githubusercontent.com/7711190/223694543-a46c1d05-261c-4356-9ed4-28ec3e97cbbc.png">

* Create a new GitHub App named `<username> Issues Tracker`. It must be unique

<img width="486" alt="image" src="https://user-images.githubusercontent.com/7711190/223695594-42143c6f-38d4-40a8-a4c4-74345f7a701c.png">

* Add a dummy website url `http://localhost`. It won't be used.

<img width="497" alt="image" src="https://user-images.githubusercontent.com/7711190/223694939-7208c1e8-4eac-452d-b44f-caab1a849345.png">

* Disable the webhook

<img width="374" alt="image" src="https://user-images.githubusercontent.com/7711190/223695005-a1245d35-0920-4aff-abff-e9b98084acea.png">

* Set `read-only` access to repository permissions

<img width="758" alt="image" src="https://user-images.githubusercontent.com/7711190/223695160-71d02b77-1211-4f27-8a10-c0cc937ecb1e.png">

* Select `Any account` where the app can be installed

<img width="456" alt="image" src="https://user-images.githubusercontent.com/7711190/223695322-b329ca7c-eef3-4b04-9133-936e2e8bd158.png">

* Save

> The GitHub App is created. We will now need to generate a private key

> Save the App ID for later. It will be mentionned as <app_id>

<img width="271" alt="image" src="https://user-images.githubusercontent.com/7711190/223695994-d73abe74-c2fc-41bf-8a2c-c29d0bd40cdd.png">

## Private key

* Scroll down in your app definition and generate a private key

<img width="771" alt="image" src="https://user-images.githubusercontent.com/7711190/223696290-321492d3-a26a-4343-a884-1330a457d32b.png">

> The file is downloaded automatically to your laptop. It will be mentionned as <private_key> in the rest of the document.

## Installation

* In the menu, click on "Install App" and select the users or organizations you want to install your app on.

<img width="1012" alt="image" src="https://user-images.githubusercontent.com/7711190/223696639-be16a50e-2183-4aae-aacf-f0cac86b44ef.png">

> You can choose which repository(ies) will be accessible by the app under the scope of permissions (issues:read)

<img width="544" alt="image" src="https://user-images.githubusercontent.com/7711190/223696821-22ce41ca-1dec-4efe-b73c-29f9bf2619b2.png">

> Repeat this operation as many times as you wish

> You should select at least the namespace where this repository has been created to retrieve the initial issue posted


Now that the GitHub App has been created and installed, it can be used to query the API and reach the authorized repository issues.
A service-to-service application will authenticate using the app as follow:

1. Generate a JWT using the `<app_id>` and the `<private_key>`

2. Query the API using the JWT as a token to list installations

3. Claim an access token for a given installation

4. Use the access token to query the business operations

Go to next section: [4 - Create a GitHub App](4_GITHUB_APP.md)