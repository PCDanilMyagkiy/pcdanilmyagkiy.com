# pcdanilmyagkiy.com - Personal Portfolio Website

Personal portfolio website built with the MERN stack, GSAP and other technologies.
This project was built from scratch as both a personal portfolio and a demonstration of my frontend and backend development skills.



## Tech Stack


### Frontend

- React
- Vite
- Sass
- GSAP
- Lenis
- Axios
- vite-plugin-svgr


### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- cookie-parser
- JWT (JSON Web Token)
- bcrypt
- Zod
- Nodemailer



## Features

- Responsive frontend
- Dynamic scaling dendent on screen proportions
- GSAP animated interfaces
    - SplitText text animations
    - ScrollTrigger scroll-controlled animations
- Authentication
- Email verification
- JWT-based authentication
- Account management
    - Name changes
    - Email changes
    - Password changes
    - Account deletion
- Calculator history
- Per-email rate limiting
- IP-based rate limiting
- Manual IP banning



## Architecture

<img width="1243" height="1535" alt="projectScheme" src="https://github.com/user-attachments/assets/075de442-9cd8-479d-bb11-04f01f5a9e3e" />




### Authentication
Uses short-lived access tokens and long-lived refresh tokens stored in HTTP-only cookies. Refresh tokens are persisted in MongoDB and can be revoked server-side. Each time an operation tries to proceed with expried access token it causes a new one to be issued along with refresh token rotation.

### Database

MongoDB stores account data, refresh tokens, calculator histories, email verification requests and traffic-limiting information.

### Zod Schemas

Uses shared Zod Schemas for frontend/backend validation to keep it consistent and free from duplicate logic.





## Environment Variables

See ".env.example"



## License

This project is licensed under the MIT License.
