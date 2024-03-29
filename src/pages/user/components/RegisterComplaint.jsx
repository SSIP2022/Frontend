import React, { useState, useEffect, useRef } from "react";
import form from "../../../styles/Registercomplaint.module.scss";
import toast from "react-hot-toast";
import { PickerOverlay } from "filestack-react";
import { baseURL, queryfn } from "../../../config/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { user } from "../../../store/userReducer";
import { useSearchParams } from "react-router-dom";

const Complaindata = {
  NONE: [],
  // Electricity: [
  //   "( વિસ્તારમાં સ્ટ્રીટ લાઈટ ચાલતી નથી  )  Area Street Light Not Working",
  //   "( થાંબલા પર ઈલેક્ટ્રીક શોક / હાલના થાંબલા પર લિકેજ )  Electric Shock_Current Leakage on Pole",
  //   "( અપૂરતો પ્રકાશ  )  Insufficient Lighting",
  //   "( LED લાઈટ ચાલતી નથી  )  LED Light Not Working",
  //   "( ઓવરહેડ લાઈન સમસ્યા  )  Overhead Line Problem",
  //   "( થાંબલો જોખમકારક પરિસ્થિતિમાં છે  )  Pole is in dangerous Condition",
  //   "( નકામી સ્ટ્રીટ લાઈટ દુર કરવા બાબત  )  Removable of Unserviceable Street Light",
  //   "( સોડીયમ લાઈટ ચાલતી નથી  )  Sodium Light Not Working",
  //   "( સ્ટ્રીટ લાઈટ ના થાંબલા ઉપર સ્પાર્કીંગ   )  Sparking on Street light Pole",
  //   "( લાઈટ ચાલુ / બંધ ના સમયની સમસ્યા  )  Switching ON_OFF Time Problem",
  //   "( ટ્યુબ લાઈટ ચાલતી નથી  )  Tube light Not Working",
  //   "( અન્ય  )  Other",
  // ],
  // Water: [
  //   "( અશુદ્ધ, ક્ન્ટામિનેટેડ પાણી  )  Contaminated Water(Impure)",
  //   "( ડાયરેક્ટ મોટર ચલાવવી )  Direct Motor Running",
  //   "( ગેરકાયદેસર જોડાણ )  Illegal Connection",
  //   "( અપૂરતો પાણી વિતરણનો સમય ગાળો   )  Insufficient Water Supply Duration",
  //   "( જાહેર સ્ટેન્ડ પોસ્ટની દુરસ્તી  )  Leakage of Public Stand Post",
  //   "( નીચા પાણીનું દબાણ  )  Low Water Pressure",
  //   "( મુખ્ય નળીકા / ફીડલ નળીકા લીકેજ  )  Main_Feeder Line Leakage",
  //   "( પાઇપલાઈન લીકેજ  )  Pipeline Leakage",
  //   "( પીવાના પાણી પુરવઠામાં કલોરીનીકરણની તીવ્રતા સ્તર ઘટાડો  )  Reduction of intensity level of Chlorination in Potable Water Supply",
  //   "( વાલ્વ રિપેરિંગની  ફરિયાદો )  Related To Repairing Of Valves",
  //   "( હેન્ડ પંપ સમારકામ )  Repairing of Hand Pump",
  //   "( વાલ્વ લીકેજ  )  Valve Leakage",
  //   "( અન્ય )  Other",
  // ],
  // Cleaning: [
  //   "( ફૂટપાથનું સાફ સફાઈ કરવા બાબત  )  Cleaning Of Footpath (Walk Ways)",
  //   "( તૂટેલા રોડ ડીવાઈડર અને ફૂટપાથ સમારકામ  )  Cleaning Related To Railing and Curb Stones",
  //   "( ડીવાઈડર ની આસપાસ સફાઈ કરવી  )  Cleaning Vicinity of Deviders",
  //   "( સાફ સફાઈ થયેલ નથી  )  Cleaning-Scraping Not Carried Out",
  //   "( સાફ સફાઈ અયોગ્ય થયેલ છે  )  Cleaning-Scraping Not Proper",
  //   "( કન્ટેનર, કચરા પેટી મુકવાની જગ્યા યોગ્ય સાફ નથી )  Container-Dustbin Spot Not Cleaned Properly",
  //   "( કન્ટેનર, કચરા પેટી ઉપાડી નથી  )  Container-Dustbin Spot Not lifted",
  //   "( બિલ્ડીંગ મટીરીયલનો નિકાલ  )  Lifting of Building Materials",
  //   "( બાંધકામ અને તોડફોડના કાટમાળનો નિકાલ )  Lifting of Construction and Demolition",
  //   "( અન્ય  )  Other",
  // ],
  Health: [
    "Interruption/failure of power supply",
    "Voltage variation",
    "Scheduled Outage / Load shedding",
    "Metering",
    "Billing",
    "Disconnection / Reconnection",
    "Miscellaneous",
  ],
  Others: ["( પાર્કિંગ )  Parking", "( ટાઉન પ્લાનીંગ )  Town Planning"],
};
const disomcsData = {
  NONE: [],
  DGVCL: ["Surat", "Bharuch", "Valsad", "Navsari"],
  MGVCL: ["Vadodara", "Anand", "Kheda", "Panchmahal", "Dahod"],
  PGVCL: ["Rajkot", "Jamnagar", "Junagadh", "Porbandar", "Bhuj"],
  UGVCL: ["Mehsana", "Patan", "Banaskantha", "Sabarkantha", "Gandhinagar"],
};
const data = {
  NONE: [],
  Central: ["Shahpur", "Dariapur", "Jamalpur", "Khadia", "Asarva", "Shahibaug"],
  East: [
    "Gomtipur",
    "Odhav",
    "Vastral",
    "Bhaipura_Hatkeshwar",
    "Amraiwadi",
    "Ramol_Hathijan",
    "Nikol",
    "Virat_nagar",
  ],
  North: [
    "Bapu_Nagar",
    "India_Colony",
    "Thakkarbapa_Nagar",
    "Saraspur",
    "Sardar_nagar",
    "Naroda",
    "Kuber_nagar",
    "Saijpur_Bogha",
  ],
  South: [
    "Behrampura",
    "Indrapuri",
    "Khokhra",
    "Maninagar",
    "Danilimda",
    "Lambha",
    "Isanpur",
    "Vatva",
  ],
  South_West: ["Sarkhej", "Jodhpur", "Vejalpur", "Maktampura"],
  West: [
    "Ranip",
    "Chandkheda_Motera",
    "Sabarmati",
    "Naranpura",
    "Nava_Vadaj",
    "SP_Stadium",
    "Navrangpura",
    "Paldi",
    "Vasna",
  ],
};

