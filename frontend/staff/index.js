let staff = [];

//Load from local storage
document.addEventListener("DOMContentLoaded", () => {
    staff = JSON.parse(window.localStorage.getItem("staff")) || [];
    render();
});

//Render cards with staff
const render = () =>{

    const staffDiv = document.querySelector("#main_container #output_container");
    staffDiv.innerHTML = null;

    staff.forEach((person, index) => {

    //Create link to staff member
    const linkToMember = document.createElement("a");
    linkToMember.href = `/staff/index.html?name=${person.name}`;

    //Main information card
    const informationCard = document.createElement("div");
    informationCard.className = "card m-2";
    informationCard.style = "width: 18rem;";
    informationCard.setAttribute = ("data-id",index);
    linkToMember.appendChild(informationCard);

    //Main text area
    const textArea = document.createElement("div");
    textArea.className = "card-body bg-secondary";
    informationCard.appendChild(textArea);

    //Header with name
    const headerSkills = document.createElement("h5");
    headerSkills.className = "card-title text-white";
    textArea.appendChild(headerSkills);

    headerSkills.textContent = person.name;

    staffDiv.appendChild(linkToMember);
    });
    
}

//Read input
document.getElementById("button-addon3").addEventListener("click", event =>{

    if (event.target.tagName === "BUTTON"){
        const inputName = document.getElementById("name").value;
        switch (event.target.id){

            //Create button
            case 'create_staff':
            if(inputName.length<3){
                alert(`Name must be 3 and more characters`);
            }
            else if(staff.filter(worker => worker.name.includes(inputName)).length > 0){
                alert(`${inputName} already exists`);
            }
            else{
                const newStaffMember = {
                    name: inputName
                }
                staff.push(newStaffMember);
            }
            break;

            //Delete button
            case 'delete_staff':
            if(staff.filter(worker => worker.name.includes(inputName)).length === 1 && inputName.length>3){
                if(window.confirm(`Do you really want to delete ${inputName}?`)){
                    staff = staff.filter(worker => !worker.name.includes(inputName));
                }
            }
            else{
                alert("Please enter correct name");
            }
            break;

            default:
            console.log("No such events")

        }
        window.localStorage.setItem("staff", JSON.stringify(staff));
        render();
    }
});

//Load particular employee info
const loadEmployee = () =>{
        var initialPage = location.pathname;
        location.replace('http://example.com/#' + initialPage);

}