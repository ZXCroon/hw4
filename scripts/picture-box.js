function pictureBox(imgName, x, y, width) {
  var $box = $("<div><img src='images/" + imgName + "' /></div>");
  $box.css({
    "position": "absolute",
    "left": x + "px",
    "top": y + "px",
    "width": width + "px",
    "padding": "10px",
    "border": "solid 1px",
    "overflow": "hidden",
    "font-size": "0px"
  });
  var $picture = $box.children();
  $picture.load(function() {
    $picture.css({
      "width": "100%",
    });
    var $topLayer = $("<div></div>");
    $topLayer.css({
      "position": "absolute",
      "left": "0px",
      "top": "0px",
      "z-index": "3",
      "width": "100%",
      "height": "100%",
    }).appendTo($box);
    var $shade = $("<div></div>");
    $shade.appendTo($box)
    .css({
      "border-radius": "50%",
      "background": "rgba(0, 0, 0, 0.7)",
      "position": "absolute",
      "width": "0px",
      "height": "0px",
      "left": ($picture.width() / 2) + "px",
      "top": ($picture.height() / 2) + "px"
    });
  
    $topLayer.mouseover(function() {
      var maxRadius = ($picture.width() + $picture.height()) / 2;
      $shade.animate({
        width: (maxRadius * 2) + "px",
        height: (maxRadius * 2) + "px",
        left: ($picture.width() / 2 - maxRadius) + "px",
        top: ($picture.height() / 2 - maxRadius) + "px"
      }, 300);
    });
    
    $topLayer.mouseout(function() {
      $shade.stop();
      $shade.css({
        "width": "0px",
        "height": "0px",
        "left": ($picture.width() / 2) + "px",
        "top": ($picture.height() / 2) + "px"
      });
    })
    .click(function() {
      alert("ha");
    });
    
  });
  return $box;
}