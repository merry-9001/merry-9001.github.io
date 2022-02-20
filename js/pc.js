define([], function(){

    var Tips = (function(){

        var $tipBox = $(".tips-box");

        return {
            show: function(){
                $tipBox.removeClass("hide");
            },
            hide: function(){
                $tipBox.addClass("hide");
            },
            init: function(){
                
            }
        }
    })();

    var slide = function(idx){
        // 修复IE10+切换无效的bug
        var $wrap = $(".switch-wrap"),
          transform = [
              '-webkit-transform: translate(-' + idx * 100 + '%, 0);',
              '-moz-transform: translate(-' + idx * 100 + '%, 0);',
              '-o-transform: translate(-' + idx * 100 + '%, 0);',
              '-ms-transform: translate(-' + idx * 100 + '%, 0);',
              'transform: translate(-' + idx * 100 + '%, 0);'
          ];
        $wrap[0].style.cssText = transform.join('');
        $(".icon-wrap").addClass("hide");
        $(".icon-wrap").eq(idx).removeClass("hide");
    }

    var bind = function(){
        var switchBtn = $("#myonoffswitch");
        var tagcloud = $(".second-part");
        var navDiv = $(".first-part");
        switchBtn.click(function(){
            if(switchBtn.hasClass("clicked")){
                switchBtn.removeClass("clicked");
                tagcloud.removeClass("turn-left");
                navDiv.removeClass("turn-left");
            }else{
                switchBtn.addClass("clicked");
                tagcloud.addClass("turn-left");
                navDiv.addClass("turn-left");
                resetTags();
            }
        });

        var timeout;
        var isEnterBtn = false;
        var isEnterTips = false;

        $(".icon").bind("mouseenter", function(){
            isEnterBtn = true;
            Tips.show();
        }).bind("mouseleave", function(){
            isEnterBtn = false;
            setTimeout(function(){
                if(!isEnterTips){
                    Tips.hide();
                }
            }, 100);
        });

        $(".tips-box").bind("mouseenter", function(){
            isEnterTips = true;
            Tips.show();
        }).bind("mouseleave", function(){
            isEnterTips = false;
            setTimeout(function(){
                if(!isEnterBtn){
                    Tips.hide();
                }
            }, 100);
        });

        $(".tips-inner li").bind("click", function(){
            var idx = $(this).index();
            slide(idx);
            Tips.hide();
        });
    }

    if (yiliaConfig.search) {
        var search = function(){
            require([yiliaConfig.rootUrl + 'js/search.js'], function(){
                var inputArea = document.querySelector("#local-search-input");
                var $HideWhenSearch = $("#toc, #tocButton, .post-list, #post-nav-button a:nth-child(2)");
                var $resetButton = $("#search-form .fa-times");
                var $resultArea = $("#local-search-result");

                var getSearchFile = function(){
                    var search_path = "search.xml";
                    var path = yiliaConfig.rootUrl + search_path;
                    searchFunc(path, 'local-search-input', 'local-search-result');
                }

                var getFileOnload = inputArea.getAttribute('searchonload');
                if (yiliaConfig.search && getFileOnload === "true") {
                    getSearchFile();
                } else {
                    inputArea.onfocus = function(){ getSearchFile() }
                }

                var HideTocArea = function(){
                    $HideWhenSearch.css("visibility","hidden");
                    $resetButton.show();
                }
                inputArea.oninput = function(){ HideTocArea() }
                inputArea.onkeydown = function(){ if(event.keyCode==13) return false}

                resetSearch = function(){
                    $HideWhenSearch.css("visibility","initial");
                    $resultArea.html("");
                    document.querySelector("#search-form").reset();
                    $resetButton.hide();
                    $(".no-result").hide();
                }

                $resultArea.bind("DOMNodeRemoved DOMNodeInserted", function(e) {
                    if (!$(e.target).text()) {
                        $(".no-result").show(200);
                    } else {
                      $(".no-result").hide();
                    }
                })
            })
        }()
    }

    return {
        init: function(){
            resetTags();
            bind();
            Tips.init();
        }
    }
});
