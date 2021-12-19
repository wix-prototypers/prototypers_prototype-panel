/* NOTE: This file includes the functions and the icons for creating the structure - No need to change / add. */
// import '../css/main.css';

/*  This function builds the prototype panel and appends it to the body element in your prototype's index file.
Call this function from one of your .js files in the project. */
function initPrototypePanel(panelInfo, panelSections) {
  if(document.querySelector('.prototype-panel')) { // single panel
    return false;
  }

  const _panelInfo = panelInfo;
  const _panelSections = panelSections;

  if(validatePrtPanelInfo(_panelInfo)) {
    setPrtPanelDirection(_panelInfo);
    let hasSections = _panelSections && _panelSections.length; // there are interactive sections

    // Prototype Panel Template
    const prototypePanelTemplate =
    `<div class='prototype-panel' panel-dir=${_panelInfo.panelDirection}>
      <span class="prt-panel-tooltip prt-header-tooltip" for="dir">Dock to Left</span>
      <span class="prt-panel-tooltip prt-header-tooltip" for="hide">Toggle Panel (⇧+H)</span>
      <span class="prt-panel-tooltip prt-header-tooltip" for="minimize">Minimize</span>
      <div class="prt-panel-bar">
        <div class="prt-panel-bar-actions">
          <div class="prt-panel-bar-icon" data-title="Share Prototype">
            <span>Share</span>
          </div>
          <div class="prt-panel-bar-icon" data-title="Prototype Settings">
            <span>Settings</span>
          </div>
          <div class="prt-panel-bar-icon" data-title="Prototype Info">
            <span>Info</span>
          </div>
        </div>
        <div class="prt-panel-bar-main-logo">${prtMainLogo}</div>
      </div>
      <div class="prt-panel-content">
        <div class="prt-panel-header">
          <span class="prt-panel-title">Prototype Info</span>
          <div class="prt-panel-header-actions">
            <span class="prt-header-icon prt-panel-dir-btn" tooltip="dir">${prtDirIcon}</span>
            <span class="prt-header-icon prt-panel-hide-btn" tooltip="hide">${prtHideIcon}</span>
            <span class="prt-header-icon prt-panel-minimize-btn" tooltip="minimize">${prtMinimizeIcon}</span>
          </div>
        </div>
      <div class="prt-panel-section prt-overview prt-show-section" data-section="Prototype Info">
        <div>
          <div class="prt-overview-title">description</div>
          <div class="prt-overview-paragraph">${_panelInfo.prototypeDescription}</div>
          <div class="prt-panel-divider"></div>
          <div class="prt-overview-title">how to use</div>
          <div class="prt-overview-paragraph">${_panelInfo.prototypeDescription}</div>
          <div class="prt-panel-divider"></div>
          <div class="prt-overview-paragraph prt-signature">Made with ${prtHeart} by&nbsp <a class="by-ux-prt" target="_blank" href="https://www.wixwhooo.com/results?type=all&val=prototyper">UX Prototypers</a></div>
        </div>
      </div>
      <div class="prt-panel-section prt-share-prototype prt-hide prt-show-section" data-section="Share Prototype">
        <div>
          <div class="prt-overview-title">Get shareable Link</div>
          <div class="prt-overview-paragraph prt-share-paragraph">Use the following link to share the prototype with its current settings.</div>
          <div class="prt-panel-divider"></div>
          <div class="prt-show-hide-container" style="margin-bottom: 22px;">
            <div class="prt-section-label">Show this panel when the prototype is loaded.</div>
            <label class="prt-small-toggle">
              <input type="checkbox" checked name="select-share-without-panel" id="share-with-panel">
              <span class="prt-small-toggle-round"><span class="prt-small-toggle-circle"></span></span>
            </label>
          </div>
          <label class="prt-recommend-label">Turn it off for usability testing or presentation.</label>
          <div class="new-link-container">
            <input type="text" autofocus readonly class="prt-text-input prt-share-link-input prt-unchecked-input" style="width: 186px; margin-right: 9px;" value="https://wix-prototypers.github.io/prototypers_prototype-panel/example/index.html" style="padding-right: 0;">
            <div class="copy-btn">
              ${prtCopyIcon}
              ${prtCopiedIcon}
              <span class="copy-loader" icon="refresh">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
              <span class="prt-panel-tooltip" style="/* opacity: 0 */">Copy</span>
            </div>
          </div>
          <div class="prt-share-actions" style="display: unset;">
            <button class="prt-panel-button prt-open-tab-btn test-tab-btn" skin="text">Open in New Tab</button>
          </div>
        </div>
      </div>
      <div class="prt-panel-section prt-customization prt-show-section" data-section="Prototype Settings">
      </div>
      </div>
      <div class="prt-show-panel-note">If you need me, press ⇧+H</div>
    </div>`


    // `<div class='prototype-panel' panel-dir=${_panelInfo.panelDirection}>
    // <div class='prt-panel-structure'>
    // <header class="prt-panel-header">
    //         <span class="prt-panel-title">${_panelInfo.prototypeTitle}
    //         <div class="ptr-close-btn prt-panel-close">
    //         <span class="prt-panel-header-actions">
    //         <div class='prt-panel-close'>${prtCloseIcon}</div>
    //         </span>
    //         </div>
    //         </span>
    //       </header>
    // <div class='prt-panel-content ${!hasSections ? 'prt-only-info-content' : ''}'>
    // <div class='prt-panel-section'>
    // <div class='prt-panel-section-header ${!hasSections ? 'prt-disable-closing' : ''}'><span>Prototype Info</span>
    // </div>
    // <div class='prt-panel-section-content info-section-content'>
    // <span>${_panelInfo.prototypeDescription}</span>
    // </div>
    // </div>
    // ${hasSections ? createPrtPanelSections(_panelSections) : ''}
    // </div>
    // <div class='prt-panel-footer'>
    // <a class='by-ux-prt' href='https://www.wixwhooo.com/results?type=all&val=prototyper' target='_blank'>
    // ${prototypersLogo}
    // </a>${prtArrowClose}
    // </div>
    // </div>
    // <div class='prt-panel-tab'>${prtSettingsIcon}</div>
    // </div>`;

    document.body.insertAdjacentHTML('beforeend', prototypePanelTemplate);
    if (hasSections) {
      document.querySelectorAll('.prt-panel-section.isClose .prt-panel-section-header').forEach((closeSection) => {
        closePrtPanelSection(closeSection)
      });
      document.querySelectorAll('.prt-slider').forEach((sliderField) => {
        changesSliderWidth(sliderField, sliderField.getAttribute('value'));
      });
    }
    initPrtPanelEvents(); // add all click and change events of the panel
    updateInputsFromURL(); // update the panel with the URL parameters
  }
}

