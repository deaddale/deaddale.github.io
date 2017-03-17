// Switch marerials:begin
$(function() {
    $('#switch_materials').toggle(function() {
        $(this).removeClass("list_active").addClass("cloud_active");
        $('#list_links').hide();
        $('#cloud_links').show();
    }, function() {
        $(this).removeClass("cloud_active").addClass("list_active");
        $('#cloud_links').hide();
        $('#list_links').show();
    });
});
// Switch marerials:end 