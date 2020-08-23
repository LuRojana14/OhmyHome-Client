// import React, { Component } from 'react'

// import axios from "axios";
// import TaskList from "./TaskList";
// import AddTask from "./AddTask";
// // import { withAuth } from "../../lib/AuthProvider"; //DUDA




// export class TaskPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { listOfTasks: [], users: [] };
//   }
//   //BUSCA TODAS LAS TASKS DE LA RUTA /tasks DEL BACK
//   getAllTasks = () => {
//     const groupName = this.props.user.namegroup;
//     //authprovider
//     axios
//       .get(`http://localhost:4000/group/${groupName}`)
//       .then((responseFromApi) => {
//         console.log(responseFromApi);
//         this.setState({
//           listOfTasks: responseFromApi.data[0].tasks,
//           users: responseFromApi.data,
//         });
//       });
//   };
//   // DELETE TASK:
//   deleteTask = (taskId) => {
//     axios
//       .delete(`http://localhost:4000/api/tasks/${taskId}`)
//       .then(() => {
//         this.getAllTasks();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   addTask = (title) => {
//     const groupName = this.props.user.namegroup;
//     axios
//       .post("http://localhost:4000/api/tasks", {
//         title,
//         namegroup: groupName,
//       })
//       .then(() => {
//         this.getAllTasks();
//       })
//       .catch((error) => console.log(error));
//   };
//   componentDidMount () {
//     this.getAllTasks();
//   }
//   render () {
//     const groupName = this.props.user.namegroup;
//     return (
//       <div>
//         <div>
//           <AddTask
//             groupName={groupName}
//             addTask={this.addTask}
//             getData={() => this.getAllTasks()}
//           />
//         </div>
//         <TaskList
//           deleteTask={this.deleteTask}
//           listOfTasks={this.state.listOfTasks}
//         ></TaskList>
//       </div>
//     );
//   }
// }



// // export default withAuth(TaskPage);