/* Set the prototype panel direction - the DEFAULT is right */
function setPrtPanelDirection(panelInfo) {
  if (panelInfo.panelDirection != 'right' && panelInfo.panelDirection != 'left') {
    panelInfo.panelDirection = 'right';
  }
}

/* Check if all the panelInfo properties are valid, if not - the panel will not be created and you get error massage */
function validatePrtPanelInfo(panelInfo) {
  if (!panelInfo) {
    console.error('[PROTOTYPE PANEL] Invalid parameters for init function, Please fix it (:');
    return false;
  }
  if (
    panelInfo.prototypeTitle === 'undefined' ||
    panelInfo.prototypeTitle == null ||
    panelInfo.prototypeTitle == '' ||
    panelInfo.prototypeDescription === 'undefined' ||
    panelInfo.prototypeDescription == null ||
    panelInfo.prototypeDescription == ''
  ) {
    console.error('[PROTOTYPE PANEL] Invalid title or invalid description, Please fix it (:');
    return false;
  }
  return true;
}

/* Create the interactive content (all the sections)
PARAMETERS: panelSections - your sections object */
function createPrtPanelSections(panelSections) {
  let sectionsTemplate = '';
  panelSections.forEach(section => {
    sectionsTemplate += createPrtPanelSection(section);
  });
  return sectionsTemplate;
}

/* Create each interactive section (after the prototype info)
PARAMETERS: section = the relevant section */
function createPrtPanelSection(section) {
  let { sectionNumber, sectionIsOpen, sectionTitle } = section;
  let inputsTemplate = '';
  let newSection = '';
  section.fields.forEach(field => {
    inputsTemplate += createPrtPanelInput(field);
  });
  newSection = `<div class='prt-panel-section ${sectionIsOpen != false ? 'isOpen' : 'isClose'}' section-number='${sectionNumber}'>
  <div class='prt-panel-section-header'><span>${sectionTitle}</span></div>
  <div class='prt-panel-section-content' number='${sectionNumber}'>
  ${inputsTemplate}
  </div>
  </div>`;
  return newSection;
}

/*  Create each input field - with call to 'prtPanelInputContent' function for get the relevant content.
PARAMETERS: field = the relevant field */
function createPrtPanelInput(fieldData) {
  let { disabled, fieldName, fieldLabel, divider, callback } = fieldData;
  disabled == true ? (disabled = ' disabled') : (disabled = ''); // disabled field ?
  let fieldContent = prtPanelInputContent(fieldData);
  let newField = `<fieldset class='prt-panel-field' ${disabled} name='${fieldName}' call='${callback}'>
  <label class='prt-panel-field-label'>${fieldLabel}</label>
  ${fieldContent}
  </fieldset>
  ${divider ? `<div class='prt-panel-divider'></div>` : ''}`;
  return newField;
}

