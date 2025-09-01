/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 6710:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


;// ./src/main/js/components/header/actions-touch.js
function updateActionsForTouch() {
  // We want to disable the User action href on touch devices so that they can still activate the overflow menu
  const link = document.querySelector("#root-action-UserAction");
  if (link) {
    const originalHref = link.getAttribute("href");
    const isTouchDevice = window.matchMedia("(hover: none)").matches;

    // HTMLUnit doesn't register itself as supporting hover, thus the href is removed when it shouldn't be
    if (isTouchDevice && !window.isRunAsTest) {
      link.removeAttribute("href");
    } else {
      link.setAttribute("href", originalHref);
    }
  }
}
;// ./src/main/js/util/dom.js
function createElementFromHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}
function toId(string) {
  return string.trim().replace(/[\W_]+/g, "-").toLowerCase();
}
;// ./src/main/js/util/security.js
function xmlEscape(str) {
  return str.replace(/[<>&'"]/g, match => {
    switch (match) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
    }
  });
}

;// ./src/main/js/components/dropdowns/templates.js


const hideOnPopperBlur = {
  name: "hideOnPopperBlur",
  defaultValue: true,
  fn(instance) {
    return {
      onCreate() {
        instance.popper.addEventListener("focusout", event => {
          if (instance.props.hideOnPopperBlur && event.relatedTarget && !instance.popper.contains(event.relatedTarget)) {
            instance.hide();
          }
        });
      }
    };
  }
};
function dropdown() {
  return {
    content: "<p class='jenkins-spinner'></p>",
    interactive: true,
    trigger: "click",
    allowHTML: true,
    placement: "bottom-start",
    arrow: false,
    theme: "dropdown",
    appendTo: document.body,
    plugins: [hideOnPopperBlur],
    offset: [0, 0],
    animation: "dropdown",
    duration: 250,
    onShow: instance => {
      // Make sure only one instance is visible at all times in case of breadcrumb
      if (instance.reference.classList.contains("hoverable-model-link") || instance.reference.classList.contains("hoverable-children-model-link")) {
        const dropdowns = document.querySelectorAll("[data-tippy-root]");
        Array.from(dropdowns).forEach(element => {
          // Check if the Tippy.js instance exists
          if (element && element._tippy) {
            // To just hide the dropdown
            element._tippy.hide();
          }
        });
      }
      const referenceParent = instance.reference.parentNode;
      if (referenceParent.classList.contains("model-link")) {
        referenceParent.classList.add("model-link--open");
      }
    },
    onHide: instance => {
      const referenceParent = instance.reference.parentNode;
      referenceParent.classList.remove("model-link--open");
    }
  };
}
function menuItem(options) {
  const itemOptions = Object.assign({
    type: "link"
  }, options);
  const label = xmlEscape(itemOptions.label);
  let badgeText;
  let badgeTooltip;
  let badgeSeverity;
  if (itemOptions.badge) {
    badgeText = xmlEscape(itemOptions.badge.text);
    badgeTooltip = xmlEscape(itemOptions.badge.tooltip);
    badgeSeverity = xmlEscape(itemOptions.badge.severity);
  }
  const tag = itemOptions.type === "link" ? "a" : "button";
  const item = createElementFromHtml(`
      <${tag} class="jenkins-dropdown__item ${itemOptions.clazz ? xmlEscape(itemOptions.clazz) : ""}" ${itemOptions.url ? `href="${xmlEscape(itemOptions.url)}"` : ""} ${itemOptions.id ? `id="${xmlEscape(itemOptions.id)}"` : ""}>
          ${itemOptions.icon ? `<div class="jenkins-dropdown__item__icon">${itemOptions.iconXml ? itemOptions.iconXml : `<img alt="${label}" src="${itemOptions.icon}" />`}</div>` : ``}
          ${label}
                    ${itemOptions.badge != null ? `<span class="jenkins-dropdown__item__badge jenkins-badge jenkins-!-${badgeSeverity}-color" tooltip="${badgeTooltip}">${badgeText}</span>` : ``}
          ${itemOptions.subMenu != null ? `<span class="jenkins-dropdown__item__chevron"></span>` : ``}
      </${tag}>
    `);
  if (options.onClick) {
    item.addEventListener("click", event => options.onClick(event));
  }
  if (options.onKeyPress) {
    item.onkeypress = options.onKeyPress;
  }
  return item;
}
function heading(label) {
  return createElementFromHtml(`<p class="jenkins-dropdown__heading">${label}</p>`);
}
function separator() {
  return createElementFromHtml(`<div class="jenkins-dropdown__separator"></div>`);
}
function placeholder(label) {
  return createElementFromHtml(`<p class="jenkins-dropdown__placeholder">${label}</p>`);
}
function disabled(label) {
  return createElementFromHtml(`<p class="jenkins-dropdown__disabled">${label}</p>`);
}
/* harmony default export */ var templates = ({
  dropdown,
  menuItem,
  heading,
  separator,
  placeholder,
  disabled
});
;// ./src/main/js/util/keyboard.js
/**
 * @param {Element} container - the container for the items
 * @param {function(): NodeListOf<Element>} itemsFunc - function which returns the list of items
 * @param {string} selectedClass - the class to apply to the selected item
 * @param {function()} additionalBehaviours - add additional keyboard shortcuts to the focused item
 * @param hasKeyboardPriority - set if custom behaviour is needed to decide whether the element has keyboard priority
 */
