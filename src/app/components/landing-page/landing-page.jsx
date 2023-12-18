"use client";

import { useDispatch, useSelector } from "react-redux";
import { WorkspanSelector } from "../map-workspans/workspan-selector";
import SideNavbar from "../side-navbar/sidenavbar-component";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  setAreaInitialCenter,
  setAreaLyrs,
  setAreaZoomLevel,
  setCommodityInitialCenter,
  setCommodityLyrs,
  setCommodityZoomLevel,
  setCompanyInitialCenter,
  setCompanyLyrs,
  setCompanyZoomLevel,
  setCurrentSearchString,
  setIsSideNavOpen,
  setSelectedMap,
} from "../../../store/map-selector/map-selector-slice";
import { setIsAreaSideNavOpen } from "../../../store/area-map/area-map-slice";

export const LandingPage = () => {
  let pathname = "";
  try {
    pathname = window.location.href;
  } catch (error) {}

  const router = useRouter();

  const selectedMap = useSelector(
    (state) => state.mapSelectorReducer.selectedMap
  );
  const isSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isSideNavOpen
  );
  const mapLyrs1 = useSelector((state) => state.mapSelectorReducer.areaLyrs);
  const areaZoomLevel = useSelector(
    (state) => state.mapSelectorReducer.areaZoomLevel
  );
  const areaInitialCenter = useSelector(
    (state) => state.mapSelectorReducer.areaInitialCenter
  );

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const mapType = searchParams.get("t");
  const isNavOpen = searchParams.get("sn");
  const isSecondNavOpen = searchParams.get("sn2");
  const mapLyrs = searchParams.get("lyrs");
  const mapZoom = searchParams.get("z");
  const mapCenter = searchParams.get("c");

  useEffect(() => {
    console.log("mapType", mapType);
    updateRedux();
  }, []);

  const updateRedux = async () => {
    if (mapType) {
      dispatch(setSelectedMap(mapType));
      switch (mapType) {
        case "area":
          dispatch(
            setIsSideNavOpen(String(isNavOpen).toLowerCase() === "true")
          );
          dispatch(
            setIsAreaSideNavOpen(
              String(isSecondNavOpen).toLowerCase() === "true"
            )
          );
          dispatch(setAreaLyrs(mapLyrs));
          dispatch(setAreaZoomLevel(mapZoom));
          const tmpMapCenter = mapCenter.split(",").map(Number);
          dispatch(setAreaInitialCenter(tmpMapCenter));
          // console.log("mapCenter", tmpMapCenter);

          break;
        case "company":
          dispatch(
            setIsSideNavOpen(String(isNavOpen).toLowerCase() === "true")
          );
          dispatch(setCompanyLyrs(mapLyrs));
          dispatch(setCompanyZoomLevel(mapZoom));
          dispatch(setCompanyInitialCenter(mapCenter));

          break;
        case "commodity":
          dispatch(
            setIsSideNavOpen(String(isNavOpen).toLowerCase() === "true")
          );
          dispatch(setCommodityLyrs(mapLyrs));
          dispatch(setCommodityZoomLevel(mapZoom));
          dispatch(setCommodityInitialCenter(mapCenter));

          break;

        default:
          break;
      }
      // router.push(
      //   `/?t=${mapType}&sn=${isNavOpen}&lyrs=${mapLyrs}&z=${mapZoom}&c=${mapCenter}`
      // );
      // const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&lyrs=${mapLyrs1}&z=${areaZoomLevel}&c=${areaInitialCenter}`;
      const newUrl = `${window.location.pathname}?t=${mapType}&sn=${isNavOpen}&lyrs=${mapLyrs}&z=${mapZoom}&c=${mapCenter}`;
      window.history.replaceState({}, "", newUrl);
      // dispatch(setSelectedMap(mapType));
    }
  };

  return (
    <div className="w-full flex bg-white">
      <div className={`${isSideNavOpen ? "z-40" : "fixed top-15 left-0 z-40"}`}>
        {/* {mapType}-{isNavOpen}-{mapLyrs}-{mapZoom}-{mapCenter} */}
        <SideNavbar />
      </div>
      <div className="z-0">
        <WorkspanSelector />
      </div>
    </div>
  );
};
