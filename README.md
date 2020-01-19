# About

Configuration API let you use Configuration Lib with your own code.

It helps create and load User-scoped, Global-scoped and Directory-scoped Configuration files.

Configuration files can be ```.json``` or ```.js``` files returning plain JSON or 

# Installation

```bash
npm i --save @frenchex/config-api
```

# Usage 
## From File
Example loading from file (from tests) :
```typescript
import * as api from "@frenchex/config-api"

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
```

## From JS object
Example loading config from object (from tests):
```typescript

const config = await api.fromDeclaration({
    $: {
        foo: {
            bar: 'foobar'
        }
    }
})

const bar = await config.get<string>('foo.bar');
expect(bar).to.be.equal('foobar');
```


## From File & JS object

You can also do both

````typescript
const config = await api.fromFile({
    env: {env: 'dev'},
    file: path.join(testResourcesRootPath, 'js.js'),
    root: testResourcesRootPath,
    $: {
        "imports": ['my_file_%env%.json'],  
    }
})
````
