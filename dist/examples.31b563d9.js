// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"l4iut":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 61380;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "d68ad56631b563d9";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"a0t4e":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _alpinejs = require("alpinejs");
var _alpinejsDefault = parcelHelpers.interopDefault(_alpinejs);
var _editor = require("./core/editor");
var _toolbar = require("./core/Toolbar");
var _settings = require("./core/Settings");
var _debug = require("./core/utils/Debug");
/**
 * AlpineBlocks - A lightweight block-based content editor built with Alpine.js
 * 
 * This is the main entry point that sets up the editor, toolbar, and settings
 * components, and dynamically imports all available tools.
 */ // Import all tools directly to ensure they're available
var _paragraph = require("./tools/Paragraph");
var _paragraphDefault = parcelHelpers.interopDefault(_paragraph);
var _header = require("./tools/Header");
var _headerDefault = parcelHelpers.interopDefault(_header);
var _list = require("./tools/List");
var _listDefault = parcelHelpers.interopDefault(_list);
var _code = require("./tools/Code");
var _codeDefault = parcelHelpers.interopDefault(_code);
var _image = require("./tools/Image");
var _imageDefault = parcelHelpers.interopDefault(_image);
var _quote = require("./tools/Quote");
var _quoteDefault = parcelHelpers.interopDefault(_quote);
var _wysiwyg = require("./tools/WYSIWYG");
var _wysiwygDefault = parcelHelpers.interopDefault(_wysiwyg);
var _alert = require("./tools/Alert");
var _alertDefault = parcelHelpers.interopDefault(_alert);
var _videoPlayer = require("./tools/VideoPlayer");
var _videoPlayerDefault = parcelHelpers.interopDefault(_videoPlayer);
var _audioPlayer = require("./tools/AudioPlayer");
var _audioPlayerDefault = parcelHelpers.interopDefault(_audioPlayer);
var _carousel = require("./tools/Carousel");
var _carouselDefault = parcelHelpers.interopDefault(_carousel);
var _columns = require("./tools/Columns");
var _columnsDefault = parcelHelpers.interopDefault(_columns);
var _raw = require("./tools/Raw");
var _rawDefault = parcelHelpers.interopDefault(_raw);
var _delimiter = require("./tools/Delimiter");
var _delimiterDefault = parcelHelpers.interopDefault(_delimiter);
var _button = require("./tools/Button");
var _buttonDefault = parcelHelpers.interopDefault(_button);
window.Alpine = (0, _alpinejsDefault.default);
// Tool modules registry
const toolModules = {
    Paragraph: (0, _paragraphDefault.default),
    Header: (0, _headerDefault.default),
    List: (0, _listDefault.default),
    Code: (0, _codeDefault.default),
    Image: (0, _imageDefault.default),
    Quote: (0, _quoteDefault.default),
    WYSIWYG: (0, _wysiwygDefault.default),
    Alert: (0, _alertDefault.default),
    VideoPlayer: (0, _videoPlayerDefault.default),
    AudioPlayer: (0, _audioPlayerDefault.default),
    Carousel: (0, _carouselDefault.default),
    Columns: (0, _columnsDefault.default),
    Raw: (0, _rawDefault.default),
    Delimiter: (0, _delimiterDefault.default),
    Button: (0, _buttonDefault.default)
};
/**
 * Extract and parse tool configuration from DOM
 * @returns {Object} Parsed tool configuration
 */ function getToolConfigFromDOM() {
    const editorElement = document.querySelector('[x-data*="alpineEditor"]');
    if (!editorElement) return {};
    const xDataAttr = editorElement.getAttribute('x-data');
    const match = xDataAttr.match(/alpineEditor\(\{[\s\n]*tools:\s*(\[[\s\S]*?\])\s*\}\)/);
    if (!match) return {};
    try {
        const toolsConfig = new Function(`return ${match[1]}`)();
        const config = {};
        (0, _debug.Debug).debug('toolModules keys:', Object.keys(toolModules));
        (0, _debug.Debug).debug('First tool module:', toolModules.Paragraph);
        toolsConfig.forEach((tool)=>{
            (0, _debug.Debug).debug('Loading tool:', tool.class);
            (0, _debug.Debug).debug('Available in toolModules:', !!toolModules[tool.class]);
            (0, _debug.Debug).debug('Tool class:', toolModules[tool.class]);
            if (toolModules[tool.class]) config[tool.class] = {
                class: toolModules[tool.class],
                config: tool.config || {}
            };
            else (0, _debug.Debug).error(`Tool ${tool.class} not found in available modules`);
        });
        return config;
    } catch (e) {
        (0, _debug.Debug).error('Error parsing tool configuration:', e);
        return {};
    }
}
// Initialize Alpine with tool loading
document.addEventListener('alpine:init', ()=>{
    window.Alpine.data('editorToolbar', ()=>new (0, _toolbar.Toolbar)());
    window.Alpine.data('editorSettings', (editorId, settings)=>new (0, _settings.Settings)(editorId, settings));
    window.Alpine.data('alpineEditor', ()=>({
            editor: null,
            blocks: [],
            selectedBlock: null,
            hoveredTarget: {},
            toolConfig: {},
            // Initialize when the component is mounted
            init () {
                // Get the Alpine component's element and utilities
                const $el = this.$el;
                const $dispatch = this.$dispatch;
                const $nextTick = this.$nextTick;
                const $watch = this.$watch;
                this.toolConfig = getToolConfigFromDOM();
                this.editor = new (0, _editor.Editor)(this.toolConfig);
                // Add Alpine utilities to editor
                this.editor.$el = $el;
                this.editor.$dispatch = $dispatch;
                this.editor.$nextTick = $nextTick;
                this.editor.$watch = $watch;
                // Initialize the editor
                this.editor.init();
                // Create a proxy for the blocks array to handle updates
                const self = this;
                this.blocks = new Proxy(this.editor.blocks, {
                    set (target, property, value) {
                        target[property] = value;
                        if (self.editor) self.editor.blockManager.blocks = target;
                        return true;
                    }
                });
                this.selectedBlock = this.editor.selectedBlock;
            // Don't override hoveredTarget - let Alpine manage it reactively
            // this.hoveredTarget = this.editor.hoveredTarget;
            },
            // Expose required methods
            blocksJSON (pretty = false) {
                if (!this.editor) return '[]';
                const blocksData = this.blocks.map((block)=>({
                        id: block.id,
                        class: block.constructor.name,
                        data: block.config
                    }));
                return pretty ? JSON.stringify(blocksData, null, 2).replace(/ /g, '&nbsp;').replace(/\n/g, '<br>') : JSON.stringify(blocksData);
            },
            handleDragOver (event, blockId) {
                event.preventDefault();
                // Handle drag over logic directly in Alpine component
                const dropTarget = event.currentTarget;
                const rect = dropTarget.getBoundingClientRect();
                const relY = event.clientY - rect.top;
                // Use improved drop zone detection - top 40% vs bottom 60%
                const position = relY < rect.height * 0.4 ? 'top' : 'bottom';
                // Update Alpine's hoveredTarget directly
                if (this.hoveredTarget[blockId] !== position) {
                    this.hoveredTarget[blockId] = position;
                    // Also update the editor's state to keep them in sync
                    if (this.editor) this.editor.hoveredTarget[blockId] = position;
                }
            },
            handleDragLeave (event, blockId) {
                // Handle drag leave logic directly in Alpine component
                const dropTarget = event.currentTarget;
                const relatedTarget = event.relatedTarget;
                if (!relatedTarget || !dropTarget.contains(relatedTarget)) // Add delay to prevent flickering
                setTimeout(()=>{
                    if (this.hoveredTarget[blockId]) {
                        delete this.hoveredTarget[blockId];
                        // Also update the editor's state
                        if (this.editor && this.editor.hoveredTarget[blockId]) delete this.editor.hoveredTarget[blockId];
                    }
                }, 100);
            },
            handleDrop (event, position, blockId) {
                if (this.editor) {
                    // Clear the hover state immediately
                    if (this.hoveredTarget[blockId]) delete this.hoveredTarget[blockId];
                    this.editor.handleDrop(event, position, blockId);
                }
            },
            setActive (event, blockId) {
                if (this.editor) this.editor.setActive(event, blockId);
            }
        }));
});
(0, _alpinejsDefault.default).start();

},{"alpinejs":"144A4","./core/editor":"40BcS","./core/Toolbar":"hf6hJ","./core/Settings":"45xuw","./core/utils/Debug":"2UdN7","./tools/Paragraph":"kD2Br","./tools/Header":"h1M5v","./tools/List":"9gNej","./tools/Code":"7KlLd","./tools/Image":"6b0Qh","./tools/Quote":"7kiYR","./tools/WYSIWYG":"3nTpv","./tools/Alert":"aF3vF","./tools/VideoPlayer":"6xmXY","./tools/AudioPlayer":"7nWMB","./tools/Carousel":"a1lqa","./tools/Columns":"kAfCq","./tools/Raw":"agwSs","./tools/Delimiter":"f1wwu","./tools/Button":"vKCcw","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"144A4":[function(require,module,exports,__globalThis) {
// packages/alpinejs/src/scheduler.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Alpine", ()=>src_default);
parcelHelpers.export(exports, "default", ()=>module_default);
var flushPending = false;
var flushing = false;
var queue = [];
var lastFlushedIndex = -1;
function scheduler(callback) {
    queueJob(callback);
}
function queueJob(job) {
    if (!queue.includes(job)) queue.push(job);
    queueFlush();
}
function dequeueJob(job) {
    let index = queue.indexOf(job);
    if (index !== -1 && index > lastFlushedIndex) queue.splice(index, 1);
}
function queueFlush() {
    if (!flushing && !flushPending) {
        flushPending = true;
        queueMicrotask(flushJobs);
    }
}
function flushJobs() {
    flushPending = false;
    flushing = true;
    for(let i = 0; i < queue.length; i++){
        queue[i]();
        lastFlushedIndex = i;
    }
    queue.length = 0;
    lastFlushedIndex = -1;
    flushing = false;
}
// packages/alpinejs/src/reactivity.js
var reactive;
var effect;
var release;
var raw;
var shouldSchedule = true;
function disableEffectScheduling(callback) {
    shouldSchedule = false;
    callback();
    shouldSchedule = true;
}
function setReactivityEngine(engine) {
    reactive = engine.reactive;
    release = engine.release;
    effect = (callback)=>engine.effect(callback, {
            scheduler: (task)=>{
                if (shouldSchedule) scheduler(task);
                else task();
            }
        });
    raw = engine.raw;
}
function overrideEffect(override) {
    effect = override;
}
function elementBoundEffect(el) {
    let cleanup2 = ()=>{};
    let wrappedEffect = (callback)=>{
        let effectReference = effect(callback);
        if (!el._x_effects) {
            el._x_effects = /* @__PURE__ */ new Set();
            el._x_runEffects = ()=>{
                el._x_effects.forEach((i)=>i());
            };
        }
        el._x_effects.add(effectReference);
        cleanup2 = ()=>{
            if (effectReference === void 0) return;
            el._x_effects.delete(effectReference);
            release(effectReference);
        };
        return effectReference;
    };
    return [
        wrappedEffect,
        ()=>{
            cleanup2();
        }
    ];
}
function watch(getter, callback) {
    let firstTime = true;
    let oldValue;
    let effectReference = effect(()=>{
        let value = getter();
        JSON.stringify(value);
        if (!firstTime) queueMicrotask(()=>{
            callback(value, oldValue);
            oldValue = value;
        });
        else oldValue = value;
        firstTime = false;
    });
    return ()=>release(effectReference);
}
// packages/alpinejs/src/mutation.js
var onAttributeAddeds = [];
var onElRemoveds = [];
var onElAddeds = [];
function onElAdded(callback) {
    onElAddeds.push(callback);
}
function onElRemoved(el, callback) {
    if (typeof callback === "function") {
        if (!el._x_cleanups) el._x_cleanups = [];
        el._x_cleanups.push(callback);
    } else {
        callback = el;
        onElRemoveds.push(callback);
    }
}
function onAttributesAdded(callback) {
    onAttributeAddeds.push(callback);
}
function onAttributeRemoved(el, name, callback) {
    if (!el._x_attributeCleanups) el._x_attributeCleanups = {};
    if (!el._x_attributeCleanups[name]) el._x_attributeCleanups[name] = [];
    el._x_attributeCleanups[name].push(callback);
}
function cleanupAttributes(el, names) {
    if (!el._x_attributeCleanups) return;
    Object.entries(el._x_attributeCleanups).forEach(([name, value])=>{
        if (names === void 0 || names.includes(name)) {
            value.forEach((i)=>i());
            delete el._x_attributeCleanups[name];
        }
    });
}
function cleanupElement(el) {
    el._x_effects?.forEach(dequeueJob);
    while(el._x_cleanups?.length)el._x_cleanups.pop()();
}
var observer = new MutationObserver(onMutate);
var currentlyObserving = false;
function startObservingMutations() {
    observer.observe(document, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeOldValue: true
    });
    currentlyObserving = true;
}
function stopObservingMutations() {
    flushObserver();
    observer.disconnect();
    currentlyObserving = false;
}
var queuedMutations = [];
function flushObserver() {
    let records = observer.takeRecords();
    queuedMutations.push(()=>records.length > 0 && onMutate(records));
    let queueLengthWhenTriggered = queuedMutations.length;
    queueMicrotask(()=>{
        if (queuedMutations.length === queueLengthWhenTriggered) while(queuedMutations.length > 0)queuedMutations.shift()();
    });
}
function mutateDom(callback) {
    if (!currentlyObserving) return callback();
    stopObservingMutations();
    let result = callback();
    startObservingMutations();
    return result;
}
var isCollecting = false;
var deferredMutations = [];
function deferMutations() {
    isCollecting = true;
}
function flushAndStopDeferringMutations() {
    isCollecting = false;
    onMutate(deferredMutations);
    deferredMutations = [];
}
function onMutate(mutations) {
    if (isCollecting) {
        deferredMutations = deferredMutations.concat(mutations);
        return;
    }
    let addedNodes = [];
    let removedNodes = /* @__PURE__ */ new Set();
    let addedAttributes = /* @__PURE__ */ new Map();
    let removedAttributes = /* @__PURE__ */ new Map();
    for(let i = 0; i < mutations.length; i++){
        if (mutations[i].target._x_ignoreMutationObserver) continue;
        if (mutations[i].type === "childList") {
            mutations[i].removedNodes.forEach((node)=>{
                if (node.nodeType !== 1) return;
                if (!node._x_marker) return;
                removedNodes.add(node);
            });
            mutations[i].addedNodes.forEach((node)=>{
                if (node.nodeType !== 1) return;
                if (removedNodes.has(node)) {
                    removedNodes.delete(node);
                    return;
                }
                if (node._x_marker) return;
                addedNodes.push(node);
            });
        }
        if (mutations[i].type === "attributes") {
            let el = mutations[i].target;
            let name = mutations[i].attributeName;
            let oldValue = mutations[i].oldValue;
            let add2 = ()=>{
                if (!addedAttributes.has(el)) addedAttributes.set(el, []);
                addedAttributes.get(el).push({
                    name,
                    value: el.getAttribute(name)
                });
            };
            let remove = ()=>{
                if (!removedAttributes.has(el)) removedAttributes.set(el, []);
                removedAttributes.get(el).push(name);
            };
            if (el.hasAttribute(name) && oldValue === null) add2();
            else if (el.hasAttribute(name)) {
                remove();
                add2();
            } else remove();
        }
    }
    removedAttributes.forEach((attrs, el)=>{
        cleanupAttributes(el, attrs);
    });
    addedAttributes.forEach((attrs, el)=>{
        onAttributeAddeds.forEach((i)=>i(el, attrs));
    });
    for (let node of removedNodes){
        if (addedNodes.some((i)=>i.contains(node))) continue;
        onElRemoveds.forEach((i)=>i(node));
    }
    for (let node of addedNodes){
        if (!node.isConnected) continue;
        onElAddeds.forEach((i)=>i(node));
    }
    addedNodes = null;
    removedNodes = null;
    addedAttributes = null;
    removedAttributes = null;
}
// packages/alpinejs/src/scope.js
function scope(node) {
    return mergeProxies(closestDataStack(node));
}
function addScopeToNode(node, data2, referenceNode) {
    node._x_dataStack = [
        data2,
        ...closestDataStack(referenceNode || node)
    ];
    return ()=>{
        node._x_dataStack = node._x_dataStack.filter((i)=>i !== data2);
    };
}
function closestDataStack(node) {
    if (node._x_dataStack) return node._x_dataStack;
    if (typeof ShadowRoot === "function" && node instanceof ShadowRoot) return closestDataStack(node.host);
    if (!node.parentNode) return [];
    return closestDataStack(node.parentNode);
}
function mergeProxies(objects) {
    return new Proxy({
        objects
    }, mergeProxyTrap);
}
var mergeProxyTrap = {
    ownKeys ({ objects }) {
        return Array.from(new Set(objects.flatMap((i)=>Object.keys(i))));
    },
    has ({ objects }, name) {
        if (name == Symbol.unscopables) return false;
        return objects.some((obj)=>Object.prototype.hasOwnProperty.call(obj, name) || Reflect.has(obj, name));
    },
    get ({ objects }, name, thisProxy) {
        if (name == "toJSON") return collapseProxies;
        return Reflect.get(objects.find((obj)=>Reflect.has(obj, name)) || {}, name, thisProxy);
    },
    set ({ objects }, name, value, thisProxy) {
        const target = objects.find((obj)=>Object.prototype.hasOwnProperty.call(obj, name)) || objects[objects.length - 1];
        const descriptor = Object.getOwnPropertyDescriptor(target, name);
        if (descriptor?.set && descriptor?.get) return descriptor.set.call(thisProxy, value) || true;
        return Reflect.set(target, name, value);
    }
};
function collapseProxies() {
    let keys = Reflect.ownKeys(this);
    return keys.reduce((acc, key)=>{
        acc[key] = Reflect.get(this, key);
        return acc;
    }, {});
}
// packages/alpinejs/src/interceptor.js
function initInterceptors(data2) {
    let isObject2 = (val)=>typeof val === "object" && !Array.isArray(val) && val !== null;
    let recurse = (obj, basePath = "")=>{
        Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([key, { value, enumerable }])=>{
            if (enumerable === false || value === void 0) return;
            if (typeof value === "object" && value !== null && value.__v_skip) return;
            let path = basePath === "" ? key : `${basePath}.${key}`;
            if (typeof value === "object" && value !== null && value._x_interceptor) obj[key] = value.initialize(data2, path, key);
            else if (isObject2(value) && value !== obj && !(value instanceof Element)) recurse(value, path);
        });
    };
    return recurse(data2);
}
function interceptor(callback, mutateObj = ()=>{}) {
    let obj = {
        initialValue: void 0,
        _x_interceptor: true,
        initialize (data2, path, key) {
            return callback(this.initialValue, ()=>get(data2, path), (value)=>set(data2, path, value), path, key);
        }
    };
    mutateObj(obj);
    return (initialValue)=>{
        if (typeof initialValue === "object" && initialValue !== null && initialValue._x_interceptor) {
            let initialize = obj.initialize.bind(obj);
            obj.initialize = (data2, path, key)=>{
                let innerValue = initialValue.initialize(data2, path, key);
                obj.initialValue = innerValue;
                return initialize(data2, path, key);
            };
        } else obj.initialValue = initialValue;
        return obj;
    };
}
function get(obj, path) {
    return path.split(".").reduce((carry, segment)=>carry[segment], obj);
}
function set(obj, path, value) {
    if (typeof path === "string") path = path.split(".");
    if (path.length === 1) obj[path[0]] = value;
    else if (path.length === 0) throw error;
    else {
        if (obj[path[0]]) return set(obj[path[0]], path.slice(1), value);
        else {
            obj[path[0]] = {};
            return set(obj[path[0]], path.slice(1), value);
        }
    }
}
// packages/alpinejs/src/magics.js
var magics = {};
function magic(name, callback) {
    magics[name] = callback;
}
function injectMagics(obj, el) {
    let memoizedUtilities = getUtilities(el);
    Object.entries(magics).forEach(([name, callback])=>{
        Object.defineProperty(obj, `$${name}`, {
            get () {
                return callback(el, memoizedUtilities);
            },
            enumerable: false
        });
    });
    return obj;
}
function getUtilities(el) {
    let [utilities, cleanup2] = getElementBoundUtilities(el);
    let utils = {
        interceptor,
        ...utilities
    };
    onElRemoved(el, cleanup2);
    return utils;
}
// packages/alpinejs/src/utils/error.js
function tryCatch(el, expression, callback, ...args) {
    try {
        return callback(...args);
    } catch (e) {
        handleError(e, el, expression);
    }
}
function handleError(error2, el, expression) {
    error2 = Object.assign(error2 ?? {
        message: "No error message given."
    }, {
        el,
        expression
    });
    console.warn(`Alpine Expression Error: ${error2.message}

${expression ? 'Expression: "' + expression + '"\n\n' : ""}`, el);
    setTimeout(()=>{
        throw error2;
    }, 0);
}
// packages/alpinejs/src/evaluator.js
var shouldAutoEvaluateFunctions = true;
function dontAutoEvaluateFunctions(callback) {
    let cache = shouldAutoEvaluateFunctions;
    shouldAutoEvaluateFunctions = false;
    let result = callback();
    shouldAutoEvaluateFunctions = cache;
    return result;
}
function evaluate(el, expression, extras = {}) {
    let result;
    evaluateLater(el, expression)((value)=>result = value, extras);
    return result;
}
function evaluateLater(...args) {
    return theEvaluatorFunction(...args);
}
var theEvaluatorFunction = normalEvaluator;
function setEvaluator(newEvaluator) {
    theEvaluatorFunction = newEvaluator;
}
function normalEvaluator(el, expression) {
    let overriddenMagics = {};
    injectMagics(overriddenMagics, el);
    let dataStack = [
        overriddenMagics,
        ...closestDataStack(el)
    ];
    let evaluator = typeof expression === "function" ? generateEvaluatorFromFunction(dataStack, expression) : generateEvaluatorFromString(dataStack, expression, el);
    return tryCatch.bind(null, el, expression, evaluator);
}
function generateEvaluatorFromFunction(dataStack, func) {
    return (receiver = ()=>{}, { scope: scope2 = {}, params = [] } = {})=>{
        let result = func.apply(mergeProxies([
            scope2,
            ...dataStack
        ]), params);
        runIfTypeOfFunction(receiver, result);
    };
}
var evaluatorMemo = {};
function generateFunctionFromString(expression, el) {
    if (evaluatorMemo[expression]) return evaluatorMemo[expression];
    let AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;
    let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression.trim()) || /^(let|const)\s/.test(expression.trim()) ? `(async()=>{ ${expression} })()` : expression;
    const safeAsyncFunction = ()=>{
        try {
            let func2 = new AsyncFunction([
                "__self",
                "scope"
            ], `with (scope) { __self.result = ${rightSideSafeExpression} }; __self.finished = true; return __self.result;`);
            Object.defineProperty(func2, "name", {
                value: `[Alpine] ${expression}`
            });
            return func2;
        } catch (error2) {
            handleError(error2, el, expression);
            return Promise.resolve();
        }
    };
    let func = safeAsyncFunction();
    evaluatorMemo[expression] = func;
    return func;
}
function generateEvaluatorFromString(dataStack, expression, el) {
    let func = generateFunctionFromString(expression, el);
    return (receiver = ()=>{}, { scope: scope2 = {}, params = [] } = {})=>{
        func.result = void 0;
        func.finished = false;
        let completeScope = mergeProxies([
            scope2,
            ...dataStack
        ]);
        if (typeof func === "function") {
            let promise = func(func, completeScope).catch((error2)=>handleError(error2, el, expression));
            if (func.finished) {
                runIfTypeOfFunction(receiver, func.result, completeScope, params, el);
                func.result = void 0;
            } else promise.then((result)=>{
                runIfTypeOfFunction(receiver, result, completeScope, params, el);
            }).catch((error2)=>handleError(error2, el, expression)).finally(()=>func.result = void 0);
        }
    };
}
function runIfTypeOfFunction(receiver, value, scope2, params, el) {
    if (shouldAutoEvaluateFunctions && typeof value === "function") {
        let result = value.apply(scope2, params);
        if (result instanceof Promise) result.then((i)=>runIfTypeOfFunction(receiver, i, scope2, params)).catch((error2)=>handleError(error2, el, value));
        else receiver(result);
    } else if (typeof value === "object" && value instanceof Promise) value.then((i)=>receiver(i));
    else receiver(value);
}
// packages/alpinejs/src/directives.js
var prefixAsString = "x-";
function prefix(subject = "") {
    return prefixAsString + subject;
}
function setPrefix(newPrefix) {
    prefixAsString = newPrefix;
}
var directiveHandlers = {};
function directive(name, callback) {
    directiveHandlers[name] = callback;
    return {
        before (directive2) {
            if (!directiveHandlers[directive2]) {
                console.warn(String.raw`Cannot find directive \`${directive2}\`. \`${name}\` will use the default order of execution`);
                return;
            }
            const pos = directiveOrder.indexOf(directive2);
            directiveOrder.splice(pos >= 0 ? pos : directiveOrder.indexOf("DEFAULT"), 0, name);
        }
    };
}
function directiveExists(name) {
    return Object.keys(directiveHandlers).includes(name);
}
function directives(el, attributes, originalAttributeOverride) {
    attributes = Array.from(attributes);
    if (el._x_virtualDirectives) {
        let vAttributes = Object.entries(el._x_virtualDirectives).map(([name, value])=>({
                name,
                value
            }));
        let staticAttributes = attributesOnly(vAttributes);
        vAttributes = vAttributes.map((attribute)=>{
            if (staticAttributes.find((attr)=>attr.name === attribute.name)) return {
                name: `x-bind:${attribute.name}`,
                value: `"${attribute.value}"`
            };
            return attribute;
        });
        attributes = attributes.concat(vAttributes);
    }
    let transformedAttributeMap = {};
    let directives2 = attributes.map(toTransformedAttributes((newName, oldName)=>transformedAttributeMap[newName] = oldName)).filter(outNonAlpineAttributes).map(toParsedDirectives(transformedAttributeMap, originalAttributeOverride)).sort(byPriority);
    return directives2.map((directive2)=>{
        return getDirectiveHandler(el, directive2);
    });
}
function attributesOnly(attributes) {
    return Array.from(attributes).map(toTransformedAttributes()).filter((attr)=>!outNonAlpineAttributes(attr));
}
var isDeferringHandlers = false;
var directiveHandlerStacks = /* @__PURE__ */ new Map();
var currentHandlerStackKey = Symbol();
function deferHandlingDirectives(callback) {
    isDeferringHandlers = true;
    let key = Symbol();
    currentHandlerStackKey = key;
    directiveHandlerStacks.set(key, []);
    let flushHandlers = ()=>{
        while(directiveHandlerStacks.get(key).length)directiveHandlerStacks.get(key).shift()();
        directiveHandlerStacks.delete(key);
    };
    let stopDeferring = ()=>{
        isDeferringHandlers = false;
        flushHandlers();
    };
    callback(flushHandlers);
    stopDeferring();
}
function getElementBoundUtilities(el) {
    let cleanups = [];
    let cleanup2 = (callback)=>cleanups.push(callback);
    let [effect3, cleanupEffect] = elementBoundEffect(el);
    cleanups.push(cleanupEffect);
    let utilities = {
        Alpine: alpine_default,
        effect: effect3,
        cleanup: cleanup2,
        evaluateLater: evaluateLater.bind(evaluateLater, el),
        evaluate: evaluate.bind(evaluate, el)
    };
    let doCleanup = ()=>cleanups.forEach((i)=>i());
    return [
        utilities,
        doCleanup
    ];
}
function getDirectiveHandler(el, directive2) {
    let noop = ()=>{};
    let handler4 = directiveHandlers[directive2.type] || noop;
    let [utilities, cleanup2] = getElementBoundUtilities(el);
    onAttributeRemoved(el, directive2.original, cleanup2);
    let fullHandler = ()=>{
        if (el._x_ignore || el._x_ignoreSelf) return;
        handler4.inline && handler4.inline(el, directive2, utilities);
        handler4 = handler4.bind(handler4, el, directive2, utilities);
        isDeferringHandlers ? directiveHandlerStacks.get(currentHandlerStackKey).push(handler4) : handler4();
    };
    fullHandler.runCleanups = cleanup2;
    return fullHandler;
}
var startingWith = (subject, replacement)=>({ name, value })=>{
        if (name.startsWith(subject)) name = name.replace(subject, replacement);
        return {
            name,
            value
        };
    };
