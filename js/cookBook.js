// Autocomplete input field
function autocomplete(listRecipe) {
    document.querySelector('#sB').value = ''
    listRecipe.forEach(el => {
        let opt = document.createElement('option')
        opt.value = el
        document.getElementById('recipeList').appendChild(opt)
    })
}
// Create the recipe page
function createView(res) {
    if (document.querySelector('body .slideShow')) {
        document.querySelector('body .slideShow').remove()
        document.querySelector('.container').style.display = 'block'
    }
    document.querySelector('.recipeTitle').innerHTML = res.name
    document.getElementById('description').innerHTML = res.description
    document.querySelector('ul').innerHTML = ''
        // Each ingredient don't need a preparation or unit (sometimes)
    let unitAmount = function(it1, it2, it3) {
            let sentence = ''
            if (it1) { sentence += it1 + ' ' }
            if (it2) { sentence += it2 + ' ' }
            if (it3) { sentence += it3 + ' ' }
            return sentence
        }
        // Ingredients / ingredient group for preparations included into the recipe
    if (res.ingredient) {
        res.ingredient.forEach(el => {
            let li = document.createElement('li')
            li.innerHTML = unitAmount(el.amount, el.unit, el.preparation) + el.name
            document.querySelector('section .ingredients').appendChild(li)
        })
    }
    if (res.ingredientGroup) {
        // Double loop for getting all of the ingredients, for each part of the recipe
        res.ingredientGroup.forEach(el => {
            let li = document.createElement('li')
            li.innerHTML = '<b>' + el.name + '</b>' // Bold for parts (like topping)
            document.querySelector('section .ingredients').appendChild(li)
            el.ingredient.forEach(el => {
                let liSmall = document.createElement('li')
                liSmall.innerHTML = unitAmount(el.amount, el.unit, el.preparation) + el.name
                document.querySelector('section .ingredients').appendChild(liSmall)
            })
        })
    }
    // Instructions of recipe
    document.querySelector('section p').innerHTML = ''
    res.step.forEach(el => {
            let hr = document.createElement('hr')
            document.querySelector('section p').append(hr)
            document.querySelector('section p').append(el.description)
        })
        // Tags for each recipe
    if (res.tag) {
        document.querySelector('.note').innerHTML = ''
        res.tag.forEach(el => {
            let a = document.createElement('a')
            let aText = document.createTextNode('#' + el + ' ')
            a.href = '#' + el
            a.appendChild(aText)
            document.querySelector('.picture .note').append(a)
        })
    }
    document.getElementById('img').style.display = 'inline'
    document.getElementById('img').setAttribute('src', res.image) // Image of dish
    document.getElementById('img').style.border = '2px solid white'
}

function submitRecipe(res) {
    // By submitting a search, creating the view for one recipe
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault()
        if (document.querySelector('#sB').value) {
            let i = 0
            res.recipe.forEach(el => {
                if (el.name === document.querySelector('#sB').value) {
                    createView(res.recipe[i])
                }
                i++
            })
        }
        document.querySelector('#sB').value = ''
    })
}

function bottonMenu(listTag, listIngredients, listRecipe, res) {
    // Bottom menu, by clicking, open modalboxes (in a separate file)
    for (let i = 0; i < document.getElementsByName('bottomMenu').length; i++) {
        document.getElementsByName('bottomMenu')[i].addEventListener('click', function(e) {
            let tag = e.target.href
            if (tag.includes('#all')) {
                openModal(listRecipe, 'all', res) // call for the modal box
                recipeAll(res)
            } else if (tag.includes('#byIngredient')) {
                openModal(listIngredients, 'ingredient', res)
                recipeByTag(res)
            } else if (tag.includes('#byTag')) {
                openModal(listTag, 'tag', res)
                recipeByTag(res)
            }
        })
    }
}

// Connect to the JSON file and parse it
getRecipe('https://raw.githubusercontent.com/LeaVerou/forkgasm/master/recipes.json', function(response) {
    // Initialize arrays for filters by tag and by ingredient
    const res = JSON.parse(response)
    const listIngredients = {}
    const listTag = {}
    const listRecipe = []

    res.recipe.forEach(el => {
            listRecipe.push(el.name)
            if (el.ingredient) {
                el.ingredient.forEach(el2 => {
                    listIngredients[el2.name] += ',' + el.name
                })
            }
            if (el.ingredientGroup) {
                el.ingredientGroup.forEach(el3 => {
                    el3.ingredient.forEach(elt => {
                        listIngredients[elt.name] += ',' + el.name
                    })
                })
            }
            if (el.tag) {
                el.tag.forEach(el4 => {
                    listTag[el4.replace(' ', '_')] += ',' + el.name
                })
            }
        })
        // At loading of the main page, make sure no recipe is displayed
    if (document.getElementById('img').getAttribute('src').length == 0) {
        // Hide all the other elements for the slideshow, then starts the slideshow
        document.querySelector('.container').style.display = 'none'
        carousel(res)
    }
    autocomplete(listRecipe)
    submitRecipe(res)
    bottonMenu(listTag, listIngredients, listRecipe, res)
})