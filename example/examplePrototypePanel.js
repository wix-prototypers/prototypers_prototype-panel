/* ---- NOTE: customController. js - This file includes:
(1) Controller Info - prototypeTitle = prototype name.
                      prototypeDescription = prototype description in prototype info section.
(2) 'Sections' Array - the array contains all the sections (except the info section) and
                       all the fields (inputs) belonging to each section.
(3) Function "initControls()" - DON'T CHANGE! - This function calls the relevant function (depending on the input) after each change of input in the controller.
(4) Functions - write the relevant function for each input.
                Each input should have a function that will call after the input changes.
IMPORTANT! Fill this file according to your needs. ---- */

// (1) Controller Info - constant variables for the title and the description.
// const panelInfo = {
//   prototypeTitle : "Example Controller",
//   prototypeDescription : "A simple example of using the controller code for the prototypers. This example contains the use of functions after changing input and disabling or enabling fields.",
//   panelDirection : "right"
// }
// (2) 'Sections' Array - Array for all the sections and their input fields that you want to add.
const panelSections = [
  {
    "sectionNumber": 0,
    "sectionIsOpen": true,
    "sectionTitle": "hover effect",
    "fields": [
      {
        "fieldName" : "select-hover-radiobtn",
        "fieldLabel": "Select Hover Effect:",
        "divider": false,
        "toolTip": "",
        "function": "changeHoverEffect",
        "disabled": false,
        "fieldType": "radio-button",
        "defaultIndex": 0,
        "optionsBackendList": ["border", "overlay", "move-up", "expand"],
        "optionsDisplayList": ["Border", "Overlay", "Move Up", "Expand"]
      },
      {
        "fieldName" : "overlay-color-toggle",
        "fieldLabel": "Overlay Color:",
        "divider": false,
        "toolTip": "",
        "function": "changeOverlayColor",
        "disabled": true,
        "fieldType": "toggle",
        "option1Display": "Light",
        "option1Value" : "light",
        "option2Display": "Dark",
        "option2Value" : "dark",
        "defaultOption": 1
      }
    ]
  } ,
  {
    "sectionNumber": 1,
    "sectionTitle": "layout elements",
    "fields": [
      {
        "fieldName" : "layout-thumbnails",
        "fieldLabel": "Select Layout Elements:",
        "divider": "",
        "toolTip": "",
        "function": "changeLayout",
        "disabled": false,
        "fieldType": "thumbnails",
        "defaultIndex": 1,
        "optionsBackendList": ["list", "columns", "gallery"],
        "iconsDisplayList": ["./images/list.svg", "./images/columns.svg", "./images/gallery.svg"],
        "labelsDisplayList": ["List", "Columns", "Gallery"]
      },
      {
        "fieldName" : "example-input-number",
        "fieldLabel": "Change the gap between the elements:",
        "divider": false,
        "toolTip": "",
        "function": "changeGagBetweenElmentes",
        "disabled": "",
        "fieldType": "number",
        "min" : "10",
        "max" : "50",
        "step" : "5",
        "value" : "35",
        "showSlider": true,
        "suffix": "px"
      },
      {
        "fieldName" : "example-number",
        "fieldLabel": "Change the gap between the elements:",
        "divider": false,
        "toolTip": "",
        "function": "changeGagBetweenElmentes",
        "disabled": true,
        "fieldType": "number",
        "min" : "0",
        "max" : "100",
        "step" : "1",
        "value" : "35",
        "showSlider": true,
        "suffix": "%"
      }
    ]
  }
];

window.onload = function(e) {
  let panelInfo = {
    prototypeTitle : "Prototype Name",
    prototypeDescription : "This is where you can describe the prototype shortly, this description is where you can elaborate and describe in details what's the prototype about.",
    panelDirection : "left"
  };

  initPrototypePanel(panelInfo, panelSections);
};

/* ------------------ (4) Functions - write the relevant function for each input ------------------ */
function changeHoverEffect(name, value) {
  $(".stage-element").attr("hover",value);
  if(value == "overlay") {
    disablePrtPanelField(`overlay-color-toggle`, false);
  } else {
    disablePrtPanelField(`overlay-color-toggle`, true);
  }
}

function changeOverlayColor(name, value) {
  $(".stage-element").attr("color",value);
  if(value == "dark") {
      disablePrtPanelField(`example-number`, false);
  } else {
    disablePrtPanelField(`example-number`, true);
  }
}

function changeLayout(name, value) {
  $(".stage").attr("layout",value);
}

function changeGagBetweenElmentes(name, value) {
  var sfx = $(`input[type="number"][name='${name}']`).attr("suffix");
  $(".stage").css("grid-gap", `${value}${sfx}`)
}
