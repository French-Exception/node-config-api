"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
require("mocha");
var chai_1 = require("chai");
var api = require("./../src/index");
var path = require("path");
var testResourcesRootPath = path.normalize(path.join(__dirname, '..', '..', 'test-res'));
describe('load', function () {
    it('can load from file', function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, foobar, foobar2, foo, promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.fromFile({
                            env: { env: 'dev' },
                            file: path.join(testResourcesRootPath, 'js.js'),
                            root: testResourcesRootPath
                        })];
                    case 1:
                        config = _a.sent();
                        return [4 /*yield*/, config.get('foo.bar')];
                    case 2:
                        foobar = _a.sent();
                        return [4 /*yield*/, config.get('foo.foobar')];
                    case 3:
                        foobar2 = _a.sent();
                        return [4 /*yield*/, config.get('foo')];
                    case 4:
                        foo = _a.sent();
                        return [4 /*yield*/, config.get('promise')];
                    case 5:
                        promise = _a.sent();
                        chai_1.expect(foobar).to.be.equal('foobar');
                        chai_1.expect(foobar2).to.be.equal('foobarfoobar');
                        chai_1.expect(foo).to.be.deep.equal({ bar: 'foobar', foobar: 'foobarfoobar' });
                        chai_1.expect(promise).to.be.deep.equal('resolved');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('can load from declaration', function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, bar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.fromDeclaration({
                            $: {
                                foo: {
                                    bar: 'foobar'
                                }
                            }
                        })];
                    case 1:
                        config = _a.sent();
                        return [4 /*yield*/, config.get('foo.bar')];
                    case 2:
                        bar = _a.sent();
                        chai_1.expect(bar).to.be.equal('foobar');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('can load files from declaration', function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, bar2, foo, promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.fromDeclaration({
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
                        })];
                    case 1:
                        config = _a.sent();
                        return [4 /*yield*/, config.get('foo.bar2')];
                    case 2:
                        bar2 = _a.sent();
                        chai_1.expect(bar2).to.be.equal('foobar');
                        return [4 /*yield*/, config.get('foo')];
                    case 3:
                        foo = _a.sent();
                        return [4 /*yield*/, config.get('promise')];
                    case 4:
                        promise = _a.sent();
                        chai_1.expect(foo).to.be.deep.equal({ bar: 'foobar', foobar: 'foobarfoobar', bar2: 'foobar' });
                        chai_1.expect(promise).to.be.deep.equal('resolved');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('can load parameterized file', function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.fromDeclaration({
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
                        })];
                    case 1:
                        config = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=load.specs.js.map