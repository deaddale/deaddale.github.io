(
    function() {
        var WindForm = window.WindForm = {};

        WindForm.getSelector = function() {
            return null;
        };
        WindForm.getBindings = function() {
            return [];
        };
        WindForm.applyBindings = function($target) {
            $.each(
                this.getBindings($target),
                function(index, binding) {
                    $target.on.apply($target, binding);
                }
            );
        };
        WindForm.isInitialized = function($target)
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

        WindForm.run = function($target) {
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