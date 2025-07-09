// Enhanced Pakistan cities data with complete broker integration
const pakistanData = {
    Pakistan: {
        cities: [
            {
                name: 'Lahore',
                services: [
                    {
                        id: 'lahore-1',
                        type: 'Accommodation',
                        title: 'Luxury Villa in DHA Phase 5',
                        price_per_night: 12000,
                        location: 'DHA Phase 5, Lahore',
                        rating: 4.8,
                        picture:
                            'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
                        brokerId: 'broker_lahore_001',
                        brokerName: 'Ahmed Khan',
                        brokerPhone: '+92 300 1234567',
                        brokerEmail: 'ahmed@stayscape.com',
                        description:
                            'Luxurious villa with modern amenities in the heart of DHA Phase 5',
                        amenities: [
                            'WiFi',
                            'AC',
                            'Parking',
                            'Security',
                            'Garden',
                        ],
                        maxGuests: 8,
                        bedrooms: 4,
                        bathrooms: 3,
                    },
                    {
                        id: 'lahore-2',
                        type: 'Experience',
                        title: 'Old City Heritage Food Tour',
                        price: 3000,
                        location: 'Gawalmandi, Lahore',
                        rating: 4.9,
                        picture:
                            'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
                        brokerId: 'broker_lahore_002',
                        brokerName: 'Fatima Ali',
                        brokerPhone: '+92 301 2345678',
                        brokerEmail: 'fatima@stayscape.com',
                        description:
                            "Authentic food tour through Lahore's historic old city",
                        duration: '4 hours',
                        includes: ['Guide', 'Food Tastings', 'Transportation'],
                        maxGuests: 12,
                    },
                    {
                        id: 'lahore-3',
                        type: 'Transportation',
                        title: 'Premium Car Rental Service',
                        price_per_day: 4500,
                        location: 'City-wide, Lahore',
                        rating: 4.4,
                        picture:
                            'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
                        brokerId: 'broker_lahore_003',
                        brokerName: 'Muhammad Hassan',
                        brokerPhone: '+92 302 3456789',
                        brokerEmail: 'hassan@stayscape.com',
                        description:
                            'Premium car rental with professional driver',
                        carType: 'Luxury Sedan',
                        fuelIncluded: true,
                        driverIncluded: true,
                        maxGuests: 4,
                    },
                    {
                        id: 'lahore-4',
                        type: 'Wellness',
                        title: 'Spa & Wellness Center',
                        price_per_hour: 2500,
                        location: 'Gulberg, Lahore',
                        rating: 4.6,
                        picture:
                            'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
                        brokerId: 'broker_lahore_004',
                        brokerName: 'Dr. Ayesha Khan',
                        brokerPhone: '+92 303 4567890',
                        brokerEmail: 'ayesha@stayscape.com',
                        description: 'Premium spa and wellness treatments',
                        services: ['Massage', 'Facial', 'Aromatherapy'],
                        maxGuests: 2,
                    },
                    {
                        id: 'lahore-5',
                        type: 'Adventure',
                        title: 'River Rafting Adventure',
                        price: 5500,
                        location: 'River Ravi, Lahore',
                        rating: 4.7,
                        picture:
                            'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
                        brokerId: 'broker_lahore_005',
                        brokerName: 'Captain Ali',
                        brokerPhone: '+92 304 5678901',
                        brokerEmail: 'ali@stayscape.com',
                        description: 'Thrilling river rafting experience',
                        duration: '6 hours',
                        includes: ['Equipment', 'Guide', 'Safety Gear'],
                        maxGuests: 8,
                    },
                ],
            },
            {
                name: 'Karachi',
                services: [
                    {
                        id: 'karachi-1',
                        type: 'Accommodation',
                        title: 'Clifton Beach Luxury Apartment',
                        price_per_night: 8500,
                        location: 'Clifton Block 4, Karachi',
                        rating: 4.7,
                        picture:
                            'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg',
                        brokerId: 'broker_karachi_001',
                        brokerName: 'Zara Ahmed',
                        brokerPhone: '+92 305 1234567',
                        brokerEmail: 'zara@stayscape.com',
                        description:
                            'Luxury apartment with sea view in Clifton',
                        amenities: ['Sea View', 'WiFi', 'AC', 'Parking'],
                        maxGuests: 6,
                        bedrooms: 3,
                        bathrooms: 2,
                    },
                    {
                        id: 'karachi-2',
                        type: 'Experience',
                        title: 'Manora Island Deep Sea Fishing',
                        price: 4500,
                        location: 'Manora Island, Karachi',
                        rating: 4.8,
                        picture:
                            'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
                        brokerId: 'broker_karachi_002',
                        brokerName: 'Captain Rashid',
                        brokerPhone: '+92 306 2345678',
                        brokerEmail: 'rashid@stayscape.com',
                        description:
                            'Deep sea fishing experience around Manora Island',
                        duration: '6 hours',
                        includes: ['Boat', 'Equipment', 'Lunch', 'Guide'],
                        maxGuests: 8,
                    },
                    {
                        id: 'karachi-3',
                        type: 'Transportation',
                        title: 'Airport Transfer Service',
                        price_per_km: 25,
                        location: 'Karachi Airport',
                        rating: 4.5,
                        picture:
                            'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg',
                        brokerId: 'broker_karachi_003',
                        brokerName: 'Tariq Malik',
                        brokerPhone: '+92 307 3456789',
                        brokerEmail: 'tariq@stayscape.com',
                        description: 'Reliable airport transfer service',
                        carType: 'Sedan/SUV',
                        available24x7: true,
                        maxGuests: 4,
                    },
                    {
                        id: 'karachi-4',
                        type: 'Food & Dining',
                        title: 'Street Food Tour',
                        price: 2500,
                        location: 'Burns Road, Karachi',
                        rating: 4.9,
                        picture:
                            'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
                        brokerId: 'broker_karachi_004',
                        brokerName: 'Chef Salman',
                        brokerPhone: '+92 308 4567890',
                        brokerEmail: 'salman@stayscape.com',
                        description: 'Authentic Karachi street food experience',
                        duration: '3 hours',
                        includes: ['Guide', 'Food Tastings', 'Drinks'],
                        maxGuests: 10,
                    },
                ],
            },
            {
                name: 'Islamabad',
                services: [
                    {
                        id: 'islamabad-1',
                        type: 'Accommodation',
                        title: 'Margalla Hills Eco Resort',
                        price_per_night: 9500,
                        location: 'Margalla Hills, Islamabad',
                        rating: 4.9,
                        picture:
                            'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
                        brokerId: 'broker_islamabad_001',
                        brokerName: 'Dr. Sarah Khan',
                        brokerPhone: '+92 308 1234567',
                        brokerEmail: 'sarah@stayscape.com',
                        description:
                            'Eco-friendly resort in the Margalla Hills',
                        amenities: [
                            'Mountain View',
                            'Hiking Trails',
                            'Organic Food',
                        ],
                        maxGuests: 4,
                        bedrooms: 2,
                        bathrooms: 2,
                    },
                    {
                        id: 'islamabad-2',
                        type: 'Adventure',
                        title: 'Margalla Hills Hiking',
                        price: 1500,
                        location: 'Margalla Hills National Park',
                        rating: 4.6,
                        picture:
                            'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
                        brokerId: 'broker_islamabad_002',
                        brokerName: 'Hiking Guide Ahmad',
                        brokerPhone: '+92 309 2345678',
                        brokerEmail: 'ahmad@stayscape.com',
                        description: 'Guided hiking tours in Margalla Hills',
                        duration: '4 hours',
                        includes: ['Guide', 'Water', 'First Aid'],
                        maxGuests: 15,
                    },
                    {
                        id: 'islamabad-3',
                        type: 'Cultural',
                        title: 'Faisal Mosque & Monument Tour',
                        price: 2000,
                        location: 'Islamabad City',
                        rating: 4.8,
                        picture:
                            'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg',
                        brokerId: 'broker_islamabad_003',
                        brokerName: 'Tour Guide Fatima',
                        brokerPhone: '+92 310 3456789',
                        brokerEmail: 'fatima.guide@stayscape.com',
                        description: "Cultural tour of Islamabad's landmarks",
                        duration: '5 hours',
                        includes: ['Guide', 'Transportation', 'Entry Fees'],
                        maxGuests: 12,
                    },
                ],
            },
            {
                name: 'Peshawar',
                services: [
                    {
                        id: 'peshawar-1',
                        type: 'Accommodation',
                        title: 'Traditional Haveli in Old City',
                        price_per_night: 6500,
                        location: 'Qissa Khwani Bazaar, Peshawar',
                        rating: 4.5,
                        picture:
                            'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
                        brokerId: 'broker_peshawar_001',
                        brokerName: 'Khan Sahib',
                        brokerPhone: '+92 311 1234567',
                        brokerEmail: 'khan@stayscape.com',
                        description:
                            'Authentic Peshawari haveli with traditional architecture',
                        amenities: [
                            'WiFi',
                            'Traditional Decor',
                            'Courtyard',
                            'Local Cuisine',
                        ],
                        maxGuests: 6,
                        bedrooms: 3,
                        bathrooms: 2,
                    },
                    {
                        id: 'peshawar-2',
                        type: 'Cultural',
                        title: 'Khyber Pass Historical Tour',
                        price: 4000,
                        location: 'Khyber Pass, Peshawar',
                        rating: 4.7,
                        picture:
                            'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg',
                        brokerId: 'broker_peshawar_002',
                        brokerName: 'Malik Tariq',
                        brokerPhone: '+92 312 2345678',
                        brokerEmail: 'tariq@stayscape.com',
                        description:
                            'Historical tour of the famous Khyber Pass',
                        duration: '6 hours',
                        includes: [
                            'Guide',
                            'Transportation',
                            'Security',
                            'Lunch',
                        ],
                        maxGuests: 8,
                    },
                    {
                        id: 'peshawar-3',
                        type: 'Food & Dining',
                        title: 'Chapli Kebab Food Experience',
                        price: 2000,
                        location: 'Namak Mandi, Peshawar',
                        rating: 4.9,
                        picture:
                            'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
                        brokerId: 'broker_peshawar_003',
                        brokerName: 'Ustad Gul',
                        brokerPhone: '+92 313 3456789',
                        brokerEmail: 'gul@stayscape.com',
                        description: 'Authentic Peshawari cuisine experience',
                        duration: '3 hours',
                        includes: ['Food Tastings', 'Tea', 'Guide'],
                        maxGuests: 12,
                    },
                    {
                        id: 'peshawar-4',
                        type: 'Transportation',
                        title: 'City Rickshaw Tours',
                        price_per_hour: 800,
                        location: 'City-wide, Peshawar',
                        rating: 4.3,
                        picture:
                            'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg',
                        brokerId: 'broker_peshawar_004',
                        brokerName: 'Rickshaw Raja',
                        brokerPhone: '+92 314 4567890',
                        brokerEmail: 'raja@stayscape.com',
                        description: 'Traditional rickshaw city tours',
                        includes: ['Driver', 'Fuel', 'City Guide'],
                        maxGuests: 3,
                    },
                    {
                        id: 'peshawar-5',
                        type: 'Adventure',
                        title: 'Tribal Area Trekking',
                        price: 8000,
                        location: 'Tribal Areas, Peshawar',
                        rating: 4.6,
                        picture:
                            'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
                        brokerId: 'broker_peshawar_005',
                        brokerName: 'Adventure Ali',
                        brokerPhone: '+92 315 5678901',
                        brokerEmail: 'ali@stayscape.com',
                        description:
                            'Guided trekking in tribal mountainous areas',
                        duration: '8 hours',
                        includes: ['Guide', 'Equipment', 'Permits', 'Lunch'],
                        maxGuests: 6,
                    },
                    {
                        id: 'peshawar-6',
                        type: 'Wellness',
                        title: 'Traditional Hammam Experience',
                        price_per_session: 3000,
                        location: 'University Town, Peshawar',
                        rating: 4.4,
                        picture:
                            'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
                        brokerId: 'broker_peshawar_006',
                        brokerName: 'Hakeem Sahib',
                        brokerPhone: '+92 316 6789012',
                        brokerEmail: 'hakeem@stayscape.com',
                        description: 'Traditional Turkish bath and wellness',
                        services: ['Steam Bath', 'Massage', 'Herbal Treatment'],
                        maxGuests: 4,
                    },
                    {
                        id: 'peshawar-7',
                        type: 'Experience',
                        title: 'Carpet Weaving Workshop',
                        price: 3500,
                        location: 'Charsadda Road, Peshawar',
                        rating: 4.8,
                        picture:
                            'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
                        brokerId: 'broker_peshawar_007',
                        brokerName: 'Master Weaver Khan',
                        brokerPhone: '+92 317 7890123',
                        brokerEmail: 'weaver@stayscape.com',
                        description:
                            'Learn traditional carpet weaving techniques',
                        duration: '4 hours',
                        includes: [
                            'Materials',
                            'Instructor',
                            'Tea',
                            'Certificate',
                        ],
                        maxGuests: 8,
                    },
                    {
                        id: 'peshawar-8',
                        type: 'Cultural',
                        title: 'Peshawar Museum & Heritage Walk',
                        price: 1800,
                        location: 'GT Road, Peshawar',
                        rating: 4.5,
                        picture:
                            'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg',
                        brokerId: 'broker_peshawar_008',
                        brokerName: 'Dr. Ahmad Shah',
                        brokerPhone: '+92 318 8901234',
                        brokerEmail: 'ahmad@stayscape.com',
                        description: 'Museum visit and heritage walk',
                        duration: '3 hours',
                        includes: ['Guide', 'Entry Fees', 'Refreshments'],
                        maxGuests: 15,
                    },
                    {
                        id: 'peshawar-9',
                        type: 'Accommodation',
                        title: 'Modern Hotel in Hayatabad',
                        price_per_night: 7500,
                        location: 'Hayatabad, Peshawar',
                        rating: 4.6,
                        picture:
                            'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg',
                        brokerId: 'broker_peshawar_009',
                        brokerName: 'Hotel Manager Yasir',
                        brokerPhone: '+92 319 9012345',
                        brokerEmail: 'yasir@stayscape.com',
                        description: 'Modern hotel with all amenities',
                        amenities: [
                            'WiFi',
                            'AC',
                            'Restaurant',
                            'Gym',
                            'Parking',
                        ],
                        maxGuests: 4,
                        bedrooms: 2,
                        bathrooms: 2,
                    },
                    {
                        id: 'peshawar-10',
                        type: 'Transportation',
                        title: 'Airport Shuttle Service',
                        price_per_trip: 1200,
                        location: 'Bacha Khan Airport, Peshawar',
                        rating: 4.2,
                        picture:
                            'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
                        brokerId: 'broker_peshawar_010',
                        brokerName: 'Shuttle Service Akbar',
                        brokerPhone: '+92 320 0123456',
                        brokerEmail: 'akbar@stayscape.com',
                        description: 'Reliable airport shuttle service',
                        available24x7: true,
                        maxGuests: 6,
                    },
                ],
            },
            {
                name: 'Multan',
                services: [
                    {
                        id: 'multan-1',
                        type: 'Accommodation',
                        title: 'Heritage Hotel near Shrine',
                        price_per_night: 5500,
                        location: 'Shrine Area, Multan',
                        rating: 4.4,
                        picture:
                            'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
                        brokerId: 'broker_multan_001',
                        brokerName: 'Pir Sahib',
                        brokerPhone: '+92 321 1234567',
                        brokerEmail: 'pir@stayscape.com',
                        description: 'Traditional hotel near famous shrines',
                        amenities: [
                            'WiFi',
                            'AC',
                            'Traditional Decor',
                            'Prayer Room',
                        ],
                        maxGuests: 5,
                        bedrooms: 2,
                        bathrooms: 2,
                    },
                    {
                        id: 'multan-2',
                        type: 'Cultural',
                        title: 'Sufi Shrines Spiritual Tour',
                        price: 2500,
                        location: 'Various Shrines, Multan',
                        rating: 4.9,
                        picture:
                            'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg',
                        brokerId: 'broker_multan_002',
                        brokerName: 'Spiritual Guide Qasim',
                        brokerPhone: '+92 322 2345678',
                        brokerEmail: 'qasim@stayscape.com',
                        description: 'Spiritual tour of famous Sufi shrines',
                        duration: '5 hours',
                        includes: [
                            'Guide',
                            'Transportation',
                            'Offerings',
                            'Lunch',
                        ],
                        maxGuests: 10,
                    },
                    {
                        id: 'multan-3',
                        type: 'Experience',
                        title: 'Blue Pottery Workshop',
                        price: 4000,
                        location: 'Pottery Market, Multan',
                        rating: 4.7,
                        picture:
                            'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
                        brokerId: 'broker_multan_003',
                        brokerName: 'Master Potter Rehman',
                        brokerPhone: '+92 323 3456789',
                        brokerEmail: 'rehman@stayscape.com',
                        description: 'Learn traditional Multani blue pottery',
                        duration: '6 hours',
                        includes: [
                            'Materials',
                            'Instructor',
                            'Kiln Access',
                            'Take Home Piece',
                        ],
                        maxGuests: 6,
                    },
                    {
                        id: 'multan-4',
                        type: 'Food & Dining',
                        title: 'Sohan & Sweets Tasting Tour',
                        price: 1500,
                        location: 'Old Bazaar, Multan',
                        rating: 4.8,
                        picture:
                            'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
                        brokerId: 'broker_multan_004',
                        brokerName: 'Halwai Ustad',
                        brokerPhone: '+92 324 4567890',
                        brokerEmail: 'halwai@stayscape.com',
                        description: 'Famous Multani sweets and sohan tasting',
                        duration: '2 hours',
                        includes: ['Tastings', 'Guide', 'Take Home Box'],
                        maxGuests: 8,
                    },
                    {
                        id: 'multan-5',
                        type: 'Adventure',
                        title: 'Chenab River Boating',
                        price: 3000,
                        location: 'Chenab River, Multan',
                        rating: 4.3,
                        picture:
                            'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
                        brokerId: 'broker_multan_005',
                        brokerName: 'Boat Captain Rasheed',
                        brokerPhone: '+92 325 5678901',
                        brokerEmail: 'rasheed@stayscape.com',
                        description: 'Peaceful boating on Chenab River',
                        duration: '3 hours',
                        includes: [
                            'Boat',
                            'Life Jackets',
                            'Guide',
                            'Refreshments',
                        ],
                        maxGuests: 8,
                    },
                    {
                        id: 'multan-6',
                        type: 'Transportation',
                        title: 'Heritage Sites Transport',
                        price_per_day: 3500,
                        location: 'City-wide, Multan',
                        rating: 4.1,
                        picture:
                            'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg',
                        brokerId: 'broker_multan_006',
                        brokerName: 'Driver Ghulam',
                        brokerPhone: '+92 326 6789012',
                        brokerEmail: 'ghulam@stayscape.com',
                        description: 'Transport service for heritage sites',
                        carType: 'Van/Car',
                        fuelIncluded: true,
                        maxGuests: 7,
                    },
                    {
                        id: 'multan-7',
                        type: 'Wellness',
                        title: 'Traditional Herbal Treatment',
                        price_per_session: 2000,
                        location: 'Herbal Center, Multan',
                        rating: 4.5,
                        picture:
                            'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
                        brokerId: 'broker_multan_007',
                        brokerName: 'Hakeem Javed',
                        brokerPhone: '+92 327 7890123',
                        brokerEmail: 'javed@stayscape.com',
                        description: 'Traditional herbal healing treatments',
                        services: [
                            'Consultation',
                            'Herbal Medicine',
                            'Therapy',
                        ],
                        maxGuests: 1,
                    },
                    {
                        id: 'multan-8',
                        type: 'Cultural',
                        title: 'Fort Kohna Qasim Bagh Tour',
                        price: 1800,
                        location: 'Qasim Bagh, Multan',
                        rating: 4.6,
                        picture:
                            'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg',
                        brokerId: 'broker_multan_008',
                        brokerName: 'History Guide Saleem',
                        brokerPhone: '+92 328 8901234',
                        brokerEmail: 'saleem@stayscape.com',
                        description: 'Historical fort and gardens tour',
                        duration: '3 hours',
                        includes: ['Guide', 'Entry Fees', 'Photography'],
                        maxGuests: 12,
                    },
                    {
                        id: 'multan-9',
                        type: 'Experience',
                        title: 'Camel Cart Village Tour',
                        price: 2800,
                        location: 'Rural Multan',
                        rating: 4.4,
                        picture:
                            'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
                        brokerId: 'broker_multan_009',
                        brokerName: 'Village Guide Bashir',
                        brokerPhone: '+92 329 9012345',
                        brokerEmail: 'bashir@stayscape.com',
                        description: 'Traditional village tour on camel cart',
                        duration: '4 hours',
                        includes: [
                            'Camel Cart',
                            'Village Visit',
                            'Local Food',
                            'Guide',
                        ],
                        maxGuests: 6,
                    },
                    {
                        id: 'multan-10',
                        type: 'Accommodation',
                        title: 'Modern Business Hotel',
                        price_per_night: 6800,
                        location: 'Cantt Area, Multan',
                        rating: 4.3,
                        picture:
                            'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg',
                        brokerId: 'broker_multan_010',
                        brokerName: 'Manager Farhan',
                        brokerPhone: '+92 330 0123456',
                        brokerEmail: 'farhan@stayscape.com',
                        description: 'Modern hotel with business facilities',
                        amenities: [
                            'WiFi',
                            'AC',
                            'Business Center',
                            'Restaurant',
                        ],
                        maxGuests: 4,
                        bedrooms: 2,
                        bathrooms: 2,
                    },
                ],
            },
            {
                name: 'Faisalabad',
                services: [
                    {
                        id: 'faisalabad-1',
                        type: 'Accommodation',
                        title: 'Textile City Business Hotel',
                        price_per_night: 4500,
                        location: 'Jaranwala Road, Faisalabad',
                        rating: 4.2,
                        picture:
                            'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
                        brokerId: 'broker_faisalabad_001',
                        brokerName: 'Hotel Manager Asif',
                        brokerPhone: '+92 331 1234567',
                        brokerEmail: 'asif@stayscape.com',
                        description: 'Business hotel in textile hub',
                        amenities: [
                            'WiFi',
                            'AC',
                            'Meeting Rooms',
                            'Restaurant',
                        ],
                        maxGuests: 4,
                        bedrooms: 2,
                        bathrooms: 2,
                    },
                    {
                        id: 'faisalabad-2',
                        type: 'Experience',
                        title: 'Textile Factory Tour',
                        price: 3000,
                        location: 'Industrial Area, Faisalabad',
                        rating: 4.6,
                        picture:
                            'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
                        brokerId: 'broker_faisalabad_002',
                        brokerName: 'Factory Guide Malik',
                        brokerPhone: '+92 332 2345678',
                        brokerEmail: 'malik@stayscape.com',
                        description:
                            'Tour of famous textile manufacturing units',
                        duration: '4 hours',
                        includes: [
                            'Guide',
                            'Transportation',
                            'Safety Gear',
                            'Lunch',
                        ],
                        maxGuests: 10,
                    },
                    {
                        id: 'faisalabad-3',
                        type: 'Cultural',
                        title: 'Clock Tower & Bazaar Walk',
                        price: 1200,
                        location: 'Ghanta Ghar, Faisalabad',
                        rating: 4.4,
                        picture:
                            'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg',
                        brokerId: 'broker_faisalabad_003',
                        brokerName: 'City Guide Naveed',
                        brokerPhone: '+92 333 3456789',
                        brokerEmail: 'naveed@stayscape.com',
                        description:
                            'Historic clock tower and bazaar exploration',
                        duration: '2 hours',
                        includes: ['Guide', 'Shopping Tips', 'Refreshments'],
                        maxGuests: 15,
                    },
                    {
                        id: 'faisalabad-4',
                        type: 'Food & Dining',
                        title: 'Punjabi Cuisine Experience',
                        price: 2200,
                        location: 'Civil Lines, Faisalabad',
                        rating: 4.7,
                        picture:
                            'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
                        brokerId: 'broker_faisalabad_004',
                        brokerName: 'Chef Mahmood',
                        brokerPhone: '+92 334 4567890',
                        brokerEmail: 'mahmood@stayscape.com',
                        description: 'Authentic Punjabi food experience',
                        duration: '3 hours',
                        includes: [
                            'Multiple Courses',
                            'Cooking Demo',
                            'Recipes',
                        ],
                        maxGuests: 8,
                    },
                    {
                        id: 'faisalabad-5',
                        type: 'Transportation',
                        title: 'Industrial Area Transport',
                        price_per_day: 2800,
                        location: 'City-wide, Faisalabad',
                        rating: 4.0,
                        picture:
                            'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg',
                        brokerId: 'broker_faisalabad_005',
                        brokerName: 'Transport Coordinator Jameel',
                        brokerPhone: '+92 335 5678901',
                        brokerEmail: 'jameel@stayscape.com',
                        description:
                            'Transport for business and industrial visits',
                        carType: 'Sedan/Van',
                        fuelIncluded: true,
                        maxGuests: 6,
                    },
                    {
                        id: 'faisalabad-6',
                        type: 'Adventure',
                        title: 'Canal Cycling Tour',
                        price: 1800,
                        location: 'Canal Road, Faisalabad',
                        rating: 4.3,
                        picture:
                            'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
                        brokerId: 'broker_faisalabad_006',
                        brokerName: 'Cycling Guide Imran',
                        brokerPhone: '+92 336 6789012',
                        brokerEmail: 'imran@stayscape.com',
                        description: 'Cycling tour along irrigation canals',
                        duration: '3 hours',
                        includes: ['Bicycle', 'Helmet', 'Guide', 'Water'],
                        maxGuests: 8,
                    },
                    {
                        id: 'faisalabad-7',
                        type: 'Wellness',
                        title: 'City Spa & Massage Center',
                        price_per_hour: 1800,
                        location: 'D Ground, Faisalabad',
                        rating: 4.1,
                        picture:
                            'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
                        brokerId: 'broker_faisalabad_007',
                        brokerName: 'Spa Manager Sadia',
                        brokerPhone: '+92 337 7890123',
                        brokerEmail: 'sadia@stayscape.com',
                        description: 'Relaxing spa treatments',
                        services: ['Massage', 'Facial', 'Body Treatment'],
                        maxGuests: 2,
                    },
                    {
                        id: 'faisalabad-8',
                        type: 'Experience',
                        title: 'Agricultural Farm Visit',
                        price: 2500,
                        location: 'Rural Faisalabad',
                        rating: 4.5,
                        picture:
                            'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
                        brokerId: 'broker_faisalabad_008',
                        brokerName: 'Farmer Akram',
                        brokerPhone: '+92 338 8901234',
                        brokerEmail: 'akram@stayscape.com',
                        description: 'Visit to modern agricultural farms',
                        duration: '5 hours',
                        includes: [
                            'Farm Tour',
                            'Fresh Produce',
                            'Lunch',
                            'Transportation',
                        ],
                        maxGuests: 12,
                    },
                    {
                        id: 'faisalabad-9',
                        type: 'Cultural',
                        title: 'Lyallpur Heritage Museum',
                        price: 800,
                        location: 'Museum Road, Faisalabad',
                        rating: 4.2,
                        picture:
                            'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg',
                        brokerId: 'broker_faisalabad_009',
                        brokerName: 'Museum Guide Tahir',
                        brokerPhone: '+92 339 9012345',
                        brokerEmail: 'tahir@stayscape.com',
                        description:
                            'Historical museum showcasing city heritage',
                        duration: '2 hours',
                        includes: ['Entry Fee', 'Guide', 'Brochure'],
                        maxGuests: 20,
                    },
                    {
                        id: 'faisalabad-10',
                        type: 'Transportation',
                        title: 'Railway Station Transfer',
                        price_per_trip: 600,
                        location: 'Railway Station, Faisalabad',
                        rating: 4.1,
                        picture:
                            'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
                        brokerId: 'broker_faisalabad_010',
                        brokerName: 'Transfer Service Waheed',
                        brokerPhone: '+92 340 0123456',
                        brokerEmail: 'waheed@stayscape.com',
                        description: 'Reliable railway station transfers',
                        available24x7: true,
                        maxGuests: 4,
                    },
                ],
            },
            {
                name: 'Quetta',
                services: [
                    {
                        id: 'quetta-1',
                        type: 'Accommodation',
                        title: 'Mountain View Resort',
                        price_per_night: 8500,
                        location: 'Zarghoon Road, Quetta',
                        rating: 4.6,
                        picture:
                            'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
                        brokerId: 'broker_quetta_001',
                        brokerName: 'Resort Manager Baloch',
                        brokerPhone: '+92 341 1234567',
                        brokerEmail: 'baloch@stayscape.com',
                        description: 'Resort with stunning mountain views',
                        amenities: [
                            'Mountain View',
                            'Heating',
                            'WiFi',
                            'Restaurant',
                        ],
                        maxGuests: 6,
                        bedrooms: 3,
                        bathrooms: 2,
                    },
                    {
                        id: 'quetta-2',
                        type: 'Adventure',
                        title: 'Ziarat Valley Trekking',
                        price: 6500,
                        location: 'Ziarat, Quetta',
                        rating: 4.8,
                        picture:
                            'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
                        brokerId: 'broker_quetta_002',
                        brokerName: 'Trek Guide Karim',
                        brokerPhone: '+92 342 2345678',
                        brokerEmail: 'karim@stayscape.com',
                        description: 'Trekking in beautiful Ziarat valley',
                        duration: '8 hours',
                        includes: [
                            'Guide',
                            'Equipment',
                            'Lunch',
                            'Transportation',
                        ],
                        maxGuests: 8,
                    },
                    {
                        id: 'quetta-3',
                        type: 'Cultural',
                        title: 'Balochi Culture Experience',
                        price: 4000,
                        location: 'Cultural Center, Quetta',
                        rating: 4.7,
                        picture:
                            'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg',
                        brokerId: 'broker_quetta_003',
                        brokerName: 'Cultural Guide Mir',
                        brokerPhone: '+92 343 3456789',
                        brokerEmail: 'mir@stayscape.com',
                        description: 'Experience authentic Balochi culture',
                        duration: '4 hours',
                        includes: [
                            'Cultural Show',
                            'Traditional Food',
                            'Handicrafts',
                        ],
                        maxGuests: 15,
                    },
                    {
                        id: 'quetta-4',
                        type: 'Food & Dining',
                        title: 'Sajji & Balochi Cuisine',
                        price: 3500,
                        location: 'Liaquat Bazaar, Quetta',
                        rating: 4.9,
                        picture:
                            'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
                        brokerId: 'broker_quetta_004',
                        brokerName: 'Chef Sardar',
                        brokerPhone: '+92 344 4567890',
                        brokerEmail: 'sardar@stayscape.com',
                        description: 'Authentic Balochi sajji and cuisine',
                        duration: '3 hours',
                        includes: [
                            'Full Meal',
                            'Cooking Demo',
                            'Traditional Setting',
                        ],
                        maxGuests: 10,
                    },
                    {
                        id: 'quetta-5',
                        type: 'Transportation',
                        title: '4WD Mountain Transport',
                        price_per_day: 7500,
                        location: 'Mountain Areas, Quetta',
                        rating: 4.4,
                        picture:
                            'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg',
                        brokerId: 'broker_quetta_005',
                        brokerName: 'Mountain Driver Shah',
                        brokerPhone: '+92 345 5678901',
                        brokerEmail: 'shah@stayscape.com',
                        description: '4WD transport for mountain areas',
                        carType: '4WD Jeep',
                        fuelIncluded: true,
                        maxGuests: 6,
                    },
                    {
                        id: 'quetta-6',
                        type: 'Experience',
                        title: 'Fruit Orchards Visit',
                        price: 2800,
                        location: 'Kalat Road, Quetta',
                        rating: 4.5,
                        picture:
                            'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
                        brokerId: 'broker_quetta_006',
                        brokerName: 'Orchard Owner Jamali',
                        brokerPhone: '+92 346 6789012',
                        brokerEmail: 'jamali@stayscape.com',
                        description: 'Visit famous apple and cherry orchards',
                        duration: '4 hours',
                        includes: [
                            'Orchard Tour',
                            'Fresh Fruits',
                            'Lunch',
                            'Guide',
                        ],
                        maxGuests: 12,
                    },
                    {
                        id: 'quetta-7',
                        type: 'Adventure',
                        title: 'Bolan Pass Historical Trek',
                        price: 5500,
                        location: 'Bolan Pass, Quetta',
                        rating: 4.6,
                        picture:
                            'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
                        brokerId: 'broker_quetta_007',
                        brokerName: 'History Trek Guide Raza',
                        brokerPhone: '+92 347 7890123',
                        brokerEmail: 'raza@stayscape.com',
                        description: 'Historical trekking through Bolan Pass',
                        duration: '6 hours',
                        includes: [
                            'Guide',
                            'History Briefing',
                            'Equipment',
                            'Lunch',
                        ],
                        maxGuests: 8,
                    },
                    {
                        id: 'quetta-8',
                        type: 'Wellness',
                        title: 'Mountain Air Therapy',
                        price_per_session: 2500,
                        location: 'Hanna Lake, Quetta',
                        rating: 4.3,
                        picture:
                            'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
                        brokerId: 'broker_quetta_008',
                        brokerName: 'Therapist Dr. Khan',
                        brokerPhone: '+92 348 8901234',
                        brokerEmail: 'drkhan@stayscape.com',
                        description: 'Natural therapy in mountain environment',
                        services: [
                            'Breathing Exercises',
                            'Meditation',
                            'Nature Walk',
                        ],
                        maxGuests: 6,
                    },
                    {
                        id: 'quetta-9',
                        type: 'Cultural',
                        title: 'Hazarganji Chiltan National Park',
                        price: 3200,
                        location: 'National Park, Quetta',
                        rating: 4.7,
                        picture:
                            'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg',
                        brokerId: 'broker_quetta_009',
                        brokerName: 'Park Guide Mengal',
                        brokerPhone: '+92 349 9012345',
                        brokerEmail: 'mengal@stayscape.com',
                        description: 'Wildlife and nature park visit',
                        duration: '5 hours',
                        includes: [
                            'Entry Fee',
                            'Guide',
                            'Wildlife Spotting',
                            'Lunch',
                        ],
                        maxGuests: 10,
                    },
                    {
                        id: 'quetta-10',
                        type: 'Accommodation',
                        title: 'Traditional Balochi Guest House',
                        price_per_night: 4500,
                        location: 'Satellite Town, Quetta',
                        rating: 4.4,
                        picture:
                            'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg',
                        brokerId: 'broker_quetta_010',
                        brokerName: 'Guest House Owner Bugti',
                        brokerPhone: '+92 350 0123456',
                        brokerEmail: 'bugti@stayscape.com',
                        description: 'Traditional Balochi hospitality',
                        amenities: [
                            'Traditional Decor',
                            'Local Cuisine',
                            'Cultural Programs',
                        ],
                        maxGuests: 8,
                        bedrooms: 4,
                        bathrooms: 3,
                    },
                ],
            },
            {
                name: 'Gilgit',
                services: [
                    {
                        id: 'gilgit-1',
                        type: 'Accommodation',
                        title: 'Karakoram Mountain Lodge',
                        price_per_night: 12000,
                        location: 'Jutial, Gilgit',
                        rating: 4.9,
                        picture:
                            'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
                        brokerId: 'broker_gilgit_001',
                        brokerName: 'Lodge Manager Hunza',
                        brokerPhone: '+92 351 1234567',
                        brokerEmail: 'hunza@stayscape.com',
                        description:
                            'Luxury lodge with Karakoram mountain views',
                        amenities: [
                            'Mountain View',
                            'Heating',
                            'WiFi',
                            'Organic Food',
                        ],
                        maxGuests: 4,
                        bedrooms: 2,
                        bathrooms: 2,
                    },
                    {
                        id: 'gilgit-2',
                        type: 'Adventure',
                        title: 'K2 Base Camp Trekking',
                        price: 25000,
                        location: 'Baltoro Glacier, Gilgit',
                        rating: 4.8,
                        picture:
                            'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
                        brokerId: 'broker_gilgit_002',
                        brokerName: 'Mountain Guide Sherpa',
                        brokerPhone: '+92 352 2345678',
                        brokerEmail: 'sherpa@stayscape.com',
                        description: 'Professional K2 base camp trekking',
                        duration: '14 days',
                        includes: [
                            'Professional Guide',
                            'Equipment',
                            'Permits',
                            'Food',
                        ],
                        maxGuests: 6,
                    },
                    {
                        id: 'gilgit-3',
                        type: 'Cultural',
                        title: 'Hunza Valley Cultural Tour',
                        price: 8500,
                        location: 'Hunza Valley, Gilgit',
                        rating: 4.9,
                        picture:
                            'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg',
                        brokerId: 'broker_gilgit_003',
                        brokerName: 'Cultural Guide Wakhi',
                        brokerPhone: '+92 353 3456789',
                        brokerEmail: 'wakhi@stayscape.com',
                        description: 'Explore Hunza culture and traditions',
                        duration: '2 days',
                        includes: [
                            'Accommodation',
                            'Meals',
                            'Cultural Shows',
                            'Guide',
                        ],
                        maxGuests: 8,
                    },
                    {
                        id: 'gilgit-4',
                        type: 'Adventure',
                        title: 'White Water Rafting',
                        price: 4500,
                        location: 'Indus River, Gilgit',
                        rating: 4.7,
                        picture:
                            'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
                        brokerId: 'broker_gilgit_004',
                        brokerName: 'Rafting Captain Indus',
                        brokerPhone: '+92 354 4567890',
                        brokerEmail: 'indus@stayscape.com',
                        description: 'Thrilling white water rafting on Indus',
                        duration: '4 hours',
                        includes: [
                            'Equipment',
                            'Safety Gear',
                            'Guide',
                            'Lunch',
                        ],
                        maxGuests: 8,
                    },
                    {
                        id: 'gilgit-5',
                        type: 'Transportation',
                        title: 'Karakoram Highway Transport',
                        price_per_day: 15000,
                        location: 'KKH, Gilgit',
                        rating: 4.6,
                        picture:
                            'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg',
                        brokerId: 'broker_gilgit_005',
                        brokerName: 'KKH Driver Karim',
                        brokerPhone: '+92 355 5678901',
                        brokerEmail: 'karimkkh@stayscape.com',
                        description: 'Transport along Karakoram Highway',
                        carType: '4WD Vehicle',
                        fuelIncluded: true,
                        maxGuests: 6,
                    },
                    {
                        id: 'gilgit-6',
                        type: 'Experience',
                        title: 'Apricot Harvest Experience',
                        price: 3500,
                        location: 'Hunza Orchards, Gilgit',
                        rating: 4.8,
                        picture:
                            'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
                        brokerId: 'broker_gilgit_006',
                        brokerName: 'Orchard Owner Baltit',
                        brokerPhone: '+92 356 6789012',
                        brokerEmail: 'baltit@stayscape.com',
                        description: 'Participate in apricot harvesting',
                        duration: '6 hours',
                        includes: [
                            'Harvesting',
                            'Fresh Fruits',
                            'Traditional Lunch',
                            'Guide',
                        ],
                        maxGuests: 10,
                    },
                    {
                        id: 'gilgit-7',
                        type: 'Cultural',
                        title: 'Ancient Rock Carvings Tour',
                        price: 2800,
                        location: 'Various Sites, Gilgit',
                        rating: 4.5,
                        picture:
                            'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg',
                        brokerId: 'broker_gilgit_007',
                        brokerName: 'Archaeology Guide Danyore',
                        brokerPhone: '+92 357 7890123',
                        brokerEmail: 'danyore@stayscape.com',
                        description: 'Tour of ancient Buddhist rock carvings',
                        duration: '4 hours',
                        includes: [
                            'Expert Guide',
                            'Transportation',
                            'Documentation',
                        ],
                        maxGuests: 12,
                    },
                    {
                        id: 'gilgit-8',
                        type: 'Adventure',
                        title: 'Glacier Hiking Experience',
                        price: 6500,
                        location: 'Passu Glacier, Gilgit',
                        rating: 4.7,
                        picture:
                            'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
                        brokerId: 'broker_gilgit_008',
                        brokerName: 'Glacier Guide Passu',
                        brokerPhone: '+92 358 8901234',
                        brokerEmail: 'passu@stayscape.com',
                        description: 'Guided glacier hiking adventure',
                        duration: '8 hours',
                        includes: [
                            'Professional Guide',
                            'Safety Equipment',
                            'Lunch',
                        ],
                        maxGuests: 6,
                    },
                    {
                        id: 'gilgit-9',
                        type: 'Wellness',
                        title: 'Mountain Meditation Retreat',
                        price_per_day: 5500,
                        location: 'Fairy Meadows, Gilgit',
                        rating: 4.6,
                        picture:
                            'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
                        brokerId: 'broker_gilgit_009',
                        brokerName: 'Meditation Master Nanga',
                        brokerPhone: '+92 359 9012345',
                        brokerEmail: 'nanga@stayscape.com',
                        description: 'Meditation retreat in mountain setting',
                        services: [
                            'Meditation Sessions',
                            'Yoga',
                            'Nature Walks',
                        ],
                        maxGuests: 8,
                    },
                    {
                        id: 'gilgit-10',
                        type: 'Food & Dining',
                        title: 'Traditional Balti Cuisine',
                        price: 4000,
                        location: 'Skardu Road, Gilgit',
                        rating: 4.8,
                        picture:
                            'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
                        brokerId: 'broker_gilgit_010',
                        brokerName: 'Chef Balti',
                        brokerPhone: '+92 360 0123456',
                        brokerEmail: 'balti@stayscape.com',
                        description: 'Authentic Balti mountain cuisine',
                        duration: '3 hours',
                        includes: [
                            'Multi-course Meal',
                            'Cooking Demo',
                            'Traditional Setting',
                        ],
                        maxGuests: 10,
                    },
                ],
            },
        ],
    },
};

