/*
copytitledesc.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ copytitledesc.showFirefoxContextMenu(e); }, false);
};

copytitledesc.showFirefoxContextMenu = function(event) {
  // Show or hide the menuitem based on what the context menu is on
  var bHideMenu = ( gContextMenu.isContentSelected ||
					gContextMenu.onLink ||
					gContextMenu.onImage ||
					gContextMenu.onTextInput );
  document.getElementById("context-copytitledesc").hidden = bHideMenu;
//  document.getElementById("separator-copytitledesc").hidden = bHideMenu;
};
*/
window.addEventListener("load", function () { copytitledesc.onFirefoxLoad(); }, false);
