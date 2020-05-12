(function() {
  var tipTriggersList = document.querySelectorAll("[data-tooltip='trigger']");
  var tipTriggers = Array.prototype.slice.call(tipTriggersList);
  var tipDisplaysList = document.querySelectorAll("[data-tooltip='content']");
  var tipDisplays = Array.prototype.slice.call(tipDisplaysList);
  var triggerCount = tipTriggers.length;
  var displayCount = tipDisplays.length;
  var i;

  function setDisplayCoordinates(_trigger, _display) {
    var y = _trigger.offsetTop - _display.offsetHeight - 10;
    var x = _trigger.offsetLeft - (_display.offsetWidth * .5) + 5;
    _display.style.top = y + 'px';
    _display.style.left = x + 'px';
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

  function setEsc() {
    document.addEventListener('keydown', function(e) {
      if(e.keyCode === 27) {
        handleOpenTips();
      }
    })
  }
  
  function handleDisplay(_event, _displayId) {
    _event.preventDefault();
    var currentDisplay = document.getElementById(_displayId);
    if(currentDisplay === null) {
      console.error(`Tooltip Error: no tooltip for ${_displayId}.`);
      return;
    }
    var isHidden = currentDisplay.getAttribute('aria-hidden') === 'true';
    if(isHidden) {
      handleOpenTips();    
      currentDisplay.setAttribute('aria-hidden', false);
      setDisplayCoordinates(_event.target, currentDisplay);
    } else if(!isHidden) {
      currentDisplay.setAttribute('aria-hidden', true);
    }
  }
  
  function initDisplays(_display) {
    _display.setAttribute('aria-hidden', true);
    _display.setAttribute('role', 'tooltip');
  }
  
  function initTriggers(_trigger) {
    var displayId= _trigger.getAttribute('href').split('#'); 
    displayId = displayId[1];
    _trigger.setAttribute('aria-describedby', displayId);
    _trigger.addEventListener('click', function(e) {
      handleDisplay(e, displayId);
    });
  }  
 
  function initToolTips() {
    if(triggerCount === 0 && displayCount === 0) {
      console.warn('Tooltip Error: no tooltips in file.');
      return;
    }
    if(triggerCount !== displayCount) {
      console.error('Tooltip Error: number of triggers does not match number of tooltips.');
      return;
    }
    
    for(i = 0; i < triggerCount; i++) {
      initDisplays(tipDisplays[i]);
      initTriggers(tipTriggers[i]);
    }
    setEsc();
  }
  
  initToolTips();
  
})();






