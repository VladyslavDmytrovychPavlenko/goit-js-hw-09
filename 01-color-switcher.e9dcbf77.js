const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.body;let o=null;function a(){n.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}t.addEventListener("click",(function(){t.disabled=!0,o=setInterval(a,1e3)})),e.addEventListener("click",(function(){clearInterval(o),t.disabled=!1,n.style.backgroundColor=""}));
//# sourceMappingURL=01-color-switcher.e9dcbf77.js.map