var s = new SquareSnowflake(1, 266, 266 + 66, 61);

/**
 * Test the path points generated.
 */
QUnit.test(' Checking generated points of a square snowflake.', function(assert){

  assert.ok(s.pathPoints().join(',') === [205, 362.5, 235.5, 332, 296.5, 332, 327, 362.5,
                                            327, 362.5, 357.5, 332, 357.5, 332, 327, 301.5, 
                                              327, 301.5, 327, 240.5, 327, 240.5, 357.5, 210, 
                                                357.5, 210, 327, 179.5, 327, 179.5, 296.5, 210, 
                                                  296.5, 210, 235.5, 210, 235.5, 210, 205, 179.5, 
                                                    205, 179.5, 174.5, 210, 174.5, 210, 205, 240.5, 
                                                      205, 240.5, 205, 301.5, 205, 301.5, 174.5, 332, 
                                                        174.5, 332, 205, 362.5].join(','), ' The path points were checked.');

});
