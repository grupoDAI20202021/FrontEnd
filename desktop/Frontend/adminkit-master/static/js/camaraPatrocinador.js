let showForm= document.getElementById("add-sponsor");
showForm.onclick= openForm;

let hideForm= document.getElementById("close-Form");
hideForm.addEventListener("click", closeForm);

function openForm(){
  document.getElementById("addSponsorForm").className= "row mb-2 mb-xl-2 col-3  addForm mx-sm-auto";
   }
  
function closeForm(){
    document.getElementById("addSponsorForm").className= "row mb-2 mb-xl-2 col-3  addForm mx-sm-auto d-none";
  }