$(document).ready(function () {

  //drawTree('#treant_tree', undefined);

  /* ================= TREE DRAWING =============== */

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

  /*
    Use this method to draw the tree.
    Params:
      divId - id of the div inside which tree will be drawn
      statement - single Statement inside yaml file that will be drawn 
  */
  function drawTree(divId, statement) {

    let chart_config = {
      chart: {
        container: divId,
        animateOnInit: true,
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

    chart_config.nodeStructure = getStatementNodeStructure(statement, '');

    return new Treant(chart_config);
  }

  /* 
    Prefix is used if one of elements such as Direct Object, 
    Indirect Object, etc. are statements instead of words
  */
  function getStatementNodeStructure(statement, titlePrefix) {

    if (statement.logicalOperator) {
      return getStatementCombinationNodeStructure(statement, titlePrefix);
    } else if (statement.aim) {
      return getRegulativeStatementNodeStructure(statement, titlePrefix);
    } else if (statement.constitutiveFunction) {
      return getConstitutiveStatementNodeStructure(statement, titlePrefix);
    }

    throw 'Statement has incorrect type';
  }

  function getStatementCombinationNodeStructure(statementCombination, titlePrefix) {
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
        children: statementCombination.statements.map(statement => getStatementNodeStructure(statement, ''))
      }]
    };

    // orElse's type is statement
    if (statementCombination.orElse) {
      nodeStructure.children.push(getStatementNodeStructure(statementCombination.orElse, OR_ELSE + PREFIX_SEPARATOR));
    }

    return nodeStructure;
  }

  function getRegulativeStatementNodeStructure(regulativeStatement) {
    let nodeStructure = {
      text: {
        title: titlePrefix + (regulativeStatement.type === INSTITUTIONAL_STATEMENT_TYPE ? REGULATIVE_STATEMENT : REGULATIVE_STATEMENT_OF_FACT),
        name: regulativeStatement.text
      },
      children: []
    };

    // ATTRIBUTE
    nodeStructure.children.push(getComponentWithProperties(regulativeStatement.attribute, ATTRIBUTE));

    // DEONTIC
    if(regulativeStatement.deontic) {
      nodeStructure.children.push(getSimpleNode(regulativeStatement.deontic, DEONTIC));
    }

    // AIM
    nodeStructure.children.push(getComponentWithoutProperties(regulativeStatement.aim, AIM));
    
    // DIRECT OBJECT
    if(regulativeStatement.directObject) {
      nodeStructure.children.push(getStatementOrComponentWithProperties(regulativeStatement.directObject, DIRECT_OBJECT));
    }

    // INDIRECT OBJECT
    if(regulativeStatement.indirectObject) {
      nodeStructure.children.push(getStatementOrComponentWithProperties(regulativeStatement.indirectObject, INDIRECT_OBJECT));
    }

    // Activation Condition
    if(regulativeStatement.activationCondition) {
      nodeStructure.children.push(getStatementOrComponentWithoutProperties(regulativeStatement.activationCondition, ACTIVATION_CONDITION));
    }
    
    // Execution Constraint
    if(regulativeStatement.executionConstraint) {
      nodeStructure.children.push(getStatementOrComponentWithoutProperties(regulativeStatement.executionConstraint, EXECUTION_CONSTRAINT));
    }

    // OR ELSE
    if(regulativeStatement.orElse) {
      nodeStructure.children.push(getStatementNodeStructure(regulativeStatement.orElse, OR_ELSE + PREFIX_SEPARATOR));
    }

    return nodeStructure;
  }

  function getConstitutiveStatementNodeStructure(constitutiveStatement, titlePrefix) { 
    let nodeStructure = {
      text: {
        title: titlePrefix + (constitutiveStatement.type === INSTITUTIONAL_STATEMENT_TYPE ? CONSTITUTIVE_STATEMENT : CONSTITUTIVE_STATEMENT_OF_FACT),
        name: constitutiveStatement.text
      },
      children: []
    };

    // consistutedEntity
    nodeStructure.children.push(getComponentWithProperties(constitutiveStatement.constitutedEntity, CONSTITUTED_ENTITY));

    // deontic
    if(constitutiveStatement.deontic) {
      nodeStructure.children.push(getSimpleNode(constitutiveStatement.deontic, DEONTIC));
    }

    // constitutiveFunction
    nodeStructure.children.push(getComponentWithoutProperties(constitutiveStatement.constitutiveFunction, CONSTITUTIVE_FUNCTION));
    
    // constitutingProperty
    if(constitutiveStatement.constitutingProperty) {
      nodeStructure.children.push(getComponentWithProperties(constitutiveStatement.constitutingProperty, CONSTITUTING_PROPERTY));
    }
    
    // activationCondition
    if(constitutiveStatement.activationCondition) {
      nodeStructure.children.push(getStatementOrComponentWithoutProperties(constitutiveStatement.activationCondition, ACTIVATION_CONDITION));
    }

    // executionConstraint
    if(constitutiveStatement.executionConstraint) {
      nodeStructure.children.push(getStatementOrComponentWithoutProperties(constitutiveStatement.executionConstraint, EXECUTION_CONSTRAINT));
    }

    // orElse
    if(constitutiveStatement.orElse) {
      nodeStructure.children.push(getStatementNodeStructure(constitutiveStatement.orElse, OR_ELSE));
    }

    return nodeStructure;
  }

  function getSimpleNode(component, componentName) {
    // SimpleNode is either string or object with text, begin, length keys
    let nodeStructure = {
      text: {
        title: componentName,
        name: typeof a === 'string' ? component : component.text
      }
    }

    return nodeStructure;
  }

  function getComponentWithProperties(component, componentName) {

    if (component.logicalOperator) { // ComponentWithPropertiesCombination
      return getComponentWithPropertiesCombination(component, componentName)
    } else if (component.element) { // Component with loose properties
      return getComponentWithLooseProperties(component, componentName);
    } else { // SimpleNode
      return getSimpleNode(component, componentName);
    }
  }

  function getComponentWithPropertiesCombination(component, componentName) {
    let nodeStructure = {
      text: {
        title: componentName + " " + COMBINATION_POSTFIX
      },
      children: [{
        text: {
          title: LOGICAL_OPERATOR,
          name: component.logicalOperator
        },
        children: component.components.map(subComponent => getComponentWithProperties(subComponent, componentName))
      }]
    };

    return nodeStructure;
  }

  function getComponentWithLooseProperties(component, componentName) {
    // it consists of simple node and properties
    let nodeStructure = getSimpleNode(component.element, componentName);
    nodeStructure.children = component.properties.map(property => getStatementOrComponentWithProperties(property, PROPERTY));
    
    return nodeStructure;
  }

  function getStatementOrComponentWithProperties(component, componentName) {
    // Component is Statement
    if(component.aim || component.constitutiveFunction || (component.logicalOperator && component.statements)) {
      return getStatementNodeStructure(component, componentName);
    } else { // Component is component with Properties 
      return getComponentWithProperties(component, componentName);
    }
  }

  function getComponentWithoutProperties(component, componentName) {
    if(component.logicalOperator) {
      let nodeStructure = {
        text: {
          title: componentName + " " + COMBINATION_POSTFIX
        },
        children: [{
          text: {
            title: LOGICAL_OPERATOR,
            name: component.logicalOperator
          },
          children: component.components.map(subComponent => getComponentWithoutProperties(subComponent, componentName))
        }]
      };

      return nodeStructure;

    } else {
      return getSimpleNode(componentName);
    }
  }

  function getStatementOrComponentWithoutProperties(component, componentName) { 
    // Component is Statement
    if(component.aim || component.constitutiveFunction || (component.logicalOperator && component.statements)) {
      return getStatementNodeStructure(component, componentName);
    } else { // Component is component without Properties 
      return getComponentWithoutProperties(component, componentName);
    }
  }
  
});
