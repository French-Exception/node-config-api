import "mocha"
import {expect} from "chai"
import * as api from "./../src/index"
import * as path from "path"

const testResourcesRootPath = path.normalize(path.join(__dirname, '..', '..', 'test-res'));

describe('load', function () {
    it('can load from file', async function () {

        const config = await api.fromFile({
            env: {env: 'dev'},
            file: path.join(testResourcesRootPath, 'js.js'),
            root: testResourcesRootPath
        })

        const foobar = await config.get<string>('foo.bar');
        const foobar2 = await config.get<string>('foo.foobar');
        const foo = await config.get<{ bar: string, foobar: string }>('foo');
        const promise = await config.get<string>('promise');

        expect(foobar).to.be.equal('foobar');
        expect(foobar2).to.be.equal('foobarfoobar');
        expect(foo).to.be.deep.equal({bar: 'foobar', foobar: 'foobarfoobar'});
        expect(promise).to.be.deep.equal('resolved');

    })

    it('can load from declaration', async function () {

        const config = await api.fromDeclaration({
            $: {
                foo: {
                    bar: 'foobar'
                }
            }
        })

        const bar = await config.get<string>('foo.bar');
        expect(bar).to.be.equal('foobar');
    })
});
