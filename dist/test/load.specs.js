"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const api = require("./../index");
const path = require("path");
const testResourcesRootPath = path.normalize(path.join(__dirname, '../..', 'test-res'));
describe('load', function () {
    it('can load from file', async function () {
        const config = await api.fromFile({
            env: { env: 'dev' },
            file: path.join(testResourcesRootPath, 'js.js'),
            root: testResourcesRootPath
        });
        const foobar = await config.get('foo.bar');
        const foobar2 = await config.get('foo.foobar');
        const foo = await config.get('foo');
        const promise = await config.get('promise');
        const instance = await config.get('foo.instance');
        chai_1.expect(foobar).to.be.equal('foobar');
        chai_1.expect(foobar2).to.be.equal('foobarfoobar');
        chai_1.expect(foo).to.be.deep.equal({ bar: 'foobar', foobar: 'foobarfoobar', instance: 2 });
        chai_1.expect(promise).to.be.deep.equal('resolved');
        chai_1.expect(instance).to.be.equal(1);
    });
    it('can load from declaration', async function () {
        const config = await api.fromDeclaration({
            $: {
                foo: {
                    bar: 'foobar'
                }
            }
        });
        const bar = await config.get('foo.bar');
        chai_1.expect(bar).to.be.equal('foobar');
    });
    it('can load files from declaration', async function () {
        const config = await api.fromDeclaration({
            root: testResourcesRootPath,
            declaration: {
                imports: [path.join(testResourcesRootPath, 'js.js')]
            },
            env: { env: 'dev' },
            $: {
                foo: {
                    bar2: 'foobar'
                }
            }
        });
        const bar2 = await config.get('foo.bar2');
        chai_1.expect(bar2).to.be.equal('foobar');
        const foo = await config.get('foo');
        const promise = await config.get('promise');
        chai_1.expect(foo).to.be.deep.equal({ bar: 'foobar', foobar: 'foobarfoobar', bar2: 'foobar' });
        chai_1.expect(promise).to.be.deep.equal('resolved');
    });
    it('can load parameterized file', async function () {
        const config = await api.fromDeclaration({
            root: testResourcesRootPath,
            declaration: {
                imports: [path.join(testResourcesRootPath, 'js_%env%.json')]
            },
            env: { env: 'dev' },
            $: {
                foo: {
                    bar2: 'foobar'
                }
            }
        });
    });
});
//# sourceMappingURL=load.specs.js.map