// module
import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { UseFormReturn } from "react-hook-form";
import styled from "@emotion/styled";
import * as yup from "yup";
// custom
import Form from "../components/form/form";
import TaskForm from "../models/forms/task";
import StringInput from "../components/form/elements/string-input";
import Textarea from "../components/form/elements/textarea";
import SelectOptions from "../components/form/elements/select";
import taskStatusListGenerator from "../util/task-status-list-generator";
import Button from "../components/button/submit-button";
import getEntityById from "../util/get-entity-by-id";
import updateEntityById from "../util/update-entity-by-id";
import Task, { STATUS } from "../models/entities/task";
import { Store } from "../models/store";
import { ROUTES } from "../routes/routes.enum";
import { Toaster } from "../components/notices/toaster";
import { AppContext } from "../App";

const Edit = (): ReactNode => {
    const [formDefaultValue, setFormDefaultValue] = useState<TaskForm>({
        title: '',
        description: '',
        status: { label: STATUS.ToDo, value: STATUS.ToDo }
    })
    const [loading, setLoading] = useState<boolean>(true)
    const { id } = useParams()
    const { tasks, setTasks } = useContext<Store>(AppContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (typeof id !== 'string' || id === '') return

        const formInitialValue: Task | undefined = getEntityById<Task>(tasks, id)
        if (!formInitialValue) return

        setFormDefaultValue({
            ...formInitialValue,
            status: { label: formInitialValue.status, value: formInitialValue.status }
        })
        setLoading(false)
    }, [id])

    const updateAndBackToHome = (updatedTask: TaskForm, id: string) => {
        const task: Task = {
            ...updatedTask,
            status: typeof updatedTask.status === 'undefined' ? formDefaultValue.status.value : updatedTask.status.value,
            id,
        }
        if (setTasks) {
            setTasks!(updateEntityById<Task>(tasks, task))
            navigate(ROUTES.HOME)
            Toaster.success('The task has been updated successfully.', { toastId: 'valid-updated' })
        }
    }

    return (
        <EditWrapper>
            {
                loading
                    ? <LoadingWrapper>Loading ...</LoadingWrapper>
                    : <Form<TaskForm>
                        formType='UPDATE'
                        defaultValue={formDefaultValue}
                        validation={formValidation}
                        fieldsRenderer={(data: { reactHookFormObject: UseFormReturn<TaskForm>; defaultValue: TaskForm }) => {
                            return <FormWrapper>
                                <FieldWrapper>
                                    <StringInput<TaskForm>
                                        label={<Label label="title" required={true} />}
                                        name='title'
                                        data={data}
                                    />
                                </FieldWrapper>
                                <FieldWrapper>
                                    <SelectOptions<TaskForm, TaskForm['status']>
                                        label={<Label label="status" required={true} />}
                                        name='status'
                                        data={data}
                                        options={taskStatusListGenerator(formDefaultValue.status.value)
                                            .map((value: STATUS) => { return { label: value, value } })
                                        }
                                    />
                                </FieldWrapper>
                                <FieldWrapper>
                                    <Textarea<TaskForm>
                                        label={<Label label="description" required={true} />}
                                        name='description'
                                        rows={8}
                                        data={data}
                                    />
                                </FieldWrapper>
                                <ButtonRow>
                                    <ButtonWrapper>
                                        <Button
                                            type='contained'
                                            title='Edit'
                                            icon={<BsPencilSquare />}
                                            onClick={() => {
                                                data.reactHookFormObject.handleSubmit(
                                                    (updatedTask: TaskForm) => updateAndBackToHome(updatedTask, id!),
                                                    () => Toaster.error('The form data is invalid.', { toastId: 'invalid-update' })
                                                )()
                                            }}
                                        />
                                    </ButtonWrapper>
                                    <ButtonWrapper>
                                        <Button
                                            type='outlined'
                                            title='Cancel'
                                            onClick={() => navigate(ROUTES.HOME)}
                                        />
                                    </ButtonWrapper>
                                </ButtonRow>
                            </FormWrapper>
                        }}
                    />
            }
        </EditWrapper>
    );
};

export default Edit;

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

const EditWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '10px',
    paddingInline: '45px',
    "@media (max-width: 768px)": {
        width: '100%',
        height: 'max-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingInline: '45px',
    }
}));

const LoadingWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '30px',
    fontWeight: 800,
}))

const FormWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
    "@media (max-width: 768px)": {
        width: '100%',
        height: 'max-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '10px',
        'div:nth-of-type(2)': {
            order: 3
        },
        'div:nth-of-type(4)': {
            order: 4
        }
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
        width: '45%',
    }
}))
