/* NOTE: This file includes the functions and the icons for creating the structure - No need to change / add. */
// import '../css/main.css';

let hasSections = false;
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
    hasSections = _panelSections && _panelSections.length; // there are interactive sections

    // Prototype Panel Template
    const prototypePanelTemplate =
    `<div class='prototype-panel' panel-dir='${_panelInfo.panelDirection}' interactive-panel=true>
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
          <div class="prt-new-link-container">
            <input type="text" autofocus readonly class="prt-text-input prt-share-link-input prt-unchecked-input" style="width: 186px; margin-right: 9px;" value="https://wix-prototypers.github.io/prototypers_prototype-panel/example/index.html" style="padding-right: 0;">
            <div class="prt-copy-btn">
              ${prtCopyIcon}
              ${prtCopiedIcon}
              <span class="prt-copy-loader" icon="refresh">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
              <span class="prt-panel-tooltip">Copy</span>
            </div>
          </div>
          <div class="prt-share-actions" style="display: unset;">
            <button class="prt-panel-button prt-open-tab-btn" skin="text">Open in New Tab</button>
          </div>
        </div>
      </div>
      <div class="prt-panel-section prt-customization prt-show-section" data-section="Prototype Settings">
      ${hasSections ? createPrtPanelSections(_panelSections) : ''}
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
  section.fields.forEach(function(field, index){
    index == section.fields.length - 1 ? index = 'prt-last-field' : index = '';
    inputsTemplate += createPrtPanelInput(field, index);
  });
  newSection = `<div class="prt-panel-section-header ${sectionIsOpen != false ? '' : 'close'}"><span>${sectionTitle}</span>${prtHeaderChev}</div>
  <div class="prt-panel-section-content ${sectionIsOpen != false ? '' : 'close'}" section-number='${sectionNumber}'>
    ${inputsTemplate}
  </div>`;
  return newSection;
}

/*  Create each input field - with call to 'prtPanelInputContent' function for get the relevant content.
PARAMETERS: field = the relevant field */
function createPrtPanelInput(fieldData, index) {
  console.log(index)
  let { disabled, fieldName, fieldLabel, callback } = fieldData;
  disabled == true ? (disabled = ' disabled') : (disabled = ''); // disabled field ?
  let fieldContent = prtPanelInputContent(fieldData);
  let newField = `<fieldset class='prt-panel-field ${index}' ${disabled} name='${fieldName}' call='${callback}'>
  <label class='prt-panel-field-label'>${fieldLabel}</label>
  ${fieldContent}
  </fieldset>
  <div class='prt-panel-divider'></div>`;
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
    if(!hasSections) {
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
    document.querySelector('.prt-copy-btn').classList.add('prt-refresh');
    setTimeout(function() {
      document.querySelector('.prt-copy-btn').classList.remove('prt-refresh');
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
document.querySelectorAll('.prt-copy-btn').forEach((copyBtn) => {
  copyBtn.addEventListener('click', function() {
    copyBtn.classList.add('prt-copied');
    setTimeout(function() {
      copyBtn.classList.remove('prt-copied');
      let input = document.querySelector('.prt-share-link-input');
      input.focus();
      input.select();
    }, 1000);
    copyShareableLink();
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
    section.classList.remove('close');
    section.nextElementSibling.classList.remove('close');
  } else {
    section.classList.add('close');
    section.nextElementSibling.classList.add('close');
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
  const sliderWidth = 124; // The width set for the slider
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

const prtHeaderChev = `<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1.50562L6 6.50562L11 1.50562" stroke="#BABCC9" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
