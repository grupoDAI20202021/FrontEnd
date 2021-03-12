let showForm= document.getElementById("eval-activity");
showForm.onclick= openForm;

let hideForm= document.getElementById("close-Form");
hideForm.addEventListener("click", closeForm);

function openForm(){
  document.getElementById("eval-activity-form").className= "mb-2 mb-xl-2 col-9  addForm mx-sm-auto";
   }
  
function closeForm(){
    document.getElementById("eval-activity-form").className= "mb-2 mb-xl-2 col-9  addForm mx-sm-auto d-none";
  }