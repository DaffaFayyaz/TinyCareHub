// This file serves as a mock database for daycare information

export interface DaycareBasic {
    id: number
    name: string
    image: string
    rating: number
    reviews: number
    price: string
    location: string
    description: string
}

export interface Activity {
    id: number
    title: string
    description: string
    time: string
}

export interface Review {
    id: number
    author: string
    avatar: string
    rating: number
    date: string
    content: string
}

export interface DaycareDetailed extends DaycareBasic {
    images: string[]
    fullLocation: string
    fullDescription: string
    hours: string
    ageGroups: string[]
    amenities: string[]
    activities: Activity[]
}

// Basic daycare data for the listings page
export const daycareListings: DaycareBasic[] = [
    {
        id: 1,
        name: "Sunshine Daycare Center",
        image: "/daycare1.jpg?height=200&width=300",
        rating: 4.8,
        reviews: 124,
        price: "$45/day",
        location: "Downtown",
        description: "A bright and cheerful environment where children can learn and play.",
    },
    {
        id: 2,
        name: "Little Explorers Childcare",
        image: "/placeholder.svg?height=200&width=300",
        rating: 4.6,
        reviews: 98,
        price: "$40/day",
        location: "Westside",
        description: "Focused on early childhood development through exploration and play.",
    },
    {
        id: 3,
        name: "Tiny Tots Academy",
        image: "/placeholder.svg?height=200&width=300",
        rating: 4.9,
        reviews: 156,
        price: "$50/day",
        location: "Northside",
        description: "Premium childcare with a structured learning curriculum for all ages.",
    },
    {
        id: 4,
        name: "Happy Kids Daycare",
        image: "/placeholder.svg?height=200&width=300",
        rating: 4.7,
        reviews: 112,
        price: "$42/day",
        location: "Eastside",
        description: "A home-like environment where children feel comfortable and secure.",
    },
    {
        id: 5,
        name: "Bright Beginnings",
        image: "/placeholder.svg?height=200&width=300",
        rating: 4.5,
        reviews: 87,
        price: "$38/day",
        location: "Southside",
        description: "Nurturing care with a focus on creative development and social skills.",
    },
    {
        id: 6,
        name: "Little Learners Daycare",
        image: "/placeholder.svg?height=200&width=300",
        rating: 4.7,
        reviews: 103,
        price: "$44/day",
        location: "Central",
        description: "Educational childcare that prepares your little ones for school success.",
    },
]

