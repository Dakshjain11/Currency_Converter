//API
let BASE_URL = "https://api.frankfurter.app";

const dropdowns = document.querySelectorAll(".drop-down select");
const btn = document.querySelector("button");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "From"  && currCode === "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "To"  && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newScr = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newScr;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal == "" || amtVal < 1){
        amtVal = 1;
        amount.value = 1;
    }

    const URL = `${BASE_URL}/latest?from=${from.value}&to=${to.value}`;
    let response = await fetch(URL);
    let response2 = await response.json();
    let rate = response2.rates[to.value];
    let date = response2.date

    let exchange = amtVal * rate;
    
    let msg = document.querySelector(".msg");
    msg.innerText = `${amtVal} ${from.value} = ${exchange} ${to.value}`;

    let msg2 = document.querySelector(".msg2");
    msg2.innerText = `As per price on ${date}`;
});