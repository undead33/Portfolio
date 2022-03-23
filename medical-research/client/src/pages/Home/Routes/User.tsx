import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { useTypedSelector } from "hooks/useTypedSelector";
import { tableHeadCells } from 'pages/Home/components/UsersTable';

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

const Medicine: React.FC = () => {
    const { usersList } = useTypedSelector(state => state.usersList);
    const pageId = useLocation().pathname.split('/')[3];
    let userData = usersList.find((user) => user.userName === pageId);
    const { userName, email, phoneNumber } = userData;

    return (
        <>
            <MedicineTableWrapper>
                <MedicineTableContainer
                    minWidth={[325, 550, 750]}
                >
                    <MedicineDataContainer>
                        <CharacteristicName>{tableHeadCells[0]}</CharacteristicName>
                        <CharacteristicInfo>{userName}</CharacteristicInfo>
                    </MedicineDataContainer>

                    <MedicineDataContainer>
                        <CharacteristicName>{tableHeadCells[1]}</CharacteristicName>
                        <CharacteristicInfo>{email}</CharacteristicInfo>
                    </MedicineDataContainer>

                    <MedicineDataContainer>
                        <CharacteristicName>{tableHeadCells[2]}</CharacteristicName>
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

export default Medicine;