function makeKeyboardNavigable(container, itemsFunc, selectedClass, additionalBehaviours = () => {}, hasKeyboardPriority = () => window.getComputedStyle(container).visibility === "visible") {
  window.addEventListener("keyup", e => {
    let items = Array.from(itemsFunc());
    let selectedItem = items.find(a => a.classList.contains(selectedClass));
    if (container && hasKeyboardPriority(container)) {
      if (e.key === "Tab") {
        if (items.includes(document.activeElement)) {
          if (selectedItem) {
            selectedItem.classList.remove(selectedClass);
          }
          selectedItem = document.activeElement;
          selectedItem.classList.add(selectedClass);
        }
      }
    }
  });
  window.addEventListener("keydown", e => {
    let items = Array.from(itemsFunc());
    let selectedItem = items.find(a => a.classList.contains(selectedClass));

    // Only navigate through the list of items if the container is active on the screen
    if (container && hasKeyboardPriority(container)) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (selectedItem) {
          selectedItem.classList.remove(selectedClass);
          const next = items[items.indexOf(selectedItem) + 1];
          if (next) {
            selectedItem = next;
          } else {
            selectedItem = items[0];
          }
        } else {
          selectedItem = items[0];
        }
        scrollAndSelect(selectedItem, selectedClass, items);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (selectedItem) {
          selectedItem.classList.remove(selectedClass);
          const previous = items[items.indexOf(selectedItem) - 1];
          if (previous) {
            selectedItem = previous;
          } else {
            selectedItem = items[items.length - 1];
          }
        } else {
          selectedItem = items[items.length - 1];
        }
        scrollAndSelect(selectedItem, selectedClass, items);
      } else if (e.key === "Enter") {
        if (selectedItem) {
          e.preventDefault();
          selectedItem.click();
        }
      } else {
        additionalBehaviours(selectedItem, e.key, e);
      }
    }
  });
}
function scrollAndSelect(selectedItem, selectedClass, items) {
  if (selectedItem) {
    if (!isInViewport(selectedItem)) {
      selectedItem.scrollIntoView(false);
    }
    selectedItem.classList.add(selectedClass);
    if (items.includes(document.activeElement)) {
      selectedItem.focus();
    }
  }
}
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;
}
// EXTERNAL MODULE: ./node_modules/tippy.js/dist/tippy.esm.js + 16 modules
var tippy_esm = __webpack_require__(7381);
;// ./src/main/js/util/behavior-shim.js
function specify(selector, id, priority, behavior) {
  Behaviour.specify(selector, id, priority, behavior);
}
function applySubtree(startNode, includeSelf) {
  Behaviour.applySubtree(startNode, includeSelf);
}
/* harmony default export */ var behavior_shim = ({
  specify,
  applySubtree
});
;// ./src/main/js/components/dropdowns/utils.js




