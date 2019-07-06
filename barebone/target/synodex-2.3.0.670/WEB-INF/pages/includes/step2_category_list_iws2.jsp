<div id="iws2_category_list_search">
	<input name="icd10_list_input_search" id="icd10_list_input" onkeypress="searchHandle(event);">&nbsp;&nbsp;	
	<button class="searchbutton" id="icd10_list_input_search" onclick="handleSearchCriteria(caseId);">Search</button>
	<button class="searchbutton" id="icd10_list_input_reset" onclick="resetSearchCriteria();">Reset</button><br>
	<input type="radio" name="searchCriteria" id="searchByExactCode" value="ExactCode" checked="checked" />Exact Code
	<input type="radio" name="searchCriteria" id="searchByCode" value="Code" />Code and Desc
	<input type="radio" name="searchCriteria" id="searchByCategoryAndCode" value="CategoryAndCode"/>All
	<span id="icd10_glossary" class="icd10_glossary"><a href="#" title="Load Code Glossary">Glossary</a></span>
	<!-- temporary  -->
	<!-- span id="icd10_hierarchy"><a href="javascript:loadHierarchyPopUpWindow('Z8261');" title="Load Code Hierarchy">Hierarchy</a></span> -->
	<!-- temporary  -->
</div>

<!-- This section display the Category-Subcategory accordian menu list  -->
<div id="iws2_category_list_collapse">
	<span class="expand_collapse"><a href="#" id="expand_all">++
			expand all</a></span> <span class="expand_collapse"><a href="#"
		id="collapse_all">-- collapse all</a></span>
	<span id="medical_code_rev" style="float:right; padding-right:20px; color: darkBlue; font-weight: bold;"></span>
</div>
<div id="iws2_category_search_status"></div>
<div id="iws2_category_list_entries"></div>