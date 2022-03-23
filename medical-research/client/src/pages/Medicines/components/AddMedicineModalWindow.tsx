import * as React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { default as styledComponents } from 'styled-components';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  SelectsContainer, BasicSelect, InputsContainer, DatePickerInput,
} from 'pages/Medicines/components/FormsComponents';
import { MedicineObj } from 'types/medicines';
import {
  types, dosageForms, containers, states,
} from 'pages/Medicines/medicinesValues';
import { useMedicinesActions } from 'hooks/useActions';
import { medicineValidation } from 'tools/formValidation';

const FormContainer = styled(Box)({
  margin: 0,
  width: '100%',
  display: 'flex',
});

const AddMedicineBtn = styled(Button)({
  justifySelf: 'right',
});

export const MedicineForm = styledComponents.form({
  textAlign: 'left',
});

export const FormTitle = styled(DialogTitle)({
  textTransform: 'capitalize',
  color: 'var(--colors-ui-base)',
});

export const FormContent = styled(DialogContent)({
  display: 'flex',
  padding: '0 20px',
});

export const DescriptionTextArea = styled(TextField)({
  width: '100%',
  div: {
    padding: '13px 14px 17px 14px',
  },
});

const validationSchema = yup.object().shape(medicineValidation);
const initialFormValues: MedicineObj = {
  id: '',
  type: '',
  description: '',
  dosageForm: '',
  container: '',
  state: '',
  expireAt: '',
};

export const AddMedicineModalWindow = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => setOpen(false);
  const { addMedicine } = useMedicinesActions();

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    onSubmit: sendAddMedicineForm,
  });

  function sendAddMedicineForm(values: MedicineObj) {
    const formattedValues = { ...values };

    formattedValues.id = `${Date.now().toString()}${Date.now().toString().slice(0, 11)}`;
    formattedValues.expireAt = new Date(formattedValues.expireAt).toISOString();

    addMedicine(formattedValues);
    formik.resetForm();
    handleClickClose();
  }

  return (
    <>
      <AddMedicineBtn variant="outlined" onClick={handleClickOpen}>
        add medicine
      </AddMedicineBtn>

      <Dialog open={open} onClose={handleClickClose}>
        <MedicineForm name='newMedicineForm' onSubmit={formik.handleSubmit}>
          <FormTitle>new medicine</FormTitle>

          <FormContent>
            <FormContainer
              width={[355, 355, 600]}
              flexDirection={["column", "column", "row"]}
            >
              <SelectsContainer width={["100%", "100%", "50%"]}>
                <BasicSelect
                  label="Choose the medicine type"
                  name="type"
                  options={types}
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  helperText={formik.touched.type && formik.errors.type}
                />

                <BasicSelect
                  label="Choose dosage form"
                  name="dosageForm"
                  options={dosageForms}
                  value={formik.values.dosageForm}
                  onChange={formik.handleChange}
                  error={formik.touched.dosageForm && Boolean(formik.errors.dosageForm)}
                  helperText={formik.touched.dosageForm && formik.errors.dosageForm}
                />

                <BasicSelect
                  label="Choose container"
                  name="container"
                  options={containers}
                  value={formik.values.container}
                  onChange={formik.handleChange}
                  error={formik.touched.container && Boolean(formik.errors.container)}
                  helperText={formik.touched.container && formik.errors.container}
                />

                <BasicSelect
                  label="Choose state"
                  name="state"
                  options={states}
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                />
              </SelectsContainer>

              <InputsContainer
                width={["100%", "100%", "50%"]}
                marginLeft={[0, 0, 2]}
              >
                <DatePickerInput
                  label="Choose expiration date"
                  name="expireAt"
                  fieldValue={formik.values.expireAt}
                  setField={formik.setFieldValue}
                  error={formik.touched.expireAt && Boolean(formik.errors.expireAt)}
                  helperText={formik.touched.expireAt && formik.errors.expireAt}
                />

                <DescriptionTextArea
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  multiline
                  minRows={8}
                  maxRows={8}
                  aria-label=""
                  placeholder="Write a medicine description here:"
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </InputsContainer>
            </FormContainer>
          </FormContent>

          <DialogActions>
            <Button type="submit">add</Button>

            <Button onClick={handleClickClose}>cancel</Button>
          </DialogActions>
        </MedicineForm>
      </Dialog>
    </>
  );
}
