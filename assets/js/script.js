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

});

