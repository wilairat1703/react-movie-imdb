// import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useEffect, useRef, useState } from "react";
// import wordData from "../../src/assets/word.json";
// import { WordModel } from "../model/WordModel";

// function Test() {
//   const [words, setWords] = useState<WordModel[]>([]);
//   const [thaiList, setThaiList] = useState<WordModel[]>([]);
//   const [englishList, setEnglishList] = useState<WordModel[]>([]);
//   const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({});
//   const intervalRefs = useRef<Record<string, number>>({});

//   const moveWord = (word: WordModel) => {
//     setWords((prev) => prev.filter((item) => item.word !== word.word));

//     if (word.lang === "TH") {
//       setThaiList((prev) => [...prev, word]);
//       startCountdowns(word);
//     } else if (word.lang === "EN") {
//       setEnglishList((prev) => [...prev, word]);
//       startCountdowns(word);
//     }
//   };

//   const startCountdowns = (word: WordModel) => {
//     let countdown = 5; // เริ่มต้นที่ 5 วินาที

//     // อัปเดตค่า countdown
//     setCountdowns((prev) => ({ ...prev, [word.word]: countdown }));

//     // สร้าง interval ใหม่
//     const interval = setInterval(() => {
//       countdown--;

//       setCountdowns((prev) => ({ ...prev, [word.word]: countdown }));

//       if (countdown <= 0) {
//         clearInterval(interval); // หยุด interval เมื่อ countdown หมดเวลา
//         delete intervalRefs.current[word.word]; // ลบอ้างอิง interval

//         // ลบ countdown ของคำออก
//         setCountdowns((prev) => {
//           const updatedCountdowns = { ...prev };
//           delete updatedCountdowns[word.word];
//           return updatedCountdowns;
//         });

//         // ย้ายคำกลับไปยัง `words`
//         if (word.lang === "TH") {
//           setThaiList((prev) => prev.filter((item) => item.word !== word.word));
//           setWords((prev) => [...prev, word]);
//         } else {
//           setEnglishList((prev) =>
//             prev.filter((item) => item.word !== word.word)
//           );
//           setWords((prev) => [...prev, word]);
//         }
//       }
//     }, 1000); // 1 วินาทีต่อขั้น

//     // เก็บ interval ไว้ใน intervalRefs
//     intervalRefs.current[word.word] = interval;
//   };

//   const moveBackList = (word: WordModel) => {
//     if (word.lang === "TH") {
//       if (word.lock == false) {
//         // หยุดการนับถอยหลัง
//         const interval = intervalRefs.current[word.word];
//         if (interval) {
//           clearInterval(interval);
//           delete intervalRefs.current[word.word];
//         }

//         // ย้ายคำกลับไปยัง words
//         setThaiList((prev) => prev.filter((item) => item.word !== word.word));
//         setWords((prev) => [...prev, word]);

//         // ลบ countdown ของคำนี้
//         setCountdowns((prev) => {
//           const updatedCountdowns = { ...prev };
//           delete updatedCountdowns[word.word];
//           return updatedCountdowns;
//         });
//       }
//     } else if (word.lang === "EN") {
//       if (word.lock == false) {
//         // หยุดการนับถอยหลัง
//         const interval = intervalRefs.current[word.word];
//         if (interval) {
//           clearInterval(interval);
//           delete intervalRefs.current[word.word];
//         }

//         // ย้ายคำกลับไปยัง words
//         setEnglishList((prev) =>
//           prev.filter((item) => item.word !== word.word)
//         );
//         setWords((prev) => [...prev, word]);

//         // ลบ countdown ของคำนี้
//         setCountdowns((prev) => {
//           const updatedCountdowns = { ...prev };
//           delete updatedCountdowns[word.word];
//           return updatedCountdowns;
//         });
//       }
//     }
//   };

//   const toggleLock = (word: WordModel) => {
//     // หยุด countdown ปัจจุบัน
//     const interval = intervalRefs.current[word.word];
//     if (interval) {
//       clearInterval(interval);
//       delete intervalRefs.current[word.word];
//     }

