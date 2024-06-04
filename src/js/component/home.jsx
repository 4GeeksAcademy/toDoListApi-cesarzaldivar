import React, { useState, useEffect } from "react";


//create your first component
const Home = () => {
	const apiUrl = "https://playground.4geeks.com/todo";
	const [taskList, setTaskList] = useState([])
	const [inputValue, setInputValue] = useState({
		label: "",
		is_done: false
	})

	function handleChange(e) {
		setInputValue({ ...inputValue, [e.target.name]: e.target.value })
	}

	function handleSubmit(e) {
		e.preventDefault();
		console.log(inputValue);

	}

	async function createUser() {
		try {
			const response = await fetch(`${apiUrl}/users/cesar`,
				{ method: "POST" });
			const data = await response.json();
			if (response.ok) {
				console.log(data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function getTodos() {
		try {
			const response = await fetch(`${apiUrl}/users/cesar`);
			const data = await response.json();
			if (response.ok) {
				setTaskList(data.todos);
			}
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	}

	async function addTask(task) {
		try {
			const response = await fetch(`${apiUrl}/todos/cesar`, {
				method: "POST",
				body: JSON.stringify(task),
				headers: { "Content-Type": "application/json" }
			});
			const data = await response.json();
			if (response.ok) {
				console.log(data);
				setTaskList([...taskList, data]);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function deleteTask(id) {
		try {
			const response = await fetch(`${apiUrl}/todos/${id}`,
				{ method: "DELETE" });
			const data = await response;
			if (response.ok) {
				console.log(data);
				const newArray = taskList.filter(item => item.id != id)
				setTaskList(newArray)
			}
		} catch (e) {
			console.log(e);
		}
	}


	useEffect(() => {
		createUser();
		getTodos();
	}, []);

	return (
		<div className="container w-75 mt-5 border border-dark bg-black">
			
				<div className="mb-3">
					<label className="form-label text-info">Your To dos</label>
					<input
						type="text"
						placeholder="write your task"
						className="form-control"
						value={inputValue.label}
						name="label"
						onChange={(event) => { handleChange(event) }}
						onKeyDown={(event) => {
							if (event.key == "Enter" && inputValue.label != "") {
								addTask(inputValue);
							}
						}}
					/>
				</div>
				<div className="card">
					<ul className="list-group">
						{taskList.length > 0 ? taskList.map(item => {
							return (
								<li key={item.id} 
								className="list-group-item bg-info d-flex justify-content-between align-items-center">
									<span>{item.label}</span>
									<button className="btn btn-danger" onClick={()=> deleteTask(item.id)}>X</button>
								</li>
							)
						}) :
							<li className="list-group-item bg-info">
								no hay tareas
							</li>
						}
					</ul>
				</div>
		</div>
	);
};

export default Home;
