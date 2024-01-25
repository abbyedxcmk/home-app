// Load on webpage loading
$(document).ready(function() {

  // Declare a global variable globalDurationYears
  var globalDurationYears;

  // Define an empty array to store the mortgage data
  var mortgageArray = [];

  // Define an empty array to store the results data
  var resultsArray = [];

  // Define an empty array to store the results data
  var propertyArray = [];

  // Assign the value of London to cityName
  var cityName = 'London';

  // Assign the value of England to countryName
  var countryName = 'England';

  // Construct the query URL for the API call, incorporating the form data
  var queryURL = `https://zoopla.p.rapidapi.com/properties/list?area=${cityName}%2C%20${countryName}&category=residential&include_retirement_homes=no&include_shared_accommodation=no&listing_status=sale&order_by=age&ordering=descending&page_number=1&page_size=40`

  // checks for previously stored mortgage data in localStorage
  const storedMortgageData = localStorage.getItem('mortgageArray');

  // executes if mortgage data was found
  if (storedMortgageData) {
    // parses the stored JSON string into a JavaScript object
    const parsedData = JSON.parse(storedMortgageData);

    // Updates the mortgage form values
    $('#loan-amount').val(parsedData.loanAmount);
    $('#interest-rate').val(parsedData.interestRate);
    $('#duration-years').val(parsedData.durationYears);
  };

  // checks for previously stored results data in localStorage
  const storedResultsData = localStorage.getItem('resultsArray');

  // executes if results data was found
  if (storedResultsData) {
    // parses the stored JSON string into a JavaScript object
    const parsedData = JSON.parse(storedResultsData);

    // Updates the results form values
    $('#monthly-payment').text(parsedData.monthlyPaymentGBP);
    $('#annual-payment').text(parsedData.annualPaymentGBP);
    $('#total-interest-paid').text(parsedData.interestPaidGBP);
    $('#months').text(parsedData.months);
  };

  // checks for previously stored property data in localStorage
  const storedPropertyData = localStorage.getItem('propertyArray');

  // executes if property data was found
  if (storedPropertyData) {
    // parses the stored JSON string into a JavaScript object
    const parsedData = JSON.parse(storedPropertyData);

    // Updates the property form values
    $('#city-name').val(parsedData.cityName);
    $('#country-name').val(parsedData.countryName);

    cityName = parsedData.cityName;
    cityName = parsedData.cityName;

    // Construct the query URL for the API call, incorporating the form data
    var queryURL = `https://zoopla.p.rapidapi.com/properties/list?area=${cityName}%2C%20${countryName}&category=residential&include_retirement_homes=no&include_shared_accommodation=no&listing_status=sale&order_by=age&ordering=descending&page_number=1&page_size=40`
  };

  // Select the form with the ID "mortgage-form" and add submit event listener
  $('#mortgage-form').submit(function(event) {

    // Prevent the default form submission behavior
    event.preventDefault();

    // Clear the `property-items` element 
    $('#property-items').empty();
  
    // Extract the loan amount value from the field with ID "loan-amount"
    var loanAmount = $('#loan-amount').val();

    // Extract the interest rate value from the field with ID "interest-rate"
    var interestRate = $('#interest-rate').val();

    // Extract the loan duration in years from the field with ID "duration-years"
    var durationYears = $('#duration-years').val();

    // Assign the value of durationYears to globalDurationYears
    globalDurationYears = durationYears;
  
    // Construct the query URL for the API call, incorporating the form data
    var queryURL = `https://api.api-ninjas.com/v1/mortgagecalculator?loan_amount=${loanAmount}&interest_rate=${interestRate}&duration_years=${durationYears}`;
  
    // Call the function to fetch mortgage data from the API using the constructed URL
    fetchMortgageData(queryURL);

    // Create an object to store the mortgage data
    const mortgageData = {
      loanAmount: loanAmount,
      interestRate: interestRate,
      durationYears: durationYears
    };

    // Store the mortgageArray in localStorage
    localStorage.setItem('mortgageArray', JSON.stringify(mortgageData));
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

    // Extract the monthly mortgage payment from the data object (data)
    const monthlyPayment = data.monthly_payment.mortgage;

    // Extract the annual mortgage payment from the data object (data)
    const annualPayment = data.annual_payment.mortgage;

    // Extract the total interest paid from the data object
    const interestPaid = data.total_interest_paid;

    // Calculates the total number of months based on the globalDurationYears
    const months = globalDurationYears * 12;

    // Remove the `opacity-25` class and add the `opacity-100` class
    $('.opacity-25').removeClass('opacity-25').addClass('opacity-100');

    // Format the value of monthlyPayment as a currency amount in British Pounds
    const monthlyPaymentGBP = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(monthlyPayment);

    // Format the value of annualPaymentGBP as a currency amount in British Pounds
    const annualPaymentGBP = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(annualPayment);

    // Format the value of interestPaidGBP as a currency amount in British Pounds
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

    // Create an object to store the results data
    const resultsData = {
      monthlyPaymentGBP: monthlyPaymentGBP,
      annualPaymentGBP: annualPaymentGBP,
      interestPaidGBP: interestPaidGBP,
      months: months
    };

    // Store the mortgageArray in localStorage
    localStorage.setItem('resultsArray', JSON.stringify(resultsData));
  };

  // Call the function to fetch property data from the API using the constructed URL
  fetchPropertyData(queryURL);

  // Select the form with the ID "property-form" and attach a submit event listener to it
  $('#property-form').submit(function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Clear the `property-items` element 
    $('#property-items').empty();

    // Extract the city name value from the field with ID "city-name"
    cityName = $('#city-name').val();

    // Extract the country name value from the field with ID "country-name"
    countryName = $('#country-name').val();
  
    // Construct the query URL for the API call, incorporating the form data
    queryURL = `https://zoopla.p.rapidapi.com/properties/list?area=${cityName}%2C%20${countryName}&category=residential&include_retirement_homes=no&include_shared_accommodation=no&listing_status=sale&order_by=age&ordering=descending&page_number=1&page_size=40`
  
    // Call the function to fetch mortgage data from the API using the constructed URL
    fetchPropertyData(queryURL);

    // Create an object to store the property data
    const propertyData = {
      cityName: cityName,
      countryName: countryName
    };

    // Store the propertyArray in localStorage
    localStorage.setItem('propertyArray', JSON.stringify(propertyData));  
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
          'X-RapidAPI-Key': 'ef8b0bca27mshbd83f2910208d53p113febjsnb8d369d5328f',
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
    
    // Display random property ads from the api
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

      // Retrieves the property URL for the property at the random index i from the data.listing
      var propertyUrl = data.listing[i].details_url;
      
      // Formats the value of propertyPrice as a currency amount in British Pounds
      const propertyPriceGBP = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(propertyPrice);
      
      // Creating the main property container
      var propertyItemDiv = $('<div class="col-12 my-2 p-3 d-flex flex-column flex-sm-row rounded-3 bg-white shadow-lg"></div>');

      // Adding the image thumbnail with a link
      var propertyThumbnailDiv = $('<a href="' + propertyUrl + '" class="col-12 col-sm-4 my-auto custom-linked" target="_blank"><img src="' + thumbnail + '" class="img-fluid rounded-3" /></a>');
      propertyThumbnailDiv.appendTo(propertyItemDiv);

      // Adding the property information
      var propertyInfo = $('<div id="property-item-' + i + '" class="col-12 col-sm-8 mt-2 mt-sm-0 ps-3 pe-3"></div>').appendTo(propertyItemDiv);
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

      // Append property info to property items element
      $('#property-items').append(propertyItemDiv);
    };
  };

  // Declares an asynchronous function called fetchRealTimeNewsData()
  async function fetchRealTimeNewsData() {
    const settings = {
      async: true,
      crossDomain: true,
      url: 'https://real-time-news-data.p.rapidapi.com/search?query=MORTGAGE&country=GB&lang=en&time_published=7d',
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ef8b0bca27mshbd83f2910208d53p113febjsnb8d369d5328f',
        'X-RapidAPI-Host': 'real-time-news-data.p.rapidapi.com'
      }
    };
    
    // Asynchronous HTTP request to a server using the jQuery AJAX API
    $.ajax(settings).done(function (response) {
      // Call a function to display the real time news data
      displayRealTimeNewsData(response);
    });
  };
  
  fetchRealTimeNewsData();

  // Non-asynchronous function called displayRealTimeNewsData()
  function displayRealTimeNewsData(response) {

    // Extracts the JSON data from the response object and stores it in a JavaScript array
    const array = response.data;
    // Creates an empty array called firstSet
    const firstSet = [];

    for (let i = 0; i < 11; i++) {
      // Generates a random index between 0 and the length of the array
      const index = Math.floor(Math.random() * array.length);

      // Adds the element at the specified index in the array to the firstSet array
      firstSet.push(array[index]);

      // Removes the element at the specified index in the array
      array.splice(index, 1);

      // Retrieves the published datetime for the news at the random index i
      var newsItems0Date = firstSet[i].published_datetime_utc;

      // Retrieves the title for the news at the random index i
      var newsItems0Title = firstSet[i].title;

      // Retrieves the link for the news at the random index i
      var newsItems0Link = firstSet[i].link;

      // Declares a constant called date and assigns it the value of the newsItems0Date
      const date0 = newsItems0Date;

      // Formats the date variable using the moment library
      const formattedDate0 = moment(date0).format("DD-MM-YYYY HH:mm");
      
      // Creates a new HTML element using jQuery and assigns it to the newsItemDiv
      var newsItemDiv = $('<div class="col-12 p-3 mb-3 overflow-hidden rounded-3 bg-white shadow-lg"></div>');

      // Adding the news information
      var newsItemInfo = $('<div id="news-item-' + i + '" class="col-12"></div>').appendTo(newsItemDiv);
      $('<p id="news-published-date-' + i + '"></p>').text(formattedDate0).appendTo(newsItemInfo);
      $('<a href="' + newsItems0Link + '" id="news-title-' + i + '" class="fs-5 custom-text text-decoration-none"></a>').text(newsItems0Title).appendTo(newsItemInfo);

      // Append news info to #news-items-0
      $('#news-items-0').append(newsItemDiv);
    };
  };
});