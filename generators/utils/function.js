exports.addFunction = functionName => {
    return `exports.${functionName} = () => {\n\n};\n\n`;
};
