let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = "create";
let tmp; /** global */

// get total
function getTotal()
{
    if(price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040'

    }
    else{
        total.innerHTML ='';
        total.style.background= '#a00d02'
    }
}

// create product
let dataPro;

if(localStorage.product != null){
    dataPro= JSON.parse(localStorage.product)
} 
else{
    dataPro= [];
}


submit.onclick =function(){
    let newPro = {  /* Object*/
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML, /* لانه  small and not input */
        count:count.value,
        category:category.value.toLowerCase(),


    }
    if(title.value !='' &&
        price.value !=''&&
        category.value !=''&&
        newPro.count <100 
    ){
        if(mood === "create"){
            if(newPro.count >1){
                for(let i =0; i<newPro.count; i++){
                    dataPro.push(newPro)
        
                }
        
            }
            else{
                dataPro.push(newPro)
        
            }
    
        }
        else{
            dataPro[ tmp ] = newPro;
            mood = "create";
            submit.innerHTML= "Create";
            count.style.display = "block";
    
        }
        clearData()

    }
   
    
    
    // save localstorage
    localStorage.setItem('product',  JSON.stringify(dataPro))

    
    showData()

}

// clear inputs
function clearData(){ 
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';

}


// read
function showData(){
    
    getTotal()
     
    let tabal = '';
    for(let i =0; i < dataPro.length; i++){
        tabal +=`
         <tr>
             <td>${i+1}</td>
             <td>${dataPro[i].title}</td>
             <td>${dataPro[i].price}</td>
             <td>${dataPro[i].taxes}</td>
             <td>${dataPro[i].ads}</td>
             <td>${dataPro[i].discount}</td>
             <td>${dataPro[i].total}</td>
             <td>${dataPro[i].category}</td>
             <td><button onclick="updateDate(${i})" id="update">update</button></td>
             <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
            </tr>
        
        `
    }
    document.getElementById('tbody').innerHTML = tabal;

    let btnDeleteAll = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDeleteAll.innerHTML = `
         <button onclick="deleteAll()" >Delet All(${dataPro.length})</button>
        `
    }
    else{
        btnDeleteAll.innerHTML ='';
    }
}
showData()

// delete
function deleteDate(i){

    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro); /*  هيضفلي الاراي بعد ما هندلها*/ 
    showData()   /*    عشان يحدثلي الداتا علطول بمجرد ما امسح اي عنصر */ 
}

// deleteAll
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0)
    showData()

}

// count

// update
function updateDate(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    getTotal();
    count.style.display = 'none'
    category.value = dataPro[i].category;
    submit.innerHTML = "Update";
    mood = "update";
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })


}



// search

let searchMood= 'title';

function getSearchMood(id){
    
    let search = document.getElementById("search");
    if(id == "searchTitel"){
        searchMood='title'
        search.placeholder='Search By Title'
    }
    else{
        searchMood= 'Category'
        search.placeholder='Search By Category'
    }
    search.focus()
    search.value ='';
    showData()
}

function searchData(value){

    let tabal = '';
    for(let i =0; i< dataPro.length; i++){
    if(searchMood == 'title'){

       
            if(dataPro[i].title.includes(value.toLowerCase())){
                tabal +=`
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateDate(${i})" id="update">update</button></td>
                    <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
                   </tr>
               
               `

            }
    }
    else{
        
            if(dataPro[i].category.includes(value.toLowerCase())){
                tabal +=`
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateDate(${i})" id="update">update</button></td>
                    <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
                   </tr>
               
               `

            }


        

    }

    document.getElementById('tbody').innerHTML = tabal;
   


  }
}



// clean data

