import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.info("\n[DATABASE_DEBUG] Seeding database...");
  console.time("[DATABASE_DEBUG] Seeding Time")

  await prisma.boat.createMany({
    data: [
      {
        name: "Imane",
        imageUrl: "https://www.lejournaldesarchipels.com/wp-content/uploads/2023/07/la-bargi.jpg",
        length: 56,
        width: 13.25,
        speed: 9.5,
        equipment: ["Fire extinguishers", "Life Rafts", "Wifi", "Bar"]
      },
      {
        name: "Chatouilleuse",
        imageUrl: "https://www.lejournaldesarchipels.com/wp-content/uploads/2023/07/la-bargi.jpg",
        length: 56,
        width: 13.25,
        speed: 9.5,
        equipment: ["Fire extinguishers", "Life Rafts", "Wifi", "Bar"]
      },
      {
        name: "Polé",
        imageUrl: "https://assets.meretmarine.com/s3fs-public/styles/large_xl/public/images/2017-05/pole.jpg?h=52a2667e&itok=C4oN6XXY",
        length: 67,
        width: 13.25,
        speed: 12,
        equipment: ["Fire extinguishers", "Life Rafts", "Wifi", "Bar"]
      },
      {
        name: "Karihani",
        imageUrl: "https://assets.meretmarine.com/s3fs-public/styles/large_xl/public/images/2017-05/pole.jpg?h=52a2667e&itok=C4oN6XXY",
        length: 67,
        width: 13.25,
        speed: 12,
        equipment: ["Fire extinguishers", "Life Rafts", "Wifi", "Bar"]
      },
    ]
  });

  await prisma.seatCategory.createMany({
    data: [
      {name: "PASSENGER"},
      {name: "VEHICLE_UNDER_2M"},
      {name: "VEHICLE_OVER_2M"}
    ]
  })

  const seatCategories = await prisma.seatCategory.findMany();
  const boats = await prisma.boat.findMany();

  await prisma.boatCategoryCapacity.createMany({
    data: [
      {boatId: boats[0].id, categoryId: seatCategories[0].id, maxCapacity: 392},
      {boatId: boats[0].id, categoryId: seatCategories[1].id, maxCapacity: 24},
      {boatId: boats[0].id, categoryId: seatCategories[2].id, maxCapacity: 6},
      {boatId: boats[1].id, categoryId: seatCategories[0].id, maxCapacity: 392},
      {boatId: boats[1].id, categoryId: seatCategories[1].id, maxCapacity: 24},
      {boatId: boats[1].id, categoryId: seatCategories[2].id, maxCapacity: 6},
      {boatId: boats[2].id, categoryId: seatCategories[0].id, maxCapacity: 590},
      {boatId: boats[2].id, categoryId: seatCategories[1].id, maxCapacity: 16},
      {boatId: boats[2].id, categoryId: seatCategories[2].id, maxCapacity: 17},
      {boatId: boats[3].id, categoryId: seatCategories[0].id, maxCapacity: 590},
      {boatId: boats[3].id, categoryId: seatCategories[1].id, maxCapacity: 16},
      {boatId: boats[3].id, categoryId: seatCategories[2].id, maxCapacity: 17},
    ]
  })

  await prisma.seatType.createMany({
    data: [
      {name: "ADULT", description: "18 years and above", seatCategoryId: seatCategories[0].id},
      {name: "JUNIOR", description: "From 8 to 17 years", seatCategoryId: seatCategories[0].id},
      {name: "CHILD", description: "From 0 to 7 years", seatCategoryId: seatCategories[0].id},
      {name: "CAR_UNDER_4M", description: "Length inferior to 4m", seatCategoryId: seatCategories[1].id},
      {name: "CAR_UNDER_5M", description: "Length inferior to 5m", seatCategoryId: seatCategories[1].id},
      {name: "VAN", description: "Utility vehicle", seatCategoryId: seatCategories[2].id},
      {name: "TRUCK", description: "Heavy transport vehicle", seatCategoryId: seatCategories[2].id},
      {name: "CAMPING_CAR", description: "Vehicle used for camping", seatCategoryId: seatCategories[2].id},
    ]
  })

  await prisma.route.createMany({
    data: [
      {
        departurePort: "Le Palais",
        arrivalPort: "Vannes",
        distance: 25.1,
        geographicalZone: "BELLE_ILE_EN_MER"
      },
      {
        departurePort: "Vannes",
        arrivalPort: "Le Palais",
        distance: 23.7,
        geographicalZone: "BELLE_ILE_EN_MER"
      },
      {
        departurePort: "Quiberon",
        arrivalPort: "Le Palais",
        distance: 8.3,
        geographicalZone: "BELLE_ILE_EN_MER"
      },
      {
        departurePort: "Le Palais",
        arrivalPort: "Quiberon",
        distance: 9,
        geographicalZone: "BELLE_ILE_EN_MER"
      },
    ]
  })

  const routes = await prisma.route.findMany()
  const seatTypes = await prisma.seatType.findMany()

  await Promise.all(
    routes.map(async (route) => {
      await prisma.pricing.createMany({
        data: [
          {
            period: "LOW_SEASON",
            amount: 120,
            routeId: route.id,
            typeId: seatTypes[0].id,
          },
          {
            period: "LOW_SEASON",
            amount: 110,
            routeId: route.id,
            typeId: seatTypes[1].id,
          },
          {
            period: "LOW_SEASON",
            amount: 100,
            routeId: route.id,
            typeId: seatTypes[2].id,
          },
          {
            period: "LOW_SEASON",
            amount: 170,
            routeId: route.id,
            typeId: seatTypes[3].id,
          },
          {
            period: "LOW_SEASON",
            amount: 190,
            routeId: route.id,
            typeId: seatTypes[4].id,
          },
          {
            period: "LOW_SEASON",
            amount: 210,
            routeId: route.id,
            typeId: seatTypes[5].id,
          },
          {
            period: "LOW_SEASON",
            amount: 220,
            routeId: route.id,
            typeId: seatTypes[6].id,
          },
          {
            period: "LOW_SEASON",
            amount: 249,
            routeId: route.id,
            typeId: seatTypes[7].id,
          },
        ]
      })
    })
  )

  console.timeEnd("[DATABASE_DEBUG] Seeding Time")
  console.info("[DATABASE_DEBUG] Seeding completed!\n")
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })
