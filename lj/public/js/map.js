// 引用百度地图API
var map = new BMap.Map("allmap");            // 创建Map实例
var mPoint = new BMap.Point(118.812589,31.991959);
map.enableScrollWheelZoom();
map.centerAndZoom(mPoint,15);
map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());
map.addControl(new BMap.OverviewMapControl());
var circle = new BMap.Circle(mPoint,1000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
map.addOverlay(circle);
var local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false}});
local.searchNearby('小区',mPoint,1000);

//地图找房 canvas 旋转绘图
var ctx = map_canvas.getContext('2d');
var p4 = new Image();
p4.src = '../img/video-logo-appV2.png';
p4.onload = function(){
  var deg1 = 0;
  var deg3 = 0;
  setInterval(function(){
      //平移->旋转->绘图->逆向旋转->逆向平移
    ctx.translate(p4.width/2, p4.height/2);
    ctx.rotate(deg1*Math.PI/180);
    ctx.drawImage(p4,-p4.width/2, -p4.height/2);
    ctx.rotate(-deg1*Math.PI/180);
    ctx.translate(-p4.width/2, -p4.height/2);
    deg1 += 6;
    ctx.translate(p4.width/2, 100-p4.height/2);
    ctx.rotate(deg3*Math.PI/180);
    ctx.drawImage(p4, -p4.width/2, -p4.height/2);
    ctx.rotate(-deg3*Math.PI/180);
    ctx.translate(-p4.width/2, -(100-p4.height/2));
    deg3 += 6;
  }, 20);
}
