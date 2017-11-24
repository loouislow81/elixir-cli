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
const CSSplugin_1 = require("../stylesheet/CSSplugin");
const PostCSSPlugins_1 = require("./PostCSSPlugins");
class VueStyleFile extends VueBlockFile_1.VueBlockFile {
    fixSourceMapName() {
        if (this.context.useSourceMaps && this.sourceMap) {
            const jsonSourceMaps = JSON.parse(this.sourceMap);
            jsonSourceMaps.sources = jsonSourceMaps.sources.map((source) => {
                const fileName = source.substr(source.lastIndexOf('/') + 1);
                const dirPath = this.relativePath.substr(0, this.relativePath.lastIndexOf('/') + 1);
                return `${dirPath}${fileName}`;
            });
            this.sourceMap = JSON.stringify(jsonSourceMaps);
        }
    }
    applyScopeIdToStyles(scopeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const postcss = require('postcss');
            const plugins = [
                PostCSSPlugins_1.TrimPlugin(),
                PostCSSPlugins_1.AddScopeIdPlugin({ id: scopeId })
            ];
            return postcss(plugins).process(this.contents, {
                map: false
            }).then((result) => {
                this.contents = result.css;
            });
        });
    }
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadContents();
            if (!this.contents) {
                return Promise.resolve();
            }
            const pluginChainString = this.pluginChain.map((plugin) => plugin.constructor.name).join(' → ');
            this.context.debug('VueComponentClass', `using ${pluginChainString} for ${this.info.fuseBoxPath}`);
            return this.pluginChain.reduce((chain, plugin) => {
                return chain.then(() => {
                    if (plugin instanceof CSSplugin_1.CSSPluginClass && this.block.scoped) {
                        return this.applyScopeIdToStyles(this.scopeId);
                    }
                    return Promise.resolve();
                })
                    .then(() => {
                    const promise = plugin.transform(this);
                    return (promise || Promise.resolve());
                });
            }, Promise.resolve(this))
                .then(() => {
                this.fixSourceMapName();
                return Promise.resolve();
            });
        });
    }
}
exports.VueStyleFile = VueStyleFile;

//# sourceMappingURL=VueStyleFile.js.map
