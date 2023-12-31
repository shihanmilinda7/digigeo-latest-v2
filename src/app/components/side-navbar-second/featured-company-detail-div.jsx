// components/Accordion.js
"use client";
import React, { useEffect, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import AreaFCompanyPopup from "./area-fcompany-popup";
<<<<<<< HEAD

const FeaturedCompanyDetailDiv = ({ title, children, onClick }) => {
=======
const FeaturedCompanyDetailDiv = ({ companyid,title, children, onClick }) => {
>>>>>>> aeb2579d501f59cc5b5ed8520d76764ae959eb49
  // const [isPopupOpen, setIsPopup]
  const [isOpenIn, setIsOpenIn] = useState(false);
  const [toggleOpen, setToggleOpen] = useState(1);

  const closePopup = () => {
    setIsOpenIn(false);
  };

  const openPopup =  () => {
    setIsOpenIn(true);
    setToggleOpen((prv) => prv+1*1);
    console.log("title", title);
  };

  useEffect(() => {
    console.log("toggleOpen", toggleOpen);
  }, [toggleOpen]);

  return (
    <div>
      <div
        style={{ alignItems: "center" }}
        className="relative item-center flex pl-4 border rounded-lg border-blue-500 focus:outline-none text-black text-sm sm:text-sm py-1 w-full transition duration-150 ease-in"
      >
        <span className="mr-2">{children}</span>
        <h3
          style={{
            margin: 0,
            marginRight: "5px",
            overflow: "hidden",
            fontSize: "0.75rem",
          }}
        >
          {title}
        </h3>
        <div className="flex absolute right-0 mr-2 gap-4">
          {/* <span onClick={toggleAccordion} className="cursor-pointer">
            {isOpen ? <FaChevronDown /> : <FaChevronLeft />}
          </span> */}
          {/* <span className="">
            <MdInfoOutline
              className="cursor-pointer h-4 w-4"
              onClick={openPopup}
              // onClick={() => console.log("title", title)}
            />
          </span>
          {isOpenIn ? (
            <AreaFCompanyPopup
              isOpenIn={isOpenIn}
              closePopup={closePopup}
              titleIn={title}
              companyid={companyid}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCompanyDetailDiv;
