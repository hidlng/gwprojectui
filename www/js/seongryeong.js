(function (window) {
    'use strict';
    
    /*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 es5: true*/
    /*global $, jQuery, alert, FileReader, cat, Croppie, alert*/
    
    var ffany = {
        //select box
        select_box: {
            $target: null, // input
            $input : null,
            focus: function (e) {
                var $this = $(this),
                    $target = $this.find('input'),
                    $children = $this.find('li'),
                    $list = $this.find('ul'),
                    $item = $children.find('li'),
                    _ch = 0,
                    _ctop = 0;
                
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
        //input file img
        file_preview: {
            $img: null,
            click: function () {
                var $this = $(this),
                    $input = $this.find('input'),
                    $img = $this.find('img');
                
                ffany.file_preview.$img = $img;

                $input.off('change', ffany.file_preview.change);
                $input.on('change', ffany.file_preview.change);
            },
            change: function () {
                var $input = $(this),
                    $img = ffany.file_preview.$img;

                if ($input[0].files && $input[0].files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        //이미지 리사이징
                        $img.attr('src', e.target.result);
                    };
                    reader.readAsDataURL($input[0].files[0]);
                } else {
                    $input.val('');
                    $img.attr('src', 'img/noimage.png');
                }
            }
        },
        //tabs
        tabs: {
            click: function (e) {
                var $tab = $(ffany.target(e)),
                    data_id = $tab.data('container'),
                    $containers = $('.s_tabs_container');
                
                if (data_id) {
                    $tab.addClass('active').siblings().removeClass('active');
                    
                    $containers
                        .filter('[data-id=' + data_id + ']')
                        .addClass('active')
                        .siblings()
                        .removeClass('active');
                }
            }
        },
        //popup
        popup: {
            click: function (e) {
                var $this = $(this),
                    $target = $(ffany.target(e));
                    
                //팝업 클릭한게 아니거나 x를 클릭하면 꺼짐
                if ((!$target.hasClass('container') && $target.closest('.container').length === 0)
                        || ($target.hasClass('cancel') || $target.closest('.cancel').length !== 0)) {
                    ffany.popup.close($this);
                }
            },
            close: function ($this) {
                $this.fadeOut('fast', function () {
                    $this.remove();
                });
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
        .on('click', '.s_radio_btn', ffany.radio_btn.click)
        //input file preview
        .on('click', '.s_profile_upload', ffany.file_preview.click)
        //tabs
        .on('click', '.s_tabs', ffany.tabs.click)
        //popup
        .on('click', '.s_pop_up', ffany.popup.click);
}(window));