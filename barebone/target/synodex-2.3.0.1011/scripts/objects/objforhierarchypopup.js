/*
 * Object for handling code hiearchy pop-up feature
 * @author: Amit Grover(agrover@innodata.com)
 * @dated:  27/07/2012 - 27/07/2012
 */


function ObjForHierarchyPopUp(codeToBeReplace, currDpEntryId) {
  this.medicalcodes = null;
  this.codeToBeReplace = codeToBeReplace;
  this.lastSelSubCategory = null;
  this.dpEntryId = currDpEntryId;
  this.codeName = codeToBeReplace;

  /** init() 
   *Initialise the Step 2QA Hierarchy Pop Screen with selected code hierarchy to be replace */
  this.init = function() {
    $('#header').css('display', 'none');
    $('#closeButton').show();
    $('#sweep_r_wrapper_iws2_hieracrchy_dpentry').show();
    //register glossary click event
    glossaryClickHandler();
    this.setStep2QAHierarchyPopup();
  }

  this.setStep2QAHierarchyPopup = function() {
    this.resetSearchCriteriaBox();
    createAccordianMenu('#iws2_category_list_entries', '#collapse_all', '#expand_all',this.dpEntryId,this.codeName);
    getCodeParentPathsByName(this.codeToBeReplace);
  }

  /** resetSearchCriteriaBox()
   *  Reset the serch input box with code to be replace into it as a search criteria
  */
  this.resetSearchCriteriaBox = function() {
    $('#icd10_list_input').val(this.codeToBeReplace);
  }

  /** setBreadcrumb(categoryName, subCategoryName)
   *  will set the breadcrumb for selected hierarchy
   *   
   *  @param - categoryName
   *  @param - subCategoryName
   */
  this.setBreadcrumb = function(categoryName, subCategoryName) {// breadcrumb for selected category/subcategory
    $('#iws2_category_search_status2').css('margin-left', '10px');
    $('#iws2_category_search_status2').css('margin-top', '5px');
    if(categoryName != subCategoryName)
      $('#iws2_category_search_status2').html('<b>' + categoryName + ' - ' + subCategoryName + '</b>');
    else//this branch only has 2 levels
      $('#iws2_category_search_status2').html('<b>' + categoryName + '</b>');

    if(this.lastSelSubCategory == null)
      this.lastSelSubCategory = this.subCatId;
    if(this.lastSelSubCategory != this.subCatId) {
      $('#subcategory_' + this.lastSelSubCategory).css('color', 'black');
      this.lastSelSubCategory = this.subCatId;
    }
    $('#subcategory_' + this.subCatId).css('color', 'red');

  }
  
  /** hcySubcategoryClickHandler(subCatId, categoryName, subCategoryName, subdiv)
   *  Handles the Hierarchy pop-up subcategory click to open the medical codes with selected code name 
   *  
   *  @param- subCatId: subcategoryId
   *  @param- categoryName : selected category Name
   *  @param- subCategoryName: selected subcategory Name
   *  @param- subdiv: div to be used
   */
  this.hcySubcategoryClickHandler = function(subCatId, categoryName, subCategoryName, subdiv) {
    this.subCatId = subCatId;
    this.setBreadcrumb(categoryName, subCategoryName);
    this.medicalcodes = getHcyPopUpMedicalCodes(subCatId, subdiv);

    if(this.medicalcodes == null)
      $('#iws2_subc_entries').html("No Code Exist for this SubCategory...");
    else if(this.medicalcodes.length == 1)
      $('#medicalCodeRow_' + this.medicalcodes[0].id).trigger('focus');
    else if(medicalCodes[0].level = 1 && this.medicalcodes[1].level > this.medicalcodes[0].level)
      $('#anchorAccordionCode_' + this.medicalcodes[0].id).trigger('focus');
    else
      $('#medicalCodeRow_' + this.medicalcodes[0].id).trigger('focus');
    window.opener.$('#iws2_dp_datepicker_'+this.dpEntryId+ '_' + this.codeName.replace(/\./g,'-')).focus();
  }
  
};