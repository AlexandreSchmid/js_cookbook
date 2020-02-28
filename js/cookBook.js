function createView(item) {
    document.querySelector("section h1").innerHTML = item.name
    document.getElementById("small").innerHTML = item.description
    document.querySelector('ul').innerHTML = ''
    item.ingredient.forEach(el => {
        var li = document.createElement('li')
        var sentence = ''
        if (el.amount || el.unit) {
            sentence = el.amount + ' ' + el.unit
        }
        li.innerHTML = el.name + ' ' + sentence
        document.querySelector("section .ingredients").appendChild(li)
    })
    document.querySelector("section p").innerHTML = ''
    item.step.forEach(el => {
        document.querySelector("section p").append(el.description)
    })
    if (item.tag) {
        document.querySelector('.note').innerHTML = ''
        item.tag.forEach(el => {
            var a = document.createElement('a')
            var aText = document.createTextNode(el + ' ')
            a.href = el
            a.appendChild(aText)
            document.querySelector('.note').append(a)
        })
    }
    document.getElementById('img').setAttribute('src', item.image)
}

getRecipe('https://raw.githubusercontent.com/LeaVerou/forkgasm/master/recipes.json', function(response) {
    // Getting JSON data and parsing, create arrays
    const res = JSON.parse(response)
    document.querySelector('#sB').addEventListener("input", function(e, res) {
        var listRecipe = []
        res.recipe.forEach(el => {
            listRecipe.push(el.name)
        })
        var opt = document.createElement('option')
        listRecipe.forEach(el => {
            if (el.includes(e.target.value)) {
                opt.value = el
                document.getElementById("recipeList").appendChild(opt)
            } else {
                opt.innerHTML = ''
            }
        })
    })
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault()
        if (document.querySelector('#sB').value) {
            var i = 0
            res.recipe.forEach(el => {
                if (el.name === document.querySelector('#sB').value) {
                    createView(res.recipe[i])
                }
                i++
            })
        }
    })
})