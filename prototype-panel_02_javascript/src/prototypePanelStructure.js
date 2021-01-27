/* NOTE: This file includes the functions and the icons for creating the structure - No need to change / add. */

/*  This function builds the prototype panel and appends it to the body element in your prototype's index file.
Call this function from one of your .js files in the project. */
function initPrototypePanel(panelInfo, panelSections) {
  if(panelInfo != null) {
    setPrtPanelDirection(panelInfo);

    // Prototype Panel Template
    var prototypePanelTemplate =
    `<div class='prototype-panel' panel-dir=${panelInfo.panelDirection}>
    <div class='prt-panel-structure'>
    <header class='prt-panel-header'>
    <span class='prt-panel-title'>${panelInfo.prototypeTitle}
    <div class='ptr-close-btn prt-panel-close'>
    <span class='prt-panel-header-actions'>
    <div class='prt-panel-close'>${prtCloseIcon}</div>
    </span>
    </div>
    </span>
    </header>
    <div class='prt-panel-content'>
    <div class='prt-panel-section'>
    <div class='prt-panel-section-header'><span>Prototype Info</span></div>
    <div class='prt-panel-section-content info-section-content'>
    <span>${panelInfo.prototypeDescription}</span>
    </div>
    </div>
    </div>
    <div class='prt-panel-footer'>
    <a class='by-ux-prt' href='https://www.wixwhooo.com/results?type=all&val=prototyper' target='_blank'>
    ${prototypersLogo}
    </a>${prtArrowClose}
    </div>
    </div>
    <div class='prt-panel-tab'>${prtSettingsIcon}</div>
    </div>`;

    if(validatePrtPanelInfo(panelInfo)) {
      document.body.insertAdjacentHTML('beforeend', prototypePanelTemplate);
      if(panelSections != null) {
        panelSections.forEach((section) => { createPrtPanelSection(section) });
        document.querySelectorAll('.prt-panel-section.isClose .prt-panel-section-header').forEach((closeSection) => { closePrtPanelSection(closeSection) });
        document.querySelectorAll('.prt-panel-field.disabled').forEach((disabledField) => { disablePrtPanelField(disabledField.getAttribute('name'),true); });
        document.querySelectorAll('.prt-slider').forEach((sliderField) => { changesSliderWidth(sliderField.getAttribute('name'), sliderField.getAttribute('value')); });
      } else { // section is empty
        document.querySelector('.prt-panel-content').classList.add('prt-only-info-content');
        document.querySelector('.prt-panel-section-header').classList.add('prt-disable-closing');
      }
      initPrtPanelEvents(); // add all click and change events of the panel
    }
  } else console.error('PROTOTYPE PANEL: Invalid parameters for init function, Please fix it (:');
}

/* Set the prototype panel direction - the DEFAULT is right */
function setPrtPanelDirection(panelInfo) {
  if (panelInfo.panelDirection != 'right' && panelInfo.panelDirection != 'left') {
    panelInfo.panelDirection = 'right';
  }
}

/* Check if all the panelInfo properties are valid, if not - the panel will not be created and you get error massage */
function validatePrtPanelInfo(panelInfo) {
  if (
    panelInfo.prototypeTitle === 'undefined' ||
    panelInfo.prototypeTitle == null ||
    panelInfo.prototypeTitle == '' ||
    panelInfo.prototypeDescription === 'undefined' ||
    panelInfo.prototypeDescription == null ||
    panelInfo.prototypeDescription == ''
  ) {
    console.error('PROTOTYPE PANEL: Invalid title or invalid description, Please fix it (:');
    return false;
  } else return true;
}

/* Create all the panel events - for the panel actions and for the inputs*/
function initPrtPanelEvents() {
  initPrototypePanelControls();

  // open the panel (after user clicks on the tab)
  document.querySelector('.prt-panel-tab').addEventListener('click', function() {
    if(!this.classList.contains('prt-panel-open')) {
      this.classList.add('prt-panel-open');
      document.querySelector('.prt-panel-structure').classList.add('prt-panel-open');
      document.querySelector('.prt-panel-tab').classList.add('prt-panel-open');
    } else {
      this.classList.remove('prt-panel-open');
      document.querySelector('.prt-panel-structure').classList.remove('prt-panel-open');
      document.querySelector('.prt-panel-tab').classList.remove('prt-panel-open');
    }
  });

  // close the panel
  document.querySelectorAll('.prt-panel-close').forEach((closeBtn) => {
    closeBtn.addEventListener('click', function() {
      document.querySelector('.prt-panel-tab').classList.remove('prt-panel-open');
      document.querySelector('.prt-panel-structure').classList.remove('prt-panel-open');
    });
  });

  // open or close section
  document.querySelectorAll('.prt-panel-section-header').forEach((sectionHeader) => {
    if(!sectionHeader.classList.contains('prt-disable-closing')) {
      sectionHeader.addEventListener('click', function() {
        closePrtPanelSection(sectionHeader);
      });
    }
  });

  // set position for each thumbnail tooltip - left / center / right
  document.querySelectorAll('.prt-thumbnails-tooltip-item').forEach((thumbnailTooltip) => {
    var i = thumbnailTooltip.getAttribute('count');
    if((i+2) % 3 == 0) { // left items
      thumbnailTooltip.style.left = '-5px';
    }
    if((i+1) % 3 == 0) { // center items
      thumbnailTooltip.classList.add('center-prt-tooltip-item');
    }
    if(i % 3 == 0) { // right items
      thumbnailTooltip.style.right = '-5px';
    }
  });

  /* --- old jquery - for the future --- */
  // $('.ptr-dir-btn').click(function () {
  //   $('.prt-panel-tab').hide();
  //   if($('.prototype-panel').attr('panel-dir') == 'left') {
  //     $('.prototype-panel').attr('panel-dir', 'right');
  //     $('.by-ux-prt').insertBefore('.prt-footer-close');
  //   } else {
  //     $('.prototype-panel').attr('panel-dir', 'left');
  //     $('.prt-footer-close').insertBefore('.by-ux-prt');
  //   }
  //   setTimeout(function(){ $('.prt-panel-tab').show(); }, 300);
  // })
}

