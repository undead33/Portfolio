import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { useTypedSelector } from "hooks/useTypedSelector";
import { tableHeadCells } from 'pages/Clinics/components/ClinicsTable';

const MedicineTableWrapper = styled(Box)({
    marginTop: 20,
    width: '100%',
    display: "flex",
    justifyContent: "space-around",
});

const MedicineTableContainer = styled(Box)({
    width: 'calc(100% - 100px)',
    margin: 0,
    border: "solid 2px var(--colors-ui-base)",
    "& > div:not(:last-child)": {
        borderBottom: "solid 2px var(--colors-ui-base)",
    },
});

const MedicineDataContainer = styled(Box)({
    height: "fit-content",
    display: "grid",
    gridTemplateColumns: "120px 1fr",
});

const CharacteristicName = styled(Box)({
    padding: 10,
    fontWeight: 700,
    color: "var(--colors-ui-base)",
    borderRight: "solid 2px var(--colors-ui-base)",
});

const CharacteristicInfo = styled(Box)({
    textAlign: "center",
    padding: 10,
    fontWeight: 600,
});

const Clinic: React.FC = () => {
    const { clinics } = useTypedSelector(state => state.clinics);
    const pageId = useLocation().pathname.split('/')[2];
    let clinicData = clinics.find((clinic) => clinic.id === pageId);
    const { name, city: { name: cityName }, address, phoneNumber } = clinicData;

    return (
        <>
            <MedicineTableWrapper>
                <MedicineTableContainer
                    minWidth={[325, 550, 750]}
                >
                    <MedicineDataContainer>
                        <CharacteristicName>{tableHeadCells[0]}</CharacteristicName>
                        <CharacteristicInfo>{name}</CharacteristicInfo>
                    </MedicineDataContainer>

                    <MedicineDataContainer>
                        <CharacteristicName>{tableHeadCells[1]}</CharacteristicName>
                        <CharacteristicInfo>{cityName}</CharacteristicInfo>
                    </MedicineDataContainer>

                    <MedicineDataContainer>
                        <CharacteristicName>{tableHeadCells[2]}</CharacteristicName>
                        <CharacteristicInfo>{address}</CharacteristicInfo>
                    </MedicineDataContainer>

                    <MedicineDataContainer>
                        <CharacteristicName>{tableHeadCells[3]}</CharacteristicName>
                        <CharacteristicInfo>{phoneNumber}</CharacteristicInfo>
                    </MedicineDataContainer>

                    <MedicineDataContainer>
                        <CharacteristicName>Description</CharacteristicName>
                        <CharacteristicInfo>
                            Place for additonal information about the clinic.
                            Place for additonal information about the clinic.
                            Place for additonal information about the clinic.
                            Place for additonal information about the clinic.
                        </CharacteristicInfo>
                    </MedicineDataContainer>
                </MedicineTableContainer>
            </MedicineTableWrapper>
        </>
    );
};

export default Clinic;
