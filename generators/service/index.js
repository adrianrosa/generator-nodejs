const Generator = require('yeoman-generator');
const { functionUtil } = require('../utils');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.argument('name', { type: String, required: true });
        this.option('f', { type: String, default: 'index' });
    }
    async writing() {
        const exist = await this.fs.exists(this.destinationPath(`src/services/${this.options.name}.service.js`));
        if (exist) {
            this.fs.copy(
                this.destinationPath(`./src/services/${this.options.name}.service.js`),
                this.destinationPath(`./src/services/${this.options.name}.service.js`),
                {
                    process: contents => {
                        if (!contents.toString().includes(`exports.${this.options.f} = (`))
                            return contents.toString() + functionUtil.addFunction(this.options.f);
                        return contents;
                    }
                }
            );
        } else {
            this.fs.copyTpl(
                this.templatePath('service.js'),
                this.destinationPath(`src/services/${this.options.name}.service.js`),
                {
                    functionName: this.options.f
                }
            );
        }
    }
}