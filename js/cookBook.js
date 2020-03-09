// Full list of recipes
function listRecipe(res) {
    let listRecipe = []
    res.recipe.forEach(el => {
        listRecipe.push(el.name)
    })
    return listRecipe
}
// Autocomplete input field
function autocomplete(res) {
    document.querySelector('#sB').value = ''
    let item = listRecipe(res)
    item.forEach(el => {
        let opt = document.createElement('option')
        opt.value = el
        document.getElementById('recipeList').appendChild(opt)
    })
}
// Create the recipe page
function createView(res) {
    document.querySelector('.recipeTitle').innerHTML = res.name
    document.getElementById('small').innerHTML = res.description
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
        res.ingredientGroup.forEach(el => {
            let li = document.createElement('li')
            li.innerHTML = '<b>' + el.name + '</b>'
            document.querySelector('section .ingredients').appendChild(li)
            el.ingredient.forEach(el => {
                let liSmall = document.createElement('li')
                liSmall.innerHTML = unitAmount(el.amount, el.unit, el.preparation) + el.name
                document.querySelector('section .ingredients').appendChild(liSmall)
            })
        })
    }
    // Instructions
    document.querySelector('section p').innerHTML = ''
    res.step.forEach(el => {
            let hr = document.createElement('hr')
            document.querySelector('section p').append(hr)
            document.querySelector('section p').append(el.description)
        })
        // Tags
    if (res.tag) {
        document.querySelector('.note').innerHTML = ''
        res.tag.forEach(el => {
            let a = document.createElement('p')
            let aText = document.createTextNode(el + ' ')
            a.href = el
            a.appendChild(aText)
            document.querySelector('.note').append(a)
        })
    }
    document.getElementById('img').setAttribute('src', res.image) // Image of dish
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

function bottonMenu(res) {
    // Bottom menu, by clicking, open modalbox (in a separate file)
    for (let i = 0; i < document.getElementsByName('bottomMenu').length; i++) {
        document.getElementsByName('bottomMenu')[i].addEventListener('click', function(e) {
            let tag = e.target.href
            if (tag.includes('#all')) {
                openModal(listRecipe(res), 'all', res)
                recipeAll(res)
            } else if (tag.includes('#byIngredient')) {
                let listIngredients = {}
                res.recipe.forEach(el => {
                    if (el.ingredient) {
                        el.ingredient.forEach(el2 => {
                            listIngredients[el2.name] += el.name + ', '
                        })
                    }
                    if (el.ingredientGroup) {
                        el.ingredientGroup.forEach(el3 => {
                            listIngredients[el3.name] += el.name + ', '
                        })
                    }
                })
            } else if (tag.includes('#byTag')) {
                let listTag = {}
                res.recipe.forEach(el => {
                    el.tag.forEach(el2 => {
                        if (el2) {
                            listTag[el2.replace(' ', '_')] += ',' + el.name
                        }
                    })
                })
                openModal(listTag, 'byTag', res)
                recipeByTag(res)
            }
        })
    }
}

// Connect to the JSON file and parse it
getRecipe('https://raw.githubusercontent.com/LeaVerou/forkgasm/master/recipes.json', function(response) {
    const res = JSON.parse(response)
    autocomplete(res)
    submitRecipe(res)
    bottonMenu(res)
})