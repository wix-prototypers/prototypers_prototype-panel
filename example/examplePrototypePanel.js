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
        "fieldName" : "change-main-title",
        "fieldLabel": "Change the title:",
        "divider": false,
        "toolTip": "",
        "callback": "changeTheMainTitle",
        "disabled": false,
        "fieldType": "text",
        "currentValue": "Let`s Play!"
      },
      {
        "fieldName" : "do-something-button",
        "fieldLabel": "Test title animation:",
        "divider": true,
        "toolTip": "",
        "callback": "clickStartButton",
        "disabled": false,
        "fieldType": "button",
        "currentValue": "Start"
      },
      {
        "fieldName" : "select-bg-color",
        "fieldLabel": "Test title animation:",
        "divider": true,
        "toolTip": "",
        "callback": "changeItemBackground",
        "disabled": false,
        "fieldType": "color",
        "defaultIndex": 0,
        "colorOptions": [{"color":"#B6C1CD"},
                         {"color":"#5e89b7", "opacity":"70"},
                         {"color":"#90729c"},
                         {"color":"#B6C1CD", "opacity":"40"}]
      },
      {
        "fieldName" : "select-hover-radiobtn",
        "fieldLabel": "Select hover effect:",
        "divider": false,
        "toolTip": "",
        "callback": "changeHoverEffect",
        "disabled": false,
        "fieldType": "radio-button",
        "defaultIndex": 0,
        "optionsBackendList": ["border", "overlay", "move-up", "expand"],
        "optionsDisplayList": ["Border", "Overlay", "Move Up", "Expand"]
      },
      {
        "fieldName" : "overlay-color-toggle",
        "fieldLabel": "Overlay color:",
        "divider": false,
        "toolTip": "",
        "callback": "changeOverlayColor",
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
        "fieldLabel": "Select layout elements:",
        "divider": "",
        "toolTip": "",
        "callback": "changeLayout",
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
        "callback": "changeGagBetweenElmentes",
        "disabled": "",
        "fieldType": "number",
        "min" : "10",
        "max" : "50",
        "step" : "5",
        "value" : "35",
        "showSlider": true,
        "suffix": "px"
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
function changeHoverEffect(name, value, e) {
  $(".stage-element").attr("hover",value);
  if(value == "overlay") {
    disablePrtPanelField(`overlay-color-toggle`, false);
  } else {
    disablePrtPanelField(`overlay-color-toggle`, true);
  }
}

function changeOverlayColor(name, value, e) {
  $(".stage-element").attr("color",value);
}

function changeLayout(name, value, e) {
  $(".stage").attr("layout",value);
}

function changeGagBetweenElmentes(name, value, e) {
  var sfx = $(`input[type="number"][name='${name}']`).attr("suffix");
  $(".stage").css("grid-gap", `${value}${sfx}`)
}

function changeTheMainTitle(name, value, e) {
  $(".stage-title").text(value);
}

function clickStartButton() {
  $(".stage-title").addClass("animation");
  setTimeout(function () {
    $(".stage-title").removeClass("animation");
  }, 2000);
}

function changeItemBackground(name, value, e) {
  if(value.includes("#")) {
    $(".stage-element").css('background', value)
  } else {
    $(".stage-element").css('opacity', value + '%')

  }
}
