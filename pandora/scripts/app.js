"use strict";!function(e){var o=e.querySelector("#app");o.baseUrl="",localStorage.is_dev||(o.baseUrl="/production/pandora/"),o.displayInstalledToast=function(){Polymer.dom(e).querySelector("platinum-sw-cache").disabled||Polymer.dom(e).querySelector("#caching-complete").show()},o.addEventListener("dom-change",function(){console.log("Our app is ready to rock!")}),window.addEventListener("WebComponentsReady",function(){}),o.scrollPageToTop=function(){o.$.headerPanelMain.scrollToTop(!0)},o.closeDrawer=function(){o.$.paperDrawerPanel.closeDrawer()},o.menuAction=function(){o.$.paperDrawerPanel.togglePanel()},o.test_tree={ServiceGroup:{"@id":{},"@type":{},items_per_page:{},content:{},label:{},view_name:{}},Schedule:{"@id":{},"@type":{},has_day:{},has_time_description:{},has_owner:{}}}}(document);