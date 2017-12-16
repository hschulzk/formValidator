function moneyFormatting(currentVal){
	//Regex to only allow numbers and periods
	let moneyFormatVal = currentVal.replace(/[\.$]/g, "");
	moneyFormatVal = currentVal.replace(/[a-zA-Z]/g, "");
	//set the index of the decimal, if any to a variable for clarity of code
	let periodPlace = moneyFormatVal.indexOf(".");
	//If there is no decimal in the value, add it with 00 cents
	if(periodPlace ==  -1) {
		moneyFormatVal = moneyFormatVal + ".00";
	} else {
		//If there are multiple decimal points, Number() returns NaN, so I am checking for that here
		if (isNaN(Number(moneyFormatVal).toFixed(2))) {
			//If there are multiple decimal points in the value, return only the two values after the first decimal point
			moneyFormatVal = moneyFormatVal.slice(0,periodPlace) + moneyFormatVal.slice(periodPlace, periodPlace + 3);
		} else {
			moneyFormatVal = Number(moneyFormatVal).toFixed(2);			
		}

	}			
	return moneyFormatVal;
}

function dateFormatting(dateVal) {
	//regex for numbers, / and -
	let fData = dateVal.replace(/[^-\/0-9]/g, "");
	return fData;
}

function numberFormatting(numVal) {
	//regex for numbers, / and -
	let fData = numVal.replace(/[^0-9]/g, "");
	return fData;
}

function pdfValidate(fullPath) {
	if (fullPath) {
	    let startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
	    let filename = fullPath.substring(startIndex);
	    if (filename.indexOf('.pdf') > -1) {
	        return true;
	    }
	    return false;
	}

}

function bindInputs(parent) {
	$(parent).bind('focusout', function(e){
	    if($(e.target).is(':invalid') && ($(e.target).val().length) > 0) {
	        $(e.target).parent().addClass('invalid');
	        let errorMessage = $(e.target).attr('title');
	        $(e.target).prev('.formValidationError').remove();
	        $(`<span class='formValidationError'>${errorMessage}</span>`).insertBefore($(e.target));
			        
	    } else {
	        $(e.target).parent().removeClass('invalid');
	        $(e.target).prev('span.formValidationError').remove();
	    }
	});

	$(parent).find(".validateNumber").each(function(){
		$(this).change(function() {
			let dateVal = numberFormatting($(this).val());
			$(this).val(dateVal);
		});		
	});

	$(parent).find(".validateMoney").each(function(){
		$(this).change(function(){
			let moneyVal = moneyFormatting($(this).val());
			$(this).val(moneyVal);
		});
	});
	
	$(parent).find(".validateDate").each(function(){
		$(this).change(function() {
			let dateVal = dateFormatting($(this).val());
			$(this).val(dateVal);
		});
	});

	$(parent).find(".validatePDF").each(function(){
		$(this).change(function() {
			let pdfVal = pdfValidate($(this).val());
			if(!pdfVal) {
				$(this).val('');
			}			
		});
	});

}


$( document ).ready(function() {
	bindInputs(document);
});