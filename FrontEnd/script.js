//créer une variable pour le lien de l'API Works //
const response = await fetch('http://localhost:5678/api/works');
//créer une variable pour la reponse en JSON//
const works = await response.json();
//Créer une variable pour le selecteur "Tous" //
const buttonAll = document.querySelector(".tous");
//Créer une variable pour le selecteur "Objets" //
const buttonObjects = document.querySelector(".objets");
//Créer une variable pour le selecteur "appartements" //
const buttonAppartment = document.querySelector(".appartements");
//Créer une variable pour le selecteur "hotels" //
const buttonHostel = document.querySelector(".hotels");
//Créer une variable pour le selecteur "Gallery" //
const divGallery = document.querySelector(".gallery");
//Créer une variable pour le selecteur "modal-gallery" //
const modalGallery = document.querySelector(".modal-gallery");
//Créer une variable pour le selecteur "btn-filter" //
const btnFilter = document.querySelector(".btn-filter");

//Créer une variable pour le lien de l'API Categories //
const resp = await fetch('http://localhost:5678/api/categories');
//Créer une variable pour la reponse en JSON //
const categories = await resp.json();

// On  crée une fonction pour le bouton TOUS//
function btnAll() {
    //Créer une variable pour créer l'element a //
    const btnLink = document.createElement('a');
    //Créer une variable pour le nom de la classe du bouton //
    btnLink.className += 'btn-link';
    //Créer une variable pour dire que le lien est un ID //
    btnLink.href = "#";
    //Créer une variable pour rajouter l'attribut ID//
    btnLink.setAttribute("id", 0);
    //Créer une variable pour créer l'élément DIV //
    const divBtn = document.createElement('div');
    //Créer une variable pour dire que le paragraphe du bouton est "Tous" //
    divBtn.innerText = "Tous";
    //On ajoute btnLink au btnFilter //
    btnFilter.appendChild(btnLink);
    //On ajoute divBtn au btnLink //
    btnLink.appendChild(divBtn);

    btnLink.addEventListener('change', function() {
        btnLink.classList.toggle('active2');
      });

    // const zero = document.getElementById("0");
    // zero.style.color = "white";
    // zero.style.backgroundColor  = "green";
}

//on active la fonction//
btnAll();

function generateButton(categories) {
    for(let i = 0; i < categories.length; i++) {

        const category = categories[i];

        const btnLink = document.createElement('a');
        btnLink.className += 'btn-link';
        btnLink.href = "#";
        btnLink.setAttribute("id", category.id);

        const divBtn = document.createElement('div');
        divBtn.innerText = category.name;

        btnFilter.appendChild(btnLink);
        btnLink.appendChild(divBtn);

    }
}
generateButton(categories);

// Pour chaque bouton on filtre les projets en fonction de leurs Id
const filterLink = document.querySelectorAll(".btn-link");

filterLink.forEach( function (i) {
    i.addEventListener("click", function (event) {
        event.preventDefault();

        const btnId = +this.id;

        function allWorks() {
            if(btnId === 0)
            return generateWorks(works);
        }

        const filtered = works.filter( function (object) {
            return object.category.id === btnId;
        })
        document.querySelector(".gallery").innerHTML = "";
        allWorks();
        generateWorks(filtered);
    });
})


// Affiche et créé tous les travaux et éléments sur la page
function generateWorks(works) {
    for (let i = 0; i < works.length; i++) {

        const work = works[i];
        // on crée un variable pour créer l'élément figure //
        const workElement = document.createElement("figure");
        workElement.className = "workElement";
        workElement.setAttribute("data-id", work.id);
        // on crée un variable pour créer l'élément img //
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        // on crée un variable pour créer l'élément figcaption //
        const titleElement = document.createElement("figcaption");
        // le texte de titleElement est le titre de work//
        titleElement.innerText = work.title;
        //On ajoute workElement au divGallery //
        divGallery.appendChild(workElement);
        //On ajoute imageElement au workElement //
        workElement.appendChild(imageElement);
        //On ajoute titleElement au workElement //
        workElement.appendChild(titleElement);
    }
}

