$(function(){
    var myArray;
    var inputLength;
    var reading=false;
    var counter;
    var action;
    var frequency=200;
    var progress;

    $('#new').hide()
    $('#pause').hide()
    $('#resume').hide()
    $('.slider').hide()
    $('#error').hide()
    $('#result').hide()

    // Click on start reading
    $('#start').click(function(){
        myArray=$('#userinput').val().split(/\s+/)
        inputLength=myArray.length
        if(inputLength>1){
            reading=true
            //start reading
            $('#start').hide()
            $('#error').hide()
            $('#userinput').hide()
            $('#result').show()
            $('#pause').show()
            $('#new').show()
            $('.slider').show()

            //set slider max value
            $('#progressslider').attr("max",inputLength-1)
            //display first word in result
            counter=0
            $('#result').text(myArray[counter])
            //start reading
            action=setInterval(read,frequency)

        }else{
            $('#error').show()
        }
    });

    //Click on New
    $('#new').click(function(){
        location.reload()
    })

    //Click on Pause
    $('#pause').click(function(){
        clearInterval(action)
        reading=false
        $('#pause').hide()
        $('#resume').show()
        $('#new').show()
    })

    //click on resume
    $('#resume').click(function(){
        action=setInterval(read,frequency)
        reading=true
        $('#resume').hide()
        $('#pause').show()
    })

    //Change Font 
    $('#fontsizeslider').on('slidestop',function(event,ui){
        $('#fontsizeslider').slider('refresh')
        var font=parseInt($('#fontsizeslider').val())
        $('#result').css('fontSize',font)
        $('.fontsize').text(font)
    },)

    //Change speed
    $('#speedslider').on('slidestop',function(event,ui){
        $('#speeddlider').slider('refresh')
        speed=parseInt($('#speedslider').val())
        $('.speed').text(speed)
        clearInterval(action)
        frequency=60000/speed;
        if(reading){
        action=setInterval(read,frequency)
        }
    })

    //Change Progress Slider value
    $('#progressslider').on('slidestop',function(event,ui){
        $('#progressslider').slider('refresh')
        var slider= parseInt($('#progressslider').val())
        counter=slider
        clearInterval(action)
        $('#result').text(counter)
        $('.progress').text(Math.floor(counter/(inputLength-1)*100))
        if(reading){
            action=setInterval(read,frequency)
        }

    })




    function read(){
        if(counter==inputLength-1){
            clearInterval(action)
            $('#pause').hide()
            reading=false
        }
        if(reading==true){
        counter++
        $('#result').text(myArray[counter])
        $('#progressslider').val(counter).slider('refresh')
        progress=(counter/(inputLength-1)*100)
        $('#progress').text(Math.floor(progress))
    }
    }
})

