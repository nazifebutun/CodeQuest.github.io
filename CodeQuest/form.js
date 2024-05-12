$('#submit').ready(function() {
    $('#submit').click(function() {
        var name = $('#name').val();
        var surname = $('#surname').val();
        var email = $('#email').val();
        var text = $('#message').val();
        // We check using a simple email verification regex
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (name.trim() === '') {
            $('#message1').text('Enter a name');
            $('#message1').css('color', 'red');

        }if (surname.trim() === '') {
            $('#message2').text('Enter a surname');
            $('#message2').css('color', 'red');

        } if (!email.match(emailRegex)) {
            $('#message3').text('Enter a valid email address.');
            $('#message3').css('color', 'red');

        } if (text.trim()=== '') {
            $('#message4').text('Enter a massage');
            $('#message4').css('color', 'red');
        } 
    });
});

