import React from "react";
import { motion } from "framer-motion";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { Badge } from "./ui/badge";

import reactPDF from "../assets/materials/ReactJS.pdf";
import nodePDF from "../assets/materials/nodeJS.pdf";
import databasepdf from "../assets/materials/database.pdf";
import javascriptpdf from "../assets/materials/javascript.pdf";
import TypeScriptpdf from "../assets/materials/TypeScript.pdf";
import Footer from "./shared/Footer";

const materials = [
  {
    title: "React.js Interview Guide",
    description: "Complete React.js preparation with key concepts & questions.",
    categories: ["Frontend", "JavaScript"],
    pdfs: [{ name: "ReactJS", link: reactPDF }],
    bgColor: "bg-[#E6D8FC]",
    textColor: "text-black",
  },
  {
    title: "Node.js Mastery",
    description: "Important concepts and interview questions for Node.js.",
    categories: ["Backend", "JavaScript"],
    pdfs: [{ name: "Node.js ", link: nodePDF }],
    bgColor: "bg-[#D4F8C4]",
    textColor: "text-black",
  },
  {
    title: "Database Essentials",
    description: "Core concepts of databases & SQL for interviews.",
    categories: ["Database", "SQL"],
    pdfs: [{ name: "Database", link: databasepdf }],
    bgColor: "bg-[#C3D1FA]",
    textColor: "text-black",
  },
  {
    title: "System Design Basics",
    description: "Introduction to scalable system design for interviews.",
    categories: ["Architecture", "Backend"],
    pdfs: [{ name: "System Design", link: nodePDF }],
    bgColor: "bg-[#F2F2F2]",
    textColor: "text-black",
  },
  {
    title: "JavaScript Masterclass",
    description: "All essential JS concepts and coding patterns.",
    categories: ["Frontend", "Backend"],
    pdfs: [{ name: "JS Concepts", link: javascriptpdf }],
    bgColor: "bg-[#FAD6A5]",
    textColor: "text-black",
  },
  {
    title: "TypeScript",
    description: "Master TypeScript and write robust applications.",
    categories: ["Frontend", "JavaScript"],
    pdfs: [{ name: "TS Concepts", link: TypeScriptpdf }],
    bgColor: "bg-[#C3E1FA]",
    textColor: "text-black",
  },
  {
    title: "Python for Interviews",
    description: "Python topics and coding problems for interview prep.",
    categories: ["Backend", "Python"],
    pdfs: [{ name: "Python Notes", link: databasepdf }],
    bgColor: "bg-[#F8E1C4]",
    textColor: "text-black",
  },
  {
    title: "MongoDB Essentials",
    description: "Understand NoSQL databases and MongoDB fundamentals.",
    categories: ["Database", "NoSQL"],
    pdfs: [{ name: "MongoDB Guide", link: nodePDF }],
    bgColor: "bg-[#D4FAC4]",
    textColor: "text-black",
  },
  {
    title: "Docker & Kubernetes",
    description: "Containerization and orchestration essentials.",
    categories: ["DevOps", "Cloud"],
    pdfs: [{ name: "Docker & K8s", link: TypeScriptpdf }],
    bgColor: "bg-[#FCD8D4]",
    textColor: "text-black",
  },
  {
    title: "Data Structures & Algorithms",
    description: "DSA concepts with problem-solving strategies.",
    categories: ["DSA", "Algorithms"],
    pdfs: [{ name: "DSA Handbook", link: javascriptpdf }],
    bgColor: "bg-[#D8FCF2]",
    textColor: "text-black",
  },
  {
    title: "Cybersecurity Basics",
    description: "Security best practices and attack prevention.",
    categories: ["Security", "Ethical Hacking"],
    pdfs: [{ name: "Cybersecurity Guide", link: reactPDF }],
    bgColor: "bg-[#C3FAC1]",
    textColor: "text-black",
  },
  {
    title: "AWS Cloud Fundamentals",
    description: "Key AWS services and cloud computing concepts.",
    categories: ["Cloud", "AWS"],
    pdfs: [{ name: "AWS Guide", link: javascriptpdf }],
    bgColor: "bg-[#F2E6D8]",
    textColor: "text-black",
  },
];

const InterviewMaterial = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar className="shadow-md bg-white py-4" />
      <div className="max-w-6xl mx-auto my-10 px-4">
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materials.map((material, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl shadow-lg border border-gray-200 transition-all transform hover:scale-105 hover:shadow-2xl ${material.bgColor}`}
            >
              <h1 className={`text-2xl font-semibold ${material.textColor}`}>
                {material?.title}
              </h1>
              <p className="text-lg text-gray-700 my-3">
                {material?.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {material.categories.map((category, idx) => (
                  <Badge
                    key={idx}
                    className="px-3 py-1 bg-gray-200 text-gray-800 font-medium transition-colors duration-300 hover:bg-gray-300"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                {material.pdfs.map((pdf, idx) => (
                  <a key={idx} href={pdf.link} download className="block">
                    <Button
                      variant="solid"
                      className="w-full py-3 flex items-center justify-between bg-white border border-gray-300 hover:bg-gray-100 text-left px-4 whitespace-nowrap"
                    >
                      <span className="text-md font-medium text-gray-700 truncate">
                        {pdf.name}
                      </span>
                      <Download className="w-5 h-5 text-gray-600" />
                    </Button>
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default InterviewMaterial;
