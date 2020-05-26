(function() {
  'use strict'

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
    GET_POS_AP: function(el) {
      var ap = "position: absolute; top: -" + (el.offsetHeight + 10) + 'px; left: -150px;';
      return ap;
    }    
  }

  var util = {
    setAttributes: function(el, objAttrs) {
      Object.keys(objAttrs).forEach(function (attr) {
        el.setAttribute(attr, objAttrs[attr]);
      });      
    },
    getOS: function() {
      var os = navigator.userAgent;

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

  function setComponents(elContainer, numCounter) {
    var tooltipTrigger = elContainer.querySelector(config.TRIGGER_SELECTOR);
    var strId = "tooltip_" + numCounter;

    // SET TRIGGER
    setTrigger(tooltipTrigger, strId);

    // SET DISPLAY
    setDisplay(elContainer, numCounter);

  }

  function setTrigger(elTrigger, strTrigger) {
    // adjust trigger attributes
    util.setAttributes(elTrigger, {
      "tabindex": "0",
      "aria-describedby": strTrigger
    }); 

    // apply event listeners to trigger
    elTrigger.addEventListener('click', function(e) {
      handleDisplay(e, strTrigger);
    });

    elTrigger.addEventListener('blur', function(e) {
      handleDisplay(e, strTrigger);
    });    

    elTrigger.addEventListener('keydown', function(e) {
      if(e.keyCode === 13 || e.keyCode === 32) {
        handleDisplay(e, strTrigger);
      }      
    });
  }

  function setDisplay(elContainer, numCounter) {
    // adjust container attributes
    var text = elContainer.getAttribute('title').trim(); 
    elContainer.removeAttribute('title');
    
    // create tooltip content and append to container
    var tooltipContent = createTooltip(numCounter, text);
    elContainer.appendChild(tooltipContent);
  }

  function createTooltip(numCounter, strText) {
    var tooltipDisplay = document.createElement('span');
    var tooltipText = document.createTextNode(strText);
    util.setAttributes(tooltipDisplay, {
      "id": "tooltip_" + numCounter,
      "role": "tooltip",
      "aria-hidden": true
    });
    tooltipDisplay.appendChild(tooltipText);
    return tooltipDisplay;
  }

  function handleDisplay(evt, strId) {
    var currentDisplay = document.getElementById(strId);
    var isHidden = currentDisplay.getAttribute('aria-hidden') === 'true';
    if(evt.type === 'blur') {
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

  function setPOS(elDisplay) {
    var os = util.getOS();
    var inlineStyle;
    if(os === 'desktop') {
      inlineStyle = config.GET_POS_AP(elDisplay);   
      elDisplay.setAttribute("style", inlineStyle);
    } else {
      inlineStyle = config.GET_POS_FIXED();
      elDisplay.setAttribute("style", inlineStyle);        
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