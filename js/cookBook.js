var cookbook = {
    carousel(res) {
        // At loading of the main page, make sure no recipe is displayed
        if (document.getElementById('img').getAttribute('src').length == 0) {
            // Hide all the other elements for the slideshow, then starts the slideshow
            document.querySelector('.container').style.display = 'none'
                // Setting slideShow
            let carousel = document.querySelector('.slideShow')
            carousel.style.display = 'inline-flex'
                // Create elements for display images and recipe's names
            for (let i = 0; i < 4; i++) {
                // Random recipe's image link 
                let j = Math.round(res.recipe.length * Math.random())
                let elts = ['div', 'img', 'a']
                let elt = elts.map(x => document.createElement(x))
                elt[0].setAttribute('class', 'slide')
                elt[1].setAttribute('src', res.recipe[j].image)
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
                        cookbook.createView(res.recipe[el.id])
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
    },
    // Autocomplete input field
    autocomplete(listRecipe) {
        document.querySelector('#sB').value = ''
        listRecipe.forEach(el => {
            let opt = document.createElement('option')
            opt.value = el
            document.getElementById('recipeList').appendChild(opt)
        })
    },
    // Create the recipe page
    createView(res) {
        // Removes the last content 
        let lastContent = ['ul', 'section p', '.note']
        lastContent.map(x => document.querySelector(x).innerHTML = '')

        // Removes the slideshow and set the container for recipes
        if (document.querySelector('body .slideShow')) {
            document.querySelector('body .slideShow').remove()
            document.querySelector('.container').style.display = 'block'
        }
        document.querySelector('.recipeTitle').innerHTML = res.name // name of the recipe
        document.getElementById('description').innerHTML = res.description // desciption of the recipe

        //*     INGREDIENTS TABLE       */
        // Each ingredient don't need a preparation or unit (sometimes)
        let unitAmount = function(it1, it2, it3) {
            let sentence = ''
            if (it1) sentence += it1 + ' '
            if (it2) sentence += it2 + ' '
            if (it3) sentence += it3 + ' '
            return sentence
        }
        let fillTable = function(el) { // Fill the ingredients's table
                let tr = document.createElement('tr')
                let td = document.createElement('td')
                tr.appendChild(td)
                td.innerHTML = unitAmount(el.amount, el.unit, el.preparation) + el.name
                document.querySelector('section .ingredients table tbody').appendChild(tr)
            }
            // Ingredients list table
        let table = ['table', 'tbody'] //create table and tbody
        let t = table.map(x => document.createElement(x))
        if (res.ingredient) {
            t[0].appendChild(t[1])
            document.querySelector('section .ingredients').appendChild(t[0])
            res.ingredient.forEach(el => {
                fillTable(el)
            })
        }
        if (res.ingredientGroup) {
            // Double loop for getting all of the ingredients, for each part of the recipe
            res.ingredientGroup.forEach(el => {
                let th = document.createElement('th')
                th.innerHTML = '<b>' + el.name + '</b>' // Bold for parts name
                th.setAttribute('colspan', el.ingredient.length)
                document.querySelector('section .ingredients table tbody').appendChild(th)
                el.ingredient.forEach(el => {
                    fillTable(el)
                })
            })
        }
        // Instructions of the recipes
        res.step.forEach(el => {
                let hr = document.createElement('hr')
                document.querySelector('section p').append(hr)
                document.querySelector('section p').append(el.description)
            })
            // Tags for each recipe
        if (res.tag) {
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
    },
    submitRecipe(res) {
        // By submitting a search, creating the view for one recipe
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault()
            if (document.querySelector('#sB').value) {
                let i = 0
                res.recipe.forEach(el => {
                    if (el.name === document.querySelector('#sB').value) {
                        cookbook.createView(res.recipe[i])
                    }
                    i++
                })
            }
            document.querySelector('#sB').value = ''
        })
    },
    bottonMenu(listTag, listIngredients, listRecipe, res) {
        // Bottom menu, by clicking, open modalboxes (in a separate file)
        for (let i = 0; i < document.getElementsByName('bottomMenu').length; i++) {
            document.getElementsByName('bottomMenu')[i].addEventListener('click', function(e) {
                let tag = e.target.parentNode.parentNode.parentNode.className
                let params = {
                    'all': listRecipe,
                    'byIngredient': listIngredients,
                    'byTag': listTag
                }
                openModal(params[tag], tag)
                if (params[tag] === listRecipe) recipeAll(res)
                recipeByTag(res)
            })
        }
    }
}

// Connection to the JSON file and parse it
getRecipe('https://raw.githubusercontent.com/LeaVerou/forkgasm/master/recipes.json', function(response) {
    // Initialize arrays for filters by tag or by ingredient and the autocomplete
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
    cookbook.carousel(res)
    cookbook.autocomplete(listRecipe)
    cookbook.submitRecipe(res)
    cookbook.bottonMenu(listTag, listIngredients, listRecipe, res)
})