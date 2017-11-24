"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const VueBlockFile_1 = require("./VueBlockFile");
class VueTemplateFile extends VueBlockFile_1.VueBlockFile {
    toFunction(code) {
        const vueTranspiler = require("vue-template-es2015-compiler");
        return vueTranspiler(`function render () {${code}}`);
    }
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            const vueCompiler = require("vue-template-compiler");
            this.loadContents();
            return this.pluginChain.reduce((chain, plugin) => {
                return chain.then(() => {
                    const promise = plugin.transform(this);
                    return (promise || Promise.resolve(this));
                })
                    .then(() => {
                    this.contents = JSON.parse(this.contents.replace('module.exports.default =', '').replace('module.exports =', '').trim());
                })
                    .then(() => vueCompiler.compile(this.contents));
            }, Promise.resolve())
                .then((compiled) => {
                return `Object.assign(_options, {
        _scopeId: ${this.scopeId ? JSON.stringify(this.scopeId) : null},
        render: ${this.toFunction(compiled.render)},
        staticRenderFns: [${compiled.staticRenderFns.map((t) => this.toFunction(t)).join(',')}]
      })`;
            })
                .then((contents) => {
                this.contents = contents;
            });
        });
    }
}
exports.VueTemplateFile = VueTemplateFile;

//# sourceMappingURL=VueTemplateFile.js.map
