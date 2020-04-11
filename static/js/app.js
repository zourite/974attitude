// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.sidenav');
//     var instances = M.Sidenav.init(elems, options);
//   });

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