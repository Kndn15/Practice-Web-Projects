const modeSwitch=document.querySelector('.mode-switch');
const body=document.body;
const modeIcon=document.getElementById('mode-icon');
modeSwitch.addEventListener('click',()=>{
    body.classList.toggle('light-mode');
    if(body.classList.contains('light-mode')){
        modeIcon.textContent='🌞';
    }else{
        modeIcon.textContent='🌙';
    }
})