// Detailed daycare data for the individual daycare pages
export const daycareDetails: Record<number, DaycareDetailed> = {
    1: {
        id: 1,
        name: "Sunshine Daycare Center",
        image: "/daycare1.jpg?height=200&width=300",
        images: [
            "/daycare1.jpg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
        ],
        rating: 4.8,
        reviews: 124,
        price: "$45/day",
        location: "Downtown",
        fullLocation: "123 Main St, Downtown",
        description: "A bright and cheerful environment where children can learn and play.",
        fullDescription:
            "Sunshine Daycare Center provides a bright and cheerful environment where children can learn and play. Our experienced staff is dedicated to creating a nurturing atmosphere that promotes early childhood development through a balance of structured activities and free play. We offer flexible scheduling options to accommodate working parents and provide nutritious meals and snacks throughout the day.",
        hours: "Monday - Friday: 7:00 AM - 6:00 PM",
        ageGroups: ["Infant (0-1)", "Toddler (1-3)", "Preschool (3-5)"],
        amenities: ["Outdoor Playground", "Learning Center", "Nap Area", "CCTV Monitoring", "Meal Service"],
        activities: [
            {
                id: 1,
                title: "Morning Circle Time",
                description: "Group activities including songs, stories, and movement.",
                time: "9:00 AM",
            },
            {
                id: 2,
                title: "Arts & Crafts",
                description: "Creative expression through various art mediums.",
                time: "10:30 AM",
            },
            {
                id: 3,
                title: "Outdoor Play",
                description: "Physical activity and exploration in our playground.",
                time: "11:30 AM",
            },
            {
                id: 4,
                title: "Lunch & Rest Time",
                description: "Nutritious meal followed by nap or quiet activities.",
                time: "12:30 PM",
            },
            {
                id: 5,
                title: "Learning Centers",
                description: "Self-directed play in various educational centers.",
                time: "2:30 PM",
            },
        ],
    },
    2: {
        id: 2,
        name: "Little Explorers Childcare",
        image: "/placeholder.svg?height=200&width=300",
        images: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
        ],
        rating: 4.6,
        reviews: 98,
        price: "$40/day",
        location: "Westside",
        fullLocation: "456 West Avenue, Westside",
        description: "Focused on early childhood development through exploration and play.",
        fullDescription:
            "Little Explorers Childcare is dedicated to nurturing curious minds through exploration and play-based learning. Our child-centered approach focuses on developing social, emotional, and cognitive skills in a safe and stimulating environment. With specially designed learning areas and outdoor exploration zones, we encourage children to discover the world around them at their own pace while being guided by our trained early childhood educators.",
        hours: "Monday - Friday: 6:30 AM - 5:30 PM",
        ageGroups: ["Infant (0-1)", "Toddler (1-3)", "Preschool (3-5)"],
        amenities: ["Exploration Zones", "Natural Playground", "Science Area", "CCTV Monitoring", "Organic Meals"],
        activities: [
            {
                id: 1,
                title: "Discovery Time",
                description: "Hands-on exploration of natural materials and objects.",
                time: "8:30 AM",
            },
            {
                id: 2,
                title: "Outdoor Adventures",
                description: "Guided nature exploration and physical activities.",
                time: "10:00 AM",
            },
            {
                id: 3,
                title: "Science Experiments",
                description: "Age-appropriate experiments and observations.",
                time: "11:15 AM",
            },
            {
                id: 4,
                title: "Lunch & Rest",
                description: "Organic meals followed by quiet time.",
                time: "12:00 PM",
            },
            {
                id: 5,
                title: "Story & Music",
                description: "Interactive storytelling and musical activities.",
                time: "2:30 PM",
            },
        ],
    },
    3: {
        id: 3,
        name: "Tiny Tots Academy",
        image: "/placeholder.svg?height=200&width=300",
        images: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
        ],
        rating: 4.9,
        reviews: 156,
        price: "$50/day",
        location: "Northside",
        fullLocation: "789 North Boulevard, Northside",
        description: "Premium childcare with a structured learning curriculum for all ages.",
        fullDescription:
            "Tiny Tots Academy offers premium childcare with a carefully designed curriculum that balances academic readiness with playful learning. Our academy approach prepares children for future academic success while nurturing their natural curiosity and joy of learning. With low student-to-teacher ratios and specialized learning programs, we provide individualized attention to help each child reach their full potential in a luxurious, state-of-the-art facility.",
        hours: "Monday - Friday: 7:00 AM - 7:00 PM, Saturday: 9:00 AM - 5:00 PM",
        ageGroups: ["Infant (0-1)", "Toddler (1-3)", "Preschool (3-5)", "Pre-K (4-5)"],
        amenities: [
            "Modern Learning Facilities",
            "Interactive Smart Boards",
            "Indoor Gymnasium",
            "Swimming Pool",
            "CCTV Monitoring",
            "Gourmet Meal Service",
        ],
        activities: [
            {
                id: 1,
                title: "Early Literacy",
                description: "Age-appropriate reading and writing activities.",
                time: "9:00 AM",
            },
            {
                id: 2,
                title: "Mathematics Exploration",
                description: "Counting, sorting, and early math concepts.",
                time: "10:15 AM",
            },
            {
                id: 3,
                title: "Physical Education",
                description: "Structured physical activities in our gymnasium.",
                time: "11:30 AM",
            },
            {
                id: 4,
                title: "Gourmet Lunch & Rest",
                description: "Nutritionist-approved meals followed by rest period.",
                time: "12:30 PM",
            },
            {
                id: 5,
                title: "Arts & Innovation",
                description: "Creative expression through various mediums and technology.",
                time: "2:45 PM",
            },
            {
                id: 6,
                title: "Language Immersion",
                description: "Exposure to foreign languages through play and songs.",
                time: "4:00 PM",
            },
        ],
    },
    4: {
        id: 4,
        name: "Happy Kids Daycare",
        image: "/placeholder.svg?height=200&width=300",
        images: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
        ],
        rating: 4.7,
        reviews: 112,
        price: "$42/day",
        location: "Eastside",
        fullLocation: "321 East Street, Eastside",
        description: "A home-like environment where children feel comfortable and secure.",
        fullDescription:
            "Happy Kids Daycare creates a warm, home-like environment where children feel comfortable, secure, and loved. Our family-centered approach focuses on creating a seamless transition between home and daycare, with cozy spaces, familiar routines, and nurturing caregivers. We believe that children thrive when they feel safe and connected, allowing their natural curiosity and development to flourish in a relaxed and supportive setting.",
        hours: "Monday - Friday: 7:30 AM - 6:00 PM",
        ageGroups: ["Infant (0-1)", "Toddler (1-3)", "Preschool (3-5)"],
        amenities: ["Homelike Setting", "Reading Nooks", "Outdoor Garden", "CCTV Monitoring", "Home-cooked Meals"],
        activities: [
            {
                id: 1,
                title: "Family Style Breakfast",
                description: "Children help set tables and enjoy meals together.",
                time: "8:00 AM",
            },
            {
                id: 2,
                title: "Story Circle",
                description: "Interactive storytelling and discussions.",
                time: "9:30 AM",
            },
            {
                id: 3,
                title: "Garden Time",
                description: "Planting, watering, and learning about nature.",
                time: "10:45 AM",
            },
            {
                id: 4,
                title: "Home-cooked Lunch",
                description: "Nutritious meals made on-site, followed by rest.",
                time: "12:00 PM",
            },
            {
                id: 5,
                title: "Creative Play",
                description: "Self-directed play with various materials and toys.",
                time: "2:30 PM",
            },
        ],
    },
    5: {
        id: 5,
        name: "Bright Beginnings",
        image: "/placeholder.svg?height=200&width=300",
        images: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
        ],
        rating: 4.5,
        reviews: 87,
        price: "$38/day",
        location: "Southside",
        fullLocation: "567 South Road, Southside",
        description: "Nurturing care with a focus on creative development and social skills.",
        fullDescription:
            "Bright Beginnings offers affordable, high-quality childcare with a focus on creative development and social skills. Our daycare emphasizes art, music, and collaborative activities that help children express themselves and learn to work well with others. With bright, colorful spaces and a variety of creative materials always available, we encourage imagination and self-expression while building the foundation for lifelong social and emotional intelligence.",
        hours: "Monday - Friday: 7:00 AM - 5:30 PM",
        ageGroups: ["Toddler (1-3)", "Preschool (3-5)"],
        amenities: ["Art Studio", "Music Corner", "Dramatic Play Areas", "CCTV Monitoring", "Healthy Meals"],
        activities: [
            {
                id: 1,
                title: "Morning Music",
                description: "Songs, movement, and instrument exploration.",
                time: "8:30 AM",
            },
            {
                id: 2,
                title: "Creative Art",
                description: "Open-ended art projects with various materials.",
                time: "10:00 AM",
            },
            {
                id: 3,
                title: "Cooperative Games",
                description: "Group activities that foster teamwork.",
                time: "11:15 AM",
            },
            {
                id: 4,
                title: "Lunch & Rest",
                description: "Healthy meals followed by quiet time.",
                time: "12:15 PM",
            },
            {
                id: 5,
                title: "Dramatic Play",
                description: "Role-playing and imaginative scenarios.",
                time: "2:30 PM",
            },
        ],
    },
    6: {
        id: 6,
        name: "Little Learners Daycare",
        image: "/placeholder.svg?height=200&width=300",
        images: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
        ],
        rating: 4.7,
        reviews: 103,
        price: "$44/day",
        location: "Central",
        fullLocation: "890 Central Avenue, Central",
        description: "Educational childcare that prepares your little ones for school success.",
        fullDescription:
            "Little Learners Daycare combines play-based learning with school readiness skills to prepare children for academic success. Our program includes early literacy, math concepts, and foundational knowledge delivered through fun, engaging activities. With learning centers designed to mimic elementary school environments and teachers trained in early education, we create a smooth transition to formal schooling while maintaining the joy and wonder of early childhood.",
        hours: "Monday - Friday: 6:45 AM - 6:00 PM",
        ageGroups: ["Toddler (1-3)", "Preschool (3-5)", "Pre-K (4-5)"],
        amenities: ["Learning Centers", "Library Corner", "Math & Science Lab", "CCTV Monitoring", "Balanced Meals"],
        activities: [
            {
                id: 1,
                title: "Morning Meeting",
                description: "Calendar, weather, and daily planning discussions.",
                time: "8:15 AM",
            },
            {
                id: 2,
                title: "Literacy Time",
                description: "Letter recognition, phonics, and early reading.",
                time: "9:30 AM",
            },
            {
                id: 3,
                title: "Math Concepts",
                description: "Numbers, patterns, and logical thinking activities.",
                time: "10:45 AM",
            },
            {
                id: 4,
                title: "Lunch & Rest",
                description: "Balanced meal followed by quiet time.",
                time: "12:00 PM",
            },
            {
                id: 5,
                title: "Science Exploration",
                description: "Hands-on experiments and nature studies.",
                time: "2:15 PM",
            },
            {
                id: 6,
                title: "Social Studies",
                description: "Learning about community, culture, and the world.",
                time: "3:30 PM",
            },
        ],
    },
}

