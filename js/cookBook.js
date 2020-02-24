getRecipe('https://raw.githubusercontent.com/LeaVerou/forkgasm/master/recipes.json', function(response) {
    // Getting JSON data and parsing, create arrays
    var res = JSON.parse(response)
    createView(res)
})

function createView(res) {
    var cookInfosArray = {}
    var ingredients = []
    var tags = []
    var instructions = []
    var recipe = []
    recipe.push(cookInfosArray, ingredients, tags, instructions)
    var cookInfos = ['name', 'id', 'image', 'notes']

    cookInfos.forEach(el => {
        cookInfosArray[el] = res.recipe[0][el]
    })

    res.recipe[0].ingredient.forEach(element => {
        ingredients.push(element)
    })

    res.recipe[0].step.forEach(element => {
        instructions.push(element)
    })

    res.recipe[0].tag.forEach(el => {
        tags.push(el)
    })
    document.querySelector("section h1").innerHTML = recipe[0].name

    recipe[1].forEach(el => {
        var li = document.createElement('li')
        var sentence = ''
        if (el.amount != '') {
            sentence += el.amount + ' '
        }
        if (el.unit != '') {
            sentence += el.unit
        }
        li.innerHTML = el.name + ' ' + sentence
        document.querySelector("section .ingredients").appendChild(li)
    })
    recipe[3].forEach(el => {
        document.querySelector("section p").innerHTML += el.description
    })
    document.getElementById('img').setAttribute('src', recipe[0].image)
}