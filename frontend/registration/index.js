
//Load from local storage
document.addEventListener("DOMContentLoaded", () => {
    staff = JSON.parse(window.localStorage.getItem("staff")) || [];
    render();
});

//Render cards with staff
const render = () =>{

    const staffDiv = document.querySelector("#main_container #form_section #output_container #output_button");
   // staffDiv.innerHTML = null;

    staff.forEach((person, index) => {
    //Main information card
    const informationCard = document.createElement("label");
    informationCard.className = "btn btn-secondary active mr-4";
    informationCard.setAttribute = ("data-id",index);

    //Main text area
    const textArea = document.createElement("input");
    textArea.id = person.name;
    textArea.type = "checkbox";
    textArea.autocomplete = "off";
    informationCard.appendChild(textArea);

    const nameOfStaff = document.createTextNode(`${person.name}- `);
    informationCard.appendChild(nameOfStaff);

    //Header with name
    const workLoad = document.createElement("span");
    workLoad.className = "badge badge-primary badge-pill";
    informationCard.appendChild(workLoad);

    workLoad.textContent = 0;

    staffDiv.appendChild(informationCard);
    });
    
}