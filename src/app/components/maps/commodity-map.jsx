"use client";

import React, { Suspense, useEffect } from "react";
import "ol/ol.css";
import { Map } from "@react-ol/fiber";
import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const CommodityMap = async () => {
  const viewRef = useRef(null);
  const router = useRouter();

  // const searchParams = useSearchParams();
  // const zoom = searchParams.get("z");

  // useEffect(() => {
  //   if (zoom) {
  //   } else {
  //     router.push("?t=Area");
  //   }
  // }, [zoom]);

  // let sumPromise = new Promise(function (resolve, reject) {
  //   setTimeout(function () {
  //     console.log("sasas");
  //     resolve("The sum of all data is 100.");
  //   }, 3000);
  // });
  // let result = await sumPromise;
  return (
    <div>
      {/* <button
        className="absolute right-0 top-0"
        onClick={() => {
          viewRef.current?.setZoom(viewRef.current.getZoom() + 1);
        }}
      >
        Zoom in
      </button> */}
      <Map style={{ width: "100vw", height: "90vh" }} controls={[]}>
        <olView  initialCenter={[0, 0]} initialZoom={2} />
        <olLayerTile preload={Infinity}>
          <olSourceOSM />
        </olLayerTile>
      </Map>
    </div>
  );
};
