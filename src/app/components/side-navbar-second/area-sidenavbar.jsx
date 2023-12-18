"use client";

import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  AiFillAppstore,
  AiFillMinusSquare,
  AiFillPlusSquare,
  AiOutlineCloseCircle,
  AiTwotoneGold,
} from "react-icons/ai";
import { BsFillArrowLeftSquareFill, BsFillBuildingsFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";
import { FaFilter, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsSideNavOpen,
  setSelectedMap,
  setUrlUpdate,
} from "../../../store/map-selector/map-selector-slice";
import { useRouter, useSearchParams } from "next/navigation";
import { MdLocationOn } from "react-icons/md";
import AreaFilter from "../filter-popups/area-filters";
import { setIsAreaSideNavOpen } from "../../../store/area-map/area-map-slice";
import TreeView from "../common-comp/treeview";
import Accordion from "../common-comp/accordion";
import AccordionItemWithEye from "../common-comp/accordion-eye";
import FeaturedCompanyDetailDiv from "../common-comp/featured-company-detail-div";

const AreaSideNavbar = () => {
  let pathname = "";
  const dispatch = useDispatch();
  const router = useRouter();
  try {
    pathname = window.location.href;
  } catch (error) {}

  if (pathname) {
    const r = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
  }

  const [isSecondSideOpen, setIsSecondSideOpen] = useState(false);

  const isSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isSideNavOpen
  );
  const isAreaSideNavOpen = useSelector(
    (state) => state.areaMapReducer.isAreaSideNavOpen
  );
  const selectedMap = useSelector(
    (state) => state.mapSelectorReducer.selectedMap
  );
  const areaLyrs = useSelector((state) => state.mapSelectorReducer.areaLyrs);
  const areaZoomLevel = useSelector(
    (state) => state.mapSelectorReducer.areaZoomLevel
  );
  const areaInitialCenter = useSelector(
    (state) => state.mapSelectorReducer.areaInitialCenter
  );

  const areaName = useSelector((state) => state.areaMapReducer.areaMiningArea);

  //areal load
  useEffect(() => {
    const f = async () => {
      const res = await fetch(
        `http://44.208.84.139/miniatlas/view_hotplay_table_with_sponsor/${areaName}`,
        { cache: "force-cache" }
      );
      const d = await res.json();
      console.log("fps", d);
      console.log("fps", d.data[0].json_build_object);
    };

    f().catch(console.error);
  }, [areaName]);

  const treeData = [
    {
      label: "Node 1",
      children: [
        {
          label: "Node 1.1",
          children: [
            {
              label: "Node 1.1.1",
              children: [
                {
                  label: "Node 1.1.1.1",
                  children: [],
                },
              ],
            },
            {
              label: "Node 1.1.2",
              children: [],
            },
          ],
        },
        {
          label: "Node 1.2",
          children: [],
        },
      ],
    },
    {
      label: "Node 2",
      children: [
        {
          label: "Node 2.1",
          children: [],
        },
      ],
    },
  ];

  const closeSecondNavBar = () => {
    // setIsSecondSideOpen(false);
    const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=false&lyrs=${areaLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}`;
    window.history.replaceState({}, "", newUrl);
    dispatch(setIsAreaSideNavOpen(false));
  };

  return (
    <section className="flex gap-6">
      <div className={`duration-500 flex w-auto`}>
        <div
          className={`
        ${
          isAreaSideNavOpen && isSideNavOpen
            ? "bg-white dark:bg-black border-2 rounded-md border-blue-700"
            : ""
        } 
        h-[90vh] ml-2 mt-2
        ${isAreaSideNavOpen && isSideNavOpen ? "w-80 sm:w-72 mr-2" : "w-0"} 
        duration-500`}
        >
          <div
            className={`${
              isAreaSideNavOpen && isSideNavOpen
                ? "py-0.1 flex flex-col "
                : "hidden"
            }`}
          >
            <div className="ml-2 mr-2 mt-1 mb-1 flex items-center justify-center border-b-2 relative">
              <span className="font-bold">Company List</span>
              <AiOutlineCloseCircle
                onClick={closeSecondNavBar}
                className="h-6 w-6 text-blue-700 cursor-pointer absolute right-0"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            {/* <TreeView data={treeData} /> */}
            <div>
              <Accordion>
                <div className="flex flex-col gap-6">
                  <AccordionItemWithEye title="Featured Companies">
                    <div className="flex flex-col gap-1 overflow-y-auto max-h-[40vh]">
                      <FeaturedCompanyDetailDiv
                        title="Operating Mines"
                        onClick={() => console.log("Operating Mines")}
                      >
                        <div className="w-4 h-4 bg-[#FDBA12]"></div>
                      </FeaturedCompanyDetailDiv>
                    </div>
                  </AccordionItemWithEye>
                </div>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AreaSideNavbar;
