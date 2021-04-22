const url="http://127.0.0.1:8080";
let showForm= document.getElementById("add-sponsor");
showForm.onclick= openForm;

let hideForm= document.getElementById("close-Form");
hideForm.addEventListener("click", closeForm);

let submitSponsor = document.getElementById("submitSponsor")
submitSponsor.addEventListener("click",submit);


function openForm(){
  document.getElementById("addSponsorForm").className= "row mb-2 mb-xl-2 col-3  addForm mx-sm-auto";
   }
  
function closeForm(){
    document.getElementById("addSponsorForm").className= "row mb-2 mb-xl-2 col-3  addForm mx-sm-auto d-none";
  }


  $(document).ready(function() {
    document.getElementById("userEmail").innerHTML= localStorage.getItem("EmailLogado");
    console.log(localStorage.getItem('userLogado'));
   fillTable();

  });



  function fillTable() {
    feather.replace();
    let count =0;
    let screen = document.getElementById("sponsor-container");
            let txt = "";
    fetch(url + '/api/townhalls/'+localStorage.getItem('userLogado')+'/sponsors')
        .then(res => res.json())
        .then((out) => {
          refillSponsor();
            $.each(out, function(index, value) {

              if(count%3 == 0){
                txt += '</div> <div  class="d-inline-flex w-100 ">';
                txt += '<div  class="w-33 my-1 sponsor-div"> <div id="close-Form"> ';
              txt += '<i  id="'+value.idSponsor+'" class="align-middle ms-auto sponsor-div-delete" data-feather="trash"></i> </div>';
              txt+= '<img src ="../img/photos/LOGOPNG.png" class="sponsor-img mx-auto d-block"></img>' ; // PROVISORIO!!!!!!
              txt += '<h2 class="text-center sponsor-title">';
              txt += ' <Strong> '+ value.name+' </Strong> </h2>';
              txt+='<span class="text-center mx-auto d-block w-100 sponsor-data-span">Parceiros desde:'+value.insert_data+' </span> </div>';
                count += 1;
              }else {
              txt += '<div  class="w-33 my-1 sponsor-div"><div id="close-Form"> ';
              txt += '<i  id="'+value.idSponsor+'" class="align-middle ms-auto sponsor-div-delete" data-feather="trash"></i> </div>';
              txt+= '<img src ="../img/photos/LOGOPNG.png" class="sponsor-img mx-auto d-block"></img>' ; // PROVISORIO!!!!!!
              txt += '<h2 class="text-center sponsor-title">';
              txt += ' <Strong> '+ value.name+' </Strong> </h2>';
              txt+='<span class="text-center mx-auto d-block w-100 sponsor-data-span">Parceiros desde:'+value.insert_data+' </span> </div>';
              count += 1;
              }
            });
            screen.innerHTML += txt;
            feather.replace();
            let panels = document.querySelectorAll(".sponsor-div-delete");
            console.log(panels[0].id)
            for (let i = 0; i < panels.length; i++) {
                panels[i].addEventListener("click", openPanelHandler);
            }
        }).catch(err => console.error(err));
}

function refillSponsor(){
let div = document.getElementById('sponsor-container');
while(div.firstChild){
    div.removeChild(div.firstChild);
}
}

function OpenPanel(elem) {
  swal({
    title: "Pretende eliminar a patrocinador ?",
    icon: "warning",  
    buttons: ["Sim", "Não"],
    //dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {}
    else {
      fetch(url + '/api/sponsors/' + elem.id, { method: "DELETE" })
                        .then(function(response) {
                          if (!response.ok) {
                            console.log(response.status); //=> number 100â€“599
                            console.log(response.statusText); //=> String
                            console.log(response.headers); //=> Headers
                            console.log(response.url); //=> String
                           
                          }
                          else {
                            swal({
                              title: "O patrocinador foi removido com sucesso!",
                              icon: "success",
                            });
                                 fillTable();
                                }
                        });
 
}
  });
}

function openPanelHandler(event) {
  OpenPanel(this);
  console.log(this);
}

let imgButton=document.getElementById("insertImg")
imgButton.addEventListener("click", defaultBtnActive);

const wrapper = document.querySelector(".custom-wrapper")
const cancelBtn = document.querySelector("#cancelicon")
const fileName=document.querySelector(".file-name");
const defaultBtn=document.querySelector("#default-btn");
const customBtn=document.querySelector("#custom-btn");
const img = document.querySelector(".imgclass");

function defaultBtnActive(){
defaultBtn.click();
}

defaultBtn.addEventListener("change",function(){
  const file=this.files[0];
  /*ReadableStream.onload= function(){
    const result = reader.result;
    img.src= result;
  }
  reader.readAsDataURL(file);*/
  if(file){
    const reader = new FileReader();
    reader.onload= function(){
      const result = reader.result;
      img.src= result;
      wrapper.classList.add("active");
    }
    cancelBtn.addEventListener("click",function(){
      img.src="";
      cancelBtn.className="d-none"
      img.className="imgClass d-none";
    })
    reader.readAsDataURL(file)
    img.className="imgClass";
    cancelBtn.className="fas fa-times cancel-btn active"
  }
  if(this.value){
    let valueStore = this.value;
    fileName.textContent=valueStore;
  }
}
);


function submit(){
let data = {};
data.name= document.getElementById("inputName").value;
data.contact =document.getElementById("inputContact").value;
fetch(url + '/api/townhalls/'+localStorage.getItem('userLogado')+'/sponsors', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }).then(function(response) {
        if (!response.ok) {
             openForm();
            console.log(response.status); //=> number 100–599
            console.log(response.statusText); //=> String
            console.log(response.headers); //=> Headers
            console.log(response.url); //=> String
        }
        else {
          swal({
            title: "O patrocinador foi adicionado com sucesso!",
            icon: "success",
          });
               fillTable();
              }
            
    }).then(function(result) {
        console.log(result);
    }).catch(function(err) {
         openForm();
        console.error(err);
    });
}