const SELECTED_ITEM_CLASS = "jenkins-dropdown__item--selected";

/*
 * Generates the dropdowns for the given element
 * Preloads the data on hover for speed
 * @param element - the element to generate the dropdown for
 * @param callback - called to retrieve the list of dropdown items
 */
function generateDropdown(element, callback, immediate, options = {}) {
  if (element._tippy && element._tippy.props.theme === "dropdown") {
    element._tippy.destroy();
  }
  (0,tippy_esm/* default */.Ay)(element, Object.assign({}, templates.dropdown(), {
    onCreate(instance) {
      const onload = () => {
        if (instance.loaded) {
          return;
        }
        document.addEventListener("click", event => {
          const isClickOnReference = instance.reference.contains(event.target);
          // Don't close the dropdown if the user is interacting with a SELECT menu inside of it
          const isSelect = event.target.tagName === "SELECT";
          if (!isClickOnReference && !isSelect) {
            instance.clickToHide = true;
            instance.hide();
          }
        });
        callback(instance);
      };
      if (immediate) {
        onload();
      } else {
        ["mouseenter", "focus"].forEach(event => {
          instance.reference.addEventListener(event, onload);
        });
      }
    },
    onHide(instance) {
      if (instance.props.trigger === "mouseenter" && !instance.clickToHide) {
        const dropdowns = document.querySelectorAll("[data-tippy-root]");
        const isMouseOverAnyDropdown = Array.from(dropdowns).some(dropdown => dropdown.matches(":hover"));
        return !isMouseOverAnyDropdown;
      }
      instance.clickToHide = false;
      return true;
    }
  }, options));
}

/*
 * Generates the contents for the dropdown
 */