// Service categories for the categories section
const serviceCategories = [
    {
        name: 'Accommodation',
        icon: 'fas fa-bed',
        description: 'Luxury stays & hotels',
    },
    {
        name: 'Experience',
        icon: 'fas fa-compass',
        description: 'Cultural adventures',
    },
    {
        name: 'Transportation',
        icon: 'fas fa-car',
        description: 'Reliable transport',
    },
    {
        name: 'Wellness',
        icon: 'fas fa-spa',
        description: 'Health & relaxation',
    },
    {
        name: 'Adventure',
        icon: 'fas fa-mountain',
        description: 'Thrilling activities',
    },
    {
        name: 'Food & Dining',
        icon: 'fas fa-utensils',
        description: 'Authentic cuisine',
    },
    {
        name: 'Cultural',
        icon: 'fas fa-mosque',
        description: 'Heritage & history',
    },
    {
        name: 'Shopping',
        icon: 'fas fa-shopping-bag',
        description: 'Local bazaars',
    },
    {
        name: 'Entertainment',
        icon: 'fas fa-music',
        description: 'Live performances',
    },
    {
        name: 'Photography',
        icon: 'fas fa-camera',
        description: 'Scenic photo tours',
    },
];

// Service features data for enhanced modal content
const serviceFeatures = {
    Accommodation: [
        'Free WiFi',
        'Air Conditioning',
        'Room Service',
        'Secure Parking',
        '24/7 Security',
        'Clean Linens',
        'Private Bathroom',
        'Traditional Decor',
        'Garden/Courtyard',
        'Local Cuisine',
        'Prayer Room',
        'Mountain/City Views',
    ],
    Experience: [
        'Expert Local Guide',
        'Small Group Tours',
        'Cultural Immersion',
        'Photo Opportunities',
        'Historical Insights',
        'Safety Equipment',
        'Traditional Refreshments',
        'Authentic Interactions',
        'Language Support',
        'Transportation Included',
        'Souvenir Shopping',
        'Certificate/Memento',
    ],
    Transportation: [
        'Licensed Driver',
        'Fuel Included',
        'Full Insurance',
        'GPS Navigation',
        'Clean Vehicle',
        'Door-to-Door Service',
        'Flexible Timing',
        'Safe Travel',
        'AC/Heating',
        'Luggage Space',
        '24/7 Availability',
        'Multiple Languages',
    ],
    Wellness: [
        'Certified Therapist',
        'Premium Products',
        'Peaceful Environment',
        'Health Benefits',
        'Personalized Treatment',
        'Hygienic Facilities',
        'Stress Relief',
        'Natural Ingredients',
        'Traditional Methods',
        'Relaxation Music',
        'Herbal Treatments',
        'Post-Care Advice',
    ],
    Adventure: [
        'Safety Equipment',
        'Professional Guide',
        'Thrilling Experience',
        'Scenic Photography',
        'Group Activities',
        'Insurance Coverage',
        'Equipment Provided',
        'Safety Briefing',
        'Emergency Support',
        'Weather Monitoring',
        'Skill Development',
        'Adventure Certificate',
    ],
    'Food & Dining': [
        'Fresh Ingredients',
        'Authentic Recipes',
        'Hygienic Kitchen',
        'Cultural Storytelling',
        'Master Chef',
        'Traditional Flavors',
        'Dietary Accommodations',
        'Cooking Demonstrations',
        'Recipe Sharing',
        'Local Spices',
        'Traditional Setting',
        'Take-Home Treats',
    ],
    Cultural: [
        'Expert Historian',
        'Historical Context',
        'Cultural Immersion',
        'Photography Allowed',
        'Local Legends',
        'Heritage Sites',
        'Educational Content',
        'Authentic Artifacts',
        'Traditional Crafts',
        'Local Interactions',
        'Language Insights',
        'Cultural Souvenirs',
    ],
    Shopping: [
        'Authentic Bazaars',
        'Handcrafted Items',
        'Bargaining Assistance',
        'Quality Guarantee',
        'Shopping Guide',
        'Best Price Deals',
        'Unique Handicrafts',
        'Cultural Significance',
        'Local Artisans',
        'Traditional Textiles',
        'Gemstones & Jewelry',
        'Shipping Assistance',
    ],
    Entertainment: [
        'Live Performances',
        'Traditional Shows',
        'Folk Music & Dance',
        'Interactive Sessions',
        'Professional Artists',
        'Cultural Programs',
        'Family Friendly',
        'Evening Entertainment',
        'Traditional Instruments',
        'Costume Displays',
        'Audience Participation',
        'Cultural Education',
    ],
    Photography: [
        'Professional Guide',
        'Scenic Locations',
        'Golden Hour Timing',
        'Equipment Guidance',
        'Composition Tips',
        'Local Insights',
        'Stunning Backdrops',
        'Photo Editing Tips',
        'Best Viewpoints',
        'Cultural Subjects',
        'Landscape Photography',
        'Portrait Opportunities',
    ],
};

