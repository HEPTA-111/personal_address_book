document.addEventListener('DOMContentLoaded', () => {
    const addressForm = document.getElementById('addressForm');
    const addressTable = document.getElementById('addressTable').getElementsByTagName('tbody')[0];
    let addresses = JSON.parse(localStorage.getItem('addresses')) || [];

    function renderTable() {
        addressTable.innerHTML = '';
        addresses.forEach((address, index) => {
            const row = addressTable.insertRow();
            row.insertCell().textContent = address.name;
            row.insertCell().textContent = address.address;
            row.insertCell().textContent = address.email;
            row.insertCell().textContent = address.phone;
            const actionsCell = row.insertCell();
            actionsCell.innerHTML = `<button onclick="editAddress(${index})">Edit</button> <button onclick="deleteAddress(${index})">Delete</button>`;
        });
    }

    function saveAddress(event) {
        event.preventDefault();
        const id = document.getElementById('personId').value;
        const newAddress = {
            name: document.getElementById('name').value,
            address: document.getElementById('address').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };
        if (id !== '') {
            addresses[id] = newAddress;
        } else {
            addresses.push(newAddress);
        }
        localStorage.setItem('addresses', JSON.stringify(addresses));
        addressForm.reset();
        renderTable();
    }

    window.editAddress = function(index) {
        const address = addresses[index];
        document.getElementById('personId').value = index;
        document.getElementById('name').value = address.name;
        document.getElementById('address').value = address.address;
        document.getElementById('email').value = address.email;
        document.getElementById('phone').value = address.phone;
    };

    window.deleteAddress = function(index) {
        addresses.splice(index, 1);
        localStorage.setItem('addresses', JSON.stringify(addresses));
        renderTable();
    };

    addressForm.addEventListener('submit', saveAddress);
    renderTable();
});
