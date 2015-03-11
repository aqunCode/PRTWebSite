// JavaScript Document

//按需写入所需的函数名
$(function(){
	PBL("#flow-box","#flow-box>li",1);
	gototop();
	$(".nav ul li").hover(function() {
		$(this).find('.navlink').stop(true,true).fadeIn(2000);
	},function(){
		$(this).find('.navlink').stop(true,true).fadeOut(2000);
		});
})
function PBL(outer,boxs,style){//outer父级元素、boxs子级元素，style加载样式（ 1或者2 ）
    var pubu = $(outer),
    	box = $(boxs),
    	boxH=0,
    	num = Math.floor($(".right").width()/box.outerWidth());//根据浏览器宽度获得显示的列的数量
    pubu.width(860);//给pubu的宽度赋值num*(box.outerWidth())
    var allHeight = [];//定义一个数组存储所有列的高度
    for(var i=0;i<box.length;i++){
        if (i<num) {
            allHeight[i]=box.eq(i).outerHeight(true);
        }else{
            var minHeight = Math.min.apply({},allHeight);//获得所有的列中高度最小的列的高度
            var sy = getSy(minHeight,allHeight);//获取高度最小的列的索引
            //sy=sy==0?1:sy;
            var l = sy*box.eq(i).outerWidth(true);
            getStyle(box.eq(i),minHeight,l,i,style);
            allHeight[sy] += box.eq(i).outerHeight(true);
            boxH= Math.max.apply({},allHeight);
        }
        //boxH+=box.eq(i).outerHeight(true);
    }
    pubu.height(boxH);
}
//获取高度最小的列的索引
function getSy(minH,allH){
    for(sy in allH){
        if(allH[sy]==minH) return sy;
    }
}
//存储开始请求数据条数的位置
var getStartNum = 0;
//设置请求数据加载的样式
function getStyle(boxs,top,left,index,style){
    if (getStartNum>=index) {
        return;
    }
    boxs.css("position","absolute");
    switch(style){
        case 1:
            boxs.css({
                "top":top+$(window).height(),
                "left":left
            });
            boxs.stop().animate({
                "top":top,
                "left":left
            },999);
        break;
        case 2:
            boxs.css({
                "top":top,
                "left":left,
                "opacity":"0"
            });
            boxs.stop().animate({
                "opacity":"1"
            },999);
    }
    getStartNum = index;//更新请求数据的条数位置
}
function gototop(){
	//返回顶部	
	$backToTopEle = $(".back2up").click(function() {
		$("html, body").animate({
			scrollTop: 0
		},300);
	}),
	$backToTopFun = function() {
		var st = $(document).scrollTop(),
		winh = $(window).height(); (st > 0) ? $backToTopEle.show() : $backToTopEle.hide();
		//IE6下的定位   
		if (!window.XMLHttpRequest) {
			$backToTopEle.css("top", st + winh - 200);
		}
	};
	
	$backToTopFun = function() {
		var st = $(document).scrollTop(),
		winh = $(window).height(); (st > 0) ? $backToTopEle.show() : $backToTopEle.hide();
		//IE6下的定位   
		if (!window.XMLHttpRequest) {
			$backToTopEle.css("top", st + winh - 200);
		}
	};
	
	$backToTopSH = function() {
		var st = $(document).scrollTop(),
		winh = $(window).height(); (st > 0) ? $('#floor_select').show() : $('#floor_select').hide();
		//IE6下的定位   
		if (!window.XMLHttpRequest) {
			$('#floor_select').css("top", st + winh - 200);
		}
	};
	$(window).bind("scroll", $backToTopSH);
	$(function() {
		$backToTopSH();
	});
}