//     if (word.lang === "TH") {
//       setThaiList((prev) =>
//         prev.map((item) =>
//           item.word === word.word ? { ...item, lock: !item.lock } : item
//         )
//       );
//     } else {
//       setEnglishList((prev) =>
//         prev.map((item) =>
//           item.word === word.word ? { ...item, lock: !item.lock } : item
//         )
//       );
//     }

//     if (word.lock) {
//       // หากปลดล็อก (lock = false) รีเซ็ต countdown เป็น 5 และเริ่มใหม่
//       setCountdowns((prev) => ({
//         ...prev,
//         [word.word]: 5, // รีเซ็ตเวลาเป็น 5 วินาที
//       }));
//       startCountdowns(word); // เริ่มนับใหม่
//     }
//   };

//   useEffect(() => {
//     setWords(wordData);
//   }, []);

//   return (
//     <>
//       <div className="bg-yellow-100 min-h-screen">
//         <div className="font-ibm font-medium flex flex-wrap lg:flex-nowrap h-auto lg:h-screen px-5 lg:px-10 py-5 lg:py-10 justify-center lg:justify-around text-center font-bold">
//           <div className="w-full lg:w-1/4 mb-5 lg:mb-0">
//             <div className="bg-[#21c4ab] p-5 mb-5 rounded-2xl shadow-lg">
//               <div className="text-xl text-white font-bold text-3xl">
//                 คำศัพท์
//               </div>
//             </div>
//             <div className="bg-[#37dec0] h-auto lg:h-5/6 px-5 lg:px-10 py-3 rounded-3xl shadow-lg">
//               {words.map((wordlist, index) => (
//                 <div
//                   key={index}
//                   className="bg-white text-black my-3 mx-5 py-1.5 rounded-2xl shadow-md hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-black hover:text-white"
//                   onClick={() => moveWord(wordlist)}
//                 >
//                   {wordlist.word}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="w-full lg:w-1/4 mb-5 lg:mb-0">
//             <div className="bg-[#f4a33f] p-5 mb-5 rounded-2xl shadow-lg">
//               <div className="text-xl text-white font-bold text-3xl">
//                 ภาษาไทย
//               </div>
//             </div>
//             <div className="bg-[#ffc752] h-auto lg:h-5/6 px-5 lg:px-10 py-3 rounded-3xl shadow-lg">
//               {thaiList.map((thai, index) => (
//                 <div
//                   key={index}
//                   className="bg-white text-black my-3 mx-5 py-1.5 rounded-2xl shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-black hover:text-white"
//                 >
//                   <div className="flex flex-col lg:flex-row justify-center items-center px-5">
//                     <div
//                       className="flex-grow text-center hover:cursor-pointer "
//                       onClick={() => moveBackList(thai)}
//                     >
//                       {thai.word}{" "}
//                       {countdowns[thai.word] !== undefined &&
//                         `${countdowns[thai.word]}`}
//                     </div>
//                     <div
//                       className="flex items-center hover:cursor-pointer mb-1"
//                       onClick={() => toggleLock(thai)}
//                     >
//                       {thai.lock ? (
//                         <FontAwesomeIcon icon={faLock} />
//                       ) : (
//                         <FontAwesomeIcon icon={faLockOpen} />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="w-full lg:w-1/4">
//             <div className="bg-[#f54d4c] p-5 mb-5 rounded-2xl shadow-lg">
//               <div className="text-xl text-white font-bold text-3xl">
//                 ภาษาอังกฤษ
//               </div>
//             </div>
//             <div className="bg-[#fe7171] h-auto lg:h-5/6 px-5 lg:px-10 py-3 rounded-3xl shadow-lg">
//               {englishList.map((eng, index) => (
//                 <div
//                   key={index}
//                   className="bg-white my-3 mx-5 py-1.5 rounded-2xl shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-black hover:text-white"
//                 >
//                   <div className="flex flex-col lg:flex-row justify-center items-center px-5">
//                     <div
//                       className="flex-grow text-center hover:cursor-pointer"
//                       onClick={() => moveBackList(eng)}
//                     >
//                       {eng.word}{" "}
//                       {countdowns[eng.word] !== undefined &&
//                         `${countdowns[eng.word]}`}
//                     </div>
//                     <div
//                       className="flex items-center hover:cursor-pointer mb-1"
//                       onClick={() => toggleLock(eng)}
//                     >
//                       {eng.lock ? (
//                         <FontAwesomeIcon icon={faLock} />
//                       ) : (
//                         <FontAwesomeIcon icon={faLockOpen} />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Test;


