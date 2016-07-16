
var slideIndex = 1;
var content;
function plusSlides(n) {

  showSlides(slideIndex += n);
 
}

function dotslides(n) {
  console.log("buttonclicked",n,"slideIndex",slideIndex);
  if(n==0)
  showSlides(slideIndex+1);
else
  showSlides(slideIndex-1)
}

function showSlides(n) {
  
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
 
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}

function initialize() {
  var slidehttp = new XMLHttpRequest();
var url="https://api.dongxii.com/parse/classes/Story";
var header1='X-Parse-Application-Id';
var header2='dongxii';

    slidehttp.onreadystatechange = function () {
      if (slidehttp.readyState == 4 && slidehttp.status == 200){

         content = JSON.parse(slidehttp.response);
        
        showdetails(content);
        
    
      }
    }
  
  slidehttp.open("GET", url);
  slidehttp.setRequestHeader(header1,header2 );  
  slidehttp.send();

}


function showdetails (content) {
     
for (var i = 0; i < content.results.length; i++) {
   document.getElementById("dots").innerHTML += '<div class="dot" onclick="dotslides('+i+')"></div>'; 

  document.getElementById("contents").innerHTML +=
  '<div id="'+ i +'" class="w3-display-container mySlides"> <img src="' + content.results[i].teaser[0].url +'" style="width:100% "> <div class="w3-display-topright w3-container w3-padding-16 w3-black">'+content.results[i].title.en + ' </div><button class="button" id="bu"> Read Content / Close </button></div>';

}        

  for (var i = 0; i < content.results.length; i++) {
  
  };
 
  showSlides(slideIndex);
}
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
 $(window).bind("load", function () {
        $('#work-in-progress').fadeOut(100);
    });

$(document).ready(function(){
    $("#contents").click(function(){
  document.getElementById("details").innerHTML =content.results[slideIndex-1].content.en;

        $(document.getElementById("details")).slideToggle("slow");
    });
});



initialize();