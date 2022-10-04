import React from "react";
import Sidebar from "../Slidebar/Sidebar";
import test from "./test.module.scss"

const Admin = ()=>{
    return(
    <>
    <div className={test.container}>
        <Sidebar/>
        <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, ut sapiente. Alias sed molestiae suscipit ipsam a sunt adipisci explicabo quam nisi tenetur! Sint repellendus ea sequi at consequatur deleniti?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, nam. Voluptatibus animi quaerat delectus, temporibus nesciunt sequi, ratione provident, quasi dolorem veniam modi officiis natus nobis similique sit labore voluptatem. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa doloribus esse id voluptatem temporibus voluptatibus odio quia, quo harum doloremque tenetur et hic consequuntur, deserunt quibusdam repellendus iste consequatur recusandae.</h1>
    </div>
    </>
    )
}

export default Admin;