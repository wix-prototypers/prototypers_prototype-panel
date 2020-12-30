/* NOTE: This file includes the functions and the icons for creating the structure - No need to change / add. */

$(document).ready(function () {

  init();
  initControls();

  // if the panel on left side - change the position of the tab
  $('[panel-dir="right"]').each(function () {
    $(".prt-panel-tab").insertBefore(".prt-panel-structure");
  })

  // open the panel (after click on the tab)
  $(".prt-panel-tab").click(function() {
    if(!$(this).hasClass("prt-panel-open")) {
      $(this).addClass("prt-panel-open");
      $(".prt-panel-structure").css("transform", "var(--translateX-open)");
      $(".prt-panel-tab").addClass("prt-panel-open");
    } else {
      $(this).removeClass("prt-panel-open");
      $(".prt-panel-structure").css("transform", "var(--translateX-open)");
      $(".prt-panel-tab").removeClass("prt-panel-open");
    }
  })

  // open or close section
  $(".prt-panel-section-header").not(".prt-disable-closing").click(function () {
    closeSection($(this))
  });

  $(".prt-panel-structure").click(function(e) {
    e.stopPropagation();
  })

  // close the panel (form the >> icon)
  $(".prt-panel-close").click(function(e) {
    $(".prt-panel-tab").removeClass("prt-panel-open");
    $(".prt-panel-structure").css("transform", "var(--translateX)");
    $(".prt-panel-tab").removeClass("prt-panel-open");
  })

  // input number - update the slider value or the field vaue after changing
  $(".prt-input-number-area [type='number']").change(function () {
    let sliderField = $(`.prt-slider[name='${$(this).attr("name")}']`);
    sliderField.slider( "value", $(this).val());
  })

  $('.prt-slider').slider();

  $('.prt-slider').each(function() {
    $(this).slider({
      range: 'min',
      min: $(this).data("min"),
      max: $(this).data("max"),
      value: $(this).data("value"),
      step: $(this).data("step"),
      slide: function( event, ui ) {
        let numberField = $(`[type='number'][name='${$(this).attr("name")}']`);
        numberField.val(ui.value).change();
      }
    });
  });

  $(".prt-thumbnails-tooltip-item").each(function () {
    var i = $(this).attr("count");
    if((i+2) % 3 == 0) { // left items
      $(this).css("left", "-5px");
    }
    if((i+1) % 3 == 0) { // center items
      var w = $(this).width() / 2;
      var left = w - 16;
      $(this).css("left", -left);
    }
    if(i % 3 == 0) { // right items
      $(this).css("right", "-5px");
    }
  });
})


/* Create the general structure - includes (1) the header and actions (2) prototype info section . */
function init() {
  var panelStructure = `<div class="prt-panel-structure"></div>`;
  $(".prototype-panel").append(panelStructure);
  var header = `<header class="prt-panel-header"><span class="prt-panel-title">${prototypeTitle}</span></header>
  <div class="prt-panel-content"></div>`;
  // info section
  var info = `<div class="prt-panel-section">
  <div class="prt-panel-section-header"><span>Prototype Info</span></div>
  <div class="prt-panel-section-content info-section-content"><span>${prototypeDescription}</span></div>
  </div>`;
  var footer = `<div class="prt-panel-footer">${chevRight}</div>`
  $(".prt-panel-structure").append(header);
  $(".prt-panel-content").append(info);
  $(".prt-panel-structure").append(footer);

  var tab = `<div class="prt-panel-tab">${settingsIcon}</div>`;
  $(".prototype-panel").append(tab);
  $.each(sections, function (i, section) { // the sections array from "customSettings.js"
    createSection(section);
  });
  $(".prt-panel-section.isClose .prt-panel-section-header").each(function() {
    closeSection($(this));
  })
  $(".prt-panel-field.disabled").each(function() {
    disableField($(this),true);
  })
  if(sections.length < 1) { // section is empty
    $(".prt-panel-content").addClass("prt-only-info-content");
    $(".prt-panel-section-header").addClass("prt-disable-closing");
  }
}

