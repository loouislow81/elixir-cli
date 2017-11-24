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
class VueScriptFile extends VueBlockFile_1.VueBlockFile {
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            const typescriptTranspiler = require("typescript");
            this.loadContents();
            if (this.pluginChain.length > 1) {
                const message = 'VueComponentClass - only one script transpiler can be used in the plugin chain';
                this.context.log.echoError(message);
                return Promise.reject(new Error(message));
            }
            if (this.pluginChain[0] === null) {
                const transpiled = typescriptTranspiler.transpileModule(this.contents.trim(), this.context.getTypeScriptConfig());
                if (this.context.useSourceMaps && transpiled.sourceMapText) {
                    const jsonSourceMaps = JSON.parse(transpiled.sourceMapText);
                    jsonSourceMaps.sources = [this.context.sourceMapsRoot + "/" + this.relativePath.replace(/\.js(x?)$/, ".ts$1")];
                    this.sourceMap = JSON.stringify(jsonSourceMaps);
                }
                this.contents = transpiled.outputText;
                this.context.debug('VueComponentClass', `using TypeScript for ${this.info.fuseBoxPath}`);
                return Promise.resolve();
            }
            this.pluginChain[0].init(this.context);
            this.collection = { name: 'default' };
            return this.pluginChain[0].transform(this);
        });
    }
}
exports.VueScriptFile = VueScriptFile;

//# sourceMappingURL=VueScriptFile.js.map
