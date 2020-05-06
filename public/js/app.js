(function() {
  var tooltipsList = document.querySelectorAll("[id^='tooltip']");
  var tooltips = Array.prototype.slice.call(tooltipsList);
  var tooltipCount = tooltips.length;
  var i;
  
  function createTooltip(_contentID, text) {

    var tooltipDisplay = document.createElement('span');
    var tooltipText = document.createTextNode(text);

    tooltipDisplay.setAttribute('id', _contentID);
    tooltipDisplay.setAttribute('role', 'tooltip');
    tooltipDisplay.setAttribute('aria-hidden', true);

    tooltipDisplay.append(tooltipText);
    return tooltipDisplay;
    
  }
  
  function initTriggers(_tooltip) {
    // set trigger attributes

    var tooltipId = _tooltip.getAttribute('id');
    tooltipId = tooltipId.replace('tooltip', '');
    var tooltipContent = 'tooltip-content' + tooltipId;
    var text = _tooltip.getAttribute('title');
    text = text.trim();

    var trigger = _tooltip.querySelector("[data-tooltip='trigger']");
    trigger.setAttribute('aria-describedby', tooltipContent);

    // create tooltip display

    var tooltipDisplay = createTooltip(tooltipContent, text);

    _tooltip.appendChild(tooltipDisplay);

  }  
 
  function initToolTips() {
    if(tooltipCount === 0) {
      console.error('Tooltip Error: no tooltips in file.');
      return;
    }
   
    for(i = 0; i < tooltipCount; i++) {
      initTriggers(tooltips[i]);
    }
    
  }
  
  initToolTips();

})();






