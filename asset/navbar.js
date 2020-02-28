document.getElementsByClassName('hamburgerContainer')[0].addEventListener('click', function(e) {
    for (var i = document.getElementsByClassName('navbar')[0].clientWidth; i > 0; i--) {
        navBarReduce(i)
    }

    function navBarReduce(i) {
        setTimeout(function() {
            var px = JSON.stringify(i) + 'px'
            document.querySelector('.navbar').style.setProperty("width", px)
        }, 1 * i)
    }
})