// ------------------------------------------------------------
// import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useEffect, useRef, useState } from "react";
// import wordData from "../../src/assets/word.json";
// import { WordModel } from "../model/WordModel";

// function Test1() {
//   const [words, setWords] = useState<WordModel[]>([]);
//   const [thaiList, setThaiList] = useState<WordModel[]>([]);
//   const [englishList, setEnglishList] = useState<WordModel[]>([]);
//   const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({});
//   const intervalRefs = useRef<Record<string, number>>({});

//   const moveWord = (word: WordModel) => {
//     setWords((prev) => prev.filter((item) => item.word !== word.word));

//     if (word.lang === "TH") {
//       setThaiList((prev) => [...prev, word]);
//       startCountdowns(word);
//     } else if (word.lang === "EN") {
//       setEnglishList((prev) => [...prev, word]);
//       startCountdowns(word);
//     }
//   };

//   const startCountdowns = (word: WordModel) => {
//     let countdown = 5; // เริ่มต้นที่ 5 วินาที
  
//     // อัปเดตค่า countdown
//     setCountdowns((prev) => ({ ...prev, [word.word]: countdown }));
  
//     // สร้าง interval ใหม่
//     const interval = setInterval(() => {
//       countdown--;
  
//       setCountdowns((prev) => ({ ...prev, [word.word]: countdown }));
  
//       if (countdown <= 0) {
//         clearInterval(interval); // หยุด interval เมื่อ countdown หมดเวลา
//         delete intervalRefs.current[word.word]; // ลบอ้างอิง interval
  
//         // ลบ countdown ของคำออก
//         setCountdowns((prev) => {
//           const updatedCountdowns = { ...prev };
//           delete updatedCountdowns[word.word];
//           return updatedCountdowns;
//         });
  
//         // ย้ายคำกลับไปยัง `words`
//         if (word.lang === "TH") {
//           setThaiList((prev) =>
//             prev.filter((item) => item.word !== word.word)
//           );
//           setWords((prev) => [...prev, word]);
//         } else {
//           setEnglishList((prev) =>
//             prev.filter((item) => item.word !== word.word)
//           );
//           setWords((prev) => [...prev, word]);
//         }
//       }
//     }, 1000); // 1 วินาทีต่อขั้น
  
//     // เก็บ interval ไว้ใน intervalRefs
//     intervalRefs.current[word.word] = interval;
//   };
  

//   const moveBackList = (word: WordModel) => {
//     if (word.lang === "TH") {
//       if (word.lock == false) {
//         setThaiList((prev) => prev.filter((item) => item.word !== word.word));
//         setWords((prev) => [...prev, word]);
//       }
//     } else if (word.lang === "EN") {
//       if (word.lock == false) {
//         setEnglishList((prev) =>
//           prev.filter((item) => item.word !== word.word)
//         );
//         setWords((prev) => [...prev, word]);
//       }
//     }
//   };

//   const toggleLock = (word: WordModel) => {
//     // หยุด countdown ปัจจุบัน
//     const interval = intervalRefs.current[word.word];
//     if (interval) {
//       clearInterval(interval);
//       delete intervalRefs.current[word.word];
//     }
  
//     // อัปเดตสถานะ lock
//     if (word.lang === "TH") {
//       setThaiList((prev) =>
//         prev.map((item) =>
//           item.word === word.word ? { ...item, lock: !item.lock } : item
//         )
//       );
//     } else {
//       setEnglishList((prev) =>
//         prev.map((item) =>
//           item.word === word.word ? { ...item, lock: !item.lock } : item
//         )
//       );
//     }
  