// Global variables
let currentServices = [];
let currentUser = null;
const currentFilter = 'all';
let currentView = 'grid';
let allCities = [];

// Declare AOS and bootstrap variables
const AOS = window.AOS;
const bootstrap = window.bootstrap;

// Check authentication status
function checkAuthStatus() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        updateAuthUI();
    }
}

// Update authentication UI
function updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    const userAvatar = document.getElementById('userAvatar');
    const usernameDisplay = document.getElementById('usernameDisplay');

    if (currentUser) {
        if (authButtons) authButtons.style.display = 'none';
        if (userAvatar) userAvatar.style.display = 'block';
        if (usernameDisplay) usernameDisplay.textContent = currentUser.username;
    } else {
        if (authButtons) authButtons.style.display = 'flex';
        if (userAvatar) userAvatar.style.display = 'none';
    }
}

// Show login modal
function showLoginModal() {
    const signupModal = bootstrap.Modal.getInstance(
        document.getElementById('signupModal')
    );
    if (signupModal) signupModal.hide();

    const loginModal = new bootstrap.Modal(
        document.getElementById('loginModal')
    );
    loginModal.show();
}

// Show signup modal
function showSignupModal() {
    const loginModal = bootstrap.Modal.getInstance(
        document.getElementById('loginModal')
    );
    if (loginModal) loginModal.hide();

    const signupModal = new bootstrap.Modal(
        document.getElementById('signupModal')
    );
    signupModal.show();
}

