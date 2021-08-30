/* NOTE: This file includes the functions and the icons for creating the structure - No need to change / add. */

import { PrtArrowClose, PrtSettingsIcon, PrtCloseIcon, PrototypersLogo } from './icons.js';

const PrototypePanel = (function () {
  let _panelInfo;
  let _panelSections;

  /*  This function builds the prototype panel and appends it to the body element in your prototype's index file.
Call this function from one of your .js files in the project. */
  function initPrototypePanel(panelInfo, panelSections) {
    _panelInfo = panelInfo;
    _panelSections = panelSections;

    checkPanelInfoIsValid();
    createPrototypePanel();
  }

  function createPrototypePanel() {
    setPrtPanelDirection();
    renderPrototypePanel();
    initPrtPanelEvents();
  }

  // Prototype Panel Template
  function renderPrototypePanel() {
    const hasSections = _panelSections && _panelSections.length;
    const prototypePanelTemplate = `
    <div class='prototype-panel' panel-dir=${_panelInfo.panelDirection}>
      <div class='prt-panel-structure'>
        <header class='prt-panel-header'>
          <span class='prt-panel-title'>${_panelInfo.prototypeTitle}
            <div class='ptr-close-btn prt-panel-close'>
              <span class='prt-panel-header-actions'>
                <div class='prt-panel-close'>${PrtCloseIcon}</div>
              </span>
            </div>
          </span>
        </header>
        <div class='prt-panel-content ${!hasSections ? 'prt-only-info-content' : ''}'>
          <div class='prt-panel-section'>
            <div class='prt-panel-section-header ${
              !hasSections ? 'prt-disable-closing' : ''
            }'><span>Prototype Info</span>
            </div>
            <div class='prt-panel-section-content info-section-content'>
              <span>${_panelInfo.prototypeDescription}</span>
            </div>
          </div>
          ${hasSections && createPanelSections()}
        </div>
        <div class='prt-panel-footer'>
          <a class='by-ux-prt' href='https://www.wixwhooo.com/results?type=all&val=prototyper' target='_blank'>
          ${PrototypersLogo}
          </a>
          ${PrtArrowClose}
        </div>
      </div>
      <div class='prt-panel-tab'>${PrtSettingsIcon}</div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', prototypePanelTemplate);

    document.querySelectorAll('.prt-slider').forEach(sliderField => {
      changesSliderWidth(sliderField, sliderField.getAttribute('value'));
    });
  }

  function createPanelSections() {
    let sectionsTemplate = '';
    _panelSections.forEach(section => {
      sectionsTemplate += createPrtPanelSection(section);
    });
    return sectionsTemplate;
  }

  /* Set the prototype panel direction - the DEFAULT is right */
  function setPrtPanelDirection() {
    if (_panelInfo.panelDirection != 'right' && _panelInfo.panelDirection != 'left') {
      _panelInfo.panelDirection = 'right';
    }
  }

  /* Check if all the _panelInfo properties are valid, if not - the panel will not be created and you get error massage */
  function checkPanelInfoIsValid() {
    if (!_panelInfo) {
      console.error('[PROTOTYPE PANEL] Invalid parameters for init function, Please fix it (:');
      return false;
    }

    if (
      _panelInfo.prototypeTitle === 'undefined' ||
      _panelInfo.prototypeTitle == null ||
      _panelInfo.prototypeTitle == '' ||
      _panelInfo.prototypeDescription === 'undefined' ||
      _panelInfo.prototypeDescription == null ||
      _panelInfo.prototypeDescription == ''
    ) {
      console.error('[PROTOTYPE PANEL] Invalid title or invalid description, Please fix it (:');
      return false;
    }
    return true;
  }

  /* Create all the panel events - for the panel actions and for the inputs*/
  function initPrtPanelEvents() {
    initPrototypePanelControls();

    // open the panel (after user clicks on the tab)
    document.querySelector('.prt-panel-tab').addEventListener('click', function () {
      // caching the structure node
      const $prtPanelStructure = document.querySelector('.prt-panel-structure');

      if (!this.classList.contains('prt-panel-open')) {
        $prtPanelStructure.classList.add('prt-panel-open');
      } else {
        $prtPanelStructure.classList.remove('prt-panel-open');
      }
    });

    // open or close section
    document.querySelectorAll('.prt-panel-section-header').forEach(sectionHeader => {
      sectionHeader.addEventListener('click', function () {
        if (!sectionHeader.classList.contains('prt-disable-closing')) {
          closePrtPanelSection(sectionHeader);
        }
      });
    });
  }

  /* Create each prototype settings section (after the prototype info)
PARAMETERS: section = the relevant section */
  function createPrtPanelSection(section) {
    const { sectionNumber, sectionIsOpen } = section;
    let inputsTemplate = '';

    section.fields.forEach(field => {
      inputsTemplate += createPrtPanelInput(field);
    });

    return `
      <div class='prt-panel-section ${!!sectionIsOpen ? 'isOpen' : 'isClose'}'
           style='${!sectionIsOpen ? 'maxHeight:30px' : ''}' 
           section-number='${sectionNumber}'>
        <div class='prt-panel-section-header ${!sectionIsOpen ? 'close' : ''}'>
          <span>${section.sectionTitle}</span>
        </div>
        <div class='prt-panel-section-content ${!sectionIsOpen ? 'close' : ''}' 
             number='${sectionNumber}'>
          ${inputsTemplate}
        </div>
      </div>`;
  }

  /*  Create each input field - with call to 'prtPanelInputContent' function for get the relevant content.
PARAMETERS: field = the relevant field */
  function createPrtPanelInput(fieldData) {
    const { disabled, fieldName, fieldLabel, divider } = fieldData;

    const content = prtPanelInputContent(fieldData);
    const field = `
        <fieldset class='prt-panel-field' ${
          !!disabled ? 'disabled' : ''
        } name='${fieldName}' call='${fieldData.function}'>
          <label class='prt-panel-field-label'>
            ${fieldLabel}
          </label>
          ${content}
        </fieldset>
        ${divider ? `<div class='prt-panel-divider'></div>` : ''}
        `;

    return field;
  }

  /* Add the relevant html content for each input type
PARAMETERS: field = the relevant field  */
  function prtPanelInputContent(fieldData) {
    let content = '';

    switch (fieldData.fieldType) {
      case 'number': {
        const { fieldName, min, max, step, value, suffix, showSlider } = fieldData;
        content = `
          <div class='prt-input-number-area' style='display:flex'>
            <input type='range' class='prt-slider' 
                                name='${fieldName}' 
                                value=${value} 
                                min=${min} 
                                max=${max} 
                                step=${step} 
                                style='display:${showSlider ? 'block' : 'none'}'/>
            <div class='prt-container-input-number'>
              <input type='number' class='prt-spinner' 
                                  name='${fieldName}' 
                                  min='${min}' 
                                  max='${max}' 
                                  step='${step}' 
                                  suffix='${suffix}' 
                                  value='${value}'>
              <span class='prt-sfx-label'>${suffix}</span>
            </div>
          </div>`;
        break;
      }
      case 'toggle':
        {
          const {
            fieldName,
            option1Value,
            option1Display,
            option2Value,
            option2Display,
          } = fieldData;

          const tooltipLimit = 14;

          content = `
          <div class='prt-toggle'>
            <input class='prt-toggle-option' 
                   id='${fieldName}-0' 
                   value='${option1Value}' 
                   option='1' 
                   type='radio' 
                   name='${fieldName}' 
                   checked>
            <label class='prt-toggle-labels' for='${fieldName}-0'>
              ${option1Display}
            </label>
            <span class='prt-toggle-tooltip-option' style='opacity: ${
              option1Display.length > tooltipLimit ? 1 : 0
            }'>
              ${option1Display}
            </span>
            <input class='prt-toggle-option' 
                   id='${fieldName}-1' 
                   value='${option2Value}' 
                   option='2' 
                   type='radio' 
                   name='${fieldName}'>
            <label class='prt-toggle-labels' for='${fieldName}-1'>
              ${option2Display}
            </label>
            <span class='prt-toggle-tooltip-option right' style='opacity:${
              option2Display.length > tooltipLimit ? 1 : 0
            }'>
              ${option2Display}
            </span>
            <div class='prt-toggle-bckgrnd'></div>
          </div>`;
        }
        break;
      case 'radio-button': {
        const { fieldName, optionsBackendList, optionsDisplayList, defaultIndex } = fieldData;

        for (let i = 0; i < optionsBackendList.length; i++) {
          content += `
            <div class='prt-checkbox-container'>
              <input class='prt-circle-checkbox' 
                    type='radio' id='${fieldName}-${i}' 
                    value='${optionsBackendList[i]}' 
                    name='${fieldName}' ${i === defaultIndex ? 'checked' : ''}>
              <span class='prt-checkmark'></span>
              <label for='${fieldName}-${i}'>
                ${optionsDisplayList[i]}
              </label>
            </div>`;
        }
        break;
      }
      case 'thumbnails': {
        const {
          fieldName,
          optionsBackendList,
          iconsDisplayList,
          defaultIndex,
          labelsDisplayList,
        } = fieldData;

        const tooltipLimit = 9;

        content = `<div class='prt-thumbnails'>`;
        for (let i = 0; i < optionsBackendList.length; i++) {
          content += `
          <div class='prt-thumbnails-item'>
              <input class='prt-thumbnails-input' 
                    type='radio' 
                    value='${optionsBackendList[i]}' 
                    name='${fieldName}' 
                    id='${fieldName}-${i}' 
                    ${i === defaultIndex ? 'checked' : ''}>
              <button class='prt-thumbnails-button ${i === defaultIndex ? 'selected' : ''}' 
                      value='${optionsBackendList[i]}'>
                <img src='${iconsDisplayList[i]}'>
              </button>
              <label for='${fieldName}-${i}'>${labelsDisplayList[i]}</label>
              <span class='prt-thumbnails-tooltip-item ${
                (i + 3) % 3 == 0
                  ? 'left-prt-tooltip-item'
                  : (i + 1) % 3 == 0
                  ? 'right-prt-tooltip-item'
                  : (i + 2) % 3 == 0
                  ? 'center-prt-tooltip-item'
                  : ''
              }' 
                    style='opacity: ${labelsDisplayList[i].length > tooltipLimit ? 1 : 0}'>
                ${labelsDisplayList[i]}
              </span>
            </div>`;
        }
        content += `</div>`;
        break;
      }
    }
    return content;
  }

  /* Add or Rmove disabled from a field - include the label and all the inputs
PARAMETERS: field = the relevant field | flag = can be TRUE or FALSE */
  function disablePrtPanelField(fieldName, flag) {
    const field = document.querySelector(`.prt-panel-field[name='${fieldName}']`);
    flag ? field.setAttribute('disabled', 'disabled') : field.removeAttribute('disabled');
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
    // What happens after each non-numeric input change
    document.querySelectorAll('.prt-panel-field input').forEach(inputChanged => {
      inputChanged.addEventListener('change', function (e) {
        const inputEl = e.target;
        const selectedValue = inputEl.value;

        if (
          !inputEl.classList.contains('prt-spinner') &&
          !inputEl.classList.contains('prt-slider')
        ) {
          const theFunction = inputEl.closest(`.prt-panel-field`).getAttribute('call');
          // Call the relevant function
          window[theFunction] && window[theFunction](e, `${selectedValue}`);
        }
      });
    });

    // What happens after each numeric input change (spinner or slider)
    document.querySelectorAll('.prt-panel-field input').forEach(inputChanged => {
      inputChanged.addEventListener('input', function (e) {
        const inputEl = e.target;
        const inputFieldParent = inputEl.closest(`.prt-panel-field`);
        const selectedValue = inputEl.value;

        if (inputEl.classList.contains('prt-spinner') || inputEl.classList.contains('prt-slider')) {
          changesSliderWidth(inputEl, selectedValue);
          if (inputEl.classList.contains('prt-spinner')) {
            // need to update the slider value
            const sliderField = inputFieldParent.querySelector(`.prt-slider`);
            sliderField.value = selectedValue;
          }
          if (inputEl.classList.contains('prt-slider')) {
            // need to update the spinner value
            const spinnerField = inputFieldParent.querySelector(`.prt-spinner`);
            spinnerField.value = selectedValue;
          }
          const theFunction = inputFieldParent.getAttribute('call');
          // Call the relevant function
          window[theFunction](e, `${selectedValue}`);
        }
      });
    });
  }

  /* Update the background width of the slider after changing the value
PARAMETERS: name = for get the relevant input field, value = the selected value */
  function changesSliderWidth(sliderEl, currentVal) {
    const { name, min, max, step } = sliderEl.attributes;

    const inputName = name.value;
    const inputMin = min.value;
    const inputMax = max.value;
    const gapValues = inputMax - inputMin;
    const inputStep = step.value;
    const sumSteps = gapValues / inputStep;
    const sliderWidth = 109; // The width set for the slider
    const stepWidth = sliderWidth / sumSteps;
    const finalVal = currentVal - inputMin; // The current value is less than the initial value
    const moveSteps = finalVal / inputStep;
    const finalWidth = Math.round(moveSteps * stepWidth);

    const styleTagID = `prt-panel--${inputName}-styling`;
    const styling = `.prt-slider[name=${inputName}]::after{width:${finalWidth}px}`;
    const styleTag = document.getElementById(styleTagID);

    if (styleTag) {
      styleTag.innerHTML = styling;
    } else {
      document.head.insertAdjacentHTML(
        'beforeend',
        ` <style id="${styleTagID}">${styling}</style>`,
      );
    }
  }

  return {
    initPrototypePanel,
    disablePrtPanelField,
  };
})();

Object.assign(window, PrototypePanel);
