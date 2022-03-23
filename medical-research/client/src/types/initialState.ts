import { UserState } from 'types/user';
import { MedicinesState } from 'types/medicines';
import { ClinicsState } from 'types/clinics';
import { UsersListState } from 'types/usersList';
import { TasksState } from 'types/tasks';
import { ThemeState } from 'types/theme';

export interface InitialState {
    user: UserState,
    medicines: MedicinesState,
    clinics: ClinicsState,
    usersList: UsersListState,
    tasks: TasksState,
    theme: ThemeState,
};