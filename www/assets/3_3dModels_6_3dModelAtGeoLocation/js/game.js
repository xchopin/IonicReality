var World = {
	loaded: false,
	rotating: false,
	initialized: false,

	init: function initFn() {
		this.createModelAtLocation();
		World.initialized =  true;
	},

	createModelAtLocation: function createModelAtLocationFn() {

		//AR.logger.activateDebugMode();
		//AR.logger.info("createModelAtLocation called ...");

		/*
			First a location where the model should be displayed will be defined. This location will be relativ to the user.
		*/
		var location = new AR.RelativeLocation(null, 50, 0, 4);
     var canShoot =  true
		/*
			Next the model object is loaded.
		*/
		var modelEarth = new AR.Model("assets/custom.wt3", {
			onLoaded: this.worldLoaded,

			scale: {
				x: 1,
				y: 1,
				z: 1
			},
			onClick : function(){
				if (canShoot) {
					if (World.shootAI()) {
						canShoot=false

						$('#finish')[0].volume = 0
						$('#finish')[0].play()
						$('#finish').animate({volume: 1}, 1000)

					  $('#end').fadeIn(1000)
					  $('#gun').animate({'bottom': '-=1000px' }, 1000)
				 }
				}
			}
		});

        var indicatorImage = new AR.ImageResource("assets/indi.png");

        var indicatorDrawable = new AR.ImageDrawable(indicatorImage, 0.2, {
            verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP
        });

		/*
			Putting it all together the location and 3D model is added to an AR.GeoObject.
		*/
		var obj = new AR.GeoObject(location, {
            drawables: {
               cam: [modelEarth],
               indicator: [indicatorDrawable]
            }
        });
	},

  shootAI: function shootAI() {
	  var sfxShooter = $('#shoot')[0]
    if (sfxShooter.currentTime != 0) {
      sfxShooter.pause()
      sfxShooter.currentTime = 0
	  }
    sfxShooter.play()

    $('#gun').animate({'right': '-=50px' }, 150)
	  $('.flash').fadeIn(250, function() {
	     $('#gun').animate({'right': '+=50px' }, 'fast')
	     $(this).fadeOut(250)
    })

	  var width = $('#life').width()
    if (width > 200) {
      $('#life').width(width  - width/10)
    }else if (width > 60) {
			if ($('#life').width(width - width/8) > 0) {
				$('#life').width(width - width/8)
			} else {
			 	$('.hud').hide()
				return true
			}
  }else{
		if ($('#life').width(width - width/3) > 0) {
			$('#life').width(width - width/3)
		} else {
			$('.hud').hide()
			return true
		}
	}
	return false

  },

	/*
		This sample shows you how to use the function captureScreen to share a snapshot with your friends. C
		oncept of interaction between JavaScript and native code is same as in the POI Detail page sample but the urlListener now handles picture sharing instead.
		The "Snapshot"-button is on top right in the title bar.
		Once clicked the current screen is captured and user is prompted to share it (Handling of picture sharing is done in native code and cannot be done in JavaScript)
	*/
	captureScreen: function captureScreenFn() {
		AR.logger.info("captureScreen called ...");
    if (World.initialized) {
			document.location = "architectsdk://button?action=captureScreen";
		}
	},

	/**
	 * This is an example of a function called by IONIC --> WikitudePlugin
	 */
	testFunction: function testFunctionFn(message) {

		//alert("testFunction called: "+message);
	},

	worldLoaded: function worldLoadedFn() {
		World.loaded = true;
		var e = document.getElementById('loadingMessage');
		e.parentElement.removeChild(e);
	}
};

World.init();
