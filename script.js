// 当谷歌地图加载完成后隐藏加载动画
function hideLoadingAnimation() {
    document.getElementById('loading').style.display = 'none';
}

// 初始化街景地图
function initMap(position) {
    const userLat = position.coords.latitude;  // 用户的纬度
    const userLng = position.coords.longitude; // 用户的经度

    // 创建街景服务实例
    const panorama = new google.maps.StreetViewPanorama(
        document.getElementById('street-view'),
        {
            position: { lat: userLat, lng: userLng }, // 用户当前位置
            pov: { heading: 165, pitch: 0 },
            zoom: 1,
        }
    );

    // 当街景加载完成后隐藏加载动画
    google.maps.event.addListenerOnce(panorama, 'tilesloaded', hideLoadingAnimation);
}

// 获取用户地理位置失败时的回调函数
function handleLocationError(error) {
    alert("无法获取您的位置，请确保已允许定位功能！\n错误信息: " + error.message);
}

// 获取用户位置
function getUserLocation() {
    if (navigator.geolocation) {
        // 使用 HTML5 Geolocation API 获取用户位置
        navigator.geolocation.getCurrentPosition(initMap, handleLocationError);
    } else {
        alert("您的浏览器不支持定位功能！");
    }
}

// 页面加载时执行
window.onload = function () {
    getUserLocation();
};
