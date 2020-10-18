$(document).on('click','view',function() {
    let id=$(this).attr('data')
    console.log(id)
    $('#myModal').modal('show');
})