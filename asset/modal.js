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
    } else if (typeData === 'ingredient' || typeData === 'tag') {
        filter(itemArray, typeData)
    }
}
// Lists all the recipes that are available
function allRecipes(itemArray) {
    // table and table elements for organize the modal box
    let elements = ['table', 'tbody']
    let eltTab = elements.map(el => document.createElement(el))
    eltTab[0].appendChild(eltTab[1])
    document.querySelector('.modal-content .content').append(eltTab[0])
    itemArray.forEach(el => { // Initialize the form for all recipes in a table
        let elements = ['a', 'tr', 'td']
        let elt = elements.map(el => document.createElement(el))
        elt[0].setAttribute('name', 'recipe')
        elt[0].setAttribute('id', el)
        elt[0].href = '#'
        elt[0].innerHTML = el
        eltTab[1].append(elt[1])
        elt[1].appendChild(elt[2])
        elt[2].append(elt[0])
    })
}
// Create buttons on the left and show the recipes on the right
function filter(itemArray, typeData) {
    let content = document.querySelector('.modal-content .content')
        // div that contains all buttons
    let divButtons = document.createElement('div')
    divButtons.setAttribute('class', 'verticalTab')
        // div that contains recipes to display
    let divRecipes = document.createElement('div')
    divRecipes.setAttribute('class', 'tabRecipes')
        // Title of modal box
    let p = document.createElement('p')
    p.setAttribute('class', 'title')
    divRecipes.append(p.innerHTML = `Filter recipes by ${typeData}`)
    content.append(divButtons)
    content.append(divRecipes)
    for (let i in itemArray) {
        // normalized for the tabs and the id of each recipe displayed
        // Remove spaces and special characters for selector
        let normalized = i.replace(/\s/g, '_').replace(/[{(-/)}]/g, '').toLowerCase()
        let button = document.createElement('button')
        button.setAttribute('class', 'tabLink')
        button.setAttribute('id', i)
        button.setAttribute('onclick', `displayRecipes(event, '${normalized}')`)
        button.innerHTML = i
        divButtons.append(button)
            // one div per category of recipe (ingredient or tag)
        let itemRecipe = document.createElement('div')
        itemRecipe.setAttribute('class', 'tabContent')
        itemRecipe.id = normalized
            // create one link per recipe
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

// Creates the view for one recipe
function recipeAll(res) {
    for (let i = 0; i < res.recipe.length; i++) {
        document.getElementsByName('recipe')[i].addEventListener('click', function(e) {
            if (e.currentTarget.id === res.recipe[i].name) {
                createView(res.recipe[i])
            }
            // Close the modal box after
            document.querySelector('.close').click()
        })
    }
}

// Search by tag or by ingredient, creates the view for one recipe
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
// Tab system
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