// Update the authentication functions to use PHP backend
function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Show loading state
    showLoading();

    // Create form data
    const formData = new FormData();
    formData.append('action', 'login');
    formData.append('username', username);
    formData.append('password', password);

    fetch('php/auth.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(result => {
            hideLoading();

            if (result.success) {
                currentUser = result.user;
                localStorage.setItem(
                    'currentUser',
                    JSON.stringify(currentUser)
                );
                updateAuthUI();

                const loginModal = bootstrap.Modal.getInstance(
                    document.getElementById('loginModal')
                );
                loginModal.hide();

                showAlert('Login successful!', 'success');
                document.getElementById('loginForm').reset();
            } else {
                showAlert(
                    result.message || 'Login failed. Please try again.',
                    'danger'
                );
            }
        })
        .catch(error => {
            hideLoading();
            console.error('Login error:', error);
            showAlert('An error occurred. Please try again.', 'danger');
        });
}

// Update signup function
function handleSignup(e) {
    e.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const fullName = document.getElementById('signupFullName')?.value || '';

    // Show loading state
    showLoading();

    // Create form data
    const formData = new FormData();
    formData.append('action', 'signup');
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('full_name', fullName);

    fetch('php/auth.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(result => {
            hideLoading();

            if (result.success) {
                currentUser = result.user;
                localStorage.setItem(
                    'currentUser',
                    JSON.stringify(currentUser)
                );
                updateAuthUI();

                const signupModal = bootstrap.Modal.getInstance(
                    document.getElementById('signupModal')
                );
                signupModal.hide();

                showAlert('Account created successfully!', 'success');
                document.getElementById('signupForm').reset();
            } else {
                showAlert(
                    result.message ||
                        'Account creation failed. Please try again.',
                    'danger'
                );
            }
        })
        .catch(error => {
            hideLoading();
            console.error('Signup error:', error);
            showAlert('An error occurred. Please try again.', 'danger');
        });
}

