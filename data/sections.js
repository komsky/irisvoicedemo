
export default {
  roomService: {
    id: 'bc5bd705-3ea2-47cb-9aa3-c3e0bacaf1a9',
    name: 'Room Service'
  },
  foodAndDrink: {
    id: '6464eb45-c3dc-4fcf-a33a-9bb637dfea88',
    name: 'Food & Drink',
    categories: {
      roomService: {
        name: 'Dine in your room',
        id: '612f0e32-03b4-4f1d-bcad-10cc3426e4eb',
        subCategories: {
          mains: {
            id: '612f0e32-03b4-4f1d-bcad-10cc3426e4eb',
            name: 'Main Courses'
          }
        }
      }
    }
  },
  information: {
    id: '6464eb45-c3dc-4fcf-a33a-9bb637dfea88',
    name: 'Useful Information',
    categories: {
      'A-Z': {
        id: '87aad047-0af5-4233-bd27-8912ca214d39',
        name: 'A-Z Information'
      },
      facilites: {
        id: '87aad047-0af5-4233-bd27-8912ca214d39',
        name: 'Facilities',
        categoryItems: {
          pool: {
            id: 'd24f5270-d594-41ff-8b77-681f82cbd873',
            name: 'Pool'
          }
        }
      }
    }
  },
  steak: '941d7fce-e796-4b8c-a5c5-40f10bfe1e85',
  Heddon: {
        name: 'Heddon Group',
        code: 'ac6a0522-0315-4798-93f3-044b40edd7e8',
        categories: {
            name: 'About Heddon',
            code: 'a4f85f01-5841-e711-80c2-000d3a222aa0',
            rewards: {
                name: 'Amazing Rewards',
                code: '533a1354-b475-49ed-b79f-c0cb6071784e'
            },
            history: {
                name: 'History',
                code: 'cd5d485c-04d3-4bb4-91a4-9e88a52a4314'
            }
        }
    },
    HotelItems: {
        name: 'Voice',
        code: '53056ffd-e7d2-48a3-acdf-6e22145303c5',
        categories: {
            name: 'Information',
            code: '87aad047-0af5-4233-bd27-8912ca214d39',
            pool: {
                name: 'pool information',
                code: 'd24f5270-d594-41ff-8b77-681f82cbd873'
            },
            spa: {
                name: 'Spa information',
                code: '59cf9fdb-5ec6-4934-9c5d-37d28c2597c6'
            },
            restaurant: {
                name: 'Restaurant information',
                code: '6d0d4ffa-99a6-490e-b0d9-52f901814fca'
            },
            hairdrier: {
                name: 'Hairdrier information',
                code: '0037210c-8c09-4a6c-89f5-be6f65eba473'
            },
            cnn: {
                name: 'CNN information',
                code: '0d4d933b-bc25-4fec-a295-654f2c87b138'
            },
            hitec: {
                name: 'About HiTec',
                code: '0f7a3fbc-a13a-4e50-bddf-59a5ead2349d'
            },
            toronto: {
                name: 'About Toronto',
                code: 'c973f618-42b4-4b25-b9b6-7dde0f29e218'
            },
            lights_on: {
                name: 'Lights On',
                confirmationMsg: 'Please confirm you wish to turn on your lights; You can simply say yes; or; no',
                rejectionMsg: 'Your request was cancelled; thank you',
                repromptMsg: 'I didn\'t quite catch that; You can simply say yes; or; no',
                code: '508efda4-80f7-4873-a8b0-9b8458252af3'
            },
            lights_off: {
                name: 'Lights Off',
                code: '63ab26c3-4920-4654-9664-704beddbfa2f'
            },
            tv_on: {
                name: 'TV On',
                code: '16660510-b2e0-43e4-ab87-3d49187ec36a'
            }
        },
        in_room_dining: {
            name: 'In-Room Dining',
            code: '612f0e32-03b4-4f1d-bcad-10cc3426e4eb',
            burger: {
                name: 'The H Burger',
                code: '5098751e-19c6-4acb-96b9-15c4a77d988b'
            },
            lobster: {
                name: 'Lobster Bisque',
                code: '63b4a64c-d701-4c48-a578-254144114e26'
            },
            steak: {
                name: 'Flat Iron Steak',
                code: '941d7fce-e796-4b8c-a5c5-40f10bfe1e85'
            },
            cheese_burger: {
                name: 'Cheese burger',
                code: 'a36f987b-036c-40ee-9416-45d0ac30420f'
            },
            choc_cake: {
                name: 'Chocolate cake',
                code: 'bcc3541f-721c-4abe-ac96-2d15a2f0b21b'
            },
            paella: {
                name: 'Seafood paella',
                code: 'c33fd9a9-f88e-4662-9b64-2ae91e04994d'
            },
            caesar_salad:{
                name: 'Caesar salad',
                code: 'e5183f0d-4830-4483-996d-5ed7bc9033eb'
            }
        },
        service_requests:{
            name: 'Service requests',
            code: '9524bc48-20e5-499b-af17-81e972a84a51',
            check_out: {
                name: 'Check-out',
                confirmationMsg: 'Please confirm you wish to checkout; You can simply say yes; or; no',
                rejectionMsg: 'Your request was cancelled; thank you',
                repromptMsg: 'I didn\'t quite catch that; You can simply say yes; or; no',
                code: 'aa507132-240c-4326-acd2-92ba4b438043'
            },
            make_up_my_room:{
                name: 'Make up my room',
                confirmationMsg: 'Please confirm you wish to make up your room; You can simply say yes; or; no',
                rejectionMsg: 'Your request was cancelled; thank you',
                repromptMsg: 'I didn\'t quite catch that; You can simply say yes; or; no',
                code: 'bc5bd705-3ea2-47cb-9aa3-c3e0bacaf1a9'
            },
            ironing:{
                name: 'Iron & Ironing board',
                confirmationMsg: 'Please confirm you wish an ironing board; You can simply say yes; or; no',
                rejectionMsg: 'Your request was cancelled; thank you',
                repromptMsg: 'I didn\'t quite catch that; You can simply say yes; or; no',
                code: 'eca65c05-6844-403d-9c3d-7bf688c15ff6'
            },
            pick_up_tray:{
                name: 'Pick-up my tray',
                confirmationMsg: 'Please confirm you wish to pick up your tray; You can simply say yes; or; no',
                rejectionMsg: 'Your request was cancelled; thank you',
                repromptMsg: 'I didn\'t quite catch that; You can simply say yes; or; no',
                code: 'ff1c0083-002e-484f-992b-3d53d743670c'
            }
        }
    }
}
