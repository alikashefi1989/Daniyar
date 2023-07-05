// module
import { RegisterOptions, UseFormReturn } from "react-hook-form";
import styled from "@emotion/styled";

interface TextareaProps<EntityModel extends Record<string, any>> {
    label: string | JSX.Element;
    name: keyof EntityModel;
    data: { reactHookFormObject: UseFormReturn<EntityModel>, defaultValue: EntityModel };
    rows?: HTMLTextAreaElement['rows']
    registerOptions?: RegisterOptions<EntityModel, any>
    style?: WrapperProps['style'];
}

const Textarea = <EntityModel extends Record<string, any>>({
    style,
    label,
    rows,
    name,
    data,
    registerOptions
}: TextareaProps<EntityModel>): JSX.Element => {
    return <Wrapper style={style}>
        <Label>{label}</Label>
        <TextareaUi
            rows={rows}
            key={name.toString()}
            defaultValue={data.defaultValue[name]}
            error={typeof data.reactHookFormObject.formState.errors[name] !== 'undefined'}
            {...data.reactHookFormObject.register(name as any, registerOptions ? { ...registerOptions } : undefined)}
        />
        <Error>
            {
                data.reactHookFormObject.formState.errors &&
                data.reactHookFormObject.formState.errors[name] &&
                data.reactHookFormObject.formState.errors[name]?.message &&
                `${data.reactHookFormObject.formState.errors[name]?.message}`
            }
        </Error>
    </Wrapper>;
};

export default Textarea;

interface WrapperProps {
    style?: { [key: string]: string | number };
}

const Wrapper = styled.div<WrapperProps>(({ style }) => ({
    width: '100%',
    height: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'start',
    marginTop: '10px',
    marginBottom: '10px',
    ...style,
}));

const TextareaUi = styled.textarea<any>(() => ({
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100px',
    height: `calc(100% - 30px)`,
    borderRadius: '5px',
    fontSize: '20px',
    padding: '5px',
    marginBottom: '7px',
    marginTop: '10px',
    boxSizing: 'border-box',
    fontFamily: 'sans-serif',
    overflowY: 'auto',
    backgroundColor: '#E9EAEB',
    border: 'none',
    outline: 'none',
    color: 'black',
}));

const Label = styled.div<any>(({ theme }) => ({
    width: '100%',
    height: '15px',
    textAlign: 'left',
    fontWeight: 600,
    fontSize: '20px',
    textTransform: 'capitalize',
    fontFamily: 'sans-serif',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: theme.palette.color,
}));

const Error = styled.div(() => ({
    width: '100%',
    height: '15px',
    textAlign: 'left',
    fontWeight: 200,
    fontSize: '12px',
    color: 'red',
    fontFamily: 'sans-serif',
}));