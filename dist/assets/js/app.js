!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);n(1);var o=5,r=2,a=null,i=null,d=document.querySelector(".menu__button");document.querySelector(".todo-container");function s(t){var e;t.querySelector(".todo__add-task").addEventListener("click",(function(e){C(t)})),(e=t).querySelector(".todo__footer").addEventListener("click",(function(t){t.target.classList.contains("todo__delete-button")&&(e.remove(),x.save())})),function(t){t.addEventListener("dragstart",b),t.addEventListener("dragend",_),t.addEventListener("dragenter",y),t.addEventListener("dragover",E),t.addEventListener("dragleave",L),t.addEventListener("drop",S)}(t)}function c(t){t.querySelectorAll(".todo__note").forEach(l)}function l(t){var e="",n="";t.addEventListener("dblclick",(function(n){t.setAttribute("contenteditable","true"),t.focus(),e=t.textContent,console.log(e)})),t.addEventListener("blur",(function(o){t.removeAttribute("contenteditable"),n=t.textContent,console.log(n),0==t.textContent.trim().length&&t.closest(".todo__task").remove(),e!==n&&(console.log(9),x.save())})),t.parentElement.classList.contains("todo__task-text")&&0==t.textContent.trim().length&&(t.setAttribute("contenteditable","true"),t.focus(),t.addEventListener("blur",(function(e){t.removeAttribute("contenteditable"),console.log(23),0==t.textContent.trim().length&&t.closest(".todo__task").remove()})))}function u(t){t.addEventListener("dragstart",f),t.addEventListener("dragend",v),t.addEventListener("dragenter",p),t.addEventListener("dragover",m),t.addEventListener("dragleave",g),t.addEventListener("drop",h)}function f(t){a=this,this.classList.add("dragged"),t.stopPropagation()}function v(t){a=null,this.classList.remove("dragged"),t.stopPropagation(),x.save()}function p(t){this!==a&&t.stopPropagation()}function m(t){this!==a&&t.preventDefault()}function g(t){this!==a&&t.stopPropagation()}function h(t){if(t.stopPropagation(),this!==a)if(this.parentElement===a.parentElement){var e=Array.from(this.parentElement.querySelectorAll(".todo__task"));e.indexOf(this)<e.indexOf(a)?this.parentElement.insertBefore(a,this):this.parentElement.insertBefore(a,this.nextElementSibling)}else this.parentElement.insertBefore(a,this)}function b(t){i=this,this.classList.add("dragged"),t.stopPropagation()}function _(t){i=null,this.classList.remove("dragged"),t.stopPropagation(),x.save()}function y(t){this!==i&&t.stopPropagation()}function E(t){this!==i&&t.preventDefault()}function L(t){this!==i&&t.stopPropagation()}function S(t){if(t.stopPropagation(),this!==i){console.log("drop",this.parentElement);var e=Array.from(this.parentElement.querySelectorAll(".todo"));e.indexOf(this)<e.indexOf(i)?this.parentElement.insertBefore(i,this):this.parentElement.insertBefore(i,this.nextElementSibling)}}function k(t){t.querySelector(".todo__data").addEventListener("click",(function(e){e.target.classList.contains("todo__delete-button")&&(t.remove(),x.save())}))}d.addEventListener("click",(function(t){A(),x.save()}));var x={save:function(){var t={todo:{todoIdCounter:r,itemsTodo:[]},task:{taskIdCounter:o,itemsTask:[]}};document.querySelectorAll(".todo").forEach((function(e){var n={id:parseInt(e.getAttribute("data-todo-id")),taskId:[]};e.querySelectorAll(".todo__task").forEach((function(t){n.taskId.push(parseInt(t.getAttribute("data-task-id")))})),t.todo.itemsTodo.push(n)})),document.querySelectorAll(".todo__task").forEach((function(e){var n={id:parseInt(e.getAttribute("data-task-id")),text:e.querySelector(".todo__note").textContent,dateOfCreate:e.querySelector(".date").textContent};t.task.itemsTask.push(n)}));var e=JSON.stringify(t);localStorage.setItem("todoList",e)},load:function(){if(localStorage.getItem("todoList")){var t=JSON.parse(localStorage.getItem("todoList"));console.log(t),o=t.task.taskIdCounter,r=t.todo.todoIdCounter;var e=!0,n=!1,a=void 0;try{for(var i,d=t.todo.itemsTodo[Symbol.iterator]();!(e=(i=d.next()).done);e=!0){var s=i.value;A(s.id);var c=!0,l=!1,u=void 0;try{for(var f,v=function(){var e=f.value,n=document.querySelector('[data-todo-id="'.concat(s.id,'"]')),o=t.task.itemsTask.find((function(t){if(t.id===e)return t})),r=o.text,a=o.dateOfCreate;C(n,e,r,a)},p=s.taskId[Symbol.iterator]();!(c=(f=p.next()).done);c=!0)v()}catch(t){l=!0,u=t}finally{try{c||null==p.return||p.return()}finally{if(l)throw u}}}}catch(t){n=!0,a=t}finally{try{e||null==d.return||d.return()}finally{if(n)throw a}}}}};function A(t){t||0===t||(t=r,r++);var e=document.createElement("div");e.classList.add("todo"),e.setAttribute("draggable","true"),e.setAttribute("data-todo-id",t),e.innerHTML='<div class="todo__header">\n\t\t\t\t\t\t\t<p class="todo__note">To do</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="todo__body">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="todo__footer">\n\t\t\t\t\t\t\t<div class="todo__add-task">\n\t\t\t\t\t\t\t\t+ Add new task\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="todo__delete-button">\n\t\t\t\t\t\t\t\tX\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>',document.querySelector(".todo-container").insertAdjacentElement("beforeend",e),s(e),c(e),e.addEventListener("dragover",(function(t){t.preventDefault()})),e.addEventListener("drop",(function(t){a&&e.querySelector(".todo__body").append(a)}))}function C(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"".concat(q());e||0===e||(e=o,o++);var a=document.createElement("div");a.classList.add("todo__task"),a.setAttribute("draggable","true"),a.setAttribute("data-task-id",e),a.innerHTML='<div class="todo__data">\n\t\t\t\t<p class="date">'.concat(r,'</p>\n\t\t\t\t<div class="todo__delete-button">\n\t\t\t\t\tX\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="todo__task-text">\n\t\t\t\t<p class="todo__note">').concat(n,"</p>\n\t\t\t</div>"),t.querySelector(".todo__footer").insertAdjacentElement("beforebegin",a),c(a),k(a),u(a)}function q(){var t=new Date,e=t.getDate(),n=t.getMonth()+1,o=t.getFullYear();return"".concat(e,".").concat(n,".").concat(o)}x.load()},function(t,e,n){var o=n(2),r=n(3);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[t.i,r,""]]);var a={insert:"head",singleton:!1},i=(o(r,a),r.locals?r.locals:{});t.exports=i},function(t,e,n){"use strict";var o,r=function(){return void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o},a=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}(),i=[];function d(t){for(var e=-1,n=0;n<i.length;n++)if(i[n].identifier===t){e=n;break}return e}function s(t,e){for(var n={},o=[],r=0;r<t.length;r++){var a=t[r],s=e.base?a[0]+e.base:a[0],c=n[s]||0,l="".concat(s," ").concat(c);n[s]=c+1;var u=d(l),f={css:a[1],media:a[2],sourceMap:a[3]};-1!==u?(i[u].references++,i[u].updater(f)):i.push({identifier:l,updater:g(f,e),references:1}),o.push(l)}return o}function c(t){var e=document.createElement("style"),o=t.attributes||{};if(void 0===o.nonce){var r=n.nc;r&&(o.nonce=r)}if(Object.keys(o).forEach((function(t){e.setAttribute(t,o[t])})),"function"==typeof t.insert)t.insert(e);else{var i=a(t.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(e)}return e}var l,u=(l=[],function(t,e){return l[t]=e,l.filter(Boolean).join("\n")});function f(t,e,n,o){var r=n?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(t.styleSheet)t.styleSheet.cssText=u(e,r);else{var a=document.createTextNode(r),i=t.childNodes;i[e]&&t.removeChild(i[e]),i.length?t.insertBefore(a,i[e]):t.appendChild(a)}}function v(t,e,n){var o=n.css,r=n.media,a=n.sourceMap;if(r?t.setAttribute("media",r):t.removeAttribute("media"),a&&btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleSheet)t.styleSheet.cssText=o;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(o))}}var p=null,m=0;function g(t,e){var n,o,r;if(e.singleton){var a=m++;n=p||(p=c(e)),o=f.bind(null,n,a,!1),r=f.bind(null,n,a,!0)}else n=c(e),o=v.bind(null,n,e),r=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else r()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=r());var n=s(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var o=0;o<n.length;o++){var r=d(n[o]);i[r].references--}for(var a=s(t,e),c=0;c<n.length;c++){var l=d(n[c]);0===i[l].references&&(i[l].updater(),i.splice(l,1))}n=a}}}},function(t,e,n){}]);