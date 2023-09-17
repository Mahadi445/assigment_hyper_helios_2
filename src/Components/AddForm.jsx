import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "./UseForm";
import { addContact, getListContactId, editContact } from "../LocalStroge/SaveData";

export default function AddForm() {

  const navigate = useNavigate();
  const { id } = useParams();

  const { inputValues, handleInputChange, resetForm, setForm } = useForm({
    name: "",
    number: "",
  });


  useEffect(() => {
    if (id) {
      const contact = getListContactId(id);
      setForm(contact);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  
  const formatPhoneNumberForDisplay = (phoneNumber) => {
    // Convert "+8801xxxxxxxxx" to "01xxxxxxxxx" for display
    return phoneNumber.replace("+880", "0");
  };


  const formatPhoneNumberForStorage = (phoneNumber) => {
    // Convert "017xxxxxxxxx" to "+8801xxxxxxxx" for storage
    return phoneNumber.replace(/^0/, "+880");
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the phone number format validation here
    const bdPhoneNumber = /^01\d{9}$/.test(inputValues.number);

    if (bdPhoneNumber) {
      // Format the phone number for storage
      const phoneNumberForStorage = formatPhoneNumberForStorage(inputValues.number);

      if (id) {
        editContact(id, { ...inputValues, number: phoneNumberForStorage });
      } else {
        addContact({ ...inputValues, number: phoneNumberForStorage });
      }

      resetForm(); // after submite a form then reset form

    } else {
      alert("Please enter a valid 11-digit Bangladesh phone number starting with '01'.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>User {id ? "Edit" : "Create"} Information</h1>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="name"
            value={inputValues.name}
            onChange={handleInputChange}
            id="username"
            required
          />
        </div>
        <div>
          <label htmlFor="usernumber">User Number (BD Only - 11 digits):</label>
          <input
            type="text"
            name="number"
            value={formatPhoneNumberForDisplay(inputValues.number)}
            onChange={handleInputChange}
            id="usernumber"
            required
          />
        </div>
        <button className="button1" type="submit">
          Submit
        </button>
        <button className="btn" type="button" onClick={() => navigate("/contact-list")}>
          Contact List
        </button>
      </form>
    </>
  );
}














