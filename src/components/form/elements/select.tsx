// module
import { UseFormReturn, Controller, ControllerRenderProps } from "react-hook-form";
import Select, { CSSObjectWithLabel, GroupBase, StylesConfig } from 'react-select'
import styled from "@emotion/styled";

interface SelectOptionsProps<EntityModel extends Record<string, any>, OptionModel> {
    label: string | JSX.Element;
    name: keyof EntityModel;
    data: { reactHookFormObject: UseFormReturn<EntityModel>, defaultValue: EntityModel };
    options: Array<OptionModel>
    style?: WrapperProps['style'];
    selectStyle?: StylesConfig<any, false, GroupBase<any>>
}

const SelectOptions = <EntityModel extends Record<string, any>, OptionModel>({
    style,
    label,
    name,
    data,
    options,
    selectStyle,
}: SelectOptionsProps<EntityModel, OptionModel>): JSX.Element => {
    return <Wrapper style={style}>
        <Label>{label}</Label>
        <Controller
            name={name as any}
            control={data.reactHookFormObject.control}
            render={({ field }: { field: ControllerRenderProps<EntityModel, any> }) => <Select
                {...field}
                defaultValue={data.defaultValue[name] as any}
                options={options}
                styles={{
                    container: (base: CSSObjectWithLabel) => ({
                        ...base,
                        width: '100%',
                        marginTop: '10px',
                        marginBottom: '7px',
                    }),
                    control: (base: CSSObjectWithLabel) => ({
                        ...base,
                        backgroundColor: '#E9EAEB',
                        height: '50px',
                        border: 'none',
                        outline: 'none',
                        color: 'black',
                        ':focus': {
                            border: 'none',
                            outline: 'none',
                        }
                    }),
                    indicatorSeparator: (base: CSSObjectWithLabel) => ({
                        ...base,
                        display: 'none',
                    }),
                    ...selectStyle,
                }}
            />}
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

export default SelectOptions;

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