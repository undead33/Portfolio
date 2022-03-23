import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTypedSelector } from 'hooks/useTypedSelector';
import {
    types, dosageForms, containers, states, tableHeadCells,
} from 'pages/Medicines/medicinesValues';
import { sliceId, getFullDate } from 'tools/transformStrings';

const MedicineTableWrapper = styled(Box)({
    marginTop: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
});

const MedicineTableContainer = styled(Box)({
    width: 'calc(100% - 100px)',
    margin: 0,
    border: 'solid 2px var(--colors-ui-base)',
    '& > div:not(:last-child)': {
        borderBottom: 'solid 2px var(--colors-ui-base)',
    },
});

const MedicineDataContainer = styled(Box)({
    height: 'fit-content',
    display: 'grid',
    gridTemplateColumns: '120px 1fr',
});

const CharacteristicName = styled(Box)({
    padding: 10,
    fontWeight: 700,
    color: 'var(--colors-ui-base)',
    borderRight: 'solid 2px var(--colors-ui-base)',
});

const CharacteristicInfo = styled(Box)({
    textAlign: 'center',
    padding: 10,
    fontWeight: 600,
});

const EditButtonWrapper = styled(Box)({
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-around',
});

const EditButtonContainer = styled(Box)({
    width: 'calc(100% - 100px)',
    display: 'flex',
    justifyContent: 'flex-end',
});

const EditButton = styled(Button)({
    width: 50,
});

const Medicine: React.FC = () => {
    const { medicines } = useTypedSelector(state => state.medicines);
    const { email } = useTypedSelector(state => state.user);
    const navigate = useNavigate();
    const pageId = useLocation().pathname.split('/')[2];
    let medicineData = medicines.find((medecine) => medecine.id === pageId);
    let id = medicineData?.id ? sliceId(medicineData?.id) : medicineData?.id;
    let type = medicineData?.type ? medicineData.type : 0;
    let description = medicineData?.description;
    let dosageForm = medicineData?.dosageForm ? medicineData.dosageForm : 0;
    let container = medicineData?.container ? medicineData.container : 0;
    let state = medicineData?.state ? medicineData.state : 0;
    let expireAt = medicineData?.expireAt ? getFullDate(medicineData?.expireAt) : 0;
    const redirectToMedicineEdit = () => {
        navigate(`/medicines/${pageId}/edit`);
    };

    return (
        <>
            <MedicineTableWrapper>
                <MedicineTableContainer
                    minWidth={[325, 550, 750]}
                >
                    <MedicineDataContainer>
                        <CharacteristicName>{tableHeadCells[0]}</CharacteristicName>
                        <CharacteristicInfo>{id}</CharacteristicInfo>
                    </MedicineDataContainer>

                    <MedicineDataContainer>
                        <CharacteristicName>{tableHeadCells[1]}</CharacteristicName>
                        <CharacteristicInfo>{types[+type]}</CharacteristicInfo>
                    </MedicineDataContainer>

                    <MedicineDataContainer>
                        <CharacteristicName>{tableHeadCells[2]}</CharacteristicName>
                        <CharacteristicInfo>{description}</CharacteristicInfo>
                    </MedicineDataContainer>

                    <MedicineDataContainer>
                        <CharacteristicName>{tableHeadCells[3]}</CharacteristicName>
                        <CharacteristicInfo>{dosageForms[+dosageForm]}</CharacteristicInfo>
                    </MedicineDataContainer>

                    <MedicineDataContainer>
                        <CharacteristicName>{tableHeadCells[4]}</CharacteristicName>
                        <CharacteristicInfo>{containers[+container]}</CharacteristicInfo>
                    </MedicineDataContainer>

                    <MedicineDataContainer>
                        <CharacteristicName>{tableHeadCells[5]}</CharacteristicName>
                        <CharacteristicInfo>{states[+state]}</CharacteristicInfo>
                    </MedicineDataContainer>

                    <MedicineDataContainer>
                        <CharacteristicName>{tableHeadCells[6]}</CharacteristicName>
                        <CharacteristicInfo>{expireAt}</CharacteristicInfo>
                    </MedicineDataContainer>
                </MedicineTableContainer>
            </MedicineTableWrapper>

            {email === 'admin@gmail.com' ?
                <EditButtonWrapper>
                    <EditButtonContainer minWidth={[325, 550, 750]}>
                        <EditButton onClick={redirectToMedicineEdit}>edit</EditButton>
                    </EditButtonContainer>
                </EditButtonWrapper>
                : null}
        </>
    );
};

export default Medicine;

// const medicines = [
//     {
//       id: "1dd",
//       type: "1",
//       description:
//         "dd ;ljhk jskhdj ksjgh s;kgh ;ksjgh s;h j;sjh s;hj s ;hts;j s;h s;tjh s;tjh ;shj ;t j;skj lhljh hjhjkh jj hh",
//       dosageForm: "1",
//       container: "1",
//       state: "1",
//       expireAt: "2022-03-01T18:22:43.655Z",
//     },
//     {
//       id: "2dd",
//       type: "1",
//       description: "dd",
//       dosageForm: "1",
//       container: "1",
//       state: "1",
//       expireAt: "2022-03-01T18:22:43.655Z",
//     },
//     {
//       id: "3dd",
//       type: "1",
//       description: "dd",
//       dosageForm: "1",
//       container: "1",
//       state: "1",
//       expireAt: "2022-03-01T18:22:43.655Z",
//     },
//     {
//       id: "4dd",
//       type: "1",
//       description: "dd",
//       dosageForm: "1",
//       container: "1",
//       state: "1",
//       expireAt: "2022-03-01T18:22:43.655Z",
//     },
//   ];