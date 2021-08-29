'use strict';

// window.onload = function() {
//     console.log(getComputedStyle(ship).width);
//     console.log(ship.offsetHeight)
// };

const ship = document.getElementById('ship');

let hpLine = document.querySelector('.hp-line');
let hpValue = document.getElementById('hp_value');

// npcs
const hydro = document.querySelector('.hydro');
const jenta = document.querySelector('.jenta');
const mali = document.querySelector('.mali');

// stats
const exp = document.getElementById('exp');
const btc = document.getElementById('btc');
const lvl = document.getElementById('lvl');
const plt = document.getElementById('plt');

// shop
const lg1 = document.getElementById('lg1');
const lg2 = document.getElementById('lg2');
const lg3 = document.getElementById('lg3');

const levels = {
    0: 1,
    10000: 2,
    20000: 3,
    40000: 4,
    80000: 5,
    160000: 6,
    320000: 7,
    640000: 8,
    1280000: 9,
    2560000: 10,
}

const hpCost = {
    hydro: 1,
    jenta: 3,
    mali: 10,
}

exp.textContent = localStorage.getItem('exp') || 0;
btc.textContent = localStorage.getItem('btc') || 0;
lvl.textContent = localStorage.getItem('lvl') || 1;
plt.textContent = localStorage.getItem('plt') || 0;

setInterval(regenerate, 2000);
const repairPersent = 5;
const repairAmount = repairPersent * 2;

// NPCS
hydro.addEventListener('click', function(e) {
    let isDead = checkForHp('hydro');
    if (isDead) return;

    hpLine.style.width = parseInt(getComputedStyle(hpLine).width) - 1 + 'px';
    hpValue.textContent = 276000 * parseInt(hpLine.style.width) / 200;

    exp.textContent = +exp.textContent + 400;
    btc.textContent = (+btc.textContent + 0.4).toFixed(1);
    plt.textContent = +plt.textContent + hpCost.hydro;

    levelCheck();
    updateData();
});

jenta.addEventListener('click', function(e) {
    let isDead = checkForHp('jenta');
    if (isDead) return;

    hpLine.style.width = parseInt(getComputedStyle(hpLine).width) - 5 + 'px';
    hpValue.textContent = 276000 * parseInt(hpLine.style.width) / 200;

    exp.textContent = +exp.textContent + 1000;
    btc.textContent = (+btc.textContent + 1.2).toFixed(1);
    plt.textContent = +plt.textContent + hpCost.jenta;

    levelCheck();
    updateData();
});

mali.addEventListener('click', function(e) {
    let isDead = checkForHp('mali');
    if (isDead) return;

    hpLine.style.width = parseInt(getComputedStyle(hpLine).width) - 20 + 'px';
    hpValue.textContent = 276000 * parseInt(hpLine.style.width) / 200;

    exp.textContent = +exp.textContent + 3000;
    btc.textContent = (+btc.textContent + 5).toFixed(1);
    plt.textContent = +plt.textContent + hpCost.mali;

    levelCheck();
    updateData();
});

// SHOP
const shopItems = document.querySelector('.shop__items');

shopItems.addEventListener('click', function(e) {
    let button = e.target;
    let typeOfValue = button.dataset.btc ? 'btc' : 'plt';

    let requiredAmount = button.dataset[typeOfValue];
    let currentAmount = typeOfValue === 'btc' ? btc.textContent : plt.textContent;

    if (currentAmount < requiredAmount) {
        alert(`Not enough ${typeOfValue}`);
        return true;
    }


});

function checkForHp(npc) {
    let current = parseInt(getComputedStyle(hpLine).width);

    if (current - hpCost[npc] <= 0) {
        localStorage.setItem('exp', '0');
        localStorage.setItem('btc', '0');
        localStorage.setItem('lvl', '1');
        localStorage.setItem('plt', '0');

        alert('You dead');

        location.reload();

        return true;
    }

    return false;
}

function dead() {
    
}

function regenerate() {
    let current = parseInt(getComputedStyle(hpLine).width);

    if (current < 200 && current > 200 - repairAmount) {
        hpLine.style.width = 200 + 'px';
        hpValue.textContent = 276000;
    } else if (current <= 200 - repairAmount) {
        hpLine.style.width = current + repairAmount + 'px';
        hpValue.textContent = 276000 * parseInt(hpLine.style.width) / 200;
    }
}

function levelCheck() {
    let current = +exp.textContent;

    let entries = Object.entries(levels);
    let level = entries.find( (el, idx) => {
        if (current > el[0] && current < entries[idx + 1][0]) return true;
        return false;
    });

    lvl.textContent = level[1];
}

function updateData() {
    localStorage.setItem('exp', exp.textContent);
    localStorage.setItem('btc', btc.textContent);
    localStorage.setItem('lvl', lvl.textContent);
    localStorage.setItem('plt', plt.textContent);
}
