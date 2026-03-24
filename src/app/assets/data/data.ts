import { ImageSourcePropType } from "react-native";
import { donation, jollibeeIcon, lightning, parcel, parcelIcon, walletCard } from "../img/images";
import { nullValue } from "@nozbe/watermelondb/RawRecord";

/*
export type TOP_PLACES_PROPS ={
  id: number;
  image: ImageSourcePropType;
  title: String;
  location: String;
  description: String;
  rating: Number;
  gallery: ImageSourcePropType;
  type: String
}

 const TOP_PLACES:TOP_PLACES_PROPS[]  = [
    {
      id: 1,
      image: require('../../assets/images/0e627c12c05e4dd93ab122d618ea7849.jpeg'),
      title: 'Amalfi Coast',
      location: 'Italy',
      description:
        'The ultimate Amalfi Coast travel guide, where to stay, where to eat, and what areas to visit in the Amalfi Coast of Italy. Positano, Ravello, Amalfi and more',
      rating: 9.4,
      gallery: [
        require('../../assets/images/0e627c12c05e4dd93ab122d618ea7849.jpeg'),
        require('../../assets/images/0e627c12c05e4dd93ab122d618ea7849.jpeg'),
      ],
      type: 'PLACE',
    },
    {
      id: 4,
      image: require('../../assets/images/0e627c12c05e4dd93ab122d618ea7849.jpeg'),
      title: 'Granada',
      location: 'Spain',
      description:
        'Granada is the capital city of the province of Granada, in the autonomous community of Andalusia, Spain',
      rating: 8.9,
      gallery: [],
      type: 'PLACE',
    },
    {
      id: 5,
      image: require('../../assets/images/0e627c12c05e4dd93ab122d618ea7849.jpeg'),
      title: 'Singapore',
      location: 'Unkown',
      description:
        'Granada is the capital city of the province of Granada, in the autonomous community of Andalusia, Spain',
      rating: 8.9,
      gallery: [],
      type: 'PLACE',
    },
    {
      id: 6,
      image: require('../../assets/images/0e627c12c05e4dd93ab122d618ea7849.jpeg'),
      title: 'Japan',
      location: 'Tokyo',
      description:
        'Granada is the capital city of the province of Granada, in the autonomous community of Andalusia, Spain',
      rating: 8.9,
      gallery: [],
      type: 'PLACE',
    },

  ];
  */

  export const genderList = [
    {
      key: "Male",
      value: "male",
    },
    {
      key: "Female",
      value: "female",
    },
  ];
  export const cityList = [
    {
      key: "Metro Manila",
      value: "manila",
    },
  ];
  
