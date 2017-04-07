(function (window) {
    'use strict';
    
    /*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 es5: true*/
    /*global $, jQuery, alert, FileReader, cat, Croppie, alert*/
    
    var ffany = {
        //select box
        select_box: {
            $target: null, // input
            $input : null,
            focus: function () {
                var $this = $(this),
                    $target = $this.find('input'),
                    $children = $this.find('li'),
                    $item = $children.find('li');
                
                //포커스된 타겟 지정
                ffany.select_box.$target = $this;
                ffany.select_box.$input = $target;

                $children.addClass('active');
                $item.off('click', ffany.select_box.click);
                $item.on('click', ffany.select_box.click);
            },
            click: function () {
                var $this = $(this),
                    _val_str = $this.attr('value');
                
                //값 입력 및 초기화
                ffany.select_box.$input.val(_val_str);
                ffany.select_box.$target.trigger('focusout');
            },
            focusout: function () {
                var $this = $(this),
                    $children = $this.children();
        
                $children.removeClass('active');
            }
        },
        //radio btn
        radio_btn: {
            click: function (e) {
                var $target = $(ffany.target(e));
                $target.addClass('active').siblings().removeClass();
            }
        },
        //detect click target
        target: function (e) {
            var touch = e.touches && e.touches[0],
                target = (touch || e).target,
                originalTarget = (e.target.shadowRoot && e.path[0]) || target;
            return originalTarget;
        }
    };
    
    $(document)
        //select box
        .on('focus', '.s_selectWrap', ffany.select_box.focus)
        .on('focusout', '.s_selectWrap', ffany.select_box.focusout)
        //radio btn
        .on('click', '.s_radio_btn', ffany.radio_btn.click);
    
}(window));