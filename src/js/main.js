/* NOTE: This file includes the functions and the icons for creating the structure - No need to change / add. */

/**
 * Imports
 *  */
import '../css/main.css';
import {
  PrtArrowClose,
  PrtSettingsIcon,
  PrtExportIcon,
  PrtDirIcon,
  PrtCloseIcon,
  PrtMoreIcon,
  PrototypersLogo,
} from './icons.js';

const PrototypePanel = (function() {
  /*  This function builds the prototype panel and appends it to the body element in your prototype's index file.
Call this function from one of your .js files in the project. */
  function initPrototypePanel(panelInfo, panelSections) {
    if (panelInfo != null) {
      setPrtPanelDirection(panelInfo);

      // Prototype Panel Template
      let prototypePanelTemplate = `<div class='prototype-panel' panel-dir=${panelInfo.panelDirection}>
        <div class='prt-panel-structure'>
          <header class='prt-panel-header'>
            <span class='prt-panel-title'>${panelInfo.prototypeTitle}
            <div class='ptr-close-btn prt-panel-close'>
            <span class='prt-panel-header-actions'>
            <div class='prt-panel-close'>${PrtCloseIcon}</div>
            </span>
            </div>
            </span>
          </header>
          <div class='prt-panel-content'>
            <div class='prt-panel-section'>
              <div class='prt-panel-section-header'><span>Prototype Info</span>
              </div>
              <div class='prt-panel-section-content info-section-content'>
                <span>${panelInfo.prototypeDescription}</span>
              </div>
            </div>
          </div>
          <div class='prt-panel-footer'>
            <a class='by-ux-prt' href='https://www.wixwhooo.com/results?type=all&val=prototyper' target='_blank'>
            ${PrototypersLogo}
            </a>${PrtArrowClose}
          </div>
        </div>
        <div class='prt-panel-tab'>${PrtSettingsIcon}</div>
      </div>`;

      if (validatePrtPanelInfo(panelInfo)) {
        document.body.insertAdjacentHTML('beforeend', prototypePanelTemplate);
        if (panelSections != null) {
          panelSections.forEach(section => {
            createPrtPanelSection(section);
          });
          document
            .querySelectorAll('.prt-panel-section.isClose .prt-panel-section-header')
            .forEach(closeSection => {
              closePrtPanelSection(closeSection);
            });
          document.querySelectorAll('.prt-panel-field.disabled').forEach(disabledField => {
            disablePrtPanelField(disabledField.getAttribute('name'), true);
          });
          document.querySelectorAll('.prt-slider').forEach(sliderField => {
            changesSliderWidth(sliderField.getAttribute('name'), sliderField.getAttribute('value'));
          });
        } else {
          // section is empty
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
    document.querySelector('.prt-panel-tab').addEventListener('click', function () {
      if (!this.classList.contains('prt-panel-open')) {
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
    document.querySelectorAll('.prt-panel-close').forEach(closeBtn => {
      closeBtn.addEventListener('click', function () {
        document.querySelector('.prt-panel-tab').classList.remove('prt-panel-open');
        document.querySelector('.prt-panel-structure').classList.remove('prt-panel-open');
      });
    });

    // open or close section
    document.querySelectorAll('.prt-panel-section-header').forEach(sectionHeader => {
      if (!sectionHeader.classList.contains('prt-disable-closing')) {
        sectionHeader.addEventListener('click', function () {
          closePrtPanelSection(sectionHeader);
        });
      }
    });

    // set position for each thumbnail tooltip - left / center / right
    document.querySelectorAll('.prt-thumbnails-tooltip-item').forEach(thumbnailTooltip => {
      let i = thumbnailTooltip.getAttribute('count');
      if ((i + 2) % 3 == 0) {
        // left items
        thumbnailTooltip.style.left = '-5px';
      }
      if ((i + 1) % 3 == 0) {
        // center items
        thumbnailTooltip.classList.add('center-prt-tooltip-item');
      }
      if (i % 3 == 0) {
        // right items
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
    let newSection = '';
    let { sectionNumber, sectionIsOpen } = section;

    sectionIsOpen != false ? (sectionIsOpen = 'isOpen') : (sectionIsOpen = 'isClose');
    newSection = `<div class='prt-panel-section ${sectionIsOpen}' section-number='${sectionNumber}'>
  <div class='prt-panel-section-header'><span>${section.sectionTitle}</span></div>
  <div class='prt-panel-section-content' number='${sectionNumber}'></div>
  </div>`;
    document.querySelector('.prt-panel-content').insertAdjacentHTML('beforeend', newSection);
    section.fields.forEach(field => {
      let inputField = '';
      inputField = createPrtPanelInput(field);
      document
        .querySelector(`[number='${sectionNumber}']`)
        .insertAdjacentHTML('beforeend', inputField);
    });
  }

  /*  Create each input field - with call to 'prtPanelInputContent' function for get the relevant content.
PARAMETERS: field = the relevant field */
  function createPrtPanelInput(field) {
    let newSetting = '';
    let { disabled } = field;

    disabled == true ? (disabled = ' disabled') : (disabled = '');
    let content = prtPanelInputContent(field);
    newSetting = `<div class='prt-panel-field${disabled}' name='${field.fieldName}' call='${field.function}'><label class='prt-panel-field-label'>${field.fieldLabel}</label>${content}</div>`;
    field.divider ? (newSetting = newSetting + `<div class='prt-panel-divider'></div>`) : '';
    return newSetting;
  }

  /* Add the relevant html content for each input type
PARAMETERS: field = the relevant field  */
  function prtPanelInputContent(field) {
    let content = '';
    let opacity1;
    let opacity2;
    let checked;
    let selected;
    let displaySlider;

    switch (field.fieldType) {
      case 'number':
        field.showSlider ? (displaySlider = 'block') : (displaySlider = 'none');
        content = `<div class='prt-input-number-area' style='display:flex'>
    <input type='range' class='prt-slider' name='${field.fieldName}' value=${field.value} min=${field.min} max=${field.max} step=${field.step} style='display:${displaySlider}'/>
    <div class='prt-container-input-number'><input type='number' class='prt-spinner' name='${field.fieldName}' min='${field.min}' max='${field.max}' step='${field.step}' suffix='${field.suffix}' value='${field.value}'>
    <span class='prt-sfx-label'>${field.suffix}</span></div>
    </div>`;
        break;
      case 'toggle':
        field.option1Display.length > 14 ? (opacity1 = 1) : (opacity1 = 0);
        field.option2Display.length > 14 ? (opacity2 = 1) : (opacity2 = 0);
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
        for (let i = 0; i < field.optionsBackendList.length; i++) {
          i == field.defaultIndex ? (checked = 'checked') : (checked = '');
          content += `<div class='prt-checkbox-container'><input class='prt-circle-checkbox' type='radio' id='${field.fieldName}-${i}' value='${field.optionsBackendList[i]}' name='${field.fieldName}' ${checked}>
      <span class='prt-checkmark'></span>
      <label for='${field.fieldName}-${i}'>${field.optionsDisplayList[i]}</label>
      </div>`;
        }
        break;
      case 'thumbnails':
        content = `<div class='prt-thumbnails'>`;
        for (let i = 0; i < field.optionsBackendList.length; i++) {
          i == field.defaultIndex ? (selected = 'selected') : (selected = '');
          i == field.defaultIndex ? (checked = 'checked') : (checked = '');
          field.labelsDisplayList[i].length > 9 ? (opacity2 = 1) : (opacity2 = 0);
          content += `<div class='prt-thumbnails-item'>
      <input class='prt-thumbnails-input' type='radio' value='${
        field.optionsBackendList[i]
      }' name='${field.fieldName}' id='${field.fieldName}-${i}' ${checked}>
      <button class='prt-thumbnails-button ${selected}' value='${
            field.optionsBackendList[i]
          }'><img src='${field.iconsDisplayList[i]}'></button>
      <label for='${field.fieldName}-${i}'>${field.labelsDisplayList[i]}</label>
      <span class='prt-thumbnails-tooltip-item' count='${i + 1}' style='opacity: ${opacity2}'>${
            field.labelsDisplayList[i]
          }</span>
      </div>`;
        }
        content += `</div>`;
        break;
    }
    return content;
  }

  /* Add or Rmove disabled from a field - include the label and all the inputs
PARAMETERS: field = the relevant field | flag = can be TRUE or FALSE */
  function disablePrtPanelField(fieldName, flag) {
    let field = document.querySelector(`.prt-panel-field[name='${fieldName}']`);
    field.classList.toggle('disabled', flag);
    field.querySelector('.prt-panel-field-label').classList.toggle('disabled', flag);
    field.querySelectorAll('input').forEach(disabledInput => {
      flag
        ? disabledInput.setAttribute('disabled', 'disabled')
        : disabledInput.removeAttribute('disabled');
    });

    window.disablePrtPanelField = disablePrtPanelField;
  }

  /* Close or open section
PARAMETERS: section = the relevant section */
  function closePrtPanelSection(section) {
    if (section.classList.contains('close')) {
      section.parentNode.style.maxHeight = '2000px';
      section.classList.remove('close');
      section.nextElementSibling.classList.remove('close');
      // section.nextElementSibling.children.classList.remove('close');
    } else {
      section.classList.add('close');
      section.nextElementSibling.classList.add('close');
      section.parentNode.style.maxHeight = '30px';
    }
  }

  /* Call the relvant function after changing the input. You are responsible for the implementation of this function.
For numeric input - this function also update the spinner / slider with the current value and change the background width of the slider */
  function initPrototypePanelControls() {
    let selectedValue;

    // What happens after each non-numeric input change
    document.querySelectorAll('.prt-panel-field input').forEach(inputChanged => {
      inputChanged.addEventListener('change', function (e) {
        let name = e.target.getAttribute('name');
        if (
          !e.target.classList.contains('prt-spinner') &&
          !e.target.classList.contains('prt-slider')
        ) {
          e.target.classList.contains('prt-spinner') || e.target.classList.contains('prt-slider')
            ? (selectedValue = e.target.value)
            : (selectedValue = document
                .querySelector(`input[name='${name}']:checked`)
                .getAttribute('value'));
          const theFunction = document
            .querySelector(`.prt-panel-field[name='${name}']`)
            .getAttribute('call');
          // Call the relevant function
          window[theFunction] && window[theFunction](`${name}`, `${selectedValue}`);
        }
      });
    });

    // What happens after each numeric input change (spinner or slider)
    document.querySelectorAll('.prt-panel-field input').forEach(inputChanged => {
      let selectedValue;

      inputChanged.addEventListener('input', function (e) {
        let name = e.target.getAttribute('name');
        if (
          e.target.classList.contains('prt-spinner') ||
          e.target.classList.contains('prt-slider')
        ) {
          selectedValue = e.target.value;
          changesSliderWidth(name, selectedValue);
          if (e.target.classList.contains('prt-spinner')) {
            // need to update the slider value
            let sliderField = document.querySelector(`.prt-slider[name='${name}']`);
            sliderField.value = selectedValue;
          }
          if (e.target.classList.contains('prt-slider')) {
            // need to update the spinner value
            let spinnerField = document.querySelector(`.prt-spinner[name='${name}']`);
            spinnerField.value = selectedValue;
          }
          const theFunction = document
            .querySelector(`.prt-panel-field[name='${name}']`)
            .getAttribute('call');
          // Call the relevant function
          window[theFunction](`${name}`, `${selectedValue}`);
        }
      });
    });
  }

  /* Update the background width of the slider after changing the value
PARAMETERS: name = for get the relevant input field, value = the selected value */
  function changesSliderWidth(name, value) {
    let input = document.querySelector(`input[type='range'][name=${name}]`);
    let inputMin = input.getAttribute('min');
    let inputMax = input.getAttribute('max');
    let gapValues = inputMax - inputMin;
    let inputStep = input.getAttribute('step');
    let sumSteps = gapValues / inputStep;
    let sliderWidth = 109; // The width set for the slider
    let stepWidth = sliderWidth / sumSteps;
    let currentVal = value;
    let finalVal = currentVal - inputMin; // The current value is less than the initial value
    let moveSteps = finalVal / inputStep;
    let finalWidth = moveSteps * stepWidth;
    document.head.insertAdjacentHTML(
      'beforeend',
      `<style>.prt-slider[name=${name}]::after{width:${finalWidth}px}</style>`,
    );
  }

  return {
    initPrototypePanel
  };
})();

window.initPrototypePanel = PrototypePanel.initPrototypePanel;