/* Create each prototype settings section (after the prototype info)*/
function createSection(section) {
  var newSection = "";
  var sectionNum = section.sectionNumber;
  section.sectionIsOpen == true ? sectionIsOpen = "isOpen" : sectionIsOpen = "isClose";
  newSection = `<div class="prt-panel-section ${sectionIsOpen}" section-number="${sectionNum}">
  <div class="prt-panel-section-header"><span>${section.sectionTitle}</span></div>
  <div class="prt-panel-section-content" number="${sectionNum}"></div>
  </div>`;
  $('.prt-panel-content').append(newSection);
  $.each(section.fields, function(i, field) {
    var inputField = "";
    inputField = createSettings(field);
    $(`[number="${sectionNum}"]`).append(inputField);
  });
}

/*  Create each setting - with call to "inputFieldContent" function in "customSettings.js" to get the relevant content. */
function createSettings(field) {
  var newSetting = "";
  field.disabled == true ? disabled = "disabled" : disabled = "";
  var content = inputFieldContent(field);
  newSetting = `<div class="prt-panel-field ${disabled}" name="${field.fieldName}" call="${field.function}"><label class="prt-panel-field-label">${field.fieldLabel}</label>${content}</div>`;
  field.divider ? newSetting = newSetting + '<div class="prt-panel-divider"></div>' : "";
  return newSetting;
}

/* Add the relevant html content for each input type.
There is a call to this function from "createSettings" function in "controllerStructure.js" */
function inputFieldContent(field) {
  var content = "";
  switch (field.fieldType) {
    case "number":
    field.showSlider ? displaySlider = "block" : displaySlider = "none";
    content = `<div class="prt-input-number-area" style="display:flex">
    <div class="prt-slider" name="${field.fieldName}" data-value=${field.value} data-min=${field.min} data-max=${field.max} data-step=${field.step} style="display:${displaySlider}"></div>
    <div class="prt-container-input-number"><input name="${field.fieldName}" type="number" min="${field.min}" max="${field.max}" step="${field.step}" suffix="${field.suffix}" value="${field.value}">
    <span>${field.suffix}</span></div>
    </div>`;
    break;
    case "toggle":
    field.option1Display.length > 14 ? opacity1 = 1 : opacity1 = 0;
    field.option2Display.length > 14 ? opacity2 = 1 : opacity2 = 0;
    content = `<div class="prt-toggle">
    <input class="prt-toggle-option" id="${field.fieldName}-0" value="${field.option1Value}" option="1" type="radio" name="${field.fieldName}" checked>
    <label class="prt-toggle-labels" for="${field.fieldName}-0">${field.option1Display}</label>
    <span class="prt-toggle-tooltip-option" style="opacity: ${opacity1}">${field.option1Display}</span>
    <input class="prt-toggle-option" id="${field.fieldName}-1" value="${field.option2Value}" option="2" type="radio" name="${field.fieldName}">
    <label class="prt-toggle-labels" for="${field.fieldName}-1">${field.option2Display}</label>
    <span class="prt-toggle-tooltip-option right" style="opacity: ${opacity2}">${field.option2Display}</span>
    <div class="prt-toggle-bckgrnd"></div>
    </div>`;
    break;
    case "radio-button":
    for(var i = 0 ; i < field.optionsBackendList.length; i++) {
      i == field.defaultIndex ? checked = "checked" : checked = "";
      content += `<div><input class="prt-circle-checkbox" type="radio" id="${field.fieldName}-${i}" value="${field.optionsBackendList[i]}" name="${field.fieldName}" ${checked}>
      <label for="${field.fieldName}-${i}">${field.optionsDisplayList[i]}</label>
      </div>`;
    }
    break;
    case "thumbnails":
    content = `<div class="prt-thumbnails">`
    for(var i = 0 ; i < field.optionsBackendList.length; i++) {
      i == field.defaultIndex ? selected = "selected" : selected = "";
      i == field.defaultIndex ? checked = "checked" : checked = "";
      field.labelsDisplayList[i].length > 9 ? opacity2 = 1 : opacity2 = 0;
      content += `<div class="prt-thumbnails-item">
      <input class="prt-thumbnails-input" type="radio" value="${field.optionsBackendList[i]}" name="${field.fieldName}" id="${field.fieldName}-${i}" ${checked}>
      <button class="prt-thumbnails-button ${selected}" value="${field.optionsBackendList[i]}"><img src="${field.iconsDisplayList[i]}"></button>
      <label for="${field.fieldName}-${i}">${field.labelsDisplayList[i]}</label>
      <span class="prt-thumbnails-tooltip-item" count="${i+1}" style="opacity: ${opacity2}">${field.labelsDisplayList[i]}</span>
      </div>`;
    }
    content += `</div>`;
    break;
  }
  return content;
};

