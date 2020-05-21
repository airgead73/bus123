(function() {

  var config = {
    CONTAINER_SELECTOR: '[data-tooltip="container"]',
    TRIGGER_SELECTOR: '[data-tooltip="trigger"]',
    GET_CONTAINERS: function() {
      var containerArr = Array.prototype.slice.call(
        document.querySelectorAll(this.CONTAINER_SELECTOR)
      );
      return containerArr;
    },
    GET_POS_FIXED: function() {
      return "position: fixed; top: 8%; right: 0; left: 0; margin-right: auto; margin-left: auto;";
    },
    GET_POS_AP: function(paramEl) {
      var ap = "postion: absolute; top: -" + (paramEl.offsetHeight + 10) + 'px; left: -150px;';
      return ap;
    }    
  }

  var util = {
    setAttributes: function(paramEl, paramAttrsObj) {
      Object.keys(paramAttrsObj).forEach(function (attr) {
        paramEl.setAttribute(attr, paramAttrsObj[attr]);
      });      
    },
    getOS: function() {
      os = navigator.userAgent;

      if(/android/i.test(os)) {
        return "android";
      }

      if(/iPad|iPhone|iPod/i.test(os)) {
        return "ios";
      }

      return "desktop";
         
    }
  }
 
  function initToolTips() {    

    var containers = config.GET_CONTAINERS();

    if(!containers.length) {
      console.warn('Tooltips: no tooltips on this page.');
    } 

    containers.forEach(function(container, index) {
      var counter = index + 1;
      setComponents(container, counter);
    });

    setEsc();
    
  }

  function setComponents(paramElContainer, paramNumCounter) {
    var tooltipTrigger = paramElContainer.querySelector(config.TRIGGER_SELECTOR);
    var idStr = "tooltip_" + paramNumCounter;

    // SET TRIGGER
    setTrigger(tooltipTrigger, idStr);

    // SET DISPLAY
    setDisplay(paramElContainer, paramNumCounter);

  }

  function setTrigger(paramTriggerEl, paramTargetStr) {
    // adjust trigger attributes
    util.setAttributes(paramTriggerEl, {
      "tabindex": "0",
      "aria-describedby": paramTargetStr
    }); 

    // apply event listeners to trigger
    paramTriggerEl.addEventListener('click', function(e) {
      handleDisplay(e, paramTargetStr);
    });

    paramTriggerEl.addEventListener('blur', function(e) {
      handleDisplay(e, paramTargetStr);
    });    

    paramTriggerEl.addEventListener('keydown', function(e) {
      if(e.keyCode === 13 || e.keyCode === 32) {
        handleDisplay(e, paramTargetStr);
      }      
    });
  }

  function setDisplay(paramContainerEl, paramCounterNum) {
    // adjust container attributes
    var text = paramContainerEl.getAttribute('title').trim(); 
    paramContainerEl.removeAttribute('title');
    
    // create tooltip content and append to container
    var tooltipContent = createTooltip(paramCounterNum, text);
    paramContainerEl.appendChild(tooltipContent);
  }

  function createTooltip(paramCounterNum, _text) {
    var tooltipDisplay = document.createElement('span');
    var tooltipText = document.createTextNode(_text);
    util.setAttributes(tooltipDisplay, {
      "id": "tooltip_" + paramCounterNum,
      "role": "tooltip",
      "aria-hidden": true
    });
    tooltipDisplay.appendChild(tooltipText);
    return tooltipDisplay;
  }

  function handleDisplay(paramEvent, paramIdStr) {
    var currentDisplay = document.getElementById(paramIdStr);
    var isHidden = currentDisplay.getAttribute('aria-hidden') === 'true';
    if(paramEvent.type === 'blur') {
      currentDisplay.setAttribute('aria-hidden', true);
      return;
    }
    if(isHidden) {
      handleOpenTips();    
      currentDisplay.setAttribute("aria-hidden", false);
      setPOS(currentDisplay);
    } else if(!isHidden) {
      currentDisplay.setAttribute('aria-hidden', true);
    }  
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

  function setPOS(paramDisplayEl) {
    var os = util.getOS();
    var inlineStyle;
    if(os === 'desktop') {
      inlineStyle = config.GET_POS_AP(paramDisplayEl);   
      paramDisplayEl.setAttribute("style", inlineStyle);
    } else {
      inlineStyle = config.GET_POS_FIXED();
      paramDisplayEl.setAttribute("style", inlineStyle);        
    }    
  }

  function setEsc() {
    document.addEventListener('keydown', function(e) {
      if(e.keyCode === 27) {
        handleOpenTips();
      } 
    })
  }

  /**
   * Intialize tooltips on page load.
   */
  
  initToolTips();

})();






