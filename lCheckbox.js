;(function(j, l, window) {
    var lCheckbox = {
        data: {},
        sign: 'default',
        default:
        {
            layer: {
                skin: false,
                area: ['30%', '50%'],
                title: '分类',
                shadeClose: false
            },
            config: {
                checkList: false,
                isEvent: false,
                count: 0,
                maxCount: 1,
                inputName: 'checkbox',
                title: '分类tab',
                fromDom: ''
            }
        },
        my: {},
        temData: {
            default:
            {}
        },
        tid: 0,
        version: '1.0.0',

        flag: function(str) {
            this.sign = str ? str : 'default';
            this.temData[this.sign] = {};
            return this;
        },
        config: function(config) {
            if (!this.temData[this.sign].config) {
                this.temData[this.sign].config = [];
            }

            var self = this;
            if (config.length > 1) {
                j.each(config, function(k, v) {
                    self.temData[self.sign].config.push(j.extend({}, self.
                        default.config, v));
                });
            } else {
                this.temData[this.sign].config.push(j.extend({}, this.
                    default.config, config));
            }
            return this;
        },
        layer: function(config) {
            this.temData[this.sign].layer = j.extend({}, this.
                default.layer, config);
            return this;
        },
        input: function(data) {
            if (!this.temData[this.sign].data) {
                this.temData[this.sign].data = [];
            }

            var self = this;
            if (data.length > 1) {
                j.each(data, function(k, v) {
                    self.temData[self.sign].data.push(v);
                });
            } else {
                this.temData[this.sign].data.push(data);
            }
            return this;
        },
        show: function(data) {
            if (typeof this.data[this.sign] == 'undefined') {
                this.input(this.evalString(data));
                this._init_();
                console.log(this);
                this.html = j('<div id="wrap"></div>');
                this.html.append('<div class="head w-st1"></div><div class="tab-main">' + '</div><div class="foot w-st1"><span id="reset" class="span-prototype fst-1">取消</span>' + '<span id="submit" class="span-prototype fst-1">确定</span></div>');
                var self = this;
                for (var i = 0; i < this.data[this.sign].count; i++) {
                    this.html.find('.head').append('<a class="a-s1" data-id="' + i + '">' + this.data[this.sign].depot[i].config.title + '</a>');

                    this.html.find('.tab-main').append('<div class="center w-st1" data-id="' + i + '"><div class="center-top c-st1"></div><div class="center-center c-st1"></div><div class="center-cue">已选：</div><div class="center-foot c-st1 js-check-show"></div></div>');
                    var count = 0,
                        html1 = '',
                        html2 = '';
                    j.each(this.data[this.sign].depot[i].input, function(k, v) {
                        if (count === 0) {
                            j.each(v, function(kk, vv) {
                                html1 += '<span class="j-ck1" data-id="' + kk + '">' + vv + '</span>';
                            });
                        } else {
                            html2 += '<div class="c-c-layer" data-id="' + k + '">';
                            j.each(v, function(kk, vv) {
                                html2 += '<span class="cb"><lable><input type="checkbox" class="j-ck2" name="cb" data-id="' + kk + '" data-name="' + vv + '">' + vv + '</lable></span>';
                            });
                            html2 += '</div>';
                        }
                        count++;
                    });
                    this.html.find(".center[data-id='" + i + "'] .center-top").html(html1);
                    this.html.find(".center[data-id='" + i + "'] .center-center").html(html2);
                }
                this.html.find(".center:first").show();
                this.data[this.sign].image = this.html;
            } else {
                this.html = this.data[this.sign].image;
            }

            layer.open({
                type: 1,
                skin: false,
                //加上边框
                area: ['630px', '440px'],
                //宽高
                content: this.html.html()
            });

            this._addEvent_();
            this._action_();
        },
        getCheckList: function() {
            var result = [];
            j.each(this.data[this.sign].depot, function(k, v) {
                result[k] = [];
                j.each(v.config.checkList, function(kk, vv) {
                    result[k].push(vv);
                });
            });
            return result;
        },
        _addEvent_: function() {
            if (this.
                    default.config.isEvent == false) {
                this.
                    default.config.isEvent = true;
                var self = this;
                j(document).on('click', '.a-s1', function() {
                    self.tid = j(this).data('id');
                    j(this).addClass('show').siblings().removeClass('show');
                    j(".center[data-id=" + j(this).data('id') + "]").show().siblings().hide();
                });
                j(document).on('click', '.j-ck1', function() {
                    j(this).addClass('show').siblings().removeClass('show');
                    j(this).parents('.center').find('.c-c-layer[data-id="' + j(this).data('id') + '"]').show().siblings().hide();
                });
                j(document).on('click', '.j-ck2', function() {
                    var id = j(this).data('id');
                    var fid = j(this).parents('.c-c-layer').data('id');
                    self.tid = j(this).parents('.center').data('id');
                    var fname = j(this).parents('.center').find('.j-ck1[data-id="' + fid + '"]').text();
                    var fafter = j(this).parents('.center').find("div.j-check-f-l[data-id=" + fid + "]");
                    if (j(this).is(':checked')) {
                        if (self.data[self.sign].depot[self.tid].config.count >= self.data[self.sign].depot[self.tid].config.maxCount) {

                            layer.msg('超出最大选择数量');
                            return false;
                        }
                        self.data[self.sign].depot[self.tid].config.count++;

                        if (fafter.length) {
                            fafter.append('<span class="span-prototype span-s2 j-check-s-b" data-id=' + id + '>' + j(this).data('name') + '</span>');
                        } else {
                            j(this).parents('.center').find(".js-check-show").append('<div data-id=' + fid + ' data-name=' + fname + ' class="j-check-f-l"><div>' + fname + '：</div><span data-id="' + id + '" class="span-prototype span-s2 j-check-s-b">' + j(this).data('name') + '</span></div>');
                        }
                    } else {
                        self.data[self.sign].depot[self.tid].config.count--;
                        if (fafter.find('span').length == 1) {
                            fafter.remove();
                        } else {
                            fafter.children('span[data-id=' + id + ']').remove();
                        }
                    }
                });
                //取消
                j(document).on('click', '#reset', function() {
                    layer.closeAll();
                });
                j(document).on('click', '.j-check-s-b', function() {
                    j(this).parents('.center').find('.j-ck2[data-id=' + j(this).data('id') + ']').click();
                });
                j(document).on('click', '#submit', function() {
                    j('.js-check-show').each(function() {
                        var tid = j(this).parents('.center').data('id');
                        self.data[self.sign].depot[tid].config.checkList = [];
                        if (j(this).html()) {
                            j(this).find('.j-check-s-b').each(function() {
                                self.data[self.sign].depot[tid].config.checkList.push(j(this).data('id'));
                            });
                        }
                    });
                    j.each(self.data[self.sign].depot, function(k, v) {
                        var formDom = j(v.config.fromDom);
                        formDom.addClass('wmjShowBox').data('sign', self.sign).data('tid', k).html('');
                        self.data[self.sign].depot[k].config.count = 0;
                        j.each(v.config.checkList, function(kk, vv) {
                            if (formDom.find('div.s-check-l[data-id="' + self.findParentKey(vv, k) + '"]').length > 0) {
                                formDom.find('div.s-check-l[data-id="' + self.findParentKey(vv, k) + '"]').append('<span class="span-prototype span-s3 j-clean-s-b" data-id=' + vv + '>' + self.findName(vv, null, k) + '<input name="' + v.config.inputName + '[]" value="' + vv + '" /></span>');
                            } else {
                                formDom.append('<div data-id=' + self.findParentKey(vv, k) + ' data-name=' + self.findParentName(vv, k) + ' class="s-check-l"><div>' + self.findParentName(vv, k) + '：</div><span data-id="' + vv + '" class="span-prototype span-s3 j-clean-s-b">' + self.findName(vv, null, k) + '<input name="' + v.config.inputName + '[]" value="' + vv + '" /></span></div>');
                            }
                        });
                    });
                    j('#reset').click();
                });
                j(document).on('click', '.wmjShowBox .j-clean-s-b', function() {
                    var pid = j(this).parent('div').data('id');
                    var id = j(this).data('id');
                    var sign = j(this).parents('.wmjShowBox').data('sign');
                    var tid = j(this).parents('.wmjShowBox').data('tid');
                    var arr = self.data[sign].depot[tid].config.checkList;
                    self.ArrarRemoveUnit(arr, id);
                    if (j(this).siblings('.j-clean-s-b').length >= 1) {
                        j(this).remove();
                    } else {
                        j(this).parent().remove();
                    }
                });
            }
        },
        _action_: function() {
            var self = this;
            j('.a-s1:first').click();
            j('.center-top').find('span:first').click();
            j.each(self.data[self.sign].depot, function(k, v) {
                var handDom = j('.center[data-id="' + k + '"]');
                if (v.config.checkList) {
                    j.each(v.config.checkList, function(kk, vv) {
                        handDom.find('.j-ck2[data-id="' + vv + '"]').click();
                    });
                }
            });
        },
        _init_: function() {
            this.data[this.sign] = {};
            this.data[this.sign] = {
                layer: {},
                image: '',
                count: 0,
                depot: []
            };
            this.data[this.sign].count = this.temData[this.sign].data.length;
            this.data[this.sign].layer = this.temData[this.sign].layer ? this.temData[this.sign].layer : this.
                default.layer;
            for (var i = 0; i < this.data[this.sign].count; i++) {
                this.data[this.sign].depot[i] = {
                    input: this.temData[this.sign].data[i],
                    config: this.temData[this.sign].config[i] ? this.temData[this.sign].config[i] : this.
                        default.config
                }
            }
            this.temData[this.sign] = {};
        },
        evalString: function(str) {
            return eval('(' + str + ')');
        },
        findParentName: function(str, pid, sign) {
            pid = pid ? pid : 0;
            sign = sign ? sign : this.sign;
            var count = 0,
                firstArr, result;
            j.each(this.data[sign].depot[pid].input, function(k, v) {
                if (count == 0) {
                    firstArr = v;
                }
                j.each(v, function(kk, vv) {
                    if (kk == str) {
                        result = firstArr[k];
                    }
                });
                count++;
            });
            return result;
        },
        findParentKey: function(str, pid, sign) {
            pid = pid ? pid : 0;
            sign = sign ? sign : this.sign;
            var result;
            j.each(this.data[sign].depot[pid].input, function(k, v) {
                j.each(v, function(kk, vv) {
                    if (kk == str) {
                        result = k;
                    }
                });
            });
            return result;
        },
        findName: function(id, pid, tid, sign) {
            pid = pid ? pid : null;
            tid = tid ? tid : 0;
            sign = sign ? sign : this.sign;
            var result;

            if (pid === null) {
                j.each(this.data[sign].depot[tid].input, function(k, v) {
                    j.each(v, function(kk, vv) {
                        if (kk == id) {
                            result = vv;
                        }
                    });
                });
            } else {
                result = this.data[sign].depot[tid].input[pid][id];
                console.log('id:' + id);
                console.log('pid:' + pid);
                console.log(result);
            }
            return result;
        },
        ArrarRemoveUnit: function(arr, val) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == val) {
                    arr.splice(i, 1);
                    break;
                }
            }
        },
        isArray: function(data) {
            return Object.prototype.toString.call(data) == '[object Array]';
        },
    };
    window.lCheckbox = lCheckbox;
})(jQuery, layer, window);