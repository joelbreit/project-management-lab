import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
	const [projectsState, setProjectsState] = useState({
		selectedProjectId: undefined,
		projects: [],
		tasks: [],
	});

	function handleAddTask(providedText) {
		setProjectsState((prevState) => {
			const taskId = Math.random();
			const newTask = {
				text: providedText,
				projectId: prevState.selectedProjectId,
				id: taskId,
			};

			return {
				...prevState,
				tasks: [...prevState.tasks, newTask],
			};
		});
	}

	function handleDeleteTask(taskId) {
		setProjectsState((prevState) => {
			return {
				...prevState,
				tasks: prevState.tasks.filter((task) => task.id !== taskId),
			};
		});
	}

	console.debug(projectsState.tasks);

	function handleStartAddProject() {
		setProjectsState((prevState) => {
			return {
				...prevState,
				selectedProjectId: "new",
			};
		});
	}

	function handleAddProject(projectData) {
		setProjectsState((prevState) => {
			const projectId = Math.random().toString();
			const newProject = {
				...projectData,
				id: projectId,
			};

			return {
				...prevState,
				selectedProjectId: undefined,
				projects: [...prevState.projects, newProject],
			};
		});
	}

	function handleCancelAddProject() {
		setProjectsState((prevState) => {
			return {
				...prevState,
				selectedProjectId: undefined,
			};
		});
	}

	function handleSelectProject(projectId) {
		setProjectsState((prevState) => {
			return {
				...prevState,
				selectedProjectId: projectId,
			};
		});
	}

	function handleDeleteProject() {
		setProjectsState((prevState) => {
			return {
				...prevState,
				projects: prevState.projects.filter(
					(project) => project.id !== prevState.selectedProjectId
				),
				selectedProjectId: undefined,
			};
		});
	}

	const selectedProject = projectsState.projects.find(
		(project) => project.id === projectsState.selectedProjectId
	);

	let content = (
		<SelectedProject
			project={selectedProject}
			onDelete={handleDeleteProject}
			onAddTask={handleAddTask}
			onDeleteTask={handleDeleteTask}
			tasks={projectsState.tasks}
		/>
	);

	if (projectsState.selectedProjectId === "new") {
		content = (
			<NewProject
				onAdd={handleAddProject}
				onCancel={handleCancelAddProject}
			/>
		);
	} else if (projectsState.selectedProjectId === undefined) {
		content = (
			<NoProjectSelected onStartAddProject={handleStartAddProject} />
		);
	}

	return (
		<main className="h-screen my-8 flex gap-8">
			<ProjectsSidebar
				onStartAddProject={handleStartAddProject}
				projects={projectsState.projects}
				onSelectProject={handleSelectProject}
			/>
			{content}
		</main>
	);
}

export default App;