// Function "initControls()" - DON'T CHANGE! - After a specific input changes it will call
// the function you wrote for that input with the parametes: field name, the selected value
function initControls() {
  $(".prt-panel-field input").on("change", e => {
    e.stopPropagation();
    const name = $(e.target).attr("name"); // the name given to the input for identify
    $(e.target).attr("type") == "number" ? selectedValue = $(`input[name='${name}']`).val() : selectedValue = $(`input[name='${name}']:checked`).attr("value");
    const theFunction = $(`.prt-panel-field[name='${name}']`).attr("call");
    // Call the relevant function
    window[theFunction](`${name}`,`${selectedValue}`)
  })
}

function scrollTopSection(section) {
  section.scrollintoview({ duration: 400, direction: 'y', padding: {T:0} });
}

/* Add or Rmove disabled from a field - include the label and all the inputs
PARAMETERS: field = the relevant field | flag = can be TRUE or FALSE */
function disableField(field, flag) {
  if(flag) {
    field.addClass("disabled");
    field.children(".prt-panel-field-label").addClass("disabled");
    field.find("input").prop("disabled", true);
  } if(!flag) {
    field.removeClass(false);
    field.children(".prt-panel-field-label").removeClass("disabled");
    field.find("input").prop("disabled", false);
  }
}

/* Close sections that defined as closed in the structure OR close or open section when clicked */
function closeSection(section) {
  if (section.hasClass("close")) {
    section.parent().css("max-height","2000px");
    section.removeClass("close");
    section.next().removeClass("close");
    section.next().children().removeClass("close");
    scrollTopSection(section.parent());
  }
  else {
    section.addClass("close");
    section.next().addClass("close");
    section.parent().css("max-height","30px");
  }
}

/* ----- Icons ----- */
const chevRight = `<svg class="prt-panel-close" viewBox="0 0 18 18" fill="#ededed" width="18" height="18"><path class="st0" d="M9.1,5c-0.3-0.3-0.3-0.7,0-0.9s0.7-0.3,0.9,0L15,9l-4.9,4.9c-0.3,0.3-0.7,0.3-0.9,0c-0.3-0.3-0.3-0.7,0-0.9l4-4
L9.1,5z"/>
<path class="st0" d="M3.2,5C3,4.8,3,4.4,3.2,4.1s0.7-0.3,0.9,0L9.1,9l-4.9,4.9c-0.3,0.3-0.7,0.3-0.9,0C3,13.6,3,13.2,3.2,13l4-4
L3.2,5z"/></svg>`;

const pinIcon = '<svg class="prt-panel-pin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="#fff" width="15" height="15"><path d="M6.99908827,12.7061951 L4.83320852,14.860933 C4.64173194,15.0514246 4.33208557,15.0506261 4.14159399,14.8591495 C3.94940014,14.6645544 3.95006265,14.3534283 4.14182446,14.1609128 L6.29358665,12.0006934 L3.79289322,9.5 L4.51115041,8.7817428 C5.33863234,7.95426088 6.52491966,7.59508198 7.67243062,7.82458417 L8.33566264,7.95723058 C8.33566264,7.95723058 8.70731269,7.58558053 9.45061277,6.84228044 C9.18826283,5.83141464 9.47528859,4.97228695 10.0844643,4.36311127 L10.6617219,3.78585366 L15.2002047,8.50690213 L14.7275854,8.97952134 C14.0580047,9.64910207 13.0841923,9.89746628 12.1350454,9.5720614 C11.4068614,10.3002454 11.0427694,10.6643374 11.0427694,10.6643374 L11.1754158,11.3275694 C11.404918,12.4750803 11.0457391,13.6613677 10.2182572,14.4888496 L9.5,15.2071068 L6.99908827,12.7061951 Z M10.5493872,7.15771956 C9.29268731,8.41441947 8.66433736,9.04276942 8.66433736,9.04276942 L7.47631449,8.80516485 C6.6566638,8.64123471 5.79841693,8.90824945 5.20710678,9.5 C5.82473697,10.1135538 8.77113404,13.0590078 9.5,13.7928932 C10.0792635,13.2170377 10.3587653,12.3433362 10.1948352,11.5236855 L9.95723058,10.3356626 C9.95723058,10.3356626 10.5931386,9.69975463 11.8649546,8.4279386 C12.9389346,8.85225356 13.3989543,8.71536598 13.7771705,8.46956292 L10.6572703,5.22416114 C10.3904963,5.57566372 10.2182572,6.09981327 10.5493872,7.15771956 Z"></path></svg>';

