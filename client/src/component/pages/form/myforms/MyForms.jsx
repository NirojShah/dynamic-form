import React, { useEffect, useState } from "react";
import formsApi from "../../../../utility/forms.api";
import FormCard from "../../../common/FormCards";
import { useNavigate } from "react-router-dom";

const MyForms = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    const fetchForms = async () => {
      try {
        const resp = await formsApi.myforms();
        setForms(resp.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchForms();
  }, []);

  const handleClick = async (title, organization) => {
    const resp = await formsApi.getPublicLink(title, organization);
    navigate(`/home/response/${resp}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {forms.map((val) => {
        return (
          <FormCard
            className="w-80"
            description={val.description}
            organization={val.organizationName}
            title={val.name}
            onClick={handleClick}
            key={val._id}
          />
        );
      })}
    </div>
  );
};

export default MyForms;
