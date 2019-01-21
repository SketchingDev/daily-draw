# Draw by Days

[![Build Status](https://img.shields.io/circleci/project/github/SketchingDev/draw-by-days/master.svg)](https://circleci.com/gh/SketchingDev/draw-by-days/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/SketchingDev/draw-by-days/badge.svg?branch=master)](https://coveralls.io/github/SketchingDev/draw-by-days?branch=master)

Draw-by-days provides artists (amateur or professional) with an image a day to practice their particular
artistry. The more days you do the better you'll get.

Aside from hopefully being a useful platform for artists, it provides me with practical experience iteratively
developing an AWS based serverless project!

## Development

* Service-oriented architecture
* Monorepo managed by Lerna
* Yarn
* Node/TypeScript

## Deployment

* Terraform (infrastructure-as-code)
* Terragrunt
* Terratest

### Directory structure

```
deployment/     # Terraform files relating to the deployment
  environments/ # Configuration of services for each environment
  modules/      # Reusable modules
  services/     # Services that are comprised of reusable modules (i.e. image-api that will make use of Lambda/API Gateway and Dynamo DB)
```

## Services

Each service has a directory under:
  * `packages/` - code
  * `deployment/services` - infrastructure

* `website/` - [README](packages/website/README.md) - Front-end website that will display a single image
* `image-api/` - [README](packages/image-api/README.md) - API that serves images
