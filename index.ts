interface Todoitem {
    task: string;
    state: boolean;
}

class Todolist {
    public todos: Todoitem[];
    public constructor () {
        this.todos = [];
    }

    public note (task:string, state:boolean):Todoitem {
        const todo: Todoitem = {
            task: task,
            state: state,            
        };
        this.todos.push(todo);
        return this.todos[this.todos.length-1];
    }

    public changestate (task:string): void {
        const todo = this.todos.find(todo => todo.task === task);

        if (!todo) {
            throw new Error("Todo not found")
        }
        if (todo.state == false) {
            todo.state = true;
        }
        else {
            todo.state = false;
        }
    }

    public edit (task:string, newtask:string): void {
        console.log(task, newtask);
        let todo = this.todos.find(todo => todo.task === task);

        if (!todo) {
            throw new Error("Todo not found")
        }
        if (todo.task !== newtask) {
        todo.task = newtask;
        }
    }

    public delete (task:string): void {
        const todo = this.todos.find(todo => todo.task === task);

        if (!todo){
            throw new Error("Todo not found")
        }
        this.todos.splice(this.todos.indexOf(todo), 1);
    }
}

const add_button = document.getElementById("addbutton") as HTMLButtonElement;
const todo_input = document.getElementById("input") as HTMLInputElement;
const done = document.getElementById("done") as HTMLUListElement;
const notdone = document.getElementById("notdone") as HTMLUListElement;
const todolist = new Todolist();
let timer:number = 0;
let delay:number = 200;
let prevent:boolean = false;
   
add_button.addEventListener("click", function(){
    let input = todo_input.value;
        if (input === ""){
            throw new Error("No task found")}
            todolist.note(input, false);
            let task = input;
            let edit = document.createElement("button") as HTMLButtonElement;
            edit.innerText = "Edit";            
            edit.addEventListener("click", function(){
                let newtodo = newtodoinnen.innerText;
                if (edit.innerText === "Done"){
                    edit.innerText = "Edit"; 
                    setTimeout(function(){
                        newtodoinnen.blur();
                    }, 0)                    
                    newtodoinnen.contentEditable = "false"; 
                    todolist.edit(task, newtodo);
                    task = newtodo;                                     
                }
                else {
                    edit.innerText = "Done";
                    newtodoinnen.contentEditable = "true";
                    newtodoinnen.focus();
                }                
            })
            let newtodoaussen = document.createElement("div") as HTMLDivElement;
            let newtodoinnen = document.createElement("div") as HTMLDivElement;
            newtodoaussen.appendChild(newtodoinnen);           
            newtodoinnen.innerText = input;
            newtodoaussen.appendChild(edit);              
            notdone.appendChild(newtodoaussen);        
            newtodoinnen.addEventListener("click", function(){
                timer = setTimeout(function(){
                    if (!prevent){
                        if (!newtodoaussen.parentElement){
                            throw new Error("something went wrong ):")}
                        todolist.changestate(newtodoinnen.innerText);
                        let oldchild = newtodoaussen.parentElement.removeChild(newtodoaussen);
                        let todo = todolist.todos.find(todo => todo.task === newtodoinnen.innerText);
                        if (todo != undefined){
                            if (todo.state === false){                            
                                notdone.appendChild(oldchild);                          
                            }
                            if (todo.state === true){
                                done.appendChild(oldchild);
                            }
                        }
                    }
                    prevent = false;
                }, delay)                
            });
            newtodoinnen.addEventListener("dblclick", function(){
                clearTimeout(timer);
                prevent = true;
                if (!newtodoaussen.parentElement){
                    throw new Error("something went wrong ):");
                }
                todolist.delete(newtodoinnen.innerText);
                notdone.removeChild(newtodoaussen);
                console.log(todolist);
            });
    todo_input.value = "";
})