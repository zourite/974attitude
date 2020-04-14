$(document).ready(function(){
  $('.sidenav').sidenav();
});
  $(window).on( 'load', function(){

    $('#masonry').masonry({
      itemSelector: '.col',
      layoutMode: 'masonry',
      filter: '*',
      animationOptions: {
          duration: 500,
          easing: 'linear',
          queue: false
      }
  });

  })

function getReply(elementName, idReply){
  document.getElementsByName(elementName)[0].value=idReply;
  window.location.hash = "#comment-form";
};