// Sample reviews for all daycares
export const daycareReviews: Record<number, Review[]> = {
    1: [
        {
            id: 1,
            author: "Sarah Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 5,
            date: "2 months ago",
            content:
                "My daughter loves going to Sunshine Daycare! The staff is incredibly caring and attentive. I appreciate the daily updates and photos they send. Highly recommend!",
        },
        {
            id: 2,
            author: "Michael Chen",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4,
            date: "3 months ago",
            content:
                "Great facility with lots of activities for the kids. My son has learned so much since starting here. The only reason for 4 stars instead of 5 is that pickup can sometimes be a bit chaotic.",
        },
        {
            id: 3,
            author: "Jessica Williams",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 5,
            date: "1 month ago",
            content:
                "The CCTV monitoring feature gives me such peace of mind while I'm at work. I can check in on my twins anytime. The staff is professional and the facility is always clean.",
        },
    ],
    2: [
        {
            id: 1,
            author: "David Miller",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 5,
            date: "1 month ago",
            content:
                "Little Explorers has been amazing for my son's development. He comes home every day with exciting stories about what he learned. The exploration-based curriculum is exactly what we were looking for.",
        },
        {
            id: 2,
            author: "Amanda Rodriguez",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4,
            date: "2 months ago",
            content:
                "My daughter has thrived at this daycare. I love their focus on outdoor activities and natural materials. The staff is knowledgeable and caring. Minor point deduction for occasional disorganization.",
        },
        {
            id: 3,
            author: "Thomas Lee",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 5,
            date: "3 weeks ago",
            content:
                "We switched from another daycare and the difference is remarkable. The staff really understands child development and creates engaging activities. The organic meals are also a huge plus!",
        },
    ],
    3: [
        {
            id: 1,
            author: "Jennifer Smith",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 5,
            date: "2 weeks ago",
            content:
                "Tiny Tots Academy is worth every penny! The facilities are immaculate, the curriculum is advanced, and the staff is highly qualified. My son is reading already at age 4 thanks to their program.",
        },
        {
            id: 2,
            author: "Robert Taylor",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 5,
            date: "1 month ago",
            content:
                "We chose Tiny Tots for their reputation for excellence and haven't been disappointed. The language immersion program is particularly impressive. Our daughter is picking up Spanish phrases already!",
        },
        {
            id: 3,
            author: "Emily Wilson",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4,
            date: "6 weeks ago",
            content:
                "Excellent educational program and beautiful facilities. The swimming lessons are a huge bonus. The only drawback is the higher price point, but the quality is definitely there.",
        },
    ],
    4: [
        {
            id: 1,
            author: "Daniel Brown",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 5,
            date: "3 weeks ago",
            content:
                "Happy Kids Daycare truly lives up to its name! My son was extremely anxious about daycare, but the homelike environment made the transition so much easier. He now looks forward to going every day.",
        },
        {
            id: 2,
            author: "Lauren Garcia",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 5,
            date: "1 month ago",
            content:
                "The caregivers at Happy Kids are like extended family to us now. They give such personalized attention to each child. The home-cooked meals are delicious too - my daughter now asks me to make the same recipes at home!",
        },
        {
            id: 3,
            author: "Kevin Martinez",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4,
            date: "2 months ago",
            content:
                "Great homey atmosphere and caring staff. My twins love the garden activities and family-style meals. Would give 5 stars but they could use more structured learning activities for pre-K preparation.",
        },
    ],
    5: [
        {
            id: 1,
            author: "Michelle Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4,
            date: "1 month ago",
            content:
                "Bright Beginnings has been wonderful for my daughter's creativity. The art projects they do are amazing, and she's become much more confident socially. Good value for the price too!",
        },
        {
            id: 2,
            author: "James Wilson",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 5,
            date: "3 weeks ago",
            content:
                "My shy son has completely blossomed at Bright Beginnings. The music program is excellent, and the teachers are so patient and encouraging. He's made many friends and loves going every day.",
        },
        {
            id: 3,
            author: "Nicole Adams",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4,
            date: "2 months ago",
            content:
                "Great affordable option with a strong focus on creativity and social skills. The art studio is impressive! Only giving 4 stars because they don't offer infant care, which would have been helpful for our family.",
        },
    ],
    6: [
        {
            id: 1,
            author: "Brian Clark",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 5,
            date: "3 weeks ago",
            content:
                "Little Learners has exceeded our expectations. Their pre-K program really prepared our daughter for kindergarten. She's ahead of the curve in reading and math concepts, and loves learning!",
        },
        {
            id: 2,
            author: "Sophia Martinez",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4,
            date: "1 month ago",
            content:
                "Great educational program with a good balance of learning and play. The teachers are well-trained and communicate regularly about progress. Would give 5 stars but the facility could use some updating.",
        },
        {
            id: 3,
            author: "Andrew Thompson",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 5,
            date: "2 months ago",
            content:
                "We've tried several daycares and Little Learners is by far the best for academic preparation. My son's vocabulary and math skills have improved dramatically. The science exploration activities are particularly impressive!",
        },
    ],
}
