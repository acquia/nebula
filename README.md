# My repository name

[Acquia CI/CD Build Status]

[SonarQube Status Badge]

## About this repository

Explain your repository.

## Testing and Build (CI)

Proper testing is required in the pipeline.yaml and during deployments, in order to release
the application with reliability and be less prone to failures: 

- All categories should have **unit tests** when code is being developed during pull requests.
- For categories 2, 3 and 4, [lint helm charts](https://helm.sh/docs/helm/helm_lint), and [**postsync hook tests**](https://argo-cd.readthedocs.io/en/stable/user-guide/resource_hooks)
  are strongly advisable or even mandatory if the application can impact customers.

## Releasing and Deploying (CD)

A repository using CI+CD releases via ACD and follows the [Standard Release Process](https://github.com/acquia/acd/tree/master/docs/consumer_releases#standard-release-process)
