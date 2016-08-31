
$(function () {
    function RollImg(_ele,_ctrl){
        this.timer=null;
        this.rollContainer=$(_ele); /* �������� */
        this.rollCtrl=$(_ctrl); /* �������� */
        this.rollCurrent=0; /* ��ʼλ��*/
        this.rollNext=1;/* ��һλ�� */
        this.rollSpeed=300;/*  �����Ĺ����ٶ� */
        this.rollWaittime=3000; /* �������ʱ�� */
        this.rollFWaittime=3000; /* ���εȴ�ʱ�� */
        this.rollWidth=1170; /* ������� */
        this.rollList = this.rollContainer.children('li');
        this.rolllen = this.rollList.length;
    }

    RollImg.prototype.rollfn = function () {
        var _self = rollImg,
            abs = 0;
        if (_self.rollNext > _self.rollCurrent) {
            abs = -1;
            _self.rollList.eq(_self.rollNext).show();

        } else if (_self.rollNext < _self.rollCurrent) {
            abs = 0;
            _self.rollList.eq(_self.rollNext).show();
            _self.rollContainer.css({'left': -1 * _self.rollWidth + 'px'});
        }
        _self.rollCtrl.find('a').eq(_self.rollNext).addClass('active').siblings().removeClass('active');
        _self.rollContainer.animate({"left": abs * _self.rollWidth + 'px'}, _self.rollSpeed, function () {
            _self.rollList.eq(_self.rollCurrent).hide();
            _self.rollContainer.css({'left': 0});
            _self.rollCurrent = _self.rollNext;
            _self.rollNext = _self.rollCurrent + 1 > _self.rolllen - 1 ? 0 : _self.rollCurrent + 1;
        });
        _self.timer = setTimeout(_self.rollfn, _self.rollWaittime);
    };

    RollImg.prototype.init = function () {
        var _self = this;
        _self.rollList.hide().eq(0).show();
        var ahtml = '';
        for (var i = 0, l = _self.rolllen; i < l; i++) {
            ahtml += '<a></a>'
        }
        _self.rollCtrl.append(ahtml);
        _self.rollCtrl.find('a').eq(_self.rollNext-1).addClass('active');
        _self.rollCtrl.bind('click', function (event) {
            var e = event || window.event;
            var $e = $(e.target);
            if ($e.is('a') && !(_self.rollContainer.is(":animated"))) {
                _self.rollNext = $e.index();
                if (_self.rollNext != _self.rollCurrent) {
                    clearTimeout(_self.timer);
                    _self.rollfn();
                }
            }
        });
        _self.timer = setTimeout(_self.rollfn, _self.rollFWaittime);
    };

    var rollImg=new RollImg('.g-srollimg .g-rollcontainer','.g-srollimg .ctrl');
    rollImg.init();
});