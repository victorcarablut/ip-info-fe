import React, { useEffect, useRef, useState } from 'react';
import { select, geoPath, geoMercator } from 'd3';
import useResizeObserver from "./useResizeObserver";
import zoomable from 'd3-zoomable';
import data from "../../assets/custom_geo_file/custom.geo_medium.json";
import './world-map.css';

function WorldMap({ worldMapData }) {

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  const [zoomMapEnabled, setZoomMapEnabled] = useState(false);

  useEffect(() => {

    const svg = select(svgRef.current);

    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
    const projection = geoMercator().fitSize([width, height], data);
    const pathGenerator = geoPath().projection(projection);

    // important values on display country name on map mouse over
    const defaultMapOpacity = 0.3;
    const hoverMapOpacity = 0.4;

    // map
    svg
      .selectAll("path")
      .data(data.features)
      .join("path")
      .attr("d", feature => pathGenerator(feature))
      .style("opacity", defaultMapOpacity)
      .on("mouseover", (e, feature) => {
        //  other css style are in world-map.css
        svg
          .selectAll("path")
          .style("opacity", hoverMapOpacity)
          .style("stroke", "#303952")

        try {
          const opacity = window.getComputedStyle(document.querySelector("path")).opacity;
          const cursor = document.querySelector(".cursor")
          const text = cursor.querySelector("#cursor-text")
          document.addEventListener("mousemove", function (e) {
            text.style.left = e.pageX + "px";
            text.style.top = e.pageY + "px";

            document.getElementById("cursor-text").style.visibility = "visible";
            if (opacity == hoverMapOpacity) {
              document.getElementById("cursor-text").innerHTML = feature.properties.name;
            }
          })
        } catch (error) {
          return;
        }
      })
      .on("mouseout", () => {
        svg
          .selectAll("path")
          .style("opacity", defaultMapOpacity)
          .style("stroke", "transparent")

        try {
          const cursor = document.querySelector(".cursor")
          const text = cursor.querySelector("#cursor-text")
          document.addEventListener("mousemove", function (e) {
            text.style.left = e.pageX + "px";
            text.style.top = e.pageY + "px";
            document.getElementById("cursor-text").style.visibility = "hidden";
          })
        } catch (error) {
          return
        }
      })

    // map circle/bubble
    svg
      .selectAll("circle")
      .data(worldMapData)
      .join("circle")
      .attr("cx", d => projection([d.long, d.lat])[0])
      .attr("cy", d => projection([d.long, d.lat])[1])
      .attr("r", 3)
      .attr("visibility", d => d.long === 0 ? 'hidden' : 'visible')

    // map circle label/text
    svg
      .selectAll(".label")
      .data(worldMapData)
      .join("text")
      .attr("class", "label")
      .text(d => d.city)
      .attr("x", d => projection([d.long, d.lat])[0])
      .attr("y", d => projection([d.long, d.lat])[1])
      .on("mouseenter", () => {
        svg
          .selectAll(".label")
          .text(d => d.city + " - " + d.countryName.toUpperCase())
      })
      .on("mouseleave", () => {
        svg
          .selectAll(".label")
          .text(d => d.city)
      })


    if (zoomMapEnabled) {
      const zoom = zoomable();
      zoom(document.getElementById('world-map-container')).svgEl(document.getElementById('world-map')).scaleExtent([1, 4]);
      document.getElementById("world-map").style.cursor = "all-scroll";
    } else {
      const zoom = zoomable();
      zoom(document.getElementById('world-map-container')).svgEl(document.getElementById('world-map')).zoomReset([{ x: 0, y: 0, k: 0 }]).enableX(false).enableY(false);
      document.getElementById("world-map").style.cursor = null;
    }

  }, [data, worldMapData, dimensions, zoomMapEnabled])

  return (
    <div ref={wrapperRef} id="world-map-container">

      <div className="zoom-map-toggle">
        <span>{zoomMapEnabled ? "Disable / Reset Zoom" : "Enable Zoom"}</span>
        <input type="checkbox" checked={zoomMapEnabled} onChange={() => setZoomMapEnabled(!zoomMapEnabled)} />
      </div>

      <svg className="world-map" id="world-map" ref={svgRef} />

      <div className="cursor">
        <h6 id="cursor-text"></h6>
      </div>
      
    </div>
  )
}

export default WorldMap