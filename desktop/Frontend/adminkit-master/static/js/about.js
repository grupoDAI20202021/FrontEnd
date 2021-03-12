function toggleTeam() {
    const element=document.getElementsByClassName("team")[0];
    console.log(element);
    console.log(element.style.top);
    if (element.style.top==="77%")
    element.style.top=0;
    else element.style.top="77%";
    
}