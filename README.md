
# MarieTeam Website

![](/public/marieteam.png)

MarieTeam Projects is a series of three distinct school projects, each focused on building a different type of application: a web application, a desktop application, and a mobile app.

The MarieTeam Web application implements a booking system, allowing users to select a trip, configure their seats, and proceed to checkout. It uses a solid technical stack to achieve the intended functionality and user experience.

## 🪛 Development Stack

- `Next.js 14`
- `TailwindCSS`
- `Shadcn UI`
- `Prisma & Neon Database`
- `Auth.js`
- `Stripe`
- `Zod`

## ⚡Features 

- Payment Gateway Integration with Stripe
- User Authentication with Auth.js
- Booking System with Prisma
- Administration dashboard with statistics data

## 🧠 What I learned ?

### 💰 Stripe Integration:

- I have learned how to set up and create a Stripe checkout Session. I have also implemented an API route to received the metadata from the checkout session and update the user's payment status in the database.

### ✅ Unit Testing:



## 🔍 How can it be improved ?

- Make the admin dashboard like a CRUD dashboard
- Have a map to view the route of the crossing
- An illustration of the boat to be able to select the seat

## 📗 How to run this project ?
To run this project on your local environment, follow the following steps :
- Clone the repository to your local machine or download the source code.
- Run the command `npm install` in the project directory to install the **required** dependencies
- Create a new file named `.env` in the project directory and add the following environment variables:

```
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
DATABASE_URL=
NEXT_PUBLIC_SERVER_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

- Run the command `npm run start` to start the `production build` of the project.
- Open your internet browser and go to the following address: [http://localhost:3000](http://localhost:3000)
