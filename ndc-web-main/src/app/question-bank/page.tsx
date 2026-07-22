"use client";

import React, {Suspense, useState, useEffect} from "react"

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import QuestionBankBanner from "@/components/QuestionBank/QuestionBankBanner";
import QuestionBankTabs from "@/components/QuestionBank/QuestionBankTabs";


import axios from "axios";
import { BASE_URL } from "@/config/apiService";



const Events = () => {

    // const [EventsData, setEventsData] = useState(null);
    // useEffect(() => {
    //  const fetchsetEventContent = async () => {
    //    try {
    //      const response = await axios.get(`${BASE_URL}/event`);
    //      setEventsData(response?.data?.data);
    //    } catch (error) {
    //      console.error("Error fetching SCST data:", error);
    //    }
    //  };
    //  fetchsetEventContent();
    // }, []);
    // console.log("Fetched  fetchsetEventContent Data:=============================>",EventsData);

    return (
        <div className="m-auto w-[90%]">

          <QuestionBankBanner/>

            <Suspense>
                <Breadcrumb className="ml-0"/>
            </Suspense>

            <Suspense>
                <QuestionBankTabs/>
            </Suspense> 
        
        </div>

    )
}

export default Events