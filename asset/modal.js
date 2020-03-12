// Close modal box when click &times
document.querySelector('.close').addEventListener('click', function() {
        document.querySelector('.modal').style.display = 'none'
        document.querySelector('.modal-content').style.display = 'none'
    })
    // Open and setting the modal box at screen
function openModal(itemArray, typeData) {
    document.querySelector('.modal').style.display = 'block'
    document.querySelector('.modal-content').style.display = 'block'
    document.querySelector('.modal-content .content').innerHTML = ''
        // Functions to display the data
    if (typeData === 'all') {
        allRecipes(itemArray)
    } else if (typeData === 'byIngredient' || typeData === 'byTag') {
        filter(itemArray)
    }
}
// Display all the recipes available
function allRecipes(itemArray) {
    let elements = ['table', 'tbody', 'button']
    let eltTab = elements.map(el => document.createElement(el))
    eltTab[2].innerHTML = 'View recipe'
    eltTab[0].appendChild(eltTab[1])
    document.querySelector('.modal-content .content').append(eltTab[0])
    document.querySelector('.modal-content .content').append(eltTab[2])
    itemArray.forEach(el => {
        let elements = ['input', 'label', 'tr', 'td', 'td']
        let elt = elements.map(el => document.createElement(el))
        elt[0].type = 'radio'
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

function filter(itemArray) {

    let divButtons = document.createElement('div')
    divButtons.setAttribute('class', 'verticalTab')

    let divRecipes = document.createElement('div')
    divRecipes.setAttribute('class', 'tabRecipes')
    let p = document.createElement('p')
    p.setAttribute('class', 'title')
    divRecipes.append(p.innerHTML = 'Search recipes by tag')

    document.querySelector('.modal-content .content').append(divButtons)
    document.querySelector('.modal-content .content').append(divRecipes)
    for (let i in itemArray) {
        // normalized for the tabs and the id of each recipe displayed
        let normalized = i.replace(/\s/g, '_').replace(/[{(-/)}]/g, '').toLowerCase()
        let button = document.createElement('button')
        button.setAttribute('class', 'tabLink')
        button.setAttribute('id', i)
        button.setAttribute('onclick', `displayRecipes(event, "${normalized}")`)
        button.innerHTML = i
        divButtons.append(button)

        let itemRecipe = document.createElement('div')
        itemRecipe.setAttribute('class', 'tabContent')
        itemRecipe.id = normalized

        let table = itemArray[i].split(',')
        table.forEach(el => {
            let p = document.createElement('p')
            let a = document.createElement('a')
            if (el != 'undefined') {
                a.href = '#'
                a.name = "recipeList"
                a.id = el
                a.innerHTML = el
                p.append(a)
            }
            itemRecipe.append(p)
        })
        divRecipes.append(itemRecipe)
    }
}


function recipeAll(res) {
    document.querySelector('button').addEventListener('click', function() {
        let recipeCheck = document.getElementsByName('recipe')
        for (let i = 0; i < res.recipe.length; i++) {
            if (recipeCheck[i].checked) {
                createView(res.recipe[i])
            }
        }
        document.querySelector('.close').click()
    })
}

function recipeByTag(res) {
    let items = document.querySelectorAll('.tabRecipes .tabContent p a')
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function() {
            res.recipe.forEach(el => {
                if (el.name === items[i].id) {
                    createView(el)
                }
            })
            document.querySelector('.close').click()
        })
    }
}

function displayRecipes(e, idButton) {
    let tabcontent, tablinks, i
    tabcontent = document.getElementsByClassName('tabContent')
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none"
    }

    tablinks = document.getElementsByClassName('tabLink')
    for (i = 0; i < tablinks; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '')
    }
    document.querySelector(`.tabRecipes #${idButton}`).style.display = 'block'
    e.currentTarget.className += ' active'
}