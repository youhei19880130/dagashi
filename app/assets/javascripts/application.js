// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require cerulean/loader
//= require cerulean/bootswatch
//= require turbolinks
//= require sidr_min
//= require jquery.slick

//= require bootstrap-sprockets

ready = function(){
  $('.dropdown-toggle').dropdown()

  $('.navbar.navbar-default button.navbar-toggle')
    .attr('data-toggle', '')
    .attr('data-target', '')
    .sidr({
      source:   '.navbar-collapse.collapse',
      renaming: false,
      side:     'right',
      onOpen: function() {
        $('div.navbar-fixed-top').css('position', 'static');
        $('div.navbar.navbar-default.second').css('margin-top', '-20px');
      },
      onClose: function() {
        $('div.navbar-fixed-top').css('position', 'fixed');
        $('div.navbar.navbar-default.second').css('margin-top', '50px');
      }
    });

  $('.carousel').slick();

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.5&appId=971711982847446";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Google map表示
  // キャンパスの要素を取得する
  var canvas = document.getElementById( 'map-canvas' ) ;
  // 中心の位置座標を指定する
  var latlng = new google.maps.LatLng(35.6610775, 139.6994961);
  // 地図のオプションを設定する
  var mapOptions = {
    zoom: 16,        // ズーム値
    center: latlng,    // 中心座標 [latlng]
  };
  // [canvas]に、[mapOptions]の内容の、地図のインスタンス([map])を作成する
  var map = new google.maps.Map( canvas , mapOptions ) ;
  // マーカーのインスタンスは配列で管理しよう
  var markers = [] ;
  // マーカーのインスタンスを作成する
  markers[0] = new google.maps.Marker({
     map: map ,
     position: new google.maps.LatLng(35.6610775, 139.6994961),
  })
};

$(document).ready(ready)
$(document).on('page:load', ready)
