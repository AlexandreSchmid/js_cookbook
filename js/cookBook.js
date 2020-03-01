function listRecipe(item) {
    let listRecipe = []
    item.recipe.forEach(el => {
        listRecipe.push(el.name)
    })
    return listRecipe
}

function autocomplete(item) {
    let opt = document.createElement('option')
    listRecipe(item).forEach(el => {
        opt.value = el
        document.getElementById("recipeList").appendChild(opt)
    })
}

function createView(item) {
    document.querySelector(".recipeTitle").innerHTML = item.name
    document.getElementById("small").innerHTML = item.description
    document.querySelector('ul').innerHTML = ''
    let unitAmount = function(it1, it2, it3) {
        let sentence = ''
        if (it1) { sentence += it1 + ' ' }
        if (it2) { sentence += it2 + ' ' }
        if (it3) { sentence += it3 + ' ' }
        return sentence
    }
    item.ingredient.forEach(el => {
        let li = document.createElement('li')
        li.innerHTML = unitAmount(el.amount, el.unit, el.preparation) + el.name
        document.querySelector("section .ingredients").appendChild(li)
    })
    if (item.ingredientGroup) {
        item.ingredientGroup.forEach(el => {
            let li = document.createElement('li')
            li.innerHTML = '<b>' + el.name + '</b>'
            document.querySelector("section .ingredients").appendChild(li)
            el.ingredient.forEach(el => {
                let liSmall = document.createElement('li')
                liSmall.innerHTML = unitAmount(el.amount, el.unit, el.preparation) + el.name
                document.querySelector("section .ingredients").appendChild(liSmall)
            })
        })
    }
    document.querySelector("section p").innerHTML = ''
    item.step.forEach(el => {
        let hr = document.createElement("hr")
        document.querySelector("section p").append(hr)
        document.querySelector("section p").append(el.description)
    })
    if (item.tag) {
        document.querySelector('.note').innerHTML = ''
        item.tag.forEach(el => {
            let a = document.createElement('a')
            let aText = document.createTextNode(el + ' ')
            a.href = el
            a.appendChild(aText)
            document.querySelector('.note').append(a)
        })
    }
    document.getElementById('img').setAttribute('src', item.image)
}

function openModal(itemArray, typeInput) {
    itemArray.forEach(el => {
        let input = document.createElement('input')
        input.type = typeInput
        input.setAttribute('name', 'recipe')
        let label = document.createElement('label')
        label.setAttribute('for', 'recipe')
        label.innerHTML = el
        document.querySelector('.modal-content .content').append(label)
        document.querySelector('.modal-content .content').append(input)
        document.querySelector('.modal-content .content').append(document.createElement('br'))
    })
}

getRecipe('https://raw.githubusercontent.com/LeaVerou/forkgasm/master/recipes.json', function(response) {
    // Getting JSON data and parsing, create arrays
    const res = JSON.parse(response)
    autocomplete(res)

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
    })

    for (let i = 0; i < document.getElementsByName("bottomMenu").length; i++) {
        document.getElementsByName("bottomMenu")[i].addEventListener("click", function(e) {
            let tag = e.target.href
            document.querySelector('.modal').style.display = "block"
            document.querySelector('.modal-content').style.display = "block"

            if (tag.includes("#all")) {
                openModal(listRecipe(res), "radio")
            } else if (tag.includes("#byNutri")) {} else if (tag.includes("#byIngredient")) {
                openModal(listIngredient, "checkbox")
            } else if (tag.includes("#byTag")) { openModal(listTag, "") }
        })
    }
})