function generateDropdownItems(items, compact) {
  const menuItems = document.createElement("div");
  menuItems.classList.add("jenkins-dropdown");
  if (compact === true) {
    menuItems.classList.add("jenkins-dropdown--compact");
  }
  items.map(item => {
    if (item.type === "CUSTOM") {
      return item.contents;
    }
    if (item.type === "HEADER") {
      return templates.heading(item.label);
    }
    if (item.type === "SEPARATOR") {
      return templates.separator();
    }
    if (item.type === "DISABLED") {
      return templates.disabled(item.label);
    }
    const menuItem = templates.menuItem(item);
    if (item.subMenu != null) {
      (0,tippy_esm/* default */.Ay)(menuItem, Object.assign({}, templates.dropdown(), {
        content: generateDropdownItems(item.subMenu()),
        trigger: "mouseenter",
        placement: "right-start",
        offset: [-8, 0]
      }));
    }
    return menuItem;
  }).forEach(item => menuItems.appendChild(item));
  if (items.length === 0) {
    menuItems.appendChild(templates.placeholder("No items"));
  }
  makeKeyboardNavigable(menuItems, () => menuItems.querySelectorAll(".jenkins-dropdown__item"), SELECTED_ITEM_CLASS, (selectedItem, key, evt) => {
    if (!selectedItem) {
      return;
    }
    switch (key) {
      case "ArrowLeft":
        {
          const root = selectedItem.closest("[data-tippy-root]");
          if (root) {
            const tippyReference = root._tippy;
            if (tippyReference) {
              tippyReference.hide();
            }
          }
          break;
        }
      case "ArrowRight":
        {
          const tippyRef = selectedItem._tippy;
          if (!tippyRef) {
            break;
          }
          tippyRef.show();
          tippyRef.props.content.querySelector(".jenkins-dropdown__item").classList.add(SELECTED_ITEM_CLASS);
          break;
        }
      default:
        if (selectedItem.onkeypress) {
          selectedItem.onkeypress(evt);
        }
    }
  }, container => {
    const isVisible = window.getComputedStyle(container).visibility === "visible";
    const isLastDropdown = Array.from(document.querySelectorAll(".jenkins-dropdown")).filter(dropdown => container !== dropdown).filter(dropdown => window.getComputedStyle(dropdown).visibility === "visible").every(dropdown => !(container.compareDocumentPosition(dropdown) & Node.DOCUMENT_POSITION_FOLLOWING));
    return isVisible && isLastDropdown;
  });
  behavior_shim.applySubtree(menuItems);
  return menuItems;
}
function convertHtmlToItems(children) {
  const items = [];
  Array.from(children).forEach(child => {
    const attributes = child.dataset;
    const type = child.dataset.dropdownType;
    switch (type) {
      case "ITEM":
        {
          const item = {
            label: attributes.dropdownText,
            id: attributes.dropdownId,
            icon: attributes.dropdownIcon,
            iconXml: attributes.dropdownIcon,
            clazz: attributes.dropdownClazz
          };
          if (attributes.dropdownHref) {
            item.url = attributes.dropdownHref;
            item.type = "link";
          } else {
            item.type = "button";
          }
          if (attributes.dropdownBadgeSeverity) {
            item.badge = {
              text: attributes.dropdownBadgeText,
              tooltip: attributes.dropdownBadgeTooltip,
              severity: attributes.dropdownBadgeSeverity
            };
          }
          items.push(item);
          break;
        }
      case "SUBMENU":
        items.push({
          type: "ITEM",
          label: attributes.dropdownText,
          icon: attributes.dropdownIcon,
          iconXml: attributes.dropdownIcon,
          subMenu: () => convertHtmlToItems(child.content.children)
        });
        break;
      case "SEPARATOR":
        items.push({
          type: type
        });
        break;
      case "HEADER":
        items.push({
          type: type,
          label: attributes.dropdownText
        });
        break;
      case "CUSTOM":
        items.push({
          type: type,
          contents: child.content.cloneNode(true)
        });
        break;
    }
  });
  return items;
}
function validateDropdown(e) {
  if (e.targetUrl) {
    const method = e.getAttribute("checkMethod") || "post";
    try {
      FormChecker.delayedCheck(e.targetUrl(), method, e.targetElement);
    } catch (x) {
      console.warn(x);
    }
  }
}
function getMaxSuggestionCount(e, defaultValue) {
  return parseInt(e.dataset["maxsuggestions"]) || defaultValue;
}
function debounce(callback) {
  callback.running = false;
  return () => {
    if (!callback.running) {
      callback.running = true;
      setTimeout(() => {
        callback();
        callback.running = false;
      }, 300);
    }
  };
}
/* harmony default export */ var utils = ({
  convertHtmlToItems,
  generateDropdown,
  generateDropdownItems,
  validateDropdown,
  getMaxSuggestionCount,
  debounce
});
;// ./src/main/js/components/header/breadcrumbs-overflow.js


