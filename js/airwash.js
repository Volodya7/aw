(function () {

  $('[data-toggle="tooltip"]').tooltip();

  //provide smooth transition between sections
  $('a[href*=\\#]').on('click', function (event) {
    event.preventDefault();
    $('html,body').animate({ scrollTop: $(this.hash).offset().top - 59 }, 500);
  });


  //google marker logic
  var mapInfo = { "lat": "49.831157", "lon": "24.0425231" }; //Change a map coordinate here!
  try {
    $('.map').gmap3({
      action: 'addMarker',
      latLng: [mapInfo.lat, mapInfo.lon],
      map: {
        center: [mapInfo.lat, mapInfo.lon],
        zoom: 14
      },
    },
      { action: 'setOptions', args: [{ scrollwheel: false }] }
    );
  } catch (err) {
    console.log(err);
  }

  //5841978689
  var token = '5841978689.1ce4712.6dce890286564145a16c183ee1234749', // learn how to obtain it below
    userid = 5841978689, // User ID - get it in source HTML of your Instagram profile or look at the next example :)
    num_photos = 10, // how much photos do you want to get
    filterTag = "aw";

  $.ajax({
    url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent', // or /users/self/media/recent for Sandbox
    // url: 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent',
    dataType: 'jsonp',
    type: 'GET',
    data: { access_token: token, count: num_photos },
    success: function (data) {
      var counter = 1;
      for (x in data.data) {
        if (photoIsValid(data.data[x].tags)) {
          $('#carouselportfolio').append(' <div><a href="' + data.data[x].link + '" target="_blank"><img class="d-block img-fluid" src="' + data.data[x].images.standard_resolution.url + '"></a></div>'); // data.data[x].images.low_resolution.url - URL of image, 306х306
          // data.data[x].images.thumbnail.url - URL of image 150х150
          // data.data[x].images.standard_resolution.url - URL of image 612х612
          // data.data[x].link - Instagram post URL 
        }
      }

      $("#carouselportfolio").owlCarousel({
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        margin: 10,
        responsiveClass: true,
        nav: true,
        responsive: {
          0: {
            items: 1,
            nav: false
          },
          600: {
            items: 2,
            nav: false
          },
          1000: {
            items: 3,
            nav: false,
            loop: false
          }
        }
      });
    },
    error: function (data) {
      console.log(data); // send the error notifications to console
    }
  });

  function photoIsValid(tags) {
    for (var i = 0; i < tags.length; i++) {
      if (tags[i] === filterTag) {
        return true;
      }
    }
    return false;
  };


  //change photo background on hover

  var touch = 'ontouchstart' in document.documentElement
    || navigator.maxTouchPoints > 0
    || navigator.msMaxTouchPoints > 0;

  if (!touch) {
    $("#helpYourShoesLink").mouseenter(function () {
      $(".masthead").css("background-image", "url(././img/mainLogoLight.jpg)");
    }).mouseleave(function () {
      $(".masthead").css("background-image", "url(././img/mainlogo.jpg)");
    });
  }


  //collapse menu on click
  $('.navbar-collapse a').on('click', function () {
        $('.btn-navbar').click(); //bootstrap 2.x
        $('.navbar-toggler').click() //bootstrap 3.x by Richard
    });
})();


//scroll top button

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera 
    document.documentElement.scrollTop = 0; // For IE and Firefox
}