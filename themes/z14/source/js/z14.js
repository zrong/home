$(function(){
  var isMobild = false
  $("#show-menu").on('click', function(){
    if(!isMobile) return
    if( $('#menu-list').is(":visible") )
      $("#menu-list").hide()
    else
      $("#menu-list").show()
  })

  // nav hide and show
  var isScroll = false;
  var lastScrollTop = 0;


  $(window).scroll(function(e){
    isScroll = true
  })

  $(document).bind('touchmove', function(e){
    isScroll = true
  })

  setInterval(function(){
    isMobile = $(window).width() < 768
    if(isScroll) {
      afterScroll();
      isScroll = false;
    }
  }, 200)

  function afterScroll(){
    var currentST = $(this).scrollTop();

    if(Math.abs(lastScrollTop - currentST) <= 5) {
      return;
    }

    if(currentST > lastScrollTop && currentST > $("#menu-outer").outerHeight()) {
      if($('#menu-list').is(":visible") && isMobile) {
        $("#menu-list").hide();
      }
      $("#menu-outer").removeClass('slide-down').addClass('slide-up');
    } else if(currentST + $(window).height() < $(document).height()) {
      $("#menu-outer").removeClass('slide-up').addClass('slide-down');
    }
    lastScrollTop = currentST;
  }
  
})
