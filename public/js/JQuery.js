$(document).ready(function () {
    // Display data in pop up
    $('.viewDetails').click(function(){
        $(this).each(function(){
            var currentRow=$(this)
            var col1=currentRow.find("td:eq(0)").html() 
            var col2=currentRow.find("td:eq(1)").html() 
            var col3=currentRow.find("td:eq(2)").html() 
            var col4=currentRow.find("td:eq(3)").html() 
            var col5=currentRow.find("td:eq(4)").html() 
            $('#firstname').text(col1)
            $('#lastname').text(col2)
            $('#address').text(col3)
            $('#phone').text(col4)
            $('#gender').text(col5)
            $('.content').show(1000)
        })
    })
    // end
    // hide popup
    $('#popUpOK').click(function(){
        $('.content').hide(1000)
    })
    // end
    // update user
    $('#update_user').submit(function (e) {
        e.preventDefault()

        var unindexed_array = $(this).serializeArray()
        var data = {}
        $.map(unindexed_array, function (n, i) {
            data[n['name']] = n['value']
        })

        var request = {
            "url": `http://localhost:3000/register/updateregister/${data.id}`,
            "method": "PUT",
            "data": data
        }
        $.ajax(request).done(function (response) {
            alert("User Updated")
        })
    })
    //end
    //Delete user
    if ((window.location.pathname) == "/register") {
        $ondelete = $(".table tbody td a.delete")
        $ondelete.click(function () {
            var id = $(this).attr("data-id")

            var request = {
                "url": `http://localhost:3000/register/deleteregister/${id}`,
                "method": "DELETE"
            }
            if (confirm("Delete User?")) {
                $.ajax(request).done(function (response) {
                    location.reload()
                })
            }
        })
    }
    //end
})