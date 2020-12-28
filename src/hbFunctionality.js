export const domManipulationFunctions = {
    getEl: id => document.querySelector(`#${id}`),
    elContainsClass: (el, cls) => el.classList.contains(cls),
    removeClassFromEl: (el, cls) => el.classList.remove(cls),
    addClassToEl: (el, cls) => el.classList.add(cls),
};

//  Hamburger functionality
function hbFunctionality(dmFunctions){
    const { getEl, elContainsClass, removeClassFromEl, addClassToEl } = dmFunctions;
    const hbMenu = getEl('hb-container');
    const navLinksUl = getEl('nav-links-ul');
    
    hbMenu.addEventListener('click', () => {
        if(elContainsClass(navLinksUl, 'hide-nav-links')) {
            removeClassFromEl(navLinksUl, 'hide-nav-links');
            addClassToEl(navLinksUl, 'show-nav-links');
        }
        else if(elContainsClass(navLinksUl,'show-nav-links')) {
            removeClassFromEl(navLinksUl, 'show-nav-links');
            addClassToEl(navLinksUl, 'hide-nav-links');
        };
    });
    
    navLinksUl.addEventListener('click', () => {
        if(elContainsClass(navLinksUl, 'show-nav-links')) {
            removeClassFromEl(navLinksUl, 'show-nav-links');
            addClassToEl(navLinksUl, 'hide-nav-links');
        };
    });
};
hbFunctionality(domManipulationFunctions);