function computeBreadcrumbs() {
  document.querySelectorAll(".jenkins-breadcrumbs__list-item.jenkins-hidden").forEach(e => {
    e.classList.remove("jenkins-hidden");
  });
  if (!breadcrumbsBarOverflows()) {
    removeOverflowButton();
    return;
  }
  const items = [];
  const breadcrumbs = Array.from(document.querySelectorAll(`[data-type="breadcrumb-item"]`));
  const breadcrumbsOverflow = generateOverflowButton().querySelector("button");
  while (breadcrumbsBarOverflows()) {
    const item = breadcrumbs.shift();
    if (!item) {
      break;
    }
    items.push(item);
    item.classList.add("jenkins-hidden");
  }
  utils.generateDropdown(breadcrumbsOverflow, instance => {
    const mappedItems = items.map(e => {
      let href = e.querySelector("a");
      if (href) {
        href = href.href;
      }
      return {
        type: "link",
        label: e.textContent,
        url: href
      };
    });
    instance.setContent(utils.generateDropdownItems(mappedItems));
  }, true, {
    trigger: "mouseenter focus",
    offset: [0, 10],
    animation: "tooltip"
  });
}
function breadcrumbsBarOverflows() {
  const breadcrumbsBar = document.querySelector("#breadcrumbBar");
  return breadcrumbsBar.scrollWidth > breadcrumbsBar.offsetWidth;
}
function generateOverflowButton() {
  // If an overflow menu already exists let's use that
  const overflowMenu = document.querySelector(".jenkins-breadcrumbs__list-item .jenkins-button");
  if (overflowMenu) {
    return overflowMenu.parentNode;
  }

  // Generate an overflow menu to store breadcrumbs
  const logo = document.querySelector(".jenkins-breadcrumbs__list-item");
  const element = createElementFromHtml(`<li class="jenkins-breadcrumbs__list-item"><button class="jenkins-button jenkins-button--tertiary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <circle cx="256" cy="256" r="45" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
    <circle cx="441" cy="256" r="45" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
    <circle cx="71" cy="256" r="45" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
</svg>
</button></li>`);
  logo.after(element);
  return element;
}
function removeOverflowButton() {
  const breadcrumbsOverflow = document.querySelector(".jenkins-breadcrumbs__list-item .jenkins-button");
  if (breadcrumbsOverflow) {
    breadcrumbsOverflow.parentNode.remove();
  }
}
;// ./src/main/js/components/header/index.js


function init() {
  // Recompute what actions and breadcrumbs should be visible when the viewport size is changed
  computeOverflow();
  updateActionsForTouch();
  let lastWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    if (window.innerWidth !== lastWidth) {
      lastWidth = window.innerWidth;
      computeOverflow();
    }
  });
  window.addEventListener("computeHeaderOverflow", () => {
    computeOverflow();
  });

  // Fade in the page header on scroll, increasing opacity and intensity of the backdrop blur
  window.addEventListener("scroll", () => {
    const navigation = document.querySelector("#page-header");
    const scrollY = Math.max(0, window.scrollY);
    navigation.style.setProperty("--background-opacity", Math.min(70, scrollY) + "%");
    navigation.style.setProperty("--background-blur", Math.min(40, scrollY) + "px");
    if (!document.querySelector(".jenkins-search--app-bar") && !document.querySelector(".app-page-body__sidebar--sticky")) {
      const prefersContrast = window.matchMedia("(prefers-contrast: more)").matches;
      navigation.style.setProperty("--border-opacity", Math.min(prefersContrast ? 100 : 15, prefersContrast ? scrollY * 3 : scrollY) + "%");
    }
  });
  window.addEventListener("load", () => {
    // We can't use :has due to HtmlUnit CSS Parser not supporting it, so
    // these are workarounds for that same behaviour
    if (document.querySelector(".jenkins-app-bar--sticky")) {
      document.querySelector(".jenkins-header").classList.add("jenkins-header--has-sticky-app-bar");
    }
    if (!document.querySelector(".jenkins-breadcrumbs__list-item")) {
      document.querySelector(".jenkins-header").classList.add("jenkins-header--no-breadcrumbs");
    }
  });
}
function computeOverflow() {
  computeBreadcrumbs();
}
init();

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
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
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/runtimeId */
/******/ 	!function() {
/******/ 		__webpack_require__.j = 608;
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			608: 0
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
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkjenkins_ui"] = self["webpackChunkjenkins_ui"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	!function() {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [96], function() { return __webpack_require__(6710); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=header.js.map