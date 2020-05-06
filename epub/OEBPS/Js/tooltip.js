(function() {
  console.log('tooltip script loaded');
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

  function setY(_content) {
    var y = "-" + (_content.offsetHeight + 5) + 'px';
    _content.style.top = y;

  }

  function setEsc() {
    document.addEventListener('keydown', function(e) {
      if(e.keyCode === 27) {
        handleOpenTips();
      }
    })
  }

  function handleOpenTips() {
    var openTip = document.querySelector("[aria-hidden='false']");
    if(openTip) {
      openTip.setAttribute('aria-hidden', true);
      return;
    } else {
      return;
    }
  }

  function handleDisplay(_event, _content) {
    //_event.preventDefault();
    var currentDisplay = document.getElementById(_content);
    var isHidden = currentDisplay.getAttribute('aria-hidden') === 'true';
    if(isHidden) {
      handleOpenTips();    
      currentDisplay.setAttribute('aria-hidden', false);
      setY(currentDisplay);
    } else if(!isHidden) {
      currentDisplay.setAttribute('aria-hidden', true);
    }
  }
  
  function initTriggers(_tooltip) {
    // set trigger attributes

    var tooltipId = _tooltip.getAttribute('id');
    tooltipId = tooltipId.replace('tooltip', '');
    var tooltipContent = 'tooltip-content' + tooltipId;
    var text = _tooltip.getAttribute('title');
    _tooltip.removeAttribute('title');
    text = text.trim();

    var trigger = _tooltip.querySelector("[data-tooltip='trigger']");
    trigger.setAttribute('aria-describedby', tooltipContent);
    trigger.setAttribute('tabindex', 0);

    // add event listener
    trigger.addEventListener('click', function(e) {
      handleDisplay(e, tooltipContent);
    })

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

    setEsc();
    
  }
  
  initToolTips();

})();