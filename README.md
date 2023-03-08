# learning2023-github-apps

## 1 - Preparation

This repository contains the Javascript project that we will use to extract issues insights.

* Click on "Use this template" and 'Create a new repository'

<img width="288" alt="image" src="https://user-images.githubusercontent.com/7711190/223540978-da955a31-e6fb-4ba6-b664-81163a02824f.png">

* Choose a owner and a name for the repository. Make it private, and click on "Create repository from template"

<img width="782" alt="image" src="https://user-images.githubusercontent.com/7711190/223541405-51901e8b-0961-4d52-84c5-acf34dd2600c.png">

* Create a new issue in the repository

<img width="421" alt="image" src="https://user-images.githubusercontent.com/7711190/223683488-eedf9783-666f-49d8-b9d5-45135e5036aa.png">

## 2 - Test the API using a Personal Access Token

### Personal Access Token

* Go to your Personnal settings > Developer settings > Personal access tokens (PAT)

<img width="339" alt="image" src="https://user-images.githubusercontent.com/7711190/223683800-f1a0d176-dc2f-4cc1-b2f0-d53a694f871c.png">

* Generate a classic PAT, name it `issues` and give it the `repo` permissions

<img width="478" alt="image" src="https://user-images.githubusercontent.com/7711190/223684076-8441d4ff-6989-40e8-8b41-0e67719605e6.png">

> Save token value for later

### List issues using the API

We are going to use [this operation](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#list-repository-issues) to list issues.

* Open [REST test test](https://resttesttest.com/) in a new browser tab

* Choose the `GET` method and add the following endpoint: `https://api.github.com/repos/OWNER/REPO/issues`, replacing OWNER and REPO to reflect this repo address

<img width="551" alt="image" src="https://user-images.githubusercontent.com/7711190/223685394-128902f3-052e-42ae-9f53-ed8363605eb8.png">

* Click on `Add header`, name it `Authorization` and put `Bearer <pat>` as value, using the above PAT created

<img width="553" alt="image" src="https://user-images.githubusercontent.com/7711190/223685730-85877d2f-e8d4-4192-91a1-41758296f1d9.png">

* Click on `Ajax Request` to invoke the API. The result is shown in the right panel

<img width="594" alt="image" src="https://user-images.githubusercontent.com/7711190/223685995-36526845-2d10-4f37-9105-9ef6c6422f68.png">

> Using REST test test is safe. Your token will **NOT** be transferred to the website.




Open a Codespace from the code menu

<img width="443" alt="image" src="https://user-images.githubusercontent.com/7711190/223541690-41d51294-8041-432a-a1e3-b422525b592d.png">

> It spins up a virtual environment ready to use

