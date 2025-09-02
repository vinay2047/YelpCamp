# YelpCamp  

YelpCamp is a full-stack web application where users can create, browse, review, and manage campgrounds. It includes user authentication, authorization, and a review system.  

🔗 **Live Demo:** [YelpCamp on Render](https://yelpcamp-8fp6.onrender.com)  

---

## Features  
- User authentication & authorization  
- Create, edit, and delete campgrounds  
- Add reviews and ratings for campgrounds  
- Responsive design with Bootstrap  
- Secure forms & data validation  
- MongoDB Atlas integration  
- Cloud image storage with Cloudinary  
- Map integration with MapTiler  

---

## Tech Stack  
- **Frontend:** EJS, Bootstrap, JavaScript  
- **Backend:** Node.js, Express  
- **Database:** MongoDB Atlas  
- **Authentication:** Passport.js  
- **Image Hosting:** Cloudinary  
- **Maps:** MapTiler  
- **Deployment:** Render  

---

## Getting Started  

1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/yelpcamp.git
   cd yelpcamp
Install dependencies

bash
Copy code
npm install
Create a .env file in the root directory and add the following:

env
Copy code
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret

MAPTILER_API_KEY=your_maptile_api_key

DB_URL=your_mongodb_connection_string
SECRET=your_session_secret
Run the app

bash
Copy code
node app.js
Visit http://localhost:3000 in your browser.

Acknowledgements
This project was originally created as part of Colt Steele’s Web Developer Bootcamp.
I have customized and deployed my own version to better understand full-stack development.
