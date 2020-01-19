import * as Config from "@frenchex/config-lib";
export { Config };
export interface ConfigurationLoadingRequestInterface extends Config.ConfigurationLoaderFromFileRequestInterface {
    user?: ConfigurationLoadingRequestUserInterface;
    global?: ConfigurationLoadingRequestUserInterface;
}
export interface ConfigurationLoadingRequestUserInterface {
    load?: boolean;
    path?: boolean;
}
export declare function fromFile(request: ConfigurationLoadingRequestInterface): Promise<Config.ConfigurationInterface>;
export declare function fromDeclaration(request: ConfigurationLoadingRequestInterface): Promise<Config.ConfigurationInterface>;
export declare function init(file: string): Promise<void>;