// Update logout function
function logout() {
    fetch('php/auth.php', {
        method: 'POST',
        body: new URLSearchParams({ action: 'logout' }),
    })
        .then(response => response.json())
        .then(result => {
            currentUser = null;
            localStorage.removeItem('currentUser');
            updateAuthUI();
            showAlert('Logged out successfully!', 'info');
        })
        .catch(error => {
            console.error('Logout error:', error);
            // Still logout locally even if server request fails
            currentUser = null;
            localStorage.removeItem('currentUser');
            updateAuthUI();
            showAlert('Logged out successfully!', 'info');
        });
}

// Handle contact form
function handleContactForm(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append('action', 'send_message');

    // Show loading state
    showLoading();

    fetch('php/contact.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(result => {
            hideLoading();

            if (result.success) {
                showAlert(result.message, 'success');
                document.getElementById('contactForm').reset();
            } else {
                showAlert(
                    result.message ||
                        'Failed to send message. Please try again.',
                    'danger'
                );
            }
        })
        .catch(error => {
            hideLoading();
            console.error('Contact form error:', error);
            showAlert('An error occurred. Please try again.', 'danger');
        });
}

// Show alert
function showAlert(message, type = 'info') {
    const alertContainer =
        document.getElementById('alertContainer') || createAlertContainer();

    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    alertContainer.appendChild(alert);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Create alert container if it doesn't exist
function createAlertContainer() {
    const container = document.createElement('div');
    container.id = 'alertContainer';
    container.className = 'position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
}

// Update results count
function updateResultsCount(count) {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = `${count} service${
            count !== 1 ? 's' : ''
        } found`;
    }
}

