let viewBtn=document.querySelector('.view')
let UpdateBtn=document.querySelector('.update')
//view data
$(document).on('click','.view',function(e){
    e.preventDefault();
    let id=$(this).attr('data')
    $('#myModal').modal('show');
    $.ajax({
        type: "PUT",
        url: "/viewMeeting/"+id,
        dataType: "json",
        data: JSON.stringify({id:id}),
        contentType: 'application/json',
        cache: false,
        timeout: 5000,
        complete: function() {
          console.log('process complete');
        },
        dataType: "json",
        success: function (response,status, xhr) {
            var html = "";
            // response.forEach(function(response) {
                html=html+"<tr><td class='font-weight-bold'>ID</td><td>"+response._id+"</td></tr>";
                html=html+"<tr><td class='font-weight-bold'>MetingName</td><td>"+response.meetingName+"</td></tr>";
                html=html+"<tr><td class='font-weight-bold'>Description</td><td>"+response.description+"</td></tr>";
                html=html+"<tr><td class='font-weight-bold'>StartTime</td><td>"+response.startTime+" PM<br></td></tr>";
                html=html+"<tr><td class='font-weight-bold'>EndTime</td><td>"+response.endTime+" PM<br></td></tr>";
                html=html+"<tr><td class='font-weight-bold'>Date</td><td >"+moment(response.createDate).format('ddd Do MMM')+"</td></tr>";
            // })
            
			// $('#myModal').modal('show');
			$("#tableview").html(html);
        },
        error: function(xhr,status,error) {
            console.log('process error',error);
        },
    });
})

$(document).on('click','.edit', function(e){
    e.preventDefault()
    let id=$(this).attr('data')
    console.log(id)
    $('#UpdateModel').modal('show');
    alert(id)
    $.ajax({
        type: "PUT",
        url: "/updateMeeting/"+id,
        dataType: "json",
        data: JSON.stringify({id:id}),
        contentType: 'application/json',
        cache: false,
        timeout: 5000,
        complete: function() {
          console.log('process complete');
        },
        dataType: "json",
        success: function (response,status,xhr) {
            console.log(response)
        },
        error: function(xhr,status,error) {
            console.log('process error',error);
        },
    });
})

$(document).on('click','.delete', function(e){
    e.preventDefault()
    let id=$(this).attr('data')
    console.log(id)
    $('#DeleteModel').modal('show');
    $.ajax({
        type: "DELETE",
        url: "/updateMeeting/"+id,
        dataType: "json",
        data: JSON.stringify({id:id}),
        contentType: 'application/json',
        cache: false,
        timeout: 5000,
        complete: function() {
          console.log('process complete');
        },
        dataType: "json",
        success: function (response,status,xhr) {
            console.log(response)
        },
        error: function(xhr,status,error) {
            console.log('process error',error);
        },
    });
})