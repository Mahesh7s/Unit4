export function addTask(task){
	return {type:"ADDTASK",payload:task}
}
export function toggle(id){
	return {type:"TOGGLE",payload:id}

}
export function deleteTask(id){
	return {type:"DELETE",payload:id}
}