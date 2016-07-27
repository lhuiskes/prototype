/*! */
/*! ${project} */

// Self wrapping closure
// Set strict on our scope.
(function(){
    "use strict";

    // ---------------------
    // Setup Slider
    // ---------------------
    jQuery(function($) { 

      // settings
      var $slider = $('.slider'); // class or id of carousel slider
      var $slide = 'li'; // li from carousel slider
      var $slider_text = $('.circle-tekst'); // class or id of text slider
      var $slide_text = 'div'; // div from text slider
      var $transition_time = 1000; // 1 second
      var $time_between_slides = 5000; // 5 seconds
      var $interval


      function slides(){
        return $slider.find($slide);
      }

      function slides_text(){
        return $slider_text.find($slide_text);
      }

      slides().fadeOut();

      // set active classes
      slides().first().addClass('active');
      slides_text().first().addClass('active');
      slides().first().fadeIn($transition_time);

      // auto scroll 
      $interval = setInterval(
        function(){
          var $i = $slider.find($slide + '.active').index();
          var $p = $slider_text.find($slide_text + '.active').index();

          slides().eq($i).removeClass('active');
          slides_text().eq($i).removeClass('active');
          slides().eq($i).fadeOut($transition_time);

          if (slides().length == $i + 1) $i = -1; // loop to start

          slides().eq($i + 1).fadeIn($transition_time);
          slides().eq($i + 1).addClass('active');
          slides_text().eq($i + 1).addClass('active');
        }
        , $transition_time +  $time_between_slides
      );

    });
    
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