const RegisterComplaint = () => {
  const [searchParams] = useSearchParams();
  const [isPicker, setIsPicker] = useState(false);
  const [fileName, setFilename] = useState("Choose File");
  const { userData } = useSelector(user);
  //body states
  const [subject, setSubject] = useState("NONE");
  const [description, setDecription] = useState("");
  const [address, setAddress] = useState("");
  const [file_data, setFileData] = useState({});
  const [zone, setZone] = useState("NONE");
  const [ward, setWard] = useState("");
  const [department, setDepartment] = useState("Health");
  const navigate = useNavigate();

  const restrictedWords = [
    "+",
    "-",
    "&&",
    "||",
    "!",
    "(",
    ")",
    "{",
    "}",
    "[",
    "]",
    "^",
    "~",
    "*",
    "?",
    ":",
    "<",
    ">",
    "</",
  ];

  const handleChange = (event) => {
    let description = event.target.value;
    const wordArray = description.split(" ");
    let valid = true;

    for (let i = 0; i < wordArray.length; i++) {
      if (restrictedWords.includes(wordArray[i])) {
        toast.error("Invalid characters");
        valid = false;
        break;
      }
    }

    if (valid && description.length <= 512) {
      setDecription(description);
    } else {
      // Filter out the restricted words from the description
      restrictedWords.forEach((restrictedWord) => {
        description = description.replace(restrictedWord, "");
      });

      // Update the description state with the filtered description
      setDecription(description);
    }
  };
  const handlePaste = (event) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text");
    let filteredText = pastedText;

    // Filter out the restricted words from the pasted text
    restrictedWords.forEach((restrictedWord) => {
      filteredText = filteredText.replace(restrictedWord, "");
    });

    // Check if the pasted text is too long
    if (filteredText.length > 512) {
      // Truncate the pasted text to 500 characters

      filteredText = filteredText.substring(0, 512);
    }
    toast.error("Invalid characters");
    // Update the input field with the filtered and truncated text
    event.target.value = filteredText;
  };
  const onSubmitComplain = async (e) => {
    e.preventDefault();
    const data = await queryfn({
      endpoint: baseURL + `/complain/create`,
      reqMethod: "POST",
      body: JSON.stringify({
        subject: subject,
        description: description,
        address: address,
        zone: zone,
        ward: ward,
        tags: [],
        creator_id: userData.user_id,
        file_data: file_data,
        department: department,
      }),
      failMsg: "Error During Register Complaint",
    });
    console.log("Register complaint data:", data);
    if (data.success) {
      toast.success("Complaint Registerd");
      navigate(`/user/dashboard`);
    } else {
      toast.error("Fail To Register");
    }
  };
  useEffect(() => {
    if (searchParams.get("discoms") !== null) {
      setZone(
        searchParams.get("discoms")[0].toUpperCase() +
          searchParams.get("discoms").slice(1)
      );
    }
  }, [searchParams]);
  return (
    <>
      <div className={form.main}>
        <div className="formWrapper" style={{ height: "100%" }}>
          <form>
            <h3 className="title">Register Complaint</h3>
            <label>
              <h4>DISCOMS :</h4>
              <select
                // className={form.select}
                name="Zone"
                id="ctl00_ContentPlaceHolder1_ddlWard"
                title="Please Select Ward"
                onChange={(e) => {
                  setZone(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <option defaultValue value="NONE">
                  {" "}
                  ( પસંદ કરો )
                </option>
                <option
                  selected={
                    searchParams.get("discoms") &&
                    searchParams.get("discoms") === "DGVCL"
                  }
                  value="DGVCL"
                >
                  DGVCL
                </option>
                <option
                  selected={
                    searchParams.get("discoms") &&
                    searchParams.get("discoms") === "MGVCL"
                  }
                  value="MGVCL"
                >
                  MGVCL
                </option>
                <option
                  selected={
                    searchParams.get("discoms") &&
                    searchParams.get("discoms") === "PGVCL"
                  }
                  value="PGVCL"
                >
                  PGVCL
                </option>
                <option
                  selected={
                    searchParams.get("discoms") &&
                    searchParams.get("discoms") === "UGVCL"
                  }
                  value="UGVCL"
                >
                  UGVCL
                </option>
              </select>
            </label>
            <label>
              <h4>District :</h4>
              <select
                name="Ward"
                id="ctl00_ContentPlaceHolder1_ddlWard"
                title="Please Select Ward"
                onChange={(e) => {
                  setWard(e.target.value);
                }}
              >
                <option defaultValue value="NONE">
                  {" "}
                  ( પસંદ કરો )
                </option>
                {disomcsData[zone].map((ele, ind) => {
                  return (
                    <>
                      <option key={ind} value={ele}>
                        {ele}
                      </option>
                    </>
                  );
                })}
              </select>
            </label>
            <label>
              <h4>Address :</h4>
              <input
                name="Address"
                type="text"
                required
                placeholder="Enter your problem Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                onPaste={handlePaste}
              />
            </label>
            {/* <label>
              <h4>Department :</h4>
              <select
                name="Department"
                id="ctl00_ContentPlaceHolder1_ddlWard"
                title="Please Select Ward"
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
              >
                <option value="NONE"> ( પસંદ કરો )</option>
                <option
                  selected={
                    searchParams.get("department") &&
                    searchParams.get("department") === "electricity"
                  }
                  value="Electricity"
                >
                  Electricity
                </option>
                <option
                  selected={
                    searchParams.get("department") &&
                    searchParams.get("department").toLowerCase() === "water"
                  }
                  value="Water"
                >
                  Water
                </option>
                <option
                  selected={
                    searchParams.get("department") &&
                    searchParams.get("department").toLowerCase() === "health"
                  }
                  value="Health"
                >
                  Health
                </option>
                <option
                  selected={
                    searchParams.get("department") &&
                    searchParams.get("department").toLowerCase() === "cleaning"
                  }
                  value="Cleaning"
                >
                  Cleaning
                </option>
                <option
                  selected={
                    searchParams.get("department") &&
                    searchParams.get("department").toLowerCase() === "others"
                  }
                  value="Others"
                >
                  Others
                </option>
              </select>
            </label> */}
            <label>
              {/* <h4>Enter Title Of Your Complaint:</h4>
            <input
              type="text"
              name="problem"
              placeholder=" Enter description"
              className={form.description}
            /> */}
              <h4>Problem :</h4>
              <select
                // className={form.select}
                name="Problems"
                id="ctl00_ContentPlaceHolder1_ddlProblem"
                title="Please Select Problem"
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              >
                <option defaultValue value="NONE">
                  {" "}
                  ( પસંદ કરો ) -- Select --
                </option>
                {Complaindata[department].map((ele, ind) => {
                  return (
                    <option key={ind} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
              <h4>Description {`( <=512 character)`}</h4>

              <input
                type="text"
                name="problem"
                required
                placeholder="Enter your problem description"
                value={description}
                onChange={handleChange}
                onPaste={handlePaste}
              />
            </label>
            {/* <label>
              <h4>Pincode</h4>
            
              <input
                type="number"
                name="name"
                placeholder="Enter Pincode"
                // className={form.description}
                maxLength={6}
              />
              </label> */}

            {/* https://nekobin.com/gewasakoya */}
            {/* <label>
              <h4>Your Area :</h4>
              <div style={{ display: "flex", position: "relative" }}>
                <GoLocation className={form.locIcon} />
                <MdMyLocation
                  className={form.locIcon}
                  style={{ right: "18px" }}
                />
                <input
                  required
                  type="text"
                  name="area"
                  placeholder="Your Area"
                  // className={form.description}
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>
            </label>
            <label>
              <h4>Location of Complaint</h4>
              <input
                required
                type="text"
                name="address"
                placeholder="Your Address"
                // className={form.description}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            <label>
              <h4>Pincode</h4>
              <input
                required
                type="number"
                name="name"
                placeholder="Pincode"
                // className={form.description}
                value={pincode}
                maxLength={10}
                onChange={(e) => {
                  setPincode(e.target.value);
                }}
              />
            </label> */}
            <label>
              <h4>Upload Image: {`( <= 5mb)`}</h4>
              {/* <input type="file" id="file" aria-label="File browser example"/>
  <span class="file-custom"/> */}
              {/* <input type="file" name="file" className={form.file} /> */}

              {/* </label> */}
              {/* <div className={form.choose}> */}

              <input
                required
                name="file"
                id="file"
                type="button"
                // disabled
                // className={form.file}
                style={{ cursor: "pointer" }}
                value={fileName}
                onClick={(e) => {
                  e.preventDefault();
                  isPicker ? setIsPicker(false) : setIsPicker(true);
                }}
              />
              {/* </div> */}
              {/* <div></div> */}
              {/* <label> */}
              {/* <div></div>
            <Button
            text="Submit"
            bgcolor="#d5e4e6"
            type="submit"
            className={form.submit}
          /> */}
            </label>
            <button
              value="Submit"
              onClick={(e) => {
                e.preventDefault();
                if (
                  subject === "NONE" ||
                  description === "" ||
                  address === "" ||
                  ward === "NONE" ||
                  zone === "NONE" ||
                  department === "NONE"
                  // || Object.keys(file_data).length === 0
                ) {
                  toast.error("Emtpy Field Spotted");
                  return;
                }
                onSubmitComplain(e);
              }}
            >
              Submit
            </button>
          </form>

          <div style={{ margin: "4px", position: "relative" }}>
            {isPicker && (
              <PickerOverlay
                apikey={"APwB1TgES0KwafVa8EnJsz"}
                action="pick"
                pickerOptions={{
                  accept: "image/*",
                  maxSize: 5 * 1024 * 1024,
                }}
                onUploadDone={(resp) => {
                  console.log(resp);
                  setFilename(resp.filesUploaded[0].filename);
                  setIsPicker(false);
                  setFileData({
                    role: userData.role,
                    id: userData.user_id,
                    url: resp.filesUploaded[0].url,
                    filename: resp.filesUploaded[0].filename,
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterComplaint;
