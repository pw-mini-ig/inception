/* CONSTANTS */
const INSTITUTIONAL_STATEMENT_TYPE = "institutionalStatement";
const STATEMENT_COMBINATION = "Statement Combination";
const LOGICAL_OPERATOR = "Logical Operator";
const REGULATIVE_STATEMENT = "Regulative Statement";
const REGULATIVE_STATEMENT_OF_FACT = "Regulative Statement of Fact";
const CONSTITUTIVE_STATEMENT = "Consitutive Statement";
const CONSTITUTIVE_STATEMENT_OF_FACT = "Consitutive Statement of Fact";

const OR_ELSE = "Or else";
const DEONTIC = "Deontic";
const ACTIVATION_CONDITION = "Activation Condition";
const EXECUTION_CONSTRAINT = "Execution Constraint";
const PROPERTY = "Property";

const ATTRIBUTE = "Attribute";
const AIM = "Aim";
const DIRECT_OBJECT = "Direct Object";
const INDIRECT_OBJECT = "Indirect Object";

const CONSTITUTED_ENTITY = "Constituted Entity";
const CONSTITUTIVE_FUNCTION = "Constitutive Function";
const CONSTITUTING_PROPERTY = "Constituting property";

const PREFIX_SEPARATOR = " - ";
const COMBINATION_POSTFIX = "Combination";

class TreeParserHelper {
  /* ================= TREE DRAWING =============== */

  /*
    Use this method to draw the tree.
    Params:
      divId - id of the div inside which tree will be drawn
      statement - single Statement inside yaml file that will be drawn 
  */

  drawTree(divId, statement) {

    let chart_config = {
      chart: {
        container: divId,
        animateOnInit: false,
        node: {
          collapsable: true
        },
        animation: {
          nodeAnimation: "easeOutBounce",
          nodeSpeed: 700,
          connectorsAnimation: "bounce",
          connectorsSpeed: 700
        }
      }
    };

    chart_config.nodeStructure = this.getStatementNodeStructure(statement, '');

    return new Treant(chart_config);
  }

  /* 
    Prefix is used if one of elements such as Direct Object, 
    Indirect Object, etc. are statements instead of words
  */
  getStatementNodeStructure(statement, titlePrefix) {

    if (statement.logicalOperator) {
      return this.getStatementCombinationNodeStructure(statement, titlePrefix);
    } else if (statement.aim) {
      return this.getRegulativeStatementNodeStructure(statement, titlePrefix);
    } else if (statement.constitutiveFunction) {
      return this.getConstitutiveStatementNodeStructure(statement, titlePrefix);
    }

    throw new Error(`${statement} is expected to contain logicalOperator (as Statement Combination) or be valid InstitutionalStatement`);
  }

  getStatementCombinationNodeStructure(statementCombination, titlePrefix) {
    let nodeStructure = {
      text: {
        title: titlePrefix + STATEMENT_COMBINATION,
        name: statementCombination.text
      },
      children: [{
        text: {
          title: LOGICAL_OPERATOR,
          name: statementCombination.logicalOperator
        },
        children: statementCombination.statements.map(statement => this.getStatementNodeStructure(statement, ''))
      }]
    };

    // orElse's type is statement
    if (statementCombination.orElse) {
      nodeStructure.children.push(this.getStatementNodeStructure(statementCombination.orElse, OR_ELSE + PREFIX_SEPARATOR));
    }

    return nodeStructure;
  }

  getRegulativeStatementNodeStructure(regulativeStatement, titlePrefix) {
    let nodeStructure = {
      text: {
        title: titlePrefix + (regulativeStatement.type === INSTITUTIONAL_STATEMENT_TYPE ? REGULATIVE_STATEMENT : REGULATIVE_STATEMENT_OF_FACT),
        name: regulativeStatement.text
      },
      children: []
    };

    // ATTRIBUTE
    nodeStructure.children.push(this.getComponentWithProperties(regulativeStatement.attribute, ATTRIBUTE));

    // DEONTIC
    if (regulativeStatement.deontic) {
      nodeStructure.children.push(this.getSimpleNode(regulativeStatement.deontic, DEONTIC));
    }

    // AIM
    nodeStructure.children.push(this.getComponentWithoutProperties(regulativeStatement.aim, AIM));

    // DIRECT OBJECT
    if (regulativeStatement.directObject) {
      nodeStructure.children.push(this.getStatementOrComponentWithProperties(regulativeStatement.directObject, DIRECT_OBJECT));
    }

    // INDIRECT OBJECT
    if (regulativeStatement.indirectObject) {
      nodeStructure.children.push(this.getStatementOrComponentWithProperties(regulativeStatement.indirectObject, INDIRECT_OBJECT));
    }

    // Activation Condition
    if (regulativeStatement.activationCondition) {
      nodeStructure.children.push(this.getStatementOrComponentWithoutProperties(regulativeStatement.activationCondition, ACTIVATION_CONDITION));
    }

    // Execution Constraint
    if (regulativeStatement.executionConstraint) {
      nodeStructure.children.push(this.getStatementOrComponentWithoutProperties(regulativeStatement.executionConstraint, EXECUTION_CONSTRAINT));
    }

    // OR ELSE
    if (regulativeStatement.orElse) {
      nodeStructure.children.push(this.getStatementNodeStructure(regulativeStatement.orElse, OR_ELSE + PREFIX_SEPARATOR));
    }

    return nodeStructure;
  }