//on active la fonction //
generateWorks(works);


// Si l'utilisateur est connecté alors on ajoute des éléments à la page
const myToken = localStorage.getItem('token');

function userConnected() {
    
    const login = document.querySelector('.logIn');
        login.innerText = "login";
    if(myToken === localStorage.token) {

        const banner = document.querySelector('.headBand');
        banner.classList.add('active');

        const modify = document.querySelector('.modify-container');
        modify.classList.add('active');

        // const removeBtn = document.querySelector('.btn-filter');
        // removeBtn.remove();

        const logout = document.querySelector('.logIn');
        logout.innerText = "logout";
        
        // Déconnexion de l'utilisateur 
        logout.addEventListener("click", (event) => { 
            event.preventDefault();          
            localStorage.removeItem("token");
            location.reload();
        });
    }
}
userConnected();
  

// Toggle modale Galerie
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal() {
   modalContainer.classList.toggle("active");
}


// Toggle modale ajout photo
const modalImage = document.querySelector(".modal-container-image");
const addImage = document.querySelectorAll(".trigger-modale-image");

addImage.forEach(trigger => trigger.addEventListener("click", toggleModalImage));

function toggleModalImage() {
    modalImage.classList.toggle("active");
    modalContainer.classList.toggle("active");
}

// Générer les projets dans la galerie modal
function generateModalGallery(works) {
    for (let i = 0; i < works.length; i++) {

        const work = works[i];

        const workElement = document.createElement("figure");
        workElement.setAttribute("id", work.id);


        const divElement = document.createElement("div");
        divElement.className += "divGallery";

        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        imageElement.className += "galleryImg";

        // const iconCross = document.createElement('icon');
        // iconCross.className += "fa-solid fa-arrows-up-down-left-right";

        const iconTrash = document.createElement("icon");
        iconTrash.className += "fa-solid fa-trash-can";
        iconTrash.value = work.id;
        iconTrash.setAttribute("id", work.id);
  
        iconTrash.addEventListener("click", deleteWorks);

        // const titleElement = document.createElement("figcaption");
        // titleElement.innerText = work.title;

        modalGallery.appendChild(workElement);
        workElement.appendChild(divElement);
        divElement.appendChild(imageElement);
        // divElement.appendChild(iconCross);
        divElement.appendChild(iconTrash);
        // workElement.appendChild(titleElement);
    }
}
generateModalGallery(works);


// Supprimer un projet depuis la galerie
async function deleteWorks(event) {
    event.preventDefault();
    event.stopPropagation();

    const workId = this.id;
  
    try {
        const response = await fetch(
        `http://localhost:5678/api/works/${workId}`, {
            method: "DELETE",
            headers: {
                accept: "*/*",
                Authorization: `Bearer ${myToken}`,
            },
        });           
        if(response.ok){
            const dataId = document.querySelector('[data-id="' + workId + '"]');
            dataId.remove();
            const elementId = document.getElementById(`${workId}`);
            elementId.remove();  
        } else {
            throw new Error("Requête échouée");
        } 
    } catch (error) {
        window.alert("La requête a échouée :(");
    }
}


// Envoyer nouveau projet
const sendFormImage = document.querySelector(".form-add-image");
const displayImage = document.querySelector(".display-image");

