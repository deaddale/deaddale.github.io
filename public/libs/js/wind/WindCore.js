(
    function() {
        var WindCore = window.WindCore = {
            $win: $(window),
            $doc: $(document),
            $html: $('html'),
            $body: $('body')
        };

        WindCore.blocks = {};

        WindCore.blockRegister = function(block) {
            var selector = block.getSelector();
            WindCore.blocks[selector] = block;
            console.log(WindCore.blocks);
        };

        WindCore.blocksRun = function(dom) {

            var parent = dom || document;
            $.each(WindCore.blocks, function(selector, block) {
                
                var $target = $(parent).filter(selector).add($(selector, parent));
                block.$parent = $target;

                if($target.length) {
                    $target.each(function() {
                        block.run($(this));
                    });
                }
            });
        };
    }()
);





