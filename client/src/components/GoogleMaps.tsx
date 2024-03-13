// import {
//   useJsApiLoader,
//   GoogleMap,
//   Autocomplete,
//   DirectionsRenderer,
// } from "@react-google-maps/api";
// import { Input } from "@components/ui/input";
// import { Button } from "@components/ui/button";
// import { useState } from "react";
// import { BsFillCursorFill } from "react-icons/bs";
// import { useForm } from "react-hook-form";
// import { FaXmark } from "react-icons/fa6";

// const center = { lat: 31.046051, lng: 34.851612 };
// const libraries = ["places"];

// const GoogleMaps = () => {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
//     libraries,
//   });
//   const [map, setMap] = useState(/** @type google.maps.Map*/ null);
//   const [directions, setDirections] = useState(null);
//   const [distance, setDistance] = useState("");
//   const [duration, setDuration] = useState("");
//   const { register, handleSubmit, reset } = useForm();

//   if (!isLoaded) {
//     return <div>Loading...</div>;
//   }

//   const calculateRoute = (data) => {
//     if (data.origin === "" || data.destination === "") return;

//     // eslint-disable-next-line no-undef
//     const directionsService = new google.maps.DirectionsService();

//     directionsService.route(
//       {
//         origin: data.origin,
//         destination: data.destination,
//         // eslint-disable-next-line no-undef
//         travelMode: google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         // eslint-disable-next-line no-undef
//         if (status === google.maps.DirectionsStatus.OK) {
//           setDirections(result);
//           setDistance(result.routes[0].legs[0].distance.text);
//           setDuration(result.routes[0].legs[0].duration.text);
//         } else {
//           console.error(`Error: ${status}`);
//         }
//       }
//     );
//   };

//   const handleReset = () => {
//     reset();
//     setDirections(null);
//     setDistance("");
//     setDuration("");
//   };

//   return (
//     <div className="flex-grow p-1 relative">
//       <GoogleMap
//         mapContainerStyle={{ width: "100%", height: "100%" }}
//         zoom={7}
//         center={center}
//         options={{
//           zoomControl: false,
//           streetViewControl: false,
//           mapTypeControl: false,
//           fullscreenControl: false,
//         }}
//         onLoad={(map) => setMap(map)}
//       >
//         {directions && <DirectionsRenderer directions={directions} />}
//       </GoogleMap>
//       <div className="absolute z-10 top-0 left-1/2 transform -translate-x-1/2 mt-4">
//         <div className="flex flex-col p-4 bg-slate-200 rounded-md">
//           <form className="flex gap-2" onSubmit={handleSubmit(calculateRoute)}>
//             <Autocomplete>
//               <Input placeholder="origin" {...register("origin")} />
//             </Autocomplete>
//             <Autocomplete>
//               <Input placeholder="destination" {...register("destination")} />
//             </Autocomplete>
//             <Button
//               className="bg-slate-600 hover:bg-slate-700 text-white transition-all ease-in"
//               type="submit"
//             >
//               Calculate Route
//             </Button>
//             <Button
//               onClick={handleReset}
//               className="bg-indigo-400 hover:bg-indigo-500 text-white transition-all ease-in"
//             >
//               <FaXmark />
//             </Button>
//           </form>
//           <div className="flex justify-between mt-4">
//             <span>distance: {distance}</span>
//             <span>duration: {duration}</span>
//             <Button
//               className="bg-indigo-400 hover:bg-indigo-500 text-white transition-all ease-in py-2"
//               onClick={() => {
//                 map.panTo(center);
//                 map.setZoom(7);
//               }}
//             >
//               <BsFillCursorFill />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GoogleMaps;
