$(function() {
  if( !Detector.webgl ) {
    Detector.addGetWebGLMessage();
  } else {
    var container = document.getElementById( 'container' );
    var globe = new DAT.Globe( container );

    var settime = function( globe, t ) {
      return function() {
        new TWEEN.Tween( globe ).to( { time: t }, 500 ).easing( TWEEN.Easing.Cubic.EaseOut ).start();
      };
    };

    TWEEN.start();

    $.ajax( 'sample-data.json' )
      .done( function( data ) {
        window.data = data;
        for( var i = 0; i < data.length; i++ ) {
          globe.addData( data[i][1], { format: 'magnitude', name: data[i][0], animated: true } );
        }
        globe.createPoints();
        settime( globe, 0 )();
        globe.animate();
        document.body.style.backgroundImage = 'none'; // remove loading
      })
      .fail( function( request, status ) {
        alert( 'Failed to load data, reason: ' + status );
      });
  }
});
