// energy.js

// Global variables (accessible from other scripts)
var energy = 100;
const maxEnergy = 100;
const energyRecoveryRate = 1;
const recoveryInterval = 2000;
var energyLevel = document.getElementById('energyLevel'); // Removed const
var energyText = document.getElementById('energyText');   // Removed const


function updateEnergyDisplay() {
    if (energyLevel && energyText) {  // Check if the elements exist
        energyLevel.style.width = energy + '%';
        energyText.textContent = Math.floor(energy);
    }
}


function recoverEnergy() {
    if (energy < maxEnergy) {
        energy += energyRecoveryRate;
        energy = Math.min(energy, maxEnergy); // Cap it at maxEnergy

        localStorage.setItem('energy', energy.toString());
        updateEnergyDisplay();
    }
}

function useEnergy(amount) {
    if (energy >= amount) {
        energy -= amount;
        localStorage.setItem('energy', energy.toString());

        updateEnergyDisplay();
        return true; // Indicate success
    } else {
        return false; // Indicate failure
    }
}

function getEnergy() {
    return energy;
}

// Load the value from localStorage if available
var storedEnergy = localStorage.getItem('energy');

if (storedEnergy) {
    energy = parseFloat(storedEnergy);
}

// Initialize on load
updateEnergyDisplay();


// Start recovery interval
setInterval(recoverEnergy, recoveryInterval);
