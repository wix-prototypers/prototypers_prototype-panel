var jquery = document.createElement("script");
jquery.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js';
jquery.type = 'text/javascript';
document.getElementsByTagName("head")[0].appendChild(jquery);

var jqueryUI = document.createElement("script");
jqueryUI.src = 'https://code.jquery.com/ui/1.12.1/jquery-ui.js';
jqueryUI.type = 'text/javascript';
document.getElementsByTagName("head")[0].appendChild(jqueryUI);

// var jqueryUiCss = document.createElement("link");
// jqueryUiCss.src = 'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css';
// jqueryUiCss.rel = 'stylesheet';
// document.getElementsByTagName("head")[0].appendChild(jqueryUiCss);

var scrollToView = document.createElement("script");
scrollToView.src = './scrollToView.js';
document.getElementsByTagName("head")[0].appendChild(scrollToView);

var controllerStructureFile = document.createElement("script");
controllerStructureFile.src = './controllerStructure.js';
document.getElementsByTagName("head")[0].appendChild(controllerStructureFile);

// --- ??? --- //
var customFile = document.createElement("script");
customFile.src = './customController.js';
document.getElementsByTagName("head")[0].appendChild(customFile);
