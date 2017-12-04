$(function(){'use strict'
$('[data-toggle="control-sidebar"]').controlSidebar()
$('[data-toggle="push-menu"]').pushMenu()
var $pushMenu=$('[data-toggle="push-menu"]').data('lte.pushmenu')
var $controlSidebar=$('[data-toggle="control-sidebar"]').data('lte.controlsidebar')
var $layout=$('body').data('lte.layout')
var mySkins=['skin-blue','skin-black','skin-red','skin-yellow','skin-purple','skin-green','skin-blue-light','skin-black-light','skin-red-light','skin-yellow-light','skin-purple-light','skin-green-light']
function get(name){if(typeof(Storage)!=='undefined'){return localStorage.getItem(name)}else{window.alert('Please use a modern browser to properly view this template!')}}
function store(name,val){if(typeof(Storage)!=='undefined'){localStorage.setItem(name,val)}else{window.alert('Please use a modern browser to properly view this template!')}}
function changeLayout(cls){$('body').toggleClass(cls)
$layout.fixSidebar()
if($('body').hasClass('fixed')&&cls=='fixed'){$pushMenu.expandOnHover()
$layout.activate()}
$controlSidebar.fix()}
function changeSkin(cls){$.each(mySkins,function(i){$('body').removeClass(mySkins[i])})
$('body').addClass(cls)
store('skin',cls)
return false}
function setup(){var tmp=get('skin')
if(tmp&&$.inArray(tmp,mySkins))
changeSkin(tmp)
$('[data-skin]').on('click',function(e){if($(this).hasClass('knob'))
return
e.preventDefault()
changeSkin($(this).data('skin'))})
$('[data-layout]').on('click',function(){changeLayout($(this).data('layout'))})
$('[data-controlsidebar]').on('click',function(){changeLayout($(this).data('controlsidebar'))
var slide=!$controlSidebar.options.slide
$controlSidebar.options.slide=slide
if(!slide)
$('.control-sidebar').removeClass('control-sidebar-open')})
$('[data-sidebarskin="toggle"]').on('click',function(){var $sidebar=$('.control-sidebar')
if($sidebar.hasClass('control-sidebar-dark')){$sidebar.removeClass('control-sidebar-dark')
$sidebar.addClass('control-sidebar-light')}else{$sidebar.removeClass('control-sidebar-light')
$sidebar.addClass('control-sidebar-dark')}})
$('[data-enable="expandOnHover"]').on('click',function(){$(this).attr('disabled',true)
$pushMenu.expandOnHover()
if(!$('body').hasClass('sidebar-collapse'))
$('[data-layout="sidebar-collapse"]').click()})}
$('[data-toggle="tooltip"]').tooltip()})