//     // หากปลดล็อก (lock = false) ให้หยุด countdown
//     if (!word.lock) {
//       setCountdowns((prev) => {
//         const updatedCountdowns = { ...prev };
//         delete updatedCountdowns[word.word];
//         return updatedCountdowns;
//       });
//     } else {
//       // หากล็อก (lock = true) ให้เริ่ม countdown ใหม่
//       startCountdowns(word);
//     }
//   };
  

//   useEffect(() => {
//     setWords(wordData);
//   }, []);

//   return (
//     <>
//       <div className="bg-yellow-100">
//         <div className="font-ibm font-medium flex h-screen px-10 py-10 justify-around text-center font-bold">
//           <div className="w-1/4">
//             <div className="bg-[#21c4ab] p-5 mb-5 rounded-2xl">
//               <div className="text-xl text-white font-bold text-3xl">
//                 คำศัพท์
//               </div>
//             </div>
//             <div className="bg-[#37dec0] h-5/6 px-10 py-3 rounded-3xl">
//               {words.map((wordlist, index) => (
//                 <div
//                   key={index}
//                   className="bg-white my-3 mx-5 py-1.5 rounded-2xl hover:cursor-pointer"
//                   onClick={() => moveWord(wordlist)}
//                 >
//                   {wordlist.word}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="w-1/4">
//             <div className="bg-[#f4a33f] p-5 mb-5 rounded-2xl">
//               <div className="text-xl text-white font-bold text-3xl">
//                 ภาษาไทย
//               </div>
//             </div>
//             <div className="bg-[#ffc752] h-5/6 px-10 py-3 rounded-3xl">
//               {thaiList.map((thai, index) => (
//                 <div
//                   key={index}
//                   className="bg-white my-3 mx-5 py-1.5 rounded-2xl"
//                 >
//                   <div className="flex justify-center items-center px-5">
//                     <div
//                       className="flex-grow text-center hover:cursor-pointer"
//                       onClick={() => moveBackList(thai)}
//                     >
//                       {thai.word}{" "}
//                       {!thai.lock &&
//                         countdowns[thai.word] !== undefined &&
//                         `${countdowns[thai.word]}`}
//                     </div>
//                     <div
//                       className="flex items-center hover:cursor-pointer mb-1"
//                       onClick={() => toggleLock(thai)}
//                     >
//                       {thai.lock ? (
//                         <FontAwesomeIcon icon={faLock} />
//                       ) : (
//                         <FontAwesomeIcon icon={faLockOpen} />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="w-1/4">
//             <div className="bg-[#f54d4c] p-5 mb-5 rounded-2xl">
//               <div className="text-xl text-white font-bold text-3xl">
//                 ภาษาอังกฤษ
//               </div>
//             </div>
//             <div className="bg-[#fe7171] h-5/6 px-10 py-3 rounded-3xl">
//               {englishList.map((eng, index) => (
//                 <div
//                   key={index}
//                   className="bg-white my-3 mx-5 py-1.5 rounded-2xl"
//                 >
//                   <div className="flex justify-center items-center px-5">
//                     <div
//                       className="flex-grow text-center hover:cursor-pointer"
//                       onClick={() => moveBackList(eng)}
//                     >
//                       {eng.word}{" "}
//                       {countdowns[eng.word] !== undefined &&
//                         `${countdowns[eng.word]}`}
//                     </div>
//                     <div
//                       className="flex items-center hover:cursor-pointer mb-1"
//                       onClick={() => toggleLock(eng)}
//                     >
//                       {eng.lock ? (
//                         <FontAwesomeIcon icon={faLock} />
//                       ) : (
//                         <FontAwesomeIcon icon={faLockOpen} />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Test1;

// ----------------------------------------------------------------------
// import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useEffect, useRef, useState } from "react";
// import wordData from "../../src/assets/word.json";
// import { WordModel } from "../model/WordModel";

// function Test2() {
//     const [words, setWords] = useState<WordModel[]>([]);
//     const [thaiList, setThaiList] = useState<WordModel[]>([]);
//     const [englishList, setEnglishList] = useState<WordModel[]>([]);
//     const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({});
//     const intervalRefs = useRef<Record<string, number>>({});
  
