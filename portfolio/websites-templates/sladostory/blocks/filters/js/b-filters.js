(function() {
    $(document).ready(function(){
        $('.b-result-info').find('.filter-switcher').click(function (event) {
            event.preventDefault();
            $('.b-filters').toggleClass('active');
        });
        
        // var $select = $('.b-filters').find('select');
        // $select.select2({
        //     theme: 'classic',
        //     minimumResultsForSearch: -1,
        //     width: 'auto',
        //     dropdownAutoWidth: true
        // });
    });
})();