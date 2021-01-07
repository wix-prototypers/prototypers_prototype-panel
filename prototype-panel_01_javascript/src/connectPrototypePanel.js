var jquery = document.createElement("script");
jquery.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js';
jquery.type = 'text/javascript';
document.getElementsByTagName("head")[0].appendChild(jquery);

var jqueryUI = document.createElement("script");
jqueryUI.src = 'https://code.jquery.com/ui/1.12.1/jquery-ui.js';
jqueryUI.type = 'text/javascript';
document.getElementsByTagName("head")[0].appendChild(jqueryUI);

var prototypePanelCss = document.createElement("link");
prototypePanelCss.href = 'https://wix-prototypers.github.io/prototypers_prototype-panel/prototype-panel_01/src/prototypePanel.css';
prototypePanelCss.rel = 'stylesheet';
document.getElementsByTagName("head")[0].appendChild(prototypePanelCss);

var scrollToView = document.createElement("script");
scrollToView.src = 'https://wix-prototypers.github.io/prototypers_prototype-panel/prototype-panel_01/src/scrollToView.js';
document.getElementsByTagName("head")[0].appendChild(scrollToView);

var prototypePanelStructureJS = document.createElement("script");
prototypePanelStructureJS.src = 'https://wix-prototypers.github.io/prototypers_prototype-panel/prototype-panel_01/src/prototypePanelStructure.js';
document.getElementsByTagName("head")[0].appendChild(prototypePanelStructureJS);
