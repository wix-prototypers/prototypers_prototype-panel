var jquery = document.createElement("script");
jquery.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js';
jquery.type = 'text/javascript';
document.getElementsByTagName("head")[0].appendChild(jquery);

var jqueryUI = document.createElement("script");
jqueryUI.src = 'https://code.jquery.com/ui/1.12.1/jquery-ui.js';
jqueryUI.type = 'text/javascript';
document.getElementsByTagName("head")[0].appendChild(jqueryUI);

var scrollToView = document.createElement("script");
scrollToView.src = 'https://wix-prototypers.github.io/prototype-panel/prototype-panel-0.1/scrollToView.js';
document.getElementsByTagName("head")[0].appendChild(scrollToView);

var controllerStructureFile = document.createElement("script");
controllerStructureFile.src = 'https://wix-prototypers.github.io/prototype-panel/prototype-panel-0.1/prototypePanelStructure.js';
document.getElementsByTagName("head")[0].appendChild(controllerStructureFile);

var prototypePanelCss = document.createElement("link");
prototypePanelCss.href = 'https://wix-prototypers.github.io/prototype-panel/prototype-panel-0.1/prototypePanel.css';
prototypePanelCss.rel = 'stylesheet';
document.getElementsByTagName("head")[0].appendChild(prototypePanelCss);

// --- CUSTOM FILE --- //
// var customFile = document.createElement("script");
// customFile.src = 'https://wix-prototypers.github.io/prototype-panel/prototype-panel-0.1/customPrototypePanel.js';
// document.getElementsByTagName("head")[0].appendChild(customFile);
