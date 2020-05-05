var tipTrigger = {
  selector: '[data-tooltip]',
  text: 'data-content',
  id: 'tooltip_'
};

var tooltipTriggersList = document.querySelectorAll(tipTrigger.selector);
var toolTipTriggers = Array.prototype.slice.call(tooltipTriggersList);
var tipCount = toolTipTriggers.length;
var i;

function openTip(e) {
  var tip = e.target;
  var text = tip.getAttribute(tipTrigger.text);
  console.log(text);
}

for(i = 0; i < tipCount; i++) {
  var trigger = toolTipTriggers[i];
  trigger.setAttribute('tabindex', 0);
  trigger.setAttribute('role', 'tooltip')
  trigger.addEventListener('click', function(e) {
    openTip(e);
  })
}