// Show loading state
function showLoading() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (servicesGrid) {
        servicesGrid.innerHTML = `
            <div class="col-12 text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3">Loading services...</p>
            </div>
        `;
    }
}

// Hide loading state
function hideLoading() {
    // Loading is hidden when services are displayed
}

// Clear services display
function clearServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (servicesGrid) {
        servicesGrid.innerHTML = `
            <div class="col-12 text-center">
                <div class="no-results">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4>No Services Found</h4>
                    <p class="text-muted">Try selecting a different city or category.</p>
                </div>
            </div>
        `;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic',
        });
    }

    // Setup all functionality
    loadCities();
    checkAuthStatus();
    setupEventListeners();
    setActiveNavLink();
    setupScrollToTop();
    setupCityFilters();
    setupNavbarScroll();
    setupViewToggle();
    setupSorting();
    setupCategoryFilters();
    setupAdvancedFilters();
    initializeCounterAnimation();
}

// Setup navbar scroll effect
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const scrollHandler = throttle(() => {
            if (window.scrollY > 100) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }, 100);

        window.addEventListener('scroll', scrollHandler);
    }
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;

        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// Set active navigation link
function setActiveNavLink() {
    const currentPage =
        window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (
            href === currentPage ||
            (currentPage === '' && href === 'index.html')
        ) {
            link.classList.add('active');
        }
    });
}

// Setup scroll to top functionality
function setupScrollToTop() {
    const goToTopBtn = document.getElementById('goToTop');

    if (goToTopBtn) {
        const scrollHandler = throttle(() => {
            if (window.pageYOffset > 300) {
                goToTopBtn.classList.add('show');
            } else {
                goToTopBtn.classList.remove('show');
            }
        }, 100);

        window.addEventListener('scroll', scrollHandler);

        goToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
    }
}

// Setup city filter buttons
function setupCityFilters() {
    const citySelect = document.getElementById('citySelect');
    if (citySelect) {
        citySelect.addEventListener('change', e => {
            const city = e.target.value;
            if (city) {
                loadServices(city);
            } else {
                loadAllServices();
            }
        });
    }
}

// Update the createCategoryFilterButtons function to create buttons for the offcanvas
function createCategoryFilterButtons() {
    const categoryFilterContainer = document.getElementById(
        'categoryFilterButtons'
    );
    if (!categoryFilterContainer) return;

    // Clear existing buttons
    categoryFilterContainer.innerHTML = '';

    // Add "All Categories" button
    const allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.className =
        'btn btn-outline-primary btn-sm w-100 mb-2 category-btn active';
    allBtn.setAttribute('data-category', '');
    allBtn.innerHTML = '<i class="fas fa-th-large me-2"></i>All Categories';
    categoryFilterContainer.appendChild(allBtn);

    // Add category buttons
    serviceCategories.forEach(category => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className =
            'btn btn-outline-primary btn-sm w-100 mb-2 category-btn';
        button.setAttribute('data-category', category.name);
        button.innerHTML = `<i class="${category.icon} me-2"></i>${category.name}`;
        categoryFilterContainer.appendChild(button);
    });
}

// Update the setupCategoryFilters function to work with the offcanvas
function setupCategoryFilters() {
    const categoryFilterContainer = document.getElementById(
        'categoryFilterButtons'
    );
    if (categoryFilterContainer) {
        categoryFilterContainer.addEventListener('click', e => {
            if (
                e.target.matches('button[data-category]') ||
                e.target.closest('button[data-category]')
            ) {
                const button = e.target.matches('button[data-category]')
                    ? e.target
                    : e.target.closest('button[data-category]');

                // Update active button
                categoryFilterContainer
                    .querySelectorAll('button')
                    .forEach(btn => {
                        btn.classList.remove('active');
                    });
                button.classList.add('active');

                // Filter services by category
                const category = button.getAttribute('data-category');
                filterServicesByCategory(category);
            }
        });
    }
}

// Setup view toggle
function setupViewToggle() {
    const viewSelect = document.getElementById('viewSelect');
    if (viewSelect) {
        viewSelect.addEventListener('change', function () {
            const view = this.value;
            toggleView(view);
        });
    }
}

// Toggle view (grid/list)
function toggleView(view) {
    currentView = view;

    const servicesContainer = document.getElementById('servicesContainer');
    const servicesGrid = document.getElementById('servicesGrid');

    if (view === 'list') {
        servicesContainer.className = 'service-list';
        servicesGrid.className = 'row g-2';
    } else {
        servicesContainer.className = 'service-grid';
        servicesGrid.className = 'row g-4';
    }

    displayServices(currentServices);
}

// Setup sorting
function setupSorting() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', sortServices);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Booking form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBooking);
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Set minimum date for booking
    setupBookingDates();
}

// Setup booking date inputs
function setupBookingDates() {
    const bookingCheckIn = document.getElementById('bookingCheckIn');
    const bookingCheckOut = document.getElementById('bookingCheckOut');

    if (bookingCheckIn && bookingCheckOut) {
        const today = new Date().toISOString().split('T')[0];
        bookingCheckIn.min = today;
        bookingCheckOut.min = today;

        bookingCheckIn.addEventListener('change', function () {
            bookingCheckOut.min = this.value;
            if (bookingCheckOut.value && bookingCheckOut.value < this.value) {
                bookingCheckOut.value = this.value;
            }
        });
    }
}

// Load cities and create filter buttons
function loadCities() {
    try {
        const cities = pakistanData.Pakistan.cities.map(city => city.name);
        allCities = cities;
        createCityFilterButtons(cities);
        createCategoryFilterButtons();
    } catch (error) {
        console.error('Error loading cities:', error);
        showAlert('Error loading cities data', 'warning');
    }
}

// Create city filter buttons
function createCityFilterButtons(cities) {
    const citySelect = document.getElementById('citySelect');
    if (!citySelect) return;

    // Clear existing options except the first one
    while (citySelect.children.length > 1) {
        citySelect.removeChild(citySelect.lastChild);
    }

    // Add city options
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}

// Update the clearAllFilters function to reset category buttons in offcanvas
function clearAllFilters() {
    // Reset price range
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    if (priceRange && priceValue) {
        priceRange.value = priceRange.max;
        priceValue.textContent = `PKR ${Number.parseInt(
            priceRange.max
        ).toLocaleString()}`;
    }

    // Reset rating filter
    const ratingFilter = document.getElementById('ratingFilter');
    if (ratingFilter) {
        ratingFilter.value = '';
    }

    // Reset distance filter
    const distanceFilter = document.getElementById('distanceFilter');
    if (distanceFilter) {
        distanceFilter.value = '';
    }

    // Reset amenities checkboxes
    const amenitiesCheckboxes = document.querySelectorAll(
        'input[name="amenities"]'
    );
    amenitiesCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Reset category filter buttons in offcanvas
    const categoryButtons = document.querySelectorAll(
        '#categoryFilterButtons .category-btn'
    );
    categoryButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    const allCategoryBtn = document.querySelector(
        '#categoryFilterButtons .category-btn[data-category=""]'
    );
    if (allCategoryBtn) {
        allCategoryBtn.classList.add('active');
    }

    // Display all current services
    displayServices(currentServices);
    updateResultsCount(currentServices.length);
}

