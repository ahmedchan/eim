$(function(){

    jQuery.fn.moveUpDown = function(){
        var $this = $(this);
        $this.animate({"bottom": "-=-20px"}, 400, function(){
            $this.animate({"bottom":"+=-20px"}, 400, function(){ $this.moveUpDown(); });
        });
    };

    var scrollDown = $('#scroll-down'),
    	goToTop = $('#goTop');

    scrollDown.moveUpDown();
    goToTop.moveUpDown();

    scrollDown.mouseout(function(){
        $(this).moveUpDown();
    }).mouseover(function(){
        $(this).stop().css('bottom',20);
    });

    goToTop.mouseout(function(){
        $(this).moveUpDown();
    }).mouseover(function(){
        $(this).stop().css('bottom',20);
    });

});