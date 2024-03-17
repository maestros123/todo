import React, {useState} from 'react';
import {useAppDispatch} from "../../../app/hooks";
import {deleteTask, editTask, Task, toggleTask} from '../../../features/tasks/tasksSlice'
import {MdModeEdit, MdDeleteForever} from "react-icons/md";
import styled from "styled-components";
import {Draggable} from "react-beautiful-dnd";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";

interface TaskItemProps {
    task: Task;
    index: number;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  font-size: 20px;
  min-height: 30px;
  margin: 5px;
  padding: 10px;
`

const TaskItem: React.FC<TaskItemProps> = ({task, index }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);
    const dispatch = useAppDispatch();

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        dispatch(editTask({id: task.id, newText: editedText}));
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div>
                <Input onChange={(e) => setEditedText(e.target.value)} value={editedText}/>
                    <Button onClick={handleSave} isActive={true}>Сохранить</Button>
            </div>
        );
    }

    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided, snapshot) => (
                <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        ...provided.draggableProps.style,
                        backgroundColor: snapshot.isDragging ? '#d6d6d6' : 'white',
                        outline: snapshot.isDragging ? '1px solid gray' : 'none',
                    }}
                >

                        <div>
                            <Checkbox id={task.id} checked={task.completed} text={task.text} onChange={() => dispatch(toggleTask(task.id))}/>
                        </div>
                        <div>
                            <Button onClick={handleEdit}><MdModeEdit/></Button>
                            <Button onClick={() => dispatch(deleteTask(task.id))}><MdDeleteForever /></Button>
                        </div>

                </Container>
            )}
        </Draggable>

    );
};

export default TaskItem;