/* Add the relevant html content for each input type
PARAMETERS: field = the relevant field  */
function prtPanelInputContent(fieldData) {
  let content = '';
  let opacity1;
  let opacity2;
  // let option1Checked;
  // let option2Checked;
  let checked;
  let selected;

  let opacityInput = '100';

  switch (fieldData.fieldType) {
    case 'number': {
      const { fieldName, min, max, step, value, suffix, showSlider } = fieldData;
      content = `<div class='prt-input-number-area' style='display:flex'>
      <input type='range' class='prt-slider prt-unchecked-input' name='${fieldName}' value=${value} min=${min} max=${max} step=${step} style='display:${showSlider ? 'block' : 'none'}'/>
      <div class='prt-container-input-number'><input type='number' class='prt-spinner prt-unchecked-input' name='${fieldName}' min='${min}' max='${max}' step='${step}' suffix='${suffix}' value='${value}'>
      <span class='prt-sfx-label'>${suffix}</span></div>
      </div>`;
      break;
    }
    case 'toggle': {
      const { fieldName, option1Value, option1Display, option2Value, option2Display, defaultOption } = fieldData;
      const tooltipWordsLimit = 13;
      content = `<div class='prt-toggle'>
      <input class='prt-toggle-option' id='${fieldName}-0' value='${option1Value}' option='1' type='radio' name='${fieldName}' ${defaultOption == 2 ? '': 'checked'}>
      <label class='prt-toggle-labels' for='${fieldName}-0'>${option1Display}</label>
      <span class='prt-toggle-tooltip-option' style='opacity: ${option1Display.length > tooltipWordsLimit ? 1 : 0}'>${option1Display}</span>
      <input class='prt-toggle-option' id='${fieldName}-1' value='${option2Value}' option='2' type='radio' name='${fieldName}' ${defaultOption == 2 ? 'checked': ''}>
      <label class='prt-toggle-labels' for='${fieldName}-1'>${option2Display}</label>
      <span class='prt-toggle-tooltip-option right' style='opacity: ${option2Display.length > tooltipWordsLimit ? 1 : 0}'>${option2Display}</span>
      <div class='prt-toggle-bckgrnd'></div>
      </div>`;
      break;
    }
    case 'radio-button': {
      const { fieldName, optionsBackendList, optionsDisplayList, defaultIndex } = fieldData;
      for (let i = 0; i < optionsBackendList.length; i++) {
        i == defaultIndex ? checked = 'checked' : checked = '';
        content += `<div class='prt-checkbox-container'><input class='prt-circle-checkbox' type='radio' id='${fieldName}-${i}' value='${optionsBackendList[i]}' name='${fieldName}' ${checked}>
        <span class='prt-checkmark'></span>
        <label for='${fieldName}-${i}'>${optionsDisplayList[i]}</label>
        </div>`;
      }
      break;
    }
    case 'thumbnails': {
      const { fieldName, optionsBackendList, iconsDisplayList, defaultIndex, labelsDisplayList } = fieldData;
      const tooltipWordsLimit = 8;
      content = `<div class='prt-thumbnails'>`
      for (let i = 0; i < optionsBackendList.length; i++) {
        i == defaultIndex ? selected = 'selected' : selected = '';
        i == defaultIndex ? checked = 'checked' : checked = '';
        // set position for each thumbnail tooltip - left / center / right
        let classItemPosition = `${(i + 3) % 3 == 0 ? 'left-prt-tooltip-item' :
        (i + 2) % 3 == 0 ? 'center-prt-tooltip-item' :
        (i + 1) % 3 == 0 ? 'right-prt-tooltip-item' : ''}`;
        content += `<div class='prt-thumbnails-item'>
        <input class='prt-thumbnails-input' type='radio' value='${optionsBackendList[i]}' name='${fieldName}' id='${fieldName}-${i}' ${checked}>
        <button class='prt-thumbnails-button ${selected}' value='${optionsBackendList[i]}'><img src='${iconsDisplayList[i]}'></button>
        <label for='${fieldName}-${i}'>${labelsDisplayList[i]}</label>
        <span class='prt-thumbnails-tooltip-item ${classItemPosition}' style='opacity: ${labelsDisplayList[i].length > tooltipWordsLimit ? 1 : 0}'>${labelsDisplayList[i]}</span>
        </div>`;
      }
      content += `</div>`;
      break;
    }
    case 'text': {
      const { fieldName, currentValue } = fieldData;
      content = `<div class='prt-text'>
      <input class='prt-text-input prt-unchecked-input' value='${currentValue}' type='text' name='${fieldName}'>
      </div>`;
      break;
    }
    case 'button': {
      const { fieldName, currentValue } = fieldData;
      content = `<div class='prt-button'>
      <input class='prt-button-input' value='${currentValue}' type='button' name='${fieldName}'>
      </div>`;
      break;
    }
    case 'color': {
      const { fieldName, colorOptions, defaultIndex } = fieldData;
      content = `<div class='prt-color'>
      <div class='prt-text-input prt-color-picker' name='${fieldName}' style='background:${colorOptions[defaultIndex].color}'>
      <div class='prt-color-chevron'></div>
      <div class='prt-color-picker-content'>`;
      for (let i = 0; i < colorOptions.length; i++) {
        i == defaultIndex ? selected = 'selected' : selected = '';
        i == defaultIndex ? checked = 'checked' : checked = '';
        content += `<div class='prt-color-item'><input class='prt-color-input' type='radio' value='${colorOptions[i].color}' opacityValue='${colorOptions[i].opacity ? colorOptions[i].opacity : '100'}' name='${fieldName}' id='${fieldName}-${i}' ${checked}>
        <span class='prt-color-circle ${selected}' style='background:${colorOptions[i].color}'></span></div>`;
      }
      content += `</div></div>
      <input class='prt-text-input prt-color-code' value='${colorOptions[defaultIndex].color}' type='text' name='${fieldName}' readonly>
      <div class='prt-container-input-number'><input type='number' class='prt-spinner prt-opacity-input prt-unchecked-input' name='${fieldName}' min='0' max='100' step='1' suffix='%' value='${colorOptions[defaultIndex].opacity ? colorOptions[defaultIndex].opacity : '100'}'>
      <span class='prt-sfx-label'>%</span></div></div>`;
      break;
    }
  }
  return content;
};



