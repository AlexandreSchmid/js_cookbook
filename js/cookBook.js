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

function openModal(itemArray, typeInput) {}

getRecipe('https://raw.githubusercontent.com/LeaVerou/forkgasm/master/recipes.json', function(response) {
    // Getting JSON data and parsing, create arrays
    const res = JSON.parse(response)
    const listRecipe = []
    document.querySelector('#sB').addEventListener("input", function(e) {
        res.recipe.forEach(el => {
            listRecipe.push(el.name)
        })
        let opt = document.createElement('option')
        listRecipe.forEach(el => {
            if (el.includes(e.target.value) === true) {
                opt.value = el
                document.getElementById("recipeList").appendChild(opt)
            } else {
                document.getElementById("recipeList").removeChild(opt)
            }
        })
    })
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

    for (var i = 0; i < document.getElementsByName("bottomMenu").length; i++) {
        document.getElementsByName("bottomMenu")[i].addEventListener("click", function(e) {
            let tag = e.target.href
            switch (tag) {
                case "#all":
                    openModal(listRecipe, "checkbox")
                case "#byNutri":
                    break
                case "#byIngredient":
                    openModal(listIngredient, "checkbox")
                case "#byTag":
                    openModal(listTag, "")
            }
        })
    }
})