/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@fortawesome/fontawesome-free/css/all.min.css":
/*!********************************************************************!*\
  !*** ./node_modules/@fortawesome/fontawesome-free/css/all.min.css ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/wp-github-gist-block/block.json":
/*!*********************************************!*\
  !*** ./src/wp-github-gist-block/block.json ***!
  \*********************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/wp-github-gist-block","version":"0.1.1","title":"Wp Github Gist Block","category":"widgets","icon":"embed-generic","description":"Example block scaffolded with Create Block tool.","example":{},"supports":{"html":false},"textdomain":"wp-github-gist-block","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js","attributes":{"gistId":{"type":"string","default":""}}}');

/***/ }),

/***/ "./src/wp-github-gist-block/edit.js":
/*!******************************************!*\
  !*** ./src/wp-github-gist-block/edit.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/wp-github-gist-block/editor.scss");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_fontawesome_free_css_all_min_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/fontawesome-free/css/all.min.css */ "./node_modules/@fortawesome/fontawesome-free/css/all.min.css");

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */




function Edit({
  attributes,
  setAttributes
}) {
  var _a;
  const [isModalOpen, setIsModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  const [gistIdInput, setGistIdInput] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)((_a = attributes.gistId) !== null && _a !== void 0 ? _a : "");
  const [isValidGistId, setIsValidGistId] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  const [debouncedGistId, setDebouncedGistId] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(attributes.gistId);
  const [isSavedGistIdValid, setIsSavedGistIdValid] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  // Debounce input inside modal
  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    const handler = setTimeout(() => {
      setDebouncedGistId(gistIdInput);
    }, 500);
    return () => clearTimeout(handler);
  }, [gistIdInput]);
  // Validate debounced input (modal input)
  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (debouncedGistId) {
      fetch(`https://api.github.com/gists/${debouncedGistId}`).then(response => {
        setIsValidGistId(response.ok);
      }).catch(() => setIsValidGistId(false));
    } else {
      setIsValidGistId(false);
    }
  }, [debouncedGistId]);
  // Validate saved gistId for main block checkmark
  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (attributes.gistId) {
      fetch(`https://api.github.com/gists/${attributes.gistId}`).then(response => {
        setIsSavedGistIdValid(response.ok);
      }).catch(() => setIsSavedGistIdValid(false));
    } else {
      setIsSavedGistIdValid(false);
    }
  }, [attributes.gistId]);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)();
  if (!attributes.gistId) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Placeholder, {
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("i", {
        className: "fab fa-github",
        style: {
          marginRight: 4
        }
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("GitHub Gist", "wp-github-gist-block"),
      instructions: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Enter the Gist ID to display the content.", "wp-github-gist-block"),
      className: "github-gist-placeholder",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
        variant: "primary",
        onClick: () => {
          setGistIdInput("");
          setIsModalOpen(true);
        },
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Add Gist ID", "wp-github-gist-block")
      }), isModalOpen && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Modal, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Set GitHub Gist ID", "wp-github-gist-block"),
        onRequestClose: () => setIsModalOpen(false),
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          style: {
            position: "relative",
            width: "100%",
            marginBottom: 24,
            background: "#f6f7f7",
            border: "1px solid #dcdcde",
            borderRadius: "6px",
            padding: "24px 16px",
            boxSizing: "border-box"
          },
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
            type: "text",
            value: gistIdInput,
            onChange: e => setGistIdInput(e.target.value),
            placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Enter Gist ID", "wp-github-gist-block"),
            style: {
              width: "100%",
              background: "#fff",
              backgroundColor: gistIdInput ? isValidGistId ? "rgba(144, 238, 144, 0.2)" : "rgba(255, 99, 71, 0.1)" : "#fff",
              paddingRight: "30px",
              border: "1px solid #dcdcde",
              borderRadius: "4px",
              boxShadow: "none",
              outline: "none",
              fontSize: "16px",
              padding: "8px 12px",
              transition: "border-color 0.2s"
            },
            onFocus: e => e.target.style.borderColor = "#757575",
            onBlur: e => e.target.style.borderColor = "#dcdcde"
          }), gistIdInput && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            style: {
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: isValidGistId ? "green" : "red"
            },
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("i", {
              className: isValidGistId ? "fas fa-check" : "fas fa-times"
            })
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          style: {
            display: "flex",
            justifyContent: "flex-end",
            gap: 8
          },
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
            variant: "secondary",
            onClick: () => setIsModalOpen(false),
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Cancel", "wp-github-gist-block")
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
            variant: "primary",
            disabled: !isValidGistId,
            onClick: () => {
              setAttributes({
                gistId: gistIdInput
              });
              setIsModalOpen(false);
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Save", "wp-github-gist-block")
          })]
        })]
      })]
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({}, blockProps, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
      variant: "primary",
      onClick: () => {
        var _a;
        setGistIdInput((_a = attributes.gistId) !== null && _a !== void 0 ? _a : "");
        setIsModalOpen(true);
      },
      children: attributes.gistId ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Edit Gist ID", "wp-github-gist-block") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Add Gist ID", "wp-github-gist-block")
    }), attributes.gistId && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      style: {
        marginTop: 12,
        display: "flex",
        alignItems: "center",
        gap: 8
      },
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        style: {
          color: "#555"
        },
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Current Gist ID:", "wp-github-gist-block")
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
        children: attributes.gistId
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("i", {
        className: "fas fa-check",
        style: {
          color: "green",
          marginLeft: 8,
          display: isSavedGistIdValid ? "inline" : "none"
        }
      })]
    }), isModalOpen && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Modal, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Set GitHub Gist ID", "wp-github-gist-block"),
      onRequestClose: () => setIsModalOpen(false),
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
          position: "relative",
          width: "100%",
          marginBottom: 24,
          background: "#f6f7f7",
          border: "1px solid #dcdcde",
          borderRadius: "6px",
          padding: "24px 16px",
          boxSizing: "border-box"
        },
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
          type: "text",
          value: gistIdInput,
          onChange: e => setGistIdInput(e.target.value),
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Enter Gist ID", "wp-github-gist-block"),
          style: {
            width: "100%",
            background: "#fff",
            backgroundColor: gistIdInput ? isValidGistId ? "rgba(144, 238, 144, 0.2)" : "rgba(255, 99, 71, 0.1)" : "#fff",
            paddingRight: "30px",
            border: "1px solid #dcdcde",
            borderRadius: "4px",
            boxShadow: "none",
            outline: "none",
            fontSize: "16px",
            padding: "8px 12px",
            transition: "border-color 0.2s"
          },
          onFocus: e => e.target.style.borderColor = "#757575",
          onBlur: e => e.target.style.borderColor = "#dcdcde"
        }), gistIdInput && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          style: {
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: isValidGistId ? "green" : "red"
          },
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("i", {
            className: isValidGistId ? "fas fa-check" : "fas fa-times"
          })
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
          display: "flex",
          justifyContent: "flex-end",
          gap: 8
        },
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
          variant: "secondary",
          onClick: () => setIsModalOpen(false),
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Cancel", "wp-github-gist-block")
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
          variant: "primary",
          disabled: !isValidGistId,
          onClick: () => {
            setAttributes({
              gistId: gistIdInput
            });
            setIsModalOpen(false);
          },
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Save", "wp-github-gist-block")
        })]
      })]
    })]
  }));
}

