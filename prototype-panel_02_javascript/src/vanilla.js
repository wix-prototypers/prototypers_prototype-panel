window.onload = function(event) {

  let panelInfo = {
    prototypeTitle : "Prototype Name",
    prototypeDescription : "This is where you can describe the prototype shortly, this description is where you can elaborate and describe in details what's the prototype about.",
    panelDirection : "left"
  };

  initPrototypePanel(panelInfo, panelSections);

  // open the panel (after user clicks on the tab)
  document.querySelector('.prt-panel-tab').addEventListener("click", function() {
    if(!this.classList.contains("prt-panel-open")) {
      this.classList.add("prt-panel-open");
      document.querySelector('.prt-panel-structure').classList.add("prt-panel-open");
      document.querySelector('.prt-panel-tab').classList.add("prt-panel-open");
    } else {
      this.classList.remove("prt-panel-open");
      document.querySelector('.prt-panel-structure').classList.remove("prt-panel-open");
      document.querySelector('.prt-panel-tab').classList.remove("prt-panel-open");
    }
  });

  // close the panel
  document.querySelectorAll('.prt-panel-close').forEach((closeBtn) => {
    closeBtn.addEventListener("click", function() {
      document.querySelector('.prt-panel-tab').classList.remove("prt-panel-open");
      document.querySelector('.prt-panel-structure').classList.remove("prt-panel-open");
    });
  });






};

function initPrototypePanel(panelInfo, panelSections) {
  if(panelInfo.prototypeTitle === "undefined" || panelInfo.prototypeTitle == null || panelInfo.prototypeTitle == "" ||
  panelInfo.prototypeDescription === "undefined" || panelInfo.prototypeDescription == null || panelInfo.prototypeDescription == "") {
    console.log("Invalid title or invalid description, Please fix it (:")
  } else {
    if(panelInfo.panelDirection != "right" && panelInfo.panelDirection != "left") {
      panelInfo.panelDirection = "right";
    }
    var prototypePanel = document.createElement('div');
    prototypePanel.className = "prototype-panel";
    prototypePanel.setAttribute("panel-dir", `${panelInfo.panelDirection}`);
    document.body.appendChild(prototypePanel);
    var panelStructure = document.createElement('div');
    panelStructure.className = "prt-panel-structure";
    document.querySelector(".prototype-panel").appendChild(panelStructure);
    var panelHeader = document.createElement('div');
    // Main Panel Header + Header Actions
    panelHeader.insertAdjacentHTML("beforeend",
    `<header class="prt-panel-header">
    <span class="prt-panel-title">${panelInfo.prototypeTitle} <div class="ptr-close-btn prt-panel-close"><span class="prt-panel-header-actions"> <div class="prt-panel-close">${prtCloseIcon}</div></div></span></span></header>
    <div class="prt-panel-content"></div>`);
    document.querySelector(".prt-panel-structure").appendChild(panelHeader);
    // Info Section
    var panelInfoSection = document.createElement('div');
    panelInfoSection.className = "prt-panel-section";
    panelInfoSection.insertAdjacentHTML("beforeend",
    `<div class="prt-panel-section">
    <div class="prt-panel-section-header"><span>Prototype Info</span></div>
    <div class="prt-panel-section-content info-section-content"><span>${panelInfo.prototypeDescription}</span></div>
    </div>`);
    document.querySelector(".prt-panel-content").appendChild(panelInfoSection);
    // Footer Panel
    var panelFooter = document.createElement('div');
    panelFooter.className = "prt-panel-footer";
    panelFooter.insertAdjacentHTML("beforeend", `<a class="by-ux-prt" href='https://www.wixwhooo.com/results?type=all&val=prototyper' target="_blank">${prototypersLogo}</a>${prtArrowClose}`);
    document.querySelector(".prt-panel-structure").appendChild(panelFooter);
    var panelTab = document.createElement('div');
    panelTab.insertAdjacentHTML("beforeend", `<div class="prt-panel-tab">${prtSettingsIcon}</div>`)
    document.querySelector(".prototype-panel").appendChild(panelTab);

    if(panelSections != null) {
      panelSections.forEach((section) => { createPrtPanelSection(section) });
      document.querySelectorAll(".prt-panel-section.isClose .prt-panel-section-header").forEach((closeSection) => { closePrtPanelSection(closeSection) });
      document.querySelectorAll(".prt-panel-field.disabled").forEach((disabledField) => { disablePrtPanelField(disabledField.getAttribute("name"),true); });
    } else { // section is empty
      $(".prt-panel-content").addClass("prt-only-info-content");
      $(".prt-panel-section-header").addClass("prt-disable-closing");
    }
  }
  initPrototypePanelControls();
}

