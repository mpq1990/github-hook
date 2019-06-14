# github-hook

[![Build Status](https://travis-ci.com/mpq1990/github-hook.svg?branch=master)](https://travis-ci.com/mpq1990/github-hook)

###TO RUN WITH DOCKER:
- go to the folder where the Dockerfile is:

- BUILD THE IMAGE:
```
  docker build -t name_of_image
```
- RUN THE IMAGE:
```
  docker run -e SLACK_TOKEN='your_slack_token' -e SECRET_TOKEN='your_secret_token' -p 3000:3000 -d name_of_image
```
