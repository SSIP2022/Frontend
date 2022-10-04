import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import test from "./test.module.scss"
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import {IoIosArrowForward,IoIosArrowBack} from "react-icons/io"
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
//logos={[<FaList />,<FaRegHeart />,<RiPencilLine />,<BiCog />]}/>
//"users","dnsjad","dnsja","dnsahbd"
const Admin = ()=>{
    return(
    <>
    <div className={test.container}>
        <Sidebar 
        catagories={[
            {detail:"user",logos:<FaList />},
            {detail:"analitics",logos:<FaRegHeart />},
            {detail:"test",logos:<RiPencilLine />},
            {detail:"test2",logos:<BiCog />}]}
        />
        <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, ut sapiente. Alias sed molestiae suscipit ipsam a sunt adipisci explicabo quam nisi tenetur! Sint repellendus ea sequi at consequatur deleniti?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, nam. Voluptatibus animi quaerat delectus, temporibus nesciunt sequi, ratione provident, quasi dolorem veniam modi officiis natus nobis similique sit labore voluptatem. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa doloribus esse id voluptatem temporibus voluptatibus odio quia, quo harum doloremque tenetur et hic consequuntur, deserunt quibusdam repellendus iste consequatur recusandae.</h1>
    </div>
    </>
    )
}

export default Admin;