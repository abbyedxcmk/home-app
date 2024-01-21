$(document).ready(function() {
    //
    $('#property-items').hide();
  
    // Select the form with the ID "mortgage-form" and attach a submit event listener to it
    $('#mortgage-form').submit(function(event) {
      // Prevent the default form submission behavior
      event.preventDefault();
    
      // Extract the loan amount value from the field with ID "loan-amount"
      const loanAmount = $('#loan-amount').val();
      // Extract the interest rate value from the field with ID "interest-rate"
      const interestRate = $('#interest-rate').val();
      // Extract the loan duration in years from the field with ID "duration-years"
      const durationYears = $('#duration-years').val();
      //
    
      // Construct the query URL for the API call, incorporating the form data
      const queryURL = `https://api.api-ninjas.com/v1/mortgagecalculator?loan_amount=${loanAmount}&interest_rate=${interestRate}&duration_years=${durationYears}`;
    
      // Call the function to fetch mortgage data from the API using the constructed URL
      fetchMortgageData(queryURL);
      
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
      // Update the text content of the element with ID "monthly-payment"
      $('#monthly-payment').text(`Monthly: ${data.monthly_payment.mortgage}`);
      // Update the text content of the element with ID "annual-payment"
      $('#annual-payment').text(`Annual: ${data.annual_payment.mortgage}`);
      // Update the text content of the element with ID "total-interest-paid"
      $('#total-interest-paid').text(`Total Interest Paid: ${data.total_interest_paid}`);
    };
  
    // Select the form with the ID "mortgage-form" and attach a submit event listener to it
    $('#property-form').submit(function(event) {
      // Prevent the default form submission behavior
      event.preventDefault();
      //
      $('#property-items').hide();
  
      // Extract the loan amount value from the field with ID "loan-amount"
      const cityName = $('#city-name').val();
      // Extract the interest rate value from the field with ID "interest-rate"
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
  
    // Function to display mortgage data on the page
    function displayPropertyData(data) {
      $('#property-items').show();
      // Log the raw data to the console for debugging purposes
      console.log(data);
  
      // // Update the text content of the element with ID "monthly-payment"
      // $('#property-type-0').text(`${data.listing[1].property_type}`);
      // // Update the text content of the element with ID "annual-payment"
      // $('#property-price-0').text(`${data.listing[1].price}`);
      // // Update the text content of the element with ID "total-interest-paid"
      // $('#property-address-0').text(`${data.listing[1].displayable_address}`);
      // //
      // $('#property-thumbnail-0').html('<img src="' + thumbnail0 + '" class="img-fluid rounded-3" />');
      // //
      // $('#property-bedroom-0').text(`${data.listing[1].num_bedrooms}`);
      // //
      // $('#property-bathroom-0').text(`${data.listing[1].num_bathrooms}`);
      // //
      // $('#property-reception-0').text(`${data.listing[1].num_recepts}`);
  
      // Iterates through forecast data
      for (i=0;i<4;i++){
        var thumbnail = data.listing[i].image_url;
        var propertyType = data.listing[i].property_type;
        var propertyPrice = data.listing[i].price;
        var propertyAddress = data.listing[i].displayable_address;
        var propertyBedroom = data.listing[i].num_bedrooms;
        var propertyBathroom = data.listing[i].num_bathrooms;
        var propertyReception = data.listing[i].num_recepts;
        
        $("#property-type-"+i).text(propertyType);
        $("#property-price-"+i).text(propertyPrice);
        $("#property-address-"+i).text(propertyAddress);
        $("#property-thumbnail-"+i).html('<img src="' + thumbnail + '" class="img-fluid rounded-3" />');
        $("#property-bedroom-"+i).text(propertyBedroom);
        $("#property-bathroom-"+i).text(propertyBathroom);
        $("#property-reception-"+i).text(propertyReception);
  
        // localStorage.setItem(`forecastData${i}`, JSON.stringify({
        //   forDate: forDate,
        //   iconCode: iconCode,
        //   forIconURL: forIconURL,
        //   forTemp: forTemp,
        //   forHumidity: forHumidity,
        //   forWind: forWind
        
      };
    };
  
  
    // const settings = {
    //   async: true,
    //   crossDomain: true,
    //   url: 'https://real-time-news-data.p.rapidapi.com/search?query=Mortgage&country=GB&lang=en&time_published=7d',
    //   method: 'GET',
    //   headers: {
    //     'X-RapidAPI-Key': 'b55274dc38msh79e9da6e2ff0c24p135b5cjsncb8fdf5de282',
    //     'X-RapidAPI-Host': 'real-time-news-data.p.rapidapi.com'
    //   }
    // };
    
    // $.ajax(settings).done(function (response) {
    //   console.log(response);
    // });
  
  });
  
      
  
    //
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
    
    // // Chamada da função para realizar a requisição
    // fetchGuardianData();    
  
      // //
      // $('<li>').append(
      //   $('<img>').attr({
      //     src: './assets/imgs/bedroom.png',
      //     height: '24px',
      //     alt: 'bedroom'
      //   })
      // ).appendTo('ul.list-unstyled');
      // //
      // $('<li>').append(
      //   $('<p>').attr('id', 'property-bedroom-0').addClass('ms-2 fs-5').text(`${data.listing[0].num_bedrooms}`)
      // ).appendTo('ul.list-unstyled');
      // //
  
      // //
      // $('<li>').append(
      //   $('<img>').attr({
      //     src: './assets/imgs/bathroom.png',
      //     class: 'ms-4',
      //     height: '24px',
      //     alt: 'bathroom'
      //   })
      // ).appendTo('ul.list-unstyled');
      // //
      // $('<li>').append(
      //   $('<p>').attr('id', 'property-bathroom-0').addClass('ms-2 fs-5').text(`${data.listing[0].num_bathrooms}`)
      // ).appendTo('ul.list-unstyled');
      // //
  
  
     // //
      // $('<li>').append(
      //   $('<img>').attr({
      //     src: './assets/imgs/reception.png',
      //     class: 'ms-4',
      //     height: '24px',
      //     alt: 'reception'
      //   })
      // ).appendTo('ul.list-unstyled');
      // //
      // $('<li>').append(
      //   $('<p>').attr('id', 'property-reception-0').addClass('ms-2 fs-5').text(`${data.listing[0].num_recepts}`)
      // ).appendTo('ul.list-unstyled');
      // //