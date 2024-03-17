import Button from "../Button/Button";
import {addTask, setFilter, updateTasksOrder} from "../../../features/tasks/tasksSlice";
import TaskItem from "../TaskItem/TaskItem";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import styled from "styled-components";
import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd';
import Input from "../Input/Input";

const Wrapper = styled.div`
  width: 600px;
  min-height: 500px;
  background-color: rgb(235, 236, 240);
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  padding: 5px 0;
  border-top: 1px solid #d6d6d6;
`;
const Todos = styled.div`
  height: 500px;
  overflow-y: scroll;
`

const Tasks = () => {
    const [text, setText] = useState('');
    const tasks = useAppSelector(state => state.tasks.tasks);
    const filter = useAppSelector(state => state.tasks.filter);
    const dispatch = useAppDispatch();

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        dispatch(addTask(text.trim()));
        setText('');
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'uncompleted') return !task.completed;
        return true;
    });

    const onDragEnd = (result: DropResult) => {
        const {destination, source} = result;

        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        dispatch(updateTasksOrder({
            startIndex: source.index,
            endIndex: destination.index,
        }));
    };

    return (
        <Wrapper>
            <DragDropContext onDragEnd={onDragEnd}>

                <form onSubmit={handleAddTask}>
                    <Input onChange={(e) => setText(e.target.value)} value={text}/>
                    <Button isActive={true}>Добавить задачу</Button>
                </form>


                <Todos>
                    <Droppable droppableId="tasks">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {filteredTasks.map((task, index) => (
                                    <TaskItem key={task.id} task={task} index={index}/>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </Todos>
            </DragDropContext>
            <Container>
                <Button onClick={() => dispatch(setFilter('all'))} isActive={filter === 'all'}>Все</Button>
                <Button onClick={() => dispatch(setFilter('completed'))}
                        isActive={filter === 'completed'}>Завершённые</Button>
                <Button onClick={() => dispatch(setFilter('uncompleted'))}
                        isActive={filter === 'uncompleted'}>Незавершённые</Button>
            </Container>
        </Wrapper>
    );
};

export default Tasks;
