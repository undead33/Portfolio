import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { useBeforeunload } from "react-beforeunload";
import {
  MedicineForm, FormTitle, FormContent, DescriptionTextArea,
} from "pages/Medicines/components/AddMedicineModalWindow";
import {
  SelectsContainer, BasicSelect, InputsContainer, DatePickerInput,
} from "pages/Medicines/components/FormsComponents";
import { MedicineObj } from "types/medicines";
import { types, dosageForms, containers, states, } from "pages/Medicines/medicinesValues";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useMedicinesActions } from "hooks/useActions";
import { getFullDate } from "tools/transformStrings";
import { medicineValidation } from 'tools/formValidation';

const MedicineFormWrapper = styled(Box)({
  marginTop: 10,
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
});

const FormContainer = styled(Box)({
  margin: 0,
  width: "100%",
  display: "flex",
});

const validationSchema = yup.object().shape(medicineValidation);

const MedicineEdit: React.FC = () => {
  const { medicines } = useTypedSelector(state => state.medicines);
  const pathname = useLocation().pathname.split("/");
  const pageId = pathname[2];
  let medicineData = medicines.find((medecine) => medecine.id === pageId);
  let id = medicineData?.id;
  let type = medicineData?.type ? medicineData.type : 0;
  let description = medicineData?.description ? medicineData?.description : "";
  let dosageForm = medicineData?.dosageForm ? medicineData.dosageForm : 0;
  let container = medicineData?.container ? medicineData.container : 0;
  let state = medicineData?.state ? medicineData.state : 0;
  let expireAt = medicineData?.expireAt ? getFullDate(medicineData?.expireAt) : "";
  const { editMedicine } = useMedicinesActions();
  const navigate = useNavigate();
  const goBack = () => { navigate(-1); };

  const initialFormValues: MedicineObj = {
    id, type, description, dosageForm, container, state, expireAt,
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    onSubmit: sendEditMedicineForm,
  });

  useBeforeunload((event: any) => {
    event.preventDefault();
  });

  function sendEditMedicineForm(values: MedicineObj) {
    const formattedValues = { ...values };

    if (formattedValues.expireAt.length < 20) {
      let [day, month, year] = formattedValues.expireAt.split('.');

      formattedValues.expireAt = `${year}.${month}.${day}`;
    }

    formattedValues.expireAt = new Date(formattedValues.expireAt).toISOString();
    editMedicine(formattedValues);
    navigate(`/medicines/${id}`);
  }

  return (
    <>
      <MedicineFormWrapper>
        <MedicineForm onSubmit={formik.handleSubmit}>
          <FormTitle>edit medicine</FormTitle>

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
                  fieldValue={medicineData?.expireAt}
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
            <Button type="submit">save changes</Button>

            <Button onClick={goBack}>go back</Button>
          </DialogActions>
        </MedicineForm>
      </MedicineFormWrapper>
    </>
  );
};

export default MedicineEdit;

// const medicines = [
//   {
//     id: "1dd",
//     type: "1",
//     description:
//       "dd ;ljhk jskhdj ksjgh s;kgh ;ksjgh s;h j;sjh s;hj s ;hts;j s;h s;tjh s;tjh ;shj ;t j;skj ",
//     dosageForm: "1",
//     container: "1",
//     state: "1",
//     expireAt: "2022-03-01T18:22:43.655Z",
//   },
//   {
//     id: "2dd",
//     type: "1",
//     description: "dd",
//     dosageForm: "1",
//     container: "1",
//     state: "1",
//     expireAt: "2022-03-01T18:22:43.655Z",
//   },
//   {
//     id: "3dd",
//     type: "1",
//     description: "dd",
//     dosageForm: "1",
//     container: "1",
//     state: "1",
//     expireAt: "2022-03-01T18:22:43.655Z",
//   },
//   {
//     id: "4dd",
//     type: "1",
//     description: "dd",
//     dosageForm: "1",
//     container: "1",
//     state: "1",
//     expireAt: "2022-03-01T18:22:43.655Z",
//   },
// ];