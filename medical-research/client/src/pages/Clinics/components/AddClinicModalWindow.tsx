import * as React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { default as styledComponents } from "styled-components";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { NewClinicValues, NewClinicObj } from "types/clinics";
import { useClinicsActions } from "hooks/useActions";
import { clinicValidation, phoneNumberValidation } from 'tools/formValidation';

const FormContainer = styled(Box)({
    margin: 0,
    width: "100%",
    display: 'grid',
    gridTemplateRows: 'repeat(4, 80px)',
});

const AddClinicBtn = styled(Button)({
    marginTop: 20,
    justifySelf: 'right',
});

export const ClinicForm = styledComponents.form({
    textAlign: "left",
});

export const FormTitle = styled(DialogTitle)({
    textTransform: "capitalize",
    color: "var(--colors-ui-base)",
});

export const FormContent = styled(DialogContent)({
    display: "flex",
    padding: '0 20px',
});

export const DescriptionTextArea = styled(TextField)({
    width: "100%",
    div: {
        padding: '13px 14px 17px 14px',
    },
});

const validationSchema = yup.object().shape(clinicValidation);
const initialFormValues: NewClinicValues = {
    name: '',
    city: '',
    address: '',
    phone: '',
};

export const AddClinicModalWindow = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClickClose = () => setOpen(false);
    const { addClinic } = useClinicsActions();

    const formik = useFormik({
        initialValues: initialFormValues,
        validationSchema: validationSchema,
        onSubmit: sendAddClinicForm,
    });

    function sendAddClinicForm(values: NewClinicValues) {
        const { name, city, address, phone } = values;
        const newClinic: NewClinicObj = {
            name,
            city: {
                id: Math.floor(Date.now() / 1000000),
                name: city,
            },
            address,
            phone,
        }
        console.log(newClinic)////////////////////////
        addClinic(newClinic);
        formik.resetForm();
        handleClickClose();
    }

    return (
        <>
            <AddClinicBtn variant="outlined" onClick={handleClickOpen}>
                add clinic
            </AddClinicBtn>

            <Dialog open={open} onClose={handleClickClose}>
                <ClinicForm name='newClinicForm' onSubmit={formik.handleSubmit}>
                    <FormTitle>new clinic</FormTitle>

                    <FormContent>
                        <FormContainer
                            width={[355, 355, 600]}
                        >
                            <TextField
                                id='name'
                                name='name'
                                placeholder='Enter clinic name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />

                            <TextField
                                id='city'
                                name='city'
                                placeholder='Enter clinic city'
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                            />

                            <TextField
                                id='address'
                                name='address'
                                placeholder='Enter clinic address'
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
                            />

                            <TextField
                                id='phone'
                                name='phone'
                                placeholder='Enter clinic phone number'
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                            />
                        </FormContainer>
                    </FormContent>

                    <DialogActions>
                        <Button type="submit">add</Button>

                        <Button onClick={handleClickClose}>cancel</Button>
                    </DialogActions>
                </ClinicForm>
            </Dialog>
        </>
    );
}

export default AddClinicModalWindow;
