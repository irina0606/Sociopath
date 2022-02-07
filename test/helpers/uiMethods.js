async function setTime (time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

async function clearInput(element) {
    while (await element.getValue() !== '') {
        await element.doubleClick();
        await element.keys('Delete');
    }
}

async function enter(element) {
    while (await element.getValue() === '') {
        await element.keys('Enter');
    }
}

async  function getInitials(name){
    let initials = "";
    for (let i = 0; i < name.length; i++){
        if (name[i] === " ")
            return (initials = name.charAt(name[0])+name.charAt(i + 1)).toUpperCase();
    }
}

async function getElements (elem) {
    const res = await browser.findElements("xpath", `${elem}`);
    return res;
}

async function returnBooleanArrayIsASCOrder(selectorToGetElements){
    let arrOfElements = [];
    for(let i = 1; i <= await $$(selectorToGetElements).length; i++){
        let element = await $(`(${selectorToGetElements})[${i}]`);
        let textFromElement = await element.getText();
        arrOfElements.push(textFromElement);
    }
    let arrSorted = [...arrOfElements].sort();
    return (arrOfElements.toString() === arrSorted.toString());
}

async function compareElementsOfArrays(array1, array2) {
    return array1.every(element => { return array2.includes(element)});
}

module.exports = {
    clearInput,
    getInitials,
    getElements,
    returnBooleanArrayIsASCOrder,
    enter,
    setTime,
    compareElementsOfArrays,
}