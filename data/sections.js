
export default {
  roomService: {
    id: '53056ffd-e7d2-48a3-acdf-6e22145303c5',
    name: 'Room Service'
  },
  foodAndDrink: {
    id: '21c52df1-541e-4166-afb0-710acd50403e',
    name: 'Food & Drink',
    categories: {
      roomService: {
        name: 'Dine in your room',
        id: 'b0a59c6e-1c20-4631-87e9-916ed118a923',
        subCategories: {
          mains: {
            id: '05fd5f01-5841-e711-80c2-000d3a222aa0',
            name: 'Main Courses'
          }
        }
      }
    }
  },
  information: {
    id: '92efa3b5-d0fa-44cc-96d2-b931759a639d',
    name: 'Useful Information',
    categories: {
      'A-Z': {
        id: '9145d5d6-ac7a-45cd-80aa-5e984ed6dd7f',
        name: 'A-Z Information'
      },
      facilites: {
        id: '2054200b-972f-4734-bef7-3563648da40c',
        name: 'Facilities',
        categoryItems: {
          pool: {
            id: 'acee4b9d-eab7-45b5-bef8-af428223f068',
            name: 'Pool'
          }
        }
      }
    }
  },
  steak: '09e98548-2f80-4047-8b39-b38f78257cac'
}
