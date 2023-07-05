// module
import { FC, ReactNode, useContext } from "react";
import { BsPlus } from "react-icons/bs";
import { UseFormReturn } from "react-hook-form";
import styled from "@emotion/styled";
import * as yup from "yup";
// custom
import Form from "../components/form/form";
import TaskForm from "../models/forms/task";
import Task, { STATUS } from "../models/entities/task";
import StringInput from "../components/form/elements/string-input";
import Textarea from "../components/form/elements/textarea";
import Button from "../components/button/submit-button";
import { Toaster } from "../components/notices/toaster";
import { Store } from "../models/store";
import uuidGenerator from "../util/uuid-generator";
import addNewEntity from "../util/add-new-entity";
import { AppContext } from "../App";
import LogGrid from "../components/log-grid/log-grid";

const Home = (): ReactNode => {
    const { tasks, setTasks } = useContext<Store>(AppContext);
    const formDefaultValue: Omit<TaskForm, 'status'> = {
        title: '',
        description: '',
    }

    const addAndResetForm = (
        tasks: Array<Task>,
        newTask: Omit<TaskForm, 'status'>,
        reactHookFormObject: UseFormReturn<Omit<TaskForm, 'status'>>
    ) => {
        const addedTask: Task = {
            ...newTask,
            id: uuidGenerator(),
            status: STATUS.ToDo
        }
        setTasks!(addNewEntity<Task>(tasks, addedTask))
        Toaster.success('The task has been added successfully.', { toastId: 'valid-add' })
        reactHookFormObject.reset()
    }

    return (
        <HomeWrapper>
            <Form<Omit<TaskForm, 'status'>>
                formType='CREATE'
                defaultValue={formDefaultValue}
                validation={formValidation}
                fieldsRenderer={(data: { reactHookFormObject: UseFormReturn<Omit<TaskForm, 'status'>>; defaultValue: Omit<TaskForm, 'status'> }) => {
                    return <FormWrapper>
                        <FieldWrapper>
                            <StringInput<Omit<TaskForm, 'status'>>
                                label={<Label label="title" required={true} />}
                                name='title'
                                data={data}
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Textarea<Omit<TaskForm, 'status'>>
                                label={<Label label="description" required={true} />}
                                name='description'
                                rows={5}
                                data={data}
                            />
                        </FieldWrapper>
                        <ButtonRow>
                            <ButtonWrapper>
                                <Button
                                    type='contained'
                                    title='Add'
                                    icon={<BsPlus />}
                                    onClick={() => {
                                        data.reactHookFormObject.handleSubmit(
                                            (newTask: Omit<TaskForm, 'status'>) => addAndResetForm(tasks, newTask, data.reactHookFormObject),
                                            () => Toaster.error('The form data is invalid.', { toastId: 'invalid-add' })
                                        )()
                                    }}
                                />
                            </ButtonWrapper>
                        </ButtonRow>
                    </FormWrapper>
                }}
            />
            <LogGrid tasks={tasks} />
        </HomeWrapper>
    );
};

export default Home;

const formValidation = yup.object({
    title: yup
        .string()
        .required('field required'),
    description: yup
        .string()
        .required('field required'),
}).required();

const Label: FC<{ label: string, required?: boolean }> = ({ label, required }) => {
    return <>
        <span style={{ paddingRight: '3px', textTransform: 'capitalize' }}>{label}</span>
        {required && <span style={{ color: 'red' }}>*</span>}
    </>
}

const HomeWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingInline: '10px',
    "@media (max-width: 768px)": {
        width: '100%',
        height: 'max-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingInline: '0px',
    }
}));

const FormWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flex: 1,
    paddingInline: '35px',
    "@media (max-width: 768px)": {
        width: '100%',
        height: 'max-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '10px',
        paddingInline: '45px',
    }
}))

const FieldWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    height: 'max-content',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    "@media (max-width: 768px)": {
        width: '100%',
    }
}))

const ButtonRow = styled.div(() => ({
    boxSizing: 'border-box',
    height: 'max-content',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '5px',
    "@media (max-width: 768px)": {
        width: '100%',
        justifyContent: 'space-between',
    }
}))

const ButtonWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    height: 'max-content',
    width: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    "@media (max-width: 768px)": {
        width: '100%',
    }
}))
