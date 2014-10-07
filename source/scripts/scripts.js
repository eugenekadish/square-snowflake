/**
 * A simple static scene is displayed when the page is loaded with click and 
 * drag UI functionality.
 */
(function(){
  
  var orderIndex = 0;
  var selected   = false;

  // Keeping the levels of recursion in an array like this allows
  // for them to be iterated through cyclically.
  var orders = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2];

  var clip         = document.getElementById('clip');
  var lens         = document.getElementById('lens');
  var text         = document.getElementById('digit');
  var cover        = document.getElementById('S');
  var curve        = document.getElementById('curve');
  
  var lensGradient = document.getElementById('shade');

  var widgetHeight = cover.getBoundingClientRect().right;
  var widgetWidth  = cover.getBoundingClientRect().bottom;

  // A little bit of fudging is done here to keep the curve within 
  // a 512 x 512 area, so it has a bit of padding around it in 
  // the display.
  var step = (widgetWidth + widgetHeight - 40) / 8.0;
  
  var horizontalStart = widgetWidth / 2.0;
  var verticalStart   = widgetHeight / 2.0 + step; 

  var deltaX;
  var deltaY;

  var finalX;
  var finalY;

  var lensCX;
  var lensCY;

  var initialX;
  var initialY;
  
  var lensGradientCX; 
  var lensGradientCY;

  // Initialize a curve.
  var s = new SquareSnowflake(orders[orderIndex], horizontalStart, verticalStart, step);

  // For the zoom in effect, first translate to the origin, so the following scaling operation is symmetrical.
  // Now with the new scaled coordinates translate back 0.5 * 1.5 * 266 to recenter the scaled view. This 
  // combination of transformations will increase the size of the lens and skew the mouse interactivity,
  // because all the movement will be done in the scaled coordinates. Ideally it would be good to scale 
  // everything back down to compensate for this, but I liked the effect!
  clip.setAttribute("transform", "translate(-266,-266) scale(1.5,1.5) translate(89, 89)");
  
  curve.setAttribute("points", s.pathPoints());

  /**
   * Event handler for the mouse down event on the clipped circle.
   * 
   * @param  {Object} event Instance of the mouse being pressed down.
   */
  clip.onmousedown = function(event){

    selected = true;

    lensCX = parseInt(lens.getAttribute("cx")); 
    lensCY = parseInt(lens.getAttribute("cy"));

    lensGradientCX = parseInt(lensGradient.getAttribute("cx"));
    lensGradientCY = parseInt(lensGradient.getAttribute("cy"));

    finalX = event.clientX;
    finalY = event.clientY;
  };

  /**
   * Event handler for the key down event on the page document.
   * 
   * @param  {Object} event Instance of a key being pressed down.
   */
  document.onkeydown = function(event){

    if(event.keyCode === 39){

      if(orderIndex === 9){
        orderIndex = 0;
      } else {
        orderIndex++;
      }
    } else if(event.keyCode === 37){

      if(orderIndex === 0){
        orderIndex = 9;
      } else {
        orderIndex--;
      }
    }

    text.innerHTML = orders[orderIndex];

    text.style.opacity = 0.6;

    setTimeout(function(){
      text.style.opacity = 0.0;
    }, 800);

    // Redraw the curve when the level of recursion is updated. All 
    // other variables do not change.
    curve.setAttribute("points", s.pathPoints(orders[orderIndex]));
  }

  /**
   * Event handler for the mouse up event on the page document.
   * 
   * @param  {Object} event Instance of a mouse button being released.
   */
  document.onmouseup = function(event){

    selected = false;
  };

  /**
   * Event handler for the mouse move event on the page document.
   * 
   * @param  {Object} event Instance of a mouse being moved.
   */
  document.onmousemove = function(event){

    if(selected){

      initialX = event.clientX;
      initialY = event.clientY;

      deltaX = initialX - finalX;
      deltaY = initialY - finalY;

      lensCX = deltaX + lensCX;
      lensCY = deltaY + lensCY;

      lensGradientCX = deltaX + lensGradientCX;
      lensGradientCY = deltaY + lensGradientCY;

      lens.setAttribute("cx", lensCX);
      lens.setAttribute("cy", lensCY);

      lensGradient.setAttribute("cx", lensGradientCX);
      lensGradient.setAttribute("cy", lensGradientCY);

      finalX = initialX;
      finalY = initialY;
    }
  };

})();
