/*! */
/*! ${project} */

// Self wrapping closure
// Set strict on our scope.
(function(){
    "use strict";

    // ---------------------
    // Setup Bootstrap Carousel
    // ---------------------
    $('.carousel').carousel({
      interval: 3000
    })

    $(document).ready(function() {  
       $("#carousel").swiperight(function() {  
          $("#carousel").carousel('prev');  
        });  
       $("#carousel").swipeleft(function() {  
          $("#carousel").carousel('next');  
       });  
    });  

    // ---------------------
    // Setup Youtube fullscreen
    // ---------------------
    var supportsVideo = !!document.createElement('video').canPlayType;
    if (supportsVideo) {
      var videoContainer = document.getElementById('videoContainer');
      var video = document.getElementById('video');
      var videoControls = document.getElementById('video-controls');

      // Hide the default controls
      video.controls = false;
      // Display the user defined video controls
      videoControls.style.display = 'block';

      var playpause = document.getElementById('playpause');
      var stop = document.getElementById('stop');
      var mute = document.getElementById('mute');
      var volinc = document.getElementById('volinc');
      var voldec = document.getElementById('voldec');
      var volumeBar = document.getElementById("volume-bar");
      var progress = document.getElementById('progress');
      var progressBar = document.getElementById('progress-bar');
      var fullscreen = document.getElementById('fs');

      playpause.addEventListener('click', function(e) {
         if (video.paused || video.ended) {
           video.play();
           $(this).find('i').toggleClass('fa-play fa-pause')
         }
         else {
           video.pause();
           $(this).find('i').toggleClass('fa-pause fa-play')
         }
      });
      stop.addEventListener('click', function(e) {
         video.pause();
         video.currentTime = 0;
         progress.value = 0;
      });
      mute.addEventListener('click', function(e) {
         video.muted = !video.muted;
         $(this).find('i').toggleClass('fa-volume-up fa-volume-off')
      });

      // Event listener for the volume bar
      volumeBar.addEventListener("change", function() {
        // Update the video volume
        video.volume = volumeBar.value;
      });

      video.addEventListener('loadedmetadata', function() {
         progress.setAttribute('max', video.duration);
      });
      video.addEventListener('timeupdate', function() {
         progress.value = video.currentTime;
         progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
      });
      video.addEventListener('timeupdate', function() {
         if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
         progress.value = video.currentTime;
         progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
      });

      progress.addEventListener('click', function(e) {
         var pos = (e.pageX  - this.offsetLeft) / this.offsetWidth;
         video.currentTime = pos * video.duration;
      });
    }

    $("#video-controls").hide();

    $('.fullscreen').on('click', function(e) {
      var d = {};
      var speed = 500;
      d.width = $(window).width();;
      d.height = $(window).height();; 


      $(".youtube").animate(d,speed);

      setTimeout(
        function()
        {
          video.play();
          var videowidth = $("#video").width();
          console.log(videowidth);
          $("#video-controls").width(videowidth);
          $("#video-controls").show();
        }, speed);

    });

    $('.closeyt').on('click', function(e) {
      var d = {};
      var speed = 500;
      d.width = 0;
      d.height = 0; 

      $("#video-controls").hide();

      $(".youtube").animate(d,speed);

      video.pause();
      video.currentTime = 0;
      progress.value = 0;

    });

    // ---------------------
    // Setup Masonry
    // ---------------------
    // $('.masonry').masonry({
    //   columnWidth: '.grid-sizer',
    //   percentPosition: true,
    //   itemSelector: '.grid-items'
    // });

    // ---------------------
    // Setup Scroll up bottom
    // ---------------------
    $('.scrollup').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    // ---------------------
    // Set listener on search buttons.
    // ---------------------
    $(".btn-search").click(function () {
      $(".search").slideToggle(
        "fast",
        function () {
          // TODO: only on slide open.
          $(".form-control").focus();
        });
    });


})(); // end scope.