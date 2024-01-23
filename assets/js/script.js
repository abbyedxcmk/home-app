$(document).ready(function() {
  // This declares a global variable named globalDurationYears
  var globalDurationYears;
  // This select the element with the ID `property-items` and hides it from the user
  $('#property-items').hide();

  // Select the form with the ID "mortgage-form" and attach a submit event listener to it
  $('#mortgage-form').submit(function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // This leaves the `property-items` element itself intact but completely empty
    $('#property-items').empty();
  
    // Extract the loan amount value from the field with ID "loan-amount"
    const loanAmount = $('#loan-amount').val();
    // Extract the interest rate value from the field with ID "interest-rate"
    const interestRate = $('#interest-rate').val();
    // Extract the loan duration in years from the field with ID "duration-years"
    const durationYears = $('#duration-years').val();
    // This assigns the value of the variable durationYears to the globalDurationYears
    globalDurationYears = durationYears;
  
    // Construct the query URL for the API call, incorporating the form data
    const queryURL = `https://api.api-ninjas.com/v1/mortgagecalculator?loan_amount=${loanAmount}&interest_rate=${interestRate}&duration_years=${durationYears}`;
  
    // Call the function to fetch mortgage data from the API using the constructed URL
    fetchMortgageData(queryURL);
    //
  });

  // Declare an asynchronous function named fetchMortgageData that takes a queryURL as input
  async function fetchMortgageData(queryURL) {
    try {
      // Attempt to make an HTTP GET request to the specified queryURL
      const response = await fetch(queryURL, {
        // Set the 'X-Api-Key' header for authentication
        headers: { 'X-Api-Key': 'gximlgkfMZ/lC3Z0vfC7RQ==fVXya3H44BEju3ua' },
        // Specify the HTTP method as GET
        method: 'GET'
      });
      
      // Check if the HTTP response was successful
      if (!response.ok) {
        // If not successful, throw an error with the HTTP status code
        throw new Error(`HTTP error! status: ${response.status}`);
      };
      
      // Parse the JSON response from the API
      const result = await response.json();

      // Call a function to display the mortgage data
      displayMortgageData(result);
    // Catch any errors that occur during the request or parsing process
    } catch (error) {
      // Log the error to the console for debugging
      console.error('Error:', error);
    };
  };

  // Function to display mortgage data on the page
  function displayMortgageData(data) {
    // Log the raw data to the console for debugging purposes
    console.log(data);
    // This line extracts the monthly mortgage payment from the data object (data)
    const monthlyPayment = data.monthly_payment.mortgage;
    // This line extracts the annual mortgage payment from the data object (data)
    const annualPayment = data.annual_payment.mortgage;
    // This extracts the total interest paid from the data object
    const interestPaid = data.total_interest_paid;
    // This calculates the total number of months based on the globalDurationYears
    const months = globalDurationYears * 12;
    // Removes the `opacity-25` class and adds the `opacity-100` class
    $('.opacity-25').removeClass('opacity-25').addClass('opacity-100');
    // Formats the value of monthlyPayment as a currency amount in British Pounds
    const monthlyPaymentGBP = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(monthlyPayment);
    // Formats the value of annualPaymentGBP as a currency amount in British Pounds
    const annualPaymentGBP = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(annualPayment);
    // Formats the value of interestPaidGBP as a currency amount in British Pounds
    const interestPaidGBP = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(interestPaid);
    // Update the text content of the element with ID "monthly-payment"
    $('#monthly-payment').text(monthlyPaymentGBP);
    // Update the text content of the element with ID "annual-payment"
    $('#annual-payment').text(annualPaymentGBP);
    // Update the text content of the element with ID "total-interest-paid"
    $('#total-interest-paid').text(interestPaidGBP);
    // Update the text content of the element with ID "#months"
    $('#months').text(months);
  };

  // Select the form with the ID "property-form" and attach a submit event listener to it
  $('#property-form').submit(function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // This leaves the `property-items` element itself intact but completely empty
    $('#property-items').empty();
    // This select the element with the ID `property-items` and hides it from the user
    $('#property-items').hide();

    // Extract the city name value from the field with ID "city-name"
    const cityName = $('#city-name').val();
    // Extract the country name value from the field with ID "country-name"
    const countryName = $('#country-name').val();
  
    // Construct the query URL for the API call, incorporating the form data
    const queryURL = `https://zoopla.p.rapidapi.com/properties/list?area=${cityName}%2C%20${countryName}&category=residential&include_retirement_homes=no&include_shared_accommodation=no&listing_status=sale&order_by=age&ordering=descending&page_number=1&page_size=40`
  
    // Call the function to fetch mortgage data from the API using the constructed URL
    fetchPropertyData(queryURL);
  });

  // Declare an asynchronous function named fetchMortgageData that takes a queryURL as input
  async function fetchPropertyData(queryURL) {
    try {
      // Attempt to make an HTTP GET request to the specified queryURL
      const response = await fetch(queryURL, {
        async: true,
        crossDomain: true,
        // Specify the HTTP method as GET
        method: 'GET',
        // Set the 'X-Api-Key' header for authentication
        headers: {
          'X-RapidAPI-Key': 'b55274dc38msh79e9da6e2ff0c24p135b5cjsncb8fdf5de282',
          'X-RapidAPI-Host': 'zoopla.p.rapidapi.com'
        }
      });
      
      // Check if the HTTP response was successful
      if (!response.ok) {
        // If not successful, throw an error with the HTTP status code
        throw new Error(`HTTP error! status: ${response.status}`);
      };
      
      // Parse the JSON response from the API
      const result = await response.json();

      // Call a function to display the mortgage data
      displayPropertyData(result);
    // Catch any errors that occur during the request or parsing process
    } catch (error) {
      // Log the error to the console for debugging
      console.error('Error:', error);
    };
  };

  // Function to display property data on the page
  function displayPropertyData(data) {
    // Select the element with the ID property-items and applies the show() method
    $('#property-items').show();
    // Log the raw data to the console for debugging purposes
    console.log(data);
    
    for (i=0;i<5;i++){
      // Assigns a random integer between 0 and 39
      const i = Math.floor(Math.random() * 40);
      // Retrieves the image URL for the property at the random index i from the data.listing array
      var thumbnail = data.listing[i].image_url;
      // Retrieves the property type for the property at the random index i from the data.listing
      var propertyType = data.listing[i].property_type;
      // Retrieves the property price for the property at the random index i from the data.listing
      var propertyPrice = data.listing[i].price;
      // Retrieves the displayable address for the property at the random index i from the data.listing
      var propertyAddress = data.listing[i].displayable_address;
      // Retrieves the number of bedrooms for the property at the random index i from the data.listing
      var propertyBedroom = data.listing[i].num_bedrooms;
      // Retrieves the number of bathrooms for the property at the random index i from the data.listing
      var propertyBathroom = data.listing[i].num_bathrooms;
      // Retrieves the number of reception rooms for the property at the random index i from the data.listing
      var propertyReception = data.listing[i].num_recepts;
      // Formats the value of propertyPrice as a currency amount in British Pounds
      const propertyPriceGBP = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(propertyPrice);
      
      // Creating the main property container
      var propertyItemDiv = $('<div class="col-12 col-md-10 mx-md-auto mt-3 p-3 d-flex flex-lg-column justify-content-between rounded-3 bg-white shadow-lg"></div>');

      // Adding the image thumbnail
      var propertyThumbnailDiv = $('<div class="col-4 col-lg-12 my-auto"></div>').appendTo(propertyItemDiv);
      $('<div id="property-thumbnail-' + i + '" class="bg-transparent w-100 h-100 rounded-3"></div>').html('<img src="' + thumbnail + '" class="img-fluid rounded-3" />').appendTo(propertyThumbnailDiv);

      // Adding the property information
      var propertyInfo = $('<div id="property-item-' + i + '" class="col-7 col-lg-12 mt-lg-2"></div>').appendTo(propertyItemDiv);
      $('<p id="property-type-' + i + '"></p>').text(propertyType).appendTo(propertyInfo);
      $('<h2 id="property-price-' + i + '"></h2>').text(propertyPriceGBP).appendTo(propertyInfo);
      $('<p id="property-address-' + i + '"></p>').text(propertyAddress).appendTo(propertyInfo);

      // Adding property features
      var propertyFeatures = $('<ul class="list-unstyled d-flex my-auto"></ul>').appendTo(propertyInfo);
      $('<li><img src="./assets/imgs/bedroom.png" height="24px" alt=""></li>').appendTo(propertyFeatures);
      $('<li class="ms-2"><p id="property-bedroom-' + i + '" class="fs-5"></p></li>').text(propertyBedroom).appendTo(propertyFeatures);
      $('<li><img src="./assets/imgs/bathroom.png" class="ms-4" height="24px" alt=""></li>').appendTo(propertyFeatures);
      $('<li class="ms-2"><p id="property-bathroom-' + i + '" class="fs-5"></p></li>').text(propertyBathroom).appendTo(propertyFeatures);
      if (propertyReception > 0) {
        $('<li id="reception-img-li-' + i + '"><img src="./assets/imgs/reception.png" class="ms-4" height="24px" alt=""></li>').appendTo(propertyFeatures);
        $('<li class="ms-2"><p id="property-reception-' + i + '" class="fs-5"></p></li>').text(propertyReception).appendTo(propertyFeatures);
      }

      // 
      $('#property-items').append(propertyItemDiv);
    };
  };

  // async function fetchGuardianData() {
  //   try {
  //     const response = await fetch('https://content.guardianapis.com/search?order-by=relevance&show-elements=image&q=mortgage&api-key=08d6818f-52da-42a3-b45d-a088003bde02');

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const result = await response.json();

  //     console.log(result);
  //     // $('#monthly-payment').text(`Monthly: ${result.monthly_payment.mortgage}`);
  //     // $('#annual-payment').text(`Annual: ${result.annual_payment.mortgage}`);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   };
  // };

  // //

  // fetchGuardianData();   

});

