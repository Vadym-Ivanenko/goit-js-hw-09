!function(){var t=document.body,n=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),o=null;function a(){return"#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}n.addEventListener("click",(function(d){t.style.backgroundColor=a(),o=setInterval((function(){t.style.backgroundColor=a()}),1e3),n.disabled=!0,e.disabled=!1})),e.addEventListener("click",(function(t){clearInterval(o),n.disabled=!1,e.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.4c761237.js.map