/* Create all the panel events - for the panel actions and for the inputs*/
function initPrtPanelEvents() {
  initPrototypePanelControls();

  // Navigation between the tabs - each tab will open the relevant section
  document.querySelectorAll(".prt-panel-bar-icon").forEach((icon) => {
  icon.addEventListener("click", function() {
    document.querySelector(`.prt-panel-content`).classList.remove('prt-content-min-height');
    let theRelevantSection = icon.getAttribute('data-title');
    if (this.classList.contains("prt-panel-icon-selected")) {
      this.classList.remove("prt-panel-icon-selected");
    } else {
      document.querySelectorAll(".prt-panel-bar-icon").forEach((icon) => {
        icon.classList.remove("prt-panel-icon-selected");
      });
      this.classList.add("prt-panel-icon-selected");
    }
    document.querySelector('.prototype-panel').classList.add('prt-panel-open');
    document.querySelectorAll(".prt-panel-section").forEach((section) => {
      section.classList.add("prt-hide-section");
    });
    document.querySelector(`.prt-panel-title`).classList.add('prt-hide-section');
    setTimeout(function() {
      document.querySelectorAll(".prt-panel-section").forEach((section) => {
        section.classList.add("prt-hide");
        document.querySelector(`[data-section="${theRelevantSection}"]`).classList.remove('prt-hide');
      });
    }, 80);
    setTimeout(function() {
      document.querySelector(`[data-section="${theRelevantSection}"]`).classList.remove('prt-hide-section');
      document.querySelector(`[data-section="${theRelevantSection}"]`).classList.add('prt-show-section');
      document.querySelector('.prt-panel-title').innerHTML = theRelevantSection;
      document.querySelector(`.prt-panel-title`).classList.remove('prt-hide-section');
      document.querySelector(`.prt-panel-title`).classList.add('prt-show-section');
    }, 100);
    if (theRelevantSection == "Share Prototype") {
      let input = document.querySelector('.prt-share-link-input');
      setTimeout(function() {
        input.focus();
        input.select();
      }, 200);
    }
    setTimeout(function() {
      if (theRelevantSection == "Prototype Settings") {
        var sectionHeight = equalHeight(".prt-customization");
        if(sectionHeight > 500) {
          document.querySelector(`.prt-panel-content`).classList.add('prt-content-min-height');
        }
      }
    }, 200);
  });
});

// Gnerate a new link after changes and set it into the input field
document.querySelectorAll('.prt-panel-bar-icon[data-title="Share Prototype"]').forEach((saveBtn) => {
  saveBtn.addEventListener('click', function() {
    let values = '';
    let url = window.location.href; // print the url
    // get the all values
    if(informative) {
      document.querySelector('.prt-share-link-input').value = url;
      document.querySelector('.prt-circle-checkbox[name="select-share-without-panel"]').checked = false;
      document.querySelector('.prt-circle-checkbox[name="select-share-without-panel"]').dispatchEvent(new Event('change'));
    } else {
      document.querySelectorAll('.prt-panel-field input').forEach((input) => {
        if (input.checked || input.classList.contains('prt-unchecked-input')) {
          values = values + '&' + input.name + `${input.classList.contains('prt-opacity-input') ? '[opacity]' : ''}` + '=' + input.value.replace('#', '@_>');
        }
      });
      document.querySelector('.prt-share-link-input').value = url.split('?newVersion')[0] + '?newVersion' + values;
    }
  });
});

// Hide or show the panel in the new link (new prototype version) - after change the input there is a animation on the copy button
// and the link changes
document.querySelectorAll('[type="checkbox"][name="select-share-without-panel"]').forEach((shareCheckbox) => {
  shareCheckbox.addEventListener('change', function() {
    // loader animation in the button
    document.querySelector('.copy-btn').classList.add('refresh');
    setTimeout(function() {
      document.querySelector('.copy-btn').classList.remove('refresh');
    }, 500);
    let newLink = document.querySelector('.prt-share-link-input').value;
    if (!shareCheckbox.checked) {
      newLink = newLink + '?prt-hide';
    } else {
      newLink = newLink.replace('?prt-hide', '');
    }
    document.querySelector('.prt-share-link-input').value = newLink;
    let input = document.querySelector('.prt-share-link-input');
    setTimeout(function() {
      input.focus();
      input.select();
    }, 500);
  });
});

// When clicking the new link input - the text will be selected and focused
document.querySelector('.prt-share-link-input').addEventListener("click", function() {
  this.focus();
  this.select();
});

// Copy the new link to clipboard
document.querySelectorAll('.copy-btn').forEach((copyBtn) => {
  copyBtn.addEventListener('click', function() {
    copyBtn.classList.add('copied');
    setTimeout(function() {
      copyBtn.classList.remove('copied');
    }, 1000);
    copyShareableLink()
  });
});

// Open the new link in new tab - take the value from the link input field
document.querySelectorAll('.prt-open-tab-btn').forEach((newTabBtn) => {
  newTabBtn.addEventListener('click', function() {
    let url = window.location.href;
    setTimeout(function() {
      window.open(document.querySelector('.prt-share-link-input').value, '_blank');
      window.focus();
    }, 500);
  });
});

document.querySelectorAll('.prt-header-icon').forEach((headerBtn) => {
  headerBtn.addEventListener('click', function() {
   document.querySelector(`.prt-panel-content`).classList.remove('prt-content-min-height');
  });
});

// Show the header tooltip on hover
document.querySelectorAll('.prt-header-icon').forEach((headerBtn) => {
  headerBtn.addEventListener('mouseenter', function() {
    let tooltip = headerBtn.getAttribute('tooltip');
    document.querySelector(`.prt-header-tooltip[for="${tooltip}"]`).classList.add('prt-show-tooltip');
  });
});
document.querySelectorAll('.prt-header-icon').forEach((headerBtn) => {
  headerBtn.addEventListener('mouseout', function() {
    document.querySelectorAll(`.prt-header-tooltip`).forEach((tooltip) => { tooltip.classList.remove('prt-show-tooltip'); });
  });
});

// Minimize the panel
document.querySelector('.prt-panel-minimize-btn').addEventListener("click", function() {
  document.querySelectorAll(".prt-panel-bar-icon").forEach((icon) => {
    icon.classList.remove("prt-panel-icon-selected");
  });
  document.querySelector('.prototype-panel').classList.remove('prt-panel-open');
});

// Hide the panel from the header icon
document.querySelector('.prt-panel-hide-btn').addEventListener("click", function() {
  document.querySelectorAll(".prt-panel-bar-icon").forEach((icon) => {
    icon.classList.remove("prt-panel-icon-selected");
  });
  document.querySelector('.prototype-panel').classList.remove('prt-panel-open');
  document.querySelector('.prototype-panel').classList.add('prototype-panel-hidden');
});

// Hide the panel with shortcut Keys (shift + h)
document.addEventListener('keyup', (e) => {
    if ((e.shiftKey && e.which == 72)) {
      let panel = document.querySelector('.prototype-panel');
      document.querySelector('.prt-panel-minimize-btn').dispatchEvent(new MouseEvent('click'));
      setTimeout(function() {
      if (panel.classList.contains('prototype-panel-hidden')) {
        panel.classList.remove('prototype-panel-hidden');
      } else {
        panel.classList.add('prototype-panel-hidden');
      }
    }, 100);
    }
  });

  // Change the panel direction - change the tooltip content and rotate the icon
  document.querySelector('.prt-panel-dir-btn').addEventListener("click", function() {
    document.querySelector('.prt-panel-bar').classList.add('non-animation');
    // setTimeout(function() {
    let currentDir = document.querySelector('.prototype-panel').getAttribute('panel-dir');
    let changeDir = '';
    currentDir == "left" ? changeDir = "right" : changeDir = "left";
    document.querySelector('.prototype-panel').classList.add('change-dir');
    document.querySelector('.prt-header-tooltip').innerHTML = `Dock to ${currentDir[0].toUpperCase()}${currentDir.substring(1)}`
    // document.querySelector('.prt-panel-dir-btn > img').setAttribute('src', `./images/header-move-${currentDir}.svg`);
    document.querySelector('.prototype-panel').setAttribute('panel-dir', changeDir);
    setTimeout(function() {
      document.querySelector('.prt-panel-bar').classList.remove('non-animation');
      document.querySelector('.prototype-panel').classList.remove('change-dir');
    }, 1000);
  });

  // Clicking on the main logo - close the panel if it is open OR open the info tab by default
  document.querySelector('.prt-panel-bar-main-logo').addEventListener("click", function() {
    document.querySelector(`.prt-panel-content`).classList.remove('prt-content-min-height');
    if (document.querySelector('.prototype-panel').classList.contains('prt-panel-open')) {
      document.querySelectorAll(".prt-panel-bar-icon").forEach((icon) => {
        icon.classList.remove("prt-panel-icon-selected");
      });
      document.querySelector('.prototype-panel').classList.remove('prt-panel-open')
    } else {
      document.querySelector('.prt-panel-bar-icon[data-title="Prototype Info"]').dispatchEvent(new MouseEvent('click'));
    }
  });

  document.querySelectorAll('.prt-panel-section.isClose .prt-panel-section-header').forEach((closeSection) => {
   closePrtPanelSection(closeSection)
  });

  // Open or close section
  document.querySelectorAll('.prt-panel-section-header').forEach((sectionHeader) => {
    if (!sectionHeader.classList.contains('prt-disable-closing')) {
      sectionHeader.addEventListener('click', function() {
        closePrtPanelSection(sectionHeader);
      });
    }
  });

  document.querySelectorAll('.prt-panel-save').forEach((saveBtn) => {
    saveBtn.addEventListener('click', function() {
      let values = '';
      let url = window.location.href; // print the url
      // get the all values
      document.querySelectorAll('.prt-panel-field input').forEach((input) => {
        if (input.checked || input.classList.contains('prt-unchecked-input')) {
          values = values + '&' + input.name + `${input.classList.contains('prt-opacity-input') ? '[opacity]' : ''}` + '=' + input.value.replace('#','@_>');
        }
      });
      document.querySelector('.prt-panel-save').classList.add('prt-saved');
      setTimeout(function() {
        window.open(url.split('?newVersion')[0] + '?newVersion' + values, '_blank');
        window.focus();
        document.querySelector('.prt-panel-save').classList.remove('prt-saved');
      }, 1000);
    });
  });

  document.querySelectorAll('.prt-color-chevron').forEach((colorDropdown) => {
    colorDropdown.addEventListener('click', function() {
      colorDropdown.classList.toggle('prt-selected');
      colorDropdown.nextElementSibling.classList.toggle('prt-visible');
    });
  });
}

