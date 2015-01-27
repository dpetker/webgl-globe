$(function() {

  var _sampleData, _animateIntervalId, _globe;

  if( !Detector.webgl ) {
    Detector.addGetWebGLMessage();
  } else {
    var container = document.getElementById( 'container' );
    _globe = new DAT.Globe( container );

    TWEEN.start();

    $.ajax( 'sample-data.json' )
      .done( function( data ) {
        _sampleData = data;
        _animateIntervalId = window.setInterval( animateData, 1000 );
        document.body.style.backgroundImage = 'none'; // remove loading
      })
      .fail( function( request, status ) {
        alert( 'Failed to load data, reason: ' + status );
      });
  }

  var animateData = function() {
    if( _sampleData.length == 0 ) {
      window.clearInterval( _animateIntervalId );
      return;
    }

    // Add 10 points at a time
    var nextTen = _sampleData.splice( 0, 30 );
    _globe.addData( nextTen, {
      format: 'magnitude',
      name: 'Sample Data'
    });

    _globe.createPoints();
    _globe.animate();
  };
});
