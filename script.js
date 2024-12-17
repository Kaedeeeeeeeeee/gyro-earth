let panorama; // 谷歌街景对象

// 初始化街景视图
function initStreetView() {
  const streetViewDiv = document.getElementById("street-view");

  // 设置街景位置（这里是示例坐标）
  //定位用户位置
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const userLocation = { 
            lat: position.coords.latitude, 
            lng: position.coords.longitude 
        };
        map.setCenter(userLocation); // 设置地图中心
        new google.maps.Marker({
            position: userLocation,
            map: map,
            title: "您当前的位置"
        });
    }, function() {
        alert("无法获取您的位置信息，请检查浏览器权限。");
    });
} else {
    alert("您的浏览器不支持定位功能。");
}

  // 初始化街景视图
  panorama = new google.maps.StreetViewPanorama(streetViewDiv, {
    position: svLocation, // 街景位置
    pov: {
      heading: 0, // 水平视角初始角度
      pitch: 0,   // 垂直视角初始角度
    },
    zoom: 1, // 放大倍数
  });
}

// 监听陀螺仪数据并更新视角
function handleOrientation(event) {
  if (!panorama) return; // 确保街景已经初始化

  const alpha = event.alpha || 0; // 水平旋转角度（0~360）
  const beta = event.beta || 0;   // 前后倾斜角度（-90~90）

  // 更新街景的视角
  panorama.setPov({
    heading: alpha,       // 水平视角与 alpha 对应
    pitch: beta / 2,      // 垂直视角与 beta 对应（缩放适配）
  });
}

// 页面加载完成后初始化街景
window.onload = () => {
  initStreetView();
  if (window.DeviceOrientationEvent) {
    // 监听陀螺仪事件
    window.addEventListener("deviceorientation", handleOrientation, true);
  } else {
    alert("您的设备不支持陀螺仪功能！");
  }
};
//结束入场动画
google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
  document.getElementById('loading').style.display = 'none';
});


