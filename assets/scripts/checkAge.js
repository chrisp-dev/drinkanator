// check if they have confirmed their age, else redirect
let userOfAge = localStorage.getItem('userOfAge') || false;
let deployed = (window.location.host === "chrisp-dev.github.io");
let prepath = deployed ? '/drinkanator/' : '';
if (!userOfAge && window.location.pathname !== (prepath + '/index.html')) {
    window.location.href = prepath + 'index.html';
} else if (userOfAge && window.location.pathname === (prepath + '/index.html')) {
    document.querySelector('.checkAge-wrapper').style.display = 'none';
    document.querySelector('.black-trans-bkg').style.display = 'none';

}