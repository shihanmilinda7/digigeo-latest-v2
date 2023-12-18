"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import "ol/ol.css";
import { Map } from "@react-ol/fiber";
import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "@nextui-org/react";
import {
  setAreaInitialCenter,
  setAreaLyrs,
  setAreaZoomLevel,
  setUrlUpdate,
  setIsSideNavOpen,
} from "../../../store/map-selector/map-selector-slice";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import AreaSideNavbar from "../side-navbar-second/area-sidenavbar";
import { FaChevronLeft, FaChevronUp } from "react-icons/fa";
import { setIsAreaSideNavOpen } from "../../../store/area-map/area-map-slice";

export const AreaMap = () => {
  let pathname = "";
  try {
    pathname = window.location.href;
  } catch (error) {}

  const router = useRouter();
  const [center, setCenter] = useState("");
  const [zoom, setZoom] = useState("");
  // const searchParams = useSearchParams();
  // const mapLyrs = searchParams.get("lyrs");

  // console.log("pathname", pathname);
  const mapRef = useRef();
  const dispatch = useDispatch();

  const selectedMap = useSelector(
    (state) => state.mapSelectorReducer.selectedMap
  );
  const isSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isSideNavOpen
  );

  const mapLyrs = useSelector((state) => state.mapSelectorReducer.areaLyrs);
  const areaZoomLevel = useSelector(
    (state) => state.mapSelectorReducer.areaZoomLevel
  );
  const areaInitialCenter = useSelector(
    (state) => state.mapSelectorReducer.areaInitialCenter
  );
  const isAreaSideNavOpen = useSelector(
    (state) => state.areaMapReducer.isAreaSideNavOpen
  );

  useEffect(() => {
    mouseScrollEvent();
  }, []);

  useEffect(() => {
    const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=${isAreaSideNavOpen}&lyrs=${mapLyrs}&z=${zoom}&c=${center}`;
    window.history.replaceState({}, "", newUrl);
  }, [zoom, center]);

  const mouseScrollEvent = useCallback((event) => {
    const map = mapRef.current;

    // console.log("mapRef", mapRef.current?.getZoom());
    const handleMoveEnd = () => {
      // console.log("map", map);
      const tmpZoomLevel = map.getView().getZoom();
      const tmpinitialCenter = map.getView().getCenter();
      dispatch(setAreaZoomLevel(tmpZoomLevel));
      dispatch(setAreaInitialCenter(tmpinitialCenter));
      setZoom(tmpZoomLevel);
      setCenter(tmpinitialCenter);
      // router.push(
      //   `/?t=${selectedMap}&sn=${isSideNavOpen}&lyrs=${mapLyrs}&z=${tmpZoomLevel}&c=${tmpinitialCenter}`
      // );
      // console.log("tmpinitialCenter", tmpinitialCenter);
      // const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&lyrs=${mapLyrs}&z=${tmpZoomLevel}&c=${tmpinitialCenter}`;
      // window.history.replaceState({}, "", newUrl);
    };

    map?.on("moveend", handleMoveEnd);

    return () => {
      map?.un("moveend", handleMoveEnd);
    };
  }, []);
  // const mouseScrollEvent = useCallback() => {
  //   const map = mapRef.current;

  //   // console.log("mapRef", mapRef.current?.getZoom());
  //   const handleMoveEnd = () => {
  //     const tmpZoomLevel = map.getView().getZoom();
  //     const tmpinitialCenter = map.getView().getCenter();
  //     dispatch(setAreaZoomLevel(tmpZoomLevel));
  //     dispatch(setAreaInitialCenter(tmpinitialCenter));
  //     // console.log("Current Zoom Level:", tmpinitialCenter);
  //     // console.log("Current Zoom Level:", tmpZoomLevel);
  //     // You can perform actions with the zoom level here
  //   };

  //   map?.on("moveend", handleMoveEnd);

  //   return () => {
  //     map?.un("moveend", handleMoveEnd);
  //   };
  // };

  const collapsibleBtnHandler = () => {
    const tmpValue = String(isSideNavOpen).toLowerCase() === "true";
    dispatch(setIsSideNavOpen(!tmpValue));
    const newUrl = `${
      window.location.pathname
    }?t=${selectedMap}&sn=${!tmpValue}&sn2=${isAreaSideNavOpen}&lyrs=${mapLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}`;
    window.history.replaceState({}, "", newUrl);
    // dispatch(setUrlUpdate());
  };

  const setLyrs = (lyrs) => {
    dispatch(setAreaLyrs(lyrs));
    const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=${isAreaSideNavOpen}&lyrs=${lyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}`;
    window.history.replaceState({}, "", newUrl);
  };

  const openAreaNav = () => {
    const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=true&lyrs=${mapLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}`;
    window.history.replaceState({}, "", newUrl);
    dispatch(setIsAreaSideNavOpen(true));
  };

  return (
    <div className="flex">
      <AreaSideNavbar />
      <div className="relative">
        <div className="w-12 absolute left-0 top-0 z-50 ml-2">
          <div className="flex flex-col gap-4 mt-2">
            <Button isIconOnly variant="bordered" className="bg-blue-700">
              <BsFillArrowLeftSquareFill
                // size={26}
                className={`cursor-pointer text-white h-6 w-6 ${
                  isSideNavOpen ? "" : "rotate-180"
                }`}
                onClick={() => collapsibleBtnHandler()}
              />
            </Button>
            <Button isIconOnly variant="bordered" className="bg-blue-700">
              <GiEarthAmerica className={`text-white cursor-pointer h-6 w-6`} />
            </Button>
            <Button isIconOnly variant="bordered" className="bg-blue-700">
              <AiFillPlusSquare
                className={`text-white cursor-pointer h-6 w-6`}
              />
            </Button>
            <Button isIconOnly variant="bordered" className="bg-blue-700">
              <AiFillMinusSquare
                className={`text-white cursor-pointer h-6 w-6`}
              />
            </Button>
            {/* {!isAreaSideNavOpen && isSideNavOpen ? (
              <Button
                variant="bordered"
                className="bg-blue-700 mt-12 -ml-5 rotate-90"
                onClick={openAreaNav}
              >
                <FaChevronUp className={`text-white cursor-pointer h-6 w-6`} />
              </Button>
            ) : null} */}
          </div>
        </div>
        <ButtonGroup
          variant="faded"
          className="absolute left-0 bottom-0 z-50 m-2"
          color="primary"
        >
          <Button
            onClick={() => setLyrs("m")}
            className={`${
              mapLyrs == "m"
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white"
            } `}
          >
            Map
          </Button>
          <Button
            onClick={() => setLyrs("s")}
            className={`${
              mapLyrs == "s"
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white"
            } `}
          >
            Satelite
          </Button>
          <Button
            onClick={() => setLyrs("p")}
            className={`${
              mapLyrs == "p"
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white"
            } `}
          >
            Terrain
          </Button>
        </ButtonGroup>
        <Map
          ref={mapRef}
          style={{
            width: isSideNavOpen ? "80vw" : "100vw",
            // width: `${isAreaSideNavOpen ? "75vw" : "100vw"}`,
            height: "90vh",
          }}
          controls={[]}
        >
          <olView
            // ref={mapRef}
            initialCenter={[0, 0]}
            center={areaInitialCenter}
            initialZoom={2}
            zoom={areaZoomLevel}
          />
          <olLayerTile preload={Infinity}>
            {/* <olSourceOSM /> */}
            <olSourceXYZ
              args={{
                url: `https://mt0.google.com/vt/lyrs=${mapLyrs}&hl=en&x={x}&y={y}&z={z}`,
                // url: `https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}`,
              }}
            ></olSourceXYZ>
          </olLayerTile>
        </Map>
      </div>
    </div>
  );
};
{
  /* <olLayerTile>
  {/* <olSourceOSM /> */
}
//     <olSourceXYZ args={{ url: "https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}", }} > map=m terr=p satt=s
//   </olSourceXYZ>
// </olLayerTile> */}