sendFormImage.addEventListener("submit", async function sendNewWork(event) {
    event.preventDefault();

    const imageData = document.querySelector(".addImage-btn");
    const titleData = document.querySelector("#title-added-image").value;
    const objectData = document.querySelector("#image-category").value;
    const newDataObject = parseInt(objectData);

    const newImage = imageData.files[0];

    const formData = new FormData();

    formData.append("image", newImage);
    formData.append("title", titleData);
    formData.append("category", newDataObject);
        
        
 const response = await fetch('http://localhost:5678/api/works', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${myToken}`,
        },
        body: formData,
    });
    const work = await response.json();
    console.log(work)
    
    // Ajout du nouveau projet dans la galerie         
    const newWorkElement = document.createElement("figure");
    newWorkElement.setAttribute("data-id", work.id);

    const newImageAdded = document.createElement("img");
    newImageAdded.src = work.imageUrl;

    const titleMainPage = document.createElement("figcaption");
    titleMainPage.innerText = work.title;
    
    divGallery.appendChild(newWorkElement);
    newWorkElement.appendChild(newImageAdded);
    newWorkElement.appendChild(titleMainPage);


    // Ajout du nouveau projet dans la galerie Modal   
    const workElement = document.createElement("figure");
    workElement.setAttribute("id", work.id);
  
    const divElement = document.createElement("div");
    divElement.className += "divGallery";
            
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.className += "galleryImg";

    // const iconCross = document.createElement('icon');
    // iconCross.className += "fa-solid fa-arrows-up-down-left-right";

    const iconTrash = document.createElement("icon");
    iconTrash.className += "fa-solid fa-trash-can";
    iconTrash.setAttribute("id", work.id);

    iconTrash.addEventListener("click", deleteWorks);

    const titleElement = document.createElement("figcaption");
    titleElement.innerText = "éditer";
        
    modalGallery.appendChild(workElement);
    workElement.appendChild(divElement);           
    divElement.appendChild(imageElement);
    // divElement.appendChild(iconCross);
    divElement.appendChild(iconTrash);
    divElement.appendChild(titleElement); 

    imageData.value = "";
    document.querySelector(".display-image").style.display = "none";
    sendFormImage.reset();
    select.value = "";
    document.querySelector(".add-image-button").style.backgroundColor  = "#A7A7A7"; 
    // toggleModal();
    toggleModalImage();
});


// Afficher le fichier sélectionné dans la modale photo
const image_input = document.querySelector(".addImage-btn");
let uploaded_image = "";

image_input.addEventListener("change", function() {
    validationFile();
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        document.querySelector(".display-image").style.backgroundImage = `url(${uploaded_image})`;
        document.querySelector(".display-image").style.display = "flex";
    });
    reader.readAsDataURL(this.files[0]);
})
 

// Test si la taille et le format du fichier sont correct    
function validationFile() {
    const imageData = document.querySelector(".addImage-btn");
    const fileSizeAlert = document.querySelector(".errorMessage");
    const newImage = imageData.files[0]; 
    const allowedExtensions = /(\.jpg|\.png)$/i;
    const BtnImage = document.getElementById("#btn-image");
    if(newImage.size > 4e+6){
        fileSizeAlert.innerText = "Le fichier est trop volumineux !";
        imageData.value = "";
    }else if (!allowedExtensions.exec(imageData.value))  {
        fileSizeAlert.innerText = "Le fichier n'est pas au bon format !";
        imageData.value = "";
    } else {
        fileSizeAlert.innerText = "";
        return false;
    }
}


// Création des options pour le select de la modal "Ajout Photo"
const select = document.querySelector("#image-category");

function generateOptions(categories) {
    const selectOption = document.createElement('option');
    selectOption.innerText = 'Veuillez sélectionner une catégorie';
    selectOption.value = "";
    select.appendChild(selectOption);

    for(let i = 0; i < categories.length; i++) {

        const category = categories[i];

        const options = document.createElement('option');
        options.setAttribute("name", category.name);
        options.setAttribute("value", category.id);
        options.innerText = category.name;

        select.appendChild(options);
        select.options[0].disabled = true;
    }
}
generateOptions(categories);


// Changer la couleur du bouton d'envoi si les inputs sont remplis
const formImage = document.querySelector('.form-add-image');
const imageData = document.querySelector(".addImage-btn");
const titleData = document.querySelector(".inputText");
const inputSelect = document.querySelector("#image-category");

formImage.addEventListener("change", checkInput);

function checkInput() {
    if(imageData.value && titleData.value && inputSelect.value !== "") {
        document.querySelector(".add-image-button").style.backgroundColor = "#1D6154";
    } else {
        document.querySelector('.add-image-button').style.backgroundColor = "#A7A7A7"; 
    }
}