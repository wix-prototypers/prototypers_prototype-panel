
# **Prototype Panel 🚀**
![info](https://wix-prototypers.github.io/prototypers_prototype-panel/screenshot.png)

## **External links**
[Demo Link](https://wix-prototypers.github.io/prototypers_prototype-panel/example/index.html)

[Correct Git Workflow - How to modify and manage panel code](https://docs.google.com/document/d/1hK_F3GwTPpVcZN0sJRZSY-C1Zhdnxj0Tr-7MperWoxc/edit?usp=sharing)

## **Table of contents**
[Project Structure](https://wix-prototypers.github.io/prototypers_prototype-panel/#project-structure)

[Prototype Panel Structure](https://wix-prototypers.github.io/prototypers_prototype-panel/#project-structure)

[How To Use?](https://wix-prototypers.github.io/prototypers_prototype-panel/#how-to-use)

1. [Connect the panel project](https://wix-prototypers.github.io/prototypers_prototype-panel/#1-connect-the-panel-project-)

2. [Create the panel](https://wix-prototypers.github.io/prototypers_prototype-panel/#2-create-the-panel-)

- [Number & Slider Input](https://wix-prototypers.github.io/prototypers_prototype-panel/#1-number-)

- [Toggle Input](https://wix-prototypers.github.io/prototypers_prototype-panel/#2-toggle-%EF%B8%8F)

- [Radio Buttons Input](https://wix-prototypers.github.io/prototypers_prototype-panel/#3-radio-button-)

- [Text Field Input](https://wix-prototypers.github.io/prototypers_prototype-panel/#4-text-field-)

- [Button](https://wix-prototypers.github.io/prototypers_prototype-panel/#5-button-)

- [Thumbnails Input](https://wix-prototypers.github.io/prototypers_prototype-panel/#6-thumbnails-)

[Helper Functions](https://wix-prototypers.github.io/prototypers_prototype-panel/#helper-functions)

## **Project Structure**

### **Internal Files**
The "Prototype Panel" project consists of the following files:
1. prototypePanel.js:
This file is responsible for creating the constant structure of the panel. It includes:  \
(1) the functions that create all the parts of the panels. (2) the events for the general actions of the panel (_i.e. open and close the panel, change the panel position and save the changes_). (3) SVG code of the panel general icons.

2. prototypePanel.css:
This file includes the style of the panel structure and of each element in the panel. it won't affect your prototype since each element in the panel has a unique class.


## **Prototype Panel Structure**


### **1. General Structure**

**Bar / Main Footer:** The initial part of the panel includes a floating bar with our logo and 3 tabs - info, settings and share.<br />

**Info:**  The 'Info' tab includes information about the prototype - prototype description, a brief explanation of how to use the prototype and a link to our [‘WixWhooo’ page](https://www.wixwhooo.com/results?type=all&val=prototyper) to contact us.

**Settings:** The 'Settings' tab is the interactive part of the panel and is divided to sections according to your needs. Each section consists of the section name and its content which includes the relevant inputs according to the panel needs.    

**Share:** The 'Share' tab allows to generate a shareable link to the prototype, that contains the settings that selected in the interactive part. This allows for easy sharing of various versions of the prototype. In this part the current user also can control the display of the panel in the new link, copy the new link or open it in a new tab.

**Main Header:**  The header in each tab includes the general actions of the panel (_i.e minimize the panel, dock the panel on the other side and hide the panel_).

### **2. The 'Share' Tab - Get Shareable Link**
The 'Share' tab allows to generate a shareable link to the prototype, the URL of this link contains the name of each input and the value selected for it in the settings. When the new link is loaded the code changes to each input the relevant value saved in the url and then we get a new version of the prototype according to the saved settings.

### **3. Inputs**
The inputs are the interactive part of the panel and allow our users to play, change and test different options for the prototype. The panel currently includes four types of inputs:

   1. [Number](https://wix-prototypers.github.io/prototypers_prototype-panel/#1-number-): spinner element with slider element (optional).
   2. [Toggle](https://wix-prototypers.github.io/prototypers_prototype-panel/#2-toggle-%EF%B8%8F): segmented toggle with 2 options.
   3. [Radio Buttons](https://wix-prototypers.github.io/prototypers_prototype-panel/#3-radio-button-): list of options. Only 1 option can be selected.
   4. [Text Field](https://wix-prototypers.github.io/prototypers_prototype-panel/#4-text-field-): text field that allows to change the text of an element.
   5. [Button](https://wix-prototypers.github.io/prototypers_prototype-panel/#5-button-): button that allows to do someting (e.g. refresh, start animation and more).
   6. [Thumbnails](https://wix-prototypers.github.io/prototypers_prototype-panel/#6-thumbnails-): square buttons with icons inside and text labels. Only 1 option can be selected.


## **How To Use?**
To use the panel in your prototype you must do these 2 following actions:
### **1. Connect the panel project: 🔗**
Add the following links in your prototype's index file.

```HTML
<script src="https://cdn.jsdelivr.net/gh/wix-prototypers/prototypers_prototype-panel@3.1/dist/prototypePanel.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/wix-prototypers/prototypers_prototype-panel@3.1/dist/prototypePanel.css">
```

### **2. Create the panel: 🏗**

initPrototypePanel( )

#### **Description**
The `initPrototypePanel()` function builds the prototype panel and appends it to the body element in your prototype's index file. Call this function from one of your .js files in the project.

#### **Syntax**

```javascript
function initPrototypePanel(panelInfo : Object, panelSections : Object)
```
#### **initPrototypePanel Parameters**
<table>
  <tr>
   <td>
    NAME
   </td>
   <td>
    TYPE
   </td>
   <td>
    DESCRIPTION
   </td>
   <td>
    REQUIRED
   </td>
  </tr>
  <tr>
   <td>
      <a href="https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#panelinfo-properties">panelInfo</a>
   </td>
   <td>Object
   </td>
   <td>An object with 3 properties: prototypeDescription, prototypeHowToUse and panelDirection. See details below.
   </td>
   <td>
    Yes
   </td>
  </tr>
  <tr>
     <td><a href="https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#panelsections-properties">panelSections[]</a>
     </td>
   <td>Array
   </td>
   <td>An array with sections, in each section the relevant inputs you want to add to the panel.
The amount of sections and the distribution of inputs among them is your decision. See details below.
   </td>
   <td>
   </td>
  </tr>
</table>

**NOTE:** You must add the `panelInfo`. The `panelSections` is optional, so if you want to create an interactive panel you need to add it as well.

#### **panelInfo Properties**
The `initPrototypePanel()` function adds the information and following properties of `panelInfo` object to the panel when it is created:
<table>
  <tr>
   <td>
    NAME
   </td>
   <td>
    TYPE
   </td>
   <td>
    DEFAULT VALUE
   </td>
   <td>
    DESCRIPTION
   </td>
   <td>
    REQUIRED
   </td>
  </tr>
  <tr>
   <td>
    prototypeHowToUse
   </td>
   <td>
     String
   </td>
   <td>
   </td>
   <td>
    A brief explanation of how to use the prototype or where to start.
   </td>
   <td>
    Yes
   </td>
  </tr>
  <tr>
   <td>
    prototypeDescription
   </td>
   <td>
     String
   </td>
   <td>
   </td>
   <td>
     Two sentences describing the prototype.
   </td>
   <td>
    Yes
   </td>
  </tr>
  <tr>
   <td>
    panelDirection
   </td>
   <td>
    oneOf[“left”, “right”]
   </td>
   <td>
    “right”
   </td>
   <td>
    The position of the panel will be set depending on the direction. It can be on the right or the left.
   </td>
   <td>
   </td>
  </tr>
</table>

**NOTE:** You must add the `prototypeDescription` and the `prototypeHowToUse`, the panel won't be created if one of them is invalid. The `panelDirection` is optional, the default value will be “right”. Then if you want to place the panel on the left you need to define it in the `panelDirection` property.

#### **Code Example for Informative Panel only**
```javascript
let panelInfo = {
  prototypeHowToUse: "Explain how to start using the prototype (1-2 statements).",
  prototypeDescription : "This is where you can describe the prototype shortly, this description is where you can elaborate and describe in details what's the prototype about.",
  panelDirection : "right"
};
initPrototypePanel(panelInfo);
```
#### **panelSections Properties**
<table>
  <tr>
   <td>
    NAME
   </td>
   <td>
    TYPE
   </td>
   <td>
    DEFAULT VALUE
   </td>
   <td>
    DESCRIPTION
   </td>
   <td>
    REQUIRED
   </td>
  </tr>
  <tr>
   <td>
    sectionNumber
   </td>
   <td>
    Number
   </td>
   <td>
   </td>
   <td>
    The section index.
   </td>
   <td>
    Yes
   </td>
  </tr>
  <tr>
   <td>
    sectionIsOpen
   </td>
   <td>
    Boolean
   </td>
   <td>
    false
   </td>
   <td>
    Defines if the section will be open or closed when creating the panel.
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>
    sectionTitle
   </td>
   <td>
    String
   </td>
   <td>
   </td>
   <td>
    The section name.
   </td>
   <td>
    Yes
   </td>
  </tr>
  <tr>
   <td>
    Fields[ ]
   </td>
   <td>
    Array
   </td>
   <td>
   </td>
   <td>
    An array with the inputs that will  \
be inside this section. See inputs details below.
   </td>
   <td>
    Yes
   </td>
  </tr>
</table>

#### **Code Example for Interactive Panel**
```javascript

let panelInfo = {
  prototypeHowToUse: "Explain how to start using the prototype (1-2 statements).",
  prototypeDescription : "This is where you can describe the prototype shortly, this description is where you can elaborate and describe in details what's the prototype about.",
  panelDirection : "right"
};

let panelSections = [
  {
    sectionNumber : 0,
    sectionIsOpen: true,
    sectionTitle : "First Section Name",
    fields : [ {inputField : Object} , { inputField : Object } ]
  } ,
  {
    sectionNumber : 1,
    sectionIsOpen: true,
    sectionTitle : "Second Section Name",
    fields : [ {inputField : Object} ]
  }
];

initPrototypePanel(panelInfo , panelSections);
```

#### **Inputs Properties**
Below is a list of properties for each input type. You must define all the properties to ensure the creation and property of each input type. There are 6 input types:

   1. [Number](https://wix-prototypers.github.io/prototypers_prototype-panel/#1-number-)
   2. [Toggle](https://wix-prototypers.github.io/prototypers_prototype-panel/#2-toggle-%EF%B8%8F)
   3. [Radio Buttons](https://wix-prototypers.github.io/prototypers_prototype-panel/#3-radio-button-)
   4. [Text Field](https://wix-prototypers.github.io/prototypers_prototype-panel/#4-text-field-)
   5. [Button](https://wix-prototypers.github.io/prototypers_prototype-panel/#5-button-)
   6. [Thumbnails](https://wix-prototypers.github.io/prototypers_prototype-panel/#6-thumbnails-)

##### 1. Number 🔟
<table>
  <tr>
   <td>
    NAME
   </td>
   <td>
    TYPE
   </td>
   <td>
    DESCRIPTION
   </td>
  </tr>
  <tr>
   <td>
    fieldName
   </td>
   <td>
     String
   </td>
   <td>
    The unique name of the input, will be used by us to access the input in the code.
   </td>
  </tr>
  <tr>
   <td>
    fieldLabel
   </td>
   <td>
    String
   </td>
   <td>
    The label that will appear in the panel above the input.
   </td>
  </tr>
  <tr>
   <td>
    callback
   </td>
   <td>
    String
   </td>
   <td>
    The name of the function that will be called after changing this input. You are responsible for the implementation of this function.
      <b>NOTE: </b> This function receives 3 parameters (in the following order): the name ('name' attribute) of the changed input, the selected value and the event object. Example: <i>function changeBackgroundStyle(inputName, selectedValue, e) { }</i>
   </td>
  </tr>
  <tr>
   <td>
    disabled
   </td>
   <td>
    Boolean
   </td>
   <td>
    Disable or enable this input field by default.
   </td>
  </tr>
  <tr>
   <td>
    fieldType
   </td>
   <td>
    oneOf[“number”]
   </td>
   <td>
    The input type. For this input it must be ״number”.
   </td>
  </tr>
  <tr>
   <td>
    min
   </td>
   <td>
    Number
   </td>
   <td>
    Minimum value this input can have.
   </td>
  </tr>
  <tr>
   <td>
    max
   </td>
   <td>
    Number
   </td>
   <td>
    Maximum value this input can have.
   </td>
  </tr>
  <tr>
   <td>
    step
   </td>
   <td>
    Number
   </td>
   <td>
    Steps to increment/decrement.
   </td>
  </tr>
  <tr>
   <td>
    value
   </td>
   <td>
    Number
   </td>
   <td>
    The initial input value.
   </td>
  </tr>
  <tr>
   <td>
    showSlider
   </td>
   <td>
    Boolean
   </td>
   <td>
    Show or hide a slider next to the number input.
   </td>
  </tr>
  <tr>
   <td>
    suffix
   </td>
   <td>
    String
   </td>
   <td>
    Content you want to show as the suffix of the input.
   </td>
  </tr>
</table>

##### **Code Example for Number Input**
```javascript
... fields: [
{
  fieldName : "example-input-number",
  fieldLabel : "Input Number Label",
  callback : "exampleFunction",
  disabled : false,
  fieldType : "number",
  min : 0.05,
  max : 0.25,
  step : 0.01,
  value : 0.15,
  showSlider : true,
  suffix : "%"
}
];
```

##### 2. Toggle ↔️
<table>
  <tr>
   <td>
    NAME
   </td>
   <td>
    TYPE
   </td>
   <td>
    DESCRIPTION
   </td>
  </tr>
  <tr>
   <td>
    fieldName
   </td>
   <td>
     String
   </td>
   <td>
    The unique name of the input, will be used by us to access the input in the code.
   </td>
  </tr>
  <tr>
   <td>
    fieldLabel
   </td>
   <td>
    String
   </td>
   <td>
    The label that will appear in the panel above the input.
   </td>
  </tr>
  <tr>
   <td>
    callback
   </td>
   <td>
    String
   </td>
   <td>
      The name of the function that will be called after changing this input. You are responsible for the implementation of this function.
      <b>NOTE: </b> This function receives 3 parameters (in the following order): the name ('name' attribute) of the changed input, the selected value and the event object. Example: <i>function changeBackgroundStyle(inputName, selectedValue, e) { }</i>
   </td>
  </tr>
  <tr>
   <td>
    disabled
   </td>
   <td>
    Boolean
   </td>
   <td>
    Disable or enable this input field by default.
   </td>
  </tr>
  <tr>
   <td>
    fieldType
   </td>
   <td>
    oneOf[“toggle”]
   </td>
   <td>
    The input type. For this input it must be “toggle”.
   </td>
  </tr>
  <tr>
   <td>
    option1Display
   </td>
   <td>
    String
   </td>
   <td>
    The text displayed on the left option. 
   </td>
  </tr>
  <tr>
   <td>
    option1Value
   </td>
   <td>
    String
   </td>
   <td>
    The value of the left option. Will be used by you in the code to identify the selected option.
   </td>
  </tr>
  <tr>
   <td>
    option2Display
   </td>
   <td>
    String
   </td>
   <td>
    The text displayed on the right option. 
   </td>
  </tr>
   <tr>
   <td>
    option2Value
   </td>
   <td>
    String
   </td>
   <td>
    The value of the right option. Will be used by you in the code to identify the selected option.
   </td>
  </tr>
    <tr>
   <td>
    defaultOption
   </td>
   <td>
    oneOf[1,2]
   </td>
   <td>
    The option (1 - the left option or 2 - the right option) that will be selected by default.
   </td>
  </tr>
</table>

##### **Guidelines**
- Recommended when there are two options, and two opposite options in particular.
- If the option text is too long a tooltip will appear on hover.

##### **Code Example for Toggle Input**
```javascript
... fields: [
   {
     fieldName : "example-input-toggle",
     fieldLabel : "Input Toggle Label",
     callback : "exampleFunction",
     disabled : false,
     fieldType : "toggle",
     option1Display : "Option 1",
     option1Value : "option1",
     option2Display : "Option 2",
     option2Value : "option2",
     defaultOption: 1
   }
];
```

##### 3. Radio Button ⏺
<table>
  <tr>
   <td>
    NAME
   </td>
   <td>
    TYPE
   </td>
   <td>
    DESCRIPTION
   </td>
  </tr>
  <tr>
   <td>
    fieldName
   </td>
   <td>
     String
   </td>
   <td>
    The unique name of the input, will be used by us to access the input in the code.
   </td>
  </tr>
  <tr>
   <td>
    fieldLabel
   </td>
   <td>
    String
   </td>
   <td>
    The label that will appear in the panel above the input.
   </td>
  </tr>
  <tr>
   <td>
    callback
   </td>
   <td>
    String
   </td>
   <td>
    The name of the function that will be called after changing this input. You are responsible for the implementation of this function.
      <b>NOTE: </b> This function receives 3 parameters (in the following order): the name ('name' attribute) of the changed input, the selected value and the event object. Example: <i>function changeBackgroundStyle(inputName, selectedValue, e) { }</i>
   </td>
  </tr>
  <tr>
   <td>
    disabled
   </td>
   <td>
    Boolean
   </td>
   <td>
    Disable or enable this input field by default.
   </td>
  </tr>
  <tr>
   <td>
    fieldType
   </td>
   <td>
    oneOf[“radio-button”]
   </td>
   <td>
    The input type. For this input it must be “radio-button”.
   </td>
  </tr>
  <tr>
   <td>
    defaultIndex
   </td>
   <td>
    Number
   </td>
   <td>
    The index of the selected initial option.
   </td>
  </tr>
  <tr>
   <td>
    optionsDisplayList
   </td>
   <td>
    Array
   </td>
   <td>
    An array with strings of all the displayed options of this input.
   </td>
  </tr>
  <tr>
   <td>
    optionsBackendList
   </td>
   <td>
    Array
   </td>
   <td>
    An array that contains the value of each option written in the property before. Will be used by you in the code to identify the selected option. Make sure to match the option index and the value index.
   </td>
  </tr>
</table>

##### **Code Example for Radio Button Input**
```javascript
... fields: [
   {
     fieldName : "example-input-radiobtn",
     fieldLabel : "Radio Button Label",
     callback : "exampleFunction",
     disabled : false,
     fieldType : "radio-button",
     defaultIndex : 3,
     optionsDisplayList: ["Option 1", "Option 2","Option 3",
                          "Option 4"],
     optionsBackendList: ["option1", "option2", "option3",
                          "option4"]
   }
];
```

##### 4. Text Field 🔤
<table>
  <tr>
   <td>
    NAME
   </td>
   <td>
    TYPE
   </td>
   <td>
    DESCRIPTION
   </td>
  </tr>
  <tr>
   <td>
    fieldName
   </td>
   <td>
     String
   </td>
   <td>
    The unique name of the input, will be used by us to access the input in the code.
   </td>
  </tr>
  <tr>
   <td>
    fieldLabel
   </td>
   <td>
    String
   </td>
   <td>
    The label that will appear in the panel above the input.
   </td>
  </tr>
  <tr>
   <td>
    callback
   </td>
   <td>
    String
   </td>
   <td>
    The name of the function that will be called after changing this input. You are responsible for the implementation of this function.
      <b>NOTE: </b> This function receives 3 parameters (in the following order): the name ('name' attribute) of the changed input, the selected value and the event object. Example: <i>function changeBackgroundStyle(inputName, selectedValue, e) { }</i>
   </td>
  </tr>
  <tr>
   <td>
    disabled
   </td>
   <td>
    Boolean
   </td>
   <td>
    Disable or enable this input field by default.
   </td>
  </tr>
  <tr>
   <td>
    fieldType
   </td>
   <td>
    oneOf[“text”]
   </td>
   <td>
    The input type. For this input it must be “text”.
   </td>
  </tr>
     <tr>
   <td>
    currentValue
   </td>
   <td>
    String
   </td>
   <td>
    The current text of the relevant element.
   </td>
  </tr>
</table>

##### **Code Example for Text Field Input**
```javascript
... fields: [
   {
     fieldName : "example-input-text-field",
     fieldLabel : "Text Field Label",
     callback : "exampleFunction",
     disabled : false,
     fieldType : "text",
     currentValue : "Let`s Play!"
   }
];
```

##### 5. Button ⏹
<table>
  <tr>
   <td>
    NAME
   </td>
   <td>
    TYPE
   </td>
   <td>
    DESCRIPTION
   </td>
  </tr>
  <tr>
   <td>
    fieldName
   </td>
   <td>
     String
   </td>
   <td>
    The unique name of the input, will be used by us to access the input in the code.
   </td>
  </tr>
  <tr>
   <td>
    fieldLabel
   </td>
   <td>
    String
   </td>
   <td>
    The label that will appear in the panel above the input.
   </td>
  </tr>
  <tr>
   <td>
    callback
   </td>
   <td>
    String
   </td>
   <td>
    The name of the function that will be called after changing this input. You are responsible for the implementation of this function.
      <b>NOTE: </b> This function doesn't receive any parameters, because this input has no selected value. Example: <i>function clickStartButton() { }</i>
   </td>
  </tr>
  <tr>
   <td>
    disabled
   </td>
   <td>
    Boolean
   </td>
   <td>
    Disable or enable this input field by default.
   </td>
  </tr>
  <tr>
   <td>
    fieldType
   </td>
   <td>
    oneOf[“button”]
   </td>
   <td>
    The input type. For this input it must be “button”.
   </td>
  </tr>
     <tr>
   <td>
    currentValue
   </td>
   <td>
    String
   </td>
   <td>
    The button text.
   </td>
  </tr>
</table>

##### **Code Example for Text Field Input**
```javascript
... fields: [
   {
     fieldName : "example-input-text-field",
     fieldLabel : "Text Field Label",
     callback : "exampleFunction",
     disabled : false,
     fieldType : "button",
     currentValue : "Click me!"
   }
];
```

##### 6. Thumbnails 🔣
<table>
  <tr>
   <td>
    NAME
   </td>
   <td>
    TYPE
   </td>
   <td>
    DESCRIPTION
   </td>
  </tr>
  <tr>
   <td>
    fieldName
   </td>
   <td>
     String
   </td>
   <td>
    The unique name of the input, will be used by us to access the input in the code.
   </td>
  </tr>
  <tr>
   <td>
    fieldLabel
   </td>
   <td>
    String
   </td>
   <td>
    The label that will appear in the panel above the input.
   </td>
  </tr>
  <tr>
   <td>
    callback
   </td>
   <td>
    String
   </td>
   <td>
    The name of the function that will be called after changing this input. You are responsible for the implementation of this function.
      <b>NOTE: </b> This function receives 3 parameters (in the following order): the name ('name' attribute) of the changed input, the selected value and the event object. Example: <i>function changeBackgroundStyle(inputName, selectedValue, e) { }</i>
   </td>
  </tr>
  <tr>
   <td>
    disabled
   </td>
   <td>
    Boolean
   </td>
   <td>
    Disable or enable this input field by default.
   </td>
  </tr>
  <tr>
   <td>
    fieldType
   </td>
   <td>
    oneOf[“thumbnails”]
   </td>
   <td>  The input type. For this input it must be “thumbnails”.
   </td>
  </tr>
  <tr>
   <td>
    defaultIndex
   </td>
   <td>
    Number
   </td>
   <td>
    The index of the selected initial option.
   </td>
  </tr>
  <tr>
   <td>
    labelsDisplayList
   </td>
   <td>
    Array
   </td>
   <td> An array with strings of all the displayed for each thumbnail.
   </td>
  </tr>
  <tr>
   <td>
    optionsBackendList
   </td>
   <td>
    Array
   </td>
   <td>
    An array that contains the value of each thumbnail written in the property before. Will be used by you in the code to identify the selected option. Make sure to match the label index and  the value index.
   </td>
  </tr>
  <tr>
   <td>
    iconsDisplayList
   </td>
   <td>
    Array
   </td>
   <td>
    An array with strings of paths (src) to the svg icon of each thumbnail. Make sure to match the label index and  the path index.
   </td>
  </tr>
</table>

##### **Guidelines**
- The icons must be an SVG file with a black fill or stroke.
- If the option text is too long a tooltip will appear on hover.

##### **Code Example for Thumbnails**
```javascript
... fields: [
   {
     fieldName : "example-input-thumbnails",
     fieldLabel : "Thumbnails Label",
     callback : "exampleFunction",
     disabled : false,
     fieldType : "thumbnails",
     defaultIndex : 1,
     optionsDisplayList: ["Option 1", "Option 2",
                         "Option 3", "Option 4", "Option 5"],
     optionsBackendList: ["option1", "option2",
                         "option3", "option4", "option5"],
     iconsDisplayList: ["./images/example-img1.svg",
     "./images/example-img2.svg", "./images/example-img3.svg",
     "./images/example-img4.svg", "./images/example-img5.svg"]
   }
];
```

##### 7. Number with Context Menu 🔟
<table>
  <tr>
   <td>
    NAME
   </td>
   <td>
    TYPE
   </td>
   <td>
    DESCRIPTION
   </td>
  </tr>
  <tr>
   <td>
    fieldName
   </td>
   <td>
     String
   </td>
   <td>
    The unique name of the input, will be used by us to access the input in the code.
   </td>
  </tr>
  <tr>
   <td>
    fieldLabel
   </td>
   <td>
    String
   </td>
   <td>
    The label that will appear in the panel above the input.
   </td>
  </tr>
  <tr>
   <td>
    callback
   </td>
   <td>
    String
   </td>
   <td>
    The name of the function that will be called after changing this input. You are responsible for the implementation of this function.
      <b>NOTE: </b> This function receives 3 parameters (in the following order): the name ('name' attribute) of the changed input, the selected value and the event object. Example: <i>function changeBackgroundStyle(inputName, selectedValue, e) { }</i>
   </td>
  </tr>
   <tr>
   <td>
    callbackContextMenu
   </td>
   <td>
    String
   </td>
   <td>
    The name of the function that will be called after changing the input unit from the context menu. You are responsible for the implementation of this function. <b>NOTE: </b> This function receives 3 parameters (in the following order): the name ('name' attribute) of the changed input, the selected value and the event object. Example: <i>function convertWidthElement(inputName, selectedValue, e) { }</i>
   </td>
  </tr>
  <tr>
   <td>
    disabled
   </td>
   <td>
    Boolean
   </td>
   <td>
    Disable or enable this input field by default.
   </td>
  </tr>
  <tr>
   <td>
    fieldType
   </td>
   <td>
    oneOf[“number-w-context-menu”]
   </td>
   <td>
    The input type. For this input it must be ״number-w-context-menu”.
   </td>
  </tr>
  <tr>
   <td>
    min
   </td>
   <td>
    Number
   </td>
   <td>
     Minimum value this input can have. [Optional]
   </td>
  </tr>
  <tr>
   <td>
    max
   </td>
   <td>
    Number
   </td>
   <td>
    Maximum value this input can have. [Optional]
   </td>
  </tr>
  <tr>
   <td>
    value
   </td>
   <td>
    Number
   </td>
   <td>
    The initial input value.
   </td>
  </tr>
  <tr>
   <td>
    defaultUnitIndex
   </td>
   <td>
    Number
   </td>
   <td>
    The index of the unit input that you want to show as default from the unitOptions.
   </td>
  </tr>
    <tr>
   <td>
    unitOptions
   </td>
   <td>
    Array
   </td>
   <td>
An array that contains the object of each unit option. Each object containts the properties "unit" - the unit value that displays next to the input, and "displayName" - the text that displays in the context menu. Example: 'unitOptions': [{"unit":"px", "displayName":"Pixels (px)"}]
   </td>
  </tr>
</table>

##### **Code Example for Number Input with Context Menu**
```javascript
... fields: [
 {
  fieldName : "number-w-context-menu",
  fieldLabel : "Test title animation:",
  callback : "exampleFunction",
  callbackContextMenu : "changeUnitInputBox",
  disabled : false,
  fieldType : "number-w-context-menu",
  value : "35",
  defaultUnitIndex : 0,
  unitOptions : [{"unit":"px", "displayName":"Pixels (px)"},
                 {"unit":"%", "displayName":"Precentage (%)"},
                 {"unit":"vw", "displayName":"Viewport Width (vw)"}]
 }
];
```


## **Helper Functions**


### disablePrtPanelField( )

##### **Description**
The `disablePrtPanelField()` function can help you disable or enable a specific input field. For example, use this function to enable a disabled input in a function that you create and it will be called after changing another input.

##### **Syntax**
```javascript
function disablePrtPanelField(fieldName : String, flag : Boolean)
```
##### **initPrototypePanel Parameters**
<table>
  <tr>
   <td>
    NAME
   </td>
   <td>
    TYPE
   </td>
   <td>
    DESCRIPTION
   </td>
  </tr>
  <tr>
   <td>
    fieldName
   </td>
   <td>
    String
   </td>
   <td>
    The name attribute of the input field that you want to disable or enable.
   </td>
  </tr>
  <tr>
   <td>
    flag
   </td>
   <td>
    Boolean
   </td>
   <td>
    False to enable the input field, or true to disable the input field.
   </td>
  </tr>
</table>

##### **Code Example**
```javascript
disablePrtPanelField("your-input-name" , false);
```
