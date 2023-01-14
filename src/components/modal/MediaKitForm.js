import axios from "axios";
import { useState } from "react";

export default function MediaKitForm() {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    worksFor: "My Company / I work for a company",
    howCanWeHelp: "",
    salesContact: "Yes",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleChange = (e) => {
    setFormValues((oldVal) => ({ ...oldVal, [e.target.name]: e.target.value }));
  };
  const isWorkEmail = (email) => {
    const domains = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"];
    if (!email) return false;
    if (email.indexOf("@") === -1) return false;
    if (domains.includes(email.split("@")[1])) return false;
    return true;
  };
  const handleSubmit = async () => {
    try {
      let error = "";
      setSuccess(false);
      if (!isWorkEmail(formValues.email)) {
        setError("Please enter your work email");
        error = "Please enter your work email";
      }
      Object.keys(formValues).forEach((key) => {
        if (!formValues[key] && key !== "howCanWeHelp") {
          setError("Please fill all required fields");
          error = "Please fill all required fields";
        }
      });
      if (error) return;
      setLoading(true);
      setError("");
      const response = await axios.post("/api/add-list-member", {
        formValues,
      });
      console.log(response);
      if (!response.error) {
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to send");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="d-flex newsletter-input-fields mx-auto my-2 mt-6">
        <div className="mc-field-group">
          <label className="font-bold">First Name</label>
          <input
            onChange={(e) => handleChange(e)}
            value={formValues.firstName}
            name="firstName"
            type="text"
            placeholder="First Name"
            className="mt-2 mb-5 border w-full p-2 focus:outline-none focus:ring-1 ring-dynamic-red"
          />
        </div>
        <div className="mc-field-group">
          <label className="font-bold">Last Name</label>
          <input
            onChange={handleChange}
            value={formValues.lastName}
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="mt-2 mb-5 border w-full p-2 focus:outline-none focus:ring-1 ring-dynamic-red"
          />
        </div>
        <div className="mc-field-group">
          <label className="font-bold">Work Email</label>
          <input
            onChange={handleChange}
            value={formValues.email}
            name="email"
            type="email"
            placeholder="Work Email"
            className="mt-2 mb-5 border w-full p-2 focus:outline-none focus:ring-1 ring-dynamic-red"
          />
        </div>
        <div className="mc-field-group">
          <label className="font-bold">Company/Business Name</label>
          <input
            onChange={handleChange}
            value={formValues.companyName}
            name="companyName"
            type="text"
            placeholder="Company/Business Name"
            className="mt-2 mb-5 border w-full p-2 focus:outline-none focus:ring-1 ring-dynamic-red"
          />
        </div>
        <div className="mc-field-group mb-5">
          <label className="font-bold">Is this for </label>
          <div>
            <input
              onChange={handleChange}
              type="radio"
              name="worksFor"
              checked={
                formValues.worksFor === "My Company / I work for a company"
              }
              value="My Company / I work for a company"
              className="mr-2 mt-5"
            />
            <label>My Company / I work for a company</label>
          </div>
          <div>
            <input
              onChange={handleChange}
              type="radio"
              name="worksFor"
              checked={
                formValues.worksFor === "A Client / I work for an agency"
              }
              value="A Client / I work for an agency"
              className="mr-2"
            />
            <label>A Client / I work for an agency</label>
          </div>
        </div>
        <div className="mc-field-group">
          <label className="font-bold">How can we help? (Optional)</label>
          <input
            onChange={handleChange}
            value={formValues.howCanWeHelp}
            name="howCanWeHelp"
            type="text"
            placeholder="How can we help..."
            className="mt-2 mb-5 border w-full p-2 focus:outline-none focus:ring-1 ring-dynamic-red"
          />
        </div>
        <div className="mc-field-group mb-5">
          <label className="font-bold">
            Do you want our sales team to contact you?
          </label>
          <div>
            <input
              onChange={handleChange}
              type="radio"
              name="salesContact"
              checked={formValues.salesContact === "Yes"}
              value="Yes"
              className="mr-2 mt-5"
            />
            <label>Yes</label>
          </div>
          <div>
            <input
              onChange={handleChange}
              type="radio"
              name="salesContact"
              checked={formValues.salesContact === "No"}
              value="No"
              className="mr-2"
            />
            <label>No</label>
          </div>
        </div>
        <div className="button-wrap wp-block-button mt-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`${
              loading ? "bg-gray-300" : " bg-dynamic-red"
            } text-white px-12 py-2`}
          >
            Get Media Kit
          </button>
        </div>
      </div>
      <div className="newsletter-form-info">
        {/* {status === "sending" && (
          <div className="text-indigo-600">Sending...</div>
        )}
        {status === "error" || error ? (
          <div
            className="newsletter-form-error text-red-600"
            dangerouslySetInnerHTML={{ __html: error || getMessage(message) }}
          />
        ) : null}
        {status === "success" && status !== "error" && !error && (
          <div
            className="text-green-600"
            dangerouslySetInnerHTML={{ __html: decode(message) }}
          />
        )} */}
        {error && (
          <div className="newsletter-form-error text-red-600">{error}</div>
        )}
        {success && (
          <div className="newsletter-form-error text-green-600">
            Thanks very much for your enquiry, our media kit has been sent to
            your email inbox. We look forward to helping you achieve your goals.
            If you have any questions you can also email us at
            advertising@dynamicbusiness.com.au
          </div>
        )}
      </div>
    </>
  );
}
