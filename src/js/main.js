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
    setPrtPanelDirection();
    renderPrototypePanel();
  }

  // Prototype Panel Template
  function renderPrototypePanel() {
    const prototypePanelTemplate = createPrototypePanelTemplate();
    document.body.insertAdjacentHTML('beforeend', prototypePanelTemplate);
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
    initPrtPanelEvents();
  }

  function createPrototypePanelTemplate() {
    const hasSections = _panelSections && _panelSections.length;
    return `
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
  }

  /* Create each prototype settings section (after the prototype info)
PARAMETERS: section = the relevant section */
  function createPrtPanelSection(section) {
    let { sectionNumber, sectionIsOpen } = section;
    let inputsTemplate = '';

    section.fields.forEach(field => {
      inputsTemplate += createPrtPanelInput(field);
    });

    sectionIsOpen != false ? (sectionIsOpen = 'isOpen') : (sectionIsOpen = 'isClose');
    return `
      <div class='prt-panel-section ${sectionIsOpen}' section-number='${sectionNumber}'>
        <div class='prt-panel-section-header'>
          <span>${section.sectionTitle}</span>
        </div>
        <div class='prt-panel-section-content' number='${sectionNumber}'>
          ${inputsTemplate}
        </div>
      </div>`;
  }

  /*  Create each input field - with call to 'prtPanelInputContent' function for get the relevant content.
PARAMETERS: field = the relevant field */
  function createPrtPanelInput(fieldData) {
    let { disabled, fieldName, fieldLabel, divider } = fieldData;

    disabled == true ? (disabled = ' disabled') : (disabled = '');
    let content = prtPanelInputContent(fieldData);
    let field = `
        <div class='prt-panel-field ${disabled}' name='${fieldName}' call='${fieldData.function}'>
          <label class='prt-panel-field-label'>
            ${fieldLabel}
          </label>
          ${content}
        </div>
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
              <span class='prt-thumbnails-tooltip-item' 
                    count='${i + 1}' 
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
  function changesSliderWidth(name, currentVal) {
    const input = document.querySelector(`input[type='range'][name=${name}]`);
    const inputMin = input.getAttribute('min');
    const inputMax = input.getAttribute('max');
    const gapValues = inputMax - inputMin;
    const inputStep = input.getAttribute('step');
    const sumSteps = gapValues / inputStep;
    const sliderWidth = 109; // The width set for the slider
    const stepWidth = sliderWidth / sumSteps;
    const finalVal = currentVal - inputMin; // The current value is less than the initial value
    const moveSteps = finalVal / inputStep;
    const finalWidth = Math.round(moveSteps * stepWidth);

    const styleTagID = `prt-panel--${name}-styling`;
    const styling = `.prt-slider[name=${name}]::after{width:${finalWidth}px}`;
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
  };
})();

window.initPrototypePanel = PrototypePanel.initPrototypePanel;
