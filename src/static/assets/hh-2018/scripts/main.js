$(function(){
    const sr = ScrollReveal();

    //ScrollReveal Parts
    sr.reveal('.sponsor-logo', { duration: 1500}, 50);
    sr.reveal('.contact-item', { duration: 1500}, 50);

    //Provides the functionality for the expansions of the boxes in the FAQ section
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
        panel.style.maxHeight = null;
        } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
    }

    $( ".accordion" ).click(function() {
        if (  $(this).children('.accordion-icon').css("transform") == 'none' ){
            $(this).children('.accordion-icon').css("transform","rotate(180deg)");
        } else {
            $(this).children('.accordion-icon').css("transform","" );
        }
    });

    //Provides the functionality for the register button in the bottom right revealing itself
    new Waypoint({
        element: document.getElementById('about'),
        handler: function(direction) {
            if (direction === "up"){
                $("#menu-register").removeClass("visible");
                setTimeout(function(){$("#menu-register").hide()}, 500);
            }
            else{
                $("#menu-register").show();
                $("#menu-register").addClass("visible");
            }
        },
        offset: '100%'
    });
      
})