function equalHeight(className) {
  var max = 0;
  document.querySelectorAll(className).forEach(
    function(el) {
      console.info(Math.max(el.scrollHeight, max));
      if (el.scrollHeight > max) {
        max = el.scrollHeight;
      }
    }
  );
  return max;
}

/* Close or open section
PARAMETERS: section = the relevant section */
function closePrtPanelSection(section) {
  if (section.classList.contains('close')) {
    // section.parentNode.style.maxHeight = '2000px';
    section.classList.remove('close');
    section.nextElementSibling.classList.remove('close');
    // section.nextElementSibling.children.classList.remove('close');
  } else {
    section.classList.add('close');
    section.nextElementSibling.classList.add('close');
    // section.parentNode.style.maxHeight = '30px';
  }
}

// Copy the link
function copyShareableLink() {
  // Create a "hidden" input
  var aux = document.createElement("input");
  // Assign it the value of the specified element
  aux.setAttribute("value", document.querySelector('.prt-share-link-input').value);
  // Append it to the body
  document.body.appendChild(aux);
  // Highlight its content
  aux.select();
  // Copy the highlighted text
  document.execCommand("copy");
  // Remove it from the body
  document.body.removeChild(aux);
}

/* Add or Rmove disabled from a field - include the label and all the inputs
PARAMETERS: field = the relevant field | flag = can be TRUE or FALSE */
function disablePrtPanelField(fieldName, flag) {
  let field = document.querySelector(`.prt-panel-field[name='${fieldName}']`);
  flag ? field.setAttribute('disabled', 'disabled') : field.removeAttribute('disabled');
}


