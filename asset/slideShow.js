function carousel(res) {
    let carousel = document.querySelector('.slideShow')
    carousel.style.display = 'inline-flex'
        // Create elements for display images and recipe's names
    for (let i = 0; i < 5; i++) {
        let elts = ['div', 'img', 'a']
        let elt = elts.map(x => document.createElement(x))
        let sizeX = '350px',
            sizeY = '350px'
        elt[0].setAttribute('class', 'slide')
        elt[1].setAttribute('src', res.recipe[i].image)
        elt[1].style.width = sizeX
        elt[1].style.height = sizeY
        elt[1].style.borderRadius = "30px"
        elt[1].style.margin = "20px"
        elt[1].name = 'recipeImg'
        elt[1].id = res.recipe[i].name
        elt[2].appendChild(elt[1])
        elt[2].href = '#'
        elt[0].appendChild(elt[2])
        carousel.appendChild(elt[0])
    }

    let img = document.getElementsByName('recipeImg')
    for (let i = 0; i < img.length; i++) {
        img[i].addEventListener('click', function(e) {
            if (e.target.id === res.recipe[i].name) {
                document.querySelector('body .slideShow').remove()
                document.querySelector('.container').style.display = 'block'
                createView(res.recipe[i])
            }
        })
    }
    img.forEach(el => {
        el.addEventListener('mouseover', function(e) {
            let span = document.createElement('span')
            span.innerHTML = el.id
            el.parentNode.appendChild(span)
        })
        el.addEventListener('mouseout', function(e) {
            document.querySelector('.slideShow .slide span').remove()
        })
    })
}