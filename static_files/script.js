function toggleSwitch () {
    var switchContainerEl = document.getElementsByClassName('switch-container')[0];
    var switchEl = document.getElementsByClassName('switch')[0];
    var body = document.body;

    if(switchContainerEl.getAttribute('class').includes('light')) {
        switchContainerEl.setAttribute('class', 'switch-container dark');
        switchEl.setAttribute('class', 'switch dark');
        body.setAttribute('class', 'dark');
    } else {
        switchContainerEl.setAttribute('class', 'switch-container light');
        switchEl.setAttribute('class', 'switch light');
        body.setAttribute('class', 'light');
    }
    
}