  getConstitutiveStatementNodeStructure(constitutiveStatement, titlePrefix) {
    let nodeStructure = {
      text: {
        title: titlePrefix + (constitutiveStatement.type === INSTITUTIONAL_STATEMENT_TYPE ? CONSTITUTIVE_STATEMENT : CONSTITUTIVE_STATEMENT_OF_FACT),
        name: constitutiveStatement.text
      },
      children: []
    };

    // consistutedEntity
    nodeStructure.children.push(this.getComponentWithProperties(constitutiveStatement.constitutedEntity, CONSTITUTED_ENTITY));

    // deontic
    if (constitutiveStatement.deontic) {
      nodeStructure.children.push(this.getSimpleNode(constitutiveStatement.deontic, DEONTIC));
    }

    // constitutiveFunction
    nodeStructure.children.push(this.getComponentWithoutProperties(constitutiveStatement.constitutiveFunction, CONSTITUTIVE_FUNCTION));

    // constitutingProperty
    if (constitutiveStatement.constitutingProperty) {
      nodeStructure.children.push(this.getComponentWithProperties(constitutiveStatement.constitutingProperty, CONSTITUTING_PROPERTY));
    }

    // activationCondition
    if (constitutiveStatement.activationCondition) {
      nodeStructure.children.push(this.getStatementOrComponentWithoutProperties(constitutiveStatement.activationCondition, ACTIVATION_CONDITION));
    }

    // executionConstraint
    if (constitutiveStatement.executionConstraint) {
      nodeStructure.children.push(this.getStatementOrComponentWithoutProperties(constitutiveStatement.executionConstraint, EXECUTION_CONSTRAINT));
    }

    // orElse
    if (constitutiveStatement.orElse) {
      nodeStructure.children.push(this.getStatementNodeStructure(constitutiveStatement.orElse, OR_ELSE + PREFIX_SEPARATOR));
    }

    return nodeStructure;
  }

  getSimpleNode(component, componentName) {
    // SimpleNode is either string or object with text, begin, length keys
    let nodeStructure = {
      text: {
        title: componentName,
        name: typeof component === 'string' ? component : component.text
      }
    }

    return nodeStructure;
  }

  getComponentWithProperties(component, componentName) {

    if (component.logicalOperator) { // ComponentWithPropertiesCombination
      return this.getComponentWithPropertiesCombination(component, componentName)
    } else if (component.element) { // Component with loose properties
      return this.getNodeWithProperties(component, componentName);
    } else { // SimpleNode
      return this.getSimpleNode(component, componentName);
    }
  }

  getComponentWithPropertiesCombination(component, componentName) {
    let nodeStructure = {
      text: {
        title: componentName + " " + COMBINATION_POSTFIX
      },
      children: [{
        text: {
          title: LOGICAL_OPERATOR,
          name: component.logicalOperator
        },
        children: component.components.map(subComponent => this.getComponentWithProperties(subComponent, componentName))
      }]
    };

    return nodeStructure;
  }

  getNodeWithProperties(component, componentName) {
    // it consists of simple node and properties
    let nodeStructure = this.getSimpleNode(component.element, componentName);
    nodeStructure.children = component.properties.map(property => this.getStatementOrComponentWithProperties(property, PROPERTY));

    return nodeStructure;
  }

  getStatementOrComponentWithProperties(component, componentName) {
    if (component.aim || component.constitutiveFunction || (component.logicalOperator && component.statements)) {
      return this.getStatementNodeStructure(component, componentName + PREFIX_SEPARATOR);
    } else if(component.logicalOperator && component.components) { 
      return this.getStatementOrComponentWithPropertiesCombination(component, componentName);
    } else if(component.element) {
      return this.getNodeWithProperties(component, componentName);
    } else {
      return this.getSimpleNode(component, componentName);
    }
  }

  getStatementOrComponentWithPropertiesCombination(component, componentName) {
    let nodeStructure = {
      text: {
        title: componentName + " " + COMBINATION_POSTFIX
      },
      children: [{
        text: {
          title: LOGICAL_OPERATOR,
          name: component.logicalOperator
        },
        children: component.components.map(subComponent => this.getStatementOrComponentWithProperties(subComponent, componentName))
      }]
    };

    return nodeStructure;
  }

  getComponentWithoutProperties(component, componentName) {
    if (component.logicalOperator) {
      return this.getComponentWithoutPropertiesCombination(component, componentName);

    } else {
      return this.getSimpleNode(component, componentName);
    }
  }
  
  getComponentWithoutPropertiesCombination(component, componentName) {
    let nodeStructure = {
      text: {
        title: componentName + " " + COMBINATION_POSTFIX
      },
      children: [{
        text: {
          title: LOGICAL_OPERATOR,
          name: component.logicalOperator
        },
        children: component.components.map(subComponent => this.getComponentWithoutProperties(subComponent, componentName))
      }]
    };

    return nodeStructure;
  }