/* Call the relvant function after changing the input. You are responsible for the implementation of this function.
For numeric input - this function also update the spinner / slider with the current value and change the background width of the slider */
function initPrototypePanelControls() {
  document.querySelectorAll('.prt-panel-field input').forEach((inputChanged) => {
    const inputChangedParent = inputChanged.closest('.prt-panel-field');
    const theFunction = inputChangedParent.getAttribute('call');

    switch (inputChanged.type) {
      case "radio":
      case "text":
      inputChanged.addEventListener('change', function(e) {
        const inputElm = e.target;
        let selectedValue = inputElm.value;
        // text input - verify the new value
        if (inputElm.classList.contains('prt-text-input')) {
          if(!selectedValue) { // invalid text value - set the default value
            inputElm.value = inputElm.getAttribute('value');
            selectedValue = inputElm.value; // set the new value
          }
        }
        // color input - update the relevant fields (color code and opacity)
        if (inputElm.classList.contains('prt-color-input')) {
          changeColorPicker(inputElm.name, selectedValue, inputChanged)
        }
        // Call the relevant function
        window[theFunction] && window[theFunction](`${inputElm.name}`, `${selectedValue}`, e);
      });
      break;

      case "range":
      case "number":
      inputChanged.addEventListener('input', function(e) {
        const inputElm = e.target;
        let selectedValue = inputElm.value;
        if(!inputElm.classList.contains('prt-opacity-input')) { // opacity input doesn't require a slider change
          changesSliderWidth(inputElm, selectedValue);
          if (inputElm.classList.contains('prt-spinner')) { // need to update the slider value
            let sliderField = inputChangedParent.querySelector('.prt-slider');
            sliderField.value = selectedValue;
          }
          if (e.target.classList.contains('prt-slider')) { // need to update the spinner value
            let spinnerField = inputChangedParent.querySelector('.prt-spinner');
            spinnerField.value = selectedValue;
          }
        }
        // Call the relevant function
        window[theFunction](`${inputElm.name}`, `${selectedValue}`, e);
      });
      break;

      case "button":
      inputChanged.addEventListener('click', function(e) {
        const inputElm = e.target;
        window[theFunction] && window[theFunction](`${inputElm.name}`);
      });
      break;
    }
  });
}

/* Update the background width of the slider after changing the value
PARAMETERS: name = for get the relevant input field, value = the selected value */
function changesSliderWidth(sliderInput, value) {
  const inputMin = sliderInput.getAttribute('min');
  const inputMax = sliderInput.getAttribute('max');
  const gapValues = inputMax - inputMin;
  const inputStep = sliderInput.getAttribute('step');
  const sumSteps = gapValues / inputStep;
  const sliderWidth = 109; // The width set for the slider
  const stepWidth = sliderWidth / sumSteps;
  const currentVal = value;
  const finalVal = currentVal - inputMin; // The current value is less than the initial value
  const moveSteps = finalVal / inputStep;
  const finalWidth = Math.round(moveSteps * stepWidth);
  // append the new slider style
  const styleTagID = `prt-panel-${sliderInput.name}-styling`;
  const newStyling = `.prt-slider[name=${sliderInput.name}]::after{width:${finalWidth}px}`;
  const sliderStyleTag = document.getElementById(styleTagID);
  // if there is an exsit style for this slider - update the style tag conent, if not - create a new style tag
  if(sliderStyleTag) {
    sliderStyleTag.innerHTML = newStyling;
  } else {
    document.head.insertAdjacentHTML('beforeend', `<style id='${styleTagID}'>${newStyling}</style>`)
  }
}

function updateInputsFromURL() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (queryString.includes('?newVersion')) {
    window.opener.focus();
    document.title = '[New] ' + document.title;
    document.querySelectorAll('.prt-panel-field input').forEach((input) => {
      if (input.checked || input.classList.contains('prt-unchecked-input')) {
        let name = input.name;
        let savedValue = urlParams.get(`${name +  `${input.classList.contains('prt-opacity-input') ? '[opacity]' : ''}`}`).replace('@_>','#'); // get the relevant value from the URL
        if (!input.classList.contains('prt-unchecked-input')) {
          document.querySelector(`[value='${savedValue}']`).checked = true;
          document.querySelector(`[value='${savedValue}']`).dispatchEvent(new Event('change'));
        } else { // numeric input
          input.value = savedValue;
          input.getAttribute('type') != "text" ? input.dispatchEvent(new Event('input')) : input.dispatchEvent(new Event('change'));
        }
      }
    });
    // document.querySelector('.prototype-panel').classList.add('prototype-panel-hidden');
  }
  if (queryString.includes('?prt-hide')) {
  document.querySelector('.prototype-panel').classList.add('prototype-panel-hidden');
  document.querySelector('.prt-show-panel-note').innerHTML = 'If you need the prototype panel, press ⇧+H';
  setTimeout(function() { // return to the first content
    document.querySelector('.prt-show-panel-note').innerHTML = 'If you need me, press ⇧+H';
  }, 6000);
 }
}

function changeColorPicker(name, selectedValue, inputChanged) {
  document.querySelector(`.prt-color-picker[name='${name}']`).style.background = selectedValue; // change the color input
  document.querySelectorAll('.prt-color-chevron').forEach((chevron) => { chevron.classList.remove('prt-selected') }); // close the dropdwon
  document.querySelectorAll('.prt-color-picker-content').forEach((content) => { content.classList.remove('prt-visible') });
  document.querySelector(`.prt-color-code[name='${name}']`).value = selectedValue;
  document.querySelector(`.prt-opacity-input[name='${name}']`).value = inputChanged.getAttribute('opacityValue'); // update the opacity field
  document.querySelector(`.prt-opacity-input[name='${name}']`).dispatchEvent(new Event('input'));

  // document.querySelector(`.prt-color-code[name='${name}']`).dispatchEvent(new Event('change'));
}

window.initPrototypePanel = initPrototypePanel;
window.disablePrtPanelField = disablePrtPanelField;

/* ----- Icons ----- */
const prtArrowClose =
`<svg class='prt-panel-close prt-footer-close' viewBox='0 0 18 18' fill='#bebebe' width='18' height='18'><path class='st0' d='M9.1,5c-0.3-0.3-0.3-0.7,0-0.9s0.7-0.3,0.9,0L15,9l-4.9,4.9c-0.3,0.3-0.7,0.3-0.9,0c-0.3-0.3-0.3-0.7,0-0.9l4-4
L9.1,5z'/><path class='st0' d='M3.2,5C3,4.8,3,4.4,3.2,4.1s0.7-0.3,0.9,0L9.1,9l-4.9,4.9c-0.3,0.3-0.7,0.3-0.9,0C3,13.6,3,13.2,3.2,13l4-4
L3.2,5z'/></svg>`;

