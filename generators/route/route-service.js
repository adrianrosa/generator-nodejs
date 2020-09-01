/**
 * Return a route with the invoke to the controller method.
 * @param {string} controllerName 
 * @param {string} functionName 
 * @param {string} httpVerb default: GET
 * @param {string} path default: /
 */
exports.getRoute = (controllerName, functionName, httpVerb = 'GET', path = '/') => {
    return `router.${httpVerb}('${path}', (req, res, next) => {\n    ${controllerName}.${functionName}(req, res, next);\n});\n\n`;
}

/**
 * Add the function into the module.
 * @param {string} moduleContent
 * @param {string} functionName
 */
exports.addFunctionInModule = (moduleContent, functionName) => {
    return moduleContent += `\n\nexports.${functionName} = (req, res, next) => {\n\n};\n\n`;
}
