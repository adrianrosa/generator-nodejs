const Generator = require('yeoman-generator');
const { filesystem } = require('../utils');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.option('name', { type: String, default: 'project-name' });
        this.option('description', { type: String, default: 'description' });
        this.option('repository', { type: String, default: '' });
        this.option('license', { type: String, default: 'ISC' });
    }
    async writing() {
        this.log('Creating files ...');
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath(`package.json`),
            {
              name: this.options.name,
              description: this.options.description,
              repository: this.options.repository,
              license: this.options.license
            },
        );
        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath('README.md'),
            {
                name: this.options.name,
                description: this.options.description
            }
        );
        this.fs.copyTpl(
            this.templatePath('gitignore-file'),
            this.destinationPath('.gitignore')
        );
        this.fs.copyTpl(
            this.templatePath('.eslintrc.json'),
            this.destinationPath('.eslintrc.json')
        );
        this.fs.copyTpl(
            this.templatePath('.prettierrc'),
            this.destinationPath('.prettierrc')
        );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
        );
        this.createConfigFiles();
        this.createSrcFiles();
    }
    installingDependencies() {
        const dependencies = [
            'body-parser',
            'cors',
            'dotenv',
            'express',
            'express-rate-limit',
            'morgan',
            'helmet',
            'winston',
        ];
        this.npmInstall(dependencies);
        const devDependencies = [
            '@babel/core',
            '@babel/preset-env',
            'babel-loader',
            'eslint',
            'eslint-config-standard',
            'eslint-plugin-import',
            'eslint-plugin-node',
            'eslint-plugin-promise',
            'eslint-plugin-standard',
            'jest',
            'nodemon',
            'prettier',
            'supertest',
            'webpack',
            'webpack-cli'
        ];
        this.npmInstall(devDependencies, {'save-dev': true});
    }
    createConfigFiles() {
        this.fs.copyTpl(
            this.templatePath('configs/.env.local'),
            this.destinationPath('configs/.env')
        );
        const envs = ['development', 'staging', 'production'];
        envs.forEach(env => {
            this.fs.copyTpl(
                this.templatePath('configs/.env.local'),
                this.destinationPath(`configs/.env.${env}`)
            );
        });
    }
    createSrcFiles() {
        this.fs.copyTpl(
            this.templatePath('app.js'),
            this.destinationPath('src/app.js')
        );
        this.fs.copyTpl(
            this.templatePath('server.js'),
            this.destinationPath('src/server.js')
        );
        this.fs.copyTpl(
            this.templatePath('routes.js'),
            this.destinationPath(`src/routes.js`)
        );
        this.fs.copyTpl(
            this.templatePath('client/http.client.js'),
            this.destinationPath('src/clients/http.client.js')
        );
        filesystem.createFolder(`src/controllers/`);
        filesystem.createFolder(`src/services/`);
        filesystem.createFolder(`src/models/`);
        filesystem.createFolder(`src/utils/`);
        filesystem.createFolder(`src/tests/`);
        this.fs.copyTpl(
            this.templatePath('controller/controller.js'),
            this.destinationPath('src/controllers/controller.js')
        );
        this.fs.copyTpl(
            this.templatePath('service/service.js'),
            this.destinationPath('src/services/service.js')
        );
        this.fs.copyTpl(
            this.templatePath('model/model.js'),
            this.destinationPath('src/models/model.js')
        );
        this.fs.copyTpl(
            this.templatePath('middleware/middleware.js'),
            this.destinationPath('src/middlewares/middleware.js')
        );
        this.fs.copyTpl(
            this.templatePath('util/error/custom.error.js'),
            this.destinationPath('src/utils/error/custom.error.js')
        );
        this.fs.copyTpl(
            this.templatePath('util/error/handler.error.js'),
            this.destinationPath('src/utils/error/handler.error.js')
        );
        this.fs.copyTpl(
            this.templatePath('util/log/index.js'),
            this.destinationPath('src/utils/log/index.js'),
            {
                name: this.options.name
            }
        );
        filesystem.createFolder(`dist/`);
        this.fs.copyTpl(
            this.templatePath('tests/test.config.json'),
            this.destinationPath('src/tests/test.config.json')
        );
        this.fs.copyTpl(
            this.templatePath('tests/unit.spec.js'),
            this.destinationPath('src/tests/unit/unit.spec.js')
        );
        this.fs.copyTpl(
            this.templatePath('tests/functional.unmocked.spec.js'),
            this.destinationPath('src/tests/functional/functional.unmocked.spec.js')
        );
        this.fs.copyTpl(
            this.templatePath('tests/functional.mocked.spec.js'),
            this.destinationPath('src/tests/functional/functional.mocked.spec.js')
        );
        this.fs.copyTpl(
            this.templatePath('tests/integration.spec.js'),
            this.destinationPath('src/tests/integration/integration.spec.js')
        );
        this.fs.copyTpl(
            this.templatePath('gitkeep-file'),
            this.destinationPath('src/tests/smoke/.gitkeep')
        );
    }
};
