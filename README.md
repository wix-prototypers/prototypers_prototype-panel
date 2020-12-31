
# **Prototype Panel 🚀**
The "Prototype Panel'' goal is to add a layer of information to our prototypes. This panel allows us to improve the experience by adding more capabilities that will allow our users to interact and play with the prototype itself.

## **Table of contents**
[Project Structure](https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#project-structure)

[Prototype Panel Structure](https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#prototype-panel-structure)

[How To Use?](https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#how-to-use)

1. [Connect the panel project](https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#1-connect-the-panel-project-)

2. [Create the panel](https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#2-create-the-panel-)

- [Number Input](https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#1-number-)

- [Toggle Input](https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#2-toggle-%EF%B8%8F)

- [Radio Buttons Input](https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#3-radio-button-)

- [Thumbnails Input](https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#4-thumbnails-)

[Helper Functions](https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#helper-functions)

## **Project Structure**
### **External Libraries**
For the "Prototype Panel" project we use 3 external libraries:
-  Jquery 3.4.
-  Jquery-UI 1.12.1.
-  Scroll Into View.

The libraries will install automatically in your project after connecting this project - you don't need to install them.


### **Internal Files**
The "Prototype Panel" project consists of the following files:
1. prototypePanelStructure.js:
This file is responsible for creating the constant structure of the panel. It includes:  \
(1) the functions that create all the parts of the panels. (2) the events for the general actions of the panel (_i.e. open and close the panel, change the panel position and save the changes_). (3) SVG code of the panel general icons.

2. prototypePanel.css:
This file includes the style of the panel structure and of each element in the panel. it won't affect your prototype since each element in the panel has a unique class.

3. connectPrototypePanel.js:
This file is responsible for connecting the “Prototype Panel” project to your prototype project. It will append links in your project to the relevant libraries and files for the panel. In total there will be 5 links: jquery, jquery-UI, scrollIntoView.js,  prototypePanelStructure.js, prototypePanel.css.

## **Prototype Panel Structure**


### **1. General Structure**
The general structure of the panel consists of a header, content and footer.
**Header:**  The header includes the prototype title and the general actions of the panel (_i.e close the panel_, _save changes and change the position of the panel_).
**Contect:** The content is the main part of the panel and is divided to sections. The content will differ according to the type of panel. (1) For an informative panel the content will contain only one section with a short description about the prototype. (2) For an interactive panel, in addition to the informative section, the content will include sections according to your needs. Each section consists of the section name and its content which includes the relevant inputs according to the panel needs.               
**Footer:** The footer includes a button to close the panel and our logo with a link to our [‘WixWhooo’ page](https://www.wixwhooo.com/results?type=all&val=prototyper) to contact us.

### **2. Inputs**
The inputs are the interactive part of the panel and allow our users to play, change and test different options for the prototype. The panel currently includes four types of inputs: 

   1. [Number](https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#1-number-): spinner element with slider element (optional).
   2. [Toggle](https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#2-toggle-%EF%B8%8F): segmented toggle with 2 options. 
   3. [Radio Buttons](https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#3-radio-button-): list of options. Only 1 option can be selected.
   4. [Thumbnails](https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#4-thumbnails-): square buttons with icons inside and text labels. Only 1 option can be selected.


## **How To Use?**
To use the panel in your prototype you must do these 2 following actions:
### **1. Connect the panel project: 🔗** 
Add a link to the _‘connectPrototypePanel.js’_ file in your prototype's index file.
```
<script src="https://wix-prototypers.github.io/prototypers_prototype-panel/prototype-panel_01/src/connectPrototypePanel.js"></script>
```
**NOTE:** As mentioned, this file will link the libraries and other unchangeable files.


### **2. Create the panel: 🏗**

initPrototypePanel( )

#### **Description**
The `initPrototypePanel()` function builds the prototype panel and appends it to the body element in your prototype's index file. Call this function from one of your .js files in the project. 

#### **Syntax**

```
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
   <td>An object with 3 properties: prototypeTitle, prototypeDescription and panelDirection. See details below.
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
    prototypeTitle
   </td>
   <td>
     String
   </td>
   <td>
   </td>
   <td>
    The prototype name (in short).
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

**NOTE:** You must add the `prototypeTitle` and the `prototypeDescription`, the panel won't be created if one of them is invalid. The `panelDirection` is optional, the default value will be “right”. Then if you want to place the panel on the left you need to define it in the `panelDirection` property.

#### **Code Example for Informative Panel only**
```
let panelInfo = {
  prototypeTitle : "Prototype Name",
  prototypeDescription : "This is where you can describe the  
  prototype shortly, this description is where you can elaborate 
  and describe in details what's the prototype about.",
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
```

let panelInfo = {
  prototypeTitle : "Prototype Name",
  prototypeDescription : "This is where you can describe the  
  prototype shortly, this description is where you can elaborate 
  and describe in details what's the prototype about.",
  panelDirection : "right"
};

let panelSections = [
  {
    sectionNumber : 0,
    sectionTitle : "First Section Name",
    fields : [ {inputField : Object} , { inputField : Object } ]
  } ,
  {
    sectionNumber : 1,
    sectionTitle : "Second Section Name",
    fields : [ {inputField : Object} ]
  }
];

initPrototypePanel(panelInfo , panelSections);
```

#### **Inputs Properties**
Below is a list of properties for each input type. You must define all the properties to ensure the creation and property of each input type. There are 4 input types:

[1. Number](https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#1-number-)
[2. Toggle](https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#2-toggle-%EF%B8%8F)
[3. Radio Buttons](https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#3-radio-button-)
[4. Thumbnails](https://github.com/wix-prototypers/prototypers_prototype-panel/tree/master#4-thumbnails-)

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
    divider
   </td>
   <td>
    Boolean
   </td>
   <td>
    Show a divider if you want to separate input fields. For your decision, depending on the relationship between the inputs in the same section.
   </td>
  </tr>
  <tr>
   <td>
    function
   </td>
   <td>
    String
   </td>
   <td>
    The name of the function that will be called after changing this input. You are responsible for the implementation of this function.
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
```
... fields: [
{
  fieldName : "example-input-number",
  fieldLabel : "Input Number Label",
  divider : false,
  function : "exampleFunction",
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
    divider
   </td>
   <td>
    Boolean
   </td>
   <td>
    Show a divider if you want to separate input fields. For your decision, depending on the relationship between the inputs in the same section.
   </td>
  </tr>
  <tr>
   <td>
    function
   </td>
   <td>
    String
   </td>
   <td>
    The name of the function that will be called after changing this input. You are responsible for the implementation of this function.
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
    The text displayed on the left option. This option will be selected by default.
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
</table>

##### **Guidelines**
- Recommended when there are two options, and two opposite options in particular.
- If the option text is too long a tooltip will appear on hover.

##### **Code Example for Toggle Input**
```
... fields: [
{
  fieldName : "example-input-toggle",
  fieldLabel : "Input Toggle Label",
  divider : false,
  function : "exampleFunction",
  disabled : false,
  fieldType : "toggle",
  option1Display : "Option 1",
  option1Value : "option1",
  option2Display : "Option 2",
  option2Value : "option2"
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
    divider
   </td>
   <td>
    Boolean
   </td>
   <td>
    Show a divider if you want to separate input fields. For your decision, depending on the relationship between the inputs in the same section.
   </td>
  </tr>
  <tr>
   <td>
    function
   </td>
   <td>
    String
   </td>
   <td>
    The name of the function that will be called after changing this input. You are responsible for the implementation of this function.
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
```
... fields: [
{
  fieldName : "example-input-radiobtn",
  fieldLabel : "Radio Button Label",
  divider : false,
  function : "exampleFunction",
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

##### 4. Thumbnails 🔣
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
    divider
   </td>
   <td>
    Boolean
   </td>
   <td>
    Show a divider if you want to separate input fields. For your decision, depending on the relationship between the inputs in the same section.
   </td>
  </tr>
  <tr>
   <td>
    function
   </td>
   <td>
    String
   </td>
   <td>
    The name of the function that will be called after changing this input. You are responsible for the implementation of this function.
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
```
... fields: [
{
  fieldName : "example-input-thumbnails",
  fieldLabel : "Thumbnails Label",
  divider : false,
  function : "exampleFunction",
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

## **Helper Functions**


### disablePrtPanelField( )

##### **Description**
The `disablePrtPanelField()` function can help you disable or enable a specific input field. For example, use this function to enable a disabled input in a function that you create and it will be called after changing another input.

##### **Syntax**
```
function disablePrtPanelField(field : Element, flag : Boolean)
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
    field
   </td>
   <td>
    Element
   </td>
   <td>
    The element of the input field that you want to disable or enable. 
<code>$(`.prt-panel-field[name="<em>your-input-name</em>"]`)</code>
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
```
disablePrtPanelField($(`.prt-panel-field[name="your-input-name"]`) , false);
```