/* Create each prototype settings section (after the prototype info)
PARAMETERS: section = the relevant section */
function createPrtPanelSection(section) {
  var newSection = '';
  var sectionNum = section.sectionNumber;
  section.sectionIsOpen != false ? sectionIsOpen = 'isOpen' : sectionIsOpen = 'isClose';
  newSection = `<div class='prt-panel-section ${sectionIsOpen}' section-number='${sectionNum}'>
  <div class='prt-panel-section-header'><span>${section.sectionTitle}</span></div>
  <div class='prt-panel-section-content' number='${sectionNum}'></div>
  </div>`;
  document.querySelector('.prt-panel-content').insertAdjacentHTML('beforeend', newSection);
  section.fields.forEach((field) => {
    var inputField = '';
    inputField = createPrtPanelInput(field);
    document.querySelector(`[number='${sectionNum}']`).insertAdjacentHTML('beforeend', inputField);
  });
}

/*  Create each input field - with call to 'prtPanelInputContent' function for get the relevant content.
PARAMETERS: field = the relevant field */
function createPrtPanelInput(field) {
  var newSetting = '';
  field.disabled == true ? disabled = ' disabled' : disabled = '';
  var content = prtPanelInputContent(field);
  newSetting = `<div class='prt-panel-field${disabled}' name='${field.fieldName}' call='${field.function}'><label class='prt-panel-field-label'>${field.fieldLabel}</label>${content}</div>`;
  field.divider ? ( newSetting = newSetting + `<div class='prt-panel-divider'></div>` ) : '';
  return newSetting;
}

