var $item = $('.carousel .item'); 
var $wHeight = $(window).height();
var $navHeight = $('.navbar').height();

$item.eq(0).addClass('active');
$item.height($wHeight - $navHeight); 
$item.addClass('full-screen');

$('.carousel img').each(function() {
  var $src = $(this).attr('src');
  $(this).parent().css({
    'background-image' : 'url(' + $src + ')',
  });

  $(this).remove();
});

$(window).on('resize', function (){
    $wHeight = $(window).outerHeight();
    $navHeight = $('.navbar').height();
    console.log("height", $wHeight);
    $item.height($wHeight- $navHeight);
});

$('.carousel').carousel({
    interval: 10000,
    pause: "false"
});