/***/ }),

/***/ "./src/wp-github-gist-block/editor.scss":
/*!**********************************************!*\
  !*** ./src/wp-github-gist-block/editor.scss ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/wp-github-gist-block/index.js":
/*!*******************************************!*\
  !*** ./src/wp-github-gist-block/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/wp-github-gist-block/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/wp-github-gist-block/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/wp-github-gist-block/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

/**
 * Internal dependencies
 */


/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  title: _block_json__WEBPACK_IMPORTED_MODULE_3__.title,
  description: _block_json__WEBPACK_IMPORTED_MODULE_3__.description,
  category: _block_json__WEBPACK_IMPORTED_MODULE_3__.category,
  icon: _block_json__WEBPACK_IMPORTED_MODULE_3__.icon,
  supports: {
    html: _block_json__WEBPACK_IMPORTED_MODULE_3__.supports.html
  },
  attributes: _block_json__WEBPACK_IMPORTED_MODULE_3__.attributes,
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
  // save: save,
});

/***/ }),

/***/ "./src/wp-github-gist-block/style.scss":
/*!*********************************************!*\
  !*** ./src/wp-github-gist-block/style.scss ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"wp-github-gist-block/index": 0,
/******/ 			"wp-github-gist-block/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkwp_github_gist_block"] = globalThis["webpackChunkwp_github_gist_block"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["wp-github-gist-block/style-index"], () => (__webpack_require__("./src/wp-github-gist-block/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map