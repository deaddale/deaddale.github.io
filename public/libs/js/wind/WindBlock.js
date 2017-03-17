(
    function() {
        var WindBlock = window.WindBlock = {};

        WindBlock.getSelector = function() {
            return null;
        };
        WindBlock.getBindings = function() {
            return [];
        };
        WindBlock.applyBindings = function($target) {
            $.each(
                this.getBindings($target),
                function(index, binding) {
                    $target.on.apply($target, binding);
                }
            );
        };
        WindBlock.isInitialized = function($target)
        {
            var initialized = $target.data('wind-initialized');
            if (initialized)
            {
                var selector = this.getSelector();
                if (selector in initialized)
                    return true;
            }

            return false;
        };

        WindBlock.run = function($target) {
            var self = this;
            $.each(
                $target,
                function()
                {
                    var $elem = $(this);
                    if (!self.isInitialized($elem))
                    {

                        var initialized = $elem.data('wind-initialized') || {};
                        initialized[self.getSelector()] = 1;
                        $elem.data('wind-initialized', initialized);

                        self.initialize($elem);
                        self.applyBindings($elem);
                    }
                }
            );
        };
    }()
);