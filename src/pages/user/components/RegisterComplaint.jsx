import React, { useState, useEffect, useRef } from "react";
import form from "../../../styles/Registercomplaint.module.scss";
import toast from "react-hot-toast";
import { PickerOverlay } from "filestack-react";
import { baseURL } from "../../../config/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { user } from "../../../store/userReducer";
// import {GoLocation} from "react-icons/go";
// import {MdMyLocation} from "react-icons/md";
const RegisterComplaint = () => {
  const [isPicker, setIsPicker] = useState(false);
  const [fileName, setFilename] = useState("Choose File");
  const { userData } = useSelector(user);
  //body states
  const [subject, setSubject] = useState("");
  const [description, setDecription] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [img_url, setImageurl] = useState("");
  // const [localLocation, setLocation] = useState({});
  // const [creator_id,setCretor] = useState("");

  const navigate = useNavigate();

  // const checkPincode = ()=>{
  //   if(pincodes[pincode].area != undefined)
  //   {
  //     setArea(pincodes[pincode].area)
  //     console.log(pincode);
  //   }
  // }

  // useEffect(()=>{

  // },[area1])

  const onSubmitComplain = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseURL}/complain/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        subject: subject,
        description: description,
        // status :"Open",
        // district:"",
        address: address,
        area: area,
        pincode: pincode,
        tags: [],
        img_url: img_url,
        creator_id: userData.user_id,
      })
    })
    const data = await response.json();
    if (data.success) {
      toast.success("Complaint Registerd");
      navigate(`/user/dashboard`)
    }
    else {
      toast.error("Fail To Register");
    }
  }

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         // window.location = "/user/home"
  //         setLocation({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         });
  //       },
  //       (error) => console.log(error)
  //     );
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //   }
  // }, []);
  //https://codesandbox.io/s/blue-thunder-71dvr3?file=/index.html:371-403
  //https://apis.mapmyindia.com/advancedmaps/v1/<licence_key>/rev_geocode?lat=<latidude>&lng=<longitude>
  // const mapRef = useRef(null);
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://apis.mappls.com/advancedmaps/api/f9be05de5758c2cae8a18a53e696b53e/map_sdk?layer=vector&v=3.0&callback=initMap1';
  //   script.defer = true;
  //   script.async = true;
  //   document.head.appendChild(script);

  //   window.initMap1 = () => {
  //     const mappls = window.mappls;
  //     mapRef.current = new mappls.Map("map", {});
  //     mapRef.current.addListener("click", async function (e) {
  //       //https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${e.lngLat.lat}&longitude=${e.lngLat.lng}&localityLanguage=en
  //       const response = await fetch(`https://apis.mapmyindia.com/advancedmaps/v1/9fbb146f6537122d1a763a595db1949e/rev_geocode?lat=${e.lngLat.lat}&lng=${e.lngLat.lng}`, {
  //         method: "GET",
  //       });
  //       const data = await response.json();
  //       setArea(data['results'][0]['locality']);
  //       setAddress(data['results'][0]['street']);
  //       setPincode(data['results'][0]['pincode'])
  //       let divId = document.getElementById("show-result");
  //       divId.style.display = "block";
  //     });
  //     mapRef.current.addListener("load", function () {
  //       console.log(localLocation)
  //       mapRef.current.setCenter({ lat: localLocation.lat, lng: localLocation.lng });
  //     });
  //   };
  // }, [localLocation]);
  return (
    <>
      <div className={form.main}>
        {/* <header className={user.header}>
                <img className={user.photo} src="/logo.jpg" alt="profile"/>
                <div className={user.name}>Dojetobhai Limdiwala</div>
            </header> */}
        <div className="formWrapper" style={{ height: "100%" }}>
          <form >
            <h3 className="title">Register Complaint</h3>
            <label>
              <h4>Zone :</h4>
              <select
                // className={form.select}
                name="Zone"
                id="ctl00_ContentPlaceHolder1_ddlWard"
                title="Please Select Ward"
                onChange={(e) => {
                  // console.log(e.target.options[e.target.selectedIndex].text)
                  // setZone(e.target.options[e.target.selectedIndex].text)
                }}
              >
                <option selected="selected" value="0">  ( પસંદ કરો )</option>
                <option value="1">Central</option>
                <option value="2">East</option>
                <option value="3">North</option>
                <option value="4">South</option>
                <option value="5">South-West</option>
                <option value="6">West</option>
              </select>
            </label>
            <label>
              <h4>Ward :</h4>
              <select

                name="Ward"
                id="ctl00_ContentPlaceHolder1_ddlWard"
                title="Please Select Ward"
                onChange={(e) => {
                  // console.log(e.target.options[e.target.selectedIndex].text)
                  // setWard(e.target.options[e.target.selectedIndex].text)
                }}
              >
                <option selected="selected" value="0">  ( પસંદ કરો )</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </label>
            <label>
              <h4>Address :</h4>
              <select 
                name="Address"
                id="ctl00_ContentPlaceHolder1_ddlWard"
                title="Please Select Ward"
                onChange={(e) => {
                  // console.log(e.target.options[e.target.selectedIndex].text)
                  setAddress(e.target.options[e.target.selectedIndex].text)
                }}
              >
                <option selected="selected" value="0">  ( પસંદ કરો )</option>
                <option value="1">1</option>

              </select>

              
            </label>
            <label>
              <h4>Department :</h4>
              <select

                name="Department"
                id="ctl00_ContentPlaceHolder1_ddlWard"
                title="Please Select Ward"
                onChange={(e) => {
                  // console.log(e.target.options[e.target.selectedIndex].text)
                  // setDepartment(e.target.options[e.target.selectedIndex].text)
                }}
              >
                <option selected="selected" value="0">  ( પસંદ કરો )</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </label>
            <label >
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
                  // console.log(e.target.options[e.target.selectedIndex].text)
                  setSubject(e.target.options[e.target.selectedIndex].text)
                }}
              >
                <option  selected="selected" value="0">  ( પસંદ કરો )  -- Select --</option>
                <option value="130">  ( વિસ્તારમાં સ્ટ્રીટ લાઈટ ચાલતી નથી  )  Area Street Light Not Working</option>
                <option value="131">  ( થાંબલા પર ઈલેક્ટ્રીક શોક / હાલના થાંબલા પર લિકેજ )  Electric Shock_Current Leakage on Pole</option>
                <option value="132">  ( અપૂરતો પ્રકાશ  )  Insufficient Lighting</option>
                <option value="147">  ( LED લાઈટ ચાલતી નથી  )  LED Light Not Working</option>
                <option value="133">  ( ઓવરહેડ લાઈન સમસ્યા  )  Overhead Line Problem</option>
                <option value="134">  ( થાંબલો જોખમકારક પરિસ્થિતિમાં છે  )  Pole is in dangerous Condition</option>
                <option value="135">  ( નકામી સ્ટ્રીટ લાઈટ દુર કરવા બાબત  )  Removable of Unserviceable Street Light</option>
                <option value="136">  ( સોડીયમ લાઈટ ચાલતી નથી  )  Sodium Light Not Working</option>
                <option value="137">  ( સ્ટ્રીટ લાઈટ ના થાંબલા ઉપર સ્પાર્કીંગ   )  Sparking on Street light Pole</option>
                <option value="138">  ( લાઈટ ચાલુ / બંધ ના સમયની સમસ્યા  )  Switching ON_OFF Time Problem</option>
                <option value="139">  ( ટ્યુબ લાઈટ ચાલતી નથી  )  Tube light Not Working</option>
                <option value="106">  ( અન્ય  )  Other</option>
              </select>
              <h4>Description</h4>
              <input
                type="text"
                name="problem"
                required
                placeholder="Enter your problem description"
                // className={form.description}
                value={description}
                onChange={e => setDecription(e.target.value)}
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
              <div style={{display:"flex",position:"relative"}}>

                <GoLocation className={form.locIcon}/><MdMyLocation className={form.locIcon} style={{right:"18px"}}/>
              <input
                required
                type="text"
                name="area"
                placeholder="Your Area"
                // className={form.description}
                value={area}
                onChange={e => setArea(e.target.value)}
                />
              
                </div>
            </label>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div id="map" style={{ width: '90%', height: '30vh' }} />
            </div>
            <div id="show-result" style={{ display: 'none' }} />
            <label>
              <h4>Location of Complaint</h4>
              <input
                required
                type="text"
                name="address"
                placeholder="Your Address"
                // className={form.description}
                value={address}
                onChange={e => setAddress(e.target.value)}
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
                onChange={e => { setPincode(e.target.value) }}
              />
            </label> */}
            <label>

              <h4>Upload Image:</h4>
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
            <button value="Submit" onClick={(e) => {
              if (subject === "" || description === "" || area === "" || address === "" || pincode === "" || img_url === "") {
                toast.error("failed to register");
                return
              }
              onSubmitComplain(e)
            }
            } >Submit</button>
          </form>

          <div style={{ margin: "4px", position: "relative" }}>
            {isPicker && (
              <PickerOverlay
                apikey={"AJbGbxcJRbqofHCOKiyGJz"}
                action="pick"
                pickerOptions={{
                  maxSize: 10 * 1024 * 1024,
                }}
                onSuccess={(resp) => {
                  setFilename(resp.filesUploaded[0].filename)
                  setImageurl(resp.filesUploaded[0].url)
                  setIsPicker(false)
                  console.log(address)
                }
                }
                onUploadDone={(res) => console.log(res)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterComplaint;
