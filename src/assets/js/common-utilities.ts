import $ from "jquery";

export const pageLoadScript = () => {
  $(function () {
    findURL();
    pageHeight();
    maxHeight();
    $(window).bind("resize", function () {
      pageHeight();
    });
  });
};
export const pageHeight = () => {
  $(".apps-center").animate({ left: -500 }, 0);
  var bdyHeight: any = $(window).outerHeight(true);
  var hdrHeight: any = $("header").outerHeight(true);
  var pageTitleHeight: any = $(".page-title").outerHeight(true);
  var inputHeight: any = $(".input-container").outerHeight(true);
  var previewHeight: any = $(".preview-container").outerHeight(true);
  var previewHdr: any = $(".preview-container .widget-hdr").outerHeight(true);
  var previewFtr: any = $(".preview-container .widget-ftr").outerHeight(true);
  if (pageTitleHeight == null) pageTitleHeight = 0;
  if (previewHdr == null) previewHdr = 0;
  if (previewFtr == null) previewFtr = 0;
  var pageHeight01 = bdyHeight - hdrHeight - 10;
  var pageHeight02 = bdyHeight - hdrHeight;
  var pageHeight03 = pageHeight02 - pageTitleHeight - 20;
  var outputHeight = pageHeight03 - inputHeight - 10;
  var previewScroll = previewHeight - (previewHdr + previewFtr);
  $("body").attr("style", "height:" + bdyHeight + "px;");
  // $('.page-container.dashboard-page,.page-container:not(.dashboard-page) .inner-page-container > .white').attr('style', 'height:' + pageHeight01 + 'px;');
  $(".sidebar,.main-menu,.preview-container").attr(
    "style",
    "height:" + pageHeight02 + "px;"
  );
  $(".form-container").attr("style", "height:" + pageHeight03 + "px;");
  $(".preview-container .widget-body").attr(
    "style",
    "height:" + previewScroll + "px;"
  );
  $(".scroll-height").attr("style", "height:" + outputHeight + "px;");

  $(document).on("click", ".menu-tabs > a", function () {
    var relID = $(this).attr("rel");
    var parentRelID: any = $(this).parent().attr("rel");
    var parentClass: any = $(this).parent().attr("class");
    if (
      $("." + parentRelID + " ." + parentClass + "-container." + relID)
        .length >= 1
    ) {
      if (relID !== undefined) {
        $(".apps-center").animate({ left: 60 }, 0);
        var trimClass = parentClass.split(" ")[1];
        if (trimClass == null) {
          $(".menu-tabs-container").removeClass("select");
          $(".menu-tabs > a").removeClass("select");
          $(this).addClass("select");
          $(
            "." + parentRelID + " ." + parentClass + "-container." + relID
          ).addClass("select");
        }
      } else {
        findURL();
        pageHeight();
        maxHeight();
      }
    } else {
      $(".apps-center").animate({ left: -500 }, 0);
    }
  });
  $(document).on("click", function (event) {
    if (!$(event.target).closest(".apps-left,.apps-center").length) {
      $(".apps-center").animate({ left: -500 }, 0);
    }
  });
  $(document).on("click", ".visitor-add:not(.visitor-add.opened)", function () {
    $(".visitor-info .preview-container:not(.preview-container.opened)")
      .animate({ right: 0 }, 350)
      .addClass("opened");
    $(this).addClass("opened");
  });
  $(document).on("click", ".visitor-add.opened,.preview-close", function () {
    $(".visitor-info .preview-container.opened")
      .animate({ right: -400 }, 350)
      .removeClass("opened");
    $(".visitor-add.opened").removeClass("opened");
  });
};
function findURL() {
  var URL = window.location.pathname;
  var PageName = URL.substring(URL.lastIndexOf("/") + 1);
  $(".menu-tabs > a").each(function () {
    var pageURL = $(this).attr("href");
    if (pageURL !== "javascript:void(0);") {
      if (pageURL === "/" + PageName) {
        $(".menu-tabs > a").removeClass("select");
        $(this).addClass("select");
      }
    }
  });
  $(".p-menu-list li a").each(function () {
    //replace p-menu-list instead of nav
    var pageURL = $(this).attr("href");
    if (pageURL !== "javascript:void(0);") {
      if (pageURL === "/" + PageName) {
        //$(this).parents('li').addClass('open').parents('.submenu').show();
        $(this).toggleClass("select");
        $(".menu-tabs-container,.menu-tabs a").removeClass("select");
        var parentClass = $(this).parents(".menu-tabs-container").attr("class");
        var trimClass = parentClass.split(" ")[1];
        $(this).parents(".menu-tabs-container").addClass("select");
        $(".menu-tabs a[rel=" + trimClass + "]").addClass("select");
        pageHeight();
      }
    }
  });
}
// export const findURL=()=>{
//   var URL = window.location.pathname;
//   var PageName = URL.substring(URL.lastIndexOf('/') + 1);
//   $('.menu-tabs > a').each(function () {
//     var pageURL = $(this).attr('href');
//     if(pageURL !== undefined){
//       if (pageURL === (URL))
//       {
//         $('.menu-tabs > a').removeClass('select');
//         $(this).addClass('select');
//       }
//     }
//   });
//   $('.p-panelmenu a').each(function () { //replace p-menu-list instead of nav
//     var pageURL = $(this).attr('href');
//     if(pageURL !== undefined)
//       {
//         if (pageURL === (PageName))
//         {
//           $('.menu-tabs-container,.menu-tabs a').removeClass('select');
//           $(this).addClass('select');
//           var parentClass:any = $(this).parents('.menu-tabs-container').attr('class');
//           var trimClass:any = parentClass.split(" ")[1];
//           $(this).parents('.menu-tabs-container').addClass('select');
//           $(('.menu-tabs a[rel=' + trimClass + ']')).addClass('select');
//           pageHeight();
//         }
//       }
//   });
// }

export const maxHeight = () => {
  var maxHeight = 0;
  $(".preview-final .widget-body").each(function () {
    if ($(this).outerHeight(true) > maxHeight) {
      maxHeight = $(this).outerHeight(true) + 30;
    }
  });
  $(".preview-final .widget-body").outerHeight(maxHeight);
};
