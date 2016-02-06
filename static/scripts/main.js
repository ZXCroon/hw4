colNum = 4;
TOTAL_WIDTH = 900;
GAP = 20;
TOP_BLANK = 20;
width = (TOTAL_WIDTH - (colNum - 1) * GAP) / colNum;
INIT_NUMBER = 40;
EVERYTIME_ADD = 20;
$colBottom = new Array();

$(function() {
  imgList = new Array();
  $.getJSON("static/data/img-list.json", function(data) {
    for (s in data) {
      imgList[parseInt(s.slice(3))] = eval("data." + s);
    }
    $("#container").css({
      "width": TOTAL_WIDTH + "px",
      "position": "absolute",
      "left": ($(window).width() - TOTAL_WIDTH) / 2 + "px"
    });
    $(window).resize(function() {
      $("#container").css("left", ($(window).width() - TOTAL_WIDTH) / 2 + "px");
    });
    
    // init
    addOne(0, INIT_NUMBER);
    nowTotal = INIT_NUMBER;
  
    $(window).scroll(function() {
      if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
        addOne(nowTotal, nowTotal + EVERYTIME_ADD);
        nowTotal +=EVERYTIME_ADD;
      }
    });
    
  });

})

function addOne(num, goalNum) {
  if (num >= imgList.length) return;
  if (num >= goalNum) return;
  var colToAdd = 0;
  var nowMinVal = $colBottom[0] ? ($colBottom[0].offset().top + $colBottom[0].height()) : 0;
  for (var i = 1; i < colNum; ++i) {
    var thisVal = $colBottom[i] ? ($colBottom[i].offset().top + $colBottom[i].height()) : 0;
    if (thisVal < nowMinVal) {
      colToAdd = i;
      nowMinVal = thisVal;
    }
  }
  $("#container").append($colBottom[colToAdd] = 
    pictureBox(imgList[num], colToAdd * (width + GAP), nowMinVal + GAP + 10, width - 20));
  $colBottom[colToAdd].children("img").load(function() {
    addOne(num + 1, goalNum);
  });
}