const prtMainLogo = `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 22C17.299 22 22 17.299 22 11.5C22 5.70101 17.299 1 11.5 1C5.70099 1 0.999977 5.70101 0.999977 11.5C0.999977 17.299 5.70099 22 11.5 22Z" stroke="#5D5D5D" stroke-width="2"/>
<mask id="mask0_524_6367" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="2" y="2" width="19" height="19">
<path d="M20.5 11.5C20.5 16.4706 16.4705 20.5 11.5 20.5C6.52941 20.5 2.49998 16.4706 2.49998 11.5C2.49998 6.52944 6.52941 2.5 11.5 2.5C16.4705 2.5 20.5 6.52944 20.5 11.5Z" fill="#C4C4C4" stroke="black"/>
</mask>
<g mask="url(#mask0_524_6367)">
<ellipse cx="11.5" cy="11.5" rx="9.5" ry="9.5" fill="#1D1D1D"/>
<path d="M4.33363 16.8706C3.87475 15.8238 3.16312 15.339 1.99999 15.2575V20.9682L8.53578 20.9662C8.70722 20.6048 8.77915 20.3222 8.77915 19.8957C8.77915 18.8338 8.31146 18.1506 7.3465 17.816L11.1316 12.5744C11.2489 12.4417 11.4126 12.3335 11.5652 12.2327C11.8675 12.0329 12.1258 11.8621 11.8915 11.5881C11.5054 11.136 10.8615 11.4138 10.41 11.7999L4.33363 16.8706Z" fill="white"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.6716 11.9053L11.1289 6.36258L9.22063 6.06235C8.93433 6.01771 8.64433 6.11182 8.43962 6.31624L7.29441 7.46231C7.05871 7.698 7.05871 8.07983 7.29441 8.31553L14.7187 15.7398C14.9547 15.9755 15.3365 15.9755 15.5722 15.7398L16.7171 14.594C16.9221 14.3899 17.0171 14.0999 16.9716 13.8133L16.6716 11.9053Z" fill="#85E1E5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.9893 2.86846C21.1176 5.74116 20.0875 8.6548 17.894 10.8488C15.7 13.0423 12.7861 14.0724 9.91393 13.9442C9.45135 13.9234 9.07635 13.5484 9.05616 13.0858C8.92708 10.2137 9.95715 7.29891 12.1509 5.10572C14.3441 2.91224 17.2589 1.88218 20.1307 2.01069C20.593 2.03144 20.9683 2.40645 20.9893 2.86846ZM14.2319 8.76792C13.6098 8.14556 13.6098 7.13596 14.2319 6.51389C14.8539 5.89152 15.863 5.89152 16.4853 6.51389C17.108 7.13596 17.108 8.14556 16.4853 8.76792C15.863 9.39028 14.8539 9.39028 14.2319 8.76792Z" fill="#41C9D6"/>
</svg>`;

const prtSettingsIcon =
`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#e7e7e7' width='24' height='24' style='height: 22px; width: 22px;'><path d='M14.092,8 C14.036,7.843 14,7.676 14,7.5 C14,7.324 14.036,7.157 14.092,7 C14.299,6.419 14.849,6 15.5,6 C16.151,6 16.701,6.419 16.908,7 C16.964,7.157 17,7.324 17,7.5 C17,7.676 16.964,7.843 16.908,8 C16.701,8.581 16.151,9 15.5,9 C14.849,9 14.299,8.581 14.092,8 Z M17.949,7 C17.717,5.86 16.707,5 15.5,5 C14.293,5 13.283,5.86 13.051,7 L3,7 L3,8 L13.051,8 C13.283,9.14 14.293,10 15.5,10 C16.707,10 17.717,9.14 17.949,8 L21,8 L21,7 L17.949,7 Z M15.092,18.0009 C15.036,17.8439 15,17.6769 15,17.5009 C15,17.3249 15.036,17.1579 15.092,17.0009 C15.299,16.4199 15.849,16.0009 16.5,16.0009 C17.151,16.0009 17.701,16.4199 17.908,17.0009 C17.964,17.1579 18,17.3249 18,17.5009 C18,17.6769 17.964,17.8439 17.908,18.0009 C17.701,18.5819 17.151,19.0009 16.5,19.0009 C15.849,19.0009 15.299,18.5819 15.092,18.0009 Z M18.949,17.0009 C18.717,15.8609 17.707,15.0009 16.5,15.0009 C15.293,15.0009 14.283,15.8609 14.051,17.0009 L3,17.0009 L3,18.0009 L14.051,18.0009 C14.283,19.1409 15.293,20.0009 16.5,20.0009 C17.707,20.0009 18.717,19.1409 18.949,18.0009 L21,18.0009 L21,17.0009 L18.949,17.0009 Z M6.092,13 C6.036,12.843 6,12.676 6,12.5 C6,12.324 6.036,12.157 6.092,12 C6.299,11.419 6.849,11 7.5,11 C8.151,11 8.701,11.419 8.908,12 C8.964,12.157 9,12.324 9,12.5 C9,12.676 8.964,12.843 8.908,13 C8.701,13.581 8.151,14 7.5,14 C6.849,14 6.299,13.581 6.092,13 Z M9.949,12 C9.717,10.86 8.707,10 7.5,10 C6.293,10 5.283,10.86 5.051,12 L3,12 L3,13 L5.051,13 C5.283,14.14 6.293,15 7.5,15 C8.707,15 9.717,14.14 9.949,13 L21,13 L21,12 L9.949,12 Z'></path></svg>`;

