export const complexBOSource = `
// header doc
// copy right text
// @author Theo Sun
import Common.Hello as Hello;

[ChangeHistory]
[WillDeprecated("This object will be deprecated after 2019 year")]
[DeploymentUnit(CustomerRelationshipManagement)] 
/// [Author("Theo Sun")]
/// [Copyright("SAP ISS IBSO Chengdu Team")]
businessobject BO_FDNTest raises ERROR {

  message ERROR text "Reference to sales order &1 invalid for &2" : IntegerValue, ESF:AdressType;
  
  [Label("Name")]
  /// [Description("The Main Name of this object")]
  /// [Reference("https://jira.itc.sap.com/XXX-123")]
  element Name : LANGUAGEINDEPENDENT_MEDIUM_Name;

  /// [Description("This weight of this object, must be a positive value.")]
  element Weight: IntegerValue = 1;
  
  // the id of this object
  [AlternativeKey]
  /// [Optional("If the user does not specify this field value, the system assigns value based on the auto-increment sequence")]
  element ID  : ABSL.Code:ID;

  /**
   * Foundation Node
   */
  /// [Feature("Common Node, store the header information of this project")]
  [ChangeHistory]
  node FNDCommon [1,1] raises M1,M2 {

    message M1 text "&1": Text;
    message M2 text "&1": Text;

    element CommonName  : Text = "New Name";

    node Address [0,1] {

      element PostalCode  : Text;

      element Street      : Numeric;
      
    }

    element CommonAmount  : Amount = { currency = "CNY", value = 1.23 };

  }

  // say hello to field  
  /// [Deprecated("This action is coverred by another BO 'BO_Test2' action 'ActionHello'")]
  action ActionHello;

  /*
   * raise message to UI
   * 
   * in fact M3, M4 not defined
   */
  action ThrowError raises M3, M4; 


  /// [Feature("The countries has been registered for this object")]
  node CountryNode [0,n] {
    element CountryNodeID:ID = "1";
    element CountryCode:CountryCode;
  }

  association toGermany [0,1] to CountryNode valuation (CountryCode == "DE");

  association toPO [0,n] to PuchaseOrder;
  association toPO2 to PuchaseOrder using ID;

  
}

`;
