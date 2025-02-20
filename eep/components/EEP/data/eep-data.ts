import { ClockIcon, CloudIcon, CodeIcon, DatabaseIcon, FolderGitIcon, GlobeIcon, KeyIcon, LayoutIcon, RocketIcon, ServerIcon } from "lucide-react";
import { FaFlask } from "react-icons/fa";

export const masteryModules = [
  {
    // emoji: "🚀",
    title: "AWS Basics",
    description: "Gain hands-on experience with AWS core services, including Lambda, EventBridge, IAM, and S3, to build scalable cloud solutions.",
    icon: CloudIcon,
  },
  {
    // emoji: "⚡",
    title: "Serverless with Lambda & EventBridge",
    description: "Master event-driven architectures by creating serverless applications with AWS Lambda and EventBridge, optimizing performance and efficiency.",
    icon: RocketIcon,
  },
  {
    // emoji: "🌐",
    title: "Flask API Development",
    description: "Develop RESTful APIs using Flask, integrating seamlessly with DynamoDB and SQL databases for robust backend solutions.",
    icon: FaFlask,
  },
  {
    // emoji: "🔒",
    title: "JWT Authentication",
    description: "Implement JWT-based authentication for secure API access, ensuring safe token management and user verification.",
    icon: KeyIcon,
  },
  {
    // emoji: "📊",
    title: "SQL & DynamoDB",
    description: "Understand SQL fundamentals and work with DynamoDB to manage structured and unstructured data, learning when to use NoSQL vs. SQL.",
    icon: DatabaseIcon,
  },
  {
    // emoji: "⏳",
    title: "Automated Scheduling with Cron Jobs",
    description: "Set up and manage Unix cron jobs and AWS EventBridge for task automation, ensuring seamless background operations.",
    icon: ClockIcon,
  },
  {
    // emoji: "🚀",
    title: "CI/CD & Deployment",
    description: "Build CI/CD pipelines with GitHub Actions, deploy applications on Render, and automate updates for smooth and efficient software releases.",
    icon: RocketIcon,
  },
  {
    // emoji: "🌐",
    title: "Web Development Basics and Roadmap",
    description: "Understand the fundamentals of web development, including client-server architecture, HTTP protocols, and the web development lifecycle. Build a clear roadmap to guide your learning journey.",
    icon: GlobeIcon,
  },
  {
    // emoji: "🖥️",
    title: "Frontend Development from Scratch",
    description: "Learn to create responsive and interactive user interfaces using HTML, CSS, and JavaScript. Master DOM manipulation, event handling, and styling techniques to build engaging web pages.",
    icon: LayoutIcon,
  },
  {
    // emoji: "⚡",
    title: "Advanced Frontend Development",
    description: "Dive into modern frontend frameworks like React and Next.js. Build dynamic, high-performance web applications with reusable components, state management, and server-side rendering.",
    icon: CodeIcon,
  },
  {
    // emoji: "🔙",
    title: "Backend Development",
    description: "Develop robust backend systems using popular frameworks like Node.js, Django, NestJS, and .NET. Learn to create RESTful APIs, handle authentication, and manage server-side logic.",
    icon: ServerIcon,
  },
  {
    // emoji: "🗃️",
    title: "Database Design and Structuring",
    description: "Gain expertise in designing and structuring databases for optimal performance. Learn relational and non-relational database concepts, schema design, and query optimization for scalable applications.",
    icon: DatabaseIcon,
  },
  {
    // emoji: "🔧",
    title: "Git and GitHub",
    description: "Master version control with Git and GitHub. Learn essential commands, branching strategies, and collaboration workflows to manage codebases effectively. Gain hands-on experience with pull requests, code reviews, and repository management.",
    icon: FolderGitIcon,
  }
];