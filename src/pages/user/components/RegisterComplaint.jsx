import React, { useState, useEffect, useRef } from "react";
import form from "../../../styles/Registercomplaint.module.scss";
import toast from "react-hot-toast";
import { PickerOverlay } from "filestack-react";
import { baseURL } from "../../../config/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { user } from "../../../store/userReducer";
import { GoLocation } from "react-icons/go";
import { MdMyLocation } from "react-icons/md";
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
  const [file_data, setFileData] = useState({});
  const [localLocation, setLocation] = useState({});
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
        address: address,
        area: area,
        pincode: pincode,
        tags: [],
        creator_id: userData.user_id,
        file_data: file_data,
      }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success("Complaint Registerd");
      navigate(`/user/dashboard`);
    } else {
      toast.error("Fail To Register");
      e.preventDefault();
      console.log(data);
    }
  };
  //https://codesandbox.io/s/blue-thunder-71dvr3?file=/index.html:371-403
  //https://apis.mapmyindia.com/advancedmaps/v1/<licence_key>/rev_geocode?lat=<latidude>&lng=<longitude>

  return (
    <>
      <div className={form.main}>
        <div className="formWrapper" style={{ height: "130vh" }}>
          <form>
            <h3 className="title">Register Complaint</h3>
            <label>
              <h4>Problem :</h4>
              <select
                // className={form.select}
                name="Problems"
                id="ctl00_ContentPlaceHolder1_ddlProblem"
                title="Please Select Problem"
                onChange={(e) => {
                  // console.log(e.target.options[e.target.selectedIndex].text)
                  setSubject(e.target.options[e.target.selectedIndex].text);
                }}
              >
                <option value="0">Please Select Problem</option>
                <option value="249">
                  Ac-Fridge-water cooler etc. not working ( Muni Hospital-Office
                  Bldg)
                </option>
                <option value="180">Acquire Registration Cerificate</option>
                <option value="117">
                  ACs/Water Coolers Are Not Working in Muni. Offices, City Civic
                  Centres, Hospitals, Swimming Pools, Crematoriums, Schools,
                  Gyms etc.
                </option>
                <option value="252">
                  Any Ele. Problem in Swimminig Pool OR releated Pump,Motor Etc.
                </option>
                <option value="136">Application done but not resolved.</option>
                <option value="183">
                  Application Form Not Cleared From The Office/Zone
                </option>
                <option value="169">
                  Application Not Yet Approved - Swimming
                </option>
                <option value="59">
                  Applied For Entry But Still Not Approved - GYM
                </option>
                <option value="73">
                  Applied For The License But Not Yet Received
                </option>
                <option value="193">Balvatika</option>
                <option value="108">
                  Basic Needs Like Water, Light and Fan Repairing - Library
                </option>
                <option value="163">Burning Of Solid Wastes</option>
                <option value="194">Butterfly Park</option>
                <option value="153">Cleaners Not Coming - SWM</option>
                <option value="161">
                  Cleaning Out The Mud and Water Soaked Soil
                </option>
                <option value="159">
                  Cleaning Out The Surroundings of The Dustbin
                </option>
                <option value="209">Clearing Building Material Debris</option>
                <option value="208">Clearing off the Big Dead Animals</option>
                <option value="162">Clearing Off The Cow Dung</option>
                <option value="56">
                  Clearing Off The Cut Out/Dried Out Trees
                </option>
                <option value="155">Clearing off the Dead Animals</option>
                <option value="157">Clearing Off The Dust</option>
                <option value="55">
                  Clearing Out The Overgrown Branches or Trees On Road Side
                </option>
                <option value="61">
                  Coach Is Irregular/Remains Absent - GYM
                </option>
                <option value="165">
                  Coach is Irregular/Remains Absent - Swimming
                </option>
                <option value="58">Coach Is Not Courteous - GYM</option>
                <option value="171">
                  Coach's Behaviour is Improper - Swimming
                </option>
                <option value="71">Collecting Water Samples - Health</option>
                <option value="57">Complain Against The Tree-Cutting</option>
                <option value="75">
                  Contaminated Water/Dirty Surroundings Causes Mosquito
                  Reproduction
                </option>
                <option value="190">
                  Contractor Had not disposed off the Manhole Silt Properly -
                  Eng
                </option>
                <option value="229">Corona - Contact with Positive Case</option>
                <option value="228">Corona Food Related</option>
                <option value="225">Coronavirus infection </option>
                <option value="179">Create Multitude</option>
                <option value="35">Creche</option>
                <option value="84">
                  Creche Helpers/Workers Remain Unavailable And Irregular
                </option>
                <option value="82">
                  Creche Remains Closed/Does not Open On Time
                </option>
                <option value="106">Daily Cleaning - Library</option>
                <option value="17">Deep Pit - Large settlement of road</option>
                <option value="65">
                  Delay In Issuing The certificates - - Birth/Death/Marriage
                  Certificate
                </option>
                <option value="39">
                  Demolition of Unsafe Buildings and Their Parts
                </option>
                <option value="125">
                  Did not get Get Lunch in School - Mid Day Meal
                </option>
                <option value="79">
                  Did not Receive The Registration On Time - Nursing Home
                </option>
                <option value="213">
                  Digging of cellar w/o protective support
                </option>
                <option value="188">
                  Doctors/Staffs Not Available/Treatment Is Not Given On Time-
                  Doctors/Staffs
                </option>
                <option value="78">
                  Doctors/Staffs Not Available/Treatment Is Not Given On Time-
                  MT Hospital
                </option>
                <option value="107">
                  Does not Come on Time - Mobile Library
                </option>
                <option value="201">
                  Does not Get Reading Materials on time - Bal Bhavan
                </option>
                <option value="109">
                  Does not Get Reading Materials on time - Library
                </option>
                <option value="160">Door-To-Door Solid Waste Management</option>
                <option value="36">Doss House ( Rain Basera )</option>
                <option value="10">
                  Drain Blockage or Choking on TP road - Eng
                </option>
                <option value="158">Emptying The Dustbins</option>
                <option value="64">
                  Error In The Entry; Correction Required - Birth/Death/Marriage
                  Certificate
                </option>
                <option value="186">
                  Facility Related To Training Centre - Ummeed Cell
                </option>
                <option value="116">
                  Fans and Lights Are Not Working in Muni. Offices, City Civic
                  Centres, Hospitals, Schools, Swimming Pools, Gyms etc.
                </option>
                <option value="128">
                  Food Is Not As Per The Menu - Mid Day Meal
                </option>
                <option value="70">Food-Poisoning cases - Health</option>
                <option value="21">Footpath Repairing Required</option>
                <option value="13">
                  Frequent Breakdown &amp; Blockage of Drain - Eng
                </option>
                <option value="111">
                  Furnace Not Working in CNG/ Electric Crematorium
                </option>
                <option value="113">
                  Garden - Lights Are Not Working In Garden
                </option>
                <option value="44">
                  Garden is observed to have hollow grounds. They need
                  levelling. - Garden
                </option>
                <option value="256">Garden toilet cleaning</option>
                <option value="60">
                  GYM - Lights Remain Off at Gym, Skating Rink/Sports Centre
                </option>
                <option value="34">Health Centre</option>
                <option value="216">High Mast Light</option>
                <option value="215">High Mast Light Is Off</option>
                <option value="123">
                  High Mast Light Remains Switched On In Day Time
                </option>
                <option value="218">High Mast Pole</option>
                <option value="32">Hospitals</option>
                <option value="114">
                  Hospitals - Lights and Fans Are Not Working in Hospitals
                </option>
                <option value="14">Illegal Drainage connection - Eng</option>
                <option value="8">
                  Illegal tapping-motoring by someone - Eng
                </option>
                <option value="168">Improper Cleaning - Swimming</option>
                <option value="62">Improper Coaching - GYM</option>
                <option value="66">
                  In Charge Not Available - - Birth/Death/Marriage Certificate
                </option>
                <option value="69">In Charge Not Available - Health</option>
                <option value="3">
                  Inadequate water or low inflow pressure - Eng
                </option>
                <option value="74">Inferior Quality of Food</option>
                <option value="127">
                  Inferior Quality of Food - Mid Day Meal
                </option>
                <option value="166">
                  Inferior Quality of Water - Swimming
                </option>
                <option value="126">
                  Irregular in Distribution of Food in school - Mid Day Meal
                </option>
                <option value="91">
                  Kankaria Lakefront - Behaviour of Security Staffs Is Not
                  Courteous/Improper - KLF
                </option>
                <option value="90">
                  Kankaria Lakefront - Behaviour of Staffs Is Not
                  Courteous/Improper - KLF
                </option>
                <option value="94">
                  Kankaria Lakefront - Damaged/Harmful Civil Structure –
                  Component – Equipment - KLF
                </option>
                <option value="102">
                  Kankaria Lakefront - Drinking Water Is Not Available - KLF
                </option>
                <option value="104">
                  Kankaria Lakefront - Drinking Water Is Not Cold - KLF
                </option>
                <option value="103">
                  Kankaria Lakefront - Drinking Water Is Not Purified - KLF
                </option>
                <option value="99">
                  Kankaria Lakefront - Fountains Are Not Working or Not Switched
                  On At Proper Time - KLF
                </option>
                <option value="96">
                  Kankaria Lakefront - Improper Service Delivery –
                  Non-Operations of Any of The Recreation Activities Which Is
                  Beyond Control
                </option>
                <option value="95">
                  Kankaria Lakefront - Level of Housekeeping – Cleanliness Is
                  Not Up To The Mark - KLF
                </option>
                <option value="97">
                  Kankaria Lakefront - Lights and Electric Fixtures Are Not
                  Working or Not Switched On - KLF
                </option>
                <option value="101">
                  Kankaria Lakefront - Litter – Waste – Plastic Bottles –
                  Wrappers Found – Observed in Lake
                </option>
                <option value="88">
                  Kankaria Lakefront - Lost/Theft of Belongings
                </option>
                <option value="100">
                  Kankaria Lakefront - Music System/Public Address System Is Not
                  Working or Not Switched On Regularly
                </option>
                <option value="98">
                  Kankaria Lakefront - Possibility of Short Circuit/Electrical
                  Shock Due To Open Cables - KLF
                </option>
                <option value="86">
                  Kankaria Lakefront - Selling of Unhygienic Food &amp;
                  Beverages At Food Courts &amp; Entry Gates - KLF
                </option>
                <option value="87">
                  Kankaria Lakefront - Selling of Unhygienic Food &amp;
                  Beverages At The Price Other Than MRP or The Rate Card – Menu
                  Rate At Food Courts
                </option>
                <option value="105">
                  Kankaria Lakefront - Short Supply/Non-Availability of Water In
                  Wash Rooms – Toilets - KLF
                </option>
                <option value="93">
                  Kankaria Lakefront - Traffic Congestion At Gate Entries Due to
                  Hand-Lorries, Pan Parlours, Rickshaws, Other Vehicles,
                  Hawkers, etc.
                </option>
                <option value="92">
                  Kankaria Lakefront - Visitors Observed/Seen With Prohibited
                  Contents Like Cigarettes, Tobacco – Pan Masala, Prohibited
                  Drinks, Prohibited Drugs etc.
                </option>
                <option value="85">
                  Kankaria Lakefront - Water Logging During Monsoon - KLF
                </option>
                <option value="4">Leakage In Pipe Line - Eng</option>
                <option value="202">
                  Library Opening and Closing Timings - Bal Bhavan
                </option>
                <option value="110">
                  Library Opening and Closing Timings - Library
                </option>
                <option value="247">
                  Light-Fan-Lift (Office bldg-civic cen-school-Gym-Crematoriam)
                </option>
                <option value="248">
                  Light-Fan-Lift Genral Ele.Repairing in Auditorium-Hall
                </option>
                <option value="251">
                  Light-Fan-Wiring Genral Ele. Fault(Nagari-SVP Hospital)
                </option>
                <option value="250">
                  Light-Fan-Wiring Genral Ele. Fault(Sardaben-LG-Dental
                  Hospital)
                </option>
                <option value="124">
                  Lights of Societies, Chawls and Streets Are Not Working
                </option>
                <option value="184">Loan Account of Subsidy Beneficiary</option>
                <option value="192">
                  Lowering the Manhole cover &amp; Catch pit - Eng
                </option>
                <option value="119">Main Road Streetlight Is Off</option>
                <option value="67">Maintain Cleanliness in Crematorium</option>
                <option value="37">Municipal Schools</option>
                <option value="199">Museum</option>
                <option value="195">Naginawadi</option>
                <option value="177">Name Change in Existing BPL List</option>
                <option value="43">No Cleaning At All - Garden</option>
                <option value="50">
                  No Cleaning At All - Traffic Circle-Central verge
                </option>
                <option value="12">No Drainage Manhole cover - Eng</option>
                <option value="170">No Light/Wiring is open - Swimming</option>
                <option value="176">No Name in Existing BPL List</option>
                <option value="115">
                  No Power Supply in Muni. Offices, City Civic Centres,
                  Hospitals, Schools, Swimming Pools, Gyms etc.
                </option>
                <option value="47">
                  No Proper Security/Not available/Guard is inefficient - Garden
                </option>
                <option value="173">No Proper Training - Swimming</option>
                <option value="7">No Water - Eng</option>
                <option value="24">No Water Supply In A Public Building</option>
                <option value="152">Not Cleaning At All - SWM</option>
                <option value="83">
                  Not Getting Protein Food As Per The Law/Not Regular
                </option>
                <option value="77">
                  Not Providing The Benefits To The Patients As Per The Govt.
                  Guidelines-Health
                </option>
                <option value="187">
                  Not Providing The Benefits To The Patients As Per The Govt.
                  Guidelines-UHC
                </option>
                <option value="196">One Tree hill Garden</option>
                <option value="172">Other Complaints - Swimming</option>
                <option value="26">Other Maintenance</option>
                <option value="11">
                  Overflowing of main line and distribution line on road - Eng
                </option>
                <option value="212">
                  Parking Problem in Commercial Building{" "}
                </option>
                <option value="16">
                  Patch work Relaying of a portion of road
                </option>
                <option value="167">
                  Pipes, Showers, Urine Tub, Tiles etc are broken
                </option>
                <option value="219">Plastic Collection</option>
                <option value="15">Pot holes on the Road</option>
                <option value="76">
                  Preventing Malaria/Dengue/Spraying Insecticides/Fogging
                </option>
                <option value="204">
                  Public Toilets and Urinals - Cleaning Out The Surroundings
                </option>
                <option value="154">
                  Public Toilets and Urinals - Daily Cleaning Not Being Done
                </option>
                <option value="205">
                  Public Toilets and Urinals - Drainage Line Blockage or Choking
                </option>
                <option value="206">
                  Public Toilets and Urinals - Drainage Line Breakage
                </option>
                <option value="207">
                  Public Toilets and Urinals - Non-Availability of
                  Water/Cleaning of Water Tank/Broken Tank Cover
                </option>
                <option value="25">
                  Public Toilets and Urinals - Repairing of Doors, Windows,
                  Tiles or Sheets
                </option>
                <option value="118">
                  Pumps Are Not Working in Muni. Office, City Civic Center,
                  Hospitals, Crematoriums, Schools, Swimming Pools, Gyms etc.
                </option>
                <option value="191">
                  Raising the Manhole Cover &amp; Catch Pit Up To the Road Level
                  - Eng
                </option>
                <option value="197">Rasala Nature Park</option>
                <option value="80">Reaction Observed After Vaccination</option>
                <option value="19">
                  Removal of waste-Dust Lying on both side of the road after re
                  surfacing
                </option>
                <option value="40">Remove Encroachment From Road</option>
                <option value="178">
                  Remove Name from The Existing BPL List
                </option>
                <option value="38">
                  Remove Unauthorised Advertisement From Municipal Buildings and
                  Personal Properties
                </option>
                <option value="46">
                  Repairing Required (Fountains/Amusement Park Equipments) -
                  Garden
                </option>
                <option value="181">Revolving Fund Related</option>
                <option value="72">Running The Business Without License</option>
                <option value="182">Send Application Form To Bank</option>
                <option value="121">
                  Shock Observed Electric On Streetlight
                </option>
                <option value="235">SMT-Auto Flushing not working</option>
                <option value="234">SMT-Automatic Door is not working</option>
                <option value="232">SMT-Daily Cleaning not being done</option>
                <option value="231">SMT-Non Availability of water </option>
                <option value="214">
                  Spitting Or Urinating at public place
                </option>
                <option value="164">
                  Spraying Off Insecticides-Powder-Swm
                </option>
                <option value="255">
                  SRF- Electric Shock Observed On light-pole
                </option>
                <option value="253">SRF- Light not working</option>
                <option value="254">SRF- Light Poles Have Fell Down</option>
                <option value="81">Staffs Not Available - Vaccine</option>
                <option value="122">Streetlight Light</option>
                <option value="120">Streetlight Poles Have Fell Down</option>
                <option value="217">Streetlight Switched On In Day Time</option>
                <option value="242">SVP-AC Temperature Issue</option>
                <option value="243">SVP-Electrical Plug issue</option>
                <option value="240">SVP-False Ceiling fallen</option>
                <option value="237">SVP-Furniture Issue</option>
                <option value="246">SVP-HOT WATER issue</option>
                <option value="245">SVP-Light Fixture Issue</option>
                <option value="238">SVP-Plumbing issue</option>
                <option value="244">SVP-Power Supply issue</option>
                <option value="239">SVP-Wall Fixture issue</option>
                <option value="241">SVP-Water Leakage</option>
                <option value="236">SVP-Water Supply issue</option>
                <option value="42">
                  Taking Actions Against Illegal Possessions
                </option>
                <option value="41">
                  Taking Permits For Municipal Plots and Others
                </option>
                <option value="221">Throwing Plastic garbage/Waste</option>
                <option value="210">To Capture rabid dogs</option>
                <option value="2">To Capture stray cattle like cow </option>
                <option value="222">
                  To Capture stray dogs for Sterilization and vaccination
                </option>
                <option value="63">Tool Maintenance/Parts Change - GYM</option>
                <option value="230">Traffic Signal Stop Line</option>
                <option value="185">
                  Training Certificate Not Received - Ummeed Cell
                </option>
                <option value="224">Treatment of ill / sick Animals </option>
                <option value="223">Tree Falling</option>
                <option value="52">
                  Tree-Guards Have Inclined/Broken/Bent Towards The Road
                </option>
                <option value="54">
                  Trimming The Tree Branches On Road Side
                </option>
                <option value="49">
                  Trimming The Trees in Garden - Garden
                </option>
                <option value="53">
                  Trimming/Cutting The Trees at Central Verge
                </option>
                <option value="174">
                  Unauthorised Development Is On/Prevention Steps Not Being
                  Taken
                </option>
                <option value="175">
                  Unauthorised Use/Prevention Steps Not Being Taken
                </option>
                <option value="220">
                  Using Inferior Quality of Plastic for Tea/Pan/Water
                  pouch/Other Food Items.
                </option>
                <option value="33">Ward Office</option>
                <option value="9">Water connection not given - Eng</option>
                <option value="6">Water quality-Polluted water - Eng</option>
                <option value="5">Water timing related - Eng</option>
                <option value="45">
                  Watering is Not Proper/Regular - Garden
                </option>
                <option value="51">
                  Watering is Not Proper/Regular-Traffic-Central verge
                </option>
                <option value="22">Waterlogged Due To Rain</option>
                <option value="68">Woods Are Not Dry in Crematorium</option>
                <option value="48">
                  Workers/Gardeners Are Not Available/Insufficient Staffing -
                  Garden
                </option>
                <option value="198">Zoo</option>
              </select>
              <h4>Description</h4>
              <input
                type="text"
                name="problem"
                required
                placeholder="Enter your problem description"
                // className={form.description}
                value={description}
                onChange={(e) => setDecription(e.target.value)}
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
            <label>
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
            </label>
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
            <button
              value="Submit"
              onClick={(e) => {
                e.preventDefault();
                if (
                  subject === "" ||
                  description === "" ||
                  area === "" ||
                  address === "" ||
                  pincode === "" ||
                  Object.keys(file_data).length === 0
                ) {
                  toast.error("Emepy Field Spotted");
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
                apikey={"AJbGbxcJRbqofHCOKiyGJz"}
                action="pick"
                pickerOptions={{
                  maxSize: 10 * 1024 * 1024,
                }}
                onSuccess={(resp) => {}}
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