/* Create each prototype settings section (after the prototype info)*/
function createPrtPanelSection(section) {
  var newSection = "";
  var sectionNum = section.sectionNumber;
  section.sectionIsOpen != true ? sectionIsOpen = "isClose" : sectionIsOpen = "isOpen";
  newSection = `<div class="prt-panel-section ${sectionIsOpen}" section-number="${sectionNum}">
  <div class="prt-panel-section-header"><span>${section.sectionTitle}</span></div>
  <div class="prt-panel-section-content" number="${sectionNum}"></div>
  </div>`;
  document.querySelector('.prt-panel-content').insertAdjacentHTML("beforeend", newSection);
  section.fields.forEach((field) => {
    var inputField = "";
    inputField = createPrtPanelInput(field);
    document.querySelector(`[number="${sectionNum}"]`).insertAdjacentHTML("beforeend", inputField);
  });
}

/*  Create each setting - with call to "inputFieldContent" function in "customSettings.js" to get the relevant content. */
function createPrtPanelInput(field) {
  var newSetting = "";
  field.disabled == true ? disabled = " disabled" : disabled = "";
  var content = prtPanelInputContent(field);
  newSetting = `<div class="prt-panel-field${disabled}" name="${field.fieldName}" call="${field.function}"><label class="prt-panel-field-label">${field.fieldLabel}</label>${content}</div>`;
  field.divider ? newSetting = newSetting + '<div class="prt-panel-divider"></div>' : "";
  return newSetting;
}

/* Add the relevant html content for each input type.
There is a call to this function from "createSettings" function in "controllerStructure.js" */
function prtPanelInputContent(field) {
  var content = "";
  switch (field.fieldType) {
    case "number":
    field.showSlider ? displaySlider = "block" : displaySlider = "none";
    content = `<div class="prt-input-number-area" style="display:flex">
    <div class="prt-slider" name="${field.fieldName}" data-value=${field.value} data-min=${field.min} data-max=${field.max} data-step=${field.step} style="display:${displaySlider}"></div>
    <div class="prt-container-input-number"><input class="prt-spinner" name="${field.fieldName}" data-min="${field.min}" data-max="${field.max}" data-step="${field.step}" suffix="${field.suffix}" value="${field.value}">
    <span class="prt-sfx-label">${field.suffix}</span></div>
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

/* Add or Rmove disabled from a field - include the label and all the inputs
PARAMETERS: field = the relevant field | flag = can be TRUE or FALSE */
function disablePrtPanelField(fieldName, flag) {
  var field = document.querySelector(`.prt-panel-field[name='${fieldName}']`);

  if(flag) {
    field.classList.add("disabled");
    field.querySelector(".prt-panel-field-label").classList.add("disabled");
    field.querySelectorAll("input").forEach((disabledInput) => { disabledInput.setAttribute("disabled", "") });
    // field.find(".prt-slider").slider({ disabled: true });
    // field.find(".prt-spinner").spinner({ disabled: true });
  } if(!flag) {
    field.classList.remove("disabled");
    field.querySelector(".prt-panel-field-label").classList.remove("disabled");
    field.querySelectorAll("input").forEach((disabledInput) => { disabledInput.removeAttribute("disabled") });

    // field.find(".prt-slider").slider({ disabled: false });
    // field.find(".prt-spinner").spinner({ disabled: false });
  }
}

function closePrtPanelSection(section) {
  if (section.classList.contains("close")) {
    console.log(section.parentNode())
    section.parentNode.style.maxHeight = "2000px";
    section.classList.remove("close");
    section.nextElementSibling.classList.remove("close");
    section.nextElementSibling.children.classList.remove("close");
    // scrollTopSection(section.parent());
  }
  else {
    section.classList.add("close");
    section.nextElementSibling.classList.add("close");
    section.parentNode.style.maxHeight = "30px";
  }
}

function initPrototypePanelControls() {
  document.querySelectorAll('.prt-panel-field input').forEach((inputChanged) => {
    inputChanged.addEventListener("change", function(e) {
      let name = e.target.getAttribute("name");
      e.target.classList.contains("prt-spinner") ? selectedValue = e.target.val() : selectedValue = document.querySelector(`input[name='${name}']:checked`).getAttribute("value");
      const theFunction = document.querySelector(`.prt-panel-field[name='${name}']`).getAttribute("call");
      // Call the relevant function
      window[theFunction](`${name}`,`${selectedValue}`);
    });
  });

  // $(".prt-panel-field input").on("change", e => {
  //
  //   e.stopPropagation();
  //   const name = $(e.target).attr("name"); // the name given to the input for identify
  //   $(e.target).hasClass("prt-spinner") ? selectedValue = $(e.target).val() : selectedValue = $(`input[name='${name}']:checked`).attr("value");
  //   const theFunction = $(`.prt-panel-field[name='${name}']`).attr("call");
  //   // Call the relevant function
  //   window[theFunction](`${name}`,`${selectedValue}`)
  // })
}
