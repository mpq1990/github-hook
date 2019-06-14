# github-hook

[![Build Status](https://travis-ci.com/mpq1990/github-hook.svg?branch=master)](https://travis-ci.com/mpq1990/github-hook)

TO RUN WITH DOCKER:

- BUILD THE IMAGE:
  docker build -t mpq/git-hook
- RUN THE IMAGE:
  docker run -e SLACK_TOKEN='your_slack_token' -e SECRET_TOKEN='your_secret_token' -p 3000:3000 -d mpq/git-hook
