import { PrismaService } from '../prisma.service';
import * as fs from 'fs';
import csv from 'csv-parser';

const prisma = new PrismaService();
async function fcsvSeed() {
  const csvFilePath =
    'src/insusrance/infra/database/prisma/seed/occupations.csv';
  const result = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => {
      result.push(data);
    })
    .on('end', async () => {
      for (const row of result) {
        const { Code, Name, Active, Factor } = row;

        await prisma.occupation.create({
          data: {
            code: Code,
            name: Name,
            active: Boolean(Active),
            factor: parseFloat(Factor),
          },
        });
      }
    });
}

async function seedDataFromJSON() {
  const jsonFilePath = 'src/insusrance/infra/database/prisma/seed/ages.json';

  try {
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    for (const item of jsonData) {
      await prisma.ageFactor.create({
        data: {
          age: item.age,
          factor: item.factor,
        },
      });
    }

    console.log('Seed completed.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

fcsvSeed();
seedDataFromJSON();
