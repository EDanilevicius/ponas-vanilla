//If no token return to login page
$(window).on('load', function () {
    if (localStorage.getItem("x-auth") === null) {
        window.open('file:///home/evaldas/CodeAcademy/Ponas%20Dviratis/frontend/index.html', "_self")
    } else {
        document.getElementById("inputOrderTaker").value = localStorage.getItem("user");//Add staff name
        document.getElementById("startDate").valueAsDate = new Date();//Add todays date
    }
});

//Upload image to server
function upload_image() {
    let token = localStorage.getItem("x-auth");
    let file = document.getElementById('file_upload');

    let data = new FormData()
    data.append('item_photo', file.files[0])
    data.append('client_phone', document.getElementById("customerPhone").value)

    fetch("http://localhost:3000/api/image", {
        method: "POST",
        body: data,
        headers: {
            "x-auth": token
        }
    })
        .then((res) => {
            console.log(res.json())
            return res.json()
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error("Error:", error));
};


//Download image from server
let image = document.getElementById("show_image");
let data = new FormData();
function show_image() {
    fetch("http://localhost:3000/api/image", {
        method: "GET",
        body: data,
        headers: {
            "x-auth": token
        }
    })
        .then((res) => {
            return res.json()
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => console.error("Error:", error));

}

document.getElementById("file_upload_btn").addEventListener("click", event => {
    upload_image();
    //show_image();
});

//Create Order
function createOrder() {
    const customerName = document.getElementById("customerName").value;
    const customerPhone = document.getElementById("customerPhone").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const inputItem = document.getElementById("inputItem").value;
    const inputOrderTaker = document.getElementById("inputOrderTaker").value;

    const PROFILAKTIKA = document.getElementById("PROFILAKTIKA").value;
    const PILNA_PROFILAKTIKA = document.getElementById("PILNA_PROFILAKTIKA").value;
    const PAVARU_REGULIAVIMAS = document.getElementById("PAVARU_REGULIAVIMAS").value;
    const STABDZIU_REGULIAVIMAS = document.getElementById("STABDZIU_REGULIAVIMAS").value;
    const RATU_TIESINIMAS = document.getElementById("RATU_TIESINIMAS").value;
    const KAMEROS_KEITIMAS = document.getElementById("KAMEROS_KEITIMAS").value;
    const KITA = document.getElementById("KITA").value;

    // let data = {
    //     customer_name: customerName,
    //     phone: customerPhone,
    //     //email: 
    //     created_date: startDate,
    //     close_date: endDate,
    //     item: inputItem,
    //     created_by: inputOrderTaker,

    //     work_list: {
    //     profilaktika: PROFILAKTIKA,
    //     pilna_profilaktika: PILNA_PROFILAKTIKA,
    //     pavaru_reguliavimas: PAVARU_REGULIAVIMAS,
    //     stabdziu_reguliavimas: STABDZIU_REGULIAVIMAS,
    //     ratu_tiesinimas: RATU_TIESINIMAS,
    //     kameros_keitimas: KAMEROS_KEITIMAS,
    //     kita: KITA
    //     }
    // };
    // console.log(data)

    let token = localStorage.getItem("x-auth");
    let file = document.getElementById('file_upload');

    let data_image = new FormData()
    data_image.append('item_photo', file.files[0]);
    data_image.append('customerPhone',customerPhone);
    data_image.append('customer_name' ,customerName);  
    data_image.append('phone', customerPhone);
        //email: 
    data_image.append('created_date', startDate);
    data_image.append('close_date', endDate);
    data_image.append('item', inputItem);
    data_image.append('created_by', inputOrderTaker);


            // data_image.append('profilaktika', PROFILAKTIKA)
            // data_image.append('pilna_profilaktika', PILNA_PROFILAKTIKA)
            // data_image.append('pavaru_reguliavimas', PAVARU_REGULIAVIMAS)
            // data_image.append('stabdziu_reguliavimas', STABDZIU_REGULIAVIMAS)
            // data_image.append('ratu_tiesinimas', RATU_TIESINIMAS)
            // data_image.append('kameros_keitimas', KAMEROS_KEITIMAS)
            // data_image.append('kita', KITA)


    fetch("http://localhost:3000/api/order", {
        method: "POST",
        body: data_image,
        headers: {
            "x-auth": token
        }
    })
        .then((res) => {
            console.log(res.json())
            return res.json()
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error("Error:", error));
};

document.getElementById("create_order").addEventListener('click', event => {
    if (event.target.tagName === "BUTTON") {
        createOrder();
        document.getElementById("form_section").reset()
    }
});