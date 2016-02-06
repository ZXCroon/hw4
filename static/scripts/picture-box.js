function pictureBox(imgName, x, y, width) {
  var $box = $("<div><img src='static/images/pictures/" + imgName + "' /></div>");
  $box.css({
    "position": "absolute",
    "left": x + "px",
    "top": y + "px",
    "width": width + "px",
    "padding": "10px",
    "overflow": "hidden",
    "font-size": "0px",
    "background": "url(static/images/photo_bg.png) white",
    "box-shadow": "2px 2px 8px"
  });
  var $picture = $box.children();
  $picture.css("width", "100%");
  $picture.load(function() {

    var initialWidth = $picture.width(), initialHeight = $picture.height();
    
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
      "background": "black",
      "opacity": "0",
      "position": "absolute",
      "width": "0px",
      "height": "0px",
      "left": ($picture.width() / 2) + "px",
      "top": ($picture.height() / 2) + "px"
    });
  
    $topLayer.mouseover(function() {
      $box.css({
        "left": "-=1.5px",
        "top": "-=1.5px",
        "box-shadow": "3.5px 3.5px 13px"
      });
      var maxRadius = ($picture.width() + $picture.height()) / 2;
      $shade.animate({
        opacity: 0.5,
        width: (maxRadius * 2) + "px",
        height: (maxRadius * 2) + "px",
        left: ($picture.width() / 2 - maxRadius) + "px",
        top: ($picture.height() / 2 - maxRadius) + "px"
      }, 300);
    })
    .mouseout(function() {
      $shade.stop();
      $box.css({
        "left": "+=1.5px",
        "top": "+=1.5px",
        "box-shadow": "2px 2px 8px"
      });
      $shade.css({
        "opacity": "0",
        "width": "0px",
        "height": "0px",
        "left": ($picture.width() / 2) + "px",
        "top": ($picture.height() / 2) + "px"
      });
    })
    .click(function() {
      var tempWidth = $picture.width(), tempHeight = $picture.height();
      var tempLeft = $picture.offset().left, tempTop = $picture.offset().top;
      //var tempLeft = getLeft($picture), tempTop = getTop($picture);

      var $fullscreenShade = $("<div></div>");
      $fullscreenShade.css({
        "z-index": "4",
        "position": "fixed",
        "left": "0px",
        "top": "0px",
        "width": "100%",
        "height": "100%",
        "background": "rgba(0, 0, 0, 0.7)"
      }).appendTo($("body"))
      .click(function() {
        $bigPictureBox.animate({
          width: tempWidth + "px",
          height: tempHeight + "px",
          left: (tempLeft - window.pageXOffset) + "px",
          top: (tempTop - window.pageYOffset) + "px"
        }, 300, function() {
          $fullscreenShade.remove();
          $bigPictureBox.remove();
          $picture.css("visibility", "visible");
        });
        
      });

      // calculate bigPicture's position & size
      var bigWidth = Math.min($(window).width() * 0.6,
                              $(window).height() * 0.6 * (initialWidth / initialHeight));
      var bigHeight = bigWidth * (initialHeight / initialWidth);

      var $bigPictureBox = $("<div></div>");
      $bigPictureBox.appendTo($("body"))
      .css({
        "z-index": "5",
        "position": "fixed",
        "width": $picture.width() + "px",
        "height": $picture.height() + "px",
        "left": $picture.offset().left - window.pageXOffset + "px",
        "top": $picture.offset().top - window.pageYOffset + "px"
      })
      .animate({
        width: bigWidth + "px",
        height: bigHeight + "px",
        left: (($(window).width() - bigWidth) / 2) + "px",
        top: (($(window).height() - bigHeight) / 2) + "px"
      }, 300)
      .mouseover(function() {
        $closeButton.css("visibility", "visible");
      })
      .mouseout(function() {
        $closeButton.css("visibility", "hidden");
      });

      var $bigPicture = $picture.clone();
      $picture.css("visibility", "hidden");

      var $closeButton = $("<div></div>");

      $closeButton.appendTo($bigPictureBox)
      .css({
        "z-index": "6",
        "position": "absolute",
        "right": "10px",
        "top": "10px",
        "width": "25px",
        "height": "25px",
        "border-radius": "50%",
        "background": "url(static/images/close.png)",
        "opacity": "0.7",
        "visibility": "hidden"
      })
      .mouseover(function() {
        $(this).css("background", "url(static/images/close_hover.png)");
      })
      .mouseout(function() {
        $(this).css("background", "url(static/images/close.png)");
      })
      .click(function() {
        $fullscreenShade.trigger("click");
      });

      $bigPicture.appendTo($bigPictureBox)
      .css({
        "width": "100%",
        "height": "100%"
      });
    }); 
  });

  return $box;
}