/* IMPORT */
import {DataHelper} from "./dataHelper.js";

let data_helper = new DataHelper();

/* ======= BURGER MENU ======= */

let hamburger = document.querySelector(".hamburger");
let nav_menu = document.querySelector(".nav-menu");
const nav_links = document.querySelectorAll(".nav-link");


// toggle menu burger
function mobileMenuBurger() {
    hamburger.classList.toggle("active");
    nav_menu.classList.toggle("active");
}

hamburger.addEventListener("click", mobileMenuBurger);

// close menu burger when click on a link
nav_links.forEach((link) => {
    link.addEventListener("click", mobileMenuBurger);
})

/* ======= DESTINATION ======= */

//get html details for destinations
let destination_img = document.getElementById("destination-img");
let destination_title = document.getElementById("destination-title");
let destination_main_txt = document.getElementById("destination-main-txt");
let destination_distance = document.getElementById("destination-distance");
let destination_travel_time = document.getElementById("destination-travel-time");

// get all button destinations
let destination_buttons = document.querySelectorAll(".js-target");
let first_button = document.getElementById("moon-btn")


// track my current active button, it's moon btn by default
let currentlyActiveButton = first_button;

// for each destination, add an event on click
destination_buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // remove active class to the previous clicked button
        if (currentlyActiveButton) {
            currentlyActiveButton.classList.remove("active");
        }
        // Add active class to the clicked button
        button.classList.add("active");
        currentlyActiveButton = button;

        // my target destination is the innerHTML from my button
        let destination_name = button.innerHTML;
        // call my dataHelper
        data_helper.getDestinationByName(destination_name)
            .then(destination => {
                destination_title.innerHTML = destination.name.toUpperCase();
                destination_img.src = `.${destination.images.png}`;
                destination_main_txt.innerHTML = destination.description;
                destination_distance.innerHTML = destination.distance.toUpperCase();
                destination_travel_time.innerHTML = destination.travel.toUpperCase();
            })
    })
})


/* ======= CREW ======= */

// get all button crew
let crew_buttons = document.querySelectorAll(".round");

// get html details for crew
let crew_image = document.getElementById("crew-img");
let crew_status = document.getElementById("crew-status");
let crew_member_name = document.getElementById("crew-member-name");
let crew_member_bio = document.getElementById("crew-member-bio");

let first_crew_button = document.getElementById("first-crew-button");


// track my current active button, it's moon btn by default
let currentlyActiveCrewButton = first_crew_button;

// on click, change info from the right crew member
crew_buttons.forEach((button) => {
    button.addEventListener("click", () => {

        // remove active class to the previous clicked button
        if (currentlyActiveCrewButton) {
            currentlyActiveCrewButton.classList.remove("active");
        }
        // Add active class to the clicked button
        button.classList.add("active");
        currentlyActiveCrewButton = button;

        let crewNumber = button.dataset.number;
        data_helper.getCrewMemberByNumber(crewNumber)
            .then(crew => {
                crew_image.src = `.${crew.images.png}`;
                crew_status.innerHTML = crew.role.toUpperCase();
                crew_member_name.innerHTML = crew.name.toUpperCase();
                crew_member_bio.innerHTML = crew.bio;
        })
    })
})

/* ====== TECHNOLOGY ======= */

// get all button crew
let tech_buttons = document.querySelectorAll(".tech-btn");
let first_tech_button = document.getElementById("first-tech-button");

// get html details for crew
let tech_image = document.getElementById("tech-img");
let tech_title = document.getElementById("tech-title");
let tech_descr = document.getElementById("tech-bio");


// track my current active button, it's moon btn by default
let currentlyActiveTechButton = first_tech_button;

// media query pc
const media_query_pc = window.matchMedia('(min-width: 992px)');

let techNumber = 0;
// auto adapt default image portrait or landscape
data_helper.getTechnologyByNumber(techNumber)
    .then(technology => {
        // Reset the image source to an empty string
        tech_image.src = '';

        // change img source to portait on pc
        if(media_query_pc.matches) {
            console.log("ok")
            tech_image.src = `.${technology.images.portrait}`;
        } else {
            tech_image.src = `.${technology.images.landscape}`;
        }
    })

tech_buttons.forEach((button) => {
    button.addEventListener("click", () => {

        // remove active class to the previous clicked button
        if (currentlyActiveTechButton) {
            currentlyActiveTechButton.classList.remove("active");
        }
        // Add active class to the clicked button
        button.classList.add("active");
        currentlyActiveTechButton = button;

        let techNumber = button.dataset.numbertech;
        data_helper.getTechnologyByNumber(techNumber)
            .then(technology => {
                // Reset the image source to an empty string
                tech_image.src = '';

                // change img source to portait on pc
                if(media_query_pc.matches) {
                    console.log("ok")
                    tech_image.src = `.${technology.images.portrait}`;
                } else {
                    tech_image.src = `.${technology.images.landscape}`;
                }
                tech_title.innerHTML = technology.name.toUpperCase();
                tech_descr.innerHTML = technology.description;
            })
    })
})
