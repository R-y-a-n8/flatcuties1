// Function to make a GET request for animal details by ID
function fetchAnimalDetails(animalId) {
    const detailsElement = document.getElementById('animal-details');

    fetch(`http://localhost:3000/characters/${animalId}`)
        .then(response => response.json())
        .then(data => {
            // Update the "animal-details" element with the details
            const nameElement = document.createElement('p');
            nameElement.textContent = `Name: ${data.name}`;

            const imageElement = document.createElement('img');
            imageElement.src = data.image;
            imageElement.alt = 'Character image';

            const votesElement = document.createElement('p');
            votesElement.textContent = `Total Votes: ${data.votes}`;

            // Button to add votes
            const addVoteButton = document.createElement('button');
            addVoteButton.textContent = 'Add Vote';
            addVoteButton.addEventListener('click', () => {
                // Increment the number of votes and update the display
                data.votes += 1;
                votesElement.textContent = `Total Votes: ${data.votes}`;
            });

            // Clear the existing details before appending new details
            detailsElement.innerHTML = '';
            detailsElement.appendChild(nameElement);
            detailsElement.appendChild(imageElement);
            detailsElement.appendChild(votesElement);
            detailsElement.appendChild(addVoteButton);
        })
        .catch(error => {
            console.error('Error fetching animal details:', error);
        });
}

// Function to make a GET request to retrieve the list of animal names
fetch('http://localhost:3000/characters')
    .then(response => response.json())
    .then(data => {
        const animalListElement = document.getElementById('animal-list');

        data.forEach(animal => {
            const animalName = animal.name;
            const listItem = document.createElement('li');
            listItem.textContent = animalName;
            listItem.setAttribute('data-id', animal.id); // Add data-id attribute for identifying the animal
            animalListElement.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching animal names:', error);
    });

// Add event listener for animal names
const animalListElement = document.getElementById('animal-list');
animalListElement.addEventListener('click', event => {
    if (event.target.tagName === 'LI') {
        const animalId = event.target.getAttribute('data-id');
        fetchAnimalDetails(animalId);
    }
});

