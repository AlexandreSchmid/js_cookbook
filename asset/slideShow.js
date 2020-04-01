function carousel(res, cook) {
    // Setting slideShow
    let carousel = document.querySelector('.slideShow')
    carousel.style.display = 'inline-flex'
        // Create elements for display images and recipe's names
    for (let i = 0; i < 4; i++) {
        // Random recipe's image link 
        let j = Math.round(res.recipe.length * Math.random())
        let elts = ['div', 'img', 'a']
        let elt = elts.map(x => document.createElement(x))
        let sizeX = '350px',
            sizeY = '350px'
        elt[0].setAttribute('class', 'slide')
        elt[1].setAttribute('src', res.recipe[j].image)
        elt[1].style.width = sizeX
        elt[1].style.height = sizeY
        elt[1].style.borderRadius = "30px"
        elt[1].style.margin = "20px"
        elt[1].name = 'recipeImg'
        elt[1].id = j
        elt[2].appendChild(elt[1])
        elt[2].href = '#'
        elt[0].appendChild(elt[2])
        carousel.appendChild(elt[0])
    }
    // Click listener when click on an image
    let img = document.getElementsByName('recipeImg')
    img.forEach(el => {
            el.addEventListener('click', function() {
                cook.createView(res.recipe[el.id])
            })
        })
        // Mouseover / mouseout recipe's name 
    img.forEach(el => {
        el.addEventListener('mouseover', function(e) {
            let span = document.createElement('span')
            span.innerHTML = res.recipe[el.id].name
            el.parentNode.appendChild(span)
        })
        el.addEventListener('mouseout', function(e) {
            document.querySelector('.slideShow .slide span').remove()
        })
    })
}