import React, { useEffect, useRef } from "react";
import GlideJs from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";

export default function Glide(props) {
  const slider = useRef();
  const glider = useRef(null);

  useEffect(() => {
    glider.current = new GlideJs(slider.current, props.options).mount();
    return () => {
      glider.current.destroy();
    };
  }, [props.options]);

  return (
    <div ref={slider} className="glide">
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {props.children.map((img, i) => (
            <li className="glide__slide" key={i}>
              {img}
            </li>
          ))}
        </ul>
      </div>
      <div className="glide__arrows" data-glide-el="controls">
        <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
          prev
        </button>
        <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
          next
        </button>
      </div>
    </div>
  );
}
