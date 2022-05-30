import React from 'react';
import { Form as FormContainer } from './Form.style';

interface FormProps {
  formInput: string;
  handleChange: (e: any) => void;
  handleSubmit?: (e: any) => void;
}

const Form = (props: FormProps) => {
  const { formInput, handleChange, handleSubmit } = props;
  return (
    <FormContainer width={handleSubmit ? '' : '370px'} onSubmit={handleSubmit}>
      <label htmlFor='taskInput'></label>
      <input required type='text' value={formInput} onChange={handleChange} />
      <FormContainer.ButtonAdd
        hidden={!handleSubmit}
        className='btn-add'
        type='submit'
        alt='Add task'
      >
        <i className='fa-solid fa-plus fa-3x'></i>
      </FormContainer.ButtonAdd>
    </FormContainer>
  );
};

export default Form;
