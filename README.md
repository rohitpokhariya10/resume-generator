# 📝 Resume Generator Web App

A simple and elegant resume generator built using **Next.js**, **React**, **Tailwind CSS**, and **MongoDB Atlas**. Users can fill a form, preview their resume, download it as a PDF, and also save it securely to a MongoDB database.

---

## 🔧 Tech Stack

- **Next.js** (App Framework)
- **React** (Frontend)
- **Tailwind CSS** (Styling)
- **MongoDB Atlas** (Cloud Database)
- **html2pdf.js** (PDF Export)
- **Vercel** (Deployment)

---

## 🚀 Live Demo

🔗 [View Live App](https://your-vercel-url.vercel.app)  
_Replace above link with your deployed Vercel app link._

---

## 📦 Features

- Fill form with personal details
- Select resume template
- Preview resume instantly
- Download resume as PDF
- Save resume data to MongoDB database

---

## 📂 Project Structure

resume-generator/
├── pages/
│ ├── index.js # Main form and resume preview
│ └── api/saveResume.js # API route to store data in MongoDB
├── lib/
│ └── mongodb.js # MongoDB connection logic
├── styles/
│ └── globals.css # Tailwind CSS
├── public/
│ └── ... # Assets & icons
└── .env.local # MongoDB URI (not pushed to GitHub)

🛠️ How to Run Locally
bash
Copy
Edit
git clone https://github.com/your-username/resume-generator.git
cd resume-generator
npm install
npm run dev
Open http://localhost:3000

☁️ Deploying to Vercel
Push this code to a GitHub repo

Go to https://vercel.com

Click New Project → Import GitHub repo

Set MONGODB_URI in Environment Variables

Click Deploy

🙋‍♂️ Author
Rohit Pokhariya
B.Tech CSE | Resume Web App Creator
GitHub