//     const moveWord = (word: WordModel) => {
//       setWords((prev) => prev.filter((item) => item.word !== word.word));
  
//       if (word.lang === "TH") {
//         setThaiList((prev) => [...prev, word]);
//         startCountdowns(word);
//       } else if (word.lang === "EN") {
//         setEnglishList((prev) => [...prev, word]);
//         startCountdowns(word);
//       }
//     };
  
//     const startCountdowns = (word: WordModel) => {
//       let countdown = 5; // เริ่มต้นที่ 5 วินาที
    
//       // อัปเดตค่า countdown
//       setCountdowns((prev) => ({ ...prev, [word.word]: countdown }));
    
//       // สร้าง interval ใหม่
//       const interval = setInterval(() => {
//         countdown--;
    
//         setCountdowns((prev) => ({ ...prev, [word.word]: countdown }));
    
//         if (countdown <= 0) {
//           clearInterval(interval); // หยุด interval เมื่อ countdown หมดเวลา
//           delete intervalRefs.current[word.word]; // ลบอ้างอิง interval
    
//           // ลบ countdown ของคำออก
//           setCountdowns((prev) => {
//             const updatedCountdowns = { ...prev };
//             delete updatedCountdowns[word.word];
//             return updatedCountdowns;
//           });
    
//           // ย้ายคำกลับไปยัง `words`
//           if (word.lang === "TH") {
//             setThaiList((prev) =>
//               prev.filter((item) => item.word !== word.word)
//             );
//             setWords((prev) => [...prev, word]);
//           } else {
//             setEnglishList((prev) =>
//               prev.filter((item) => item.word !== word.word)
//             );
//             setWords((prev) => [...prev, word]);
//           }
//         }
//       }, 1000); // 1 วินาทีต่อขั้น
    
//       // เก็บ interval ไว้ใน intervalRefs
//       intervalRefs.current[word.word] = interval;
//     };
    
  
    // const moveBackList = (word: WordModel) => {
    //   if (word.lang === "TH") {
    //     if (word.lock == false) {
    //       setThaiList((prev) => prev.filter((item) => item.word !== word.word));
    //       setWords((prev) => [...prev, word]);
    //     }
    //   } else if (word.lang === "EN") {
    //     if (word.lock == false) {
    //       setEnglishList((prev) =>
    //         prev.filter((item) => item.word !== word.word)
    //       );
    //       setWords((prev) => [...prev, word]);
    //     }
    //   }
    // };

    // const moveBackList = (word: WordModel) => {
    //     if (word.lang === "TH") {
    //       if (word.lock == false) {
    //         // หยุดการนับถอยหลัง
    //         const interval = intervalRefs.current[word.word];
    //         if (interval) {
    //           clearInterval(interval);
    //           delete intervalRefs.current[word.word];
    //         }
      
    //         // ย้ายคำกลับไปยัง words
    //         setThaiList((prev) => prev.filter((item) => item.word !== word.word));
    //         setWords((prev) => [...prev, word]);
      
    //         // ลบ countdown ของคำนี้
    //         setCountdowns((prev) => {
    //           const updatedCountdowns = { ...prev };
    //           delete updatedCountdowns[word.word];
    //           return updatedCountdowns;
    //         });
    //       }
    //     } else if (word.lang === "EN") {
    //       if (word.lock == false) {
    //         // หยุดการนับถอยหลัง
    //         const interval = intervalRefs.current[word.word];
    //         if (interval) {
    //           clearInterval(interval);
    //           delete intervalRefs.current[word.word];
    //         }
      
    //         // ย้ายคำกลับไปยัง words
    //         setEnglishList((prev) =>
    //           prev.filter((item) => item.word !== word.word)
    //         );
    //         setWords((prev) => [...prev, word]);
      
    //         // ลบ countdown ของคำนี้
    //         setCountdowns((prev) => {
    //           const updatedCountdowns = { ...prev };
    //           delete updatedCountdowns[word.word];
    //           return updatedCountdowns;
    //         });
    //       }
    //     }
    //   };
      
      
    
    // const toggleLock = (word: WordModel) => {
    //     // หยุด countdown ปัจจุบัน
    //     const interval = intervalRefs.current[word.word];
    //     if (interval) {
    //       clearInterval(interval);
    //       delete intervalRefs.current[word.word];
    //     }
      
    //     if (word.lang === "TH") {
    //       setThaiList((prev) =>
    //         prev.map((item) =>
    //           item.word === word.word ? { ...item, lock: !item.lock } : item
    //         )
    //       );
    //     } else {
    //       setEnglishList((prev) =>
    //         prev.map((item) =>
    //           item.word === word.word ? { ...item, lock: !item.lock } : item
    //         )
    //       );
    //     }
      
    //     if (word.lock) {
    //       // หากปลดล็อก (lock = false) รีเซ็ต countdown เป็น 5 และเริ่มใหม่
    //       setCountdowns((prev) => ({
    //         ...prev,
    //         [word.word]: 5, // รีเซ็ตเวลาเป็น 5 วินาที
    //       }));
    //       startCountdowns(word); // เริ่มนับใหม่
    //     }
    //   };
      
    // useEffect(() => {
    //   setWords(wordData);
    // }, []);

    // ------------------------------------------------------------
