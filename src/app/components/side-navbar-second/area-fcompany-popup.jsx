"use client";

import Modal from "react-modal";

import { useEffect, useState } from "react";
import { Button, Chip } from "@nextui-org/react";
import { FaFilter } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import NextTextInputField from "../common-comp/next-text-input-fields";
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image'


const formatUrl = (url) => {
  //remove https:
  let res = url;
  let urlPrefix = "https://";
  let a = res.search("https://");
  console.log("a", a);
  if (a != -1) {
    res = res.substring(8);
  }

  a = res.search("http://");
  if (a != -1) {
    res = res.substring(7);
    urlPrefix = "http://";
  }
  //rem trailling /
  if (res[res.length - 1] == "/") {
    res = res.substring(0, res.length - 1);
  }
  //check for www
  //  a = res.search("www");
  //  if (a == -1) {
  //    res = "www." + res
  //  }

  return { url: res, urlPrefix };
};

const AreaFCompanyPopup = ({ isOpenIn, closePopup, titleIn }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

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
    // console.log("title", title);
  }, [titleIn]);

 const getCompanyDetails = async () => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/company_details/${companyid}`,
        { cache: "no-store" }
      );
      const d = await res.json();
     

         let { url, urlPrefix } = formatUrl(d.data[0]?.url ?? "");
           console.log("res.data ",url);

  //img
  const logo = d.data[0]?.logo;
  const logoext = d.data[0]?.logoext ?? "png";
  

      let urlimg =
        `data:image/${logoext};base64,` +
        btoa(String.fromCharCode.apply(null, new Uint8Array(logo.data)));

      // let blob = new Blob([projectImage], { type: "image/png" });
      // let urlimg = URL.createObjectURL(blob);
setlogoPath(urlimg)
     


    };
    f().catch(console.error);
  };



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
        onRequestClose={closePopup}
        // shouldCloseOnOverlayClick={false}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="bg-white rounded-lg min-w-[300px] flex-col justify-center items-center">

          <div className="flex items-center justify-center bg-blue-200  h-12">

            {/* <span className="text-base font-semibold leading-none text-gray-900 select-none flex item-center justify-center uppercase mt-3">
              
            </span> */}
            <AiOutlineCloseCircle
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 cursor-pointer absolute right-0 mt-2 mr-6"
            />
          </div>
          <div className="flex-col justify-center items-center w-full">
              <Image
              src={logoPath}
              width={100}
              height={100}
              alt="Logo"
              />
             <span>{title}</span> 
          </div>
          {/* <div className="flex items-center justify-center pl-8 pr-8">
            <div className="mx-auto w-full max-w-[550px] min-w-[550px] min-h-[350px]">
              <div className="-mx-3 flex flex-wrap mt-8"></div>
              <div className="flex items-center justify-between mt-3 fixed bottom-8 border-t-2 border-gray-300 min-w-[550px]"></div>
            </div>
          </div> */}
        </div>
      </Modal>
    </div>
  );
};
export default AreaFCompanyPopup;
