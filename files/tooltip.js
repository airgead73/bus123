(function() {
  'use strict'

  /**
   * TOOLTIP WIDGET
   * 5-26-20
   * On page load, script loops through tootip container elements and 
   * creates tooltip content using the title attribute of the tooltip
   * container. Also, the appropriate aria attributes are applied to the
   * tooltips and triggers
   * 
   * Event listeners are added to each tooltip trigger, and the escape key. 
   * On click of tooltip trigger, aria-hidden attribute on tooltip is toggled
   * between true and false. In conjunction with css rules, tips are shown/hidden.
   * 
   * User can also tab to tooltip trigger. Hitting <return> key when trigger is 
   * in focus will also toggle tip. Tabbing away from trigger will close tip. Also,
   * hitting <esc> key will close any open tips. 
   */

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
      var ap = "postion: absolute; top: -" + (el.offsetHeight + 10) + 'px; left: -140px;';
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
 
  /**
   * Get all tooltip containers using config method GET_CONTAINERS 
   * and begin configuration for each tip and trigger.
   * If page does not have any tips, script ends.
   */
  function initToolTips() {    

    var containers = config.GET_CONTAINERS();

    if(!containers.length) {
      console.warn('Tooltips: no tooltips on this page.');
      return;
    } 

    containers.forEach(function(container, index) {
      var counter = index + 1;
      setComponents(container, counter);
    });

    setEsc();
    
  }

  /**
   * setComponents
   * @param {DOM element} elContainer from @func initTooltips
   * @param {number} numCounter based on index from @func initTooltips
   * @desc  Captures trigger inside tip container and fires @func setTrigger,
   *        to configure trigger. Then, fires @func setDispay to create and 
   *        set tip content.
   */
  function setComponents(elContainer, numCounter) {
    var tooltipTrigger = elContainer.querySelector(config.TRIGGER_SELECTOR);
    var strId = "tooltip_" + numCounter;

    // SET TRIGGER
    setTrigger(tooltipTrigger, strId);

    // SET DISPLAY
    setDisplay(elContainer, numCounter);

  }

  /**
   * setTrigger
   * @param {DOM element} elTrigger           
   * @param {string} strTrigger Id of tip display container
   * @desc  Adds attrs to trigger: tabindex and aria-describedby.
   *        Also adds eventlisteners to trigger: click, blur, and
   *        keydown.
   */
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
      if(e.keyCode === 13) {
        handleDisplay(e, strTrigger);
      }      
    });
  }

  /**
   * setDisplay
   * @param {DOM element} elContainer 
   * @param {number} numCounter 
   * @desc  First, text of tooltip is captured from container's 
   *        title attr is captured. Then, title attr is removed.
   *        Lastly, invoke @func createTooltip with numCounter and text.
   */
  function setDisplay(elContainer, numCounter) {
    // adjust container attributes
    var text = elContainer.getAttribute('title').trim(); 
    elContainer.removeAttribute('title');
    
    // create tooltip content and append to container
    var tooltipContent = createTooltip(numCounter, text);
    elContainer.appendChild(tooltipContent);
  }

  /**
   * createTooltip
   * @param {number} numCounter 
   * @param {string} strText 
   * @return {DOM element} tooltipDisplay
   * @desc  Using counter number and text, create DOM element for
   *        tooltip content. Set attrs for element
   * 
   */
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

  /**
   * handleDisplay
   * @param {Event object} evt 
   * @param {string} strId 
   * @desc  Respond to click, blur, and keydown events. On click toggle
   *        aria-hidden attr value.  Invoke @func handleOpenTips and
   *        @func setPos to set position of tip.
   */
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

  /**
   * handleOpenTips
   * @desc find any open tips and close them.
   */
  function handleOpenTips() {
    var openTip = document.querySelector("[aria-hidden='false']");
    if(openTip) {
      openTip.setAttribute('aria-hidden', true);
      return;
    } else {
      return;
    }
  }

  /**
   * 
   * @param {DOM element} elDisplay 
   * @desc  Determine if user is iOs or Android to determine if user
   *        is using mobile app. If mobile app, set position fixed 
   *        near top of screen. If desktop, set position
   *        above trigger.
   */
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

  /**
   * setEsc
   * @desc Add eventlistener to <esc> key. Close any open tips.
   */
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
