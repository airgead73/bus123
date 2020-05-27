TOOLTIP WIDGET
5-26-20

1. Files
   Included are a BUS123 epub, a sample epub, and individual files including html, css, and js. 

1. HTML markup

  <p>I wanted to follow up on our meeting earlier today regarding next steps on pooling our talents
    <span class="tooltip-container standard" data-tooltip="container"
      title="Working together. Offers no evidence for how and what &#8220;talents&#8221; might be &#8220;pooled&#8221; or collected.">
      <sup data-tooltip="trigger">1</sup>
    </span>
    to launch a media blitz for our new partnership.
  </p>

  [[ Add script tag at end of of epub section. Adjust path in src attribute as necessary.]]

  <script type="text/javascript" src="./tooltip-min.js"></script>

  If script is missing or doesn't load for any reason, tooltip content will be available to the user on hover via the title attribute.

2. Page Load 

  When page loads, each tooltip container is dynamically changed as shown below. A new span is inserted into the container after the trigger element. The new span holds the tip content.

    <span class="tooltip-container standard" data-tooltip="container">
      <sup data-tooltip="trigger" tabindex="0" aria-describedby="tooltip_1">1</sup>
      <span id="tooltip_1" role="tooltip" aria-hidden="true">
        Working together. Offers no evidence for how and what &#8220;talents&#8221; might be &#8220;pooled&#8221; or collected.
      </span>
    </span>

3. Behavior

  User can access the tooltip by clicking on the tooltip trigger, or by tabbing to the trigger and hitting <return>. Clicking trigger again, hitting <return> again, tabbing away from trigger, or hitting <esc> will close tip. 

  On desktop, tip should appear immediately above the trigger. On mobile apps, tip should appear near top of screen and centered.  

4. Script 

  Two js files are included: tooltip.js and tooltip-min.js. The tooltip file includes comments explaining what each function does. The tooltip-min file includes a minified version of the script. This should be used in the production version of a given project. See the two epub files.

  In order to accomodate IE10, es6 methods and syntax have been avoided. 

  The widget has been tested on Chrome, Firefox, IE10, Edge 15, iOS, and Android. 

5. CSS 

  Class should only be applied to the outer container span: "tooltip-container standard". This applies the standard styles. The standard styles are used in the BUS123 epub. The css also includes optional style options. See the sample epub to view these options. Again, only apply these classes to the outer span.

            additional classes
            "tooltip-container success"
            "tooltip-container underline"
            "tooltip-container square"
            "tooltip-container circle"

  