export const VEHICLE = [
  {
    id: 1,
    image: require('../img/Motorcycle.png'),
    name: 'Motorcycle',
    value: 'motorcycle',
    description: 'Max: 20 Kg'
  },
  {
    id: 2,
    image: require('../img/Sedan.png'),
    name: 'Sedan',
    value: 'sedan',
    description: 'Max: 200 Kg'
  },
  {
    id: 3,
    image: require('../img/Van.png'),
    name: 'Van',
    value: 'van',
    description: 'Max: 1000 Kg'
  }
]



  export const Banners = [
    {
      id: 1,
      image: require('../../assets/img/beRapidude.png'),
      title: 'Rapidoo',
      location: 'Super App',

    },
    {
      id: 2,
      image: require('../../assets/img/beRapidude.png'),
      title: 'Rapidoo',
      location: 'Super App',

    },
    {
      id: 3,
      image: require('../../assets/img/beRapidude.png'),
      title: 'Rapidoo',
      location: 'Super App',

    },
    {
      id: 4,
      image: require('../../assets/img/beRapidude.png'),
      title: 'Rapidoo',
      location: 'Super App',

    },
    {
      id: 5,
      image: require('../../assets/img/beRapidude.png'),
      title: 'Rapidoo',
      location: 'Super App',

    },

  ];

  export const Donation = [
    { id: 1, date: 'February 14, 2024', donationName: "Donate ₱50,000 to WHO", contents: 'Fight against hunger', points: "1,500", img: donation },
    { id: 2, date: 'February 14, 2024', donationName: "Donate ₱50,000 to WHO", contents: 'Fight against hunger', points: "1,500", img: donation },
    { id: 3, date: 'February 14, 2024', donationName: "Donate ₱50,000 to WHO", contents: 'Fight against hunger', points: "1,500", img: donation },
  ]

  
  export const FinancialHistory = [
    { id: 1, date: 'February 14, 2024', type: 'Credited', price: 42.93 },
    { id: 2, date: 'February 14, 2024', type: 'Debited', price: 42.93 },
    { id: 3, date: 'February 14, 2024', type: 'Credited', price: 42.93 },
    { id: 4, date: 'February 14, 2024', type: 'Debited', price: 42.93 },
    { id: 5, date: 'February 14, 2024', type: 'Transfer', price: 42.93 },
    { id: 6, date: 'February 14, 2024', type: 'Transfer', price: 42.93 },
    { id: 7, date: 'February 14, 2024', type: 'Credited', price: 42.93 },
  ];
  

  export const Coupons =[  
      {id: '1' ,name: "Christmas Special", status: 'Parcel', description: 'December 30, 2024',image: require('../../assets/img/beRapidude.png')},
      {id: '2' ,name: "November Special", status: 'Parcel', description: 'December 30, 2024',image: require('../../assets/img/beRapidude.png')},
      {id: '3' ,name: "January Special", status: 'Market Place', description: 'December 30, 2024',image: require('../../assets/img/beRapidude.png')},
      {id: '4' ,name: "March Special", status: 'Market Place', description: 'December 30, 2024',image: require('../../assets/img/beRapidude.png')},
      {id: '5' ,name: "North Special", status: 'Parcel', description: 'December 30, 2024',image: require('../../assets/img/beRapidude.png')},
      {id: '6' ,name: "South Special", status: 'Market Place', description: 'December 30, 2024',image: require('../../assets/img/beRapidude.png')},
      {id: '7' ,name: "Special Offer", status: 'Parcel', description: 'December 30, 2024',image: require('../../assets/img/beRapidude.png')},
  ];

  export const PaymentType = [
    {id:1, paymentName: "Cash on Delivery", value:"CASH", image:parcel },
    {id:2, paymentName: "Rapidoo Wallet",value:"WALLET", image:walletCard },
    // {id:3, paymentName: "Lightning Points", value:"points" , image:lightning }, UNCOMMENT
  ]

  export const DeliveryOption = [
    {id: 1, deliveryOption: "Priority", value: "PRIORITY"},
    {id: 2, deliveryOption: "Regular", value: "REGULAR"},
    {id: 3, deliveryOption: "Low Priority", value: "POOLING"}
  ]

  export const AddTipData = [
    {id:0, amount: "None" ,value:null},
    {id:1, amount: "₱20" ,value:20},
    {id:2, amount: "₱50" ,value:50},
    {id:3, amount: "₱100" ,value:100},
    {id:4, amount: "₱150" ,value:150},
  ]

  export const NotificationData = [
    {id:1, status:"error", title:"Promo Code: Marketplace", description:"Enjoy a 20% promo code to order your favorite food now."},
    {id:2, status:"warning", title:"Promo Code: Marketplace", description:"Enjoy a 20% promo code to order your favorite food now."},
    {id:3, status:"success", title:"Parcel Delivery: We have found you a rider!", description:"Juan Dela Cruz accepted your request and he's on his way to get your order."},
    {id:4, status:"error", title:"Food Delivery: Jollibee Tandang Sora", description:"Juan Dela Cruz accepted your request and he's on his way to get your order."},
    {id:5, status:"warning", title:"Food Delivery: Payment", description:"You have paid Php 200.00 to Juan Dela Cruz using Rapidoo Pay."},
  
  ]
  

 export const IconServices =[
   {id:1, name: "Parcel",status:true, img: require('../img/iconParcel.png')},
  {id:2, name: "Food", status:false, img: require('../img/iconFood.png')},
  {id:3, name: "Car", status:false, img: require('../img/iconCar.png')},
  {id:4, name: "Motor Taxi",status:false, img: require('../img/iconMotoTaxi.png')},
  // {id:5, name: "All",status:false, img: require('../img/iconAll.png')},
 ]

 export const CurrentTransaction = [
  {
    id: 1,
    image: parcelIcon,
    title: "Jolibee - Tandang Sora",
    status: "Php 1,000 • Rider accepted the request",
    info: "Cash (COD) • 4.0 km • 5:30 PM "
  },
  {
    id: 2,
    image: parcelIcon,
    title: "Jolibee - Tandang Sora",
    status: "Php 1,000 • Rider accepted the request",
    info: "Cash (COD) • 4.0 km • 5:30 PM "
  }
 ]
 export const HistoryData = [
  {
    id: 1,
    image: parcelIcon,
    title: "Completed",
    status: "Php 1,000 • Rider accepted the request",
    info: "Cash (COD) • 4.0 km • 5:30 PM "
  },
  {
    id: 2,
    image: parcelIcon,
    title: "Cancelled",
    status: "Php 1,000 • Rider accepted the request",
    info: "Cash (COD) • 4.0 km • 5:30 PM "
  }
 ]

  export const HistoryCategory = [
    {
      id: 1, 
      category: "Parcel",
      value: "parcel",
      img: require('../img/iconParcel.png')
    },
    {
      id: 2, 
      category: "Marketplace",
      value: "marketplace",
      img: require('../img/iconFood.png')
    },
    {
      id: 3, 
      category: "Car",
      value: "car",
      img: require('../img/iconCar.png')
    },
    {
      id: 4, 
      category: "Moto Taxi",
      value: "mototaxi",
      img: require('../img/iconMotoTaxi.png')
    },
    {
      id: 5, 
      category: "Rapidoo Wallet",
      value: "rapidoowallet",
      img: require('../img/beMerchant.png')
    }
  ]
 // export default TOP_PLACES;