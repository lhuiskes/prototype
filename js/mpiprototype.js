/*! */
/*! ${project} */

// Self wrapping closure
// Set strict on our scope.
(function(){
    "use strict";

    // ---------------------
    // Setup Fullscreen
    // ---------------------
    var isFullscreen = false;
    
    $('.fullscreen').on('click', function(e) {
        $(this).animate({width: '100%', height: 100, position: 'absolute'}, 500);
    });
    
    // function fullscreen(){
    //     var d = {};
    //     var speed = 900;
    //     if(!isFullscreen){ // MAXIMIZATION
    //         d.width = "100%";
    //         d.height = "100%";
    //         isFullscreen = true;
    //         $("h1").slideUp(speed);
    //     }
    //     else{ // MINIMIZATION
    //         d.width = "300px";
    //         d.height = "100px";
    //         isFullscreen = false;
    //         $("h1").slideDown(speed);
    //     }
    //     $(".fullscreen").animate(d,speed);
    // }
    
    // ---------------------
    // Setup Masonry
    // ---------------------
    $('.masonry').masonry({
      columnWidth: '.grid-sizer',
      percentPosition: true,
      itemSelector: '.grid-items'
    });

    // ---------------------
    // Setup Scroll up bottom
    // ---------------------

    $('.scrollup').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    });

})(); // end scope.