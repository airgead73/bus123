(function() {

  var config = {
    CONTAINER_SELECTOR: '[data-tooltip="container"]',
    TRIGGER_SELECTOR: '[data-tooltip="trigger"]',
    DISPLAY_SELECTOR: 'tooltip-display',
    GET_ORIENTATION: function() {
      return this.ORIENTATION;
    }, 
    GET_CONTAINERS: function() {
      var containerNodeList = document.querySelectorAll(this.CONTAINER_SELECTOR);
      var containerArr = Array.prototype.slice.call(containerNodeList);
      return containerArr;
    },
    SET_POS: function(_tooltipContent) {
      var w = window.innerWidth;
      var h = window.innerHeight;
      console.log("height: " + h + " width: " + w + ".");
      var inlineStyle;
      if(w > h) {
        var x = "left: -150px;";
        var y = "top: -" + (_tooltipContent.offsetHeight + 10) + 'px;';
        inlineStyle = x + " " + y;    
        _tooltipContent.setAttribute("style", inlineStyle);
      } else {
        inlineStyle = "position: fixed; top: 10%; right: 0; left: 0; margin-right: auto; margin-left: auto;";
        _tooltipContent.setAttribute("style", inlineStyle);        
      }

    }
  }

  var util = {
    setAttributes: function(el, attrs) {
      Object.keys(attrs).forEach(function (attr) {
        el.setAttribute(attr, attrs[attr]);
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
      initContainer(container, counter);
    });

    setEsc();
    
  }

  function initContainer(_container, _counter) {
    // init tooltip trigger (add eventlistener)
    var tooltipTrigger = _container.querySelector(config.TRIGGER_SELECTOR);
    var idStr = "tooltip_" + _counter;
    var classStr = tooltipTrigger.className;
    classStr = classStr.split(' ');
    classStr = config.DISPLAY_SELECTOR + " " + classStr[1];


    util.setAttributes(tooltipTrigger, {
      "tabindex": "0",
      "aria-describedby": "tooltip_" + _counter
    }); 

    tooltipTrigger.addEventListener('click', function(e) {
      handleDisplay(e, idStr);
    });

    tooltipTrigger.addEventListener('blur', function(e) {
      handleDisplay(e, idStr);
    });    

    tooltipTrigger.addEventListener('keydown', function(e) {
      if(e.keyCode === 13) {
        handleDisplay(e, idStr);
      }
      
    });

    // adjust container attributes
    var text = _container.getAttribute('title').trim(); 
    _container.removeAttribute('title');
    
    // create tooltip content and append to container
    var tooltipContent = createTooltip(_counter, text, classStr);
    _container.appendChild(tooltipContent);

  }

  function createTooltip(_counter, _text, _classStr) {
    var tooltipDisplay = document.createElement('span');
    var tooltipText = document.createTextNode(_text);
    util.setAttributes(tooltipDisplay, {
      "id": "tooltip_" + _counter,
      "class": _classStr,
      "role": "tooltip",
      "aria-hidden": true
    });
    tooltipDisplay.appendChild(tooltipText);
    return tooltipDisplay;
  }

  function handleDisplay(_event, _displayID) {
    var currentDisplay = document.getElementById(_displayID);
    var isHidden = currentDisplay.getAttribute('aria-hidden') === 'true';
    if(_event.type === 'blur') {
      currentDisplay.setAttribute('aria-hidden', true);
      return;
    }
    if(isHidden) {
      handleOpenTips();    
      currentDisplay.setAttribute("aria-hidden", false);
      config.SET_POS(currentDisplay);
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






