// INSTANTIATE Eim TO PREPEAR SITE
var Eim = {

    init: function( config ){
        this.config = config;
        this.bindEvents();
        this.hideShowGoTop();
        this.rePosCircleNav();
        this.ScrolleFullImage();

        this.speed = 500;
    },

    bindEvents: function(){
        $(document).ready(this.loadPlugins);
        $(window).on('scroll', this.parallax);
        this.config.smooth.on( 'click', this.startScroll );
        this.config.baselineItems.on('mouseover', this.reduceOpacity);
        this.config.baselineItems.on('mouseout', this.increaseOpacity);
    },

    slideMenuDown: function() {
        var $this = $(this);
        $('ul', this).slideDown(100);
    },

    slideMenuUp: function() {
        var $this = $(this);
        $(' ul', this).slideUp(100);
    },

    startScroll: function(e){
        var self = Eim;
        e.preventDefault();

        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, self.speed);
          }
        }
    },

    loadPlugins: function(){

        var self = Eim;

        // START LOADING PAGES FIRST
        $('body').jpreLoader( {
            loaderVPos: '50%'
        } ,function(){  });

        // SETTING #HOME DIV MATCHING SLIDER HEIGHT
        self.ScrolleFullImage();
        $(window).on('resize',function() {
            self.ScrolleFullImage();
            self.rePosCircleNav();
        });

        // ACTIVE STICKY ON HEADER DIV
        self.config.header.sticky({ topSpacing: 0 });

        $('div.branshItems').owlCarousel({
            autoPlay: 3000, //Set AutoPlay to 3 seconds
            items : 4,
            stopOnHover: true,
            navigation: true,
            mouseDrag: false,
            navigationText: ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>'],
            itemsDesktop : [1199,4],
            itemsTablet: [600,3], //2 items between 600 and 0
            itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
        });

        // nice scroll
        $("html").niceScroll({ cursorwidth: 10, cursorcolor:"#333", cursorborder : "1px solid transparent", scrollspeed : 60, mousescrollstep : 60 });

        // Parallax
        //self.config.parallax.parallax("50%", 0.5);
        // tooltip
        self.config.tooltip.tooltip();
        //fancybox
        self.config.fancybox.fancybox({ openEffect : 'elastic', closeEffect : 'elastic' });
        
        validation.checkForm();
    },

    parallax : function() {
        var self = Eim;
        var scrollPos = $(window).scrollTop();
        self.config.parallax.css('backgroundPosition', '50% ' + ( 0 - (scrollPos*.4) )+'px');
    },

    reduceOpacity: function(e){
        $this = $(this);
        $this.siblings().css({opacity:.35});
        $(this).find('.baseline-title').css({bottom:0});

    },

    increaseOpacity: function(e) {
        $this = $(this);
        $this.siblings().css({opacity:1});
        
    },

    hideShowGoTop: function() {
        var self = Eim;
        self.config.goTop.hide();

        $(window).scroll(function(e){

            var goTopOffset = self.config.goTop.offset().top;
            var y = $(window).scrollTop();

            y > $(window).height() ? self.config.goTop.fadeIn(self.speed) : self.config.goTop.fadeOut(self.speed);

        });
    },

    ScrolleFullImage: function(){
        var self = Eim;
        var winHeight = $(window).height();
        $("#home").css({height:winHeight});
    },

    rePosCircleNav: function(){
        var winH = $(window).height();
        var pageScrollOuter = $('#pageScrollOuter');
        pageScrollOuter.css({
            top: ((winH/2) - ($(pageScrollOuter).height()/2)-62)
        })
    }

};

var validation = {
    checkForm: function() {
        form_validator = $('#contactForm').validate({
            onkeyup: true,
            errorPlacement: function(error, element) {
                $(element).closest('div').prev('.form-error').append(error);
            },
            highlight: function(element) {
                $(element).closest('div').addClass("input-error");
            },
            unhighlight: function(element) {
                $(element).closest('div').removeClass("input-error");
            },
            rules: {
                fName : { required: true },
                lName : { required: true },
                email : { required: true, email: true },
                mobile: { required: true, min: 11, digits: true },
                msg   : { required: true }
            },
             messages: {
                fName  : { required: "Please specify your first name" },
                lName  : { required: "Please specify your Last name" },
                email  : { required: "Please specify your E-Mail address"},
                mobile : {
                    required: "Please specify your mobile phone",
                    min: "You have entered less than 11 number",
                    digits: "please, Enter a valid mobile phone"
                },
                msg    : { required: "Please specify your messages" }
             }
        })
    }
};


Eim.init({
    header : $('#header'),
    parallax : $('.parallax'),
    goTop : $('#goTop'),
    smooth: $('.smooth'),
    baselineItems: $('#baselineItems li'),
    fancybox : $('a.fancybox'),
    tooltip : $('[data-toggle="tooltip"]'),
    navLink : $('#nav ul li a')
});





$(function(){

    //Pulling sections from main nav.
    var sections = $('a.smooth-circle');

    //Get Sections top position
    function getTargetTop(elem){
        
        //gets the id of the section header
        //from the navigation's href e.g. ("#html")
        var id = elem.attr("href");


        //Gets the distance from the top and 
        //subtracts the height of the nav.
        return $(id).offset().top;
    }

    //Smooth scroll when user click link that starts with #
    $(sections).click(function(e) {
        
        //gets the distance from the top of the 
        //section refenced in the href.
        var target = getTargetTop($(this));

        //scrolls to that section.
        $('html, body').animate({scrollTop:target}, 500);

        //prevent the browser from jumping down to section.
        e.preventDefault();

    });


    // Go through each section to see if it's at the top.
    // if it is add an active class
    function checkSectionSelected(scrolledTo){
        
        //How close the top has to be to the section.
        var threshold = 100;

        for (var i = 0; i < sections.length; i++) {
            //get next nav item
            var section = $(sections[i]);

            //get the distance from top
            var target = getTargetTop(section);
            
            //Check if section is at the top of the page.
            if (scrolledTo > target - threshold && scrolledTo < target + threshold) {

                //remove all selected elements
                sections.removeClass("active");

                //add current selected element.
                section.addClass("active");
            }

        };
    }


    //Check if page is already scrolled to a section.
    checkSectionSelected($(window).scrollTop());

    $(window).scroll(function(e){
        checkSectionSelected($(window).scrollTop())
    });


});