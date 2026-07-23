"use client";
import React from "react";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { Reveal } from "@/components/ui/Reveal";
import "./about-ndc.css";

const OurCampus = ({ data }: { data: any }) => {
  if (!data) return null;
  const { title, campuses } = data;
  
  // Find the index of Nagarjuna Degree College, default to 0 if not found
  const defaultIndex = campuses?.findIndex((c: any) => c.collegeName.includes("Degree College")) ?? 0;
  
  const [activeCampus, setActiveCampus] = React.useState(defaultIndex !== -1 ? defaultIndex : 0);
  const campus = campuses?.[activeCampus];

  return (
    <section className="abt-cp-sec">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="abt-cp__grid">
          <Reveal className="abt-cp__intro">
            <span className="eyebrow-ed">Our Campuses</span>
            <h2 className="heading-ed">{title}</h2>
            <span className="abt-cp__loc"><FaMapMarkerAlt /> Bengaluru, Karnataka</span>
            <p className="abt-cp__text">
              Nagarjuna Degree College established in 2013 by Nagarjuna Education Society with an aim to lead the way for individuals into real life careers.
            </p>
            <a href="#" className="abt-cp__cta" target="_blank" rel="noopener noreferrer">
              Explore Campuses <FaArrowRight />
            </a>
          </Reveal>

          {campus && (
            <Reveal className="abt-cp__showcase">
              <div className="abt-cp__feature">
                <div className="abt-cp__feature-media">
                  <img src={campus.image} alt={campus.collegeName} />
                </div>
                <div className="abt-cp__feature-body">
                  <h3 className="abt-cp__feature-name">{campus.collegeName}</h3>
                  <span className="abt-cp__feature-loc"><FaMapMarkerAlt /> {campus.location}, Karnataka</span>
                  <a className="abt-cp__feature-link" href={campus.link} target="_blank" rel="noopener noreferrer">
                    Visit Website <FaArrowRight />
                  </a>
                </div>
              </div>
              <div className="abt-cp__thumbs">
                {campuses && campuses.map((c: any, i: number) => (
                  <button 
                    type="button" 
                    key={i} 
                    className={`abt-cp__thumb${activeCampus === i ? " is-active" : ""}`} 
                    onClick={() => setActiveCampus(i)} 
                    aria-label={c.collegeName}
                  >
                    <img src={c.image} alt={c.collegeName} />
                  </button>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurCampus;