const rightIcon = '<svg class="prt-panel-dir" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="#fff" width="15" height="15"><path d="M14.2071068,9.5 L10.8503744,12.8518847 C10.6568213,13.0450456 10.3433767,13.0448866 10.1500196,12.8515296 C9.95663241,12.6581424 9.95638989,12.3446746 10.1494776,12.1509884 L12.2928932,10 L4,10 L4,9 L12.2928932,9 L10.1494776,6.84920158 C9.95638989,6.65551538 9.95663241,6.34204764 10.1500196,6.14866043 C10.3433767,5.95530338 10.6568213,5.95514443 10.8503744,6.14830528 L14.2071068,9.5 Z"></path></svg>';

const settingsIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="24" height="24" style="height: 20px; width: 20px;"><path d="M14.092,8 C14.036,7.843 14,7.676 14,7.5 C14,7.324 14.036,7.157 14.092,7 C14.299,6.419 14.849,6 15.5,6 C16.151,6 16.701,6.419 16.908,7 C16.964,7.157 17,7.324 17,7.5 C17,7.676 16.964,7.843 16.908,8 C16.701,8.581 16.151,9 15.5,9 C14.849,9 14.299,8.581 14.092,8 Z M17.949,7 C17.717,5.86 16.707,5 15.5,5 C14.293,5 13.283,5.86 13.051,7 L3,7 L3,8 L13.051,8 C13.283,9.14 14.293,10 15.5,10 C16.707,10 17.717,9.14 17.949,8 L21,8 L21,7 L17.949,7 Z M15.092,18.0009 C15.036,17.8439 15,17.6769 15,17.5009 C15,17.3249 15.036,17.1579 15.092,17.0009 C15.299,16.4199 15.849,16.0009 16.5,16.0009 C17.151,16.0009 17.701,16.4199 17.908,17.0009 C17.964,17.1579 18,17.3249 18,17.5009 C18,17.6769 17.964,17.8439 17.908,18.0009 C17.701,18.5819 17.151,19.0009 16.5,19.0009 C15.849,19.0009 15.299,18.5819 15.092,18.0009 Z M18.949,17.0009 C18.717,15.8609 17.707,15.0009 16.5,15.0009 C15.293,15.0009 14.283,15.8609 14.051,17.0009 L3,17.0009 L3,18.0009 L14.051,18.0009 C14.283,19.1409 15.293,20.0009 16.5,20.0009 C17.707,20.0009 18.717,19.1409 18.949,18.0009 L21,18.0009 L21,17.0009 L18.949,17.0009 Z M6.092,13 C6.036,12.843 6,12.676 6,12.5 C6,12.324 6.036,12.157 6.092,12 C6.299,11.419 6.849,11 7.5,11 C8.151,11 8.701,11.419 8.908,12 C8.964,12.157 9,12.324 9,12.5 C9,12.676 8.964,12.843 8.908,13 C8.701,13.581 8.151,14 7.5,14 C6.849,14 6.299,13.581 6.092,13 Z M9.949,12 C9.717,10.86 8.707,10 7.5,10 C6.293,10 5.283,10.86 5.051,12 L3,12 L3,13 L5.051,13 C5.283,14.14 6.293,15 7.5,15 C8.707,15 9.717,14.14 9.949,13 L21,13 L21,12 L9.949,12 Z"></path></svg>'
