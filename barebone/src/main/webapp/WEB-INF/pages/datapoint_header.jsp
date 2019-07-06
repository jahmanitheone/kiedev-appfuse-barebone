<div class="sweep_r_header_buttons">
 	<button  id="filterbtn" onclick="javascript:addTableDataPoints(step,objCase.id, $('#page_filter option:selected').val())" class="bodybutton"> Filter </button>
	&nbsp;
	<button class="bodybutton" id="openLHS" style="display:none;" onclick="openLHS()">Open LHS</button>
	&nbsp;
	<button class="bodybutton" id="completeStep" onclick="finishStepConfirm();">Complete</button>
</div>
<div class="sweep_r_header_filter">
	<span id="filter"> Filter by group: 
		<select id="page_filter"><option value="">No filter ...</option></select> 
	</span>
</div>

