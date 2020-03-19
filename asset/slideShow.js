function carousel(res) {
    let images = {}
    let carousel = document.querySelector('.slideShow')
        // Array of images url and recipe associate
    let j = 0
    res.recipe.forEach(el => {
        if (el.image.length !== 0 && j <= 3) {
            images[el.name] = el.image
            j++
        }
    });
    console.log(images)
    carousel.style.display = 'inline-flex'
        // Create elements for display images and recipe's names
    for (let i = 0; i < 4; i++) {
        let elts = ['div', 'img', 'a']
        let elt = elts.map(x => document.createElement(x))
        let sizeX = '350px',
            sizeY = '350px'
        elt[0].setAttribute('class', 'slide')
        elt[1].setAttribute('src', images[i.name])
        elt[1].style.width = sizeX
        elt[1].style.height = sizeY
        elt[1].style.borderRadius = "30px"
        elt[1].style.margin = "20px"
        elt[1].setAttribute('alt', images[i.image])
        elt[2].appendChild(elt[1])
        elt[2].href = '#'
        elt[0].appendChild(elt[2])
        carousel.appendChild(elt[0])
    }
}