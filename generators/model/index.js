const Generator = require('yeoman-generator');
const { functionUtil } = require('../utils');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.argument('name', { type: String, required: true });
        this.option('f', { type: String, default: 'index' });
    }
    async writing() {
        const exist = await this.fs.exists(this.destinationPath(`src/models/${this.options.name}.model.js`));
        if (exist) {
            this.fs.copy(
                this.destinationPath(`./src/models/${this.options.name}.model.js`),
                this.destinationPath(`./src/models/${this.options.name}.model.js`),
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
                this.templatePath('model.js'),
                this.destinationPath(`src/models/${this.options.name}.model.js`),
                {
                    functionName: this.options.f
                }
            );
        }
    }
}