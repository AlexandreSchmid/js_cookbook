// Close modal box when click &times
document.querySelector('.close').addEventListener('click', function() {
        document.querySelector('.modal').style.display = 'none'
        document.querySelector('.modal-content').style.display = 'none'
    })
    // Open and setting the modal box at screen
function openModal(itemArray, typeData, cook) {
    document.querySelector('.modal').style.display = 'block'
    document.querySelector('.modal-content').style.display = 'block'
    document.querySelector('.modal-content .content').innerHTML = ''
        // Functions to display the data
    if (typeData === 'all') {
        allRecipes(itemArray)
    } else if (typeData === 'byIngredient' || typeData === 'byTag') {
        filter(itemArray, typeData)
    }
}
// Lists all the recipes that are available
function allRecipes(itemArray) {
    // table and table elements for organize the modal box
    let elements = ['table', 'tbody']
    let eltTab = elements.map(el => document.createElement(el))
    eltTab[0].setAttribute('class', 'recipeLinks')
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
// Lists recipes by ingredient or by tag
// Create buttons on the left and show the recipes on the right
function filter(itemArray, typeData) {
    let content = document.querySelector('.modal-content .content')
        // div that contain all buttons
    let divAllButtons = ['div', 'div', 'p']
    let divAllButtonsAttributes = ['verticalTab', 'tabRecipes', 'title']
    let elts = divAllButtons.map(x => document.createElement(x))
    for (i in divAllButtonsAttributes) {
        elts[i].setAttribute('class', divAllButtonsAttributes[i])
    }
    elts[1].append(elts[2].innerHTML = `Filter recipes by ${typeData}`)
    content.append(elts[0])
    content.append(elts[1])
    for (let i in itemArray) {
        // normalized for the tabs and the id of each recipe displayed
        // Remove spaces and special characters for selector
        let normalized = i.replace(/\s/g, '_').replace(/[{(-/)}]/g, '').toLowerCase()
        let button = document.createElement('button')
        button.setAttribute('class', 'tabLink')
        button.setAttribute('id', i)
        button.setAttribute('onclick', `displayRecipes(event, '${normalized}')`)
        button.innerHTML = i
        elts[0].append(button)
            // one div per category of recipe (ingredient or tag)
        let itemRecipe = document.createElement('div')
        itemRecipe.setAttribute('class', 'tabContent')
        itemRecipe.id = normalized
            // create one link per recipe
        let table = itemArray[i].split(',')
        table.splice(0, 1) //Removes undefined values
        table.forEach(el => {
            let p = document.createElement('p')
            let a = document.createElement('a')
            a.href = '#'
            a.name = "recipeList"
            a.id = el
            a.innerHTML = el
            p.append(a)
            itemRecipe.append(p)
        })
        elts[1].append(itemRecipe)
    }
}
// Creates the view for one recipe
function recipeAll(res, cook) {
    for (let i = 0; i < res.recipe.length; i++) {
        document.getElementsByName('recipe')[i].addEventListener('click', function(e) {
            if (e.currentTarget.id === res.recipe[i].name) {
                cookbook.createView(res.recipe[i])
            }
            // Close the modal box after
            document.querySelector('.close').click()
        })
    }
}
// Search by tag or by ingredient, detect the click and creates the view for one recipe
function recipeByTag(res) {
    let items = document.querySelectorAll('.tabRecipes .tabContent p a')
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function() {
            res.recipe.forEach(el => {
                if (el.name === items[i].id) {
                    cookbook.createView(el)
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