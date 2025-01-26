import { useState } from "react";

import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import NoTasksFound from "./NoTasksFound";

export default function TaskBoard() {
    const defaultTask = {
        id: crypto.randomUUID(),
        title: "Learn React Native",
        description:
            "I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
        tags: ["web", "react", "js"],
        priority: "High",
        isFavorite: false,
    };
    const [taskList , setTaskList] = useState([defaultTask])
    console.log("🚀 ~ TaskBoard ~ taskList:", taskList)
    const [showAddModal, setShowAddModal] = useState(false);
    const [taskUpdate, setTaskUpdate] = useState(null)
    function HandleAddEditTask(newTask,isAdd){
        if(isAdd){

            setTaskList([...taskList, newTask]);
        }else{
            const updatedTasks = taskList.map(task => task.id === newTask.id ? newTask : task);
            setTaskList(updatedTasks);
            setTaskUpdate(null);
        }
        setShowAddModal(false);
    }
    function handleCloseClick() {
        setShowAddModal(false);
        
    }

    function handleTaskEdit(task) {
        setTaskUpdate(task);
        setShowAddModal(true);
    }
    function handleIsFavorite(taskId) {
        const isFavorite = taskList.map((task) => {
            if (task.id === taskId) {
                return{
                    ...task,
                    isFavorite: !task.isFavorite
                }
            } else {
                return task;
            }
        });
        setTaskList(isFavorite)
    }
    
    function handleDeleteTask(taskId){
        const updatedTasks = taskList.filter(task => task.id !== taskId)
        setTaskList(updatedTasks);
    }
    function handleDeleteAllTasks() {
        setTaskList([]); // Clear the task list
    }

    function handleSearchTasks(searchTerm) {
        
        if (searchTerm.trim() === "") {
            setTaskList([...taskList]); // Reset to all tasks if the search is empty
            return;
        }
        const filtered = taskList.filter((task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTaskList([...taskList,filtered]);
    }

   
    return (
        <section className="mb-20" id="tasks">
            {showAddModal && (
                <AddTaskModal
                   onSave={HandleAddEditTask}
                    onCloseClick={handleCloseClick}
                    taskUpdate={taskUpdate}
                    
                />
            )}
            <div className="container">
                <div className="p-2 flex justify-end">
                    <SearchTask handleSearchTasks={handleSearchTasks}  />
                </div>

                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TaskActions
                        onAddClick={() => setShowAddModal(true)}
                        onDeleteAll={() => handleDeleteAllTasks()}
                    />
                    {
                        
                        <TaskList
                        handleDeleteTask={handleDeleteTask}
                            tasks={taskList}
                            handleTaskEdit={handleTaskEdit}
                            handleIsFavorite={handleIsFavorite}
                        />
                    }
                </div>
            </div>
        </section>
    );
}
