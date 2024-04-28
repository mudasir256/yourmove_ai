// // import { useEffect, useState } from "react";
// // import { Logo } from "../components/Logo";
// // import { Product } from "../components/onboarding/Product";
// // import ProfileReview from "../assets/images/onboarding/profile-review.png";
// // import ProfileWriter from "../assets/images/onboarding/profile-writer.png";
// // import ChatAssistant from "../assets/images/onboarding/chat-assistant.png";
// // import { useNavigate } from "react-router-dom";
// import { useRef, useState, useEffect } from "react";

// import Slider from "react-slick";
// import Image1 from "../assets/images/ai-1.png";
// import Image2 from "../assets/images/ai-2.png";
// import Image3 from "../assets/images/ai-3.png";
// import Image4 from "../assets/images/ai-4.png";


// // import { ProductType } from "../../constants/payments";


// export const EnhancedPhotos = () => {
//     const images = [Image1, Image2, Image3, Image4];
//     var settings = {
//           dots: true,
//           infinite: true,
//           autoplay: true,
//           speed: 500,
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         };

//     useEffect(() => {if ((window as any).gtag) {
//     (window as any).gtag('event', 'photos_start', {event_category: 'funnel',product: 'photos',
//     });}}, []);

//     return (
//       <div className="-mt-8 max-w-lg mx-auto mt-6">
//         <div className="w-full mt-2">
//             {/* <div className="flex items-center justify-center mt-3">
//                 <span className="text-sm font-semibold text-red-400 bg-red-100 py-2 px-4 rounded-full">
//                         AI Photo Generator
//                 </span>
//             </div> */}
//             <div className="flex items-center text-center justify-center my-4 px-10">
//                 <h1 className="text-2xl font-bold">Stand out with AI-Enhanced Photos</h1>
//             </div>
//             <div className="flex items-center justify-center text-center">
//                 <p className="text-base">
//                     💕 Double your swipes with more charming you
//                 </p>
//             </div>
//             <div className="flex items-center justify-center text-center">
//                 <p className="text-base text-slate-500">
//                     Look your best while staying true to who you are.
//                 </p>
//             </div>
//             <div className="items-center text-center my-8 mx-12 max-w-full" >
//                 <Slider {...settings}>
//                     {images.map((image) => {
//                     return <div className="items-center">
//                             <img className="items-center"alt="profile photo improved using AI" src={image} />
//                         </div>
//                     })}
//                 </Slider>
//             </div>
//             <div className="mt-4 mx-4">
//                     <h4 className="font-semibold text-sm md:text-md mb-2">
//                       What's included:
//                     </h4>
//                     <ul className="list-none space-y-1">
//                         <h5 className="flex text-sm md:text-md">
//                             ✓ Show your best self
//                         </h5>
//                         <h5 className="flex text-sm md:text-md">
//                             ✓ 90 photos in 15 different backgrounds & styles
//                         </h5>
//                         <h5 className="flex text-sm md:text-md">
//                             ✓ Up to 74% more matches on average
//                         </h5>
//                     </ul>
//                     <h4 className="font-semibold text-sm md:text-md mt-4 mb-2">
//                       What we won't do:
//                     </h4>
//                     <ul className="list-none space-y-1">
//                         <h5 className="flex text-sm md:text-md">
//                             ✗ Create fake-looking photos
//                         </h5>
//                         <h5 className="flex text-sm md:text-md">
//                             ✗ Make you taller or give you a dog
//                         </h5>
//                     </ul>
//             </div>
//             <div className="mt-8 mb-4 mx-4">
//                 <button
//                     type="button"
//                     onClick={() => {
//                         window.open('https://buy.stripe.com/8wMbJFchQ66l4neeVl', '_blank');
//                         if ((window as any).gtag) {(window as any).gtag('event', 'photos_unlock', {event_category: 'funnel',product: 'photos',});}
//                     }}
//                     className="mt-2 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-full font-semibold"
//                 >
//                     Enhance my photos - $24.99 
//                 </button>
//             </div>
//         </div>
//       </div>
//     );
// };