/**
 * Created by xuexing on 16-10-27.
 */
$('#submit').click(function () {
    var url = $('[name=targetUrl]').val();
    var rules = $('[name=rules]').val();
    $.ajax({
        type:'POST',
        url:'/users',
        data:{"url":url,"rules":rules},
        dataType:'application/json',
        success:function (data) {
            console.log(data);
        }
    })
})