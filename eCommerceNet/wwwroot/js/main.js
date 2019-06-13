jQuery(document).ready(function ($) {
    "use strict";

    $(function () {
        var lastScroll = 0;
        var headerfixed = $("#header-main-fixed");
        var headerfixedbg = $(".header-bg");
        $(window).scroll(function () {
            //Current scroll
            var st = $(this).scrollTop();
            //up-down scroll
            if (st > lastScroll) {

                if (st > 50) {
                    var $obj = $(".header-top-login");
                    var $obj = $(".header-top-signup");
                    if ($obj.hasClass("expanded")) {
                        $obj.removeClass("expanded");
                        $obj.slideUp("fast");
                    }
                }
            }
            else {
                if (st < 50) {
                    headerfixed.removeClass("header-main-fixed");
                    headerfixedbg.removeClass("header-bg-fixed");
                }
            }
            lastScroll = st;
        });
    });

    $(function () {
        $('.dropdown').hover(function () {
            $(this).addClass('open');
        }, function () {
            $(this).removeClass('open');
        });
    });
    
    // Top login open functions
    $("#header-login").click(function () {
        var $objLogin = $(".header-top-login");
        var $objSignup = $(".header-top-signup");
        if ($objLogin.hasClass("expanded") || $objSignup.hasClass("expanded")) {
            $objLogin.removeClass("expanded");
            $objLogin.slideUp({
                duration: 300,
                easing: "easeInQuad"
            });
        }
        else {
            $objLogin.addClass("expanded");
            $objLogin.slideDown({
                duration: 300,
                easing: "easeInSine"
            });
        }
    });

    $("#header-change-password").click(function () {
        var $objLogin = $(".header-top-login");
        var $objSignup = $(".header-top-signup");
        var $objChangePass = $(".header-top-change-pass")
        if ($objChangePass.hasClass("expanded") || $objLogin.hasClass("expanded") || $objSignup.hasClass("expanded")) {
            $objChangePass.removeClass("expanded");
            $objChangePass.slideUp({
                duration: 300,
                easing: "easeInQuad"
            });
        }
        else {
            $objChangePass.addClass("expanded");
            $objChangePass.slideDown({
                duration: 300,
                easing: "easeInSine"
            });
        }
    });
    // Top login open functions
    $("#header-signup").click(function () {
        var $objLogin = $(".header-top-login");
        var $objSignup = $(".header-top-signup");
        if ($objSignup.hasClass("expanded") || $objLogin.hasClass("expanded")) {
            $objSignup.removeClass("expanded");
            $objSignup.slideUp({
                duration: 300,
                easing: "easeInQuad"
            });
        }
        else {
            $objSignup.addClass("expanded");
            $objSignup.slideDown({
                duration: 300,
                easing: "easeInSine"
            });
        }
    });
    $("#header-login-close").click(function () {
        var $obj = $(".header-top-login");
        if ($obj.hasClass("expanded")) {
            $obj.removeClass("expanded");
            $obj.slideUp({
                duration: 300,
                easing: "easeInQuad"
            });
        }
        else {
            $obj.addClass("expanded");
            $obj.slideDown({
                duration: 300,
                easing: "easeInQuad"
            });
        }
    });

    $("#header-signup-close").click(function () {
        var $obj = $(".header-top-signup");
        if ($obj.hasClass("expanded")) {
            $obj.removeClass("expanded");
            $obj.slideUp({
                duration: 300,
                easing: "easeInQuad"
            });
        }
        else {
            $obj.addClass("expanded");
            $obj.slideDown({
                duration: 300,
                easing: "easeInQuad"
            });
        }
    });

    $("#header-change-pass-close").click(function () {
        var $obj = $(".header-top-change-pass");
        if ($obj.hasClass("expanded")) {
            $obj.removeClass("expanded");
            $obj.slideUp({
                duration: 300,
                easing: "easeInQuad"
            });
        }
        else {
            $obj.addClass("expanded");
            $obj.slideDown({
                duration: 300,
                easing: "easeInQuad"
            });
        }
    });


    $(function () {
        $("#top-slider").responsiveSlides({
            timeout: 3000,
            auto: true,
            nav: true,
            prevText: "",
            nextText: ""
        });
    });

    $(".flexisel").flexisel({
        visibleItems: 5,
        animationSpeed: 1000,
        autoPlay: true,
        autoPlaySpeed: 3000,
        pauseOnHover: true,
        enableResponsiveBreakpoints: true,
        responsiveBreakpoints: {
            portrait: {
                changePoint: 480,
                visibleItems: 1
            },
            landscape: {
                changePoint: 640,
                visibleItems: 2
            },
            tablet: {
                changePoint: 768,
                visibleItems: 3
            }
        }
    });

});


