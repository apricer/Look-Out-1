// opens login modal on page load and prevents unwanted closure
$(function () {
    $('#logInModal').modal({
        show: 'true',
        backdrop: 'static', // prevents closing by clicking out of modal
    });
});