// Load all services
function loadAllServices() {
    try {
        showLoading();

        // Get all services from all cities
        let allServices = [];
        pakistanData.Pakistan.cities.forEach(city => {
            allServices = allServices.concat(city.services);
        });

        currentServices = allServices;
        displayServices(allServices);
        updateResultsCount(allServices.length);
    } catch (error) {
        console.error('Error loading services:', error);
        showAlert('Error loading services', 'danger');
    } finally {
        hideLoading();
    }
}

// Load services for selected city
function loadServices(cityName) {
    try {
        showLoading();

        const city = pakistanData.Pakistan.cities.find(
            c => c.name === cityName
        );
        if (city && city.services) {
            currentServices = city.services;
            displayServices(city.services);
            updateResultsCount(city.services.length);
        } else {
            showAlert(`No services found for ${cityName}`, 'info');
            clearServices();
        }
    } catch (error) {
        console.error('Error loading services:', error);
        showAlert('Error loading services', 'danger');
        clearServices();
    } finally {
        hideLoading();
    }
}

// Filter services by category
function filterServicesByCategory(category) {
    if (!category) {
        displayServices(currentServices);
        return;
    }

    const filteredServices = currentServices.filter(
        service => service.type === category
    );
    displayServices(filteredServices);
    updateResultsCount(filteredServices.length);
}

// Display services
function displayServices(services) {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;

    if (!services || services.length === 0) {
        servicesGrid.innerHTML = `
            <div class="col-12 text-center">
                <div class="no-results">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4>No Services Found</h4>
                    <p class="text-muted">Try selecting a different city or category.</p>
                </div>
            </div>
        `;
        return;
    }

    servicesGrid.innerHTML = '';

    services.forEach(service => {
        const serviceCard = createServiceCard(service);
        servicesGrid.appendChild(serviceCard);
    });
}

// Create service card
function createServiceCard(service) {
    const col = document.createElement('div');

    if (currentView === 'list') {
        col.className = 'col-12 mb-2';
    } else {
        col.className = 'col-lg-4 col-md-6 mb-4';
    }

    const priceDisplay = service.price_per_night
        ? `PKR ${service.price_per_night.toLocaleString()}/night`
        : service.price_per_day
        ? `PKR ${service.price_per_day.toLocaleString()}/day`
        : service.price_per_hour
        ? `PKR ${service.price_per_hour.toLocaleString()}/hour`
        : service.price_per_km
        ? `PKR ${service.price_per_km}/km`
        : service.price
        ? `PKR ${service.price.toLocaleString()}`
        : 'Contact for Price';

    if (currentView === 'list') {
        // List view layout
        col.innerHTML = `
      <div class="card service-card-list" onclick="showServiceDetails('${
          service.id
      }')">
        <div class="row g-0">
          <div class="col-md-3">
            <img src="${
                service.picture
            }" class="img-fluid rounded-start h-100 object-cover" alt="${
            service.title
        }">
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <span class="badge service-badge badge-${service.type
                    .toLowerCase()
                    .replace(/\s+/g, '-')}">${service.type}</span>
                <div class="rating-stars">
                  ${generateStars(service.rating)}
                  <small class="text-muted ms-1">(${service.rating})</small>
                </div>
              </div>
              <div class="row">
                <div class="col-md-8">
                  <h5 class="card-title">${service.title}</h5>
                  <p class="card-text text-muted">${service.description}</p>
                  <div class="mb-2">
                    <small class="text-muted">
                      <i class="fas fa-map-marker-alt me-1"></i>${
                          service.location
                      }
                    </small>
                  </div>
                  ${
                      service.amenities
                          ? `
                      <div class="amenities mb-2">
                          ${service.amenities
                              .slice(0, 4)
                              .map(
                                  amenity =>
                                      `<span class="feature-item-small">${amenity}</span>`
                              )
                              .join('')}
                          ${
                              service.amenities.length > 4
                                  ? `<span class="feature-item-small">+${
                                        service.amenities.length - 4
                                    } more</span>`
                                  : ''
                          }
                      </div>
                  `
                          : ''
                  }
                </div>
                <div class="col-md-4 text-end">
                  <div class="price-tag-large mb-3">${priceDisplay}</div>
                  <button class="btn btn-primary" onclick="event.stopPropagation(); showBookingModal('${
                      service.id
                  }')">
                    <i class="fas fa-calendar-check me-1"></i>Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    } else {
        // Grid view layout (original)
        col.innerHTML = `
      <div class="card service-card h-100" onclick="showServiceDetails('${
          service.id
      }')">
          <img src="${service.picture}" class="card-img-top" alt="${
            service.title
        }">
          <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                  <span class="badge service-badge badge-${service.type
                      .toLowerCase()
                      .replace(/\s+/g, '-')}">${service.type}</span>
                  <div class="rating-stars">
                      ${generateStars(service.rating)}
                      <small class="text-muted ms-1">(${service.rating})</small>
                  </div>
              </div>
              <h5 class="card-title">${service.title}</h5>
              <p class="card-text text-muted">${service.description}</p>
              <div class="mb-2">
                  <small class="text-muted">
                      <i class="fas fa-map-marker-alt me-1"></i>${
                          service.location
                      }
                  </small>
              </div>
              ${
                  service.amenities
                      ? `
                  <div class="amenities mb-3">
                      ${service.amenities
                          .slice(0, 3)
                          .map(
                              amenity =>
                                  `<span class="feature-item">${amenity}</span>`
                          )
                          .join('')}
                      ${
                          service.amenities.length > 3
                              ? `<span class="feature-item">+${
                                    service.amenities.length - 3
                                } more</span>`
                              : ''
                      }
                  </div>
              `
                      : ''
              }
              <div class="d-flex justify-content-between align-items-center">
                  <div class="price-tag">${priceDisplay}</div>
                  <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); showBookingModal('${
                      service.id
                  }')">
                      <i class="fas fa-calendar-check me-1"></i>Book Now
                  </button>
              </div>
          </div>
      </div>
    `;
    }

    return col;
}

// Generate star rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Show service details modal
function showServiceDetails(serviceId) {
    const service = findServiceById(serviceId);
    if (!service) return;

    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('serviceModalTitle');
    const modalBody = document.getElementById('serviceModalBody');

    modalTitle.textContent = service.title;

    const features = serviceFeatures[service.type] || [];
    const priceDisplay = service.price_per_night
        ? `PKR ${service.price_per_night.toLocaleString()}/night`
        : service.price_per_day
        ? `PKR ${service.price_per_day.toLocaleString()}/day`
        : service.price_per_hour
        ? `PKR ${service.price_per_hour.toLocaleString()}/hour`
        : service.price_per_km
        ? `PKR ${service.price_per_km}/km`
        : service.price
        ? `PKR ${service.price.toLocaleString()}`
        : 'Contact for Price';

    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${
                    service.picture
                }" class="img-fluid rounded mb-3" alt="${service.title}">
            </div>
            <div class="col-md-6">
                <div class="mb-3">
                    <span class="badge service-badge badge-${service.type
                        .toLowerCase()
                        .replace(/\s+/g, '-')}">${service.type}</span>
                    <div class="rating-stars mt-2">
                        ${generateStars(service.rating)}
                        <small class="text-muted ms-1">(${
                            service.rating
                        } rating)</small>
                    </div>
                </div>
                <p class="text-muted">${service.description}</p>
                <div class="mb-3">
                    <h6><i class="fas fa-map-marker-alt me-2"></i>Location</h6>
                    <p>${service.location}</p>
                </div>
                <div class="mb-3">
                    <h6><i class="fas fa-tag me-2"></i>Price</h6>
                    <p class="price-tag">${priceDisplay}</p>
                </div>
                ${
                    service.maxGuests
                        ? `
                    <div class="mb-3">
                        <h6><i class="fas fa-users me-2"></i>Capacity</h6>
                        <p>Up to ${service.maxGuests} guests</p>
                    </div>
                `
                        : ''
                }
                ${
                    service.duration
                        ? `
                    <div class="mb-3">
                        <h6><i class="fas fa-clock me-2"></i>Duration</h6>
                        <p>${service.duration}</p>
                    </div>
                `
                        : ''
                }
            </div>
        </div>
        
        ${
            service.amenities
                ? `
            <div class="mt-4">
                <h6><i class="fas fa-check-circle me-2"></i>Amenities</h6>
                <div class="amenities">
                    ${service.amenities
                        .map(
                            amenity =>
                                `<span class="feature-item">${amenity}</span>`
                        )
                        .join('')}
                </div>
            </div>
        `
                : ''
        }
        
        ${
            service.includes
                ? `
            <div class="mt-4">
                <h6><i class="fas fa-plus-circle me-2"></i>Includes</h6>
                <div class="amenities">
                    ${service.includes
                        .map(
                            item => `<span class="feature-item">${item}</span>`
                        )
                        .join('')}
                </div>
            </div>
        `
                : ''
        }
        
        <div class="mt-4">
            <h6><i class="fas fa-star me-2"></i>Features</h6>
            <div class="amenities">
                ${features
                    .slice(0, 6)
                    .map(
                        feature =>
                            `<span class="feature-item">${feature}</span>`
                    )
                    .join('')}
            </div>
        </div>
        
        <div class="mt-4">
            <h6><i class="fas fa-user-tie me-2"></i>Service Provider</h6>
            <div class="broker-info">
                <p><strong>${service.brokerName}</strong></p>
                <p><i class="fas fa-phone me-2"></i>${service.brokerPhone}</p>
                <p><i class="fas fa-envelope me-2"></i>${
                    service.brokerEmail
                }</p>
            </div>
        </div>
        
        <div class="mt-4 text-center">
            <button class="btn btn-primary btn-lg" onclick="showBookingModal('${
                service.id
            }')">
                <i class="fas fa-calendar-check me-2"></i>Book This Service
            </button>
        </div>
    `;

    const serviceModal = new bootstrap.Modal(modal);
    serviceModal.show();
}

