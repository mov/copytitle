// COPY TITLE/DESCRIPTION/KEYWORDS

var copytitledesc = {

	// INITIALIZATION CODE
	onLoad: function() {
		this.initialized = true;
		this.strings = document.getElementById("copytitledesc-strings");
		this.gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
		this.promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
	},
  
	// GET THE FULL HTML OF AN ELEMENT
	// (Firefox does not currently support outerHTML)
	outerHTML: function(node){
		return node.outerHTML || (
		  function(n){
			  var div = content.document.createElement('div', n.namespaceURI);
			  var h;
			  div.appendChild( n.cloneNode(true) );
			  h = div.innerHTML;
			  div = null;
			  return h;
		  }
		)(node);
	},

	// RETURN META TAG CONTENT
	getMetaContent: function(metaName, isHTML) {
		var metas = content.document.getElementsByTagName("meta");
		// found some meta tags
		if (metas.length > 0) {
			// find the element in the array with the name we're looking for
			for (var counter=0; counter < metas.length; counter++) {
				if (metas[counter].name.toLowerCase() == metaName.toLowerCase()) {
					if (isHTML == 0){
						return metas[counter].content;
					} else {
						return this.outerHTML(metas[counter]);
					}
				}
			}
		}
	},

	// COPY PAGE TITLE (TEXT)
	onCopyPageTitleText: function(e) {
		var pageElement = content.document.getElementsByTagName('title');
		// copy to clipboard if element exists and has content
		if (pageElement.length > 0 && pageElement[0].textContent != null){
			this.gClipboardHelper.copyString(pageElement[0].textContent);
		} else {
			this.promptService.alert(window, this.strings.getString("noTitleTitle"), this.strings.getString("noTitle"));
		}
	},
  
	// COPY META DESCRIPTION (TEXT)
	onCopyPageDescText: function(e) {
		var pageDesc = this.getMetaContent('description', 0);
		// copy to clipboard if element exists and has content
		if ( pageDesc != null ) {
			this.gClipboardHelper.copyString(pageDesc);
		} else {
			this.promptService.alert(window, this.strings.getString("noMetaDescriptionTitle"), this.strings.getString("noMetaDescription"));
		}
	},

	// COPY META KEYWORDS (TEXT)
	onCopyPageKeywordsText: function(e) {
		var keywords = this.getMetaContent('keywords', 0);
		// copy to clipboard if element exists and has content
		if ( keywords != null ) {
			this.gClipboardHelper.copyString(keywords);
		} else {
			this.promptService.alert(window, this.strings.getString("noKeywordsTitle"), this.strings.getString("noKeywords"));
		}
	},  
  
	// COPY HTML
	onCopyHTML: function(e) {
		// Get title, desc, and keywords from the page
		var theTitle = this.outerHTML(content.document.getElementsByTagName('title')[0]);
		var theDesc = this.getMetaContent('description', 1);
		var theKeywords = this.getMetaContent('keywords', 1);

		// Put all 3 items together
		var theCode = '';
		if (theTitle != null) { theCode += theTitle + '\n'; }
		if (theDesc != null) { theCode += theDesc + '\n'; }
		if (theKeywords != null) { theCode += theKeywords + '\n'; }

		// Copy to clipboard
		if ( theCode != '' ) {
			this.gClipboardHelper.copyString(theCode);
		} else {
			this.promptService.alert(window, this.strings.getString("noHTMLTitle"), this.strings.getString("noHTML"));
		}
	}
};

// REGISTER EVENT LISTENER
window.addEventListener("load", function () { copytitledesc.onLoad(); }, false);