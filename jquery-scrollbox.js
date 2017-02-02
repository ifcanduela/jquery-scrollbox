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
        let gutter_height = $gutter.height();
        let content_height = $content.height();
        let knob_height_percent = gutter_height / content_height;
        let knob_height = Math.round(gutter_height * knob_height_percent);

        $knob.height(knob_height);

        return knob_height;
    }

    $.fn.scrollBox = function () {
        return this.each(function () {
            let $box = $(this);

            let $content = $box.children().first();
            $content.css('position', 'absolute');

            let $knob = $('<div class="js-knob"></div>');

            let $gutter = $('<div class="js-gutter"></div>');
            $gutter.append($knob);

            $box.append($gutter);

            $box.on('mouseenter', function () {
                resizeKnob($box, $content, $gutter, $knob);
            });

            $box.on('mousewheel', function (event) {
                let container_top = parseInt($content.css('top'));

                let content_height = $content.height();
                let scrollbox_height = $box.height();

                let height = scrollbox_height - content_height;
                let offset = event.deltaY * event.deltaFactor;
                let calculated_top = container_top + offset;
                let clamped_top = Math.min(0, Math.max(height, calculated_top));

                $content.css('top', clamped_top);

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
