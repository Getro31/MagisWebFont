import * as React from "react";
const SvgCalendar = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <g clipPath="url(#calendar_svg__a)">
      <path d="M448 43.221h-64V.555h-42.667V43.22H170.667V.555H128V43.22H64c-35.285 0-64 28.715-64 64v405.334h512V107.221c0-35.285-28.715-64-64-64M64 85.888h384c11.755 0 21.333 9.579 21.333 21.333v64H42.667v-64c0-11.754 9.578-21.333 21.333-21.333m-21.333 384v-256h426.666v256zm316.16-142.272-51.35 38.037 19.563 60.139-18.837 12.864-52.011-35.264-52.459 35.541-17.45-13.482 18.56-60.438-50.326-36.565 3.456-18.624h66.176l18.966-66.155h24.896l20.138 66.155h65.835l4.821 17.813z" />
    </g>
    <defs>
      <clipPath id="calendar_svg__a">
        <path d="M0 0h512v512H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCalendar;