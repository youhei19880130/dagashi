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

  $('.uiGrid ._51mz .pluginConnectButtonLayoutRoot ._3c9t').css('width','auto');
};

$(document).ready(ready)
$(document).on('page:load', ready)
