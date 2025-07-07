import { useState, useRef } from "react";

const html2pdf = typeof window !== "undefined" ? require("html2pdf.js") : null;

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    template: "template1",
  });

  const componentRef = useRef();

  const handleDownloadPdf = () => {
    if (html2pdf && componentRef.current) {
      const opt = {
        margin:       0.5,
        filename:     `${formData.fullName || "resume"}.pdf`,
        image:        { type: 'jpeg', quality: 1 },   // high quality
        html2canvas:  { scale: 2, useCORS: true },    // better resolution
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(componentRef.current).save();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("/api/saveResume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message);
    alert("Saved to MongoDB! ID: " + payload.id);
  } catch (err) {
    console.error(err);
    alert("Error saving: " + err.message);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">Resume Generator</h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input name="fullName" onChange={handleChange} placeholder="Full Name" className="border p-2 w-full" />
        <input name="email" onChange={handleChange} placeholder="Email" className="border p-2 w-full" />
        <input name="phone" onChange={handleChange} placeholder="Phone" className="border p-2 w-full" />
        <textarea name="summary" onChange={handleChange} placeholder="Professional Summary" className="border p-2 w-full"></textarea>
        <input name="skills" onChange={handleChange} placeholder="Skills (comma separated)" className="border p-2 w-full" />
        <input name="experience" onChange={handleChange} placeholder="Experience" className="border p-2 w-full" />
        <input name="education" onChange={handleChange} placeholder="Education" className="border p-2 w-full" />
        <select name="template" onChange={handleChange} className="border p-2 w-full">
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2">Generate</button>
      </form>

      <button onClick={handleDownloadPdf} className="bg-green-500 text-white p-2 mt-4">
        Download PDF
      </button>

      <div
        ref={componentRef}
        className="mt-8 bg-white p-4 shadow rounded text-black"
        style={{ color: "black" }}  // explicit color for html2pdf
      >
        {formData.template === "template1" ? (
          <div>
            <h2 className="text-xl font-bold">{formData.fullName || "Your Name"}</h2>
            <p>{formData.email || "email@example.com"} | {formData.phone || "1234567890"}</p>
            <p>{formData.summary || "Professional Summary goes here"}</p>
            <h3 className="font-semibold">Skills</h3>
            <p>{formData.skills || "Your skills"}</p>
            <h3 className="font-semibold">Experience</h3>
            <p>{formData.experience || "Your experience"}</p>
            <h3 className="font-semibold">Education</h3>
            <p>{formData.education || "Your education"}</p>
          </div>
        ) : (
          <div className="border-l-4 border-blue-500 pl-2">
            <h2 className="text-2xl font-extrabold">{formData.fullName || "Your Name"}</h2>
            <p>{formData.email || "email@example.com"} | {formData.phone || "1234567890"}</p>
            <p className="italic">{formData.summary || "Summary goes here"}</p>
            <strong>Skills:</strong> {formData.skills || "skills"}<br/>
            <strong>Experience:</strong> {formData.experience || "experience"}<br/>
            <strong>Education:</strong> {formData.education || "education"}
          </div>
        )}
      </div>
    </div>
  );
}
