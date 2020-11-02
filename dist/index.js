"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config = require("@frenchex/config-lib.ts");
exports.Config = Config;
async function from(request) {
    const l = new Config.ConfigurationLoader();
    const imports = [];
    if (request.user && request.user.load && request.user.path)
        imports.push(request.user.path);
    if (request.global && request.global.load && request.global.path)
        imports.push(request.global.path);
    request.declaration = request.declaration || {};
    if (request.declaration.imports)
        request.declaration.imports = request.declaration.imports.concat(imports);
    else
        request.declaration.imports = imports;
    return l;
}
async function fromFile(request) {
    const l = await from(request);
    const c = await l.fromFile(request);
    return c;
}
exports.fromFile = fromFile;
async function fromDeclaration(request) {
    const l = await from(request);
    const c = await l.fromDeclaration({
        root: request.root,
        $: request.$,
        env: request.env,
        configuration: request.configuration,
        declaration: request.declaration
    });
    return c;
}
exports.fromDeclaration = fromDeclaration;
async function init(file) {
    const init = new Config.ConfigurationInit();
    return await init.init(file);
}
exports.init = init;
async function save(config, toFile) {
    return await config.save(toFile);
}
exports.save = save;
//# sourceMappingURL=index.js.map