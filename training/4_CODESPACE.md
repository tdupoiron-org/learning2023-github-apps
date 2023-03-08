# Codespace

A Codespace is a virtual space that can be created from GitHub to mount a developer environment in a few seconds.
It offers a Visual Studio instance with pre-installed plugins and binaries.

## Secrets

* Go to this repository settings > Secrets and Variables > Codespaces

<img width="343" alt="image" src="https://user-images.githubusercontent.com/7711190/223699535-e34ad911-a4ff-44fb-9c77-a2029f0654cc.png">

* Create the following secrets

```
GITHUBAPP_APPID = <app_id>

GITHUBAPP_PRIVATE_KEY = <private_key>

ELASTIC_CLOUD_ID = learning-pills-mar-2023:ZXUtd2VzdC0zLmF3cy5lbGFzdGljLWNsb3VkLmNvbTo0NDMkNzExZjIwYTdmYzRhNDY4YmIxOTIyYzU3ZDlkMDNjNWIkZTJhM2VmNGYyNDZkNDRmMDhiZGNhYTYyNDM3M2NlZmE=

ELASTIC_CLOUD_USERNAME = axa

ELASTIC_CLOUD_PASSWORD = learning2023
```

These secrets will be sent automatically to the Codespace environment through environment variables.
It is a best practice to use GitHub secrets instead of having passwords hard-coded in the code.

## Codespace

* Go back to your repository home page

* Click on Code > Codespaces and start a Codespace

<img width="429" alt="image" src="https://user-images.githubusercontent.com/7711190/223702574-b6d591c6-ba37-4a72-a39b-906cc76237e2.png">

> Visual Studio will open, either on your laptop or in the browser

<img width="709" alt="image" src="https://user-images.githubusercontent.com/7711190/223703103-4d6abfa5-6237-48b8-b1c9-2453df319eb7.png">

> You can check that the secrets have been baked into the Codespace by typing `env | grep ELASTIC` in the terminal

```
@ndupoiron ➜ /workspaces/ndupoiron-learning2023 (main) $ env | grep ELASTIC
ELASTIC_CLOUD_PASSWORD=learning2023
ELASTIC_CLOUD_USERNAME=axa
ELASTIC_CLOUD_ID=learning-pills-mar-2023:ZXUtd2VzdC0zLmF3cy5lbGFzdGljLWNsb3VkLmNvbTo0NDMkNzExZjIwYTdmYzRhNDY4YmIxOTIyYzU3ZDlkMDNjNWIkZTJhM2VmNGYyNDZkNDRmMDhiZGNhYTYyNDM3M2NlZmE=
```

Your Codespace is ready 👍
