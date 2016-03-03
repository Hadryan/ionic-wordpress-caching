angular.module('wordpress.filters', [])

.filter('rtfcontent', function ($sce) {

	return function(text) {

		var htmlObject = document.createElement('div');
		htmlObject.innerHTML = text;

		var postlinks = htmlObject.getElementsByTagName('a');

		for (var i = 0; i < postlinks.length; i++) {

		    var link = postlinks[i].getAttribute('href');

		    postlinks[i].removeAttribute('href');
		    postlinks[i].setAttribute('onclick', 'window.open("'+ link +'", "_blank", "location=no,enableViewportScale=yes")');
		}

		return $sce.trustAsHtml(htmlObject.outerHTML);

	}

})