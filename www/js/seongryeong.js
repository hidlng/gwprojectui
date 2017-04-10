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
        //toggle btn
        toggle_btn: {
            click: function () {
                var $this = $(this);
                
                if ($this.hasClass('active')) {
                    $this.removeClass('active');
                } else {
                    $this.addClass('active');
                }
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
                if (((!$target.hasClass('container') && $target.closest('.container').length === 0)
                        && (!$target.hasClass('back-calendar-pop') && $target.closest('.back-calendar-pop').length === 0))
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
        //calendar
        calendar: {
            click: function () {
                
                var y,
                    m,
                    d,
                    //월 양식
                    mArray = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                    //input 에서 들어온 입력값
                    $input = $(this),
                    input_val = $input.val(),
                    $calendar = null,
                    calendar_str = '',
                    cal_m_id = 'catTree-calendar-month',
                    cal_y_id = 'catTree-calendar-year';
                
                if (input_val === ''
                        || input_val.indexOf('-') === -1) {
                    //인풋에서 들어온게 아님 혹은 인풋값이 없음
                    var date = new Date();
                    y = date.getFullYear();
                    m = date.getMonth() + 1;
                    d = date.getDate();
                } else {
                    //값이 있으면 잘라내기
                    var input_arr = input_val.split('-');
                    y = input_arr[0];
                    m = input_arr[1];
                    d = input_arr[2];
                }

                calendar_str += '<div class="s_pop_up">';
                calendar_str += '<div class="back-calendar-pop">';
                calendar_str += '<table class="calendar-top-group">';
                calendar_str += '<tr>';
                calendar_str += '<td class="calendar-title" colspan="4">날짜 선택</td>';
                calendar_str += '</tr>';
                calendar_str += '<tr>';
                calendar_str += '<td class="calendar-left">&lt;</td>';
                calendar_str += '<td class="calendar-select">';
                calendar_str += '<input id="catTree-calendar-m" type="hidden" value="' + m + '">';
                calendar_str += '<input id="' + cal_m_id + '"';
                calendar_str += 'class="calendar-input"';
                calendar_str += 'type="text" value="' + mArray[m - 1] + '">';
                calendar_str += '</td>';
                calendar_str += '<td class="calendar-select">';
                calendar_str += '<input id="' + cal_y_id + '"';
                calendar_str += 'class="calendar-input"';
                calendar_str += 'type="text" value="' + y + '">';
                calendar_str += '</td>';
                calendar_str += '<td class="calendar-right">&gt;</td>';
                calendar_str += '</tr>';
                calendar_str += '</table>';
                calendar_str += '<input id="catTree-calendar-d" type="hidden" value="' + d + '">';
                calendar_str += '<table id="catTree-calendar-field" class="calendar-body-group">';
                calendar_str += '</table>';
                calendar_str += '<div class="calendar-btn-bottom left cancel">';
                calendar_str += '취소';
                calendar_str += '</div>';
                calendar_str += '<div id="catree-calendar-done" class="calendar-btn-bottom right">';
                calendar_str += '선택';
                calendar_str += '</div>';
                calendar_str += '</div>';
                calendar_str += '</div>';
                
                $calendar = $(calendar_str);
                $('body').append($calendar);
                
                ffany.calendar.change.update(0);//현재 달 불러옴
                
                //한달 전으로
                $calendar.find('.calendar-left')
                    .on('click', function () {
                        ffany.calendar.change.update(-1);
                    });
                
                //한달 후로
                $calendar.find('.calendar-right')
                    .on('click', function () {
                        ffany.calendar.change.update(1);
                    });
                
                //달 직접 입력
                $calendar.find('#' + cal_m_id)
                    .on('keyup', ffany.calendar.change.month);
                
                //년도 직접 입력
                $calendar.find('#' + cal_y_id)
                    .on('keyup', ffany.calendar.change.year);
                
                //선택버튼
                $('#catree-calendar-done').click(function () {
                    y = Number($('#catTree-calendar-year').val());
                    m = Number($('#catTree-calendar-m').val());
                    d = $('#catTree-calendar-field .active').children().html();
                    if (d === undefined) { return alert('날짜를 선택해주세요'); }
                    $input.val(y + '-' + ((m < 10) ? ('0' + m) : m) + '-' + ((d < 10) ? ('0' + d) : d));
                    
                    $calendar.fadeOut('fast', function () { $(this).remove(); });
                });
            },
            change: {
                month: function () {
                    var val = parseInt(this.value, 10);
                    if (1 <= val && val <= 12) {
                        ffany.calendar.change.update(val, 'month');
                    }
                },
                year: function () {
                    var val = parseInt(this.value, 10);
                    if (1000 <= val && val < 10000) {
                        ffany.calendar.change.update(val, 'year');
                    }
                },
                update: function (data, changeType) {
                    var m = Number($('#catTree-calendar-m').val()),
                        y = Number($('#catTree-calendar-year').val()),
                        d = Number($('#catTree-calendar-d').val()),
                        //월 양식
                        mArray = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
                    
                    console.log(changeType);
                    switch (changeType) {
                    case 'month':
                        m = data;
                        break;
                    case 'year':
                        y = data;
                        break;
                    default:
                        var num = data;
                        m = Number(m) + Number(num);
                        if (m === 0) {
                            y = Number(y) - 1;
                            m = 12;
                        } else if (m === 13) {
                            y = Number(y) + 1;
                            m = 1;
                        }
                        break;
                    }
                    var calHtml = '';
                    calHtml += '<tr>';
                    calHtml += '<td>일</td>';
                    calHtml += '<td>월</td>';
                    calHtml += '<td>화</td>';
                    calHtml += '<td>수</td>';
                    calHtml += '<td>목</td>';
                    calHtml += '<td>금</td>';
                    calHtml += '<td>토</td>';
                    var d2 = (y + (y - y % 4) / 4 - (y - y % 100) / 100 + (y - y % 400) / 400
                                      + m * 2 + (m * 5 - m * 5 % 9) / 9 - (m < 3 ? (y % 4 || y % 100 === 0) && y % 400 ? 2 : 3 : 4)) % 7;
                    var i = 0;
                    for (i = 0; i < 42; i++) {
                        if (i % 7 === 0) { calHtml += '</tr>\n<tr>'; }
                        if (i < d2 || i >= d2 + (m * 9 - m * 9 % 8) / 8 % 2 + (m === 2 ? (y % 4 || y % 100 === 0) && y % 400 ? 28 : 29 : 30)) {
                            calHtml += '<td> </td>';
                        } else {
                            calHtml += '<td' + ((i + 1 - d2) === d ? ' class="active"' : '') + '><span>' + (i + 1 - d2) + '</span></td>';
                        }
                    }
                    calHtml += '</tr>';
                    $('#catTree-calendar-field').html(calHtml);
                    if (changeType !== 'month') { $('#catTree-calendar-month').val(mArray[m - 1]); }
                    $('#catTree-calendar-year').val(y);
                    $('#catTree-calendar-m').val(m);

                    $('#catTree-calendar-field td').click(function () {
                        $('#catTree-calendar-field td').removeClass();
                        $(this).addClass('active');
                        $('#catTree-calendar-d').val($('#catTree-calendar-field .active').children().html());
                    });
                }
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
        //toggle btn
        .on('click', '.s_toggle_btn', ffany.toggle_btn.click)
        //input file preview
        .on('click', '.s_profile_upload', ffany.file_preview.click)
        //tabs
        .on('click', '.s_tabs', ffany.tabs.click)
        //popup
        .on('click', '.s_pop_up', ffany.popup.click)
        //calendar
        .on('click', '.s_calendar', ffany.calendar.click);
}(window));

/**************************\end\ 달력 ****************************/