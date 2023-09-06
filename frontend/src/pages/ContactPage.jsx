import React from "react";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import ProfileImage from "../components/ProfileImage";
import BottomBar from "../components/BottomBar";
import parsePhoneNumber from "libphonenumber-js";
import TicketCard from "../components/TicketCard";
import Timeline from "../components/Timeline/Timeline";

const ContactPage = () => {
  const { contactId } = useParams();

  const {
    data: contact,
    loaded,
    error,
    reFetch,
  } = useFetchData(`/api/contact/${contactId}`);

  console.log(contact?.tickets);

  return (
    <div>
      <NavBar />
      <TopBar title="Contact" />
      <BottomBar />
      {contact ? (
        <div className="contact-container">
          <div>
            <ProfileImage profile={contact} size="medium" />
            <p className=" bold fs-16 m-top-20">{contact.name}</p>
            <p className="m-top-10">
              <span className="bold">Email:</span> {contact.email}
            </p>
            <p className="">
              <span className="bold">Phone:</span>{" "}
              {parsePhoneNumber(contact.number).formatNational()}
            </p>

            <Timeline
              tickets={contact?.tickets}
              limit={contact?.tickets.length}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ContactPage;
