function getLeft($element) {
  if (!$element) return 0;
  alert($element.offset().left);
  return $element.offset().left + getLeft($element.parent());
}

function getTop($element) {
  if (!$element) return 0;
  return $element.offset().top + getTop($element.parent());
}