(function(){function h(){var a=document.querySelector("[aria-hidden='false']");a&&a.setAttribute("aria-hidden",!0)}function k(a){a.setAttribute("aria-hidden",!0);a.setAttribute("role","tooltip")}function l(a){var b=a.getAttribute("href").split("#");b=b[1];a.setAttribute("aria-describedby",b);a.addEventListener("click",function(a){var d=b;a.preventDefault();var c=document.getElementById(d);null===c?console.error("Tooltip Error: no tooltip for "+d+"."):(d="true"===c.getAttribute("aria-hidden"))?(h(),
c.setAttribute("aria-hidden",!1),a=a.target,d=a.offsetLeft-.5*c.offsetWidth+8,c.style.top=a.offsetTop-c.offsetHeight-10+"px",c.style.left=d+"px"):d||c.setAttribute("aria-hidden",!0)})}var e=document.querySelectorAll("[data-tooltip='trigger']");e=Array.prototype.slice.call(e);var f=document.querySelectorAll("[data-tooltip='content']");f=Array.prototype.slice.call(f);var g=e.length,b=f.length;if(0===g&&0===b)console.error("Tooltip Error: no tooltips in file.");else if(g!==b)console.error("Tooltip Error: number of triggers does not match number of tooltips.");
else{for(b=0;b<g;b++)k(f[b]),l(e[b]);(function(){document.addEventListener("keydown",function(a){27===a.keyCode&&h()})})()}})();