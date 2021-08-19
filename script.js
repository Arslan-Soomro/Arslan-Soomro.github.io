import { USERNAME, AUTHHEADER, INCFILENAME, IMGNAME } from "./credentials.js";
let PROJECTS = [];

//Projects-container projectSlider logic
const projectSlider = document.querySelector('.projects-container');
let isDown = false;
let startX;
let scrollLeft;

//The Scroll Animation of Projects container Slider
const projectSliderObserver = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting){
        
        projectSlider.scrollLeft = projectSlider.offsetWidth;

        setTimeout(() => projectSlider.scrollLeft = 0, 1000);
    }
}, {threshold: [1]});
projectSliderObserver.observe(projectSlider);


projectSlider.addEventListener('mousedown', (e) => {
    isDown = true;

    //To properly scroll when clicking
    projectSlider.classList.remove("scroll-smooth");
    projectSliderObserver.disconnect();

    startX = e.pageX - projectSlider.offsetLeft;
    scrollLeft = projectSlider.scrollLeft;
});

projectSlider.addEventListener('mouseleave', () => {
    isDown = false;
});

projectSlider.addEventListener('mouseup', () => {
    isDown = false;
});

projectSlider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - projectSlider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    projectSlider.scrollLeft = scrollLeft - walk;
});

//Api Calls

const filterOneRepo = item => {
    return {
        name: item.name,
        description: item.description,
        url: item.html_url,
        pagelink: item.homepage, 
    }    
}

const filterRepoProps = rawData => {
    const newData = rawData.map(filterOneRepo);
    return newData;
}

const getAllRepos = async () => {

    console.log("RETURN " + USERNAME);

    const res = await fetch(`https://api.github.com/users/${USERNAME}/repos`);
    const data = await res.json();

    console.log(data);

    return data;
}

const getContents = async (files) => {

    let contents = {
        rating: 0,
        imgsrc: ""
    };

    for(let i = 0; i < files.length; i++){
        if(files[i].name == `${INCFILENAME}.json`){
            let res = await fetch(files[i].download_url);
            let data = await res.json();

            //All of the information to be carried from $$$INCLUDEPROJECT$$$.json file must be put in contents object here
            contents.rating = data.RATING;
        }

        if(files[i].name == `${IMGNAME}.png`){
            //See which property mathces img src and put it in contents object here
            contents.imgsrc = "";
        }
    }

    return contents;
}

const createProjectCard = (info) => {
    
    let card = document.createElement('div');
    card.classList.add('project-card');

    card.innerHTML = 
    `
    <img src=${info.imgsrc} alt=""/>
    <div class="project-card-disc">
        <h2>${info.name}</h2>
        <p>${info.description}</p>
        <div>
            <button class="round-btn">More</button>
            <button class="round-btn">Preview</button>
        </div>
    </div>
    `
    return card;
}

const formProjects = async (repos) => {
    
    console.log("Included");

    let res;
    let data;
    let repoInfo;

    for(let i = 0; i < repos.length; i++){
        //Fetch Content Of Every Repo And Check If It Will Be Included as a project, it is a project if it contains $$$INCLUDEPROJECT$$$ Folder
        res = await fetch(`https://api.github.com/repos/${USERNAME}/${repos[i].name}/contents/${INCFILENAME}`, AUTHHEADER);

        if(res.status >= 200 && res.status < 300){
            data = await res.json();
            //FETCH IMPORTANT CONTENTS
            let contents = await getContents(data);
            //CLEAR THE UNNECESARY DATA OF REPO
            repoInfo = filterOneRepo(repos[i]);
            //MERGE REPO AND CONTENTS DATA
            repoInfo = { ...repoInfo, ...contents};
            //PUT MERGED DATA INTO PROJECTS Array
            PROJECTS.push(repoInfo); 
            //Get Rid Of Loader
            if(document.querySelector(".projects-container .loader-spinner")){
                projectSlider.removeChild(document.querySelector(".projects-container .loader-spinner"));
            }
            //Inject Into DOM
            projectSlider.appendChild(createProjectCard(repoInfo));
        }else{

        }
    }

    //ADD A Sorting FUNCTION HERE

    //ADD IMAGES IN GIT REPOS AND SETUP HERE TO RECEIVE THEM PROPERLY
}

//getAllRepos().then(data => formProjects(data)).catch(err => console.log("Couldn't Load Data", err));

