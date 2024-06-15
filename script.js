document.addEventListener('DOMContentLoaded', function() {
    let days = [
      { 
        title: 'Day 1: Trekking',
        activities: [],
        placesToVisit: 'Rupse Waterfall - Marpha Village'
      },
      { 
        title: 'Day 2: Beach Day',
        activities: [],
        placesToVisit: 'Johmson Bazar - Dhumba Lake - Kagbeni'
      },
      { 
        title: 'Day 3: Sightseeing in Nepal, Mustang',
        activities: [],
        placesToVisit: 'Chusang - China Boarder'
      }
    ];
  
    const fixedPackageCost = 230;
    let additionalActivitiesCost = 0;
    let totalCost = fixedPackageCost;
    let isFirstBooking = true; // Flag to track if it's the first booking
    const discountAmount = 50;
  
    function calculateAdditionalActivitiesCost() {
      let cost = 0;
      days.forEach(day => {
        day.activities.forEach(activity => {
          switch (activity) {
            case 'Rafting':
              cost += 30;
              break;
            case 'Jungle Safari':
              cost += 40;
              break;
            default:
              break;
          }
        });
      });
      return cost;
    }
  
    function updateAdditionalActivitiesSidebar() {
      const additionalActivitiesList = document.getElementById('additional-activities-list');
      additionalActivitiesList.innerHTML = '';
  
      days.forEach(day => {
        day.activities.forEach(activity => {
          const activityItem = document.createElement('li');
          activityItem.textContent = `${activity} (Cost: $${getActivityCost(activity).cost})`;
          activityItem.classList.add('additional-activity-item');
          additionalActivitiesList.appendChild(activityItem);
        });
      });
  
      additionalActivitiesCost = calculateAdditionalActivitiesCost();
      totalCost = fixedPackageCost + additionalActivitiesCost;
  
      document.getElementById('package-cost').textContent = `Package Cost: $${fixedPackageCost}`;
      document.getElementById('additional-activity-cost').textContent = `Additional Activities Cost: $${additionalActivitiesCost}`;
      document.getElementById('total-cost').textContent = `Total Cost: $${totalCost}`;
  
      document.getElementById('cost-summary').style.display = 'block';
      document.getElementById('submit-button-container').style.display = 'block';
    }
  
    function getActivityCost(activity) {
      switch (activity) {
        case 'Rafting':
          return { cost: 30 };
        case 'Jungle Safari':
          return { cost: 40 };
        default:
          return { cost: 0 };
      }
    }
  
    function applyDiscount() {
      const finalCost = totalCost - (isFirstBooking ? discountAmount : 0);
      document.getElementById('total-cost').textContent = `Total Cost: $${totalCost}`;
      
      if (isFirstBooking) {
        document.getElementById('discount').style.display = 'block';
        document.getElementById('discount').textContent = `Discount for First Booking: $${discountAmount}`;
        isFirstBooking = false; // Set isFirstBooking to false after applying discount for the first time
      }
  
     
  
      // Show the payment button and final cost
      document.getElementById('payment-button-container').style.display = 'block';
      document.getElementById('final-cost-value').textContent = `$${finalCost}`;
  
      // Congratulate the user for their first booking
      if (isFirstBooking) {
        const congratulationMessage = document.createElement('p');
        congratulationMessage.textContent = 'Congratulations! This is your first booking with us. Enjoy the discount!';
        congratulationMessage.style.color = '#4CAF50'; // Green color for emphasis
        document.getElementById('cost-summary').appendChild(congratulationMessage);
      }
    }
  
    function generateDaySections() {
      const container = document.querySelector('.container');
      const packageTitle = document.getElementById('package-title');
      
      packageTitle.textContent = `${days.length}-Day Holiday Package`;
  
      container.innerHTML = '';
  
      days.forEach((day, index) => {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.id = `day${index + 1}`;
  
        const dayTitle = document.createElement('h2');
        dayTitle.textContent = day.title;
        dayDiv.appendChild(dayTitle);
  
        const placesToVisitLabel = document.createElement('label');
        placesToVisitLabel.textContent = 'Places to Visit:';
        placesToVisitLabel.classList.add('label');
        dayDiv.appendChild(placesToVisitLabel);
  
        const placesToVisit = document.createElement('p');
        placesToVisit.textContent = day.placesToVisit;
        placesToVisit.classList.add('places-to-visit');
        dayDiv.appendChild(placesToVisit);
  
        const highlightPlaces = day.placesToVisit.split(' - ');
        highlightPlaces.forEach(place => {
          const regex = new RegExp(place.trim(), 'gi');
          placesToVisit.innerHTML = placesToVisit.innerHTML.replace(regex, `<span class="highlight">${place}</span>`);
        });
  
        const activitiesList = document.createElement('ul');
        activitiesList.id = `activities-day${index + 1}`;
        const activitySelect = document.createElement('select');
        activitySelect.classList.add('select-input');
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select Activity';
        activitySelect.appendChild(defaultOption);
  
        const raftingOption = document.createElement('option');
        raftingOption.value = 'Rafting';
        raftingOption.textContent = 'Rafting (Cost: $30 - Additional charges apply)';
  
        const jungleSafariOption = document.createElement('option');
        jungleSafariOption.value = 'Jungle Safari';
        jungleSafariOption.textContent = 'Jungle Safari (Cost: $40 - Additional charges apply)';
  
        activitySelect.appendChild(defaultOption);
        activitySelect.appendChild(raftingOption);
        activitySelect.appendChild(jungleSafariOption);
  
        const activityItem = document.createElement('li');
        activityItem.appendChild(activitySelect);
        activitiesList.appendChild(activityItem);
        dayDiv.appendChild(activitiesList);
  
        const addActivityButton = document.createElement('button');
        addActivityButton.textContent = 'Add Activity';
        addActivityButton.classList.add('add-activity-button');
        addActivityButton.dataset.dayIndex = index;
        dayDiv.appendChild(addActivityButton);
  
        const activityMessage = document.createElement('p');
        activityMessage.classList.add('activity-message');
        dayDiv.appendChild(activityMessage);
  
        container.appendChild(dayDiv);
      });
  
      days.forEach((day, index) => {
        document.querySelector(`#day${index + 1} .add-activity-button`).addEventListener('click', function() {
          const selectedActivity = document.querySelector(`#day${index + 1} .select-input`).value;
          if (selectedActivity) {
            day.activities.push(selectedActivity);
            const activityCost = getActivityCost(selectedActivity).cost;
            document.querySelector(`#day${index + 1} .activity-message`).textContent = `${selectedActivity} added. Cost: $${activityCost}`;
            updateAdditionalActivitiesSidebar();
          }
        });
      });
  
      updateAdditionalActivitiesSidebar();
    }
  
    document.getElementById('submit-button').addEventListener('click', function() {
      applyDiscount();
    });
  
    document.getElementById('pay-button').addEventListener('click', function() {
      alert('Payment processed successfully!');
    });
  
    generateDaySections();
  });
  