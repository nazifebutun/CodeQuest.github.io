$(document).ready(function() {

    $('#submit').click(function(e) {
        e.preventDefault(); // Form submission'ını önle

        var name = $('#name').val();
        var surname = $('#surname').val(); // contact-us.html 
        var email = $('#email').val();
        var text = $('#message').val(); // contact-us.html 
        var event = $('#event').val(); // reservation.html 
        var date = $('#date').val(); // reservation.html 
        var product = $('#product').val(); // feedback.html 
        var comment = $('#comment').val(); // feedback.html 

        // check email regex
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (name.trim() === '') {
            $('#message1').text('Enter a name');
            $('#message1').css('color', 'red');
        } else {
            $('#message1').text(''); 
        }

        if ($('#surname').length > 0 && surname.trim() === '') { 
            $('#message2').text('Enter a surname');
            $('#message2').css('color', 'red');
        } else {
            $('#message2').text(''); 
        }

        if (!email.match(emailRegex)) {
            $('#message3').text('Enter a valid email address.');
            $('#message3').css('color', 'red');
        } else {
            $('#message3').text(''); 
        }

        if ($('#event').length > 0 && event.trim() === '') { 
            $('#message4').text('Enter the event name');
            $('#message4').css('color', 'red');
        } else {
            $('#message4').text(''); 
        }

        if ($('#date').length > 0 && date.trim() === '') { // check date for reservation.html 
            $('#message5').text('Choose a date');
            $('#message5').css('color', 'red');
        } else {
            $('#message5').text(''); 
        }

        if ($('#product').length > 0 && product.trim() === '') { 
            $('#message6').text('Enter the product name');
            $('#message6').css('color', 'red');
        } else {
            $('#message6').text(''); 
        }

        if ($('#comment').length > 0 && comment.trim() === '') { 
            $('#message7').text('Enter your comment');
            $('#message7').css('color', 'red');
        } else {
            $('#message7').text(''); 
        }

        if (text.trim() === '') {
            $('#message8').text('Enter a message');
            $('#message8').css('color', 'red');
        } else {
            $('#message8').text(''); 
        }
    });
    
    $('#slider').on('input', function() {
        var value = $(this).val();
        $('#slider-value').text(value);
        updateBar(value);
    });
  
    function updateBar(value) {
        var color = getColor(value);
        $('#slider').css('background', 'linear-gradient(to right, ' + color + ' ' + value + '%, #d3d3d3 ' + value + '%)');
    }
  
    function getColor(value) {
        if (value < 25) {
            return '#ff0000'; 
        } else if (value < 50) {
            return '#ff7f15'; 
        } else if (value < 75) {
            return '#fff029';
        } else {
            return '#09bb09'; 
        }
    }
});
