# Generator NodeJS

<b>Generator NodeJS</b> is a generic scaffolding system allowing the creation of any kind of app. It allows for rapidly getting started on new projects and streamlines the maintenance of existing projects.<br />
It is based on <a href="https://yeoman.io/" target="_blank">Yeoman</a>

## Overview

This generator creates a <a target="_blank" href="https://nodejs.org/en/">NodeJs</a> server on port 8080 with:
- <a target="_blank" href="https://www.npmjs.com/package/body-parser">Body parser</a>
- <a target="_blank" href="https://www.npmjs.com/package/cors">Cors</a>
- <a target="_blank" href="https://www.npmjs.com/package/dotenv">Dotenv</a>
- <a target="_blank" href="https://eslint.org/">Eslint</a>
- <a target="_blank" href="https://expressjs.com/">Express</a>
- <a target="_blank" href="https://www.npmjs.com/package/helmet">Helmet</a>
- <a target="_blank" href="https://www.npmjs.com/package/jest">Jest</a>
- <a target="_blank" href="https://www.npmjs.com/package/morgan">Morgan</a>
- <a target="_blank" href="https://www.npmjs.com/package/prettier">Prettier</a>
- <a target="_blank" href="https://www.npmjs.com/package/supertest">Supertest</a>
- <a target="_blank" href="https://www.npmjs.com/package/webpack">Webpack</a>

Project generated:
```
├─── configs
    .env
    .env.development
    .env.staging
    .env.production
├─── dist
├─── src
    ├─── controllers
    ├─── middlewares
    ├─── models
    ├─── services
    ├─── tests
        ├─── functional
        ├─── integration
        ├─── smoke
        ├─── unit
        test.config.json
    app.js
    routes.js
    server.js
.eslintrc.json
.prettierrc
README.md
webpack.config.json
``` 

## Getting started

1. Install yeoman: `npm install -g yeoman`
2. Clone the project
3. Download dependencies: `npm install` 
4. Create a symlink locally for the generator: `npm link`
5. Create a folder for the project: `mkdir /project-test && cd /project-test`
6. Run starter command: `yo nodejs`

## Commands

<b>Important: </b>all commands must be executed at root level.

* Create project: `yo nodejs --name=my-project --description="Description project" --repository="https://example.com/path/my-project" --license=ISC`
* Create a route: `yo nodejs:route verb /path ctrlName fncName [--cE=true]`
* Create controller: `yo nodejs:controller ctrlName [--f=fncName]`
* Create service: `yo nodejs:service servName [--f=fncName]`
* Create model: `yo nodejs:model modName [--f=fncName]`

## Debug

To debug any command (including the initial) on VS Code:
1. Attach debugger to <b>Node.JS process</b> or edit `.vscode/launch.json` and add the follow block:
```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Attach",
            "port": 9229,
            "request": "attach",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "type": "pwa-node"
        }
    ]
}
```
2. Execute: `node --inspect-brk %AppData%\npm\node_modules\yo\lib\cli.js nodejs[:command params]`
