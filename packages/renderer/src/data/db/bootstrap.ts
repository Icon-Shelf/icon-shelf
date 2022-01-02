import type { IconShelfDatabase } from './index';

export const bootstrapDb = (db: IconShelfDatabase) => {
  db.on('populate', function () {
    // Init your DB with some default icons:
    // db.icons.bulkAdd([
    //   {
    //     id: 1,
    //     name: 'ic_currency',
    //     mime: 'svg',
    //     byteSize: 1000,
    //     imageSrc:
    //       '/Users/robinthomas/projects/test-icons/metrics/ic_currency.svg',
    //     createdAt: Date.now(),
    //     updatedAt: Date.now(),
    //   },
    //   {
    //     id: 2,
    //     name: 'ic_decimal',
    //     mime: 'svg',
    //     byteSize: 1000,
    //     imageSrc:
    //       '/Users/robinthomas/projects/test-icons/metrics/ic_decimal.svg',
    //     createdAt: Date.now(),
    //     updatedAt: Date.now(),
    //   },
    //   {
    //     id: 3,
    //     name: 'ic_number',
    //     mime: 'svg',
    //     byteSize: 1000,
    //     imageSrc:
    //       '/Users/robinthomas/projects/test-icons/metrics/ic_number.svg',
    //     createdAt: Date.now(),
    //     updatedAt: Date.now(),
    //   },
    //   {
    //     id: 4,
    //     name: 'ic_percentage',
    //     mime: 'svg',
    //     byteSize: 1000,
    //     imageSrc:
    //       '/Users/robinthomas/projects/test-icons/metrics/ic_percentage.svg',
    //     createdAt: Date.now(),
    //     updatedAt: Date.now(),
    //   },
    // ]);
  });
};