//     import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useEffect, useRef, useState } from "react";
// import wordData from "../../src/assets/word.json";
// import { ModelWord } from "../model/ModelWord";

// function Test3() {
//   const [words, setWords] = useState<ModelWord[]>([]);
//   const [thaiList, setThaiList] = useState<ModelWord[]>([]);
//   const [englishList, setEnglishList] = useState<ModelWord[]>([]);
//   const [lock, setLock] = useState<{ [key: string]: boolean }>({});
//   const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({});
//   const intervalRefs = useRef<Record<string, number>>({});

//   const moveWord = (word: ModelWord) => {
//     setWords((prev) => prev.filter((item) => item.word !== word.word));

//     if (word.lang === "TH") {
//       setThaiList((prev) => [...prev, word]);
//       startCountdowns(word);
//     } else if (word.lang === "EN") {
//       setEnglishList((prev) => [...prev, word]);
//       startCountdowns(word);
//     }
//   };

//   const startCountdowns = (word: ModelWord) => {
//     let countdown = 5;

//     setCountdowns((prev) => ({ ...prev, [word.word]: countdown }));

//     const interval = setInterval(() => {
//       countdown--;

//       setCountdowns((prev) => ({ ...prev, [word.word]: countdown }));

//       if (countdown <= 0) {
//         clearInterval(interval);
//         delete intervalRefs.current[word.word];

//         setCountdowns((prev) => {
//           const updatedCountdowns = { ...prev };
//           delete updatedCountdowns[word.word];
//           return updatedCountdowns;
//         });

//         if (word.lang === "TH") {
//           setThaiList((prev) => prev.filter((item) => item.word !== word.word));
//           setWords((prev) => [...prev, word]);
//         } else {
//           setEnglishList((prev) =>
//             prev.filter((item) => item.word !== word.word)
//           );
//           setWords((prev) => [...prev, word]);
//         }
//       }
//     }, 1000);

//     intervalRefs.current[word.word] = interval;
//   };

//   const moveBackList = (word: ModelWord) => {
//     if (!lock[word.word]) {
//       const interval = intervalRefs.current[word.word];
//       if (interval) {
//         clearInterval(interval);
//         delete intervalRefs.current[word.word];
//       }

//       if (word.lang === "TH") {
//         setThaiList((prev) => prev.filter((item) => item.word !== word.word));
//       } else {
//         setEnglishList((prev) =>
//           prev.filter((item) => item.word !== word.word)
//         );
//       }

//       setWords((prev) => [...prev, word]);

//       setCountdowns((prev) => {
//         const updatedCountdowns = { ...prev };
//         delete updatedCountdowns[word.word];
//         return updatedCountdowns;
//       });
//     }
//   };

//   const toggleLock = (word: ModelWord) => {
//     setLock((prev) => ({ ...prev, [word.word]: !prev[word.word] }));

//     if (lock[word.word]) {
//       setCountdowns((prev) => ({
//         ...prev,
//         [word.word]: 5,
//       }));
//       startCountdowns(word);
//     } else {
//       const interval = intervalRefs.current[word.word];
//       if (interval) {
//         clearInterval(interval);
//         delete intervalRefs.current[word.word];
//       }
//     }
//   };

