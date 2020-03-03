document.querySelector('.close').addEventListener('click', function() {
    document.querySelector('.modal').style.display = 'none'
    document.querySelector('.modal-content').style.display = 'none'
})

function openModal(itemArray, typeInput, typeData) {
    document.querySelector('.modal').style.display = 'block'
    document.querySelector('.modal-content').style.display = 'block'
    document.querySelector('.modal-content .content').innerHTML = ''

    if (typeData === 'all') {
        let elements = ['table', 'tbody', 'button'],
            eltTab = []
        elements.forEach(el => {
            eltTab.push(document.createElement(el))
        })
        eltTab[2].innerHTML = 'View recipe'
        eltTab[0].appendChild(eltTab[1])
        document.querySelector('.modal-content .content').append(eltTab[0])
        document.querySelector('.modal-content .content').append(eltTab[2])
        itemArray.forEach(el => {
            let elements = ['input', 'label', 'tr', 'td', 'td'],
                elt = []
            elements.forEach(el => {
                elt.push(document.createElement(el))
            })
            elt[0].type = typeInput
            elt[0].setAttribute('name', 'recipe')
            elt[0].setAttribute('id', el)
            elt[1].setAttribute('for', 'recipe')
            elt[1].innerHTML = el
            eltTab[1].appendChild(elt[2]).appendChild(elt[3])
            elt[2].appendChild(elt[4])
            elt[3].append(elt[1])
            elt[4].append(elt[0])
        })
    }
    if (typeData === 'byTag') {
        console.log(itemArray)
    }
}

function openRecipes(res) {
    document.querySelector('button').addEventListener('click', function(e) {
        let recipeCheck = document.getElementsByName('recipe')
        for (let i = 0; i < res.recipe.length; i++) {
            if (recipeCheck[i].checked) {
                createView(res.recipe[i])
            }
        }
        document.querySelector('.close').click()
    })
}