const prtExportIcon =
`<svg viewBox='0 0 24 24' fill='#fff' width='24' height='24'><path d='M11,6 L11,7 L7,7 C6.44771525,7 6,7.44771525 6,8 L6,17 C6,17.5522847 6.44771525,18 7,18 L16,18 C16.5522847,18 17,17.5522847 17,17 L17,13 L18,13 L18,17 C18,18.1045695 17.1045695,19 16,19 L7,19 C5.8954305,19 5,18.1045695 5,17 L5,8 C5,6.8954305 5.8954305,6 7,6 L11,6 Z M18,6 L18,10 L17,10 L17,7.75 L11.9040467,12.8434838 C11.69694,13.0505906 11.3611535,13.0505906 11.1540467,12.8434838 C10.94694,12.636377 10.94694,12.3005906 11.1540467,12.0934838 L16.25,7 L14,7 L14,6 L18,6 Z'></path></svg>`;

const prtHeart = `<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 13L5.985 12.0649C2.38 8.7564 0 6.57439 0 3.89646C0 1.71444 1.694 0 3.85 0C5.068 0 6.237 0.573842 7 1.48065C7.763 0.573842 8.932 0 10.15 0C12.306 0 14 1.71444 14 3.89646C14 6.57439 11.62 8.7564 8.015 12.0719L7 13Z" fill="#08BDBA"/>
</svg>`;

const prtDirIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.00001 5.16666C5.53977 5.16666 5.16667 5.53975 5.16667 5.99999V17.6667C5.16667 18.1269 5.53977 18.5 6.00001 18.5C6.46024 18.5 6.83334 18.1269 6.83334 17.6667V5.99999C6.83334 5.53975 6.46024 5.16666 6.00001 5.16666ZM12.7559 7.07742C12.4305 6.75198 11.9029 6.75198 11.5774 7.07742L7.41503 11.2398C7.3995 11.2551 7.38456 11.2711 7.37025 11.2876C7.31694 11.3489 7.27409 11.4163 7.24172 11.4872C7.19353 11.5926 7.16667 11.7099 7.16667 11.8333C7.16667 11.9531 7.19194 12.067 7.23744 12.1699C7.27359 12.2519 7.3236 12.3292 7.38748 12.3984C7.3959 12.4075 7.40452 12.4164 7.41333 12.4252L11.5774 16.5893C11.9029 16.9147 12.4305 16.9147 12.7559 16.5893C13.0814 16.2638 13.0814 15.7362 12.7559 15.4108L10.0119 12.6667H18C18.4602 12.6667 18.8333 12.2936 18.8333 11.8333C18.8333 11.3731 18.4602 11 18 11H10.0119L12.7559 8.25593C13.0814 7.9305 13.0814 7.40286 12.7559 7.07742Z" fill="white"/>
</svg>`;

const prtHideIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6636 7.06183C11.1017 6.9593 11.5501 6.90805 12 6.9091C16.4545 6.9091 19 12 19 12C18.6137 12.7227 18.153 13.403 17.6255 14.03M13.3491 13.3491C13.1743 13.5367 12.9635 13.6871 12.7294 13.7915C12.4952 13.8958 12.2424 13.9519 11.9861 13.9564C11.7297 13.961 11.4751 13.9138 11.2374 13.8178C10.9997 13.7218 10.7837 13.5788 10.6024 13.3976C10.4212 13.2163 10.2782 13.0003 10.1822 12.7626C10.0862 12.5249 10.0391 12.2703 10.0436 12.014C10.0481 11.7576 10.1042 11.5048 10.2086 11.2706C10.3129 11.0365 10.4633 10.8257 10.6509 10.6509M15.78 15.78C14.6922 16.6092 13.3676 17.0686 12 17.0909C7.54545 17.0909 5 12 5 12C5.79157 10.5249 6.88945 9.23604 8.22 8.22001L15.78 15.78Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 5L19 19" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const prtMinimizeIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.99997 12H17.6666" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const prtCopyIcon = `<svg icon="copy" width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.66917 2.66675H10.0029C10.3567 2.66675 10.6959 2.80722 10.946 3.05727C11.1962 3.30732 11.3367 3.64646 11.3367 4.00008V13.3334C11.3367 13.687 11.1962 14.0262 10.946 14.2762C10.6959 14.5263 10.3567 14.6667 10.0029 14.6667H2.00042C1.64669 14.6667 1.30744 14.5263 1.05732 14.2762C0.807191 14.0262 0.666672 13.687 0.666672 13.3334V4.00008C0.666672 3.64646 0.807191 3.30732 1.05732 3.05727C1.30744 2.80722 1.64669 2.66675 2.00042 2.66675H3.33417" stroke="#222222" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 1.33325H3.99999C3.63181 1.33325 3.33333 1.63173 3.33333 1.99992V3.33325C3.33333 3.70144 3.63181 3.99992 3.99999 3.99992H8C8.36819 3.99992 8.66666 3.70144 8.66666 3.33325V1.99992C8.66666 1.63173 8.36819 1.33325 8 1.33325Z" stroke="#222222" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const prtCopiedIcon = `<svg icon="copied" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.49994 14.4393L16.9393 6.99994C17.2322 6.70705 17.7071 6.70705 17.9999 6.99994C18.2928 7.29284 18.2928 7.76771 17.9999 8.0606L9.49994 16.5606L5.99994 13.0606C5.70705 12.7677 5.70705 12.2928 5.99994 11.9999C6.29284 11.7071 6.76771 11.7071 7.0606 11.9999L9.49994 14.4393Z" fill="#242427"/>
</svg>`;

const prtMoreIcon = `<svg viewBox='0 0 18 18' fill='#bebebe' width='18' height='18'><path d='M4,8 L6,8 L6,10 L4,10 L4,8 Z M8,8 L10,8 L10,10 L8,10 L8,8 Z M12,8 L14,8 L14,10 L12,10 L12,8 Z'></path></svg>`

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
