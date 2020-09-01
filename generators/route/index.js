const Generator = require('yeoman-generator');
const service = require('./route-service');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.argument('verb', { type: String, required: true });
        this.argument('path', { type: String, required: true });
        this.argument('ctrl', { type: String, required: true });
        this.argument('func', { type: String, required: true });
        this.option('cE', { type: Boolean, default: false });
    }
    writing() {
        this.log('Creating files ...');

        const httpVerb = this.options.verb.toLowerCase();
        const path = this.options.path;
        let controllerName = this.options.ctrl;

        let content = service.getRoute(controllerName, this.options.func, httpVerb, path);

        if (this.options.cE) {
            this.fs.copy(
                this.destinationPath(`./src/controllers/${controllerName}.controller.js`),
                this.destinationPath(`./src/controllers/${controllerName}.controller.js`),
                {
                    process: contents => {
                        if (!contents.toString().includes(`exports.${this.options.func} = (`))
                            return service.addFunctionInModule(contents.toString(), this.options.func);
                        return contents;
                    }
                }
            )
        } else {
            this.fs.copyTpl(
                this.templatePath('controller.js'),
                this.destinationPath(`src/controllers/${controllerName}.controller.js`),
                {
                    name: controllerName,
                    functionName: this.options.func
                }
            );
        }

        // Add route (check if the require exists)
        this.fs.copy(
            this.destinationPath('./routes.js'),
            this.destinationPath('./routes.js'),
            { 
              process: function (contents) {
                if (controllerName && !contents.toString().includes(`require('./src/controllers/${controllerName}.controller.js')`)) {
                    contents = `const ${controllerName} = require('./src/controllers/${controllerName}.controller.js');\n` + contents;
                }
                contents = contents.toString().replace('\nmodule.exports = router;', '');
                return contents += content + '\nmodule.exports = router;\n';
              }
            }
        );
    }
}