/* Add the relevant html content for each input type
PARAMETERS: field = the relevant field  */
function prtPanelInputContent(field) {
  var content = '';
  switch (field.fieldType) {
    case 'number':
    field.showSlider ? displaySlider = 'block' : displaySlider = 'none';
    content = `<div class='prt-input-number-area' style='display:flex'>
    <input type='range' class='prt-slider' name='${field.fieldName}' value=${field.value} min=${field.min} max=${field.max} step=${field.step} style='display:${displaySlider}'/>
    <div class='prt-container-input-number'><input type='number' class='prt-spinner' name='${field.fieldName}' min='${field.min}' max='${field.max}' step='${field.step}' suffix='${field.suffix}' value='${field.value}'>
    <span class='prt-sfx-label'>${field.suffix}</span></div>
    </div>`;
    break;
    case 'toggle':
    field.option1Display.length > 14 ? opacity1 = 1 : opacity1 = 0;
    field.option2Display.length > 14 ? opacity2 = 1 : opacity2 = 0;
    content = `<div class='prt-toggle'>
    <input class='prt-toggle-option' id='${field.fieldName}-0' value='${field.option1Value}' option='1' type='radio' name='${field.fieldName}' checked>
    <label class='prt-toggle-labels' for='${field.fieldName}-0'>${field.option1Display}</label>
    <span class='prt-toggle-tooltip-option' style='opacity: ${opacity1}'>${field.option1Display}</span>
    <input class='prt-toggle-option' id='${field.fieldName}-1' value='${field.option2Value}' option='2' type='radio' name='${field.fieldName}'>
    <label class='prt-toggle-labels' for='${field.fieldName}-1'>${field.option2Display}</label>
    <span class='prt-toggle-tooltip-option right' style='opacity: ${opacity2}'>${field.option2Display}</span>
    <div class='prt-toggle-bckgrnd'></div>
    </div>`;
    break;
    case 'radio-button':
    for(var i = 0 ; i < field.optionsBackendList.length; i++) {
      i == field.defaultIndex ? checked = 'checked' : checked = '';
      content += `<div class='prt-checkbox-container'><input class='prt-circle-checkbox' type='radio' id='${field.fieldName}-${i}' value='${field.optionsBackendList[i]}' name='${field.fieldName}' ${checked}>
      <span class='prt-checkmark'></span>
      <label for='${field.fieldName}-${i}'>${field.optionsDisplayList[i]}</label>
      </div>`;
    }
    break;
    case 'thumbnails':
    content = `<div class='prt-thumbnails'>`
    for(var i = 0 ; i < field.optionsBackendList.length; i++) {
      i == field.defaultIndex ? selected = 'selected' : selected = '';
      i == field.defaultIndex ? checked = 'checked' : checked = '';
      field.labelsDisplayList[i].length > 9 ? opacity2 = 1 : opacity2 = 0;
      content += `<div class='prt-thumbnails-item'>
      <input class='prt-thumbnails-input' type='radio' value='${field.optionsBackendList[i]}' name='${field.fieldName}' id='${field.fieldName}-${i}' ${checked}>
      <button class='prt-thumbnails-button ${selected}' value='${field.optionsBackendList[i]}'><img src='${field.iconsDisplayList[i]}'></button>
      <label for='${field.fieldName}-${i}'>${field.labelsDisplayList[i]}</label>
      <span class='prt-thumbnails-tooltip-item' count='${i+1}' style='opacity: ${opacity2}'>${field.labelsDisplayList[i]}</span>
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
  field.classList.toggle('disabled', flag);
  field.querySelector('.prt-panel-field-label').classList.toggle('disabled', flag);
  field.querySelectorAll('input').forEach((disabledInput) => {
    flag ? disabledInput.setAttribute('disabled', 'disabled') : disabledInput.removeAttribute('disabled') });
  }


  /* Close or open section
  PARAMETERS: section = the relevant section */
  function closePrtPanelSection(section) {
    if (section.classList.contains('close')) {
      section.parentNode.style.maxHeight = '2000px';
      section.classList.remove('close');
      section.nextElementSibling.classList.remove('close');
      // section.nextElementSibling.children.classList.remove('close');
    }
    else {
      section.classList.add('close');
      section.nextElementSibling.classList.add('close');
      section.parentNode.style.maxHeight = '30px';
    }
  }

  /* Call the relvant function after changing the input. You are responsible for the implementation of this function.
  For numeric input - this function also update the spinner / slider with the current value and change the background width of the slider */
  function initPrototypePanelControls() {
    // What happens after each non-numeric input change
    document.querySelectorAll('.prt-panel-field input').forEach((inputChanged) => {
      inputChanged.addEventListener('change', function(e) {
        let name = e.target.getAttribute('name');
        if ((!e.target.classList.contains('prt-spinner')) && (!e.target.classList.contains('prt-slider'))) {
          e.target.classList.contains('prt-spinner') || e.target.classList.contains('prt-slider') ? selectedValue = e.target.value : selectedValue = document.querySelector(`input[name='${name}']:checked`).getAttribute('value');
          const theFunction = document.querySelector(`.prt-panel-field[name='${name}']`).getAttribute('call');
          // Call the relevant function
          window[theFunction](`${name}`,`${selectedValue}`);
        }
      });
    });

    // What happens after each numeric input change (spinner or slider)
    document.querySelectorAll('.prt-panel-field input').forEach((inputChanged) => {
      inputChanged.addEventListener('input', function(e) {
        let name = e.target.getAttribute('name');
        if (e.target.classList.contains('prt-spinner') || e.target.classList.contains('prt-slider')) {
          selectedValue = e.target.value;
          changesSliderWidth(name, selectedValue);
          if(e.target.classList.contains('prt-spinner')) { // need to update the slider value
            let sliderField = document.querySelector(`.prt-slider[name='${name}']`);
            sliderField.value = selectedValue;
          }
          if(e.target.classList.contains('prt-slider')) { // need to update the spinner value
            let spinnerField = document.querySelector(`.prt-spinner[name='${name}']`);
            spinnerField.value = selectedValue;
          }
          const theFunction = document.querySelector(`.prt-panel-field[name='${name}']`).getAttribute('call');
          // Call the relevant function
          window[theFunction](`${name}`,`${selectedValue}`);
        }
      });
    });
  }

  /* Update the background width of the slider after changing the value
  PARAMETERS: name = for get the relevant input field, value = the selected value */
  function changesSliderWidth(name, value) {
    var input = document.querySelector(`input[type='range'][name=${name}]`);
    var inputMin = input.getAttribute('min');
    var inputMax = input.getAttribute('max');
    var gapValues = inputMax - inputMin;
    var inputStep = input.getAttribute('step');
    var sumSteps = gapValues / inputStep;
    var sliderWidth = 109; // The width set for the slider
    var stepWidth = sliderWidth / sumSteps;
    var currentVal = value;
    var finalVal = currentVal - inputMin; // The current value is less than the initial value
    var moveSteps = finalVal / inputStep;
    var finalWidth = moveSteps * stepWidth;
    document.head.insertAdjacentHTML('beforeend', `<style>.prt-slider[name=${name}]::after{width:${finalWidth}px}</style>`)

  }

  /* ----- Icons ----- */
  const prtArrowClose =
  `<svg class='prt-panel-close prt-footer-close' viewBox='0 0 18 18' fill='#bebebe' width='18' height='18'><path class='st0' d='M9.1,5c-0.3-0.3-0.3-0.7,0-0.9s0.7-0.3,0.9,0L15,9l-4.9,4.9c-0.3,0.3-0.7,0.3-0.9,0c-0.3-0.3-0.3-0.7,0-0.9l4-4
  L9.1,5z'/><path class='st0' d='M3.2,5C3,4.8,3,4.4,3.2,4.1s0.7-0.3,0.9,0L9.1,9l-4.9,4.9c-0.3,0.3-0.7,0.3-0.9,0C3,13.6,3,13.2,3.2,13l4-4
  L3.2,5z'/></svg>`;

  const prtSettingsIcon =
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#e7e7e7' width='24' height='24' style='height: 22px; width: 22px;'><path d='M14.092,8 C14.036,7.843 14,7.676 14,7.5 C14,7.324 14.036,7.157 14.092,7 C14.299,6.419 14.849,6 15.5,6 C16.151,6 16.701,6.419 16.908,7 C16.964,7.157 17,7.324 17,7.5 C17,7.676 16.964,7.843 16.908,8 C16.701,8.581 16.151,9 15.5,9 C14.849,9 14.299,8.581 14.092,8 Z M17.949,7 C17.717,5.86 16.707,5 15.5,5 C14.293,5 13.283,5.86 13.051,7 L3,7 L3,8 L13.051,8 C13.283,9.14 14.293,10 15.5,10 C16.707,10 17.717,9.14 17.949,8 L21,8 L21,7 L17.949,7 Z M15.092,18.0009 C15.036,17.8439 15,17.6769 15,17.5009 C15,17.3249 15.036,17.1579 15.092,17.0009 C15.299,16.4199 15.849,16.0009 16.5,16.0009 C17.151,16.0009 17.701,16.4199 17.908,17.0009 C17.964,17.1579 18,17.3249 18,17.5009 C18,17.6769 17.964,17.8439 17.908,18.0009 C17.701,18.5819 17.151,19.0009 16.5,19.0009 C15.849,19.0009 15.299,18.5819 15.092,18.0009 Z M18.949,17.0009 C18.717,15.8609 17.707,15.0009 16.5,15.0009 C15.293,15.0009 14.283,15.8609 14.051,17.0009 L3,17.0009 L3,18.0009 L14.051,18.0009 C14.283,19.1409 15.293,20.0009 16.5,20.0009 C17.707,20.0009 18.717,19.1409 18.949,18.0009 L21,18.0009 L21,17.0009 L18.949,17.0009 Z M6.092,13 C6.036,12.843 6,12.676 6,12.5 C6,12.324 6.036,12.157 6.092,12 C6.299,11.419 6.849,11 7.5,11 C8.151,11 8.701,11.419 8.908,12 C8.964,12.157 9,12.324 9,12.5 C9,12.676 8.964,12.843 8.908,13 C8.701,13.581 8.151,14 7.5,14 C6.849,14 6.299,13.581 6.092,13 Z M9.949,12 C9.717,10.86 8.707,10 7.5,10 C6.293,10 5.283,10.86 5.051,12 L3,12 L3,13 L5.051,13 C5.283,14.14 6.293,15 7.5,15 C8.707,15 9.717,14.14 9.949,13 L21,13 L21,12 L9.949,12 Z'></path></svg>`;

  const prtExportIcon =
  `<svg viewBox='0 0 24 24' fill='#fff' width='24' height='24'><path d='M11,6 L11,7 L7,7 C6.44771525,7 6,7.44771525 6,8 L6,17 C6,17.5522847 6.44771525,18 7,18 L16,18 C16.5522847,18 17,17.5522847 17,17 L17,13 L18,13 L18,17 C18,18.1045695 17.1045695,19 16,19 L7,19 C5.8954305,19 5,18.1045695 5,17 L5,8 C5,6.8954305 5.8954305,6 7,6 L11,6 Z M18,6 L18,10 L17,10 L17,7.75 L11.9040467,12.8434838 C11.69694,13.0505906 11.3611535,13.0505906 11.1540467,12.8434838 C10.94694,12.636377 10.94694,12.3005906 11.1540467,12.0934838 L16.25,7 L14,7 L14,6 L18,6 Z'></path></svg>`;

  const prtDirIcon = `<svg viewBox='0 0 25 25' fill='#fff' width='25' height='25'><path d='M16,5 C16.5522847,5 17,5.44771525 17,6 L17,7 L16,7 L16,6 L7,6 L7,19 L16,19 L16,18 L17,18 L17,19 C17,19.5522847 16.5522847,20 16,20 L7,20 C6.44771525,20 6,19.5522847 6,19 L6,6 C6,5.44771525 6.44771525,5 7,5 L16,5 Z M17.7843055,9.08859116 L17.8535534,9.14644661 L20.8394113,12.1323045 C21.0199203,12.3128135 21.0399768,12.5930149 20.8995809,12.7956777 L20.8394113,12.8676955 L17.8535534,15.8535534 C17.6582912,16.0488155 17.3417088,16.0488155 17.1464466,15.8535534 C16.9728803,15.679987 16.9535951,15.4105626 17.0885912,15.2156945 L17.1464466,15.1464466 L19.293,13 L11,13 L11,12 L19.293,12 L17.1464466,9.85355339 C16.9728803,9.67998704 16.9535951,9.41056264 17.0885912,9.2156945 L17.1464466,9.14644661 C17.320013,8.97288026 17.5894374,8.95359511 17.7843055,9.08859116 Z'></path></svg>`;

  const prtCloseIcon =`<svg viewBox='0 0 24 24' fill='#bebebe' width='24' height='24'><path d='M10.9393398,12 L6,7.06066017 C5.70710678,6.76776695 5.70710678,6.29289322 6,6 C6.29289322,5.70710678 6.76776695,5.70710678 7.06066017,6 L12,10.9393398 L16.9393398,6 C17.232233,5.70710678 17.7071068,5.70710678 18,6 C18.2928932,6.29289322 18.2928932,6.76776695 18,7.06066017 L13.0606602,12 L18,16.9393398 C18.2928932,17.232233 18.2928932,17.7071068 18,18 C17.7071068,18.2928932 17.232233,18.2928932 16.9393398,18 L12,13.0606602 L7.06066017,18 C6.76776695,18.2928932 6.29289322,18.2928932 6,18 C5.70710678,17.7071068 5.70710678,17.232233 6,16.9393398 L10.9393398,12 Z'></path></svg>`

  const prtMoreIcon = `<svg viewBox='0 0 18 18' fill='currentColor' width='18' height='18'><path d='M4,8 L6,8 L6,10 L4,10 L4,8 Z M8,8 L10,8 L10,10 L8,10 L8,8 Z M12,8 L14,8 L14,10 L12,10 L12,8 Z'></path></svg>`

  const prototypersLogo = `<?xml version='1.0' encoding='UTF-8'?>
  <svg width='235px' height='31px' viewBox='0 0 235 31' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>
  <title>Combined Shape</title>
  <g id='Wix-Logos' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
  <g id='Wix-Products-&amp;-Sub-Brands-Logos' transform='translate(-645.000000, -8015.000000)' fill='#000000' fill-rule='nonzero'>
  <g id='Wix-Teams-/--Guilds--/--Compenies' transform='translate(112.000000, 6101.000000)'>
  <g id='BG' transform='translate(0.000000, 75.000000)'>
  <path d='M691.06169,1847.256 L696.08569,1860.44 L701.10969,1847.256 L703.60569,1847.256 L696.11769,1865.784 L695.98633,1866.09712 C695.58217,1867.01584 695.08729,1867.7488 694.50169,1868.296 C693.851024,1868.904 692.832357,1869.208 691.44569,1869.208 L691.44569,1869.208 L689.58969,1869.208 L689.58969,1867.096 L691.44569,1867.096 L691.681542,1867.08968 C692.294678,1867.05597 692.781394,1866.88741 693.14169,1866.584 C693.547024,1866.24267 693.867024,1865.74133 694.10169,1865.08 L694.10169,1865.08 L694.83769,1863.064 L688.43769,1847.256 L691.06169,1847.256 Z M715.10569,1846.744 C716.556357,1846.744 717.836357,1847.10667 718.94569,1847.832 C720.055024,1848.55733 720.92969,1849.55467 721.56969,1850.824 C722.20969,1852.09333 722.52969,1853.528 722.52969,1855.128 C722.52969,1856.74933 722.199024,1858.18933 721.53769,1859.448 C720.876357,1860.70667 719.975024,1861.69867 718.83369,1862.424 C717.692357,1863.14933 716.38569,1863.512 714.91369,1863.512 C713.655024,1863.512 712.54569,1863.25067 711.58569,1862.728 C710.62569,1862.20533 709.879024,1861.496 709.34569,1860.6 L709.34569,1860.6 L709.34569,1869.208 L706.88169,1869.208 L706.88169,1847.256 L709.31369,1847.256 L709.31369,1850.2 L709.452246,1849.943 C709.979431,1849.01656 710.717246,1848.26489 711.66569,1847.688 C712.700357,1847.05867 713.847024,1846.744 715.10569,1846.744 Z M638.21369,1846.744 C639.74969,1846.744 641.115024,1847.10667 642.30969,1847.832 C643.504357,1848.55733 644.43769,1849.54933 645.10969,1850.808 C645.78169,1852.06667 646.11769,1853.50667 646.11769,1855.128 C646.11769,1856.74933 645.78169,1858.18933 645.10969,1859.448 C644.43769,1860.70667 643.504357,1861.69867 642.30969,1862.424 C641.115024,1863.14933 639.74969,1863.512 638.21369,1863.512 C636.699024,1863.512 635.344357,1863.14933 634.14969,1862.424 C632.955024,1861.69867 632.02169,1860.70667 631.34969,1859.448 C630.67769,1858.18933 630.34169,1856.74933 630.34169,1855.128 C630.34169,1853.50667 630.67769,1852.06667 631.34969,1850.808 C632.02169,1849.54933 632.955024,1848.55733 634.14969,1847.832 C635.344357,1847.10667 636.699024,1846.744 638.21369,1846.744 Z M667.29369,1846.744 C668.82969,1846.744 670.195024,1847.10667 671.38969,1847.832 C672.584357,1848.55733 673.51769,1849.54933 674.18969,1850.808 C674.86169,1852.06667 675.19769,1853.50667 675.19769,1855.128 C675.19769,1856.74933 674.86169,1858.18933 674.18969,1859.448 C673.51769,1860.70667 672.584357,1861.69867 671.38969,1862.424 C670.195024,1863.14933 668.82969,1863.512 667.29369,1863.512 C665.779024,1863.512 664.424357,1863.14933 663.22969,1862.424 C662.035024,1861.69867 661.10169,1860.70667 660.42969,1859.448 C659.75769,1858.18933 659.42169,1856.74933 659.42169,1855.128 C659.42169,1853.50667 659.75769,1852.06667 660.42969,1850.808 C661.10169,1849.54933 662.035024,1848.55733 663.22969,1847.832 C664.424357,1847.10667 665.779024,1846.744 667.29369,1846.744 Z M733.16569,1846.744 C734.595024,1846.744 735.859024,1847.096 736.95769,1847.8 C738.056357,1848.504 738.915024,1849.48 739.53369,1850.728 C740.152357,1851.976 740.46169,1853.41067 740.46169,1855.032 L740.46169,1855.032 L740.46169,1855.992 L728.07769,1855.992 L728.117299,1856.30389 C728.327693,1857.74148 728.895824,1858.92818 729.82169,1859.864 C730.81369,1860.86667 732.088357,1861.368 733.64569,1861.368 C734.627024,1861.368 735.512357,1861.13333 736.30169,1860.664 C737.091024,1860.19467 737.80569,1859.46933 738.44569,1858.488 L738.44569,1858.488 L740.10969,1860.088 L739.89869,1860.36989 C739.114024,1861.38107 738.208357,1862.14578 737.18169,1862.664 C736.06169,1863.22933 734.82969,1863.512 733.48569,1863.512 C731.907024,1863.512 730.515024,1863.14933 729.30969,1862.424 C728.104357,1861.69867 727.16569,1860.70133 726.49369,1859.432 C725.82169,1858.16267 725.48569,1856.728 725.48569,1855.128 C725.48569,1853.528 725.82169,1852.09333 726.49369,1850.824 C727.16569,1849.55467 728.083024,1848.55733 729.24569,1847.832 C730.408357,1847.10667 731.715024,1846.744 733.16569,1846.744 Z M760.86969,1846.744 C762.192357,1846.744 763.376357,1847 764.42169,1847.512 C765.467024,1848.024 766.395024,1848.74933 767.20569,1849.688 L767.20569,1849.688 L765.60569,1851.384 L765.37744,1851.09575 C764.83494,1850.44125 764.223024,1849.91333 763.54169,1849.512 C762.763024,1849.05333 761.872357,1848.824 760.86969,1848.824 C759.824357,1848.824 758.971024,1849.064 758.30969,1849.544 C757.648357,1850.024 757.31769,1850.63733 757.31769,1851.384 C757.31769,1851.98133 757.595024,1852.456 758.14969,1852.808 C758.704357,1853.16 759.68569,1853.44267 761.09369,1853.656 C763.419024,1853.99733 765.06169,1854.54667 766.02169,1855.304 C766.98169,1856.06133 767.46169,1857.13333 767.46169,1858.52 C767.46169,1859.50133 767.184357,1860.37067 766.62969,1861.128 C766.075024,1861.88533 765.312357,1862.472 764.34169,1862.888 C763.371024,1863.304 762.267024,1863.512 761.02969,1863.512 C759.49369,1863.512 758.171024,1863.25067 757.06169,1862.728 C755.952357,1862.20533 754.960357,1861.48533 754.08569,1860.568 L754.08569,1860.568 L755.68569,1858.872 L755.94644,1859.16025 C756.56594,1859.81475 757.263024,1860.34267 758.03769,1860.744 C758.923024,1861.20267 759.920357,1861.432 761.02969,1861.432 C762.18169,1861.432 763.115024,1861.16533 763.82969,1860.632 C764.544357,1860.09867 764.90169,1859.40533 764.90169,1858.552 C764.90169,1857.848 764.59769,1857.288 763.98969,1856.872 C763.38169,1856.456 762.34169,1856.14133 760.86969,1855.928 C758.62969,1855.56533 757.056357,1855.04267 756.14969,1854.36 C755.243024,1853.67733 754.78969,1852.728 754.78969,1851.512 C754.78969,1850.06133 755.355024,1848.904 756.48569,1848.04 C757.616357,1847.176 759.07769,1846.744 760.86969,1846.744 Z M577.203089,1840.78704 C578.19054,1841.70251 579.289293,1843.32013 579.375613,1843.44808 L579.381049,1843.45616 L582.211327,1847.61304 C582.348528,1847.82988 582.52845,1848.06515 582.815175,1848.06515 C583.066778,1848.06515 583.235352,1847.88502 583.365478,1847.69472 L583.419023,1847.61304 L586.249301,1843.45616 C586.249301,1843.45616 586.265864,1843.43145 586.296792,1843.38633 L586.37715,1843.27011 C586.704512,1842.80043 587.605206,1841.54993 588.428082,1840.78704 C589.987792,1839.33897 593.091522,1839.82718 593.272745,1839.85715 L593.281045,1839.85855 L585.590409,1851.51624 L593.260506,1863.13793 C593.260506,1863.13793 589.938933,1863.57245 588.331959,1862.08134 C587.346223,1861.16746 586.337096,1859.70457 586.254713,1859.58425 L586.249301,1859.57632 L583.419023,1855.41944 C583.281822,1855.20259 583.102721,1854.96817 582.815175,1854.96817 C582.564291,1854.96817 582.395177,1855.14765 582.264905,1855.33779 L582.211327,1855.41944 L579.381049,1859.57632 C579.381049,1859.57632 579.36549,1859.60056 579.336256,1859.64485 L579.26011,1859.75889 C578.964769,1860.19679 578.171197,1861.32639 577.357543,1862.08134 C575.797036,1863.5286 572.567129,1863.16182 572.378484,1863.139 L572.369844,1863.13793 L580.040762,1851.51624 L572.350127,1839.85855 C572.350127,1839.85855 575.596115,1839.29509 577.203089,1840.78704 Z M569.836749,1843.9404 L569.836749,1844.77285 L569.838416,1844.77203 L569.838416,1858.69483 C569.826746,1861.55119 569.526662,1862.18521 568.220459,1862.8431 C567.251321,1863.33119 565.792298,1863.17707 565.661662,1863.16205 L565.652233,1863.16093 L565.652233,1847.56746 C565.652233,1846.78441 565.916474,1846.27143 566.889249,1845.81033 C567.469413,1845.53532 568.010399,1845.32453 568.573892,1845.01328 C569.45164,1844.5283 569.836749,1843.9404 569.836749,1843.9404 Z M536.901993,1840.87782 C537.820125,1841.69916 538.117318,1842.98587 538.142438,1843.10115 L538.144214,1843.10947 L541.331641,1855.62884 L543.98149,1845.38221 C544.240355,1844.29364 544.705153,1842.94677 545.44205,1842.036 C546.37909,1840.87614 548.285427,1840.80318 548.48888,1840.80318 C548.691505,1840.80318 550.597842,1840.87614 551.53571,1842.036 C552.204863,1842.86397 552.65051,1844.05236 552.919874,1845.07945 L552.995442,1845.38221 L555.646118,1855.62884 L558.832719,1843.10947 C558.832719,1843.10947 559.113914,1841.73828 560.076593,1840.87782 C561.585204,1839.52963 563.82259,1839.7629 563.970073,1839.77995 L563.977759,1839.78087 L557.875002,1863.17753 C557.875002,1863.17753 555.861977,1863.32513 554.855464,1862.80433 C553.532194,1862.11999 552.901986,1861.59248 552.100581,1858.40896 C551.386842,1855.57181 549.387876,1847.23563 549.2051,1846.64102 C549.114952,1846.3475 549.007436,1845.64722 548.48888,1845.64722 C547.981075,1845.64722 547.863634,1846.3475 547.771832,1846.64102 C547.663903,1846.98541 546.947234,1849.93462 546.225011,1852.90478 L546.075705,1853.51874 C545.603902,1855.45854 545.147572,1857.33084 544.876352,1858.40896 C544.074946,1861.59248 543.446392,1862.11999 542.123122,1862.80433 C541.156962,1863.30343 539.268698,1863.18867 539.11302,1863.17824 L539.102758,1863.17753 L533,1839.78087 C533,1839.78087 535.340534,1839.48315 536.901993,1840.87782 Z M752.95369,1847 L752.95369,1849.368 L752.40969,1849.368 L752.11737,1849.37552 C751.24665,1849.42064 750.43209,1849.6688 749.67369,1850.12 C748.831024,1850.62133 748.15369,1851.38933 747.64169,1852.424 C747.12969,1853.45867 746.87369,1854.78667 746.87369,1856.408 L746.87369,1856.408 L746.87369,1863 L744.40969,1863 L744.40969,1847.256 L746.84169,1847.256 L746.84169,1850.776 L746.959894,1850.48947 C747.489092,1849.27401 748.239024,1848.39886 749.20969,1847.864 C750.255024,1847.288 751.332357,1847 752.44169,1847 L752.44169,1847 L752.95369,1847 Z M609.38969,1840.12 L609.775013,1840.12661 C611.044434,1840.17069 612.163993,1840.43515 613.13369,1840.92 C614.200357,1841.45333 615.032357,1842.2 615.62969,1843.16 C616.227024,1844.12 616.52569,1845.25067 616.52569,1846.552 C616.52569,1847.832 616.227024,1848.952 615.62969,1849.912 C615.032357,1850.872 614.200357,1851.624 613.13369,1852.168 C612.067024,1852.712 610.819024,1852.984 609.38969,1852.984 L609.38969,1852.984 L603.56569,1852.984 L603.56569,1863 L601.00569,1863 L601.00569,1840.12 L609.38969,1840.12 Z M628.98569,1847 L628.98569,1849.368 L628.44169,1849.368 L628.14937,1849.37552 C627.27865,1849.42064 626.46409,1849.6688 625.70569,1850.12 C624.863024,1850.62133 624.18569,1851.38933 623.67369,1852.424 C623.16169,1853.45867 622.90569,1854.78667 622.90569,1856.408 L622.90569,1856.408 L622.90569,1863 L620.44169,1863 L620.44169,1847.256 L622.87369,1847.256 L622.87369,1850.776 L622.991894,1850.48947 C623.521092,1849.27401 624.271024,1848.39886 625.24169,1847.864 C626.287024,1847.288 627.364357,1847 628.47369,1847 L628.47369,1847 L628.98569,1847 Z M653.16969,1842.648 L653.16969,1847.256 L657.39369,1847.256 L657.39369,1849.368 L653.16969,1849.368 L653.16969,1859.256 L653.174431,1859.4323 C653.228159,1860.40277 653.738579,1860.888 654.70569,1860.888 L654.70569,1860.888 L657.61769,1860.888 L657.61769,1863 L654.09769,1863 L653.846424,1862.9946 C652.860294,1862.95143 652.101383,1862.64923 651.56969,1862.088 C650.99369,1861.48 650.70569,1860.61067 650.70569,1859.48 L650.70569,1859.48 L650.70569,1849.368 L647.69769,1849.368 L647.69769,1847.256 L650.70569,1847.256 L650.70569,1842.648 L653.16969,1842.648 Z M682.24969,1842.648 L682.24969,1847.256 L686.47369,1847.256 L686.47369,1849.368 L682.24969,1849.368 L682.24969,1859.256 L682.254431,1859.4323 C682.308159,1860.40277 682.818579,1860.888 683.78569,1860.888 L683.78569,1860.888 L686.69769,1860.888 L686.69769,1863 L683.17769,1863 L682.926424,1862.9946 C681.940294,1862.95143 681.181383,1862.64923 680.64969,1862.088 C680.07369,1861.48 679.78569,1860.61067 679.78569,1859.48 L679.78569,1859.48 L679.78569,1849.368 L676.77769,1849.368 L676.77769,1847.256 L679.78569,1847.256 L679.78569,1842.648 L682.24969,1842.648 Z M638.21369,1848.888 C637.168357,1848.888 636.251024,1849.15467 635.46169,1849.688 C634.672357,1850.22133 634.05369,1850.952 633.60569,1851.88 C633.15769,1852.808 632.93369,1853.89067 632.93369,1855.128 C632.93369,1856.344 633.15769,1857.42133 633.60569,1858.36 C634.05369,1859.29867 634.672357,1860.03467 635.46169,1860.568 C636.251024,1861.10133 637.168357,1861.368 638.21369,1861.368 C639.280357,1861.368 640.208357,1861.10133 640.99769,1860.568 C641.787024,1860.03467 642.40569,1859.29867 642.85369,1858.36 C643.30169,1857.42133 643.52569,1856.344 643.52569,1855.128 C643.52569,1853.89067 643.30169,1852.808 642.85369,1851.88 C642.40569,1850.952 641.787024,1850.22133 640.99769,1849.688 C640.208357,1849.15467 639.280357,1848.888 638.21369,1848.888 Z M667.29369,1848.888 C666.248357,1848.888 665.331024,1849.15467 664.54169,1849.688 C663.752357,1850.22133 663.13369,1850.952 662.68569,1851.88 C662.23769,1852.808 662.01369,1853.89067 662.01369,1855.128 C662.01369,1856.344 662.23769,1857.42133 662.68569,1858.36 C663.13369,1859.29867 663.752357,1860.03467 664.54169,1860.568 C665.331024,1861.10133 666.248357,1861.368 667.29369,1861.368 C668.360357,1861.368 669.288357,1861.10133 670.07769,1860.568 C670.867024,1860.03467 671.48569,1859.29867 671.93369,1858.36 C672.38169,1857.42133 672.60569,1856.344 672.60569,1855.128 C672.60569,1853.89067 672.38169,1852.808 671.93369,1851.88 C671.48569,1850.952 670.867024,1850.22133 670.07769,1849.688 C669.288357,1849.15467 668.360357,1848.888 667.29369,1848.888 Z M714.75369,1848.888 C713.708357,1848.888 712.780357,1849.17067 711.96969,1849.736 C711.159024,1850.30133 710.519024,1851.08533 710.04969,1852.088 C709.580357,1853.09067 709.34569,1854.25333 709.34569,1855.576 L709.34569,1855.576 L709.34569,1857.592 L709.447468,1857.87011 C709.841838,1858.87315 710.469246,1859.69244 711.32969,1860.328 C712.268357,1861.02133 713.34569,1861.368 714.56169,1861.368 C715.628357,1861.368 716.56169,1861.10133 717.36169,1860.568 C718.16169,1860.03467 718.791024,1859.29867 719.24969,1858.36 C719.708357,1857.42133 719.93769,1856.344 719.93769,1855.128 C719.93769,1853.912 719.719024,1852.83467 719.28169,1851.896 C718.844357,1850.95733 718.236357,1850.22133 717.45769,1849.688 C716.679024,1849.15467 715.77769,1848.888 714.75369,1848.888 Z M733.16569,1848.888 C731.843024,1848.888 730.71769,1849.35733 729.78969,1850.296 C728.86169,1851.23467 728.30169,1852.46133 728.10969,1853.976 L728.10969,1853.976 L737.90169,1853.976 C737.752357,1852.41867 737.256357,1851.18133 736.41369,1850.264 C735.571024,1849.34667 734.488357,1848.888 733.16569,1848.888 Z M609.38969,1842.36 L603.56569,1842.36 L603.56569,1850.744 L609.38969,1850.744 C610.79769,1850.744 611.90169,1850.37067 612.70169,1849.624 C613.50169,1848.87733 613.90169,1847.85333 613.90169,1846.552 C613.90169,1845.22933 613.50169,1844.2 612.70169,1843.464 C611.90169,1842.728 610.79769,1842.36 609.38969,1842.36 L609.38969,1842.36 Z M569.827523,1839.7551 L569.838416,1839.75534 C569.838416,1841.3524 569.682539,1842.30195 568.677255,1843.03873 C568.355497,1843.27403 567.799507,1843.6345 567.148489,1843.8698 C566.254903,1844.19438 565.652233,1844.77763 565.652233,1844.77763 C565.652233,1841.86722 566.095691,1840.81337 567.285194,1840.19007 C568.025443,1839.80167 569.240394,1839.75722 569.676375,1839.75438 L569.827523,1839.7551 Z' id='Combined-Shape'></path>
  </g>
  </g>
  </g>
  </g>
  </svg>`