//   useEffect(() => {
//     const initialLockState = wordData.reduce(
//       (acc, word) => ({ ...acc, [word.word]: word.lock || false }),
//       {}
//     );
//     setWords(wordData);
//     setLock(initialLockState);
//   }, []);

//   return (
//     <div className="bg-yellow-100 min-h-screen">
//       <div className="font-ibm font-medium flex flex-wrap lg:flex-nowrap h-auto lg:h-screen px-5 lg:px-10 py-5 lg:py-10 justify-center lg:justify-around text-center font-bold">
//         <div className="w-full lg:w-1/4 mb-5 lg:mb-0">
//           <div className="bg-[#21c4ab] p-5 mb-5 rounded-2xl shadow-lg">
//             <div className="text-xl text-white font-bold text-3xl">คำศัพท์</div>
//           </div>
//           <div className="bg-[#37dec0] h-auto lg:h-5/6 px-5 lg:px-10 py-3 rounded-3xl shadow-lg">
//             {words.map((wordlist, index) => (
//               <div
//                 key={index}
//                 className="bg-white text-black my-3 mx-5 py-1.5 rounded-2xl shadow-md hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-black hover:text-white"
//                 onClick={() => moveWord(wordlist)}
//               >
//                 {wordlist.word}
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="w-full lg:w-1/4 mb-5 lg:mb-0">
//           <div className="bg-[#f4a33f] p-5 mb-5 rounded-2xl shadow-lg">
//             <div className="text-xl text-white font-bold text-3xl">ภาษาไทย</div>
//           </div>
//           <div className="bg-[#ffc752] h-auto lg:h-5/6 px-5 lg:px-10 py-3 rounded-3xl shadow-lg">
//             {thaiList.map((thai, index) => (
//               <div
//                 key={index}
//                 className="bg-white text-black my-3 mx-5 py-1.5 rounded-2xl shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-black hover:text-white"
//               >
//                 <div className="flex flex-col lg:flex-row justify-center items-center px-5">
//                   <div
//                     className="flex-grow text-center hover:cursor-pointer "
//                     onClick={() => moveBackList(thai)}
//                   >
//                     {thai.word}{" "}
//                     {countdowns[thai.word] !== undefined &&
//                       `${countdowns[thai.word]}`}
//                   </div>
//                   <div
//                     className="flex items-center hover:cursor-pointer mb-1"
//                     onClick={() => toggleLock(thai)}
//                   >
//                     {lock[thai.word] ? (
//                       <FontAwesomeIcon icon={faLock} />
//                     ) : (
//                       <FontAwesomeIcon icon={faLockOpen} />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="w-full lg:w-1/4">
//           <div className="bg-[#f54d4c] p-5 mb-5 rounded-2xl shadow-lg">
//             <div className="text-xl text-white font-bold text-3xl">
//               ภาษาอังกฤษ
//             </div>
//           </div>
//           <div className="bg-[#fe7171] h-auto lg:h-5/6 px-5 lg:px-10 py-3 rounded-3xl shadow-lg">
//             {englishList.map((eng, index) => (
//               <div
//                 key={index}
//                 className="bg-white my-3 mx-5 py-1.5 rounded-2xl shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-black hover:text-white"
//               >
//                 <div className="flex flex-col lg:flex-row justify-center items-center px-5">
//                   <div
//                     className="flex-grow text-center hover:cursor-pointer"
//                     onClick={() => moveBackList(eng)}
//                   >
//                     {eng.word}{" "}
//                     {countdowns[eng.word] !== undefined &&
//                       `${countdowns[eng.word]}`}
//                   </div>
//                   <div
//                     className="flex items-center hover:cursor-pointer mb-1"
//                     onClick={() => toggleLock(eng)}
//                   >
//                     {lock[eng.word] ? (
//                       <FontAwesomeIcon icon={faLock} />
//                     ) : (
//                       <FontAwesomeIcon icon={faLockOpen} />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Test3;

