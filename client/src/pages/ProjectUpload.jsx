/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { FaFileArchive, FaFilePowerpoint, FaFileAlt, FaImage, FaEye, FaDownload, FaStar } from "react-icons/fa";

const ProjectUpload = () => {
	// Sample projects data
	const sampleProjects = [
		{
			id: 1,
			title: "E-Commerce Platform",
			description: "A full-stack e-commerce solution with React and Node.js",
			technologies: "React, Node.js, MongoDB, Stripe",
			author: "John Doe",
			rating: 4.8,
			files: [
				{ name: "ecommerce-platform.zip", type: "zip", size: "15.2 MB" },
				{ name: "presentation.pptx", type: "ppt", size: "8.5 MB" },
				{ name: "README.md", type: "other", size: "2.1 KB" }
			],
			images: [
				"https://source.unsplash.com/300x200/?ecommerce,dashboard",
				"https://source.unsplash.com/300x200/?shopping,store"
			]
		},
		{
			id: 2,
			title: "Task Management App",
			description: "A collaborative task management application with real-time updates",
			technologies: "Vue.js, Express, PostgreSQL, Socket.io",
			author: "Jane Smith",
			rating: 4.6,
			files: [
				{ name: "task-manager.zip", type: "zip", size: "12.8 MB" },
				{ name: "demo.pdf", type: "ppt", size: "6.3 MB" },
				{ name: "API-docs.json", type: "other", size: "45.2 KB" }
			],
			images: [
				"https://source.unsplash.com/300x200/?task,management",
				"https://source.unsplash.com/300x200/?team,collaboration"
			]
		},
		{
			id: 3,
			title: "Weather Analytics Dashboard",
			description: "Real-time weather data visualization with predictive analytics",
			technologies: "Python, Flask, D3.js, PostgreSQL",
			author: "Mike Johnson",
			rating: 4.9,
			files: [
				{ name: "weather-dashboard.zip", type: "zip", size: "18.7 MB" },
				{ name: "technical-spec.pdf", type: "ppt", size: "4.2 MB" },
				{ name: "data-models.sql", type: "other", size: "8.9 KB" }
			],
			images: [
				"https://source.unsplash.com/300x200/?weather,forecast",
				"https://source.unsplash.com/300x200/?analytics,data"
			]
		},
		{
			id: 4,
			title: "Social Media Analytics Tool",
			description: "Comprehensive social media performance tracking and insights",
			technologies: "React Native, Firebase, Chart.js",
			author: "Sarah Wilson",
			rating: 4.7,
			files: [
				{ name: "social-analytics.zip", type: "zip", size: "22.1 MB" },
				{ name: "user-guide.pdf", type: "ppt", size: "9.8 MB" },
				{ name: "api-reference.md", type: "other", size: "15.3 KB" }
			],
			images: [
				"https://picsum.photos/300/200?random=7",
				"https://picsum.photos/300/200?random=8"
			]
		},
		{
			id: 5,
			title: "AI-Powered Code Review Assistant",
			description: "Machine learning based code review automation tool",
			technologies: "Python, TensorFlow, FastAPI, Docker",
			author: "Alex Chen",
			rating: 4.5,
			files: [
				{ name: "code-review-ai.zip", type: "zip", size: "45.3 MB" },
				{ name: "research-paper.pdf", type: "ppt", size: "12.7 MB" },
				{ name: "model-weights.pkl", type: "other", size: "234.5 MB" }
			],
			images: [
				"https://source.unsplash.com/300x200/?code,programming",
				"https://source.unsplash.com/300x200/?artificial,intelligence"
			]
		},
		{
			id: 6,
			title: "Blockchain Voting System",
			description: "Secure and transparent voting platform using blockchain technology",
			technologies: "Solidity, Web3.js, React, Ethereum",
			author: "David Brown",
			rating: 4.8,
			files: [
				{ name: "blockchain-voting.zip", type: "zip", size: "28.9 MB" },
				{ name: "whitepaper.pdf", type: "ppt", size: "15.2 MB" },
				{ name: "smart-contracts.sol", type: "other", size: "12.4 KB" }
			],
			images: [
				"https://picsum.photos/300/200?random=11",
				"https://picsum.photos/300/200?random=12"
			]
		},
		{
			id: 7,
			title: "AR Interior Design App",
			description: "Augmented reality application for virtual interior design",
			technologies: "Unity, ARKit, C#, Firebase",
			author: "Emma Davis",
			rating: 4.6,
			files: [
				{ name: "ar-interior-design.zip", type: "zip", size: "156.7 MB" },
				{ name: "design-showcase.pdf", type: "ppt", size: "22.1 MB" },
				{ name: "3d-models.fbx", type: "other", size: "89.3 MB" }
			],
			images: [
				"https://picsum.photos/300/200?random=13",
				"https://picsum.photos/300/200?random=14"
			]
		},
		{
			id: 8,
			title: "IoT Smart Home Hub",
			description: "Centralized control system for smart home devices",
			technologies: "Raspberry Pi, Python, MQTT, React",
			author: "Tom Wilson",
			rating: 4.7,
			files: [
				{ name: "smart-home-hub.zip", type: "zip", size: "34.2 MB" },
				{ name: "hardware-guide.pdf", type: "ppt", size: "11.8 MB" },
				{ name: "device-config.yaml", type: "other", size: "5.7 KB" }
			],
			images: [
				"https://picsum.photos/300/200?random=15",
				"https://picsum.photos/300/200?random=16"
			]
		},
		{
			id: 9,
			title: "Real-time Chat Application",
			description: "Scalable chat platform with end-to-end encryption",
			technologies: "Next.js, Socket.io, MongoDB, JWT",
			author: "Lisa Anderson",
			rating: 4.9,
			files: [
				{ name: "chat-app.zip", type: "zip", size: "19.8 MB" },
				{ name: "architecture-diagram.pdf", type: "ppt", size: "7.4 MB" },
				{ name: "security-audit.md", type: "other", size: "18.9 KB" }
			],
			images: [
				"https://picsum.photos/300/200?random=17",
				"https://picsum.photos/300/200?random=18"
			]
		},
		{
			id: 10,
			title: "Data Visualization Library",
			description: "Customizable charts and graphs library for web applications",
			technologies: "TypeScript, D3.js, Canvas API, NPM",
			author: "Robert Taylor",
			rating: 4.4,
			files: [
				{ name: "data-viz-lib.zip", type: "zip", size: "8.9 MB" },
				{ name: "examples.pdf", type: "ppt", size: "5.6 MB" },
				{ name: "changelog.md", type: "other", size: "9.2 KB" }
			],
			images: [
				"https://picsum.photos/300/200?random=19",
				"https://picsum.photos/300/200?random=20"
			]
		}
	];

	const [selectedProject, setSelectedProject] = useState(null);

	const getFileIcon = (type) => {
		switch (type) {
			case 'zip': return <FaFileArchive className="text-blue text-lg" />;
			case 'ppt': return <FaFilePowerpoint className="text-red-500 text-lg" />;
			default: return <FaFileAlt className="text-green-500 text-lg" />;
		}
	};

	// Download handler functions
	const downloadFile = (fileName, fileType, fileSize, projectData) => {
		let content = "";
		let mimeType = "";
		let downloadName = fileName;

		if (fileType === "zip") {
			// Create a simple ZIP file simulation with basic content
			mimeType = "application/zip";
			// For demo purposes, create a text file that simulates a ZIP
			content = `PK\x03\x04\x14\x00\x00\x00\x08\x00\x00\x00!\x00`;
			// Add sample project content
			const projectContent = `Project: ${projectData.title}\nAuthor: ${projectData.author}\nTechnologies: ${projectData.technologies}\nDescription: ${projectData.description}\n\nProject files and source code would be included in this archive.\nFile size: ${fileSize}`;
			content += projectContent;
		} else if (fileType === "ppt") {
			// Create a PDF-like file
			mimeType = "application/pdf";
			downloadName = fileName.endsWith('.pdf') ? fileName : fileName.replace('.pptx', '.pdf');
			// Simple PDF header and content
			content = `%PDF-1.4\n%Generated Presentation\n\nProject: ${projectData.title}\nAuthor: ${projectData.author}\n\nTechnologies: ${projectData.technologies}\n\nDescription:\n${projectData.description}\n\nFile Size: ${fileSize}`;
		} else {
			// Other files
			mimeType = "text/plain";
			content = `File: ${fileName}\nProject: ${projectData.title}\nSize: ${fileSize}\n\nContent: This is a sample file from the project.`;
		}

		// Create blob and download
		const blob = new Blob([content], { type: mimeType });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = downloadName;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	const downloadAllFilesModal = () => {
		if (!selectedProject) return;
		selectedProject.files.forEach((file, index) => {
			// Stagger the downloads slightly
			setTimeout(() => {
				downloadFile(file.name, file.type, file.size, selectedProject);
			}, index * 500);
		});
	};

	const downloadAllFilesCard = (project) => {
		project.files.forEach((file, index) => {
			// Stagger the downloads slightly
			setTimeout(() => {
				downloadFile(file.name, file.type, file.size, project);
			}, index * 500);
		});
	};

	const downloadSingleFile = (fileName, fileType, fileSize) => {
		downloadFile(fileName, fileType, fileSize, selectedProject);
	};

	return (
		<div className="w-full min-h-screen bg-bgColor">
			<div className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-10">
				<div className="flex items-start justify-between gap-4 mb-8">
					<div>
						<p className="text-ascent-2 text-sm">Project Showcase</p>
						<h1 className="text-ascent-1 text-2xl md:text-3xl font-bold">
							Featured Projects
						</h1>
						<p className="text-ascent-2 mt-2">
							Explore amazing projects from our community. View files, images, and detailed information.
						</p>
					</div>
					<Link
						to="/"
						className="text-ascent-2 hover:text-ascent-1 transition border border-[#66666625] px-4 py-2 rounded-xl bg-primary/70"
					>
						Back to Home
					</Link>
				</div>

				{/* Projects Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{sampleProjects.map((project) => (
						<div key={project.id} className="bg-primary/70 rounded-xl border border-[#66666625] overflow-hidden hover:shadow-lg transition-shadow">
							{/* Project Images */}
							<div className="relative h-48 bg-gradient-to-br from-[#065ad8] to-[#0f52b6]">
								<img
									src={project.images[0]}
									alt={project.title}
									className="w-full h-full object-cover"
								/>
								<div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
									<FaStar className="text-yellow-400" />
									{project.rating}
								</div>
							</div>

							{/* Project Info */}
							<div className="p-4">
								<h3 className="text-ascent-1 font-semibold text-lg mb-2 line-clamp-2">{project.title}</h3>
								<p className="text-ascent-2 text-sm mb-3 line-clamp-3">{project.description}</p>

								<div className="space-y-2 mb-4">
									<div className="flex items-center gap-2 text-xs text-ascent-2">
										<span className="font-medium">By:</span>
										<span>{project.author}</span>
									</div>
									<div className="text-xs text-ascent-2">
										<span className="font-medium">Tech:</span> {project.technologies}
									</div>
								</div>

								{/* Files Preview */}
								<div className="mb-4">
									<h4 className="text-ascent-1 font-medium text-sm mb-2">Files ({project.files.length})</h4>
									<div className="space-y-1 max-h-20 overflow-y-auto">
										{project.files.slice(0, 2).map((file, index) => (
											<div key={index} className="flex items-center gap-2 text-xs bg-primary/50 rounded px-2 py-1">
												{getFileIcon(file.type)}
												<span className="text-ascent-2 truncate flex-1">{file.name}</span>
												<span className="text-ascent-2/70">{file.size}</span>
											</div>
										))}
										{project.files.length > 2 && (
											<div className="text-xs text-ascent-2/70 text-center">
												+{project.files.length - 2} more files
											</div>
										)}
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex gap-2">
									<CustomButton
										title="View Details"
										containerStyles="flex-1 text-xs py-2 bg-[#065ad8] text-white rounded-lg hover:bg-[#0544a4] transition"
										onClick={() => setSelectedProject(project)}
									/>
									<button 
										onClick={() => downloadAllFilesCard(project)}
										className="p-2 text-ascent-2 hover:text-ascent-1 hover:bg-primary/50 rounded-lg transition active:scale-95"
										title="Download Project Files"
									>
										<FaDownload />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Project Detail Modal */}
				{selectedProject && (
					<div 
						className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
						onClick={() => setSelectedProject(null)}
					>
						<div 
							className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Modal Header */}
							<div className="sticky top-0 bg-gradient-to-r from-[#065ad8] to-[#0f52b6] text-white p-6 rounded-t-2xl flex items-center justify-between border-b border-[#66666625]">
								<div>
									<h2 className="text-3xl font-bold">{selectedProject.title}</h2>
									<p className="text-white/80 mt-1">By {selectedProject.author}</p>
								</div>
								<button
									onClick={() => setSelectedProject(null)}
									className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 transition text-2xl font-light"
									title="Close"
								>
									×
								</button>
							</div>

							{/* Modal Content */}
							<div className="p-6">
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
									{/* Images Section */}
									<div>
										<h3 className="text-gray-900 text-lg font-semibold mb-4 flex items-center gap-2">
											<FaImage className="text-blue-600" />
											Project Images
										</h3>
										<div className="grid grid-cols-1 gap-4">
											{selectedProject.images.map((image, index) => (
												<div key={index} className="relative group overflow-hidden rounded-xl shadow-lg">
													<img
														src={image}
														alt={`${selectedProject.title} ${index + 1}`}
														className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
														onError={(e) => {
															e.target.src = "https://via.placeholder.com/500x300/065ad8/ffffff?text=Project+Image";
														}}
													/>
													<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
														<button 
															onClick={() => window.open(image, '_blank')}
															className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 p-3 rounded-lg"
															title="View Full Size"
														>
															<FaEye className="text-lg" />
														</button>
													</div>
												</div>
											))}
										</div>
									</div>

									{/* Details Section */}
									<div className="space-y-6">
										{/* Rating */}
										<div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
											<h3 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
												<FaStar className="text-yellow-400" />
												Rating
											</h3>
											<div className="flex items-center gap-3">
												{[...Array(5)].map((_, i) => (
													<FaStar
														key={i}
														className={i < Math.floor(selectedProject.rating) ? "text-yellow-400 text-xl" : "text-gray-400 text-xl"}
													/>
												))}
												<span className="text-gray-900 font-bold text-lg ml-2">{selectedProject.rating}/5</span>
											</div>
										</div>

										{/* Description */}
										<div>
											<h3 className="text-gray-900 font-semibold mb-2">📝 Description</h3>
											<p className="text-gray-700 text-sm leading-relaxed bg-gray-50 rounded-lg p-3">
												{selectedProject.description}
											</p>
										</div>

										{/* Technologies */}
										<div>
											<h3 className="text-gray-900 font-semibold mb-2">🛠️ Technologies</h3>
											<div className="flex flex-wrap gap-2">
												{selectedProject.technologies.split(', ').map((tech, index) => (
													<span
														key={index}
														className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium border border-blue-300"
													>
														{tech}
													</span>
												))}
											</div>
										</div>

										{/* Author Info */}
										<div className="bg-gray-50 rounded-lg p-3 border border-gray-300">
											<p className="text-gray-900 font-medium">Author: <span className="text-blue-600">{selectedProject.author}</span></p>
										</div>
									</div>
								</div>

								{/* Files Section - Full Width */}
								<div className="border-t border-gray-300 pt-6">
									<h3 className="text-gray-900 text-lg font-semibold mb-4 flex items-center gap-2">
										<FaFileArchive className="text-blue-600" />
										Project Files ({selectedProject.files.length})
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
										{selectedProject.files.map((file, index) => (
											<div 
												key={index} 
												className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-100 transition group"
											>
												<div className="flex items-center gap-3 flex-1 min-w-0">
													{getFileIcon(file.type)}
													<div className="flex-1 min-w-0">
														<p className="text-gray-900 font-medium text-sm truncate">{file.name}</p>
														<p className="text-gray-600 text-xs">{file.size}</p>
													</div>
												</div>
												<button 
													className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition ml-2"
													title="Download"
													onClick={() => downloadSingleFile(file.name, file.type, file.size)}
												>
													<FaDownload />
												</button>
											</div>
										))}
									</div>
								</div>

								{/* Action Buttons */}
								<div className="mt-6 flex gap-3">
									<button
										onClick={() => downloadAllFilesModal()}
										className="flex-1 px-6 py-3 bg-gradient-to-r from-[#065ad8] to-[#0f52b6] text-white rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
									>
										<FaDownload /> Download All Files
									</button>
									<button
										onClick={() => setSelectedProject(null)}
										className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition"
									>
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProjectUpload;