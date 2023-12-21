"use client";

import Modal from "react-modal";

import { useEffect, useState } from "react";
import { Button, Chip } from "@nextui-org/react";
import { FaFilter } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import NextTextInputField from "../common-comp/next-text-input-fields";
import { useDispatch, useSelector } from "react-redux";
import { MdInfoOutline } from "react-icons/md";

const AreaFCompanyPopup = ({ isOpenIn, closePopup, titleIn, toggleOpenIn }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  // const [toggleOpen, setToggleOpen] = useState("");

  const areaName = useSelector((state) => state.areaMapReducer.areaMiningArea);
  const areaCountry = useSelector((state) => state.areaMapReducer.areaCountry);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 50,
    },
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent",
      border: "none",
    },
  };

  useEffect(() => {
    // console.log("isOpenIn", isOpenIn);
    setIsOpen(isOpenIn);
  }, [isOpenIn, toggleOpenIn]);

  useEffect(() => {
    setTitle(titleIn);
  }, [titleIn]);

  return (
    <div>
      <span className="">
        <MdInfoOutline
          className="cursor-pointer h-4 w-4"
          onClick={() => setIsOpen(true)}
        />
      </span>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        // shouldCloseOnOverlayClick={false}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="bg-white rounded-lg ">
          <div className="flex items-center justify-center">
            <span className="text-base font-semibold leading-none text-gray-900 select-none flex item-center justify-center uppercase mt-3">
              {title}
            </span>
            <AiOutlineCloseCircle
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 cursor-pointer absolute right-0 mt-2 mr-6"
            />
          </div>
          <div className="flex items-center justify-center pl-8 pr-8">
            <div className="mx-auto w-full max-w-[550px] min-w-[550px] min-h-[350px]">
              <div className="-mx-3 flex flex-wrap mt-8"></div>
              <div className="flex items-center justify-between mt-3 fixed bottom-8 border-t-2 border-gray-300 min-w-[550px]"></div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default AreaFCompanyPopup;
