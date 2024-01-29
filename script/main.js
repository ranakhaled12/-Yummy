 $(document).ready(function(){
    $('.bars').on('click', function(){
        play()
    })
  })
  

//****animation in aside links**** */ 
function play(){
  $('.bars').toggleClass("close")
        $('aside ul').toggleClass("t0")
        $('aside').toggleClass("l0")
        $('aside ul li:nth-child(1)').toggle(200,function(){
          $('aside ul li:nth-child(1)').toggleClass('u--slideUp')
          $('aside ul li:nth-child(2)').toggle(150,function(){
            $('aside ul li:nth-child(2)').toggleClass('u--slideUp')
            $('aside ul li:nth-child(3)').toggle(150,function(){
              $('aside ul li:nth-child(3)').toggleClass('u--slideUp')
              $('aside ul li:nth-child(4)').toggle(100,function(){
                $('aside ul li:nth-child(4)').toggleClass('u--slideUp')
                $('aside ul li:nth-child(5)').toggle(100,function(){
                  $('aside ul li:nth-child(5)').toggleClass('u--slideUp')
                })
              })
            })
          })
        })
}

let Search = document.getElementById('Search')
let Categories = document.getElementById('Categories')
let Area = document.getElementById('Area')
let Ingredients = document.getElementById('Ingredients')
let Contact = document.getElementById('Contact')


Search.addEventListener('click', searchWindow);
Categories.addEventListener('click', getApiBycategorie);
Area.addEventListener('click', getApiByArea);
Ingredients.addEventListener('click', getApiByIngredients);
Contact.addEventListener('click', showContactForm);
//********open window to search for meals********** */ 
function searchWindow(){
  play()
  document.querySelector(".row-data").innerHTML = `
   
  <div class="inputs my-4">
    <div class="row">
       <div class="col-md-6">
          <input type="text" class="form-control" id="searchByName" placeholder="Search by name">
        </div>
        <div class="col-md-6">
          <input type="text" class="form-control" id="searchByFirstLetter" maxlength="1" placeholder="Search by first letter">
        </div>
   </div>
  </div>
<div class="row row-searchData">

</div>
  
  `
  let searchByName = document.getElementById("searchByName")
  searchByName.addEventListener('change', function(){
    getAPTByName(searchByName.value)
  })
  let searchByFirstLetter = document.getElementById("searchByFirstLetter")
  searchByFirstLetter.addEventListener('change', function(){
    getAPTByFirstLetter(searchByFirstLetter.value)
  })

}
//********get API using all categories********** */ 
async function getApiBycategorie(){
  let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  let {categories} = await api.json()
  if(categories.status = 200){
    document.querySelector(".loading").classList.add("d-none")
  }
  play()
  showcategoriesData(categories)
}
//********get API using Area*********** */ 
async function getApiByArea(){
  let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  let {meals} = await api.json()
  if(meals.status = 200){
    document.querySelector(".loading").classList.add("d-none")
  }
  let first20Items = meals.slice(0,20);
 play()
  showAriaData(first20Items)
}
//********get API using Ingredients*********** */ 
async function getApiByIngredients(){
  let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  let {meals} = await api.json()
  if(meals.status = 200){
    document.querySelector(".loading").classList.add("d-none")
  }
  let first20Items = meals.slice(0,20);
 play()
 showIngredientsData(first20Items)
}
//********show Ingredients data by using API Ingredients*********** */ 
function showIngredientsData(ingredientsData){
 
  let data = ""
     for (let i = 0; i < ingredientsData.length; i++) {
      let word = ingredientsData[i].strDescription;
      let shortCut = word.split(' ').slice(0, 5).join(' ');
      data += `
      <div class="col-md-3 p-2">
      <article class="text-center p-3" data-name="${ingredientsData[i].strIngredient}">
      <img src="https://www.themealdb.com/images/ingredients/${ingredientsData[i].strIngredient}.png" alt="" class="w-100">
      <h5 class="mx-2 text-light">${ingredientsData[i].strIngredient}</h5>
      <p class="text-light">${shortCut}</p>
      </article>
  </div>
      `
  }
  document.querySelector('.row-data').innerHTML = data
}


//********check for "data-name" attribute to show Ingredients data by using API Category*********** */ 
function getDataingredientsName(e){
  if(e.target.hasAttribute('data-name'))
  {
    let ingredientsName = e.target.getAttribute('data-name')
    getAPTByCategory(ingredientsName)
  }
}

