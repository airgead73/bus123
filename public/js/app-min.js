!function(){"use strict";var t,a={CONTAINER_SELECTOR:'[data-tooltip="container"]',TRIGGER_SELECTOR:'[data-tooltip="trigger"]',GET_CONTAINERS:function(){return Array.prototype.slice.call(document.querySelectorAll(this.CONTAINER_SELECTOR))},GET_POS_FIXED:function(){return"position: fixed; top: 8%; right: 0; left: 0; margin-right: auto; margin-left: auto;"},GET_POS_AP:function(t){return"postion: absolute; top: -"+(t.offsetHeight+10)+"px; left: -140px;"}},d={setAttributes:function(e,i){Object.keys(i).forEach(function(t){e.setAttribute(t,i[t])})},getOS:function(){var t=navigator.userAgent;return/android/i.test(t)?"android":/iPad|iPhone|iPod/i.test(t)?"ios":"desktop"}};function r(t,e){var i,n,r=document.getElementById(e),o="true"===r.getAttribute("aria-hidden");"blur"!==t.type?o?(u(),r.setAttribute("aria-hidden",!1),i=r,n="desktop"===d.getOS()?a.GET_POS_AP(i):a.GET_POS_FIXED(),i.setAttribute("style",n)):o||r.setAttribute("aria-hidden",!0):r.setAttribute("aria-hidden",!0)}function u(){var t=document.querySelector("[aria-hidden='false']");return t&&void t.setAttribute("aria-hidden",!0)}(t=a.GET_CONTAINERS()).length?(t.forEach(function(t,e){var i,n;n=e+1,function(t,e){d.setAttributes(t,{tabindex:"0","aria-describedby":e}),t.addEventListener("click",function(t){r(t,e)}),t.addEventListener("blur",function(t){r(t,e)}),t.addEventListener("keydown",function(t){13===t.keyCode&&r(t,e)})}((i=t).querySelector(a.TRIGGER_SELECTOR),"tooltip_"+n),function(t,e){var i=t.getAttribute("title").trim();t.removeAttribute("title");var n=function(t,e){var i=document.createElement("span"),n=document.createTextNode(e);return d.setAttributes(i,{id:"tooltip_"+t,role:"tooltip","aria-hidden":!0}),i.appendChild(n),i}(e,i);t.appendChild(n)}(i,n)}),document.addEventListener("keydown",function(t){27===t.keyCode&&u()})):console.warn("Tooltips: no tooltips on this page.")}();