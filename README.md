# MarieTeam Website

![](/public/og.png)

MarieTeam Projects is a series of three distinct school projects, each focused on building a different type of
application: a web application, a desktop application, and a mobile app.

The MarieTeam Web application implements a booking system, allowing users to select a trip, configure their seats, and
proceed to checkout. It uses a solid technical stack to achieve the intended functionality and user experience.

## 🪛 Development Stack

- `Next.js 15`
- `TailwindCSS`
- `Shadcn UI`
- `Prisma & Neon Database`
- `Auth.js` : Credentials auth & 0auth providers
- `Stripe`
- `Zod`

## ⚡Features

- Payment Gateway Integration with Stripe
- User Authentication with Auth.js
- Booking System with Prisma
- Administration dashboard with statistics data
- Crossing API to create captain logs from the mobile app

## ☑️ How can it be improved ?

- **ADMIN!** Transform the admin dashboard into a CRUD dashboard to fully manage everything
    - Manage `seatCategory`, `seatType` (create, edit, delete and read)
    - Manage `boats` (ability to edit & delete)
    - Manage `crossings` (ability to delete)
    - Manage `routes` (ability to delete)
    - Manage `pricings` (ability to create, edit & delete)
- **ADMIN!** View information about a **customer** and their reservations and manage their account & permissions

- **CUSTOMER!** Ability to download the invoice for their reservation in `/orders`
- **CUSTOMER!** Ability to cancel their reservation and get a full refund
- **CUSTOMER!** Have a map to view the route of the crossing
- **CUSTOMER!** An illustration of the boat to be able to select the seat

## 📗 How to run this project ?

To run this project on your local environment, follow the following steps :

- Clone the repository to your local machine or download the source code.
- Run the command `pnpm install` in the project directory to install the **required** dependencies
- Create a new file named `.env` in the project directory and add the variables as shown in the `.env.example` file.
- Run the command `pnpx prisma db seed` to seed the database with startup data
- Run the command `pnpm run start` to start the `production build` of the project.
- Open your internet browser and go to the following address: [http://localhost:3000](http://localhost:3000)
