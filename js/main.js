function GetSitemap(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'sitemap.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 
 window.onload = function() {
    if (window.jQuery) {  
        // jQuery is loaded  
		 GetSitemap(function(response) {
		  // Parse JSON string into object
			var actual_JSON = JSON.parse(response);
			var toAdd = "<nav class=\"table-of-pages\" role=\"navigation\"> <ul>";
			for(item in actual_JSON){
				toAdd += "<li>" + "<a href=\"" + item + "\">" + actual_JSON[item].Name +"</a></li>";
			}
			toAdd += "</ul></nav>";
			$(toAdd).insertAfter(".nav-head");
     });
     addTitles();
    } else {
        // jQuery is not loaded
        alert("This browser is not supported, please download anything but IE");
    }
}
 
function addTitles(){
var ToC =
  "<nav role='navigation' class='table-of-contents'>" +
    "<ul>";

var newLine, el, title, link;

$("article h3").each(function() {

  el = $(this);
  title = el.text();
  link = "#" + el.attr("id");

  newLine =
    "<li>" +
      "<a href='" + link + "'>" +
        title +
      "</a>" +
    "</li>";

  ToC += newLine;

});

ToC +=
   "</ul>" +
  "</nav>";

$(ToC).insertAfter(".nav-head");

$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
}