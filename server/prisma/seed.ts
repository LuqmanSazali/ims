import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.inventory.createMany({
    data: [
      { name: 'Battery', quantity: 10 },
      { name: 'Motor', quantity: 5 },
      { name: 'Propeller', quantity: 20 },
      { name: 'Resistor 100Ω', quantity: 150 },
      { name: 'Capacitor 10µF', quantity: 100 },
      { name: 'LED Red', quantity: 200 },
      { name: 'LED Blue', quantity: 180 },
      { name: 'Arduino Uno', quantity: 15 },
      { name: 'Raspberry Pi 4', quantity: 8 },
      { name: 'Breadboard', quantity: 25 },
      { name: 'USB-C Cable', quantity: 45 },
      { name: 'HDMI Cable', quantity: 30 },
      { name: 'Jumper Wires', quantity: 500 },
      { name: 'Power Adapter 5V', quantity: 20 },
      { name: 'Ethernet Cable', quantity: 35 },
      { name: 'Temperature Sensor', quantity: 40 },
      { name: 'Ultrasonic Sensor', quantity: 25 },
      { name: 'Motion Sensor', quantity: 30 },
      { name: 'Light Sensor', quantity: 50 },
      { name: 'Pressure Sensor', quantity: 15 },
      { name: 'Soldering Iron', quantity: 5 },
      { name: 'Multimeter', quantity: 7 },
      { name: 'Wire Stripper', quantity: 10 },
      { name: 'Screwdriver Set', quantity: 12 },
      { name: 'Heat Shrink Tubing', quantity: 100 },
      { name: 'Cooling Fan', quantity: 18 },
      { name: 'Heat Sink', quantity: 40 },
      { name: 'Mounting Screws', quantity: 500 },
      { name: 'Cable Ties', quantity: 300 },
      { name: 'Electrical Tape', quantity: 25 },
    ],
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