var into = (i)=>i;
function toTransformedAttributes(callback = ()=>{}) {
    return ({ name, value })=>{
        let { name: newName, value: newValue } = attributeTransformers.reduce((carry, transform)=>{
            return transform(carry);
        }, {
            name,
            value
        });
        if (newName !== name) callback(newName, name);
        return {
            name: newName,
            value: newValue
        };
    };
}
var attributeTransformers = [];
function mapAttributes(callback) {
    attributeTransformers.push(callback);
}
function outNonAlpineAttributes({ name }) {
    return alpineAttributeRegex().test(name);
}
var alpineAttributeRegex = ()=>new RegExp(`^${prefixAsString}([^:^.]+)\\b`);
function toParsedDirectives(transformedAttributeMap, originalAttributeOverride) {
    return ({ name, value })=>{
        let typeMatch = name.match(alpineAttributeRegex());
        let valueMatch = name.match(/:([a-zA-Z0-9\-_:]+)/);
        let modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
        let original = originalAttributeOverride || transformedAttributeMap[name] || name;
        return {
            type: typeMatch ? typeMatch[1] : null,
            value: valueMatch ? valueMatch[1] : null,
            modifiers: modifiers.map((i)=>i.replace(".", "")),
            expression: value,
            original
        };
    };
}
var DEFAULT = "DEFAULT";
var directiveOrder = [
    "ignore",
    "ref",
    "data",
    "id",
    "anchor",
    "bind",
    "init",
    "for",
    "model",
    "modelable",
    "transition",
    "show",
    "if",
    DEFAULT,
    "teleport"
];
function byPriority(a, b) {
    let typeA = directiveOrder.indexOf(a.type) === -1 ? DEFAULT : a.type;
    let typeB = directiveOrder.indexOf(b.type) === -1 ? DEFAULT : b.type;
    return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
}
// packages/alpinejs/src/utils/dispatch.js
function dispatch(el, name, detail = {}) {
    el.dispatchEvent(new CustomEvent(name, {
        detail,
        bubbles: true,
        // Allows events to pass the shadow DOM barrier.
        composed: true,
        cancelable: true
    }));
}
// packages/alpinejs/src/utils/walk.js
function walk(el, callback) {
    if (typeof ShadowRoot === "function" && el instanceof ShadowRoot) {
        Array.from(el.children).forEach((el2)=>walk(el2, callback));
        return;
    }
    let skip = false;
    callback(el, ()=>skip = true);
    if (skip) return;
    let node = el.firstElementChild;
    while(node){
        walk(node, callback, false);
        node = node.nextElementSibling;
    }
}
// packages/alpinejs/src/utils/warn.js
function warn(message, ...args) {
    console.warn(`Alpine Warning: ${message}`, ...args);
}
// packages/alpinejs/src/lifecycle.js
var started = false;
function start() {
    if (started) warn("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.");
    started = true;
    if (!document.body) warn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?");
    dispatch(document, "alpine:init");
    dispatch(document, "alpine:initializing");
    startObservingMutations();
    onElAdded((el)=>initTree(el, walk));
    onElRemoved((el)=>destroyTree(el));
    onAttributesAdded((el, attrs)=>{
        directives(el, attrs).forEach((handle)=>handle());
    });
    let outNestedComponents = (el)=>!closestRoot(el.parentElement, true);
    Array.from(document.querySelectorAll(allSelectors().join(","))).filter(outNestedComponents).forEach((el)=>{
        initTree(el);
    });
    dispatch(document, "alpine:initialized");
    setTimeout(()=>{
        warnAboutMissingPlugins();
    });
}
var rootSelectorCallbacks = [];
var initSelectorCallbacks = [];
function rootSelectors() {
    return rootSelectorCallbacks.map((fn)=>fn());
}
function allSelectors() {
    return rootSelectorCallbacks.concat(initSelectorCallbacks).map((fn)=>fn());
}
function addRootSelector(selectorCallback) {
    rootSelectorCallbacks.push(selectorCallback);
}
function addInitSelector(selectorCallback) {
    initSelectorCallbacks.push(selectorCallback);
}
function closestRoot(el, includeInitSelectors = false) {
    return findClosest(el, (element)=>{
        const selectors = includeInitSelectors ? allSelectors() : rootSelectors();
        if (selectors.some((selector)=>element.matches(selector))) return true;
    });
}
function findClosest(el, callback) {
    if (!el) return;
    if (callback(el)) return el;
    if (el._x_teleportBack) el = el._x_teleportBack;
    if (!el.parentElement) return;
    return findClosest(el.parentElement, callback);
}
function isRoot(el) {
    return rootSelectors().some((selector)=>el.matches(selector));
}
var initInterceptors2 = [];
function interceptInit(callback) {
    initInterceptors2.push(callback);
}
var markerDispenser = 1;
function initTree(el, walker = walk, intercept = ()=>{}) {
    if (findClosest(el, (i)=>i._x_ignore)) return;
    deferHandlingDirectives(()=>{
        walker(el, (el2, skip)=>{
            if (el2._x_marker) return;
            intercept(el2, skip);
            initInterceptors2.forEach((i)=>i(el2, skip));
            directives(el2, el2.attributes).forEach((handle)=>handle());
            if (!el2._x_ignore) el2._x_marker = markerDispenser++;
            el2._x_ignore && skip();
        });
    });
}
function destroyTree(root, walker = walk) {
    walker(root, (el)=>{
        cleanupElement(el);
        cleanupAttributes(el);
        delete el._x_marker;
    });
}
function warnAboutMissingPlugins() {
    let pluginDirectives = [
        [
            "ui",
            "dialog",
            [
                "[x-dialog], [x-popover]"
            ]
        ],
        [
            "anchor",
            "anchor",
            [
                "[x-anchor]"
            ]
        ],
        [
            "sort",
            "sort",
            [
                "[x-sort]"
            ]
        ]
    ];
    pluginDirectives.forEach(([plugin2, directive2, selectors])=>{
        if (directiveExists(directive2)) return;
        selectors.some((selector)=>{
            if (document.querySelector(selector)) {
                warn(`found "${selector}", but missing ${plugin2} plugin`);
                return true;
            }
        });
    });
}
// packages/alpinejs/src/nextTick.js
var tickStack = [];
var isHolding = false;
function nextTick(callback = ()=>{}) {
    queueMicrotask(()=>{
        isHolding || setTimeout(()=>{
            releaseNextTicks();
        });
    });
    return new Promise((res)=>{
        tickStack.push(()=>{
            callback();
            res();
        });
    });
}
function releaseNextTicks() {
    isHolding = false;
    while(tickStack.length)tickStack.shift()();
}
function holdNextTicks() {
    isHolding = true;
}
// packages/alpinejs/src/utils/classes.js
function setClasses(el, value) {
    if (Array.isArray(value)) return setClassesFromString(el, value.join(" "));
    else if (typeof value === "object" && value !== null) return setClassesFromObject(el, value);
    else if (typeof value === "function") return setClasses(el, value());
    return setClassesFromString(el, value);
}
function setClassesFromString(el, classString) {
    let split = (classString2)=>classString2.split(" ").filter(Boolean);
    let missingClasses = (classString2)=>classString2.split(" ").filter((i)=>!el.classList.contains(i)).filter(Boolean);
    let addClassesAndReturnUndo = (classes)=>{
        el.classList.add(...classes);
        return ()=>{
            el.classList.remove(...classes);
        };
    };
    classString = classString === true ? classString = "" : classString || "";
    return addClassesAndReturnUndo(missingClasses(classString));
}
function setClassesFromObject(el, classObject) {
    let split = (classString)=>classString.split(" ").filter(Boolean);
    let forAdd = Object.entries(classObject).flatMap(([classString, bool])=>bool ? split(classString) : false).filter(Boolean);
    let forRemove = Object.entries(classObject).flatMap(([classString, bool])=>!bool ? split(classString) : false).filter(Boolean);
    let added = [];
    let removed = [];
    forRemove.forEach((i)=>{
        if (el.classList.contains(i)) {
            el.classList.remove(i);
            removed.push(i);
        }
    });
    forAdd.forEach((i)=>{
        if (!el.classList.contains(i)) {
            el.classList.add(i);
            added.push(i);
        }
    });
    return ()=>{
        removed.forEach((i)=>el.classList.add(i));
        added.forEach((i)=>el.classList.remove(i));
    };
}
// packages/alpinejs/src/utils/styles.js
function setStyles(el, value) {
    if (typeof value === "object" && value !== null) return setStylesFromObject(el, value);
    return setStylesFromString(el, value);
}
function setStylesFromObject(el, value) {
    let previousStyles = {};
    Object.entries(value).forEach(([key, value2])=>{
        previousStyles[key] = el.style[key];
        if (!key.startsWith("--")) key = kebabCase(key);
        el.style.setProperty(key, value2);
    });
    setTimeout(()=>{
        if (el.style.length === 0) el.removeAttribute("style");
    });
    return ()=>{
        setStyles(el, previousStyles);
    };
}
function setStylesFromString(el, value) {
    let cache = el.getAttribute("style", value);
    el.setAttribute("style", value);
    return ()=>{
        el.setAttribute("style", cache || "");
    };
}
function kebabCase(subject) {
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
// packages/alpinejs/src/utils/once.js
function once(callback, fallback = ()=>{}) {
    let called = false;
    return function() {
        if (!called) {
            called = true;
            callback.apply(this, arguments);
        } else fallback.apply(this, arguments);
    };
}
// packages/alpinejs/src/directives/x-transition.js
directive("transition", (el, { value, modifiers, expression }, { evaluate: evaluate2 })=>{
    if (typeof expression === "function") expression = evaluate2(expression);
    if (expression === false) return;
    if (!expression || typeof expression === "boolean") registerTransitionsFromHelper(el, modifiers, value);
    else registerTransitionsFromClassString(el, expression, value);
});
function registerTransitionsFromClassString(el, classString, stage) {
    registerTransitionObject(el, setClasses, "");
    let directiveStorageMap = {
        "enter": (classes)=>{
            el._x_transition.enter.during = classes;
        },
        "enter-start": (classes)=>{
            el._x_transition.enter.start = classes;
        },
        "enter-end": (classes)=>{
            el._x_transition.enter.end = classes;
        },
        "leave": (classes)=>{
            el._x_transition.leave.during = classes;
        },
        "leave-start": (classes)=>{
            el._x_transition.leave.start = classes;
        },
        "leave-end": (classes)=>{
            el._x_transition.leave.end = classes;
        }
    };
    directiveStorageMap[stage](classString);
}
function registerTransitionsFromHelper(el, modifiers, stage) {
    registerTransitionObject(el, setStyles);
    let doesntSpecify = !modifiers.includes("in") && !modifiers.includes("out") && !stage;
    let transitioningIn = doesntSpecify || modifiers.includes("in") || [
        "enter"
    ].includes(stage);
    let transitioningOut = doesntSpecify || modifiers.includes("out") || [
        "leave"
    ].includes(stage);
    if (modifiers.includes("in") && !doesntSpecify) modifiers = modifiers.filter((i, index)=>index < modifiers.indexOf("out"));
    if (modifiers.includes("out") && !doesntSpecify) modifiers = modifiers.filter((i, index)=>index > modifiers.indexOf("out"));
    let wantsAll = !modifiers.includes("opacity") && !modifiers.includes("scale");
    let wantsOpacity = wantsAll || modifiers.includes("opacity");
    let wantsScale = wantsAll || modifiers.includes("scale");
    let opacityValue = wantsOpacity ? 0 : 1;
    let scaleValue = wantsScale ? modifierValue(modifiers, "scale", 95) / 100 : 1;
    let delay = modifierValue(modifiers, "delay", 0) / 1e3;
    let origin = modifierValue(modifiers, "origin", "center");
    let property = "opacity, transform";
    let durationIn = modifierValue(modifiers, "duration", 150) / 1e3;
    let durationOut = modifierValue(modifiers, "duration", 75) / 1e3;
    let easing = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
    if (transitioningIn) {
        el._x_transition.enter.during = {
            transformOrigin: origin,
            transitionDelay: `${delay}s`,
            transitionProperty: property,
            transitionDuration: `${durationIn}s`,
            transitionTimingFunction: easing
        };
        el._x_transition.enter.start = {
            opacity: opacityValue,
            transform: `scale(${scaleValue})`
        };
        el._x_transition.enter.end = {
            opacity: 1,
            transform: `scale(1)`
        };
    }
    if (transitioningOut) {
        el._x_transition.leave.during = {
            transformOrigin: origin,
            transitionDelay: `${delay}s`,
            transitionProperty: property,
            transitionDuration: `${durationOut}s`,
            transitionTimingFunction: easing
        };
        el._x_transition.leave.start = {
            opacity: 1,
            transform: `scale(1)`
        };
        el._x_transition.leave.end = {
            opacity: opacityValue,
            transform: `scale(${scaleValue})`
        };
    }
}
function registerTransitionObject(el, setFunction, defaultValue = {}) {
    if (!el._x_transition) el._x_transition = {
        enter: {
            during: defaultValue,
            start: defaultValue,
            end: defaultValue
        },
        leave: {
            during: defaultValue,
            start: defaultValue,
            end: defaultValue
        },
        in (before = ()=>{}, after = ()=>{}) {
            transition(el, setFunction, {
                during: this.enter.during,
                start: this.enter.start,
                end: this.enter.end
            }, before, after);
        },
        out (before = ()=>{}, after = ()=>{}) {
            transition(el, setFunction, {
                during: this.leave.during,
                start: this.leave.start,
                end: this.leave.end
            }, before, after);
        }
    };
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(el, value, show, hide) {
    const nextTick2 = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
    let clickAwayCompatibleShow = ()=>nextTick2(show);
    if (value) {
        if (el._x_transition && (el._x_transition.enter || el._x_transition.leave)) el._x_transition.enter && (Object.entries(el._x_transition.enter.during).length || Object.entries(el._x_transition.enter.start).length || Object.entries(el._x_transition.enter.end).length) ? el._x_transition.in(show) : clickAwayCompatibleShow();
        else el._x_transition ? el._x_transition.in(show) : clickAwayCompatibleShow();
        return;
    }
    el._x_hidePromise = el._x_transition ? new Promise((resolve, reject)=>{
        el._x_transition.out(()=>{}, ()=>resolve(hide));
        el._x_transitioning && el._x_transitioning.beforeCancel(()=>reject({
                isFromCancelledTransition: true
            }));
    }) : Promise.resolve(hide);
    queueMicrotask(()=>{
        let closest = closestHide(el);
        if (closest) {
            if (!closest._x_hideChildren) closest._x_hideChildren = [];
            closest._x_hideChildren.push(el);
        } else nextTick2(()=>{
            let hideAfterChildren = (el2)=>{
                let carry = Promise.all([
                    el2._x_hidePromise,
                    ...(el2._x_hideChildren || []).map(hideAfterChildren)
                ]).then(([i])=>i?.());
                delete el2._x_hidePromise;
                delete el2._x_hideChildren;
                return carry;
            };
            hideAfterChildren(el).catch((e)=>{
                if (!e.isFromCancelledTransition) throw e;
            });
        });
    });
};
function closestHide(el) {
    let parent = el.parentNode;
    if (!parent) return;
    return parent._x_hidePromise ? parent : closestHide(parent);
}
function transition(el, setFunction, { during, start: start2, end } = {}, before = ()=>{}, after = ()=>{}) {
    if (el._x_transitioning) el._x_transitioning.cancel();
    if (Object.keys(during).length === 0 && Object.keys(start2).length === 0 && Object.keys(end).length === 0) {
        before();
        after();
        return;
    }
    let undoStart, undoDuring, undoEnd;
    performTransition(el, {
        start () {
            undoStart = setFunction(el, start2);
        },
        during () {
            undoDuring = setFunction(el, during);
        },
        before,
        end () {
            undoStart();
            undoEnd = setFunction(el, end);
        },
        after,
        cleanup () {
            undoDuring();
            undoEnd();
        }
    });
}
function performTransition(el, stages) {
    let interrupted, reachedBefore, reachedEnd;
    let finish = once(()=>{
        mutateDom(()=>{
            interrupted = true;
            if (!reachedBefore) stages.before();
            if (!reachedEnd) {
                stages.end();
                releaseNextTicks();
            }
            stages.after();
            if (el.isConnected) stages.cleanup();
            delete el._x_transitioning;
        });
    });
    el._x_transitioning = {
        beforeCancels: [],
        beforeCancel (callback) {
            this.beforeCancels.push(callback);
        },
        cancel: once(function() {
            while(this.beforeCancels.length)this.beforeCancels.shift()();
            finish();
        }),
        finish
    };
    mutateDom(()=>{
        stages.start();
        stages.during();
    });
    holdNextTicks();
    requestAnimationFrame(()=>{
        if (interrupted) return;
        let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3;
        let delay = Number(getComputedStyle(el).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
        if (duration === 0) duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1e3;
        mutateDom(()=>{
            stages.before();
        });
        reachedBefore = true;
        requestAnimationFrame(()=>{
            if (interrupted) return;
            mutateDom(()=>{
                stages.end();
            });
            releaseNextTicks();
            setTimeout(el._x_transitioning.finish, duration + delay);
            reachedEnd = true;
        });
    });
}
function modifierValue(modifiers, key, fallback) {
    if (modifiers.indexOf(key) === -1) return fallback;
    const rawValue = modifiers[modifiers.indexOf(key) + 1];
    if (!rawValue) return fallback;
    if (key === "scale") {
        if (isNaN(rawValue)) return fallback;
    }
    if (key === "duration" || key === "delay") {
        let match = rawValue.match(/([0-9]+)ms/);
        if (match) return match[1];
    }
    if (key === "origin") {
        if ([
            "top",
            "right",
            "left",
            "center",
            "bottom"
        ].includes(modifiers[modifiers.indexOf(key) + 2])) return [
            rawValue,
            modifiers[modifiers.indexOf(key) + 2]
        ].join(" ");
    }
    return rawValue;
}
// packages/alpinejs/src/clone.js
var isCloning = false;
function skipDuringClone(callback, fallback = ()=>{}) {
    return (...args)=>isCloning ? fallback(...args) : callback(...args);
}
function onlyDuringClone(callback) {
    return (...args)=>isCloning && callback(...args);
}
var interceptors = [];
function interceptClone(callback) {
    interceptors.push(callback);
}
function cloneNode(from, to) {
    interceptors.forEach((i)=>i(from, to));
    isCloning = true;
    dontRegisterReactiveSideEffects(()=>{
        initTree(to, (el, callback)=>{
            callback(el, ()=>{});
        });
    });
    isCloning = false;
}
var isCloningLegacy = false;
function clone(oldEl, newEl) {
    if (!newEl._x_dataStack) newEl._x_dataStack = oldEl._x_dataStack;
    isCloning = true;
    isCloningLegacy = true;
    dontRegisterReactiveSideEffects(()=>{
        cloneTree(newEl);
    });
    isCloning = false;
    isCloningLegacy = false;
}
function cloneTree(el) {
    let hasRunThroughFirstEl = false;
    let shallowWalker = (el2, callback)=>{
        walk(el2, (el3, skip)=>{
            if (hasRunThroughFirstEl && isRoot(el3)) return skip();
            hasRunThroughFirstEl = true;
            callback(el3, skip);
        });
    };
    initTree(el, shallowWalker);
}
function dontRegisterReactiveSideEffects(callback) {
    let cache = effect;
    overrideEffect((callback2, el)=>{
        let storedEffect = cache(callback2);
        release(storedEffect);
        return ()=>{};
    });
    callback();
    overrideEffect(cache);
}
// packages/alpinejs/src/utils/bind.js
function bind(el, name, value, modifiers = []) {
    if (!el._x_bindings) el._x_bindings = reactive({});
    el._x_bindings[name] = value;
    name = modifiers.includes("camel") ? camelCase(name) : name;
    switch(name){
        case "value":
            bindInputValue(el, value);
            break;
        case "style":
            bindStyles(el, value);
            break;
        case "class":
            bindClasses(el, value);
            break;
        case "selected":
        case "checked":
            bindAttributeAndProperty(el, name, value);
            break;
        default:
            bindAttribute(el, name, value);
            break;
    }
}
function bindInputValue(el, value) {
    if (isRadio(el)) {
        if (el.attributes.value === void 0) el.value = value;
        if (window.fromModel) {
            if (typeof value === "boolean") el.checked = safeParseBoolean(el.value) === value;
            else el.checked = checkedAttrLooseCompare(el.value, value);
        }
    } else if (isCheckbox(el)) {
        if (Number.isInteger(value)) el.value = value;
        else if (!Array.isArray(value) && typeof value !== "boolean" && ![
            null,
            void 0
        ].includes(value)) el.value = String(value);
        else if (Array.isArray(value)) el.checked = value.some((val)=>checkedAttrLooseCompare(val, el.value));
        else el.checked = !!value;
    } else if (el.tagName === "SELECT") updateSelect(el, value);
    else {
        if (el.value === value) return;
        el.value = value === void 0 ? "" : value;
    }
}
function bindClasses(el, value) {
    if (el._x_undoAddedClasses) el._x_undoAddedClasses();
    el._x_undoAddedClasses = setClasses(el, value);
}
function bindStyles(el, value) {
    if (el._x_undoAddedStyles) el._x_undoAddedStyles();
    el._x_undoAddedStyles = setStyles(el, value);
}
function bindAttributeAndProperty(el, name, value) {
    bindAttribute(el, name, value);
    setPropertyIfChanged(el, name, value);
}
function bindAttribute(el, name, value) {
    if ([
        null,
        void 0,
        false
    ].includes(value) && attributeShouldntBePreservedIfFalsy(name)) el.removeAttribute(name);
    else {
        if (isBooleanAttr(name)) value = name;
        setIfChanged(el, name, value);
    }
}
function setIfChanged(el, attrName, value) {
    if (el.getAttribute(attrName) != value) el.setAttribute(attrName, value);
}
function setPropertyIfChanged(el, propName, value) {
    if (el[propName] !== value) el[propName] = value;
}
function updateSelect(el, value) {
    const arrayWrappedValue = [].concat(value).map((value2)=>{
        return value2 + "";
    });
    Array.from(el.options).forEach((option)=>{
        option.selected = arrayWrappedValue.includes(option.value);
    });
}
function camelCase(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char)=>char.toUpperCase());
}
function checkedAttrLooseCompare(valueA, valueB) {
    return valueA == valueB;
}
function safeParseBoolean(rawValue) {
    if ([
        1,
        "1",
        "true",
        "on",
        "yes",
        true
    ].includes(rawValue)) return true;
    if ([
        0,
        "0",
        "false",
        "off",
        "no",
        false
    ].includes(rawValue)) return false;
    return rawValue ? Boolean(rawValue) : null;
}
var booleanAttributes = /* @__PURE__ */ new Set([
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "defer",
    "disabled",
    "formnovalidate",
    "inert",
    "ismap",
    "itemscope",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "selected",
    "shadowrootclonable",
    "shadowrootdelegatesfocus",
    "shadowrootserializable"
]);
function isBooleanAttr(attrName) {
    return booleanAttributes.has(attrName);
}
function attributeShouldntBePreservedIfFalsy(name) {
    return ![
        "aria-pressed",
        "aria-checked",
        "aria-expanded",
        "aria-selected"
    ].includes(name);
}
function getBinding(el, name, fallback) {
    if (el._x_bindings && el._x_bindings[name] !== void 0) return el._x_bindings[name];
    return getAttributeBinding(el, name, fallback);
}
function extractProp(el, name, fallback, extract = true) {
    if (el._x_bindings && el._x_bindings[name] !== void 0) return el._x_bindings[name];
    if (el._x_inlineBindings && el._x_inlineBindings[name] !== void 0) {
        let binding = el._x_inlineBindings[name];
        binding.extract = extract;
        return dontAutoEvaluateFunctions(()=>{
            return evaluate(el, binding.expression);
        });
    }
    return getAttributeBinding(el, name, fallback);
}
function getAttributeBinding(el, name, fallback) {
    let attr = el.getAttribute(name);
    if (attr === null) return typeof fallback === "function" ? fallback() : fallback;
    if (attr === "") return true;
    if (isBooleanAttr(name)) return !![
        name,
        "true"
    ].includes(attr);
    return attr;
}
function isCheckbox(el) {
    return el.type === "checkbox" || el.localName === "ui-checkbox" || el.localName === "ui-switch";
}
function isRadio(el) {
    return el.type === "radio" || el.localName === "ui-radio";
}
// packages/alpinejs/src/utils/debounce.js
function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
// packages/alpinejs/src/utils/throttle.js
function throttle(func, limit) {
    let inThrottle;
    return function() {
        let context = this, args = arguments;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(()=>inThrottle = false, limit);
        }
    };
}
// packages/alpinejs/src/entangle.js
function entangle({ get: outerGet, set: outerSet }, { get: innerGet, set: innerSet }) {
    let firstRun = true;
    let outerHash;
    let innerHash;
    let reference = effect(()=>{
        let outer = outerGet();
        let inner = innerGet();
        if (firstRun) {
            innerSet(cloneIfObject(outer));
            firstRun = false;
        } else {
            let outerHashLatest = JSON.stringify(outer);
            let innerHashLatest = JSON.stringify(inner);
            if (outerHashLatest !== outerHash) innerSet(cloneIfObject(outer));
            else if (outerHashLatest !== innerHashLatest) outerSet(cloneIfObject(inner));
        }
        outerHash = JSON.stringify(outerGet());
        innerHash = JSON.stringify(innerGet());
    });
    return ()=>{
        release(reference);
    };
}
function cloneIfObject(value) {
    return typeof value === "object" ? JSON.parse(JSON.stringify(value)) : value;
}
// packages/alpinejs/src/plugin.js
function plugin(callback) {
    let callbacks = Array.isArray(callback) ? callback : [
        callback
    ];
    callbacks.forEach((i)=>i(alpine_default));
}
// packages/alpinejs/src/store.js
var stores = {};
var isReactive = false;
function store(name, value) {
    if (!isReactive) {
        stores = reactive(stores);
        isReactive = true;
    }
    if (value === void 0) return stores[name];
    stores[name] = value;
    initInterceptors(stores[name]);
    if (typeof value === "object" && value !== null && value.hasOwnProperty("init") && typeof value.init === "function") stores[name].init();
}
function getStores() {
    return stores;
}
// packages/alpinejs/src/binds.js
var binds = {};
function bind2(name, bindings) {
    let getBindings = typeof bindings !== "function" ? ()=>bindings : bindings;
    if (name instanceof Element) return applyBindingsObject(name, getBindings());
    else binds[name] = getBindings;
    return ()=>{};
}
function injectBindingProviders(obj) {
    Object.entries(binds).forEach(([name, callback])=>{
        Object.defineProperty(obj, name, {
            get () {
                return (...args)=>{
                    return callback(...args);
                };
            }
        });
    });
    return obj;
}
function applyBindingsObject(el, obj, original) {
    let cleanupRunners = [];
    while(cleanupRunners.length)cleanupRunners.pop()();
    let attributes = Object.entries(obj).map(([name, value])=>({
            name,
            value
        }));
    let staticAttributes = attributesOnly(attributes);
    attributes = attributes.map((attribute)=>{
        if (staticAttributes.find((attr)=>attr.name === attribute.name)) return {
            name: `x-bind:${attribute.name}`,
            value: `"${attribute.value}"`
        };
        return attribute;
    });
    directives(el, attributes, original).map((handle)=>{
        cleanupRunners.push(handle.runCleanups);
        handle();
    });
    return ()=>{
        while(cleanupRunners.length)cleanupRunners.pop()();
    };
}
// packages/alpinejs/src/datas.js
var datas = {};
function data(name, callback) {
    datas[name] = callback;
}
function injectDataProviders(obj, context) {
    Object.entries(datas).forEach(([name, callback])=>{
        Object.defineProperty(obj, name, {
            get () {
                return (...args)=>{
                    return callback.bind(context)(...args);
                };
            },
            enumerable: false
        });
    });
    return obj;
}
// packages/alpinejs/src/alpine.js
var Alpine = {
    get reactive () {
        return reactive;
    },
    get release () {
        return release;
    },
    get effect () {
        return effect;
    },
    get raw () {
        return raw;
    },
    version: "3.14.9",
    flushAndStopDeferringMutations,
    dontAutoEvaluateFunctions,
    disableEffectScheduling,
    startObservingMutations,
    stopObservingMutations,
    setReactivityEngine,
    onAttributeRemoved,
    onAttributesAdded,
    closestDataStack,
    skipDuringClone,
    onlyDuringClone,
    addRootSelector,
    addInitSelector,
    interceptClone,
    addScopeToNode,
    deferMutations,
    mapAttributes,
    evaluateLater,
    interceptInit,
    setEvaluator,
    mergeProxies,
    extractProp,
    findClosest,
    onElRemoved,
    closestRoot,
    destroyTree,
    interceptor,
    // INTERNAL: not public API and is subject to change without major release.
    transition,
    // INTERNAL
    setStyles,
    // INTERNAL
    mutateDom,
    directive,
    entangle,
    throttle,
    debounce,
    evaluate,
    initTree,
    nextTick,
    prefixed: prefix,
    prefix: setPrefix,
    plugin,
    magic,
    store,
    start,
    clone,
    // INTERNAL
    cloneNode,
    // INTERNAL
    bound: getBinding,
    $data: scope,
    watch,
    walk,
    data,
    bind: bind2
};
var alpine_default = Alpine;
// node_modules/@vue/shared/dist/shared.esm-bundler.js
function makeMap(str, expectsLowerCase) {
    const map = /* @__PURE__ */ Object.create(null);
    const list = str.split(",");
    for(let i = 0; i < list.length; i++)map[list[i]] = true;
    return expectsLowerCase ? (val)=>!!map[val.toLowerCase()] : (val)=>!!map[val];
}
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isBooleanAttr2 = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
var EMPTY_OBJ = Object.freeze({});
var EMPTY_ARR = Object.freeze([]);
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = (val, key)=>hasOwnProperty.call(val, key);
var isArray = Array.isArray;
var isMap = (val)=>toTypeString(val) === "[object Map]";
var isString = (val)=>typeof val === "string";
var isSymbol = (val)=>typeof val === "symbol";
var isObject = (val)=>val !== null && typeof val === "object";
var objectToString = Object.prototype.toString;
var toTypeString = (value)=>objectToString.call(value);
var toRawType = (value)=>{
    return toTypeString(value).slice(8, -1);
};
var isIntegerKey = (key)=>isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var cacheStringFunction = (fn)=>{
    const cache = /* @__PURE__ */ Object.create(null);
    return (str)=>{
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
};
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str)=>{
    return str.replace(camelizeRE, (_, c)=>c ? c.toUpperCase() : "");
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str)=>str.replace(hyphenateRE, "-$1").toLowerCase());
var capitalize = cacheStringFunction((str)=>str.charAt(0).toUpperCase() + str.slice(1));
var toHandlerKey = cacheStringFunction((str)=>str ? `on${capitalize(str)}` : ``);
var hasChanged = (value, oldValue)=>value !== oldValue && (value === value || oldValue === oldValue);
// node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var targetMap = /* @__PURE__ */ new WeakMap();
var effectStack = [];
var activeEffect;
var ITERATE_KEY = Symbol("iterate");
var MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
function isEffect(fn) {
    return fn && fn._isEffect === true;
}
function effect2(fn, options = EMPTY_OBJ) {
    if (isEffect(fn)) fn = fn.raw;
    const effect3 = createReactiveEffect(fn, options);
    if (!options.lazy) effect3();
    return effect3;
}
function stop(effect3) {
    if (effect3.active) {
        cleanup(effect3);
        if (effect3.options.onStop) effect3.options.onStop();
        effect3.active = false;
    }
}
var uid = 0;
function createReactiveEffect(fn, options) {
    const effect3 = function reactiveEffect() {
        if (!effect3.active) return fn();
        if (!effectStack.includes(effect3)) {
            cleanup(effect3);
            try {
                enableTracking();
                effectStack.push(effect3);
                activeEffect = effect3;
                return fn();
            } finally{
                effectStack.pop();
                resetTracking();
                activeEffect = effectStack[effectStack.length - 1];
            }
        }
    };
    effect3.id = uid++;
    effect3.allowRecurse = !!options.allowRecurse;
    effect3._isEffect = true;
    effect3.active = true;
    effect3.raw = fn;
    effect3.deps = [];
    effect3.options = options;
    return effect3;
}
function cleanup(effect3) {
    const { deps } = effect3;
    if (deps.length) {
        for(let i = 0; i < deps.length; i++)deps[i].delete(effect3);
        deps.length = 0;
    }
}
var shouldTrack = true;
var trackStack = [];
function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
}
function enableTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = true;
}
function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
    if (!shouldTrack || activeEffect === void 0) return;
    let depsMap = targetMap.get(target);
    if (!depsMap) targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    let dep = depsMap.get(key);
    if (!dep) depsMap.set(key, dep = /* @__PURE__ */ new Set());
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep);
        if (activeEffect.options.onTrack) activeEffect.options.onTrack({
            effect: activeEffect,
            target,
            type,
            key
        });
    }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;
    const effects = /* @__PURE__ */ new Set();
    const add2 = (effectsToAdd)=>{
        if (effectsToAdd) effectsToAdd.forEach((effect3)=>{
            if (effect3 !== activeEffect || effect3.allowRecurse) effects.add(effect3);
        });
    };
    if (type === "clear") depsMap.forEach(add2);
    else if (key === "length" && isArray(target)) depsMap.forEach((dep, key2)=>{
        if (key2 === "length" || key2 >= newValue) add2(dep);
    });
    else {
        if (key !== void 0) add2(depsMap.get(key));
        switch(type){
            case "add":
                if (!isArray(target)) {
                    add2(depsMap.get(ITERATE_KEY));
                    if (isMap(target)) add2(depsMap.get(MAP_KEY_ITERATE_KEY));
                } else if (isIntegerKey(key)) add2(depsMap.get("length"));
                break;
            case "delete":
                if (!isArray(target)) {
                    add2(depsMap.get(ITERATE_KEY));
                    if (isMap(target)) add2(depsMap.get(MAP_KEY_ITERATE_KEY));
                }
                break;
            case "set":
                if (isMap(target)) add2(depsMap.get(ITERATE_KEY));
                break;
        }
    }
    const run = (effect3)=>{
        if (effect3.options.onTrigger) effect3.options.onTrigger({
            effect: effect3,
            target,
            key,
            type,
            newValue,
            oldValue,
            oldTarget
        });
        if (effect3.options.scheduler) effect3.options.scheduler(effect3);
        else effect3();
    };
    effects.forEach(run);
}
var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key)=>Symbol[key]).filter(isSymbol));
var get2 = /* @__PURE__ */ createGetter();
var readonlyGet = /* @__PURE__ */ createGetter(true);
var arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
    const instrumentations = {};
    [
        "includes",
        "indexOf",
        "lastIndexOf"
    ].forEach((key)=>{
        instrumentations[key] = function(...args) {
            const arr = toRaw(this);
            for(let i = 0, l = this.length; i < l; i++)track(arr, "get", i + "");
            const res = arr[key](...args);
            if (res === -1 || res === false) return arr[key](...args.map(toRaw));
            else return res;
        };
    });
    [
        "push",
        "pop",
        "shift",
        "unshift",
        "splice"
    ].forEach((key)=>{
        instrumentations[key] = function(...args) {
            pauseTracking();
            const res = toRaw(this)[key].apply(this, args);
            resetTracking();
            return res;
        };
    });
    return instrumentations;
}
function createGetter(isReadonly = false, shallow = false) {
    return function get3(target, key, receiver) {
        if (key === "__v_isReactive") return !isReadonly;
        else if (key === "__v_isReadonly") return isReadonly;
        else if (key === "__v_raw" && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) return target;
        const targetIsArray = isArray(target);
        if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) return Reflect.get(arrayInstrumentations, key, receiver);
        const res = Reflect.get(target, key, receiver);
        if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) return res;
        if (!isReadonly) track(target, "get", key);
        if (shallow) return res;
        if (isRef(res)) {
            const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
            return shouldUnwrap ? res.value : res;
        }
        if (isObject(res)) return isReadonly ? readonly(res) : reactive2(res);
        return res;
    };
}
var set2 = /* @__PURE__ */ createSetter();
function createSetter(shallow = false) {
    return function set3(target, key, value, receiver) {
        let oldValue = target[key];
        if (!shallow) {
            value = toRaw(value);
            oldValue = toRaw(oldValue);
            if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
                oldValue.value = value;
                return true;
            }
        }
        const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
        const result = Reflect.set(target, key, value, receiver);
        if (target === toRaw(receiver)) {
            if (!hadKey) trigger(target, "add", key, value);
            else if (hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
        }
        return result;
    };
}
function deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) trigger(target, "delete", key, void 0, oldValue);
    return result;
}
function has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) track(target, "has", key);
    return result;
}
function ownKeys(target) {
    track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
}
var mutableHandlers = {
    get: get2,
    set: set2,
    deleteProperty,
    has,
    ownKeys
};
var readonlyHandlers = {
    get: readonlyGet,
    set (target, key) {
        console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
        return true;
    },
    deleteProperty (target, key) {
        console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
        return true;
    }
};
var toReactive = (value)=>isObject(value) ? reactive2(value) : value;
var toReadonly = (value)=>isObject(value) ? readonly(value) : value;
var toShallow = (value)=>value;
var getProto = (v)=>Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly = false, isShallow = false) {
    target = target["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) !isReadonly && track(rawTarget, "get", key);
    !isReadonly && track(rawTarget, "get", rawKey);
    const { has: has2 } = getProto(rawTarget);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    if (has2.call(rawTarget, key)) return wrap(target.get(key));
    else if (has2.call(rawTarget, rawKey)) return wrap(target.get(rawKey));
    else if (target !== rawTarget) target.get(key);
}
function has$1(key, isReadonly = false) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) !isReadonly && track(rawTarget, "has", key);
    !isReadonly && track(rawTarget, "has", rawKey);
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly = false) {
    target = target["__v_raw"];
    !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
}
function add(value) {
    value = toRaw(value);
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
        target.add(value);
        trigger(target, "add", value, value);
    }
    return this;
}
function set$1(key, value) {
    value = toRaw(value);
    const target = toRaw(this);
    const { has: has2, get: get3 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
        key = toRaw(key);
        hadKey = has2.call(target, key);
    } else checkIdentityKeys(target, has2, key);
    const oldValue = get3.call(target, key);
    target.set(key, value);
    if (!hadKey) trigger(target, "add", key, value);
    else if (hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
    return this;
}
function deleteEntry(key) {
    const target = toRaw(this);
    const { has: has2, get: get3 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
        key = toRaw(key);
        hadKey = has2.call(target, key);
    } else checkIdentityKeys(target, has2, key);
    const oldValue = get3 ? get3.call(target, key) : void 0;
    const result = target.delete(key);
    if (hadKey) trigger(target, "delete", key, void 0, oldValue);
    return result;
}
function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const oldTarget = isMap(target) ? new Map(target) : new Set(target);
    const result = target.clear();
    if (hadItems) trigger(target, "clear", void 0, void 0, oldTarget);
    return result;
}
function createForEach(isReadonly, isShallow) {
    return function forEach(callback, thisArg) {
        const observed = this;
        const target = observed["__v_raw"];
        const rawTarget = toRaw(target);
        const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
        !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
        return target.forEach((value, key)=>{
            return callback.call(thisArg, wrap(value), wrap(key), observed);
        });
    };
}
function createIterableMethod(method, isReadonly, isShallow) {
    return function(...args) {
        const target = this["__v_raw"];
        const rawTarget = toRaw(target);
        const targetIsMap = isMap(rawTarget);
        const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
        const isKeyOnly = method === "keys" && targetIsMap;
        const innerIterator = target[method](...args);
        const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
        !isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
        return {
            // iterator protocol
            next () {
                const { value, done } = innerIterator.next();
                return done ? {
                    value,
                    done
                } : {
                    value: isPair ? [
                        wrap(value[0]),
                        wrap(value[1])
                    ] : wrap(value),
                    done
                };
            },
            // iterable protocol
            [Symbol.iterator] () {
                return this;
            }
        };
    };
}
function createReadonlyMethod(type) {
    return function(...args) {
        {
            const key = args[0] ? `on key "${args[0]}" ` : ``;
            console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
        }
        return type === "delete" ? false : this;
    };
}
function createInstrumentations() {
    const mutableInstrumentations2 = {
        get (key) {
            return get$1(this, key);
        },
        get size () {
            return size(this);
        },
        has: has$1,
        add,
        set: set$1,
        delete: deleteEntry,
        clear,
        forEach: createForEach(false, false)
    };
    const shallowInstrumentations2 = {
        get (key) {
            return get$1(this, key, false, true);
        },
        get size () {
            return size(this);
        },
        has: has$1,
        add,
        set: set$1,
        delete: deleteEntry,
        clear,
        forEach: createForEach(false, true)
    };
    const readonlyInstrumentations2 = {
        get (key) {
            return get$1(this, key, true);
        },
        get size () {
            return size(this, true);
        },
        has (key) {
            return has$1.call(this, key, true);
        },
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear"),
        forEach: createForEach(true, false)
    };
    const shallowReadonlyInstrumentations2 = {
        get (key) {
            return get$1(this, key, true, true);
        },
        get size () {
            return size(this, true);
        },
        has (key) {
            return has$1.call(this, key, true);
        },
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear"),
        forEach: createForEach(true, true)
    };
    const iteratorMethods = [
        "keys",
        "values",
        "entries",
        Symbol.iterator
    ];
    iteratorMethods.forEach((method)=>{
        mutableInstrumentations2[method] = createIterableMethod(method, false, false);
        readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
        shallowInstrumentations2[method] = createIterableMethod(method, false, true);
        shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
    });
    return [
        mutableInstrumentations2,
        readonlyInstrumentations2,
        shallowInstrumentations2,
        shallowReadonlyInstrumentations2
    ];
}
var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly, shallow) {
    const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver)=>{
        if (key === "__v_isReactive") return !isReadonly;
        else if (key === "__v_isReadonly") return isReadonly;
        else if (key === "__v_raw") return target;
        return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
}
var mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
var readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
function checkIdentityKeys(target, has2, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has2.call(target, rawKey)) {
        const type = toRawType(target);
        console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
    }
}
var reactiveMap = /* @__PURE__ */ new WeakMap();
var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
var readonlyMap = /* @__PURE__ */ new WeakMap();
var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
    switch(rawType){
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0;
    }
}
function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive2(target) {
    if (target && target["__v_isReadonly"]) return target;
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
        console.warn(`value cannot be made reactive: ${String(target)}`);
        return target;
    }
    if (target["__v_raw"] && !(isReadonly && target["__v_isReactive"])) return target;
    const existingProxy = proxyMap.get(target);
    if (existingProxy) return existingProxy;
    const targetType = getTargetType(target);
    if (targetType === 0) return target;
    const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
}
function toRaw(observed) {
    return observed && toRaw(observed["__v_raw"]) || observed;
}
function isRef(r) {
    return Boolean(r && r.__v_isRef === true);
}
// packages/alpinejs/src/magics/$nextTick.js
magic("nextTick", ()=>nextTick);
// packages/alpinejs/src/magics/$dispatch.js
magic("dispatch", (el)=>dispatch.bind(dispatch, el));
// packages/alpinejs/src/magics/$watch.js
magic("watch", (el, { evaluateLater: evaluateLater2, cleanup: cleanup2 })=>(key, callback)=>{
        let evaluate2 = evaluateLater2(key);
        let getter = ()=>{
            let value;
            evaluate2((i)=>value = i);
            return value;
        };
        let unwatch = watch(getter, callback);
        cleanup2(unwatch);
    });
// packages/alpinejs/src/magics/$store.js
magic("store", getStores);
// packages/alpinejs/src/magics/$data.js
magic("data", (el)=>scope(el));
// packages/alpinejs/src/magics/$root.js
magic("root", (el)=>closestRoot(el));
// packages/alpinejs/src/magics/$refs.js
magic("refs", (el)=>{
    if (el._x_refs_proxy) return el._x_refs_proxy;
    el._x_refs_proxy = mergeProxies(getArrayOfRefObject(el));
    return el._x_refs_proxy;
});
function getArrayOfRefObject(el) {
    let refObjects = [];
    findClosest(el, (i)=>{
        if (i._x_refs) refObjects.push(i._x_refs);
    });
    return refObjects;
}
// packages/alpinejs/src/ids.js
var globalIdMemo = {};
function findAndIncrementId(name) {
    if (!globalIdMemo[name]) globalIdMemo[name] = 0;
    return ++globalIdMemo[name];
}
function closestIdRoot(el, name) {
    return findClosest(el, (element)=>{
        if (element._x_ids && element._x_ids[name]) return true;
    });
}
function setIdRoot(el, name) {
    if (!el._x_ids) el._x_ids = {};
    if (!el._x_ids[name]) el._x_ids[name] = findAndIncrementId(name);
}
// packages/alpinejs/src/magics/$id.js
magic("id", (el, { cleanup: cleanup2 })=>(name, key = null)=>{
        let cacheKey = `${name}${key ? `-${key}` : ""}`;
        return cacheIdByNameOnElement(el, cacheKey, cleanup2, ()=>{
            let root = closestIdRoot(el, name);
            let id = root ? root._x_ids[name] : findAndIncrementId(name);
            return key ? `${name}-${id}-${key}` : `${name}-${id}`;
        });
    });
