(function( $ ){

	$.fn.textSelectionToggler = function() {
	
		var jqInput = $(this);
		var domInput = jqInput.get(0);
		jqInput.data('selected', false);
	
		this.mouseup(function(){                       

			if (shouldSelectAllTextInField()) {
				jqInput.select();
			}
			
			toggleSelectedFlag();
		});
	   
		this.blur(function(){	
			clearSelectionAndResetSelectedFlag();
		});
		
		/** Text selection methods **/
		function shouldSelectAllTextInField() {
			if (!textSelectionAlreadyPresent() && !specificTextRangeSelected()) {
				return true;
			}
			return false;
		}
		
		function textSelectionAlreadyPresent() {
			return jqInput.data('selected');
		}
		
		function specificTextRangeSelected() {
			if (isIE()) {
				return hasSelectionBeenMadeInIE();
			}
			return hasSelectionBeenMadeInGoodBrowser();			
		}
		
		function hasSelectionBeenMadeInIE() {
			domInput.focus();
			if (document.selection.createRange().text.length > 0) {
				return true;
			}
			return false;
		}
		
		function hasSelectionBeenMadeInGoodBrowser() {
			var selectionLength = domInput.selectionEnd - domInput.selectionStart;
			if (selectionLength > 0) {
				return true;
			}
			return false;		
		}
		
		/** Helper functions **/
		function toggleSelectedFlag() {
			if (jqInput.data('selected')) {
				jqInput.data('selected', false);
			}
			else {
				jqInput.data('selected', true);
			}
		}
		
		function isIE() {
			if (document.selection) {
				return true;
			}
			return false;
		}
		
		function isFF() {
			return ($.browser.mozilla);
		}
		
		function clearSelectionAndResetSelectedFlag() {
			if (isFF()) {
				//Fixes bug where FF selects then deselects the content after leaving and 
				//re-entering the field (if you click where the selected content was).
				var input = jqInput.get(0);
				input.selectionStart = 0;
				input.selectionEnd = 0;
			}
			
			jqInput.data('selected', false);
		}

	};
	
})( jQuery );