$(function() {
  if( !Detector.webgl ) {
    Detector.addGetWebGLMessage();
  } else {
    var container = document.getElementById( 'container' );
    var globe = new DAT.Globe( container );

    TWEEN.start();

    window.setInterval( function() {
      $.ajax( '/data' )
        .done( function( data ) {
          if( data.length === 0 ) {
            return;
          }

          globe.addData( data, {
            format: 'magnitude',
            name: 'Sample Data'
          });
          globe.createPoints();
          globe.animate();

          document.body.style.backgroundImage = 'none'; // remove loading
        })
        .fail( function( request, status ) {
          alert( 'Failed to load data, reason: ' + status );
        });
    }, 1000 );
  }
});
