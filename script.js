const search = document.querySelector(".first-btn");
const insertIteam = document.querySelector(".meal-iteam")
search.addEventListener("click", getvalue)
const title=document.querySelector(".title");

async function getvalue() {
    let userInput = document.querySelector("#input").value.trim();
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${userInput}`)
    let data = await res.json();
    let html = ''
    if (data.meals) {
        data.meals.forEach(item => {
            html += ` 
             <div class="meal-box" meal-id=${item.idMeal}>
                <img src="${item.strMealThumb}" alt="imag">
                <div class="title-food">
                    ${item.strMeal}
        </div>
        <div class="repbtn">
        <a href="#" class="recipe-btn">Get Recipe</a>
        </div>    
        </div>
        </div>`
        });
        insertIteam.classList.remove("not-found")
        title.classList.add("title-show")
    } else {
        html += " <div>Sorry we could'nt find your meal </div>"
        insertIteam.classList.add("not-found")
        title.classList.add("title-show")
    }
    insertIteam.innerHTML = html
}

const recipeBtn = document.querySelector(".meal-iteam")
recipeBtn.addEventListener("click", getData)
const container = document.querySelector(".container")
const mealDetail = document.querySelector(".mealDetail")
const closeBtn = document.querySelector(".close-btn")
closeBtn.addEventListener("click", () => {
    closeBtn.parentElement.classList.remove("showRecipe")
})
function getData(e) {
    e.preventDefault();
    if (e.target.classList.contains("recipe-btn")) {
        let meal = e.target.parentElement.parentElement;
        console.log(meal)
        let mealId = meal.getAttribute("meal-id");
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then(res => res.json())
            .then((data) => {
                return moblizedata(data)
            })
    }
}
function moblizedata(meal) {
    console.log(meal)
    let data = meal.meals[0];
    let html = ""
    html += ` 
     <h2>${data.strMeal} </h2>
     <p>${data.strCategory}</p>
    <div class="instruction">
    <h3>Instructions:</h3>
       <p>${data.strInstructions}</p>
    </div>
    <div class="img">
        <img src=${data.strMealThumb} alt="#">
    </div>
    <div class="link">
        <a href="${data.strYoutube}" target="_blank">Watch video</a>
    </div>
   </div>`
   container.innerHTML = html;
    mealDetail.classList.add("showRecipe")

}