//********get API By using ingredientsName "data-name" *********** */ 
async function getAPTByCategory(categor){
let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${categor}`)
let {meals} = await api.json()
if(meals.status = 200){
  document.querySelector(".loading").classList.add("d-none")
}
if(meals != null){
  showData(meals)
}
}

///********show Aria Data************* */ 

function showAriaData(data){
  let list = ""
  for(let i = 0; i < data.length; i++){
      list += `
      <div class="col-md-3 p-2">
      <article class="text-center bg-primary p-3" data-area="${data[i].strArea}">
      <i class="fa-solid fa-house-flag fs-1 text-light"></i>
      <h3 class="mx-2 text-light">${data[i].strArea}</h3>
        
      </article>
  </div>
      `

  }
  document.querySelector('.row-data').innerHTML = list

}
//********check for "data-area" attribute to show Ingredients data by using API Area*********** */ 
function getDataAreaName(e){
  if(e.target.hasAttribute('data-area'))
  {
    let areayName = e.target.getAttribute('data-area')
    getAPTByAreaName(areayName)
  }
}
//********get API By using ingredientsName "data-area"*********** */ 

async function getAPTByAreaName(areaName){
let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`)
let {meals} = await api.json()
let first20Items = meals.slice(0,20);
showData(first20Items)
}

//*************show categories Data************* */
function showcategoriesData(categories){
  let data = ""
     for (let i = 0; i < categories.length; i++) {
      let word = categories[i].strCategoryDescription;
      let shortCut = word.split(' ').slice(0, 10).join(' ');
      data += `
      <div class="col-md-3 p-2">
      <article class="position-relative rounded-3 overflow-hidden">
          <img src="${categories[i].strCategoryThumb}" alt="" class="w-100">
          <div class="categor position-absolute text-center" data-name-of-Category = ${categories[i].strCategory}>
              <h3 class="mx-2 text-light">${categories[i].strCategory}</h3>
              <p class="text-light">${shortCut}</p>
          </div>
      </article>
  </div>
      `
  }
  document.querySelector('.row-data').innerHTML = data
}
//********check for "data-name-of-Category" attribute to show meals data by using getAPTByCategory func and then API Search*********** */ 
function getDataCategoryName(e){
  e.preventDefault();
  if(e.target.hasAttribute('data-name-of-Category'))
  {
    let dataNameOfCategory = e.target.getAttribute('data-name-of-Category')
    getAPTByCategory(dataNameOfCategory)
  }
}

//*************get API By Name to select it in showSearchData  function ************* */
  async function getAPTByName(name){
      let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let {meals} = await api.json()
    if(meals.status = 200){
      document.querySelector(".loading").classList.add("d-none")
    }
    let first20Items = meals.slice(0,20);
    showSearchData(first20Items)
  }
  //*************get API By FirstLetter to select it in showSearchData  function ************* */
  async function getAPTByFirstLetter(letter){
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let {meals} = await api.json()
    if(meals.status = 200){
      document.querySelector(".loading").classList.add("d-none")
    }
    let first20Items = meals.slice(0,20);
    showSearchData(first20Items)
  }

  //*************get API to select it in showData function to show first************* */
  async function getAPT(){
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let {meals} = await api.json()
    if(meals.status = 200){
      document.querySelector(".loading").classList.add("d-none")
    }
    let first20Items = meals.slice(0,20);
    showData(first20Items) 
  }
  getAPT()




let contentData =  document.querySelector('.row-data')
contentData.addEventListener('click', function(e){
  getDataId(e)
  getDataAreaName(e)
  getDataCategoryName(e)
  getDataingredientsName(e)
})
  //*************show Data************* */
function showData(data){
  let list = ""
  for(let i = 0; i < data.length; i++){
      list += `
      <div class="col-md-3 p-2">
      <article class="position-relative rounded-3 overflow-hidden">
          <img src="${data[i].strMealThumb}" alt="" class="w-100">
          <div class="categor position-absolute" data-id = ${data[i].idMeal}>
              <h3 class="mx-2 text-light top-50 position-absolute translate-middle-y">${data[i].strMeal}</h3>
          </div>
      </article>
  </div>
      `
  }
  contentData.innerHTML = list

}
  //*************show Search Data************* */