  getStatementOrComponentWithoutProperties(component, componentName) {
    // Component is Statement
    if (component.aim || component.constitutiveFunction || (component.logicalOperator && component.statements)) {
      return this.getStatementNodeStructure(component, componentName + PREFIX_SEPARATOR);
    } else if (component.logicalOperator) { // StatementOrComponentWithoutPropertiesCombination
      return this.getStatementOrComponentWithoutPropertiesCombination(component, componentName);
    } else {
      return this.getSimpleNode(component, componentName);
    }
  }

  getStatementOrComponentWithoutPropertiesCombination(component, componentName) {
    let nodeStructure = {
      text: {
        title: componentName + " " + COMBINATION_POSTFIX
      },
      children: [{
        text: {
          title: LOGICAL_OPERATOR,
          name: component.logicalOperator
        },
        children: component.components.map(subComponent => this.getStatementOrComponentWithoutProperties(subComponent, componentName))
      }]
    };

    return nodeStructure;
  }

}

class VisualisationController {
  constructor(treeDivId, prevButtonId, nextButtonId, fileInputId, counterId) {
    this.treeDivId = treeDivId;
    this.prevButtonId = prevButtonId;
    this.nextButtonId = nextButtonId;
    this.fileInputId = fileInputId;
    this.counterId = counterId;
    
    this.treeParserHelper = new TreeParserHelper();
    
    this.currentTree = null;
    this.currentStatementIndex = 0;
    
    this.yamlString = null;
    this.statements = null;

    $(this.nextButtonId).click(this.drawNextTree);
    $(this.prevButtonId).click(this.drawPrevTree);
    $(this.fileInputId).change(this.loadStatements);
  }

  /* 
    ====================IMPORTANT !!=================================================
    Declare all method as arrow functions so 'this' keyword refers to class instance
    ====================IMPORTANT !!==================================================
  */

  changeButtonDisabledState = (state) => {
    $(this.nextButtonId).prop('disabled', state);
    $(this.prevButtonId).prop('disabled', state);
  }

  loadStatements = async () => {
    this.changeButtonDisabledState(true);

    try {
      const file = $(this.fileInputId).prop('files')[0];
      if(file === undefined) {
        this.changeButtonDisabledState(false);
        return; // no file was selected
      }

      this.yamlString = await file.text();
      this.statements = jsyaml.load(this.yamlString).statements;
      if(!Array.isArray(this.statements)) {
        alert('Uploaded yaml does not contain statements!');
        $(this.counterId).text('');
        return;
      }
    } catch(error) {
      alert('Uploaded yaml file has incorrect format!');
      $(this.counterId).text('');
      return;
    }
    
    this.changeButtonDisabledState(false);

    this.currentStatementIndex = 0;
    this.drawCurrentTree();
  }

  drawCurrentTree = () => {
    $(this.counterId).text(`${this.currentStatementIndex + 1}/${this.statements.length}`)
    if (this.currentTree) {
      this.currentTree.destroy();
    }
    try {
      this.currentTree = this.treeParserHelper.drawTree(this.treeDivId, this.statements[this.currentStatementIndex]);
    } catch(error) {
      alert(`Statement #${this.currentStatementIndex + 1} has incorrect format and cannot be parsed!`);
    }
  }

  drawNextTree = () => {
    this.currentStatementIndex = (this.currentStatementIndex + 1) % this.statements.length;
    this.drawCurrentTree();
  }

  drawPrevTree = () => {
    this.currentStatementIndex = (this.currentStatementIndex + this.statements.length - 1) % this.statements.length;
    this.drawCurrentTree();
  }

  getFileContent = () => {
    return this.yamlString;
  }
}

class VController {
  constructor(leftController, rightController, diffBtn) {
    this.leftController = leftController;
    this.rightController = rightController;
    this.diffBtn = diffBtn;

    $(this.diffBtn).click(this.toggleDiffBtn);
  }

  toggleDiffBtn = () => {
    var dc = document.getElementById('diff-container');
    var tc = document.getElementById('tree-container')

    if (dc.hidden == true) {
      var leftFile = this.leftController.getFileContent();
      var rightFile = this.rightController.getFileContent();

      var diff = Diff.createTwoFilesPatch("file", "file", leftFile || "", rightFile || "");
      dc.innerHTML = Diff2Html.html(diff, { inputFormat: 'diff', drawFileList: false, matching: 'lines', outputFormat: 'side-by-side' });
      document.getElementsByClassName("d2h-file-header")[0].hidden = true;
    }

    dc.hidden = !dc.hidden;
    tc.hidden = !tc.hidden;
  }
}

$(document).ready(function () {
  var leftStatementController = new VisualisationController('#left-treant-tree', '#left-prev-button', '#left-next-button', '#left-file-input', '#left-counter');
  var rightStatementController = new VisualisationController('#right-treant-tree', '#right-prev-button', '#right-next-button', '#right-file-input', '#right-counter');
  var controller = new VController(leftStatementController, rightStatementController, "#diff-button");
});
