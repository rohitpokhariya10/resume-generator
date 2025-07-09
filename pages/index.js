// Resume Generator App
//  This is a complete React component that:
//  Takes user input for resume
//  Allows selecting template (1 or 2)
//  Generates PDF using html2pdf.js
//  Supports line breaks in summary & skills parsing
//  Saves to MongoDB via backend API ("/api/saveResume")

import { useState, useRef } from "react";

// Load html2pdf library (only on client)
const html2pdf = typeof window !== "undefined" ? require("html2pdf.js") : null;

export default function Home() {
  // 📦 All form input values stored here
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

  const componentRef = useRef(); // 🧾 Reference to resume preview for PDF export

  // 📤 Save user data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/saveResume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      const payload = JSON.parse(text);

      if (!res.ok) throw new Error(payload.message);
      alert("Saved to MongoDB! ID: " + payload.id);
    } catch (err) {
      console.error(err);
      alert("Error saving: " + err.message);
    }
  };

  // 📥 Form input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📥 Export resume preview as PDF
  const handleDownloadPdf = () => {
    if (!componentRef.current || !html2pdf) {
      alert("PDF component not ready");
      return;
    }

    const opt = {
      margin: 0.5,
      filename: `${formData.fullName || "resume"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    setTimeout(() => {
      html2pdf().set(opt).from(componentRef.current).save();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">Resume Generator</h1>

      {/* 🧾 Input Form */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input name="fullName" onChange={handleChange} placeholder="Full Name" className="border p-2 w-full" />
        <input name="email" onChange={handleChange} placeholder="Email" className="border p-2 w-full" />
        <input name="phone" onChange={handleChange} placeholder="Phone" className="border p-2 w-full" />

        <textarea
          name="summary"
          onChange={handleChange}
          placeholder="Professional Summary"
          className="border p-2 w-full"
        />

        <textarea
          name="skills"
          onChange={handleChange}
          placeholder="List skills (one per line or comma separated)"
          className="border p-2 w-full"
          rows={3}
        />

        <input name="experience" onChange={handleChange} placeholder="Experience" className="border p-2 w-full" />
        <input name="education" onChange={handleChange} placeholder="Education" className="border p-2 w-full" />

        <select name="template" onChange={handleChange} className="border p-2 w-full">
          <option value="template1">Modern Template 1</option>
          <option value="template2">Modern Template 2</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Save to MongoDB
        </button>
      </form>

      {/*  PDF Button */}
      <button onClick={handleDownloadPdf} className="bg-green-500 text-white p-2 mt-4 w-full">
        Download PDF
      </button>

      {/*  Resume Template Preview */}
      <div
        ref={componentRef}
        className="mt-8 bg-white p-6 shadow-md rounded text-black"
        style={{ color: "black", fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}
      >
        {formData.template === "template1" ? (
          // 📄 Template 1
          <div>
            <h1 className="text-3xl font-bold border-b pb-2">{formData.fullName || "Your Name"}</h1>
            <p className="text-sm">{formData.email || "email@example.com"} | {formData.phone || "1234567890"}</p>

            <section className="mt-4">
              <h2 className="font-semibold text-lg border-b">Summary</h2>
              <p>
                {(formData.summary || "Professional Summary goes here.")
                  .split("\n")
                  .map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
              </p>
            </section>

            <section className="mt-4">
              <h2 className="font-semibold text-lg border-b">Skills</h2>
              <ul className="list-disc ml-5">
                {(formData.skills || "Your skills")
                  .split(/[\n,]+/)
                  .filter(skill => skill.trim() !== "")
                  .map((skill, i) => <li key={i}>{skill.trim()}</li>)}
              </ul>
            </section>

            <section className="mt-4">
              <h2 className="font-semibold text-lg border-b">Experience</h2>
              <p>{formData.experience || "Your experience"}</p>
            </section>

            <section className="mt-4">
              <h2 className="font-semibold text-lg border-b">Education</h2>
              <p>{formData.education || "Your education"}</p>
            </section>
          </div>
        ) : (
          // 📄 Template 2
          <div
            style={{
              padding: "1.5rem",
              border: "2px solid #1f2937",
              backgroundColor: "#f9fafb",
              maxWidth: "750px",
              margin: "0 auto",
              color: "#111827",
              fontFamily: "Helvetica, sans-serif",
            }}
          >
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", borderBottom: "2px solid #2563eb", paddingBottom: "5px" }}>
              {formData.fullName || "Your Name"}
            </h1>
            <p style={{ fontSize: "0.9rem", marginTop: "4px" }}>
              {formData.email || "email@example.com"} | {formData.phone || "1234567890"}
            </p>

            <div style={{ marginTop: "1rem" }}>
              <h2 style={{ fontSize: "1.1rem", color: "#2563eb", fontWeight: "600" }}>Professional Summary</h2>
              <p>
                {(formData.summary || "Summary goes here.")
                  .split("\n")
                  .map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
              </p>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <h2 style={{ fontSize: "1.1rem", color: "#2563eb", fontWeight: "600" }}>Skills</h2>
              <ul style={{ marginLeft: "1rem" }}>
                {(formData.skills || "skills")
                  .split(/[\n,]+/)
                  .filter(skill => skill.trim() !== "")
                  .map((skill, i) => <li key={i}>{skill.trim()}</li>)}
              </ul>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <h2 style={{ fontSize: "1.1rem", color: "#2563eb", fontWeight: "600" }}>Experience</h2>
              <p>{formData.experience || "experience"}</p>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <h2 style={{ fontSize: "1.1rem", color: "#2563eb", fontWeight: "600" }}>Education</h2>
              <p>{formData.education || "education"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