// Find service by ID
function findServiceById(serviceId) {
    for (const city of pakistanData.Pakistan.cities) {
        const service = city.services.find(s => s.id === serviceId);
        if (service) return service;
    }
    return null;
}

// Show booking modal
function showBookingModal(serviceId) {
    if (!currentUser) {
        showAlert('Please login to make a booking', 'warning');
        showLoginModal();
        return;
    }

    const service = findServiceById(serviceId);
    if (!service) return;

    // Close service modal if open
    const serviceModal = bootstrap.Modal.getInstance(
        document.getElementById('serviceModal')
    );
    if (serviceModal) serviceModal.hide();

    const modal = document.getElementById('bookingModal');
    const modalTitle = document.getElementById('bookingModalTitle');
    const modalBody = document.getElementById('bookingModalBody');

    modalTitle.textContent = `Book ${service.title}`;

    const priceDisplay = service.price_per_night
        ? `PKR ${service.price_per_night.toLocaleString()}/night`
        : service.price_per_day
        ? `PKR ${service.price_per_day.toLocaleString()}/day`
        : service.price_per_hour
        ? `PKR ${service.price_per_hour.toLocaleString()}/hour`
        : service.price_per_km
        ? `PKR ${service.price_per_km}/km`
        : service.price
        ? `PKR ${service.price.toLocaleString()}`
        : 'Contact for Price';

    modalBody.innerHTML = `
        <div class="row mb-4">
            <div class="col-md-4">
                <img src="${service.picture}" class="img-fluid rounded" alt="${
        service.title
    }">
            </div>
            <div class="col-md-8">
                <h5>${service.title}</h5>
                <p class="text-muted">${service.description}</p>
                <p><i class="fas fa-map-marker-alt me-2"></i>${
                    service.location
                }</p>
                <p class="price-tag">${priceDisplay}</p>
            </div>
        </div>
        
        <form id="bookingForm">
            <input type="hidden" id="bookingServiceId" value="${serviceId}">
            
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="bookingCheckIn" class="form-label">Check-in Date</label>
                    <input type="date" class="form-control" id="bookingCheckIn" required>
                </div>
                <div class="col-md-6">
                    <label for="bookingCheckOut" class="form-label">Check-out Date</label>
                    <input type="date" class="form-control" id="bookingCheckOut" required>
                </div>
            </div>
            
            <div class="mb-3">
                <label for="bookingGuests" class="form-label">Number of Guests</label>
                <select class="form-select" id="bookingGuests" required>
                    ${Array.from(
                        { length: service.maxGuests || 10 },
                        (_, i) => i + 1
                    )
                        .map(
                            num =>
                                `<option value="${num}">${num} guest${
                                    num > 1 ? 's' : ''
                                }</option>`
                        )
                        .join('')}
                </select>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="bookingContactName" class="form-label">Contact Name</label>
                    <input type="text" class="form-control" id="bookingContactName" value="${
                        currentUser.full_name || currentUser.username
                    }" required>
                </div>
                <div class="col-md-6">
                    <label for="bookingContactEmail" class="form-label">Contact Email</label>
                    <input type="email" class="form-control" id="bookingContactEmail" value="${
                        currentUser.email
                    }" required>
                </div>
            </div>
            
            <div class="mb-3">
                <label for="bookingContactPhone" class="form-label">Contact Phone</label>
                <input type="tel" class="form-control" id="bookingContactPhone" value="${
                    currentUser.phone || ''
                }" required>
            </div>
            
            <div class="mb-3">
                <label for="bookingSpecialRequests" class="form-label">Special Requests (Optional)</label>
                <textarea class="form-control" id="bookingSpecialRequests" rows="3" placeholder="Any special requirements or requests..."></textarea>
            </div>
            
            <div class="text-center">
                <button type="submit" class="btn btn-primary btn-lg">
                    <i class="fas fa-calendar-check me-2"></i>Confirm Booking
                </button>
            </div>
        </form>
    `;

    // Setup booking dates
    setupBookingDates();

    // Setup form handler
    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', handleBooking);

    const bookingModal = new bootstrap.Modal(modal);
    bookingModal.show();
}

// Handle booking submission
function handleBooking(e) {
    e.preventDefault();

    if (!currentUser) {
        showAlert('Please login to make a booking', 'warning');
        return;
    }

    const formData = new FormData();
    formData.append('action', 'create');
    formData.append(
        'service_id',
        document.getElementById('bookingServiceId').value
    );
    formData.append(
        'check_in_date',
        document.getElementById('bookingCheckIn').value
    );
    formData.append(
        'check_out_date',
        document.getElementById('bookingCheckOut').value
    );
    formData.append('guests', document.getElementById('bookingGuests').value);
    formData.append(
        'contact_name',
        document.getElementById('bookingContactName').value
    );
    formData.append(
        'contact_email',
        document.getElementById('bookingContactEmail').value
    );
    formData.append(
        'contact_phone',
        document.getElementById('bookingContactPhone').value
    );
    formData.append(
        'special_requests',
        document.getElementById('bookingSpecialRequests').value
    );

    // Show loading state
    showLoading();

    fetch('php/booking.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(result => {
            hideLoading();

            if (result.success) {
                const bookingModal = bootstrap.Modal.getInstance(
                    document.getElementById('bookingModal')
                );
                bookingModal.hide();

                showAlert('Booking confirmed successfully!', 'success');

                // Redirect to booking confirmation page with booking details
                const bookingData = result.booking;
                localStorage.setItem(
                    'latestBooking',
                    JSON.stringify(bookingData)
                );
                window.location.href = 'booking-confirmation.html';
            } else {
                showAlert(
                    result.message || 'Booking failed. Please try again.',
                    'danger'
                );
            }
        })
        .catch(error => {
            hideLoading();
            console.error('Booking error:', error);
            showAlert('An error occurred. Please try again.', 'danger');
        });
}

// Sort services
function sortServices() {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) return;

    const sortBy = sortSelect.value;
    const sortedServices = [...currentServices];

    switch (sortBy) {
        case 'price-low':
            sortedServices.sort(
                (a, b) => getServicePrice(a) - getServicePrice(b)
            );
            break;
        case 'price-high':
            sortedServices.sort(
                (a, b) => getServicePrice(b) - getServicePrice(a)
            );
            break;
        case 'rating':
            sortedServices.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            sortedServices.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            // Default sorting (no change)
            break;
    }

    displayServices(sortedServices);
}

// Get service price for sorting
function getServicePrice(service) {
    return (
        service.price_per_night ||
        service.price_per_day ||
        service.price_per_hour ||
        service.price ||
        0
    );
}

// Setup advanced filters
function setupAdvancedFilters() {
    // Price range filter
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    if (priceRange && priceValue) {
        priceRange.addEventListener('input', function () {
            const value = Number.parseInt(this.value);
            priceValue.textContent = `PKR ${value.toLocaleString()}`;
            applyAdvancedFilters();
        });
    }

    // Rating filter
    const ratingFilter = document.getElementById('ratingFilter');
    if (ratingFilter) {
        ratingFilter.addEventListener('change', applyAdvancedFilters);
    }

    // Distance filter
    const distanceFilter = document.getElementById('distanceFilter');
    if (distanceFilter) {
        distanceFilter.addEventListener('change', applyAdvancedFilters);
    }

    // Amenities filter
    const amenitiesCheckboxes = document.querySelectorAll(
        'input[name="amenities"]'
    );
    amenitiesCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyAdvancedFilters);
    });
}

// Apply advanced filters
function applyAdvancedFilters() {
    let filteredServices = [...currentServices];

    // Price filter
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        const maxPrice = Number.parseInt(priceRange.value);
        filteredServices = filteredServices.filter(service => {
            const servicePrice = getServicePrice(service);
            return servicePrice <= maxPrice;
        });
    }

    // Rating filter
    const ratingFilter = document.getElementById('ratingFilter');
    if (ratingFilter && ratingFilter.value) {
        const minRating = Number.parseFloat(ratingFilter.value);
        filteredServices = filteredServices.filter(
            service => service.rating >= minRating
        );
    }

    // Amenities filter
    const selectedAmenities = Array.from(
        document.querySelectorAll('input[name="amenities"]:checked')
    ).map(cb => cb.value);

    if (selectedAmenities.length > 0) {
        filteredServices = filteredServices.filter(service => {
            if (!service.amenities) return false;
            return selectedAmenities.some(amenity =>
                service.amenities.includes(amenity)
            );
        });
    }

    displayServices(filteredServices);
    updateResultsCount(filteredServices.length);
}

// Initialize counter animation
function initializeCounterAnimation() {
    const counters = document.querySelectorAll('.counter');

    const animateCounter = counter => {
        const target = Number.parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    };

    // Intersection Observer for counter animation
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Search functionality
function searchServices(query) {
    if (!query.trim()) {
        displayServices(currentServices);
        return;
    }

    const filteredServices = currentServices.filter(
        service =>
            service.title.toLowerCase().includes(query.toLowerCase()) ||
            service.description.toLowerCase().includes(query.toLowerCase()) ||
            service.location.toLowerCase().includes(query.toLowerCase()) ||
            service.type.toLowerCase().includes(query.toLowerCase())
    );

    displayServices(filteredServices);
    updateResultsCount(filteredServices.length);
}

// Export functions for global access
window.showLoginModal = showLoginModal;
window.showSignupModal = showSignupModal;
window.logout = logout;
window.showServiceDetails = showServiceDetails;
window.showBookingModal = showBookingModal;
window.loadServices = loadServices;
window.loadAllServices = loadAllServices;
window.clearAllFilters = clearAllFilters;
window.searchServices = searchServices;
