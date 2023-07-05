// module
import { FC } from 'react'
import styled from "@emotion/styled";
import { useNavigate } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';
// custom
import Task from '../../models/entities/task'

const LogGrid: FC<{ tasks: Array<Task> }> = ({ tasks }) => {
    const navigate = useNavigate()

    return (
        <LogGridOuter>
            <LogGridOuterTitle>tasks</LogGridOuterTitle>
            <LogGridInner>
                {!tasks.length && <NoData>You have nothing todo. Go get some sleep</NoData>}
                {tasks.length ? tasks.map((task: Task) => (
                    <TaskItemWrapper key={task.id}>
                        <TaskTitle>{task.title}</TaskTitle>
                        <TaskDescription>{task.description}</TaskDescription>
                        <ActionsWrapper>
                            <Status><span>{task.status}</span></Status>
                            <IconWrapper>
                                <BsPencilSquare color='blue' style={{ cursor: 'pointer' }} onClick={() => navigate(`/edit/${task.id}`)} />
                            </IconWrapper>
                        </ActionsWrapper>
                    </TaskItemWrapper>
                )) : null}
            </LogGridInner>
        </LogGridOuter>
    )
}

export default LogGrid

const LogGridOuter = styled.div(() => ({
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#1775B9',
    marginTop: '30px',
    marginInline: 'auto',
    paddingTop: '40px',
    width: '100%',
    height: 'max-content',
    position: 'relative',
    borderRadius: '15px 15px 0px 0px',
    "@media (max-width: 768px)": {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        right: 0,
        left: 0,
    }
}))

const LogGridOuterTitle = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: '40px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    fontSize: '25px',
    paddingInline: '40px',
}))

const LogGridInner = styled.div(() => ({
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap',
    backgroundColor: '#32b6e6',
    width: '100%',
    height: 'max-content',
    minHeight: '150px',
    maxHeight: '350px',
    overflowY: 'auto',
    borderRadius: '15px 15px 0px 0px',
    padding: '10px',
    "@media (max-width: 768px)": {
        width: '100%',
        height: '180px',
        maxHeight: '180px',
        overflowY: 'auto',
        padding: '10px',
    }
}))

const NoData = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    textAlign: 'center',
    textJustify: 'auto',
}))

const TaskItemWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '150px',
    height: '150px',
    padding: '5px',
    borderRadius: '5px',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: 'white',
}))

const TaskTitle = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'inline-flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    fontSize: '18px',
    fontWeight: 700,
    color : 'black',
}))

const TaskDescription = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'inline-flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    fontSize: '15px',
    fontWeight: 500,
    color : 'black',
}))

const ActionsWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'inline-flex',
    justifyContent: 'space-between',
    alignContent: 'center',
}))

const Status = styled.div(() => ({
    boxSizing: 'border-box',
    width: '60%',
    padding: '5px',
    height: '35px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#1775B9',
    borderRadius: '4px',
    color: 'white',
}))

const IconWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: 'max-content',
    height: '35px',
    padding: '8px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignContent: 'center',
}))