function showSearchData(data){
  let list = ""
  for(let i = 0; i < data.length; i++){
      list += `
      <div class="col-md-3 p-2">
      <article class="position-relative rounded-3 overflow-hidden">
          <img src="${data[i].strMealThumb}" alt="" class="w-100">
          <div class="categor position-absolute" data-id = ${data[i].idMeal}>
              <h3 class="mx-2 text-light top-50 position-absolute translate-middle-y">${data[i].strMeal}</h3>
          </div>
      </article>
  </div>
      `
  }
  document.querySelector('.row-searchData').innerHTML = list
}
//********check for "data-id" attribute to show details data by using API Search*********** */ 
function getDataId(e){
  e.preventDefault();
  if(e.target.hasAttribute('data-id'))
  {
    let dataId = e.target.getAttribute('data-id')
    getAPTById(dataId)
  }
}
//********get API By Id and select it to showDataDetails function*********** */ 
async function getAPTById(dataId){
  let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dataId}`)
let {meals} = await api.json()
if(meals.status = 200){
  document.querySelector(".loading").classList.add("d-none")
}
showDataDetails(meals)
}
//********show Data Details*********** */ 
function showDataDetails(details){
    for (let i = 0; i < details.length; i++) {
      let detailsContent = `
      
     <div>
          
     <div class="row details">
           
     <div class="img col-md-5">
       <img src="${details[i].strMealThumb}" class="w-100" alt="">
       <p class="fs-4">${details[i].strMeal}</p>
     </div>

     <div class="col-md-7">
         <h1>Instructions</h1>
         <p> ${details[i].strInstructions} </p>
         <ul class="list-unstyled">
             <li><span class="fs-3 fw-bold">Area: </span><span class="fs-5">${details[i].strArea}</span></li>
             <li><span class="fs-3 fw-bold">Category: </span><span class="fs-5">${details[i].strCategory}</span></li>
         </ul>
         <h3>Recipes</h3>
           <div class="recipes">
            
           </div>
           <h3>Tags:</h3>
           
           ${details[i].strTags !== null ? `<span class="badge fw-lighter bg-info fs-5 p-2 mb-2">${details[i].strTags}</span>` : ''} 
              <ul class="list-unstyled d-flex">
              ${details[i].strSource !== null ? `<li><a href="${details[i].strSource}" class="btn btn-success me-2" target="_blank">Source</a></li>` : ''}
              ${details[i].strYoutube !== null ? `<li><a href="${details[i].strYoutube}" class="btn btn-danger" target="_blank">Youtube</a></li>` : ''}
           </ul>
     </div>

  </div>
              
     </div>
      
      `
 

      document.querySelector(".row-data").innerHTML = detailsContent;
       let filterSrIngredientData = Object.entries(details[i])
       .filter(([key, value]) => key.startsWith("strIngredient") && value != "")
       .map(([key, value]) => value);

       let filterStrMeasureData = Object.entries(details[i])
       .filter(([key, value]) => key.startsWith("strMeasure") && value != " ")
       .map(([key, value]) => value);

       let concatData = filterStrMeasureData.reduce((data, key, index) => {
        data[key] = filterSrIngredientData[index]
        return data
       }, {})

      let changeDataShow = Object.entries(concatData)
        showRecipes(changeDataShow)
    }
}

function showRecipes(changeDataShow){
   let recipes = ""
   changeDataShow.forEach(([key, value])=>{
    recipes += ` <div class="badge p-2 bg-danger fw-light">${key} ${value}</div> `
   })
   
  document.querySelector(".recipes").innerHTML = recipes

}


//********************contact form and it's validation*************************** */


 function showContactForm(){
  play()
      document.getElementById("dataShow").classList.add("position-absolute", "top-50", "start-50", "translate-middle")
      document.querySelector(".row-data").innerHTML =  `
             <div class="products-form my-4 row">
             <div class="mb-3 col-md-6">
                 <input oninput="validation()" type="text" class="form-control" placeholder="Enter your name" id="name">
                 <span id="valid_name" class="validMessage"></span>
               </div>
               <div class="mb-3 col-md-6">
                 <input oninput="validation()" type="text" class="form-control" placeholder="Enter your email" id="email">
                 <span id="valid_email" class="validMessage"></span>
               </div>
               <div class="mb-3 col-md-6">
                 <input oninput="validation()" type="text" class="form-control"  placeholder="Enter your phone" id="phone">
                 <span id="valid_phone" class="validMessage"></span>
               </div>
               <div class="mb-3 col-md-6">
                 <input oninput="validation()" type="number" class="form-control"  placeholder="Enter your age" id="age">
                 <span id="valid_age" class="validMessage"></span>
               </div>
               <div class="mb-3 col-md-6">
                 <input oninput="validation()" type="password" class="form-control" placeholder="Enter your password" id="password">
                 <span id="valid_password" class="validMessage"></span>
               </div>
               <div class="mb-3 col-md-6">
                 <input oninput="validation()" type="password" class="form-control" placeholder="Repassword" id="Repassword">
                 <span id="valid_repassword" class="validMessage"></span>
               </div>
               <div class="d-flex justify-content-center">
                 <button id="submit" disabled class="btn btn-danger">submit</button>
               </div>
         </div>
             
             ` 
 }

function validation(){
  if(validName() && validEmail() && validPhone() && validAge() && validPassword() && validRepassword()){
    submit.removeAttribute("disabled")
   }else{
    submit.setAttribute("disabled", true)
   }
  //****valid name*****/
  function validName(){
    let regux = /^[A-Z][a-z]{2,10}$/;
  let regux2 = /^[a-z]{3,6}$/;
  let regux3 = /^[A-Z]|[a-z]{1,4}/;
  let isValid = regux.test(document.getElementById("name").value)
  let notValid2 = regux2.test(document.getElementById("name").value)
  let notValid3 = regux3.test(document.getElementById("name").value)
  if(isValid){
    document.getElementById("valid_name").innerHTML = `<p class="text-success"><i class="fa-solid fa-check"></i></p>`
  } else if(notValid2){
    document.getElementById("valid_name").innerHTML = `<p class="text-danger fw-bold">Name shuld be started capital letter</p>`;
  } else if(notValid3){
    document.getElementById("valid_name").innerHTML = `<p class="text-danger fw-bold">Name shuld be included string yet from 3 char to 11 char</p>`;
  }
  return isValid
}
//***valid age function****/
function validAge(){
  var regex = /^(1\d|10[1-9]\d|1[1-9]\d{2}|[2-9]\d{3}|99)$/;
  var isValid = regex.test(document.getElementById("age").value);
  
      if(isValid){
          document.getElementById("valid_age").innerHTML=`<p class="text-success"><i class="fa-solid fa-check"></i></p>`
        } else if(!isValid){
          document.getElementById("valid_age").innerHTML=`<p class="text-danger"><i class="fa-solid fa-xmark"></i>  you should write number from 10 to 99</p>`
      }
  return isValid
}
//***valid mobile number function****/
function validPhone(){
  var regex = /^(?:\+20|0)?1[0-6]\d{8}$/;
  var isValid = regex.test(document.getElementById("phone").value);
  
  if(isValid){
          document.getElementById("valid_phone").innerHTML=`<p class="text-success"><i class="fa-solid fa-check"></i></p>`
      } else if(!isValid){
          document.getElementById("valid_phone").innerHTML=`<p class="text-danger"><i class="fa-solid fa-xmark"></i>  you should write valid phone number</p>`
        }
        return isValid
      }      
//****valid email****/
function validEmail(){
    let regux = /\w+@\w+\.\w+/ig;
  let regux2 = /@\w+\.\w+/ig;
  let regux3 = /\w+@\w+/ig;
  let regux5 = /\w+/ig;
  let isValid = regux.test(document.getElementById("email").value)
  let notValid1 = regux2.test(document.getElementById("email").value)
  let notValid2 = regux3.test(document.getElementById("email").value)
  let notValid4 = regux5.test(document.getElementById("email").value)
  if(isValid){
    document.getElementById("valid_email").innerHTML = `<p class="text-success"><i class="fa-solid fa-check"></i></p>`
  } else if(notValid1){
    document.getElementById("valid_email").innerHTML = `<p class="text-danger fw-bold">You forgot write text before ${signupEmail.value}</p>`;
  } else if(notValid2){
    document.getElementById("valid_email").innerHTML = `<p class="text-danger fw-bold">You forgot write ".example" after ${signupEmail.value}</p>`;
  } else if(notValid4){
    document.getElementById("valid_email").innerHTML = `<p class="text-danger fw-bold">valid email should be like this: example@example.example</p>`;
  }
  return isValid
}
//****valid password****/
function validPassword(){
  let regux = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^#*?&])[A-Za-z\d@$^!%#*?&]{8,}$/ig;
  let isValid = regux.test(document.getElementById("password").value)
  if(isValid){
    document.getElementById("valid_password").innerHTML = `<p class="text-success"><i class="fa-solid fa-check"></i></p>`
  } else if(!isValid){
        document.getElementById("valid_password").innerHTML = `<p class="text-danger fw-bold">password length at least 8 char included [a-z] or [A-Z] and [!@#$%^] and [0-9]</p>`;
    }
    return isValid
}
//****valid password****/
function validRepassword(){
    let isValid = document.getElementById("password").value === document.getElementById("Repassword").value
    if(isValid){
        document.getElementById("valid_repassword").innerHTML = `<p class="text-success"><i class="fa-solid fa-check"></i></p>`
    } else if(!isValid){
        document.getElementById("valid_repassword").innerHTML = `<p class="text-danger fw-bold">password length at least 8 char included [a-z] or [A-Z] and [!@#$%^] and [0-9]</p>`;
    }
    return isValid
}
    }