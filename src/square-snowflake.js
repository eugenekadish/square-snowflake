/**
 * Contains all methods and variables required to calculate a square snowflake fractal curve.
 *
 * @param {Integer} initialOrder  The level of recursion for the curve.
 * @param {Integer} initialX      The start horizontal position from where the curve gets drawn.
 * @param {Integer} initialY      The start vertical position from where the curve gets drawn.
 */
function SquareSnowflake(initialOrder, initialX, initialY, initialStep){
  
  var points;
  
  var x;
  var y;

  var xTemp;
  var yTemp;

  var xDelta;
  var yDelta;

  var step = initialStep;

  /**
   * The recursive calculation of points for a square snowflake curve.
   *
   * @param {Integer} initialOrder  The level of recursion for the curve.
   * @param {Integer} initialX      The start horizontal position from where the curve gets drawn.
   * @param {Integer} initialY      The start vertical position from where the curve gets drawn.
   */
  this.pathPoints = function(order, startX, startY, startStep){

    order  = order || initialOrder;
    
    startX = startX || initialX;
    startY = startY || initialY;

    step = startStep || initialStep;

    points = [];

    xTemp = startX;
    yTemp = startY;

    for(var i = 1; i < order + 1; i++){

      xTemp = xTemp - step;

      step = step / 2.0;

      yTemp = yTemp + step;

      x = xTemp;
      y = yTemp;

      if(i == order) A(i);

      xDelta = x;
      yDelta = y;

      x = x + step;
      y = y - step;

      if(i == order){
        points.push(xDelta, yDelta);
        points.push(x, y);
      }

      if(i == order) B(i);

      xDelta = x;
      yDelta = y;

      x = x - step;
      y = y - step;

      if(i == order){
        points.push(xDelta, yDelta);
        points.push(x, y);
      }

      if(i == order) C(i);

      xDelta = x;
      yDelta = y;

      x = x - step;
      y = y + step;

      if(i == order){
        points.push(xDelta, yDelta);
        points.push(x, y);
      }

      if(i == order) D(i);

      xDelta = x;
      yDelta = y;

      x = x + step;
      y = y + step;

      if(i == order){
        points.push(xDelta, yDelta);
        points.push(x, y);
      }
    }

    return points;
  }

  /**
   * One fourth of the curve.
   *
   * {Integer} index Current level of recursion.
   */
  function A(index){

    if(index > 0){

      A(index - 1);

      xDelta = x;
      yDelta = y;

      x = x + step;
      y = y - step;

      points.push(xDelta, yDelta);
      points.push(x, y);

      B(index - 1);

      xDelta = x;
      yDelta = y;

      x = x + 2.0 * step;

      D(index - 1);

      xDelta = x;
      yDelta = y;

      x = x + step;
      y = y + step;

      points.push(xDelta, yDelta);
      points.push(x, y);

      A(index - 1);
    }
  }

  /**
   * One fourth of the curve.
   *
   * {Integer} index Current level of recursion.
   */
  function B(index){

    if(index > 0){

      B(index - 1);

      xDelta = x;
      yDelta = y;

      x = x - step;
      y = y - step;

      points.push(xDelta, yDelta);
      points.push(x, y);

      C(index - 1);

      xDelta = x;
      yDelta = y;

      y = y - 2.0 * step;

      points.push(xDelta, yDelta);
      points.push(x, y);

      A(index - 1);

      xDelta = x;
      yDelta = y;

      x = x + step;
      y = y - step;

      points.push(xDelta, yDelta);
      points.push(x, y);

      B(index - 1);
    }
  }
  
  /**
   * One fourth of the curve.
   *
   * {Integer} index Current level of recursion.
   */
  function C(index){

    if(index > 0){

      C(index - 1);

      xDelta = x;
      yDelta = y;

      x = x - step;
      y = y + step;

      points.push(xDelta, yDelta);
      points.push(x, y);

      D(index - 1);

      xDelta = x;
      yDelta = y;

      x = x - 2.0 * step;

      points.push(xDelta, yDelta);
      points.push(x, y);

      B(index - 1);

      xDelta = x;
      yDelta = y;

      x = x - step;
      y = y - step;

      points.push(xDelta, yDelta);
      points.push(x, y);

      C(index - 1);
    }
  }

  /**
   * One fourth of the curve.
   *
   * {Integer} index Current level of recursion.
   */
  function D(index){

    if(index > 0){

      D(index - 1);

      xDelta = x;
      yDelta = y;

      x = x + step;
      y = y + step;

      points.push(xDelta, yDelta);
      points.push(x, y);

      A(index - 1);

      xDelta = x;
      yDelta = y;

      y = y + 2 * step;

      points.push(xDelta, yDelta);
      points.push(x, y);

      C(index - 1);

      xDelta = x;
      yDelta = y;

      x = x - step;
      y = y + step;

      points.push(xDelta, yDelta);
      points.push(x, y);

      D(index - 1);
    }
  }
}
