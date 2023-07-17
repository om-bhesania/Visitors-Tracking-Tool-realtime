// Create a new session if one doesn't exist
if (!sessionStorage.getItem("visitorId")) {
  const visitorId = Math.random().toString(36).substr(2, 9);
  sessionStorage.setItem("visitorId", visitorId);
}



function getBrowserName  () {
  let browserInfo = navigator.userAgent;
  let browser;
  if (browserInfo.includes('Opera') || browserInfo.includes('Opr')) {
    browser = 'Opera';
  } else if (browserInfo.includes('Edg')) {
    browser = 'Edge';
  } else if (browserInfo.includes('Chrome')) {
    browser = 'Chrome';
  } else if (browserInfo.includes('Safari')) {
    browser = 'Safari';
  } else if (browserInfo.includes('Firefox')) {
    browser = 'Firefox'
  } else {
    browser = 'unknown'
  }
    return browser;
}


// Get visitor details
const visitorId = sessionStorage.getItem("visitorId");
const browser = navigator.userAgent;
const device = navigator.platform;
const date = new Date();

// Get the visitor's IP address
fetch("https://ipapi.co/json")
  .then((response) => response.json())
  .then((data) => {
    const ipAddress = data.ip;
    const city = data.city;
    const country = data.country_name;
    console.log("Visitor IP address:", ipAddress);
    console.log('Visitor location:', city + ', ' + country);

    // fetch('https://ipapi.co/${ipAddress}/json/')
        // .then((response) => response.json())
        // .then((data) => {
          // const city = data.city;
          // const country = data.country_name;
        // console.log('Visitor location:', city + ', ' + country);

// Check if visitor is unique
const isUniqueVisitor = sessionStorage.getItem("isUniqueVisitor") === null;
if (isUniqueVisitor) {
  // Set session flag to indicate that visitor is no longer unique
  sessionStorage.setItem("isUniqueVisitor", false);
  
  // Send notification to Discord with visitor details and page URL
  const url = window.location.href;
  const message = `@everyone New unique visitor!\n\nDetails:\n- Visitor ID: ${visitorId}\n- Browser name: ${getBrowserName()}\n-  Device: ${device}\n- IP address: ${ipAddress}\n- Country: ${country}\n- City: ${city}\n- Date: ${date}\n- Current Page: ${url}`;
  const webhookUrl = "https://discord.com/api/webhooks/{WEBHOOK_URL}";
  fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: message,
    disableLinkPreview: true
     
    })
  });
} else {
  // Send notification to Discord with visitor details and page URL
  const url = window.location.href;
  const message = `#recurring Visitor!\n\nDetails:\n- Visitor ID: ${visitorId}\n- Browser name: ${getBrowserName()}\n-  Device: ${device}\n- IP address: ${ipAddress}\n- Country: ${country}\n- City: ${city}\n- Date: ${date}\n- Current Page: ${url}`;
  const webhookUrl = "https://discord.com/api/webhooks/{WEBHOOK_URL};
  fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: message,
      disableLinkPreview: true
    })
    });
    
  }
})
.catch((error) => console.error("Error getting IP address:", error));
