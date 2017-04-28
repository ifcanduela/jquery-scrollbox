/**
 * Tiny jQuery plugin for simple scrollable boxes.
 *
 * Requires [jQuery-mousewheel](https://github.com/jquery/jquery-mousewheel).
 *
 * This plugin only adds a scrolling indicator to a box, it does not include
 * click-and-drag behavior for the scrollbar.
 *
 * Must be applied to a block-level element with a definite height (not necessarily
 * fixed) and an absolute, fixed or relative CSS position value.
 *
 * Styles must be provided for .js-gutter (the scrollbar container) and .js-knob (the
 * scroll position indicator).
 */
(function ($) {
    function resizeKnob($box, $content, $gutter, $knob) {
        // the visible height of the scrollbox
        let gutter_height = $gutter.height();
        // the full height of the container
        let content_height = $content.height();
        // amount of the container that is currently visible
        let knob_height_percent = gutter_height / content_height;
        // actual size of the knob in pixels
        let knob_height = Math.round(gutter_height * knob_height_percent);

        $knob.height(knob_height);

        return knob_height;
    }

    $.fn.scrollBox = function () {
        return this.each(function () {
            // the scrollable container
            let $box = $(this);
            // the content to scroll
            let $content = $box.children().first();
            // a scrolling position marker
            let $knob = $('<div class="js-knob"></div>');
            // the container for the scrollbar
            let $gutter = $('<div class="js-gutter"></div>');

            // for touch events
            let _lastTouchOffset = null;

            $content.css('position', 'absolute');
            $gutter.append($knob);
            $box.append($gutter);

            // resize the knob when it's made visible
            $box.on('mouseenter', function () {
                resizeKnob($box, $content, $gutter, $knob);
            });

            // event handlers for mousewheel (via juery plugin) and touch events
            $box.on('mousewheel touchmove', function (event) {
                // mousewheel event data
                let deltaY = event.deltaY;
                let deltaFactor = event.deltaFactor;

                // switch delta values in case of touch event
                if (event.type === 'touchmove') {
                    let _currentTouchOffset = event.touches[0].screenY;

                    deltaY = 1;
                    deltaFactor = _currentTouchOffset - _lastTouchOffset;
                    _lastTouchOffset = _currentTouchOffset;
                }

                // current vertical position of the scrollbox
                let container_top = parseInt($content.css('top'));

                // full height of the content
                let content_height = $content.height();
                // visible height of the container
                let scrollbox_height = $box.height();

                // calculate new position
                let offset = deltaY * deltaFactor;
                let calculated_top = container_top + offset;
                // ensure the scrollbox does not go out of bounds
                let height = scrollbox_height - content_height;
                let clamped_top = Math.min(0, Math.max(height, calculated_top));

                $content.css('top', clamped_top);

                // reposition the scrolling marker
                let knob_height = $knob.height();
                let gutter_height = $gutter.height();
                let scroll_percent = Math.max(0, Math.min(1, calculated_top / height));
                let knob_top = (gutter_height - knob_height) * scroll_percent;

                $knob.css('top', knob_top);

                return false;
            });
        });
    };
}) (jQuery);