interceptClone((from, to)=>{
    if (from._x_id) to._x_id = from._x_id;
});
function cacheIdByNameOnElement(el, cacheKey, cleanup2, callback) {
    if (!el._x_id) el._x_id = {};
    if (el._x_id[cacheKey]) return el._x_id[cacheKey];
    let output = callback();
    el._x_id[cacheKey] = output;
    cleanup2(()=>{
        delete el._x_id[cacheKey];
    });
    return output;
}
// packages/alpinejs/src/magics/$el.js
magic("el", (el)=>el);
// packages/alpinejs/src/magics/index.js
warnMissingPluginMagic("Focus", "focus", "focus");
warnMissingPluginMagic("Persist", "persist", "persist");
function warnMissingPluginMagic(name, magicName, slug) {
    magic(magicName, (el)=>warn(`You can't use [$${magicName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
}
// packages/alpinejs/src/directives/x-modelable.js
directive("modelable", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2, cleanup: cleanup2 })=>{
    let func = evaluateLater2(expression);
    let innerGet = ()=>{
        let result;
        func((i)=>result = i);
        return result;
    };
    let evaluateInnerSet = evaluateLater2(`${expression} = __placeholder`);
    let innerSet = (val)=>evaluateInnerSet(()=>{}, {
            scope: {
                "__placeholder": val
            }
        });
    let initialValue = innerGet();
    innerSet(initialValue);
    queueMicrotask(()=>{
        if (!el._x_model) return;
        el._x_removeModelListeners["default"]();
        let outerGet = el._x_model.get;
        let outerSet = el._x_model.set;
        let releaseEntanglement = entangle({
            get () {
                return outerGet();
            },
            set (value) {
                outerSet(value);
            }
        }, {
            get () {
                return innerGet();
            },
            set (value) {
                innerSet(value);
            }
        });
        cleanup2(releaseEntanglement);
    });
});
// packages/alpinejs/src/directives/x-teleport.js
directive("teleport", (el, { modifiers, expression }, { cleanup: cleanup2 })=>{
    if (el.tagName.toLowerCase() !== "template") warn("x-teleport can only be used on a <template> tag", el);
    let target = getTarget(expression);
    let clone2 = el.content.cloneNode(true).firstElementChild;
    el._x_teleport = clone2;
    clone2._x_teleportBack = el;
    el.setAttribute("data-teleport-template", true);
    clone2.setAttribute("data-teleport-target", true);
    if (el._x_forwardEvents) el._x_forwardEvents.forEach((eventName)=>{
        clone2.addEventListener(eventName, (e)=>{
            e.stopPropagation();
            el.dispatchEvent(new e.constructor(e.type, e));
        });
    });
    addScopeToNode(clone2, {}, el);
    let placeInDom = (clone3, target2, modifiers2)=>{
        if (modifiers2.includes("prepend")) target2.parentNode.insertBefore(clone3, target2);
        else if (modifiers2.includes("append")) target2.parentNode.insertBefore(clone3, target2.nextSibling);
        else target2.appendChild(clone3);
    };
    mutateDom(()=>{
        placeInDom(clone2, target, modifiers);
        skipDuringClone(()=>{
            initTree(clone2);
        })();
    });
    el._x_teleportPutBack = ()=>{
        let target2 = getTarget(expression);
        mutateDom(()=>{
            placeInDom(el._x_teleport, target2, modifiers);
        });
    };
    cleanup2(()=>mutateDom(()=>{
            clone2.remove();
            destroyTree(clone2);
        }));
});
var teleportContainerDuringClone = document.createElement("div");
function getTarget(expression) {
    let target = skipDuringClone(()=>{
        return document.querySelector(expression);
    }, ()=>{
        return teleportContainerDuringClone;
    })();
    if (!target) warn(`Cannot find x-teleport element for selector: "${expression}"`);
    return target;
}
// packages/alpinejs/src/directives/x-ignore.js
var handler = ()=>{};
handler.inline = (el, { modifiers }, { cleanup: cleanup2 })=>{
    modifiers.includes("self") ? el._x_ignoreSelf = true : el._x_ignore = true;
    cleanup2(()=>{
        modifiers.includes("self") ? delete el._x_ignoreSelf : delete el._x_ignore;
    });
};
directive("ignore", handler);
// packages/alpinejs/src/directives/x-effect.js
directive("effect", skipDuringClone((el, { expression }, { effect: effect3 })=>{
    effect3(evaluateLater(el, expression));
}));
// packages/alpinejs/src/utils/on.js
function on(el, event, modifiers, callback) {
    let listenerTarget = el;
    let handler4 = (e)=>callback(e);
    let options = {};
    let wrapHandler = (callback2, wrapper)=>(e)=>wrapper(callback2, e);
    if (modifiers.includes("dot")) event = dotSyntax(event);
    if (modifiers.includes("camel")) event = camelCase2(event);
    if (modifiers.includes("passive")) options.passive = true;
    if (modifiers.includes("capture")) options.capture = true;
    if (modifiers.includes("window")) listenerTarget = window;
    if (modifiers.includes("document")) listenerTarget = document;
    if (modifiers.includes("debounce")) {
        let nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
        let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
        handler4 = debounce(handler4, wait);
    }
    if (modifiers.includes("throttle")) {
        let nextModifier = modifiers[modifiers.indexOf("throttle") + 1] || "invalid-wait";
        let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
        handler4 = throttle(handler4, wait);
    }
    if (modifiers.includes("prevent")) handler4 = wrapHandler(handler4, (next, e)=>{
        e.preventDefault();
        next(e);
    });
    if (modifiers.includes("stop")) handler4 = wrapHandler(handler4, (next, e)=>{
        e.stopPropagation();
        next(e);
    });
    if (modifiers.includes("once")) handler4 = wrapHandler(handler4, (next, e)=>{
        next(e);
        listenerTarget.removeEventListener(event, handler4, options);
    });
    if (modifiers.includes("away") || modifiers.includes("outside")) {
        listenerTarget = document;
        handler4 = wrapHandler(handler4, (next, e)=>{
            if (el.contains(e.target)) return;
            if (e.target.isConnected === false) return;
            if (el.offsetWidth < 1 && el.offsetHeight < 1) return;
            if (el._x_isShown === false) return;
            next(e);
        });
    }
    if (modifiers.includes("self")) handler4 = wrapHandler(handler4, (next, e)=>{
        e.target === el && next(e);
    });
    if (isKeyEvent(event) || isClickEvent(event)) handler4 = wrapHandler(handler4, (next, e)=>{
        if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) return;
        next(e);
    });
    listenerTarget.addEventListener(event, handler4, options);
    return ()=>{
        listenerTarget.removeEventListener(event, handler4, options);
    };
}
function dotSyntax(subject) {
    return subject.replace(/-/g, ".");
}
function camelCase2(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char)=>char.toUpperCase());
}
function isNumeric(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
}
function kebabCase2(subject) {
    if ([
        " ",
        "_"
    ].includes(subject)) return subject;
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function isKeyEvent(event) {
    return [
        "keydown",
        "keyup"
    ].includes(event);
}
function isClickEvent(event) {
    return [
        "contextmenu",
        "click",
        "mouse"
    ].some((i)=>event.includes(i));
}
function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
    let keyModifiers = modifiers.filter((i)=>{
        return ![
            "window",
            "document",
            "prevent",
            "stop",
            "once",
            "capture",
            "self",
            "away",
            "outside",
            "passive"
        ].includes(i);
    });
    if (keyModifiers.includes("debounce")) {
        let debounceIndex = keyModifiers.indexOf("debounce");
        keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (keyModifiers.includes("throttle")) {
        let debounceIndex = keyModifiers.indexOf("throttle");
        keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (keyModifiers.length === 0) return false;
    if (keyModifiers.length === 1 && keyToModifiers(e.key).includes(keyModifiers[0])) return false;
    const systemKeyModifiers = [
        "ctrl",
        "shift",
        "alt",
        "meta",
        "cmd",
        "super"
    ];
    const selectedSystemKeyModifiers = systemKeyModifiers.filter((modifier)=>keyModifiers.includes(modifier));
    keyModifiers = keyModifiers.filter((i)=>!selectedSystemKeyModifiers.includes(i));
    if (selectedSystemKeyModifiers.length > 0) {
        const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter((modifier)=>{
            if (modifier === "cmd" || modifier === "super") modifier = "meta";
            return e[`${modifier}Key`];
        });
        if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
            if (isClickEvent(e.type)) return false;
            if (keyToModifiers(e.key).includes(keyModifiers[0])) return false;
        }
    }
    return true;
}
function keyToModifiers(key) {
    if (!key) return [];
    key = kebabCase2(key);
    let modifierToKeyMap = {
        "ctrl": "control",
        "slash": "/",
        "space": " ",
        "spacebar": " ",
        "cmd": "meta",
        "esc": "escape",
        "up": "arrow-up",
        "down": "arrow-down",
        "left": "arrow-left",
        "right": "arrow-right",
        "period": ".",
        "comma": ",",
        "equal": "=",
        "minus": "-",
        "underscore": "_"
    };
    modifierToKeyMap[key] = key;
    return Object.keys(modifierToKeyMap).map((modifier)=>{
        if (modifierToKeyMap[modifier] === key) return modifier;
    }).filter((modifier)=>modifier);
}
// packages/alpinejs/src/directives/x-model.js
directive("model", (el, { modifiers, expression }, { effect: effect3, cleanup: cleanup2 })=>{
    let scopeTarget = el;
    if (modifiers.includes("parent")) scopeTarget = el.parentNode;
    let evaluateGet = evaluateLater(scopeTarget, expression);
    let evaluateSet;
    if (typeof expression === "string") evaluateSet = evaluateLater(scopeTarget, `${expression} = __placeholder`);
    else if (typeof expression === "function" && typeof expression() === "string") evaluateSet = evaluateLater(scopeTarget, `${expression()} = __placeholder`);
    else evaluateSet = ()=>{};
    let getValue = ()=>{
        let result;
        evaluateGet((value)=>result = value);
        return isGetterSetter(result) ? result.get() : result;
    };
    let setValue = (value)=>{
        let result;
        evaluateGet((value2)=>result = value2);
        if (isGetterSetter(result)) result.set(value);
        else evaluateSet(()=>{}, {
            scope: {
                "__placeholder": value
            }
        });
    };
    if (typeof expression === "string" && el.type === "radio") mutateDom(()=>{
        if (!el.hasAttribute("name")) el.setAttribute("name", expression);
    });
    var event = el.tagName.toLowerCase() === "select" || [
        "checkbox",
        "radio"
    ].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
    let removeListener = isCloning ? ()=>{} : on(el, event, modifiers, (e)=>{
        setValue(getInputValue(el, modifiers, e, getValue()));
    });
    if (modifiers.includes("fill")) {
        if ([
            void 0,
            null,
            ""
        ].includes(getValue()) || isCheckbox(el) && Array.isArray(getValue()) || el.tagName.toLowerCase() === "select" && el.multiple) setValue(getInputValue(el, modifiers, {
            target: el
        }, getValue()));
    }
    if (!el._x_removeModelListeners) el._x_removeModelListeners = {};
    el._x_removeModelListeners["default"] = removeListener;
    cleanup2(()=>el._x_removeModelListeners["default"]());
    if (el.form) {
        let removeResetListener = on(el.form, "reset", [], (e)=>{
            nextTick(()=>el._x_model && el._x_model.set(getInputValue(el, modifiers, {
                    target: el
                }, getValue())));
        });
        cleanup2(()=>removeResetListener());
    }
    el._x_model = {
        get () {
            return getValue();
        },
        set (value) {
            setValue(value);
        }
    };
    el._x_forceModelUpdate = (value)=>{
        if (value === void 0 && typeof expression === "string" && expression.match(/\./)) value = "";
        window.fromModel = true;
        mutateDom(()=>bind(el, "value", value));
        delete window.fromModel;
    };
    effect3(()=>{
        let value = getValue();
        if (modifiers.includes("unintrusive") && document.activeElement.isSameNode(el)) return;
        el._x_forceModelUpdate(value);
    });
});
function getInputValue(el, modifiers, event, currentValue) {
    return mutateDom(()=>{
        if (event instanceof CustomEvent && event.detail !== void 0) return event.detail !== null && event.detail !== void 0 ? event.detail : event.target.value;
        else if (isCheckbox(el)) {
            if (Array.isArray(currentValue)) {
                let newValue = null;
                if (modifiers.includes("number")) newValue = safeParseNumber(event.target.value);
                else if (modifiers.includes("boolean")) newValue = safeParseBoolean(event.target.value);
                else newValue = event.target.value;
                return event.target.checked ? currentValue.includes(newValue) ? currentValue : currentValue.concat([
                    newValue
                ]) : currentValue.filter((el2)=>!checkedAttrLooseCompare2(el2, newValue));
            } else return event.target.checked;
        } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
            if (modifiers.includes("number")) return Array.from(event.target.selectedOptions).map((option)=>{
                let rawValue = option.value || option.text;
                return safeParseNumber(rawValue);
            });
            else if (modifiers.includes("boolean")) return Array.from(event.target.selectedOptions).map((option)=>{
                let rawValue = option.value || option.text;
                return safeParseBoolean(rawValue);
            });
            return Array.from(event.target.selectedOptions).map((option)=>{
                return option.value || option.text;
            });
        } else {
            let newValue;
            if (isRadio(el)) {
                if (event.target.checked) newValue = event.target.value;
                else newValue = currentValue;
            } else newValue = event.target.value;
            if (modifiers.includes("number")) return safeParseNumber(newValue);
            else if (modifiers.includes("boolean")) return safeParseBoolean(newValue);
            else if (modifiers.includes("trim")) return newValue.trim();
            else return newValue;
        }
    });
}
function safeParseNumber(rawValue) {
    let number = rawValue ? parseFloat(rawValue) : null;
    return isNumeric2(number) ? number : rawValue;
}
function checkedAttrLooseCompare2(valueA, valueB) {
    return valueA == valueB;
}
function isNumeric2(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
}
function isGetterSetter(value) {
    return value !== null && typeof value === "object" && typeof value.get === "function" && typeof value.set === "function";
}
// packages/alpinejs/src/directives/x-cloak.js
directive("cloak", (el)=>queueMicrotask(()=>mutateDom(()=>el.removeAttribute(prefix("cloak")))));
// packages/alpinejs/src/directives/x-init.js
addInitSelector(()=>`[${prefix("init")}]`);
directive("init", skipDuringClone((el, { expression }, { evaluate: evaluate2 })=>{
    if (typeof expression === "string") return !!expression.trim() && evaluate2(expression, {}, false);
    return evaluate2(expression, {}, false);
}));
// packages/alpinejs/src/directives/x-text.js
directive("text", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 })=>{
    let evaluate2 = evaluateLater2(expression);
    effect3(()=>{
        evaluate2((value)=>{
            mutateDom(()=>{
                el.textContent = value;
            });
        });
    });
});
// packages/alpinejs/src/directives/x-html.js
directive("html", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 })=>{
    let evaluate2 = evaluateLater2(expression);
    effect3(()=>{
        evaluate2((value)=>{
            mutateDom(()=>{
                el.innerHTML = value;
                el._x_ignoreSelf = true;
                initTree(el);
                delete el._x_ignoreSelf;
            });
        });
    });
});
// packages/alpinejs/src/directives/x-bind.js
mapAttributes(startingWith(":", into(prefix("bind:"))));
var handler2 = (el, { value, modifiers, expression, original }, { effect: effect3, cleanup: cleanup2 })=>{
    if (!value) {
        let bindingProviders = {};
        injectBindingProviders(bindingProviders);
        let getBindings = evaluateLater(el, expression);
        getBindings((bindings)=>{
            applyBindingsObject(el, bindings, original);
        }, {
            scope: bindingProviders
        });
        return;
    }
    if (value === "key") return storeKeyForXFor(el, expression);
    if (el._x_inlineBindings && el._x_inlineBindings[value] && el._x_inlineBindings[value].extract) return;
    let evaluate2 = evaluateLater(el, expression);
    effect3(()=>evaluate2((result)=>{
            if (result === void 0 && typeof expression === "string" && expression.match(/\./)) result = "";
            mutateDom(()=>bind(el, value, result, modifiers));
        }));
    cleanup2(()=>{
        el._x_undoAddedClasses && el._x_undoAddedClasses();
        el._x_undoAddedStyles && el._x_undoAddedStyles();
    });
};
handler2.inline = (el, { value, modifiers, expression })=>{
    if (!value) return;
    if (!el._x_inlineBindings) el._x_inlineBindings = {};
    el._x_inlineBindings[value] = {
        expression,
        extract: false
    };
};
directive("bind", handler2);
function storeKeyForXFor(el, expression) {
    el._x_keyExpression = expression;
}
// packages/alpinejs/src/directives/x-data.js
addRootSelector(()=>`[${prefix("data")}]`);
directive("data", (el, { expression }, { cleanup: cleanup2 })=>{
    if (shouldSkipRegisteringDataDuringClone(el)) return;
    expression = expression === "" ? "{}" : expression;
    let magicContext = {};
    injectMagics(magicContext, el);
    let dataProviderContext = {};
    injectDataProviders(dataProviderContext, magicContext);
    let data2 = evaluate(el, expression, {
        scope: dataProviderContext
    });
    if (data2 === void 0 || data2 === true) data2 = {};
    injectMagics(data2, el);
    let reactiveData = reactive(data2);
    initInterceptors(reactiveData);
    let undo = addScopeToNode(el, reactiveData);
    reactiveData["init"] && evaluate(el, reactiveData["init"]);
    cleanup2(()=>{
        reactiveData["destroy"] && evaluate(el, reactiveData["destroy"]);
        undo();
    });
});
interceptClone((from, to)=>{
    if (from._x_dataStack) {
        to._x_dataStack = from._x_dataStack;
        to.setAttribute("data-has-alpine-state", true);
    }
});
function shouldSkipRegisteringDataDuringClone(el) {
    if (!isCloning) return false;
    if (isCloningLegacy) return true;
    return el.hasAttribute("data-has-alpine-state");
}
// packages/alpinejs/src/directives/x-show.js
directive("show", (el, { modifiers, expression }, { effect: effect3 })=>{
    let evaluate2 = evaluateLater(el, expression);
    if (!el._x_doHide) el._x_doHide = ()=>{
        mutateDom(()=>{
            el.style.setProperty("display", "none", modifiers.includes("important") ? "important" : void 0);
        });
    };
    if (!el._x_doShow) el._x_doShow = ()=>{
        mutateDom(()=>{
            if (el.style.length === 1 && el.style.display === "none") el.removeAttribute("style");
            else el.style.removeProperty("display");
        });
    };
    let hide = ()=>{
        el._x_doHide();
        el._x_isShown = false;
    };
    let show = ()=>{
        el._x_doShow();
        el._x_isShown = true;
    };
    let clickAwayCompatibleShow = ()=>setTimeout(show);
    let toggle = once((value)=>value ? show() : hide(), (value)=>{
        if (typeof el._x_toggleAndCascadeWithTransitions === "function") el._x_toggleAndCascadeWithTransitions(el, value, show, hide);
        else value ? clickAwayCompatibleShow() : hide();
    });
    let oldValue;
    let firstTime = true;
    effect3(()=>evaluate2((value)=>{
            if (!firstTime && value === oldValue) return;
            if (modifiers.includes("immediate")) value ? clickAwayCompatibleShow() : hide();
            toggle(value);
            oldValue = value;
            firstTime = false;
        }));
});
// packages/alpinejs/src/directives/x-for.js
directive("for", (el, { expression }, { effect: effect3, cleanup: cleanup2 })=>{
    let iteratorNames = parseForExpression(expression);
    let evaluateItems = evaluateLater(el, iteratorNames.items);
    let evaluateKey = evaluateLater(el, // the x-bind:key expression is stored for our use instead of evaluated.
    el._x_keyExpression || "index");
    el._x_prevKeys = [];
    el._x_lookup = {};
    effect3(()=>loop(el, iteratorNames, evaluateItems, evaluateKey));
    cleanup2(()=>{
        Object.values(el._x_lookup).forEach((el2)=>mutateDom(()=>{
                destroyTree(el2);
                el2.remove();
            }));
        delete el._x_prevKeys;
        delete el._x_lookup;
    });
});
function loop(el, iteratorNames, evaluateItems, evaluateKey) {
    let isObject2 = (i)=>typeof i === "object" && !Array.isArray(i);
    let templateEl = el;
    evaluateItems((items)=>{
        if (isNumeric3(items) && items >= 0) items = Array.from(Array(items).keys(), (i)=>i + 1);
        if (items === void 0) items = [];
        let lookup = el._x_lookup;
        let prevKeys = el._x_prevKeys;
        let scopes = [];
        let keys = [];
        if (isObject2(items)) items = Object.entries(items).map(([key, value])=>{
            let scope2 = getIterationScopeVariables(iteratorNames, value, key, items);
            evaluateKey((value2)=>{
                if (keys.includes(value2)) warn("Duplicate key on x-for", el);
                keys.push(value2);
            }, {
                scope: {
                    index: key,
                    ...scope2
                }
            });
            scopes.push(scope2);
        });
        else for(let i = 0; i < items.length; i++){
            let scope2 = getIterationScopeVariables(iteratorNames, items[i], i, items);
            evaluateKey((value)=>{
                if (keys.includes(value)) warn("Duplicate key on x-for", el);
                keys.push(value);
            }, {
                scope: {
                    index: i,
                    ...scope2
                }
            });
            scopes.push(scope2);
        }
        let adds = [];
        let moves = [];
        let removes = [];
        let sames = [];
        for(let i = 0; i < prevKeys.length; i++){
            let key = prevKeys[i];
            if (keys.indexOf(key) === -1) removes.push(key);
        }
        prevKeys = prevKeys.filter((key)=>!removes.includes(key));
        let lastKey = "template";
        for(let i = 0; i < keys.length; i++){
            let key = keys[i];
            let prevIndex = prevKeys.indexOf(key);
            if (prevIndex === -1) {
                prevKeys.splice(i, 0, key);
                adds.push([
                    lastKey,
                    i
                ]);
            } else if (prevIndex !== i) {
                let keyInSpot = prevKeys.splice(i, 1)[0];
                let keyForSpot = prevKeys.splice(prevIndex - 1, 1)[0];
                prevKeys.splice(i, 0, keyForSpot);
                prevKeys.splice(prevIndex, 0, keyInSpot);
                moves.push([
                    keyInSpot,
                    keyForSpot
                ]);
            } else sames.push(key);
            lastKey = key;
        }
        for(let i = 0; i < removes.length; i++){
            let key = removes[i];
            if (!(key in lookup)) continue;
            mutateDom(()=>{
                destroyTree(lookup[key]);
                lookup[key].remove();
            });
            delete lookup[key];
        }
        for(let i = 0; i < moves.length; i++){
            let [keyInSpot, keyForSpot] = moves[i];
            let elInSpot = lookup[keyInSpot];
            let elForSpot = lookup[keyForSpot];
            let marker = document.createElement("div");
            mutateDom(()=>{
                if (!elForSpot) warn(`x-for ":key" is undefined or invalid`, templateEl, keyForSpot, lookup);
                elForSpot.after(marker);
                elInSpot.after(elForSpot);
                elForSpot._x_currentIfEl && elForSpot.after(elForSpot._x_currentIfEl);
                marker.before(elInSpot);
                elInSpot._x_currentIfEl && elInSpot.after(elInSpot._x_currentIfEl);
                marker.remove();
            });
            elForSpot._x_refreshXForScope(scopes[keys.indexOf(keyForSpot)]);
        }
        for(let i = 0; i < adds.length; i++){
            let [lastKey2, index] = adds[i];
            let lastEl = lastKey2 === "template" ? templateEl : lookup[lastKey2];
            if (lastEl._x_currentIfEl) lastEl = lastEl._x_currentIfEl;
            let scope2 = scopes[index];
            let key = keys[index];
            let clone2 = document.importNode(templateEl.content, true).firstElementChild;
            let reactiveScope = reactive(scope2);
            addScopeToNode(clone2, reactiveScope, templateEl);
            clone2._x_refreshXForScope = (newScope)=>{
                Object.entries(newScope).forEach(([key2, value])=>{
                    reactiveScope[key2] = value;
                });
            };
            mutateDom(()=>{
                lastEl.after(clone2);
                skipDuringClone(()=>initTree(clone2))();
            });
            if (typeof key === "object") warn("x-for key cannot be an object, it must be a string or an integer", templateEl);
            lookup[key] = clone2;
        }
        for(let i = 0; i < sames.length; i++)lookup[sames[i]]._x_refreshXForScope(scopes[keys.indexOf(sames[i])]);
        templateEl._x_prevKeys = keys;
    });
}
function parseForExpression(expression) {
    let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
    let stripParensRE = /^\s*\(|\)\s*$/g;
    let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
    let inMatch = expression.match(forAliasRE);
    if (!inMatch) return;
    let res = {};
    res.items = inMatch[2].trim();
    let item = inMatch[1].replace(stripParensRE, "").trim();
    let iteratorMatch = item.match(forIteratorRE);
    if (iteratorMatch) {
        res.item = item.replace(forIteratorRE, "").trim();
        res.index = iteratorMatch[1].trim();
        if (iteratorMatch[2]) res.collection = iteratorMatch[2].trim();
    } else res.item = item;
    return res;
}
function getIterationScopeVariables(iteratorNames, item, index, items) {
    let scopeVariables = {};
    if (/^\[.*\]$/.test(iteratorNames.item) && Array.isArray(item)) {
        let names = iteratorNames.item.replace("[", "").replace("]", "").split(",").map((i)=>i.trim());
        names.forEach((name, i)=>{
            scopeVariables[name] = item[i];
        });
    } else if (/^\{.*\}$/.test(iteratorNames.item) && !Array.isArray(item) && typeof item === "object") {
        let names = iteratorNames.item.replace("{", "").replace("}", "").split(",").map((i)=>i.trim());
        names.forEach((name)=>{
            scopeVariables[name] = item[name];
        });
    } else scopeVariables[iteratorNames.item] = item;
    if (iteratorNames.index) scopeVariables[iteratorNames.index] = index;
    if (iteratorNames.collection) scopeVariables[iteratorNames.collection] = items;
    return scopeVariables;
}
function isNumeric3(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
}
// packages/alpinejs/src/directives/x-ref.js
function handler3() {}
handler3.inline = (el, { expression }, { cleanup: cleanup2 })=>{
    let root = closestRoot(el);
    if (!root._x_refs) root._x_refs = {};
    root._x_refs[expression] = el;
    cleanup2(()=>delete root._x_refs[expression]);
};
directive("ref", handler3);
// packages/alpinejs/src/directives/x-if.js
directive("if", (el, { expression }, { effect: effect3, cleanup: cleanup2 })=>{
    if (el.tagName.toLowerCase() !== "template") warn("x-if can only be used on a <template> tag", el);
    let evaluate2 = evaluateLater(el, expression);
    let show = ()=>{
        if (el._x_currentIfEl) return el._x_currentIfEl;
        let clone2 = el.content.cloneNode(true).firstElementChild;
        addScopeToNode(clone2, {}, el);
        mutateDom(()=>{
            el.after(clone2);
            skipDuringClone(()=>initTree(clone2))();
        });
        el._x_currentIfEl = clone2;
        el._x_undoIf = ()=>{
            mutateDom(()=>{
                destroyTree(clone2);
                clone2.remove();
            });
            delete el._x_currentIfEl;
        };
        return clone2;
    };
    let hide = ()=>{
        if (!el._x_undoIf) return;
        el._x_undoIf();
        delete el._x_undoIf;
    };
    effect3(()=>evaluate2((value)=>{
            value ? show() : hide();
        }));
    cleanup2(()=>el._x_undoIf && el._x_undoIf());
});
// packages/alpinejs/src/directives/x-id.js
directive("id", (el, { expression }, { evaluate: evaluate2 })=>{
    let names = evaluate2(expression);
    names.forEach((name)=>setIdRoot(el, name));
});
interceptClone((from, to)=>{
    if (from._x_ids) to._x_ids = from._x_ids;
});
// packages/alpinejs/src/directives/x-on.js
mapAttributes(startingWith("@", into(prefix("on:"))));
directive("on", skipDuringClone((el, { value, modifiers, expression }, { cleanup: cleanup2 })=>{
    let evaluate2 = expression ? evaluateLater(el, expression) : ()=>{};
    if (el.tagName.toLowerCase() === "template") {
        if (!el._x_forwardEvents) el._x_forwardEvents = [];
        if (!el._x_forwardEvents.includes(value)) el._x_forwardEvents.push(value);
    }
    let removeListener = on(el, value, modifiers, (e)=>{
        evaluate2(()=>{}, {
            scope: {
                "$event": e
            },
            params: [
                e
            ]
        });
    });
    cleanup2(()=>removeListener());
}));
// packages/alpinejs/src/directives/index.js
warnMissingPluginDirective("Collapse", "collapse", "collapse");
warnMissingPluginDirective("Intersect", "intersect", "intersect");
warnMissingPluginDirective("Focus", "trap", "focus");
warnMissingPluginDirective("Mask", "mask", "mask");
function warnMissingPluginDirective(name, directiveName, slug) {
    directive(directiveName, (el)=>warn(`You can't use [x-${directiveName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
}
// packages/alpinejs/src/index.js
alpine_default.setEvaluator(normalEvaluator);
alpine_default.setReactivityEngine({
    reactive: reactive2,
    effect: effect2,
    release: stop,
    raw: toRaw
});
var src_default = alpine_default;
// packages/alpinejs/builds/module.js
var module_default = src_default;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"40BcS":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Main editor class that coordinates all editor functionality
 * Manages tools, blocks, and user interactions
 */ parcelHelpers.export(exports, "Editor", ()=>Editor);
var _toolManager = require("./editor_modules/ToolManager");
var _blockManager = require("./editor_modules/BlockManager");
var _inlineToolbar = require("./editor_modules/InlineToolbar");
var _debug = require("./utils/Debug");
const { v4: uuidv4 } = require("a436729f589f61b7");
class Editor {
    constructor(toolConfig, log_level = 2){
        this.id = '';
        this.log_level = log_level;
        this.tools = [];
        this.selectedBlock = null;
        this.hoveredTarget = {};
        this.toolConfig = toolConfig;
        this.dragThrottle = null;
        this.dragLeaveTimeout = null;
        this.toolManager = new (0, _toolManager.ToolManager)(toolConfig);
        this.blockManager = new (0, _blockManager.BlockManager)();
        this.inlineToolbar = new (0, _inlineToolbar.InlineToolbar)();
    }
    /**
   * Initialize the editor with Alpine.js integration
   */ init() {
        (0, _debug.Debug).info('Block editor initialized');
        this.id = this.$el.id;
        window.alpineEditors = window.alpineEditors || {};
        window.alpineEditors[this.id] = this;
        this.toolManager.loadTools();
        this.initBlock('Paragraph', true);
        this.inlineToolbar.init(this);
        this.$nextTick(()=>{
            this.$dispatch('editor-ready', {
                id: this.id
            });
        });
    }
    /**
   * Get available tools for the toolbar
   * @returns {Array} Array of tool configurations
   */ getToolbar() {
        return this.toolManager.getTools();
    }
    /**
   * Get all blocks in the editor
   * @returns {Array} Array of block instances
   */ get blocks() {
        return this.blockManager.blocks;
    }
    /**
   * Export blocks as JSON
   * @param {boolean} pretty - Whether to format for HTML display
   * @returns {string} JSON string of blocks
   */ blocksJSON(pretty = false) {
        const data = JSON.stringify(this.blocks.map((b)=>{
            return {
                id: b.id,
                class: b.constructor.name,
                data: b.config
            };
        }), null, 2);
        if (pretty) return data.replace(/ /g, '&nbsp;').replace(/\n/g, '<br>');
        return data;
    }
    /**
   * Get the currently selected block
   * @returns {Object|null} Selected block instance
   */ getCurrentSelectedBlock() {
        return this.selectedBlock;
    }
    /**
   * Get rendered content of all blocks
   * @returns {string} HTML string of all blocks
   */ getEditorContent() {
        return this.blockManager.renderBlocks();
    }
    /**
   * Get settings for a specific block
   * @param {string} blockId - ID of the block
   * @returns {Array|null} Array of settings or null if not found
   */ getSettings(blockId) {
        const block = this.blockManager.blocks.find((b)=>b.id === blockId);
        return block ? block.settings : null;
    }
    /**
   * Handle drag over events for blocks
   * @param {Event} event - Drag event
   * @param {string} blockId - ID of the target block
   */ handleDragOver(event, blockId) {
        event.preventDefault();
        if (this.dragLeaveTimeout) {
            clearTimeout(this.dragLeaveTimeout);
            this.dragLeaveTimeout = null;
        }
        if (this.dragThrottle) clearTimeout(this.dragThrottle);
        this.dragThrottle = setTimeout(()=>{
            const dropTarget = event.currentTarget;
            const rect = dropTarget.getBoundingClientRect();
            const relY = event.clientY - rect.top;
            const position = relY < rect.height * 0.4 ? 'top' : 'bottom';
            if (this.hoveredTarget[blockId] !== position) this.hoveredTarget[blockId] = position;
        }, 10);
    }
    /**
   * Handle drag leave events for blocks
   * @param {Event} event - Drag event
   * @param {string} blockId - ID of the target block
   */ handleDragLeave(event, blockId) {
        const dropTarget = event.currentTarget;
        const relatedTarget = event.relatedTarget;
        if (!relatedTarget || !dropTarget.contains(relatedTarget)) {
            if (this.dragLeaveTimeout) clearTimeout(this.dragLeaveTimeout);
            this.dragLeaveTimeout = setTimeout(()=>{
                if (this.hoveredTarget[blockId]) delete this.hoveredTarget[blockId];
                this.dragLeaveTimeout = null;
            }, 100);
        }
    }
    /**
   * Create a new block instance
   * @param {string} blockName - Name of the block type
   * @param {boolean} push - Whether to add to blocks array
   * @returns {Object} New block instance
   */ initBlock(blockName, push = false) {
        const BlockClass = this.toolConfig[blockName].class;
        const config = JSON.parse(JSON.stringify(this.toolConfig[blockName].config));
        const newBlock = new BlockClass({
            id: uuidv4(),
            updateFunction: this.updateFunction.bind(this),
            config: config
        });
        newBlock.init(this);
        if (push) this.blocks.push(newBlock);
        return newBlock;
    }
    /**
   * Handle drop events for blocks
   * @param {Event} event - Drop event
   * @param {string} position - Drop position
   * @param {string|null} blockId - ID of target block
   */ handleDrop(event, position = 'end', blockId = null) {
        event.preventDefault();
        this.clearDragTimeouts();
        const blockName = event.dataTransfer.getData('text/plain');
        const newBlock = this.initBlock(blockName);
        if (blockId) {
            const index = this.blocks.findIndex((b)=>b.id === blockId);
            const insertPosition = this.hoveredTarget[blockId] === 'top' ? 'before' : 'after';
            delete this.hoveredTarget[blockId];
            if (insertPosition === 'before') this.blocks.splice(index, 0, newBlock);
            else this.blocks.splice(index + 1, 0, newBlock);
        } else this.blocks.push(newBlock);
        this.$dispatch('editor-drop', {
            id: this.id
        });
        this.setActive(null, newBlock.id);
    }
    /**
   * Clear all drag-related timeouts
   */ clearDragTimeouts() {
        if (this.dragThrottle) {
            clearTimeout(this.dragThrottle);
            this.dragThrottle = null;
        }
        if (this.dragLeaveTimeout) {
            clearTimeout(this.dragLeaveTimeout);
            this.dragLeaveTimeout = null;
        }
    }
    /**
   * Clean up when component is destroyed
   */ destroy() {
        this.clearDragTimeouts();
        this.hoveredTarget = {};
    }
    /**
   * Update a block's configuration
   * @param {string} id - Block ID
   * @param {Object} config - New configuration
   */ updateFunction(id, config) {
        const block = this.blockManager.blocks.find((b)=>b.id === id);
        if (block) {
            block.config = config;
            this.$dispatch('editor-updated', {
                id: this.id
            });
        }
    }
    /**
   * Set the active block
   * @param {Event|null} event - Event that triggered the change
   * @param {string} block - Block ID to set as active
   */ setActive(event, block) {
        if (this.selectedBlock === block) return;
        this.selectedBlock = block;
        (0, _debug.Debug).debug(`Block changed: ${block}`);
        this.$nextTick(()=>{
            this.$dispatch('editor-block-changed', {
                block_id: block
            });
        });
    }
    /**
   * Log messages based on log level (deprecated - use Debug utility)
   * @param {string} message - Message to log
   * @param {number} level - Log level (1-3)
   * @deprecated Use Debug utility instead
   */ log(message, level = 1) {
        if (level > this.log_level) return;
        (0, _debug.Debug).log(message);
    }
}

},{"./editor_modules/ToolManager":"1WD0e","./editor_modules/BlockManager":"mp3gS","./editor_modules/InlineToolbar":"3RYIz","./utils/Debug":"2UdN7","a436729f589f61b7":"f1qTK","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1WD0e":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ToolManager", ()=>ToolManager);
var _debug = require("../utils/Debug");
class ToolManager {
    constructor(toolConfig){
        this.toolConfig = toolConfig;
        this.tools = [];
    }
    loadTools() {
        Object.entries(this.toolConfig).forEach(([key, { class: BlockClass, config }])=>{
            if (!BlockClass || !config) {
                (0, _debug.Debug).error(`Tool ${key} is missing a ${!BlockClass ? 'class' : 'config'}`);
                return;
            }
            const blockConfig = BlockClass.toolbox();
            blockConfig['class'] = key;
            this.tools.push(blockConfig);
        });
    }
    getTools() {
        return this.tools;
    }
}

},{"../utils/Debug":"2UdN7","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"2UdN7":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Debug utility for consistent logging throughout the application
 * Controls all console output and can be toggled on/off
 */ parcelHelpers.export(exports, "Debug", ()=>Debug);
var _debug = require("../../config/debug");
class Debug {
    static enabled = (0, _debug.DebugConfig).enabled;
    static levels = {
        ERROR: 0,
        WARN: 1,
        INFO: 2,
        DEBUG: 3
    };
    static currentLevel = (0, _debug.DebugConfig).level;
    /**
   * Enable or disable debug output
   * @param {boolean} enabled - Whether to enable debug output
   */ static setEnabled(enabled) {
        Debug.enabled = enabled;
    }
    /**
   * Set the minimum log level
   * @param {number} level - Minimum level to log (0-3)
   */ static setLevel(level) {
        Debug.currentLevel = level;
        (0, _debug.DebugConfig).level = level;
    }
    /**
   * Log an error message
   * @param {string} message - Error message
   * @param {...any} args - Additional arguments
   */ static error(message, ...args) {
        if (Debug.enabled && Debug.currentLevel >= Debug.levels.ERROR) console.error(`%c[AlpineBlocks ERROR] ${message}`, (0, _debug.DebugConfig).styles.error, ...args);
    }
    /**
   * Log a warning message
   * @param {string} message - Warning message
   * @param {...any} args - Additional arguments
   */ static warn(message, ...args) {
        if (Debug.enabled && Debug.currentLevel >= Debug.levels.WARN) console.warn(`%c[AlpineBlocks WARN] ${message}`, (0, _debug.DebugConfig).styles.warn, ...args);
    }
    /**
   * Log an info message
   * @param {string} message - Info message
   * @param {...any} args - Additional arguments
   */ static info(message, ...args) {
        if (Debug.enabled && Debug.currentLevel >= Debug.levels.INFO) console.info(`%c[AlpineBlocks INFO] ${message}`, (0, _debug.DebugConfig).styles.info, ...args);
    }
    /**
   * Log a debug message
   * @param {string} message - Debug message
   * @param {...any} args - Additional arguments
   */ static debug(message, ...args) {
        if (Debug.enabled && Debug.currentLevel >= Debug.levels.DEBUG) console.log(`%c[AlpineBlocks DEBUG] ${message}`, (0, _debug.DebugConfig).styles.debug, ...args);
    }
    /**
   * Log a general message (equivalent to console.log)
   * @param {string} message - Message to log
   * @param {...any} args - Additional arguments
   */ static log(message, ...args) {
        if (Debug.enabled) console.log(`%c[AlpineBlocks] ${message}`, (0, _debug.DebugConfig).styles.log, ...args);
    }
}
// Global access for debugging in development
if (typeof window !== 'undefined') window.AlpineBlocksDebug = Debug;

},{"../../config/debug":"4Fulv","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"4Fulv":[function(require,module,exports,__globalThis) {
/**
 * Debug configuration for AlpineBlocks
 * Centralized place to control all debugging settings
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DebugConfig", ()=>DebugConfig);
const DebugConfig = {
    // Enable/disable all debug output
    enabled: true,
    // Debug levels: ERROR = 0, WARN = 1, INFO = 2, DEBUG = 3
    level: 2,
    // INFO level by default
    // Module-specific debug settings
    modules: {
        editor: true,
        tools: true,
        toolbar: true,
        settings: true,
        blocks: true,
        inline: false // Disable inline toolbar debugging by default
    },
    // Console output styling
    styles: {
        error: 'color: #ff4757; font-weight: bold;',
        warn: 'color: #ffa502; font-weight: bold;',
        info: 'color: #3742fa; font-weight: bold;',
        debug: 'color: #57606f;',
        log: 'color: #2f3542;'
    }
};
// Allow runtime configuration in development
if (typeof window !== 'undefined' && DebugConfig.enabled) {
    window.AlpineBlocksDebugConfig = DebugConfig;
    console.log('%c[AlpineBlocks] Debug mode enabled. Use window.AlpineBlocksDebugConfig to modify settings.', DebugConfig.styles.info);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"mp3gS":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BlockManager", ()=>BlockManager);
const { v4: uuidv4 } = require("46943f6321fa2958");
class BlockManager {
    constructor(){
        this.blocks = [];
    }
    addBlock(BlockClass, config) {
        const block = new BlockClass({
            id: uuidv4(),
            updateFunction: this.updateBlock.bind(this),
            config: config
        });
        this.blocks.push(block);
        return block;
    }
    findBlockById(blockId) {
        return this.blocks.find((b)=>b.id === blockId);
    }
    updateBlock(id, config) {
        const block = this.findBlockById(id);
        if (block) block.config = config;
    }
    renderBlocks() {
        return this.blocks.map((block)=>block.render()).join('');
    }
    triggerRedraw() {
        this.blocks.forEach((block)=>block.triggerRedraw());
    }
}

},{"46943f6321fa2958":"f1qTK","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"f1qTK":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MAX", ()=>(0, _maxJsDefault.default));
parcelHelpers.export(exports, "NIL", ()=>(0, _nilJsDefault.default));
parcelHelpers.export(exports, "parse", ()=>(0, _parseJsDefault.default));
parcelHelpers.export(exports, "stringify", ()=>(0, _stringifyJsDefault.default));
parcelHelpers.export(exports, "v1", ()=>(0, _v1JsDefault.default));
parcelHelpers.export(exports, "v1ToV6", ()=>(0, _v1ToV6JsDefault.default));
parcelHelpers.export(exports, "v3", ()=>(0, _v3JsDefault.default));
parcelHelpers.export(exports, "v4", ()=>(0, _v4JsDefault.default));
parcelHelpers.export(exports, "v5", ()=>(0, _v5JsDefault.default));
parcelHelpers.export(exports, "v6", ()=>(0, _v6JsDefault.default));
parcelHelpers.export(exports, "v6ToV1", ()=>(0, _v6ToV1JsDefault.default));
parcelHelpers.export(exports, "v7", ()=>(0, _v7JsDefault.default));
parcelHelpers.export(exports, "validate", ()=>(0, _validateJsDefault.default));
parcelHelpers.export(exports, "version", ()=>(0, _versionJsDefault.default));
var _maxJs = require("./max.js");
var _maxJsDefault = parcelHelpers.interopDefault(_maxJs);
var _nilJs = require("./nil.js");
var _nilJsDefault = parcelHelpers.interopDefault(_nilJs);
var _parseJs = require("./parse.js");
var _parseJsDefault = parcelHelpers.interopDefault(_parseJs);
var _stringifyJs = require("./stringify.js");
var _stringifyJsDefault = parcelHelpers.interopDefault(_stringifyJs);
var _v1Js = require("./v1.js");
var _v1JsDefault = parcelHelpers.interopDefault(_v1Js);
var _v1ToV6Js = require("./v1ToV6.js");
var _v1ToV6JsDefault = parcelHelpers.interopDefault(_v1ToV6Js);
var _v3Js = require("./v3.js");
var _v3JsDefault = parcelHelpers.interopDefault(_v3Js);
var _v4Js = require("./v4.js");
var _v4JsDefault = parcelHelpers.interopDefault(_v4Js);
var _v5Js = require("./v5.js");
var _v5JsDefault = parcelHelpers.interopDefault(_v5Js);
var _v6Js = require("./v6.js");
var _v6JsDefault = parcelHelpers.interopDefault(_v6Js);
var _v6ToV1Js = require("./v6ToV1.js");
var _v6ToV1JsDefault = parcelHelpers.interopDefault(_v6ToV1Js);
var _v7Js = require("./v7.js");
var _v7JsDefault = parcelHelpers.interopDefault(_v7Js);
var _validateJs = require("./validate.js");
var _validateJsDefault = parcelHelpers.interopDefault(_validateJs);
var _versionJs = require("./version.js");
var _versionJsDefault = parcelHelpers.interopDefault(_versionJs);

},{"./max.js":"fxbVO","./nil.js":"9xbEn","./parse.js":"9yQPA","./stringify.js":"9dsAN","./v1.js":"042CM","./v1ToV6.js":"8wxBW","./v3.js":"fqBn5","./v4.js":"7Sd5x","./v5.js":"3itEG","./v6.js":"fSAwa","./v6ToV1.js":"9iYgm","./v7.js":"92zQH","./validate.js":"3wmxZ","./version.js":"bY08K","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fxbVO":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = 'ffffffff-ffff-ffff-ffff-ffffffffffff';

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"9xbEn":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = '00000000-0000-0000-0000-000000000000';

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"9yQPA":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _validateJs = require("./validate.js");
var _validateJsDefault = parcelHelpers.interopDefault(_validateJs);
function parse(uuid) {
    if (!(0, _validateJsDefault.default)(uuid)) throw TypeError('Invalid UUID');
    var v;
    var arr = new Uint8Array(16);
    // Parse ########-....-....-....-............
    arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
    arr[1] = v >>> 16 & 0xff;
    arr[2] = v >>> 8 & 0xff;
    arr[3] = v & 0xff;
    // Parse ........-####-....-....-............
    arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
    arr[5] = v & 0xff;
    // Parse ........-....-####-....-............
    arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
    arr[7] = v & 0xff;
    // Parse ........-....-....-####-............
    arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
    arr[9] = v & 0xff;
    // Parse ........-....-....-....-############
    // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)
    arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
    arr[11] = v / 0x100000000 & 0xff;
    arr[12] = v >>> 24 & 0xff;
    arr[13] = v >>> 16 & 0xff;
    arr[14] = v >>> 8 & 0xff;
    arr[15] = v & 0xff;
    return arr;
}
exports.default = parse;

},{"./validate.js":"3wmxZ","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3wmxZ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _regexJs = require("./regex.js");
var _regexJsDefault = parcelHelpers.interopDefault(_regexJs);
function validate(uuid) {
    return typeof uuid === 'string' && (0, _regexJsDefault.default).test(uuid);
}
exports.default = validate;

},{"./regex.js":"9mE1W","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"9mE1W":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"9dsAN":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "unsafeStringify", ()=>unsafeStringify);
var _validateJs = require("./validate.js");
var _validateJsDefault = parcelHelpers.interopDefault(_validateJs);
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ var byteToHex = [];
for(var i = 0; i < 256; ++i)byteToHex.push((i + 0x100).toString(16).slice(1));
function unsafeStringify(arr, offset = 0) {
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    //
    // Note to future-self: No, you can't remove the `toLowerCase()` call.
    // REF: https://github.com/uuidjs/uuid/pull/677#issuecomment-1757351351
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr, offset = 0) {
    var uuid = unsafeStringify(arr, offset);
    // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!(0, _validateJsDefault.default)(uuid)) throw TypeError('Stringified UUID is invalid');
    return uuid;
}
exports.default = stringify;

},{"./validate.js":"3wmxZ","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"042CM":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _rngJs = require("./rng.js");
var _rngJsDefault = parcelHelpers.interopDefault(_rngJs);
var _stringifyJs = require("./stringify.js");
// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
var _nodeId;
var _clockseq;
// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;
// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || new Array(16);
    options = options || {};
    var node = options.node;
    var clockseq = options.clockseq;
    // v1 only: Use cached `node` and `clockseq` values
    if (!options._v6) {
        if (!node) node = _nodeId;
        if (clockseq == null) clockseq = _clockseq;
    }
    // Handle cases where we need entropy.  We do this lazily to minimize issues
    // related to insufficient system entropy.  See #189
    if (node == null || clockseq == null) {
        var seedBytes = options.random || (options.rng || (0, _rngJsDefault.default))();
        // Randomize node
        if (node == null) {
            node = [
                seedBytes[0],
                seedBytes[1],
                seedBytes[2],
                seedBytes[3],
                seedBytes[4],
                seedBytes[5]
            ];
            // v1 only: cache node value for reuse
            if (!_nodeId && !options._v6) {
                // per RFC4122 4.5: Set MAC multicast bit (v1 only)
                node[0] |= 0x01; // Set multicast bit
                _nodeId = node;
            }
        }
        // Randomize clockseq
        if (clockseq == null) {
            // Per 4.2.2, randomize (14 bit) clockseq
            clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
            if (_clockseq === undefined && !options._v6) _clockseq = clockseq;
        }
    }
    // v1 & v6 timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so time is
    // handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    var msecs = options.msecs !== undefined ? options.msecs : Date.now();
    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;
    // Time since last uuid creation (in msecs)
    var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;
    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq === undefined) clockseq = clockseq + 1 & 0x3fff;
    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) nsecs = 0;
    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;
    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000;
    // `time_low`
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff;
    // `time_mid`
    var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff;
    // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff;
    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80;
    // `clock_seq_low`
    b[i++] = clockseq & 0xff;
    // `node`
    for(var n = 0; n < 6; ++n)b[i + n] = node[n];
    return buf || (0, _stringifyJs.unsafeStringify)(b);
}
exports.default = v1;

},{"./rng.js":"aMz2Q","./stringify.js":"9dsAN","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"aMz2Q":[function(require,module,exports,__globalThis) {
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>rng);
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
    // lazy load so that environments that need to polyfill have a chance to do so
    if (!getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
        getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
        if (!getRandomValues) throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
    return getRandomValues(rnds8);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"8wxBW":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>v1ToV6);
var _parseJs = require("./parse.js");
var _parseJsDefault = parcelHelpers.interopDefault(_parseJs);
var _stringifyJs = require("./stringify.js");
function v1ToV6(uuid) {
    var v1Bytes = typeof uuid === 'string' ? (0, _parseJsDefault.default)(uuid) : uuid;
    var v6Bytes = _v1ToV6(v1Bytes);
    return typeof uuid === 'string' ? (0, _stringifyJs.unsafeStringify)(v6Bytes) : v6Bytes;
}
// Do the field transformation needed for v1 -> v6
function _v1ToV6(v1Bytes, randomize = false) {
    return Uint8Array.of((v1Bytes[6] & 0x0f) << 4 | v1Bytes[7] >> 4 & 0x0f, (v1Bytes[7] & 0x0f) << 4 | (v1Bytes[4] & 0xf0) >> 4, (v1Bytes[4] & 0x0f) << 4 | (v1Bytes[5] & 0xf0) >> 4, (v1Bytes[5] & 0x0f) << 4 | (v1Bytes[0] & 0xf0) >> 4, (v1Bytes[0] & 0x0f) << 4 | (v1Bytes[1] & 0xf0) >> 4, (v1Bytes[1] & 0x0f) << 4 | (v1Bytes[2] & 0xf0) >> 4, 0x60 | v1Bytes[2] & 0x0f, v1Bytes[3], v1Bytes[8], v1Bytes[9], v1Bytes[10], v1Bytes[11], v1Bytes[12], v1Bytes[13], v1Bytes[14], v1Bytes[15]);
}

},{"./parse.js":"9yQPA","./stringify.js":"9dsAN","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fqBn5":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _v35Js = require("./v35.js");
var _v35JsDefault = parcelHelpers.interopDefault(_v35Js);
var _md5Js = require("./md5.js");
var _md5JsDefault = parcelHelpers.interopDefault(_md5Js);
var v3 = (0, _v35JsDefault.default)('v3', 0x30, (0, _md5JsDefault.default));
exports.default = v3;

},{"./v35.js":"iruG5","./md5.js":"hhNhp","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"iruG5":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DNS", ()=>DNS);
parcelHelpers.export(exports, "URL", ()=>URL);
parcelHelpers.export(exports, "default", ()=>v35);
var _stringifyJs = require("./stringify.js");
var _parseJs = require("./parse.js");
var _parseJsDefault = parcelHelpers.interopDefault(_parseJs);
function stringToBytes(str) {
    str = unescape(encodeURIComponent(str)); // UTF8 escape
    var bytes = [];
    for(var i = 0; i < str.length; ++i)bytes.push(str.charCodeAt(i));
    return bytes;
}
var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function v35(name, version, hashfunc) {
    function generateUUID(value, namespace, buf, offset) {
        var _namespace;
        if (typeof value === 'string') value = stringToBytes(value);
        if (typeof namespace === 'string') namespace = (0, _parseJsDefault.default)(namespace);
        if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
        // Compute hash of namespace and value, Per 4.3
        // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
        // hashfunc([...namespace, ... value])`
        var bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 0x0f | version;
        bytes[8] = bytes[8] & 0x3f | 0x80;
        if (buf) {
            offset = offset || 0;
            for(var i = 0; i < 16; ++i)buf[offset + i] = bytes[i];
            return buf;
        }
        return (0, _stringifyJs.unsafeStringify)(bytes);
    }
    // Function#name is not settable on some platforms (#270)
    try {
        generateUUID.name = name;
    } catch (err) {}
    // For CommonJS default export support
    generateUUID.DNS = DNS;
    generateUUID.URL = URL;
    return generateUUID;
}

},{"./stringify.js":"9dsAN","./parse.js":"9yQPA","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"hhNhp":[function(require,module,exports,__globalThis) {
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function md5(bytes) {
    if (typeof bytes === 'string') {
        var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape
        bytes = new Uint8Array(msg.length);
        for(var i = 0; i < msg.length; ++i)bytes[i] = msg.charCodeAt(i);
    }
    return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */ function md5ToHexEncodedArray(input) {
    var output = [];
    var length32 = input.length * 32;
    var hexTab = '0123456789abcdef';
    for(var i = 0; i < length32; i += 8){
        var x = input[i >> 5] >>> i % 32 & 0xff;
        var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
        output.push(hex);
    }
    return output;
}
/**
 * Calculate output length with padding and bit length
 */ function getOutputLength(inputLength8) {
    return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */ function wordsToMd5(x, len) {
    /* append padding */ x[len >> 5] |= 0x80 << len % 32;
    x[getOutputLength(len) - 1] = len;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for(var i = 0; i < x.length; i += 16){
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        a = md5ff(a, b, c, d, x[i], 7, -680876936);
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5ii(a, b, c, d, x[i], 6, -198630844);
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
    }
    return [
        a,
        b,
        c,
        d
    ];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */ function bytesToWords(input) {
    if (input.length === 0) return [];
    var length8 = input.length * 8;
    var output = new Uint32Array(getOutputLength(length8));
    for(var i = 0; i < length8; i += 8)output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
    return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */ function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */ function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */ function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
    return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
    return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
exports.default = md5;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7Sd5x":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _nativeJs = require("./native.js");
var _nativeJsDefault = parcelHelpers.interopDefault(_nativeJs);
var _rngJs = require("./rng.js");
var _rngJsDefault = parcelHelpers.interopDefault(_rngJs);
var _stringifyJs = require("./stringify.js");
function v4(options, buf, offset) {
    if ((0, _nativeJsDefault.default).randomUUID && !buf && !options) return (0, _nativeJsDefault.default).randomUUID();
    options = options || {};
    var rnds = options.random || (options.rng || (0, _rngJsDefault.default))();
    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80;
    // Copy bytes to buffer, if provided
    if (buf) {
        offset = offset || 0;
        for(var i = 0; i < 16; ++i)buf[offset + i] = rnds[i];
        return buf;
    }
    return (0, _stringifyJs.unsafeStringify)(rnds);
}
exports.default = v4;

},{"./native.js":"kD2Fc","./rng.js":"aMz2Q","./stringify.js":"9dsAN","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"kD2Fc":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
exports.default = {
    randomUUID
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3itEG":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _v35Js = require("./v35.js");
var _v35JsDefault = parcelHelpers.interopDefault(_v35Js);
var _sha1Js = require("./sha1.js");
var _sha1JsDefault = parcelHelpers.interopDefault(_sha1Js);
var v5 = (0, _v35JsDefault.default)('v5', 0x50, (0, _sha1JsDefault.default));
exports.default = v5;

},{"./v35.js":"iruG5","./sha1.js":"glDwi","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"glDwi":[function(require,module,exports,__globalThis) {
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function f(s, x, y, z) {
    switch(s){
        case 0:
            return x & y ^ ~x & z;
        case 1:
            return x ^ y ^ z;
        case 2:
            return x & y ^ x & z ^ y & z;
        case 3:
            return x ^ y ^ z;
    }
}
function ROTL(x, n) {
    return x << n | x >>> 32 - n;
}
function sha1(bytes) {
    var K = [
        0x5a827999,
        0x6ed9eba1,
        0x8f1bbcdc,
        0xca62c1d6
    ];
    var H = [
        0x67452301,
        0xefcdab89,
        0x98badcfe,
        0x10325476,
        0xc3d2e1f0
    ];
    if (typeof bytes === 'string') {
        var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape
        bytes = [];
        for(var i = 0; i < msg.length; ++i)bytes.push(msg.charCodeAt(i));
    } else if (!Array.isArray(bytes)) // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
    bytes.push(0x80);
    var l = bytes.length / 4 + 2;
    var N = Math.ceil(l / 16);
    var M = new Array(N);
    for(var _i = 0; _i < N; ++_i){
        var arr = new Uint32Array(16);
        for(var j = 0; j < 16; ++j)arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
        M[_i] = arr;
    }
    M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
    M[N - 1][14] = Math.floor(M[N - 1][14]);
    M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;
    for(var _i2 = 0; _i2 < N; ++_i2){
        var W = new Uint32Array(80);
        for(var t = 0; t < 16; ++t)W[t] = M[_i2][t];
        for(var _t = 16; _t < 80; ++_t)W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];
        var e = H[4];
        for(var _t2 = 0; _t2 < 80; ++_t2){
            var s = Math.floor(_t2 / 20);
            var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
            e = d;
            d = c;
            c = ROTL(b, 30) >>> 0;
            b = a;
            a = T;
        }
        H[0] = H[0] + a >>> 0;
        H[1] = H[1] + b >>> 0;
        H[2] = H[2] + c >>> 0;
        H[3] = H[3] + d >>> 0;
        H[4] = H[4] + e >>> 0;
    }
    return [
        H[0] >> 24 & 0xff,
        H[0] >> 16 & 0xff,
        H[0] >> 8 & 0xff,
        H[0] & 0xff,
        H[1] >> 24 & 0xff,
        H[1] >> 16 & 0xff,
        H[1] >> 8 & 0xff,
        H[1] & 0xff,
        H[2] >> 24 & 0xff,
        H[2] >> 16 & 0xff,
        H[2] >> 8 & 0xff,
        H[2] & 0xff,
        H[3] >> 24 & 0xff,
        H[3] >> 16 & 0xff,
        H[3] >> 8 & 0xff,
        H[3] & 0xff,
        H[4] >> 24 & 0xff,
        H[4] >> 16 & 0xff,
        H[4] >> 8 & 0xff,
        H[4] & 0xff
    ];
}
exports.default = sha1;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fSAwa":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>v6);
var _stringifyJs = require("./stringify.js");
var _v1Js = require("./v1.js");
var _v1JsDefault = parcelHelpers.interopDefault(_v1Js);
var _v1ToV6Js = require("./v1ToV6.js");
var _v1ToV6JsDefault = parcelHelpers.interopDefault(_v1ToV6Js);
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function v6(options = {}, buf, offset = 0) {
    // v6 is v1 with different field layout, so we start with a v1 UUID, albeit
    // with slightly different behavior around how the clock_seq and node fields
    // are randomized, which is why we call v1 with _v6: true.
    var bytes = (0, _v1JsDefault.default)(_objectSpread(_objectSpread({}, options), {}, {
        _v6: true
    }), new Uint8Array(16));
    // Reorder the fields to v6 layout.
    bytes = (0, _v1ToV6JsDefault.default)(bytes);
    // Return as a byte array if requested
    if (buf) {
        for(var i = 0; i < 16; i++)buf[offset + i] = bytes[i];
        return buf;
    }
    return (0, _stringifyJs.unsafeStringify)(bytes);
}

},{"./stringify.js":"9dsAN","./v1.js":"042CM","./v1ToV6.js":"8wxBW","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"9iYgm":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>v6ToV1);
var _parseJs = require("./parse.js");
var _parseJsDefault = parcelHelpers.interopDefault(_parseJs);
var _stringifyJs = require("./stringify.js");
function v6ToV1(uuid) {
    var v6Bytes = typeof uuid === 'string' ? (0, _parseJsDefault.default)(uuid) : uuid;
    var v1Bytes = _v6ToV1(v6Bytes);
    return typeof uuid === 'string' ? (0, _stringifyJs.unsafeStringify)(v1Bytes) : v1Bytes;
}
// Do the field transformation needed for v6 -> v1
function _v6ToV1(v6Bytes) {
    return Uint8Array.of((v6Bytes[3] & 0x0f) << 4 | v6Bytes[4] >> 4 & 0x0f, (v6Bytes[4] & 0x0f) << 4 | (v6Bytes[5] & 0xf0) >> 4, (v6Bytes[5] & 0x0f) << 4 | v6Bytes[6] & 0x0f, v6Bytes[7], (v6Bytes[1] & 0x0f) << 4 | (v6Bytes[2] & 0xf0) >> 4, (v6Bytes[2] & 0x0f) << 4 | (v6Bytes[3] & 0xf0) >> 4, 0x10 | (v6Bytes[0] & 0xf0) >> 4, (v6Bytes[0] & 0x0f) << 4 | (v6Bytes[1] & 0xf0) >> 4, v6Bytes[8], v6Bytes[9], v6Bytes[10], v6Bytes[11], v6Bytes[12], v6Bytes[13], v6Bytes[14], v6Bytes[15]);
}

},{"./parse.js":"9yQPA","./stringify.js":"9dsAN","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"92zQH":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _rngJs = require("./rng.js");
var _rngJsDefault = parcelHelpers.interopDefault(_rngJs);
var _stringifyJs = require("./stringify.js");
/**
 * UUID V7 - Unix Epoch time-based UUID
 *
 * The IETF has published RFC9562, introducing 3 new UUID versions (6,7,8). This
 * implementation of V7 is based on the accepted, though not yet approved,
 * revisions.
 *
 * RFC 9562:https://www.rfc-editor.org/rfc/rfc9562.html Universally Unique
 * IDentifiers (UUIDs)

 *
 * Sample V7 value:
 * https://www.rfc-editor.org/rfc/rfc9562.html#name-example-of-a-uuidv7-value
 *
 * Monotonic Bit Layout: RFC rfc9562.6.2 Method 1, Dedicated Counter Bits ref:
 *     https://www.rfc-editor.org/rfc/rfc9562.html#section-6.2-5.1
 *
 *   0                   1                   2                   3 0 1 2 3 4 5 6
 *   7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  |                          unix_ts_ms                           |
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  |          unix_ts_ms           |  ver  |        seq_hi         |
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  |var|               seq_low               |        rand         |
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  |                             rand                              |
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *
 * seq is a 31 bit serialized counter; comprised of 12 bit seq_hi and 19 bit
 * seq_low, and randomly initialized upon timestamp change. 31 bit counter size
 * was selected as any bitwise operations in node are done as _signed_ 32 bit
 * ints. we exclude the sign bit.
 */ var _seqLow = null;
var _seqHigh = null;
var _msecs = 0;
function v7(options, buf, offset) {
    options = options || {};
    // initialize buffer and pointer
    var i = buf && offset || 0;
    var b = buf || new Uint8Array(16);
    // rnds is Uint8Array(16) filled with random bytes
    var rnds = options.random || (options.rng || (0, _rngJsDefault.default))();
    // milliseconds since unix epoch, 1970-01-01 00:00
    var msecs = options.msecs !== undefined ? options.msecs : Date.now();
    // seq is user provided 31 bit counter
    var seq = options.seq !== undefined ? options.seq : null;
    // initialize local seq high/low parts
    var seqHigh = _seqHigh;
    var seqLow = _seqLow;
    // check if clock has advanced and user has not provided msecs
    if (msecs > _msecs && options.msecs === undefined) {
        _msecs = msecs;
        // unless user provided seq, reset seq parts
        if (seq !== null) {
            seqHigh = null;
            seqLow = null;
        }
    }
    // if we have a user provided seq
    if (seq !== null) {
        // trim provided seq to 31 bits of value, avoiding overflow
        if (seq > 0x7fffffff) seq = 0x7fffffff;
        // split provided seq into high/low parts
        seqHigh = seq >>> 19 & 0xfff;
        seqLow = seq & 0x7ffff;
    }
    // randomly initialize seq
    if (seqHigh === null || seqLow === null) {
        seqHigh = rnds[6] & 0x7f;
        seqHigh = seqHigh << 8 | rnds[7];
        seqLow = rnds[8] & 0x3f; // pad for var
        seqLow = seqLow << 8 | rnds[9];
        seqLow = seqLow << 5 | rnds[10] >>> 3;
    }
    // increment seq if within msecs window
    if (msecs + 10000 > _msecs && seq === null) {
        if (++seqLow > 0x7ffff) {
            seqLow = 0;
            if (++seqHigh > 0xfff) {
                seqHigh = 0;
                // increment internal _msecs. this allows us to continue incrementing
                // while staying monotonic. Note, once we hit 10k milliseconds beyond system
                // clock, we will reset breaking monotonicity (after (2^31)*10000 generations)
                _msecs++;
            }
        }
    } else // resetting; we have advanced more than
    // 10k milliseconds beyond system clock
    _msecs = msecs;
    _seqHigh = seqHigh;
    _seqLow = seqLow;
    // [bytes 0-5] 48 bits of local timestamp
    b[i++] = _msecs / 0x10000000000 & 0xff;
    b[i++] = _msecs / 0x100000000 & 0xff;
    b[i++] = _msecs / 0x1000000 & 0xff;
    b[i++] = _msecs / 0x10000 & 0xff;
    b[i++] = _msecs / 0x100 & 0xff;
    b[i++] = _msecs & 0xff;
    // [byte 6] - set 4 bits of version (7) with first 4 bits seq_hi
    b[i++] = seqHigh >>> 4 & 0x0f | 0x70;
    // [byte 7] remaining 8 bits of seq_hi
    b[i++] = seqHigh & 0xff;
    // [byte 8] - variant (2 bits), first 6 bits seq_low
    b[i++] = seqLow >>> 13 & 0x3f | 0x80;
    // [byte 9] 8 bits seq_low
    b[i++] = seqLow >>> 5 & 0xff;
    // [byte 10] remaining 5 bits seq_low, 3 bits random
    b[i++] = seqLow << 3 & 0xff | rnds[10] & 0x07;
    // [bytes 11-15] always random
    b[i++] = rnds[11];
    b[i++] = rnds[12];
    b[i++] = rnds[13];
    b[i++] = rnds[14];
    b[i++] = rnds[15];
    return buf || (0, _stringifyJs.unsafeStringify)(b);
}
exports.default = v7;

},{"./rng.js":"aMz2Q","./stringify.js":"9dsAN","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"bY08K":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _validateJs = require("./validate.js");
var _validateJsDefault = parcelHelpers.interopDefault(_validateJs);
function version(uuid) {
    if (!(0, _validateJsDefault.default)(uuid)) throw TypeError('Invalid UUID');
    return parseInt(uuid.slice(14, 15), 16);
}
exports.default = version;

},{"./validate.js":"3wmxZ","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3RYIz":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "InlineToolbar", ()=>InlineToolbar);
var _debug = require("../utils/Debug");
class InlineToolbar {
    constructor(){
        this.tools = [];
        this.editor = null;
        this.inlineToolbar = null;
    }
    init(editor) {
        this.editor = editor;
        // Create a new div element
        this.inlineToolbar = document.createElement('div');
        // Set the text content of the div
        this.inlineToolbar.textContent = "Hello";
        this.inlineToolbar.id = 'your-toolbar-id';
        // Style the div for proper positioning and visibility
        this.inlineToolbar.style.position = 'absolute';
        this.inlineToolbar.style.backgroundColor = 'white';
        this.inlineToolbar.style.border = '1px solid black';
        this.inlineToolbar.style.padding = '8px';
        this.inlineToolbar.style.display = 'none';
        this.inlineToolbar.innerHTML = `<button onclick=" const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const isBold = selection.anchorNode.parentNode.nodeName === 'STRONG';

            if (!isBold) {
                // Create a strong tag and wrap it around the selection
                const strongTag = document.createElement('strong');
                strongTag.appendChild(range.extractContents());
                range.insertNode(strongTag);
                strongTag.parentNode.normalize();
            }
    
            // Normalize the container to merge any adjacent text nodes
            ">Link</button>`;
        document.body.appendChild(this.inlineToolbar);
        document.getElementById('your-toolbar-id').addEventListener('mousedown', function(event) {
            event.preventDefault(); // Prevents losing focus
        });
        window.addEventListener('editor-show-inline-toolbar', (event)=>{
            (0, _debug.Debug).debug('Show inline toolbar event:', event);
            this.inlineToolbar.style.left = `${event.detail.event.clientX}px`;
            this.inlineToolbar.style.top = `${event.detail.event.clientY}px`;
            this.inlineToolbar.style.display = 'block';
        });
        window.addEventListener('editor-hide-inline-toolbar', (event)=>{
            this.inlineToolbar.style.display = 'none';
        });
    }
}

},{"../utils/Debug":"2UdN7","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"hf6hJ":[function(require,module,exports,__globalThis) {
/**
 * Toolbar manager for handling tool drag operations
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Toolbar", ()=>Toolbar);
class Toolbar {
    constructor(){
        this.tools = [];
    }
    /**
   * Initialize toolbar event listeners
   */ init() {
        window.addEventListener('editor-ready', (event)=>{
            const editorId = event.detail.id;
            if (window.alpineEditors && window.alpineEditors[editorId]) this.tools = window.alpineEditors[editorId].getToolbar();
        });
    }
    /**
   * Handle drag start event for tools
   * @param {DragEvent} event - The drag event
   * @param {Object} tool - The tool being dragged
   */ handleDragStart(event, tool) {
        event.dataTransfer.setData('text/plain', tool.class);
        event.dataTransfer.effectAllowed = 'copy';
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"45xuw":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Settings panel manager for handling block property updates
 */ parcelHelpers.export(exports, "Settings", ()=>Settings);
var _debug = require("./utils/Debug");
class Settings {
    constructor(editorId, settings = {}){
        this.editorId = editorId;
        this.settings = settings;
    }
    /**
   * Initialize settings panel event listeners
   */ init() {
        window.addEventListener('editor-block-changed', (event)=>{
            if (window.alpineEditors[this.editorId]) this.settings = window.alpineEditors[this.editorId].getSettings(event.detail.block_id);
        });
    }
    /**
   * Handle property changes from the settings panel
   * @param {string} block_id - The ID of the block to update
   * @param {string} property - The property name to update
   * @param {*} value - The new value for the property
   */ trigger(block_id, property, value = null) {
        const block = window.alpineEditors[this.editorId].blocks.find((b)=>b.id === block_id);
        if (!block) {
            (0, _debug.Debug).error('Block not found:', block_id);
            return;
        }
        if (typeof block[property] === 'function') block[property](value);
        else if (block.config && block.config.hasOwnProperty(property)) {
            block.config[property] = value;
            block.triggerRedraw();
        } else {
            block[property] = value;
            if (block.triggerRedraw) block.triggerRedraw();
        }
    }
    /**
   * Execute a callback function and trigger editor redraw
   * @param {Function} callback - The callback function to execute
   */ doCallback(callback) {
        callback();
        window.alpineEditors[this.editorId].blockManager.triggerRedraw();
    }
}

},{"./utils/Debug":"2UdN7","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"kD2Br":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tool = require("../core/Tool");
var _toolDefault = parcelHelpers.interopDefault(_tool);
/**
 * Paragraph tool for creating editable text blocks
 */ class Paragraph extends (0, _toolDefault.default) {
    constructor({ id, updateFunction, config }){
        super(id, updateFunction, config);
        this.config = {
            content: this.config.content || '<p>Enter your text here...</p>',
            fontSize: this.config.fontSize || 'medium',
            fontWeight: this.config.fontWeight || 'normal',
            alignment: this.config.alignment || 'left',
            lineHeight: this.config.lineHeight || 'normal',
            textColor: this.config.textColor || '#333333',
            backgroundColor: this.config.backgroundColor || 'transparent',
            padding: this.config.padding || 'none',
            margin: this.config.margin || 'normal'
        };
        this.settings = [
            {
                name: 'fontSize',
                label: 'Font Size',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'fontSize', $event.target.value)">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xlarge">Extra Large</option>
                </select>`
            },
            {
                name: 'fontWeight',
                label: 'Font Weight',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'fontWeight', $event.target.value)">
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="light">Light</option>
                </select>`
            },
            {
                name: 'alignment',
                label: 'Text Alignment',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'alignment', $event.target.value)">
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="justify">Justify</option>
                </select>`
            },
            {
                name: 'lineHeight',
                label: 'Line Height',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'lineHeight', $event.target.value)">
                    <option value="tight">Tight</option>
                    <option value="normal">Normal</option>
                    <option value="loose">Loose</option>
                </select>`
            },
            {
                name: 'textColor',
                label: 'Text Color',
                html: `<input type="color" class="settings-color-input" 
                    @change="trigger('${this.id}', 'textColor', $event.target.value)"
                    value="${this.config.textColor}">`
            },
            {
                name: 'backgroundColor',
                label: 'Background Color',
                html: `<input type="color" class="settings-color-input" 
                    @change="trigger('${this.id}', 'backgroundColor', $event.target.value)"
                    value="${this.config.backgroundColor}">`
            },
            {
                name: 'padding',
                label: 'Padding',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'padding', $event.target.value)">
                    <option value="none">None</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>`
            },
            {
                name: 'margin',
                label: 'Margin',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'margin', $event.target.value)">
                    <option value="none">None</option>
                    <option value="small">Small</option>
                    <option value="normal">Normal</option>
                    <option value="large">Large</option>
                </select>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Paragraph',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M192 32h64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384l0 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-352H288l0 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96H192c-88.4 0-160-71.6-160-160s71.6-160 160-160z"/></svg>',
            category: 'Basic'
        };
    }
    /**
   * Generate CSS styles based on configuration
   * @returns {string} CSS style string
   */ getStyleString() {
        const fontSizes = {
            small: '0.875rem',
            medium: '1rem',
            large: '1.125rem',
            xlarge: '1.25rem'
        };
        const lineHeights = {
            tight: '1.2',
            normal: '1.5',
            loose: '1.8'
        };
        const paddings = {
            none: '0',
            small: '0.5rem',
            medium: '1rem',
            large: '1.5rem'
        };
        const margins = {
            none: '0',
            small: '0.5rem',
            normal: '1rem',
            large: '1.5rem'
        };
        const styles = [];
        styles.push(`font-size: ${fontSizes[this.config.fontSize]}`);
        styles.push(`font-weight: ${this.config.fontWeight}`);
        styles.push(`text-align: ${this.config.alignment}`);
        styles.push(`line-height: ${lineHeights[this.config.lineHeight]}`);
        styles.push(`color: ${this.config.textColor}`);
        styles.push(`background-color: ${this.config.backgroundColor}`);
        styles.push(`padding: ${paddings[this.config.padding]}`);
        styles.push(`margin: ${margins[this.config.margin]} 0`);
        return styles.join('; ');
    }
    editorRender() {
        const styleString = this.getStyleString();
        return `<div class="paragraph-block"
                    style="${styleString}"
                    contenteditable="true"
                    x-html="block.config.content"
                    @blur="block.config.content = $event.target.innerHTML">${this.config.content}</div>`;
    }
    render() {
        const styleString = this.getStyleString();
        return `<div class="paragraph-block" style="${styleString}">${this.config.content}</div>`;
    }
}
exports.default = Paragraph;

},{"../core/Tool":"bG0oo","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"bG0oo":[function(require,module,exports,__globalThis) {
/**
 * Base class for all AlpineBlocks tools
 * Provides common functionality for block rendering and interaction
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Tool {
    constructor(id, updateFunction, config){
        this.id = id;
        this.updateFunction = updateFunction;
        this.config = config;
        this.editor = null;
        this.el = null;
    }
    /**
   * Triggers a redraw of the block by calling the update function
   */ triggerRedraw() {
        if (typeof this.updateFunction === 'function') this.updateFunction(this.id, JSON.parse(JSON.stringify(this.config)));
    }
    /**
   * Initialize the tool with editor instance and set up event listeners
   * @param {Object} editor - The Alpine editor instance
   */ init(editor) {
        this.editor = editor;
        this.editor.$nextTick(()=>{
            this.el = document.getElementById(this.id);
            this.el.addEventListener('mouseup', (event)=>{
                const selectedText = window.getSelection().toString();
                if (selectedText.length > 0) this.editor.$dispatch('editor-show-inline-toolbar', {
                    event: event,
                    id: this.id,
                    text: selectedText
                });
                else this.editor.$dispatch('editor-hide-inline-toolbar');
            });
        });
    }
    /**
   * Static method to define tool metadata for the toolbox
   * @returns {Object} Tool configuration object
   */ static toolbox() {
        return {
            name: 'Tool',
            icon: 'default-icon'
        };
    }
}
exports.default = Tool;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"h1M5v":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tool = require("../core/Tool");
var _toolDefault = parcelHelpers.interopDefault(_tool);
class Header extends (0, _toolDefault.default) {
    constructor({ id, updateFunction, config }){
        super(id, updateFunction, config);
        // Default config if not provided
        this.config = {
            content: this.config.content || 'Heading Text',
            level: this.config.level || 'h2',
            alignment: this.config.alignment || 'left',
            anchor: this.config.anchor || '',
            fontSize: this.config.fontSize || 'default',
            fontWeight: this.config.fontWeight || 'normal',
            textColor: this.config.textColor || '#333333'
        };
        this.settings = [
            {
                name: 'level',
                label: 'Heading Level',
                html: `<select @change="trigger('${this.id}', 'level', $event.target.value)">
                    <option value="h1">H1</option>
                    <option value="h2">H2</option>
                    <option value="h3">H3</option>
                    <option value="h4">H4</option>
                    <option value="h5">H5</option>
                    <option value="h6">H6</option>
                </select>`
            },
            {
                name: 'alignment',
                label: 'Text Alignment',
                html: `<select @change="trigger('${this.id}', 'alignment', $event.target.value)">
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="justify">Justify</option>
                </select>`
            },
            {
                name: 'anchor',
                label: 'Anchor ID',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'anchor', $event.target.value)"
                    :value="block.config.anchor"
                    placeholder="Optional anchor ID">`
            },
            {
                name: 'fontSize',
                label: 'Font Size',
                html: `<select @change="trigger('${this.id}', 'fontSize', $event.target.value)">
                    <option value="small">Small</option>
                    <option value="default">Default</option>
                    <option value="large">Large</option>
                    <option value="xlarge">Extra Large</option>
                </select>`
            },
            {
                name: 'fontWeight',
                label: 'Font Weight',
                html: `<select @change="trigger('${this.id}', 'fontWeight', $event.target.value)">
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="lighter">Lighter</option>
                </select>`
            },
            {
                name: 'textColor',
                label: 'Text Color',
                html: `<input type="color" 
                    @change="trigger('${this.id}', 'textColor', $event.target.value)"
                    :value="block.config.textColor">`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Header',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32H80h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H112V208H336V96H320c-17.7 0-32-14.3-32-32s14.3-32 32-32h48 48c17.7 0 32 14.3 32 32s-14.3 32-32 32H400V240 416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H368 320c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V272H112V416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V240 96H32C14.3 96 0 81.7 0 64z"/></svg>',
            category: 'Basic'
        };
    }
    getStyleString() {
        const fontSizes = {
            small: '0.875rem',
            default: '',
            large: '1.25rem',
            xlarge: '1.5rem'
        };
        const styles = [];
        if (this.config.alignment) styles.push(`text-align: ${this.config.alignment}`);
        if (this.config.fontSize && this.config.fontSize !== 'default') styles.push(`font-size: ${fontSizes[this.config.fontSize]}`);
        if (this.config.fontWeight) styles.push(`font-weight: ${this.config.fontWeight}`);
        if (this.config.textColor) styles.push(`color: ${this.config.textColor}`);
        return styles.join('; ');
    }
    editorRender() {
        const styleString = this.getStyleString();
        const anchorId = this.config.anchor ? `id="${this.config.anchor}"` : '';
        return `<${this.config.level} 
            class="header-block"
            ${anchorId}
            style="${styleString}"
            contenteditable="true"
            x-html="block.config.content"
            @blur="block.config.content = $event.target.innerHTML"></${this.config.level}>`;
    }
    render() {
        const styleString = this.getStyleString();
        const anchorId = this.config.anchor ? `id="${this.config.anchor}"` : '';
        return `<${this.config.level} ${anchorId} style="${styleString}">${this.config.content}</${this.config.level}>`;
    }
}
exports.default = Header;

},{"../core/Tool":"bG0oo","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"9gNej":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tool = require("../core/Tool");
var _toolDefault = parcelHelpers.interopDefault(_tool);
class List extends (0, _toolDefault.default) {
    constructor({ id, updateFunction, config }){
        super(id, updateFunction, config);
        this.config = {
            content: this.config.content || '<li>List item 1</li><li>List item 2</li><li>List item 3</li>',
            type: this.config.type || 'ul',
            style: this.config.style || 'default',
            indentation: this.config.indentation || 'normal',
            spacing: this.config.spacing || 'normal'
        };
        this.settings = [
            {
                name: 'type',
                label: 'List Type',
                html: `<select @change="trigger('${this.id}', 'type', $event.target.value)">
                    <option value="ul">Unordered List</option>
                    <option value="ol">Ordered List</option>
                </select>`
            },
            {
                name: 'style',
                label: 'List Style',
                html: `<select @change="trigger('${this.id}', 'style', $event.target.value)">
                    <option value="default">Default</option>
                    <option value="none">None</option>
                    <option value="disc">Disc</option>
                    <option value="circle">Circle</option>
                    <option value="square">Square</option>
                    <option value="decimal">Numbers</option>
                    <option value="lower-alpha">Lower Alpha</option>
                    <option value="upper-alpha">Upper Alpha</option>
                    <option value="lower-roman">Lower Roman</option>
                    <option value="upper-roman">Upper Roman</option>
                </select>`
            },
            {
                name: 'indentation',
                label: 'Indentation',
                html: `<select @change="trigger('${this.id}', 'indentation', $event.target.value)">
                    <option value="minimal">Minimal</option>
                    <option value="normal">Normal</option>
                    <option value="extended">Extended</option>
                </select>`
            },
            {
                name: 'spacing',
                label: 'Item Spacing',
                html: `<select @change="trigger('${this.id}', 'spacing', $event.target.value)">
                    <option value="compact">Compact</option>
                    <option value="normal">Normal</option>
                    <option value="loose">Loose</option>
                </select>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'List',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/></svg>',
            category: 'Basic'
        };
    }
    getStyleString() {
        const indentations = {
            minimal: '1rem',
            normal: '2rem',
            extended: '3rem'
        };
        const spacings = {
            compact: '0.25rem',
            normal: '0.5rem',
            loose: '1rem'
        };
        const styles = [];
        if (this.config.style && this.config.style !== 'default') styles.push(`list-style-type: ${this.config.style}`);
        if (this.config.indentation) styles.push(`padding-left: ${indentations[this.config.indentation]}`);
        if (this.config.spacing) styles.push(`margin-bottom: ${spacings[this.config.spacing]}`);
        return styles.join('; ');
    }
    editorRender() {
        const styleString = this.getStyleString();
        return `<${this.config.type} 
            class="list-block"
            style="${styleString}"
            contenteditable="true"
            x-html="block.config.content"
            @blur="block.config.content = $event.target.innerHTML"
            @keydown.enter.prevent="$event.target.innerHTML += '<li>New item</li>'"></${this.config.type}>`;
    }
    render() {
        const styleString = this.getStyleString();
        return `<${this.config.type} style="${styleString}">${this.config.content}</${this.config.type}>`;
    }
}
exports.default = List;

},{"../core/Tool":"bG0oo","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7KlLd":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tool = require("../core/Tool");
var _toolDefault = parcelHelpers.interopDefault(_tool);
class Code extends (0, _toolDefault.default) {
    constructor({ id, updateFunction, config }){
        super(id, updateFunction, config);
        this.config = {
            content: this.config.content || '// Your code here',
            language: this.config.language || 'javascript',
            showLineNumbers: this.config.showLineNumbers || true
        };
        this.settings = [
            {
                name: 'language',
                label: 'Language',
                html: `<select @change="trigger('${this.id}', 'language', $event.target.value)">
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="php">PHP</option>
                    <option value="ruby">Ruby</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                </select>`
            },
            {
                name: 'showLineNumbers',
                label: 'Show Line Numbers',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showLineNumbers', $event.target.checked)"
                        :checked="${this.config.showLineNumbers}">
                    Show Line Numbers
                </label>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Code',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>',
            category: 'Advanced'
        };
    }
    editorRender() {
        const lineNumbersClass = this.config.showLineNumbers ? 'line-numbers' : '';
        return `<pre class="code-block ${lineNumbersClass}">
            <code class="language-${this.config.language}"
                contenteditable="true"
                x-html="block.config.content"
                @blur="block.config.content = $event.target.innerHTML"></code>
        </pre>`;
    }
    render() {
        const lineNumbersClass = this.config.showLineNumbers ? 'line-numbers' : '';
        return `<pre class="code-block ${lineNumbersClass}">
            <code class="language-${this.config.language}">${this.config.content}</code>
        </pre>`;
    }
}
exports.default = Code;

},{"../core/Tool":"bG0oo","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"6b0Qh":[function(require,module,exports,__globalThis) {
/*
image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
          byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
        }
      }
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tool = require("../core/Tool");
var _toolDefault = parcelHelpers.interopDefault(_tool);
class Image extends (0, _toolDefault.default) {
    constructor({ id, updateFunction, config }){
        super(id, updateFunction, config);
        this.config = {
            src: this.config.src || '',
            alt: this.config.alt || '',
            caption: this.config.caption || '',
            alignment: this.config.alignment || 'center',
            width: this.config.width || 'auto'
        };
        this.settings = [
            {
                name: 'imageUrl',
                label: 'Image URL',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'src', $event.target.value)"
                    :value="block.config.src"
                    placeholder="Enter image URL">`
            },
            {
                name: 'altText',
                label: 'Alt Text',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'alt', $event.target.value)"
                    :value="block.config.alt"
                    placeholder="Enter alt text">`
            },
            {
                name: 'caption',
                label: 'Caption',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'caption', $event.target.value)"
                    :value="block.config.caption"
                    placeholder="Enter image caption">`
            },
            {
                name: 'alignment',
                label: 'Alignment',
                html: `<select @change="trigger('${this.id}', 'alignment', $event.target.value)">
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                </select>`
            },
            {
                name: 'width',
                label: 'Width',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'width', $event.target.value)"
                    :value="block.config.width"
                    placeholder="auto, 100%, or specific px">`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Image',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>',
            category: 'Media'
        };
    }
    editorRender() {
        return `<figure class="image-block" style="text-align: ${this.config.alignment}">
            <img src="${this.config.src}" 
                alt="${this.config.alt}"
                style="width: ${this.config.width}">
            <figcaption 
                contenteditable="true"
                x-html="block.config.caption"
                @blur="block.config.caption = $event.target.innerHTML">${this.config.caption}</figcaption>
        </figure>`;
    }
    render() {
        return `<figure class="image-block" style="text-align: ${this.config.alignment}">
            <img src="${this.config.src}" 
                alt="${this.config.alt}"
                style="width: ${this.config.width}">
            <figcaption>${this.config.caption}</figcaption>
        </figure>`;
    }
}
exports.default = Image;

},{"../core/Tool":"bG0oo","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7kiYR":[function(require,module,exports,__globalThis) {
/*class: Quote,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+O',
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: 'Quote\'s author',
      },*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tool = require("../core/Tool");
var _toolDefault = parcelHelpers.interopDefault(_tool);
class Quote extends (0, _toolDefault.default) {
    constructor({ id, updateFunction, config }){
        super(id, updateFunction, config);
        this.config = {
            content: this.config.content || 'Enter your quote here',
            attribution: this.config.attribution || '',
            style: this.config.style || 'default',
            alignment: this.config.alignment || 'left',
            fontSize: this.config.fontSize || 'medium',
            fontStyle: this.config.fontStyle || 'italic',
            borderStyle: this.config.borderStyle || 'left',
            backgroundColor: this.config.backgroundColor || 'transparent',
            textColor: this.config.textColor || '#333333',
            borderColor: this.config.borderColor || '#cccccc'
        };
        this.settings = [
            {
                name: 'style',
                label: 'Quote Style',
                html: `<select @change="trigger('${this.id}', 'style', $event.target.value)">
                    <option value="default">Default</option>
                    <option value="blockquote">Block Quote</option>
                    <option value="pullquote">Pull Quote</option>
                    <option value="testimonial">Testimonial</option>
                </select>`
            },
            {
                name: 'alignment',
                label: 'Alignment',
                html: `<select @change="trigger('${this.id}', 'alignment', $event.target.value)">
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                </select>`
            },
            {
                name: 'fontSize',
                label: 'Font Size',
                html: `<select @change="trigger('${this.id}', 'fontSize', $event.target.value)">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xlarge">Extra Large</option>
                </select>`
            },
            {
                name: 'fontStyle',
                label: 'Font Style',
                html: `<select @change="trigger('${this.id}', 'fontStyle', $event.target.value)">
                    <option value="normal">Normal</option>
                    <option value="italic">Italic</option>
                    <option value="oblique">Oblique</option>
                </select>`
            },
            {
                name: 'borderStyle',
                label: 'Border Style',
                html: `<select @change="trigger('${this.id}', 'borderStyle', $event.target.value)">
                    <option value="none">None</option>
                    <option value="left">Left Border</option>
                    <option value="top">Top Border</option>
                    <option value="bottom">Bottom Border</option>
                    <option value="full">Full Border</option>
                </select>`
            },
            {
                name: 'textColor',
                label: 'Text Color',
                html: `<input type="color" 
                    @change="trigger('${this.id}', 'textColor', $event.target.value)"
                    :value="${this.config.textColor}">`
            },
            {
                name: 'backgroundColor',
                label: 'Background Color',
                html: `<input type="color" 
                    @change="trigger('${this.id}', 'backgroundColor', $event.target.value)"
                    :value="${this.config.backgroundColor}">`
            },
            {
                name: 'borderColor',
                label: 'Border Color',
                html: `<input type="color" 
                    @change="trigger('${this.id}', 'borderColor', $event.target.value)"
                    :value="${this.config.borderColor}"
                    x-show="${this.config.borderStyle !== 'none'}">`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Quote',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V216z"/></svg>',
            category: 'Basic'
        };
    }
    getBorderStyle() {
        const borderWidth = '3px';
        const borderColor = this.config.borderColor;
        switch(this.config.borderStyle){
            case 'left':
                return `border-left: ${borderWidth} solid ${borderColor}`;
            case 'top':
                return `border-top: ${borderWidth} solid ${borderColor}`;
            case 'bottom':
                return `border-bottom: ${borderWidth} solid ${borderColor}`;
            case 'full':
                return `border: 1px solid ${borderColor}`;
            default:
                return 'border: none';
        }
    }
    getStyleString() {
        const fontSizes = {
            small: '0.875rem',
            medium: '1rem',
            large: '1.25rem',
            xlarge: '1.5rem'
        };
        const styles = [];
        styles.push(`text-align: ${this.config.alignment}`);
        styles.push(`font-size: ${fontSizes[this.config.fontSize]}`);
        styles.push(`font-style: ${this.config.fontStyle}`);
        styles.push(`color: ${this.config.textColor}`);
        styles.push(`background-color: ${this.config.backgroundColor}`);
        styles.push(this.getBorderStyle());
        styles.push('padding: 1rem');
        styles.push('margin: 1rem 0');
        if (this.config.borderStyle === 'left') styles.push('padding-left: 1.5rem');
        return styles.join('; ');
    }
    editorRender() {
        const styleString = this.getStyleString();
        return `<blockquote class="quote-block quote-${this.config.style}" style="${styleString}">
            <div class="quote-content"
                contenteditable="true"
                x-html="block.config.content"
                @blur="block.config.content = $event.target.innerHTML">${this.config.content}</div>
            <cite class="quote-attribution"
                contenteditable="true"
                x-html="block.config.attribution"
                @blur="block.config.attribution = $event.target.innerHTML"
                x-show="block.config.attribution.length > 0"
                style="font-style: normal; font-size: 0.875rem; margin-top: 0.5rem; display: block;">${this.config.attribution}</cite>
        </blockquote>`;
    }
    render() {
        const styleString = this.getStyleString();
        return `<blockquote class="quote-block quote-${this.config.style}" style="${styleString}">
            <div class="quote-content">${this.config.content}</div>
            ${this.config.attribution ? `<cite class="quote-attribution" style="font-style: normal; font-size: 0.875rem; margin-top: 0.5rem; display: block;">${this.config.attribution}</cite>` : ''}
        </blockquote>`;
    }
}
exports.default = Quote;

},{"../core/Tool":"bG0oo","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3nTpv":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tool = require("../core/Tool");
var _toolDefault = parcelHelpers.interopDefault(_tool);
class WYSIWYG extends (0, _toolDefault.default) {
    constructor({ id, updateFunction, config }){
        super(id, updateFunction, config);
        this.config = {
            content: this.config.content || 'Start typing here...',
            format: this.config.format || 'p'
        };
        this.settings = [
            {
                name: 'format',
                label: 'Block Format',
                html: `<select @change="trigger('${this.id}', 'format', $event.target.value)">
                    <option value="p">Paragraph</option>
                    <option value="div">Plain</option>
                    <option value="pre">Preformatted</option>
                </select>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Rich Text',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>',
            category: 'Basic'
        };
    }
    editorRender() {
        return `<div class="wysiwyg-editor">
            <div class="wysiwyg-toolbar">
                <button @click="document.execCommand('bold')" title="Bold">B</button>
                <button @click="document.execCommand('italic')" title="Italic">I</button>
                <button @click="document.execCommand('underline')" title="Underline">U</button>
                <button @click="document.execCommand('strikeThrough')" title="Strike">S</button>
                <select @change="document.execCommand('formatBlock', false, $event.target.value)">
                    <option value="p">Paragraph</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                    <option value="blockquote">Quote</option>
                </select>
                <button @click="document.execCommand('insertUnorderedList')" title="Bullet List">\u{2022}</button>
                <button @click="document.execCommand('insertOrderedList')" title="Numbered List">#</button>
                <button @click="document.execCommand('createLink', false, prompt('Enter link URL'))" title="Link">\u{1F517}</button>
            </div>
            <${this.config.format} 
                class="wysiwyg-content"
                contenteditable="true"
                x-html="block.config.content"
                @blur="block.config.content = $event.target.innerHTML"
                @paste="$event.preventDefault(); document.execCommand('insertText', false, $event.clipboardData.getData('text/plain'))"
            ></${this.config.format}>
        </div>`;
    }
    render() {
        return `<${this.config.format} class="wysiwyg-content">${this.config.content}</${this.config.format}>`;
    }
}
exports.default = WYSIWYG;

},{"../core/Tool":"bG0oo","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"aF3vF":[function(require,module,exports,__globalThis) {
/*
alert: {
      class: Alert,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+A',
      config: {
        alertTypes: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'],
        defaultType: 'primary',
        messagePlaceholder: 'Enter something',
      },
    },
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tool = require("../core/Tool");
var _toolDefault = parcelHelpers.interopDefault(_tool);
class Alert extends (0, _toolDefault.default) {
    constructor({ id, updateFunction, config }){
        super(id, updateFunction, config);
        this.config = {
            content: this.config.content || 'Alert message goes here',
            type: this.config.type || 'info',
            dismissible: this.config.dismissible || false,
            icon: this.config.icon || true
        };
        this.settings = [
            {
                name: 'type',
                label: 'Alert Type',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'type', $event.target.value)">
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                </select>`
            },
            {
                name: 'dismissible',
                label: 'Dismissible',
                html: `<label class="settings-checkbox">
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'dismissible', $event.target.checked)"
                        :checked="${this.config.dismissible}">
                    <span class="settings-checkbox-label">Dismissible</span>
                </label>`
            },
            {
                name: 'icon',
                label: 'Show Icon',
                html: `<label class="settings-checkbox">
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'icon', $event.target.checked)"
                        :checked="${this.config.icon}">
                    <span class="settings-checkbox-label">Show Icon</span>
                </label>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Alert',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>',
            category: 'Basic'
        };
    }
    getIcon() {
        const icons = {
            info: '<svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>',
            success: '<svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>',
            warning: '<svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>',
            error: '<svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>'
        };
        return icons[this.config.type] || icons.info;
    }
    editorRender() {
        return `<div class="alert-block alert-${this.config.type}">
            ${this.config.icon ? this.getIcon() : ''}
            <div class="alert-content"
                contenteditable="true"
                x-html="block.config.content"
                @blur="block.config.content = $event.target.innerHTML"></div>
            ${this.config.dismissible ? '<button class="alert-dismiss" @click="$el.closest(\'.alert-block\').remove()">\xd7</button>' : ''}
        </div>`;
    }
    render() {
        return `<div class="alert-block alert-${this.config.type}">
            ${this.config.icon ? this.getIcon() : ''}
            <div class="alert-content">${this.config.content}</div>
            ${this.config.dismissible ? '<button class="alert-dismiss">\xd7</button>' : ''}
        </div>`;
    }
}
exports.default = Alert;

},{"../core/Tool":"bG0oo","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"6xmXY":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tool = require("../core/Tool");
var _toolDefault = parcelHelpers.interopDefault(_tool);
class VideoPlayer extends (0, _toolDefault.default) {
    constructor({ id, updateFunction, config }){
        super(id, updateFunction, config);
        this.config = {
            url: this.config.url || '',
            type: this.config.type || 'youtube',
            // youtube, vimeo, direct
            autoplay: this.config.autoplay || false,
            controls: this.config.controls || true,
            muted: this.config.muted || false,
            loop: this.config.loop || false,
            width: this.config.width || '100%',
            height: this.config.height || 'auto',
            caption: this.config.caption || ''
        };
        this.settings = [
            {
                name: 'url',
                label: 'Video URL',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'url', $event.target.value)"
                    :value="block.config.url"
                    placeholder="Enter video URL">`
            },
            {
                name: 'type',
                label: 'Video Type',
                html: `<select @change="trigger('${this.id}', 'type', $event.target.value)">
                    <option value="youtube">YouTube</option>
                    <option value="vimeo">Vimeo</option>
                    <option value="direct">Direct URL</option>
                </select>`
            },
            {
                name: 'autoplay',
                label: 'Autoplay',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'autoplay', $event.target.checked)"
                        :checked="block.config.autoplay">
                    Autoplay
                </label>`
            },
            {
                name: 'controls',
                label: 'Show Controls',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'controls', $event.target.checked)"
                        :checked="block.config.controls">
                    Show Controls
                </label>`
            },
            {
                name: 'muted',
                label: 'Muted',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'muted', $event.target.checked)"
                        :checked="block.config.muted">
                    Muted
                </label>`
            },
            {
                name: 'loop',
                label: 'Loop',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'loop', $event.target.checked)"
                        :checked="block.config.loop">
                    Loop
                </label>`
            },
            {
                name: 'dimensions',
                label: 'Dimensions',
                html: `<div>
                    <input type="text" 
                        @change="trigger('${this.id}', 'width', $event.target.value)"
                        :value="block.config.width"
                        placeholder="Width (100%, auto, or px)">
                    <input type="text" 
                        @change="trigger('${this.id}', 'height', $event.target.value)"
                        :value="block.config.height"
                        placeholder="Height (auto or px)">
                </div>`
            },
            {
                name: 'caption',
                label: 'Caption',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'caption', $event.target.value)"
                    :value="block.config.caption"
                    placeholder="Enter video caption">`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Video',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg>',
            category: 'Media'
        };
    }
    getVideoEmbed() {
        if (!this.config.url) return '';
        const params = [
            this.config.autoplay ? 'autoplay=1' : '',
            this.config.controls ? 'controls=1' : '',
            this.config.muted ? 'mute=1' : '',
            this.config.loop ? 'loop=1' : ''
        ].filter(Boolean).join('&');
        switch(this.config.type){
            case 'youtube':
                const youtubeId = this.extractYoutubeId(this.config.url);
                return `<iframe 
                    width="${this.config.width}" 
                    height="${this.config.height}"
                    src="https://www.youtube.com/embed/${youtubeId}?${params}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>`;
            case 'vimeo':
                const vimeoId = this.extractVimeoId(this.config.url);
                return `<iframe 
                    width="${this.config.width}" 
                    height="${this.config.height}"
                    src="https://player.vimeo.com/video/${vimeoId}?${params}"
                    frameborder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowfullscreen></iframe>`;
            case 'direct':
                return `<video 
                    width="${this.config.width}" 
                    height="${this.config.height}"
                    ${this.config.controls ? 'controls' : ''}
                    ${this.config.autoplay ? 'autoplay' : ''}
                    ${this.config.muted ? 'muted' : ''}
                    ${this.config.loop ? 'loop' : ''}>
                    <source src="${this.config.url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>`;
        }
    }
    extractYoutubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : '';
    }
    extractVimeoId(url) {
        const regExp = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|)(\d+)(?:[?].*)?$/;
        const match = url.match(regExp);
        return match ? match[1] : '';
    }
    editorRender() {
        return `<figure class="video-block">
            ${this.getVideoEmbed()}
            <figcaption 
                contenteditable="true"
                x-html="block.config.caption"
                @blur="block.config.caption = $event.target.innerHTML"
                x-show="block.config.caption.length > 0">${this.config.caption}</figcaption>
        </figure>`;
    }
    render() {
        return `<figure class="video-block">
            ${this.getVideoEmbed()}
            ${this.config.caption ? `<figcaption>${this.config.caption}</figcaption>` : ''}
        </figure>`;
    }
}
exports.default = VideoPlayer;

},{"../core/Tool":"bG0oo","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7nWMB":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tool = require("../core/Tool");
var _toolDefault = parcelHelpers.interopDefault(_tool);
class AudioPlayer extends (0, _toolDefault.default) {
    constructor({ id, updateFunction, config }){
        super(id, updateFunction, config);
        this.config = {
            url: this.config.url || '',
            type: this.config.type || 'file',
            // file, spotify, soundcloud
            autoplay: this.config.autoplay || false,
            controls: this.config.controls || true,
            loop: this.config.loop || false,
            title: this.config.title || '',
            artist: this.config.artist || '',
            showMetadata: this.config.showMetadata || true
        };
        this.settings = [
            {
                name: 'url',
                label: 'Audio URL',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'url', $event.target.value)"
                    :value="block.config.url"
                    placeholder="Enter audio URL">`
            },
            {
                name: 'type',
                label: 'Audio Type',
                html: `<select @change="trigger('${this.id}', 'type', $event.target.value)">
                    <option value="file">Audio File</option>
                    <option value="spotify">Spotify</option>
                    <option value="soundcloud">SoundCloud</option>
                </select>`
            },
            {
                name: 'metadata',
                label: 'Metadata',
                html: `<div>
                    <input type="text" 
                        @change="trigger('${this.id}', 'title', $event.target.value)"
                        :value="block.config.title"
                        placeholder="Title">
                    <input type="text" 
                        @change="trigger('${this.id}', 'artist', $event.target.value)"
                        :value="block.config.artist"
                        placeholder="Artist">
                </div>`
            },
            {
                name: 'autoplay',
                label: 'Autoplay',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'autoplay', $event.target.checked)"
                        :checked="block.config.autoplay">
                    Autoplay
                </label>`
            },
            {
                name: 'controls',
                label: 'Show Controls',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'controls', $event.target.checked)"
                        :checked="block.config.controls">
                    Show Controls
                </label>`
            },
            {
                name: 'loop',
                label: 'Loop',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'loop', $event.target.checked)"
                        :checked="block.config.loop">
                    Loop
                </label>`
            },
            {
                name: 'showMetadata',
                label: 'Show Metadata',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showMetadata', $event.target.checked)"
                        :checked="block.config.showMetadata">
                    Show Metadata
                </label>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Audio',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"/></svg>',
            category: 'Media'
        };
    }
    getAudioEmbed() {
        if (!this.config.url) return '';
        switch(this.config.type){
            case 'spotify':
                const spotifyId = this.extractSpotifyId(this.config.url);
                return `<iframe 
                    src="https://open.spotify.com/embed/track/${spotifyId}"
                    width="100%" 
                    height="80"
                    frameborder="0" 
                    allowtransparency="true" 
                    allow="encrypted-media"></iframe>`;
            case 'soundcloud':
                return `<iframe 
                    width="100%" 
                    height="166" 
                    scrolling="no" 
                    frameborder="no" 
                    allow="autoplay"
                    src="https://w.soundcloud.com/player/?url=${encodeURIComponent(this.config.url)}&auto_play=${this.config.autoplay}&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>`;
            case 'file':
            default:
                return `<audio 
                    class="audio-player"
                    ${this.config.controls ? 'controls' : ''}
                    ${this.config.autoplay ? 'autoplay' : ''}
                    ${this.config.loop ? 'loop' : ''}>
                    <source src="${this.config.url}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>`;
        }
    }
    extractSpotifyId(url) {
        const match = url.match(/track\/([a-zA-Z0-9]+)/);
        return match ? match[1] : '';
    }
    editorRender() {
        return `<div class="audio-block">
            ${this.config.showMetadata ? `
                <div class="audio-metadata">
                    <div class="audio-title"
                        contenteditable="true"
                        x-html="block.config.title"
                        @blur="block.config.title = $event.target.innerHTML">${this.config.title}</div>
                    <div class="audio-artist"
                        contenteditable="true"
                        x-html="block.config.artist"
                        @blur="block.config.artist = $event.target.innerHTML">${this.config.artist}</div>
                </div>
            ` : ''}
            ${this.getAudioEmbed()}
        </div>`;
    }
    render() {
        return `<div class="audio-block">
            ${this.config.showMetadata ? `
                <div class="audio-metadata">
                    <div class="audio-title">${this.config.title}</div>
                    <div class="audio-artist">${this.config.artist}</div>
                </div>
            ` : ''}
            ${this.getAudioEmbed()}
        </div>`;
    }
}
exports.default = AudioPlayer;

},{"../core/Tool":"bG0oo","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"a1lqa":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tool = require("../core/Tool");
var _toolDefault = parcelHelpers.interopDefault(_tool);
class Carousel extends (0, _toolDefault.default) {
    constructor({ id, updateFunction, config }){
        super(id, updateFunction, config);
        this.config = {
            slides: this.config.slides || [
                {
                    image: '',
                    caption: ''
                }
            ],
            autoplay: this.config.autoplay || false,
            interval: this.config.interval || 5000,
            showArrows: this.config.showArrows || true,
            showDots: this.config.showDots || true,
            showCaptions: this.config.showCaptions || true
        };
        this.settings = [
            {
                name: 'autoplay',
                label: 'Autoplay',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'autoplay', $event.target.checked)"
                        :checked="block.config.autoplay">
                    Autoplay
                </label>`
            },
            {
                name: 'interval',
                label: 'Interval (ms)',
                html: `<input type="number" 
                    @change="trigger('${this.id}', 'interval', $event.target.value)"
                    :value="block.config.interval"
                    min="1000"
                    step="500">`
            },
            {
                name: 'showArrows',
                label: 'Show Arrows',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showArrows', $event.target.checked)"
                        :checked="block.config.showArrows">
                    Show Arrows
                </label>`
            },
            {
                name: 'showDots',
                label: 'Show Dots',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showDots', $event.target.checked)"
                        :checked="block.config.showDots">
                    Show Dots
                </label>`
            },
            {
                name: 'showCaptions',
                label: 'Show Captions',
                html: `<label>
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'showCaptions', $event.target.checked)"
                        :checked="block.config.showCaptions">
                    Show Captions
                </label>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Carousel',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>',
            category: 'Media'
        };
    }
    editorRender() {
        const slides = this.config.slides.map((slide, index)=>{
            const imageInput = `
                <div class="image-input" x-show="!block.config.slides[${index}].image">
                    <input type="text" 
                        placeholder="Enter image URL"
                        @change="block.config.slides[${index}].image = $event.target.value">
                </div>`;
            const image = `
                <img x-show="block.config.slides[${index}].image"
                    :src="block.config.slides[${index}].image"
                    alt="Slide ${index + 1}">`;
            const caption = this.config.showCaptions ? `
                <div class="carousel-caption"
                    contenteditable="true"
                    x-html="block.config.slides[${index}].caption"
                    @blur="block.config.slides[${index}].caption = $event.target.innerHTML">${slide.caption || ''}</div>` : '';
            return `
                <div class="carousel-slide" x-show="currentSlide === ${index}">
                    ${imageInput}
                    ${image}
                    ${caption}
                </div>`;
        }).join('');
        const arrows = this.config.showArrows ? `
            <button class="carousel-prev" 
                @click="currentSlide = (currentSlide - 1 + block.config.slides.length) % block.config.slides.length">
                \u{2190}
            </button>
            <button class="carousel-next" 
                @click="currentSlide = (currentSlide + 1) % block.config.slides.length">
                \u{2192}
            </button>` : '';
        const dots = this.config.showDots ? `
            <div class="carousel-dots">
                ${this.config.slides.map((_, index)=>`
                    <button class="carousel-dot"
                        :class="{ active: currentSlide === ${index} }"
                        @click="currentSlide = ${index}"></button>
                `).join('')}
            </div>` : '';
        return `
            <div class="carousel-block" x-data="{ currentSlide: 0 }">
                <div class="carousel-container">
                    ${slides}
                    ${arrows}
                </div>
                ${dots}
                <div class="carousel-controls">
                    <button @click="block.config.slides.push({ image: '', caption: '' })">Add Slide</button>
                    <button x-show="block.config.slides.length > 1"
                        @click="block.config.slides.splice(currentSlide, 1); currentSlide = Math.min(currentSlide, block.config.slides.length - 1)">
                        Remove Current Slide
                    </button>
                </div>
            </div>`;
    }
    render() {
        const slides = this.config.slides.map((slide, index)=>`
            <div class="carousel-slide">
                <img src="${slide.image}" alt="Slide ${index + 1}">
                ${this.config.showCaptions && slide.caption ? `
                    <div class="carousel-caption">${slide.caption}</div>
                ` : ''}
            </div>
        `).join('');
        const arrows = this.config.showArrows ? `
            <button class="carousel-prev">\u{2190}</button>
            <button class="carousel-next">\u{2192}</button>
        ` : '';
        const dots = this.config.showDots ? `
            <div class="carousel-dots">
                ${this.config.slides.map((_, index)=>`
                    <button class="carousel-dot"></button>
                `).join('')}
            </div>
        ` : '';
        return `
            <div class="carousel-block">
                <div class="carousel-container">
                    ${slides}
                    ${arrows}
                </div>
                ${dots}
            </div>`;
    }
}
exports.default = Carousel;

},{"../core/Tool":"bG0oo","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"kAfCq":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tool = require("../core/Tool");
var _toolDefault = parcelHelpers.interopDefault(_tool);
var _debug = require("../core/utils/Debug");
/**
 * Columns tool for creating multi-column layouts with nested blocks
 */ class Columns extends (0, _toolDefault.default) {
    constructor({ id, updateFunction, config }){
        super(id, updateFunction, config);
        this.config = {
            columns: this.config.columns || [
                {
                    blocks: [],
                    width: '1fr'
                },
                {
                    blocks: [],
                    width: '1fr'
                }
            ],
            gap: this.config.gap || '20px',
            alignment: this.config.alignment || 'top',
            responsive: this.config.responsive || true,
            breakpoint: this.config.breakpoint || '768px'
        };
        this.settings = [
            {
                name: 'columnCount',
                label: 'Column Layout',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'columnCount', $event.target.value)">
                    <option value="2">Two Columns</option>
                    <option value="3">Three Columns</option>
                    <option value="4">Four Columns</option>
                    <option value="custom">Custom</option>
                </select>`
            },
            {
                name: 'gap',
                label: 'Column Gap',
                html: `<input type="text" class="settings-input"
                    @change="trigger('${this.id}', 'gap', $event.target.value)"
                    value="${this.config.gap}"
                    placeholder="20px">`
            },
            {
                name: 'alignment',
                label: 'Vertical Alignment',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'alignment', $event.target.value)">
                    <option value="top">Top</option>
                    <option value="center">Center</option>
                    <option value="bottom">Bottom</option>
                    <option value="stretch">Stretch</option>
                </select>`
            },
            {
                name: 'responsive',
                label: 'Responsive Layout',
                html: `<div class="settings-group">
                    <label class="settings-checkbox">
                        <input type="checkbox" 
                            @change="trigger('${this.id}', 'responsive', $event.target.checked)"
                            ${this.config.responsive ? 'checked' : ''}>
                        <span class="settings-checkbox-label">Responsive Layout</span>
                    </label>
                    <input type="text" class="settings-input"
                        x-show="${this.config.responsive}"
                        @change="trigger('${this.id}', 'breakpoint', $event.target.value)"
                        value="${this.config.breakpoint}"
                        placeholder="Breakpoint (e.g. 768px)">
                </div>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Columns',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 0v64h64V96H64zm384 0H192v64H448V96zM64 224v64h64V224H64zm384 0H192v64H448V224zM64 352v64h64V352H64zm384 0H192v64H448V352z"/></svg>',
            category: 'Layout'
        };
    }
    /**
   * Update the number of columns
   * @param {string|number} count - The number of columns to create
   */ updateColumnCount(count) {
        if (count === 'custom') return;
        const newColumns = [];
        for(let i = 0; i < parseInt(count); i++)newColumns.push({
            blocks: [],
            width: '1fr'
        });
        this.config.columns = newColumns;
        this.triggerRedraw();
    }
    /**
   * Generate CSS styles for the column grid
   * @returns {string} CSS styles string
   */ getColumnStyles() {
        const alignmentMap = {
            top: 'start',
            center: 'center',
            bottom: 'end',
            stretch: 'stretch'
        };
        return `
            display: grid;
            grid-template-columns: ${this.config.columns.map((col)=>col.width).join(' ')};
            gap: ${this.config.gap};
            align-items: ${alignmentMap[this.config.alignment]};
        `;
    }
    /**
   * Handle dropping blocks into columns
   * @param {number} columnIndex - The index of the column
   * @param {Object} blockData - The block data from drag operation
   * @param {string} position - Position to insert ('end' or 'start')
   */ handleColumnDrop(columnIndex, blockData, position = 'end') {
        if (!this.config.columns[columnIndex]) return;
        const toolClass = blockData.class;
        const toolConfig = blockData.config || {};
        const nestedBlock = {
            id: this.generateId(),
            class: toolClass,
            config: toolConfig,
            ...this.getToolDefaults(toolClass)
        };
        if (position === 'end') this.config.columns[columnIndex].blocks.push(nestedBlock);
        else this.config.columns[columnIndex].blocks.unshift(nestedBlock);
        this.triggerRedraw();
    }
    /**
   * Get default configuration for different tool types
   * @param {string} toolClass - The tool class name
   * @returns {Object} Default configuration object
   */ getToolDefaults(toolClass) {
        const defaults = {
            'Paragraph': {
                config: {
                    content: 'Enter paragraph text...',
                    fontSize: '16px'
                }
            },
            'Header': {
                config: {
                    content: 'Header text',
                    level: 'h2'
                }
            },
            'Image': {
                config: {
                    src: '',
                    alt: 'Image',
                    caption: '',
                    alignment: 'center'
                }
            },
            'List': {
                config: {
                    content: 'List item',
                    type: 'ul'
                }
            },
            'Button': {
                config: {
                    text: 'Button',
                    type: 'primary',
                    size: 'medium'
                }
            },
            'Alert': {
                config: {
                    content: 'Alert message',
                    type: 'info',
                    dismissible: false
                }
            },
            'Quote': {
                config: {
                    content: 'Quote text',
                    attribution: ''
                }
            }
        };
        return defaults[toolClass] || {
            config: {}
        };
    }
    /**
   * Generate unique ID for nested blocks
   * @returns {string} Unique identifier
   */ generateId() {
        return 'nested-' + Math.random().toString(36).substr(2, 9);
    }
    /**
   * Render nested blocks within a column
   * @param {number} columnIndex - The index of the column
   * @returns {string} HTML string for nested blocks
   */ renderNestedBlocks(columnIndex) {
        const column = this.config.columns[columnIndex];
        if (!column || !column.blocks || column.blocks.length === 0) return '<div class="column-placeholder">Drop blocks here</div>';
        return column.blocks.map((block)=>{
            return `<div class="nested-block nested-block-${block.class}" data-block-id="${block.id}">
                <div class="nested-block-content">
                    ${this.renderNestedBlockContent(block)}
                </div>
                <div class="nested-block-controls">
                    <button class="delete-nested-block" @click="removeNestedBlock(${columnIndex}, '${block.id}')">\xd7</button>
                </div>
            </div>`;
        }).join('');
    }
    /**
   * Render the content of a nested block
   * @param {Object} block - The block object to render
   * @returns {string} HTML string for the block content
   */ renderNestedBlockContent(block) {
        switch(block.class){
            case 'Paragraph':
                return `<div class="nested-paragraph" style="font-size: ${block.config.fontSize || '16px'}">
                    <p>${block.config.content || 'Enter paragraph text...'}</p>
                </div>`;
            case 'Header':
                return `<div class="nested-header">
                    <${block.config.level || 'h2'} style="margin: 0; color: ${block.config.color || '#333'}">
                        ${block.config.content || 'Header text'}
                    </${block.config.level || 'h2'}>
                </div>`;
            case 'Image':
                if (block.config.src) return `<div class="nested-image" style="text-align: ${block.config.alignment || 'center'}">
                        <img src="${block.config.src}" alt="${block.config.alt || ''}" style="max-width: 100%; height: auto;">
                        ${block.config.caption ? `<div class="image-caption">${block.config.caption}</div>` : ''}
                    </div>`;
                else return '<div class="image-placeholder">\uD83D\uDCF7 Click to add image</div>';
            case 'List':
                const listType = block.config.type || 'ul';
                return `<div class="nested-list">
                    <${listType}><li>${block.config.content || 'List item'}</li></${listType}>
                </div>`;
            case 'Button':
                return `<div class="nested-button" style="text-align: center; margin: 10px 0;">
                    <button class="btn btn-${block.config.type || 'primary'} btn-${block.config.size || 'medium'}">
                        ${block.config.text || 'Button'}
                    </button>
                </div>`;
            case 'Alert':
                return `<div class="nested-alert alert-${block.config.type || 'info'}" style="padding: 10px; border-radius: 4px; margin: 10px 0;">
                    ${block.config.icon ? "\u26A0\uFE0F " : ''}${block.config.content || 'Alert message'}
                </div>`;
            case 'Quote':
                return `<div class="nested-quote" style="border-left: 4px solid #ddd; padding-left: 16px; margin: 10px 0; font-style: italic;">
                    <blockquote>${block.config.content || 'Quote text'}</blockquote>
                    ${block.config.attribution ? `<cite>\u{2014} ${block.config.attribution}</cite>` : ''}
                </div>`;
            default:
                return `<div class="block-preview">
                    <div class="block-type-icon">\u{1F4E6}</div>
                    <div class="block-type-name">${block.class}</div>
                    <div class="block-type-desc">Block content</div>
                </div>`;
        }
    }
    /**
   * Remove a nested block from a column
   * @param {number} columnIndex - The index of the column
   * @param {string} blockId - The ID of the block to remove
   */ removeNestedBlock(columnIndex, blockId) {
        const column = this.config.columns[columnIndex];
        if (column && column.blocks) {
            column.blocks = column.blocks.filter((block)=>block.id !== blockId);
            this.triggerRedraw();
        }
    }
    editorRender() {
        const columnsToolInstance = this;
        return `<div class="columns-block" style="${this.getColumnStyles()}"
                     x-data="{ 
                         hoveredColumn: null,
                         handleColumnDragOver(event, columnIndex) {
                             event.preventDefault();
                             event.stopPropagation();
                             this.hoveredColumn = columnIndex;
                         },
                         handleColumnDragLeave(event, columnIndex) {
                             // Only clear if we're actually leaving the column
                             if (!event.relatedTarget || !event.currentTarget.contains(event.relatedTarget)) {
                                 this.hoveredColumn = null;
                             }
                         },
                         handleColumnDrop(event, columnIndex) {
                             event.preventDefault();
                             event.stopPropagation();
                             event.stopImmediatePropagation();
                             
                             // Clear hover state immediately
                             this.hoveredColumn = null;
                             
                             try {
                                 // Try to get JSON data first, then fall back to text/plain
                                 let blockData;
                                 const jsonData = event.dataTransfer.getData('application/json');
                                 if (jsonData) {
                                     blockData = JSON.parse(jsonData);
                                 } else {
                                     // Fall back to text/plain format (from toolbar)
                                     const toolClass = event.dataTransfer.getData('text/plain');
                                     blockData = {
                                         class: toolClass,
                                         config: {}
                                     };
                                 }
                                 
                                 const columnsBlock = window.alpineEditors.editorjs.blocks.find(b => b.id === '${this.id}');
                                 if (columnsBlock) {
                                     columnsBlock.handleColumnDrop(columnIndex, blockData);
                                 }
                                 // Prevent the main editor from handling this drop
                                 return false;
                             } catch (e) {
                                 Debug.error('Error handling column drop:', e);
                             }
                         },
                         removeNestedBlock(columnIndex, blockId) {
                             const columnsBlock = window.alpineEditors.editorjs.blocks.find(b => b.id === '${this.id}');
                             if (columnsBlock) {
                                 columnsBlock.removeNestedBlock(columnIndex, blockId);
                             }
                         },
                         updateColumnWidth(columnIndex, width) {
                             const columnsBlock = window.alpineEditors.editorjs.blocks.find(b => b.id === '${this.id}');
                             if (columnsBlock) {
                                 columnsBlock.config.columns[columnIndex].width = width;
                                 columnsBlock.triggerRedraw();
                             }
                         }
                     }">
            ${this.config.columns.map((column, index)=>`
                <div class="column column-${index}" 
                     :class="{ 'column-hovered': hoveredColumn === ${index} }">
                    
                    <div class="column-header">
                        <span class="column-label">Column ${index + 1}</span>
                        <input type="text" 
                               class="column-width-input"
                               @change="updateColumnWidth(${index}, $event.target.value)"
                               value="${column.width}"
                               placeholder="Width (e.g. 1fr, 200px)">
                    </div>
                    
                    <div class="column-content column-drop-zone" 
                         @dragover="handleColumnDragOver($event, ${index})"
                         @dragleave="handleColumnDragLeave($event, ${index})"
                         @drop="handleColumnDrop($event, ${index})">
                        ${this.renderNestedBlocks(index)}
                    </div>
                </div>
            `).join('')}
        </div>`;
    }
    render() {
        return `<div class="columns-block" style="${this.getColumnStyles()}">
            ${this.config.columns.map((column, index)=>`
                <div class="column">
                    <div class="column-content">
                        ${this.renderNestedBlocks(index)}
                    </div>
                </div>
            `).join('')}
        </div>`;
    }
}
exports.default = Columns;

},{"../core/Tool":"bG0oo","../core/utils/Debug":"2UdN7","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"agwSs":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tool = require("../core/Tool");
var _toolDefault = parcelHelpers.interopDefault(_tool);
class Raw extends (0, _toolDefault.default) {
    constructor({ id, updateFunction, config }){
        super(id, updateFunction, config);
        this.config = {
            content: this.config.content || '',
            mode: this.config.mode || 'html',
            // html, css, javascript
            executeScript: this.config.executeScript || false,
            validateHtml: this.config.validateHtml || true,
            wrapCss: this.config.wrapCss || true
        };
        this.settings = [
            {
                name: 'mode',
                label: 'Code Type',
                html: `<select @change="trigger('${this.id}', 'mode', $event.target.value)">
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="javascript">JavaScript</option>
                </select>`
            },
            {
                name: 'executeScript',
                label: 'Execute JavaScript',
                html: `<label x-show="block.config.mode === 'javascript'">
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'executeScript', $event.target.checked)"
                        :checked="block.config.executeScript">
                    Execute JavaScript
                </label>`
            },
            {
                name: 'validateHtml',
                label: 'Validate HTML',
                html: `<label x-show="block.config.mode === 'html'">
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'validateHtml', $event.target.checked)"
                        :checked="block.config.validateHtml">
                    Validate HTML
                </label>`
            },
            {
                name: 'wrapCss',
                label: 'Scope CSS',
                html: `<label x-show="block.config.mode === 'css'">
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'wrapCss', $event.target.checked)"
                        :checked="block.config.wrapCss">
                    Scope CSS
                </label>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Raw Code',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>',
            category: 'Advanced'
        };
    }
    validateContent() {
        if (!this.config.content) return true;
        switch(this.config.mode){
            case 'html':
                if (!this.config.validateHtml) return true;
                try {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(this.config.content, 'text/html');
                    return !doc.querySelector('parsererror');
                } catch (e) {
                    return false;
                }
            case 'css':
                try {
                    const style = document.createElement('style');
                    style.textContent = this.config.content;
                    document.head.appendChild(style);
                    document.head.removeChild(style);
                    return true;
                } catch (e) {
                    return false;
                }
            case 'javascript':
                try {
                    new Function(this.config.content);
                    return true;
                } catch (e) {
                    return false;
                }
            default:
                return true;
        }
    }
    processContent() {
        if (!this.config.content) return '';
        switch(this.config.mode){
            case 'html':
                return this.config.content;
            case 'css':
                if (this.config.wrapCss) return `<style data-block-id="${this.id}">
                        .raw-block[data-block-id="${this.id}"] {
                            ${this.config.content}
                        }
                    </style>`;
                return `<style>${this.config.content}</style>`;
            case 'javascript':
                if (this.config.executeScript) return `<script>
                        (function() {
                            ${this.config.content}
                        })();
                    </script>`;
                return `<pre><code>${this.config.content}</code></pre>`;
            default:
                return this.config.content;
        }
    }
    editorRender() {
        const isValid = this.validateContent();
        return `<div class="raw-block" data-block-id="${this.id}">
            <div class="code-editor">
                <textarea
                    class="code-input ${!isValid ? 'invalid' : ''}"
                    x-html="block.config.content"
                    @input="block.config.content = $event.target.value"
                    placeholder="Enter your ${this.config.mode} code here..."
                    style="width: 100%; min-height: 200px; font-family: monospace;">${this.config.content}</textarea>
                ${!isValid ? '<div class="validation-error">Invalid code format</div>' : ''}
            </div>
            ${this.config.mode === 'html' ? `
                <div class="preview-section">
                    <h4>Preview:</h4>
                    <div class="preview-content" x-html="block.config.content"></div>
                </div>
            ` : ''}
        </div>`;
    }
    render() {
        return `<div class="raw-block" data-block-id="${this.id}">
            ${this.processContent()}
        </div>`;
    }
}
exports.default = Raw;

},{"../core/Tool":"bG0oo","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"f1wwu":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tool = require("../core/Tool");
var _toolDefault = parcelHelpers.interopDefault(_tool);
class Delimiter extends (0, _toolDefault.default) {
    constructor({ id, updateFunction, config }){
        super(id, updateFunction, config);
        this.config = {
            style: this.config.style || 'line',
            // line, dots, asterisks, custom
            color: this.config.color || '#E8E8E8',
            width: this.config.width || '100%',
            thickness: this.config.thickness || '1px',
            spacing: this.config.spacing || '20px',
            alignment: this.config.alignment || 'center',
            customText: this.config.customText || '***'
        };
        this.settings = [
            {
                name: 'style',
                label: 'Delimiter Style',
                html: `<select @change="trigger('${this.id}', 'style', $event.target.value)">
                    <option value="line">Line</option>
                    <option value="dots">Dots</option>
                    <option value="asterisks">Asterisks</option>
                    <option value="custom">Custom Text</option>
                </select>`
            },
            {
                name: 'customText',
                label: 'Custom Text',
                html: `<input type="text" 
                    @change="trigger('${this.id}', 'customText', $event.target.value)"
                    :value="block.config.customText"
                    x-show="block.config.style === 'custom'"
                    placeholder="Enter custom delimiter text">`
            },
            {
                name: 'appearance',
                label: 'Appearance',
                html: `<div class="delimiter-appearance">
                    <input type="color" 
                        @change="trigger('${this.id}', 'color', $event.target.value)"
                        :value="block.config.color"
                        title="Color">
                    <input type="text" 
                        @change="trigger('${this.id}', 'width', $event.target.value)"
                        :value="block.config.width"
                        placeholder="Width (%, px)"
                        title="Width">
                    <input type="text" 
                        @change="trigger('${this.id}', 'thickness', $event.target.value)"
                        :value="block.config.thickness"
                        placeholder="Thickness (px)"
                        title="Thickness">
                    <input type="text" 
                        @change="trigger('${this.id}', 'spacing', $event.target.value)"
                        :value="block.config.spacing"
                        placeholder="Spacing (px)"
                        title="Spacing">
                </div>`
            },
            {
                name: 'alignment',
                label: 'Alignment',
                html: `<select @change="trigger('${this.id}', 'alignment', $event.target.value)">
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                </select>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Delimiter',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>',
            category: 'Layout'
        };
    }
    getDelimiterContent() {
        switch(this.config.style){
            case 'line':
                return `<hr style="
                    border: none;
                    height: ${this.config.thickness};
                    background-color: ${this.config.color};
                    margin: ${this.config.spacing} auto;">`;
            case 'dots':
                return `<div style="
                    text-align: ${this.config.alignment};
                    color: ${this.config.color};
                    margin: ${this.config.spacing} auto;
                    letter-spacing: 8px;
                    font-size: ${parseInt(this.config.thickness) * 4}px;">
                    \u{2022} \u{2022} \u{2022}
                </div>`;
            case 'asterisks':
                return `<div style="
                    text-align: ${this.config.alignment};
                    color: ${this.config.color};
                    margin: ${this.config.spacing} auto;
                    letter-spacing: 8px;
                    font-size: ${parseInt(this.config.thickness) * 2}px;">
                    * * *
                </div>`;
            case 'custom':
                return `<div style="
                    text-align: ${this.config.alignment};
                    color: ${this.config.color};
                    margin: ${this.config.spacing} auto;
                    font-size: ${parseInt(this.config.thickness) * 2}px;">
                    ${this.config.customText}
                </div>`;
        }
    }
    editorRender() {
        return `<div class="delimiter-block" style="width: ${this.config.width}; margin: 0 auto;">
            ${this.getDelimiterContent()}
        </div>`;
    }
    render() {
        return `<div class="delimiter-block" style="width: ${this.config.width}; margin: 0 auto;">
            ${this.getDelimiterContent()}
        </div>`;
    }
}
exports.default = Delimiter;

},{"../core/Tool":"bG0oo","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"vKCcw":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tool = require("../core/Tool");
var _toolDefault = parcelHelpers.interopDefault(_tool);
class Button extends (0, _toolDefault.default) {
    constructor({ id, updateFunction, config }){
        super(id, updateFunction, config);
        this.config = {
            text: this.config.text || 'Click me',
            url: this.config.url || '',
            type: this.config.type || 'primary',
            // primary, secondary, outline, link
            size: this.config.size || 'medium',
            // small, medium, large
            icon: this.config.icon || '',
            iconPosition: this.config.iconPosition || 'left',
            fullWidth: this.config.fullWidth || false,
            disabled: this.config.disabled || false,
            customStyles: this.config.customStyles || {
                backgroundColor: '',
                textColor: '',
                borderColor: '',
                borderRadius: '',
                padding: ''
            }
        };
        this.settings = [
            {
                name: 'text',
                label: 'Button Text',
                html: `<input type="text" class="settings-input" 
                    @change="trigger('${this.id}', 'text', $event.target.value)"
                    :value="${this.config.text}"
                    placeholder="Enter button text">`
            },
            {
                name: 'url',
                label: 'URL',
                html: `<input type="text" class="settings-input" 
                    @change="trigger('${this.id}', 'url', $event.target.value)"
                    :value="${this.config.url}"
                    placeholder="Enter URL">`
            },
            {
                name: 'type',
                label: 'Button Type',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'type', $event.target.value)">
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="outline">Outline</option>
                    <option value="link">Link</option>
                </select>`
            },
            {
                name: 'size',
                label: 'Size',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'size', $event.target.value)">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>`
            },
            {
                name: 'icon',
                label: 'Icon',
                html: `<select class="settings-select" @change="trigger('${this.id}', 'icon', $event.target.value)">
                    <option value="">None</option>
                    <option value="arrow-right">Arrow Right</option>
                    <option value="download">Download</option>
                    <option value="external-link">External Link</option>
                </select>`
            },
            {
                name: 'iconPosition',
                label: 'Icon Position',
                html: `<select class="settings-select" 
                    @change="trigger('${this.id}', 'iconPosition', $event.target.value)"
                    x-show="${this.config.icon}">
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                </select>`
            },
            {
                name: 'fullWidth',
                label: 'Full Width',
                html: `<label class="settings-checkbox">
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'fullWidth', $event.target.checked)"
                        :checked="${this.config.fullWidth}">
                    <span class="settings-checkbox-label">Full Width</span>
                </label>`
            },
            {
                name: 'disabled',
                label: 'Disabled',
                html: `<label class="settings-checkbox">
                    <input type="checkbox" 
                        @change="trigger('${this.id}', 'disabled', $event.target.checked)"
                        :checked="${this.config.disabled}">
                    <span class="settings-checkbox-label">Disabled</span>
                </label>`
            },
            {
                name: 'customStyles',
                label: 'Custom Styles',
                html: `<div class="custom-styles">
                    <input type="color" class="settings-color-input" 
                        @change="trigger('${this.id}', 'customStyles', {backgroundColor: $event.target.value, textColor: '${this.config.customStyles.textColor}', borderColor: '${this.config.customStyles.borderColor}', borderRadius: '${this.config.customStyles.borderRadius}', padding: '${this.config.customStyles.padding}'})"
                        value="${this.config.customStyles.backgroundColor}"
                        title="Background Color">
                    <input type="color" class="settings-color-input" 
                        @change="trigger('${this.id}', 'customStyles', {backgroundColor: '${this.config.customStyles.backgroundColor}', textColor: $event.target.value, borderColor: '${this.config.customStyles.borderColor}', borderRadius: '${this.config.customStyles.borderRadius}', padding: '${this.config.customStyles.padding}'})"
                        value="${this.config.customStyles.textColor}"
                        title="Text Color">
                    <input type="color" class="settings-color-input" 
                        @change="trigger('${this.id}', 'customStyles', {backgroundColor: '${this.config.customStyles.backgroundColor}', textColor: '${this.config.customStyles.textColor}', borderColor: $event.target.value, borderRadius: '${this.config.customStyles.borderRadius}', padding: '${this.config.customStyles.padding}'})"
                        value="${this.config.customStyles.borderColor}"
                        title="Border Color">
                    <input type="text" class="settings-input" 
                        @change="trigger('${this.id}', 'customStyles', {backgroundColor: '${this.config.customStyles.backgroundColor}', textColor: '${this.config.customStyles.textColor}', borderColor: '${this.config.customStyles.borderColor}', borderRadius: $event.target.value, padding: '${this.config.customStyles.padding}'})"
                        value="${this.config.customStyles.borderRadius}"
                        placeholder="Border Radius"
                        title="Border Radius">
                    <input type="text" class="settings-input" 
                        @change="trigger('${this.id}', 'customStyles', {backgroundColor: '${this.config.customStyles.backgroundColor}', textColor: '${this.config.customStyles.textColor}', borderColor: '${this.config.customStyles.borderColor}', borderRadius: '${this.config.customStyles.borderRadius}', padding: $event.target.value})"
                        value="${this.config.customStyles.padding}"
                        placeholder="Padding"
                        title="Padding">
                </div>`
            }
        ];
    }
    static toolbox() {
        return {
            name: 'Button',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"/></svg>',
            category: 'Interactive'
        };
    }
    getIcon() {
        const icons = {
            'arrow-right': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>',
            'download': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>',
            'external-link': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg>'
        };
        return icons[this.config.icon] || '';
    }
    getButtonStyles() {
        const sizeStyles = {
            small: 'padding: 0.25rem 0.5rem; font-size: 0.875rem;',
            medium: 'padding: 0.5rem 1rem; font-size: 1rem;',
            large: 'padding: 0.75rem 1.5rem; font-size: 1.125rem;'
        };
        const typeStyles = {
            primary: 'background-color: #007bff; color: white; border: none;',
            secondary: 'background-color: #6c757d; color: white; border: none;',
            outline: 'background-color: transparent; color: #007bff; border: 1px solid #007bff;',
            link: 'background-color: transparent; color: #007bff; border: none; text-decoration: underline;'
        };
        return `
            ${typeStyles[this.config.type]}
            ${sizeStyles[this.config.size]}
            ${this.config.fullWidth ? 'width: 100%;' : ''}
            ${this.config.disabled ? 'opacity: 0.65; pointer-events: none;' : ''}
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.2s;
            ${this.config.customStyles.backgroundColor ? `background-color: ${this.config.customStyles.backgroundColor} !important;` : ''}
            ${this.config.customStyles.textColor ? `color: ${this.config.customStyles.textColor} !important;` : ''}
            ${this.config.customStyles.borderColor ? `border-color: ${this.config.customStyles.borderColor} !important;` : ''}
            ${this.config.customStyles.borderRadius ? `border-radius: ${this.config.customStyles.borderRadius} !important;` : ''}
            ${this.config.customStyles.padding ? `padding: ${this.config.customStyles.padding} !important;` : ''}
        `;
    }
    editorRender() {
        const icon = this.getIcon();
        const buttonContent = `
            ${this.config.iconPosition === 'left' && icon ? `<span class="button-icon">${icon}</span>` : ''}
            <span class="button-text"
                contenteditable="true"
                x-html="block.config.text"
                @blur="block.config.text = $event.target.innerHTML">${this.config.text}</span>
            ${this.config.iconPosition === 'right' && icon ? `<span class="button-icon">${icon}</span>` : ''}
        `;
        return `<div class="button-block">
            ${this.config.url ? `
                <a href="${this.config.url}" 
                    class="button" 
                    style="${this.getButtonStyles()}"
                    target="_blank"
                    rel="noopener noreferrer">
                    ${buttonContent}
                </a>
            ` : `
                <button 
                    class="button" 
                    style="${this.getButtonStyles()}"
                    ${this.config.disabled ? 'disabled' : ''}>
                    ${buttonContent}
                </button>
            `}
        </div>`;
    }
    render() {
        const icon = this.getIcon();
        const buttonContent = `
            ${this.config.iconPosition === 'left' && icon ? `<span class="button-icon">${icon}</span>` : ''}
            <span class="button-text">${this.config.text}</span>
            ${this.config.iconPosition === 'right' && icon ? `<span class="button-icon">${icon}</span>` : ''}
        `;
        return `<div class="button-block">
            ${this.config.url ? `
                <a href="${this.config.url}" 
                    class="button" 
                    style="${this.getButtonStyles()}"
                    target="_blank"
                    rel="noopener noreferrer">
                    ${buttonContent}
                </a>
            ` : `
                <button 
                    class="button" 
                    style="${this.getButtonStyles()}"
                    ${this.config.disabled ? 'disabled' : ''}>
                    ${buttonContent}
                </button>
            `}
        </div>`;
    }
}
exports.default = Button;

},{"../core/Tool":"bG0oo","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["l4iut","a0t4e"], "a0t4e", "parcelRequire166e", {})

//# sourceMappingURL=examples.31b563d9.js.map
