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
let prototypeTitle = "Prototype Title";
let prototypeDescription = "This is where you can describe the prototype shortly, this description is where you can elaborate and describe in details what's the prototype about.";

// (2) 'Sections' Array - Array for all the sections and their input fields that you want to add.
const sections = [
  {
    "sectionNumber": 0,
    "sectionIsOpen": true,
    "sectionTitle": "First Section Name",
    "fields": [
      {
        "fieldName" : "example-input-number",
        "fieldLabel": "Input Number Label",
        "divider": true,
        "toolTip": "",
        "function": "exampleFunction",
        "disabled": "",
        "fieldType": "number",
        "min" : "0.05",
        "max" : "0.25",
        "step" : "0.01",
        "value" : "0.06",
        "showSlider": true,
        "suffix": "sfx"
      },
      {
        "fieldName" : "example-input-toggle",
        "fieldLabel": "Input Toggle Label",
        "divider": false,
        "toolTip": "",
        "function": "exampleFunction",
        "disabled": false,
        "fieldType": "toggle",
        "isChecked": "",
        "option1Display": "Option 1",
        "option1Value" : "option1",
        "option2Display": "Option 2",
        "option2Value" : "option2",
      },
      {
        "fieldName" : "example-input-toggle-long",
        "fieldLabel": "Input Toggle with Long Text",
        "divider": false,
        "toolTip": "",
        "function": "exampleFunction",
        "disabled": false,
        "fieldType": "toggle",
        "isChecked": "",
        "option1Display": "Option 1 with Long Text and Line Break",
        "option1Value" : "option1",
        "option2Display": "Option 2 with Text",
        "option2Value" : "option2",
      },
      {
        "fieldName" : "example-input-toggle-disabled",
        "fieldLabel": "Input Toggle Disabled",
        "divider": false,
        "toolTip": "",
        "function": "exampleFunction",
        "disabled": true,
        "fieldType": "toggle",
        "isChecked": "",
        "option1Display": "Option 1",
        "option1Value" : "option1-disabled",
        "option2Display": "Option 2",
        "option2Value" : "option2-disabled",
      }
    ]
  } ,
  {
    "sectionNumber": 1,
    "sectionIsOpen": true,
    "sectionTitle": "Second Section Name",
    "fields": [
      {
        "fieldName" : "example-input-radiobtn",
        "fieldLabel": "Radio Button Label",
        "divider": true,
        "toolTip": "",
        "function": "exampleFunction",
        "disabled": false,
        "fieldType": "radio-button",
        "defaultIndex": 0,
        "optionsBackendList": ["option1", "option2", "option3", "option4"],
        "optionsDisplayList": ["Option 1", "Option 2", "Option 3", "Option 4"]
      },
      {
        "fieldName" : "example-input-radiobtn-disabled",
        "fieldLabel": "Radio Button Disabled",
        "divider": false,
        "toolTip": "",
        "function": "exampleFunction",
        "disabled": true,
        "fieldType": "radio-button",
        "defaultIndex": 0,
        "optionsBackendList": ["option1", "option2", "option3", "option4"],
        "optionsDisplayList": ["Option 1", "Option 2", "Option 3", "Option 4"]
      }
    ]
  },
  {
    "sectionNumber": 2,
    "sectionIsOpen": true,
    "sectionTitle": "Third Section Name",
    "fields": [
      {
        "fieldName" : "example-input-thumbnails",
        "fieldLabel": "Thumbnails Label",
        "divider": "",
        "toolTip": "",
        "function": "exampleFunction2",
        "disabled": false,
        "fieldType": "thumbnails",
        "defaultIndex": 1,
        "optionsBackendList": ["option1", "option2", "option3", "option4", "option5", "option6"],
        "iconsDisplayList": ["./images/example-img.svg", "./images/example-img.svg", "./images/example-img.svg", "./images/example-img.svg", "./images/example-img.svg", "./images/example-img.svg"],
        "labelsDisplayList": ["Option 1", "Option 2", "Option 3", "Option 4 Text", "Option 5 with Long Long Text", "Option 6 with Long Text"]
      },
      {
        "fieldName" : "example-input-thumbnails-disabled",
        "fieldLabel": "Thumbnails Label",
        "divider": "",
        "toolTip": "",
        "function": "exampleFunction",
        "disabled": true,
        "fieldType": "thumbnails",
        "defaultIndex": 1,
        "optionsBackendList": ["option1", "option2", "option3", "option4", "Option 5"],
        "iconsDisplayList": ["./images/example-img.svg", "./images/example-img.svg", "./images/example-img.svg", "./images/example-img.svg", "./images/example-img.svg"],
        "labelsDisplayList": ["Option 1", "Option 2 with Long Text", "Option 3", "Option 4", "Option 5 with Long Text"]
      }
    ]
  }
];



function exampleFunction(name, value) {
  disableField($(`.prt-panel-field[name="example-input-radiobtn-disabled"]`), false);
}

function exampleFunction2(name, value) {
  disableField($(`.prt-panel-field[name="example-input-radiobtn-disabled"]`), true);
}
