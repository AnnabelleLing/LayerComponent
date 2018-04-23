window.onload = function(){
  var aInput = document.getElementsByTagName('input');
  aInput[0].onclick = function(){
    var d = new Layer();
    d.init({ //配置参数
      title: '按钮1弹窗',
    });
  }
  aInput[1].onclick = function(){
    var d = new Layer();
    d.init({
      title: '按钮2弹窗',
      layerWidth: 600,
      layerHeight: 400,
      showMask: true,
      direction: 'top'
    });
  }
}
function Layer(){
  this.settings = { //默认参数
    title: '弹窗标题',
    // layerWidth: 400,//弹窗的宽
    // layerHeight: 300,//弹窗的高
    // showMask: false,//是否显示遮罩
    // direction: 'center'//弹窗的位置
    // 以上注释的默认参数在css中已经直接设置，需要更改的配置项直接在配置参数中新写
    open: false //这个是用来作为标识，标识弹窗是否已经打开，避免打开多个弹窗
  };
}
Layer.prototype.open = false;
Layer.prototype.init = function(opt){ //初始化
  if(!Layer.prototype.open){
    extend(this.settings,opt); //设置参数
    var layer = this.create(); //创建弹窗
    this.closeLayer(layer); //关闭弹窗
    Layer.prototype.open = true;
  }
}
Layer.prototype.create = function(){ //创建弹窗
  var settings = this.settings;
  var olayer = document.createElement('div');
  olayer.className = 'layer';
  var olayerInnerStr = '<div class="layer-title"><span>'+this.settings.title+'</span><a href="javascript:;" id="layer-closebtn">x</a></div>'+'<div class="layer-cont"></div>';
  olayer.innerHTML = olayerInnerStr;
  if(settings.layerWidth){
    olayer.style.width = settings.layerWidth+'px';
    olayer.style.marginLeft = -settings.layerWidth/2+'px';
  }
  if(settings.layerHeight){
    olayer.style.height = settings.layerHeight+'px';
    olayer.style.marginTop = -settings.layerHeight/2+'px';
  }
  if(settings.direction == 'top'){
    olayer.style.top = 0;
    olayer.style.marginTop = 0;
  }
  document.body.appendChild(olayer);
  if(settings.showMask){
    this.crateMask();
  }
  return olayer;
}
Layer.prototype.crateMask = function(){ //创建遮罩
  var oMask = document.createElement('div');
  oMask.id = 'mask';
  document.body.appendChild(oMask);
}
Layer.prototype.closeLayer = function(layer){ //关闭弹窗
  var closeBtn = document.getElementById('layer-closebtn');
  closeBtn.onclick = function(){
    //关闭弹窗
    document.body.removeChild(layer);
    //还要关闭遮罩（如果有)
    var shadow = document.getElementById("mask");
    console.log(shadow);
    if(shadow){
      document.body.removeChild(shadow);
    }
    //标识归置
    Layer.prototype.open = false;
  }
}
function extend(obj1,obj2){
  for (var attr in obj2) {
    obj1[attr] = obj2[attr];
  }
}
