import * as Config from "@frenchex/config-lib"

export {Config}

export interface ConfigurationLoadingRequestInterface extends Config.ConfigurationLoaderFromFileRequestInterface {
    user?: ConfigurationLoadingRequestUserInterface
    global?: ConfigurationLoadingRequestUserInterface
}

export interface ConfigurationLoadingRequestUserInterface {
    load?: boolean
    path?: boolean
}

async function from(request: ConfigurationLoadingRequestInterface): Promise<Config.ConfigurationLoader> {
    const l = new Config.ConfigurationLoader();

    const imports = [];
    if (request.user && request.user.load && request.user.path)
        imports.push(request.user.path);

    if (request.global && request.global.load && request.global.path)
        imports.push(request.global.path)

    request.declaration = request.declaration || <any>{};
    if (request.declaration.imports)
        request.declaration.imports = request.declaration.imports.concat(imports);
    else
        request.declaration.imports = imports;

    return l;
}

export async function fromFile(request: ConfigurationLoadingRequestInterface): Promise<Config.ConfigurationInterface> {
    const l = await from(request);
    const c = await l.fromFile(request);

    return c;
}

export async function fromDeclaration(request: ConfigurationLoadingRequestInterface): Promise<Config.ConfigurationInterface> {
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

export async function init(file: string): Promise<void> {
    const init = new Config.ConfigurationInit();
    return await init.init(file);
}

export async function save(config: Config.ConfigurationInterface, toFile: string): Promise<void> {
    await config.save(toFile)
}
